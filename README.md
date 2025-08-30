# Medical Document Analyzer

A Next.js application that uses Google's Gemini AI to extract patient information directly from PDF documents. The application can identify patient names and dates of birth from medical documents, even when the information appears in random locations within the PDF.
✨ Handwritten text in scanned PDFs is supported.

## Features

- 📄 PDF file upload with drag-and-drop support
- 🤖 AI-powered direct PDF analysis using Gemini
- 🎯 Automatic patient name and date of birth detection
- 📱 Responsive, modern UI with Tailwind CSS
- ⚡ Real-time processing and results display
- 🔒 Secure file handling
- 💾 History tracking with Supabase database
- 📁 File storage and preview capabilities

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key
- Supabase account and project (optional, for history features)

## Setup

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```bash
   # Required: Gemini API Key
   # Get your API key from https://aistudio.google.com/apikey
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Optional: Supabase Configuration (for history features)
   # Get these from your Supabase project dashboard > Settings > API
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Configure Supabase (Optional):**
   If you want to use the history tracking features:
   - Follow the detailed setup guide in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
   - This enables saving analysis results and viewing document history

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | ✅ Yes | Your Google Gemini API key for AI document analysis |
| `NEXT_PUBLIC_SUPABASE_URL` | ❌ No | Supabase project URL for database and storage features |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ❌ No | Supabase anonymous key for database and storage features |

### Getting API Keys

- **Gemini API Key**: Visit [Google AI Studio](https://aistudio.google.com/apikey) to create your API key
- **Supabase Credentials**: Go to your Supabase project dashboard → Settings → API to find your project URL and anon key

## Usage

1. **Upload a PDF:** Drag and drop a PDF file onto the upload area or click to browse
2. **Wait for processing:** The AI will analyze the document directly
3. **View results:** Patient name and date of birth will be displayed in a clean format
4. **Save to history:** (Optional) Click "Save to History" to store the analysis in your database
5. **View history:** (Optional) Navigate to the History page to see all previous analyses

## How it Works

1. **Direct PDF Analysis:** Gemini AI analyzes the PDF file directly without intermediate text extraction
2. **AI Processing:** Google's Gemini 1.5 Flash model processes the document to identify patient information
3. **Flexible Detection:** The AI can find patient names and dates in various formats and locations within the document
4. **Results Display:** Extracted information is presented in a user-friendly interface
5. **Data Persistence:** (Optional) Analysis results can be saved to Supabase database with file storage

## API Endpoints

### POST /api/upload
Uploads and processes a PDF file using Gemini AI.

**Request:**
- Content-Type: `multipart/form-data`
- Body: PDF file

**Response:**
```json
{
  "success": true,
  "data": {
    "patientName": "John Doe",
    "dateOfBirth": "01/15/1985"
  },
  "originalText": "AI analysis response..."
}
```

### POST /api/save-analysis
Saves analysis results to the database (requires Supabase setup).

### GET /api/get-history
Retrieves analysis history from the database (requires Supabase setup).

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Google Gemini AI** - AI document analysis
- **Supabase** - Database and file storage
- **react-dropzone** - File upload interface

## Security Notes

- Gemini API key should be kept secure and not committed to version control
- Supabase credentials are safe to expose as they are public keys designed for client-side use
- File uploads are limited to 10MB for security

## Troubleshooting

- **"No file uploaded"** - Make sure you're uploading a PDF file
- **"Failed to analyze document with AI"** - Check your Gemini API key and quota
- **"File must be a PDF"** - Only PDF files are supported
- **"File size must be less than 10MB"** - Reduce file size or compress the PDF
- **"Supabase not configured"** - Set up Supabase environment variables or ignore if you don't need history features

## License

MIT License
