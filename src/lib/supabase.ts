import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create Supabase client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface AnalysisRecord {
  id?: string;
  patient_name: string | null;
  date_of_birth: string | null;
  patient_id: string | null;
  insurance_provider: string | null;
  original_text: string | null;
  file_name: string | null;
  file_type: string | null;
  file_url: string | null;
  file_size: number | null;
  created_at?: string;
  updated_at?: string;
}

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase environment variables are not configured.');
    console.warn('Please create a .env file with:');
    console.warn('NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url');
    console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key');
    console.warn('See SUPABASE_SETUP.md for detailed setup instructions.');
    return false;
  }
  return true;
};

// Helper function to get configuration status
export const getSupabaseStatus = () => {
  return {
    configured: isSupabaseConfigured(),
    url: supabaseUrl,
    hasKey: !!supabaseAnonKey
  };
};

// Storage bucket name for PDFs
export const STORAGE_BUCKET = 'medical-documents';

// Helper function to upload file to Supabase storage
export const uploadFile = async (file: File, fileName: string): Promise<string | null> => {
  if (!supabase) return null;
  
  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(fileName);

    return urlData?.publicUrl || null;
  } catch (error) {
    console.error('File upload failed:', error);
    return null;
  }
};

// Helper function to delete file from storage
export const deleteFile = async (fileName: string): Promise<boolean> => {
  if (!supabase) return false;
  
  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([fileName]);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('File deletion failed:', error);
    return false;
  }
};
