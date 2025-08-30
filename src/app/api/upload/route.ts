import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const supportedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    if (!supportedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'File type not supported. Please upload PDF, DOC, DOCX, or TXT files.' },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured. Please set GEMINI_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString('base64');

    let mimeType = file.type;
    if (file.type === 'application/msword') {
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a document analyzer that extracts person names and dates of birth from any type of document. Analyze this document and extract the person's name and date of birth.

Guidelines for finding person information:
- Look for names in various formats: "Name:", "Patient:", "Full Name:", "Patient Name:", "Name of Patient:", "Contact:", etc.
- Also look for names without explicit labels - scan the entire document for human names
- Check headers, footers, contact information, and any text that might contain a person's name
- Look for dates of birth in various formats: "DOB:", "Date of Birth:", "Born:", "Birth Date:", "Birth:", "Date:", etc.
- Be flexible with date formats (MM/DD/YYYY, DD/MM/YYYY, Month DD, YYYY, etc.)
- If multiple names or dates are found, choose the most likely person information (usually the most prominent, repeated, or in the header)
- If information is not found, return null for that field
- Consider document context - this could be a resume, medical document, application form, or any document with personal information

Search strategies:
1. First look for explicitly labeled person information
2. If not found, scan for any human names in the document (especially in headers or contact sections)
3. Look for dates that could be birth dates
4. Use context clues to determine which name/date belongs to the main person
5. For resumes/CVs, the name is usually at the top
6. For medical documents, look for patient information
7. For any document, check contact information sections

Return ONLY a valid JSON object in this exact format:
{
  "patientName": "Full Name or null",
  "dateOfBirth": "MM/DD/YYYY or null",
  "patientId": "Patient ID or null",
  "insuranceProvider": "Insurance Provider or null"
}

Do not include any additional text, explanations, or formatting outside the JSON object.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: mimeType,
          data: base64Data
        }
      }
    ]);

    const response = await result.response;
    const aiResponse = response.text();
    
    if (!aiResponse) {
      return NextResponse.json(
        { error: 'Failed to analyze document with AI' },
        { status: 500 }
      );
    }

    let extractedData;
    try {
      let cleanedResponse = aiResponse.trim();
      
      if (cleanedResponse.startsWith('```json')) {
        cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedResponse.startsWith('```')) {
        cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      extractedData = JSON.parse(cleanedResponse);
      
      if (typeof extractedData !== 'object' || extractedData === null) {
        throw new Error('Invalid response structure');
      }
      
      extractedData = {
        patientName: extractedData.patientName || null,
        dateOfBirth: extractedData.dateOfBirth || null,
        patientId: extractedData.patientId || null,
        insuranceProvider: extractedData.insuranceProvider || null
      };
      
    } catch (parseError) {
      console.error('AI response parsing error:', parseError);
      console.error('Raw AI response:', aiResponse);
      return NextResponse.json(
        { error: 'Failed to parse AI response. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: extractedData,
      originalText: aiResponse.substring(0, 500) + (aiResponse.length > 500 ? '...' : '') // Return first 500 chars for debugging
    });

  } catch (error) {
    console.error('Error processing document:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
