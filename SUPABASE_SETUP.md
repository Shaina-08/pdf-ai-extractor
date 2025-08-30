# Supabase Setup Guide

## Prerequisites
- A Supabase account and project
- Node.js and npm installed

## Setup Steps

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Wait for the project to be ready

### 2. Create Database Table
Run the following SQL in your Supabase SQL editor:

```sql
-- Create the analysis_records table
CREATE TABLE analysis_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_name TEXT,
  date_of_birth TEXT,
  patient_id TEXT,
  insurance_provider TEXT,
  full_text TEXT,
  original_text TEXT,
  file_name TEXT,
  file_type TEXT,
  file_url TEXT,
  file_size BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE analysis_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations" ON analysis_records
  FOR ALL USING (true);

-- index on created_at for better performance
CREATE INDEX idx_analysis_records_created_at ON analysis_records(created_at);
```

### 3. Create Storage Bucket
Run this SQL to create a storage bucket for PDFs and images:

```sql
-- Insert storage bucket configuration
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'medical-documents',
  'medical-documents',
  true,
  52428800,
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/webp']
);

-- storage policy for public read access
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'medical-documents');

-- storage policy for authenticated uploads
CREATE POLICY "Authenticated Uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'medical-documents');
```

### 4. Get API Keys
1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the following values:
   - Project URL
   - Anon (public) key

### 5. Configure Environment Variables
Create a `.env` file in your project root with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace the placeholder values with your actual Supabase credentials.

### 6. Test the Setup
1. Start your development server: `npm run dev`
2. Upload and analyze a document
3. Click "Save to History" to test the save functionality
4. Check the History page to see saved analyses with PDF previews

## Features Added
- **PDF Storage**: PDFs are automatically uploaded to Supabase storage
- **File Preview**: View PDFs directly in the history page
- **Image Support**: Supports various image formats (JPEG, PNG, GIF, WebP)
- **File Metadata**: Stores file size, type, and URL information
- **Public Access**: Files are publicly accessible for viewing
