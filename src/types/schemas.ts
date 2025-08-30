export interface ExtractedData {
  patientName: string | null;
  dateOfBirth: string | null;
  patientId: string | null;
  insuranceProvider: string | null;
}

export interface UploadState {
  isUploading: boolean;
  isAnalyzing: boolean;
  extractedData: ExtractedData | null;
  error: string | null;
  originalText: string | null;
  uploadedFile: File | null;
  filePreview: string | null;
}

export interface NavbarProps {
  currentPage?: string;
}

export interface DocumentUploaderProps {
  onDrop: (files: File[]) => void;
  isDragActive: boolean;
  isUploading: boolean;
  uploadedFile: File | null;
}

export interface DocumentPreviewProps {
  filePreview: string;
  uploadedFile: File;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  onClose: () => void;
}

export interface AnalysisProgressProps {
  isAnalyzing: boolean;
}

export interface ExtractedDataDisplayProps {
  extractedData: ExtractedData;
  originalText: string | null;
}

export interface ErrorDisplayProps {
  error: string;
}

export interface InstructionsProps {
  uploadedFile: File | null;
  isAnalyzing: boolean;
  extractedData: ExtractedData | null;
}
