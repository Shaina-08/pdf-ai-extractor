# Medical Document Analyzer

A Next.js application that uses Google's Gemini AI to extract patient information directly from PDF/TXT documents. The application can identify patient names and dates of birth from medical documents, even when the information appears in random locations within the PDF/TXT.
✨ Handwritten text in scanned PDFs is supported.

## Features

- 📄 PDF/TXT file upload with drag-and-drop support
- 🤖 AI-powered direct PDF/TXT analysis using Gemini
- 🎯 Automatic patient name and date of birth detection
- 📱 Responsive, modern UI with Tailwind CSS
- ⚡ Real-time processing and results display
- 🔒 Secure file handling

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key

## Setup

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```bash
   # Gemini API Key
   # Get your API key from https://aistudio.google.com/apikey
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Upload a PDF/TXT:** Drag and drop a PDF/TXT/TXT file onto the upload area or click to browse
2. **Wait for processing:** The AI will analyze the document directly
3. **View results:** Patient name and date of birth will be displayed in a clean format

## How it Works

1. **Direct PDF/TXT Analysis:** Gemini AI analyzes the PDF/TXT file directly without intermediate text extraction
2. **AI Processing:** Google's Gemini 1.5 Flash model processes the document to identify patient information
3. **Flexible Detection:** The AI can find patient names and dates in various formats and locations within the document
4. **Results Display:** Extracted information is presented in a user-friendly interface

## API Endpoints

### POST /api/upload
Uploads and processes a PDF/TXT file using Gemini AI.

**Request:**
- Content-Type: `multipart/form-data`
- Body: PDF/TXT file

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

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Google Gemini AI** - AI document analysis
- **react-dropzone** - File upload interface

## Security Notes

- Gemini API key should be kept secure and not committed to version control

## Troubleshooting

- **"No file uploaded"** - Make sure you're uploading a PDF/TXT file
- **"Failed to analyze document with AI"** - Check your Gemini API key and quota
- **"File must be a PDF/TXT"** - Only PDF/TXT files are supported
- **"File size must be less than 10MB"** - Reduce file size or compress the PDF/TXT

## License

MIT License
