import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured, uploadFile, STORAGE_BUCKET } from '../../../lib/supabase';

export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { 
          error: 'Supabase is not configured. Please set up your environment variables.',
          details: 'Create a .env file with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const extractedDataStr = formData.get('extractedData') as string;
    const originalText = formData.get('originalText') as string;
    const uploadedFile = formData.get('file') as File;

    if (!extractedDataStr) {
      return NextResponse.json(
        { error: 'Extracted data is required' },
        { status: 400 }
      );
    }

    const extractedData = JSON.parse(extractedDataStr);

    let fileUrl = null;
    let fileName = null;
    let fileSize = null;

    if (uploadedFile && uploadedFile.name && uploadedFile.type) {
      try {
        const timestamp = Date.now();
        const originalName = uploadedFile.name;
        const fileExtension = originalName.split('.').pop();
        const nameWithoutExtension = originalName.replace(`.${fileExtension}`, '');
        fileName = `${nameWithoutExtension}_${timestamp}.${fileExtension}`;
        
        fileUrl = await uploadFile(uploadedFile, fileName);
        fileSize = uploadedFile.size;
        
        if (!fileUrl) {
          console.error('Failed to upload file to storage');
        } else {
          console.log('File uploaded successfully:', fileName, 'Size:', fileSize, 'URL:', fileUrl);
        }
      } catch (fileError) {
        console.error('File upload error:', fileError);
      }
    }

    // Insert the analysis record into Supabase
    const { data, error } = await supabase!
      .from('analysis_records')
      .insert([
        {
          patient_name: extractedData.patientName,
          date_of_birth: extractedData.dateOfBirth,
          patient_id: extractedData.patientId,
          insurance_provider: extractedData.insuranceProvider,
          full_text: extractedData.fullText,
          original_text: originalText,
          file_name: uploadedFile?.name || null,
          file_type: uploadedFile?.type || null,
          file_url: fileUrl,
          file_size: fileSize,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save analysis', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: data,
      message: 'Analysis saved successfully',
      fileUploaded: !!fileUrl,
      fileName: fileName,
      fileUrl: fileUrl
    });

  } catch (error) {
    console.error('Save analysis error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
