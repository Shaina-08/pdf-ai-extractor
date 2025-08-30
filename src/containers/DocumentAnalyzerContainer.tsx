'use client';

import React, { useState, useCallback } from 'react';
import { UploadState } from '../types/schemas';
import DocumentUploader from '../components/DocumentUploader';
import DocumentPreview from '../components/DocumentPreview';
import ErrorDisplay from '../components/ErrorDisplay';
import ExtractedDataDisplay from '../components/ExtractedDataDisplay';
import Instructions from '../components/Instructions';

const DocumentAnalyzerContainer: React.FC = () => {
  const [state, setState] = useState<UploadState>({
    isUploading: false,
    isAnalyzing: false,
    extractedData: null,
    error: null,
    originalText: null,
    uploadedFile: null,
    filePreview: null,
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setState(prev => ({
      ...prev,
      isUploading: true,
      error: null,
      extractedData: null,
      originalText: null,
    }));

    try {
      const previewUrl = URL.createObjectURL(file);
      setState(prev => ({
        ...prev,
        filePreview: previewUrl,
        uploadedFile: file,
        isUploading: false,
      }));
    } catch {
      setState(prev => ({
        ...prev,
        error: 'Failed to create file preview',
        isUploading: false,
      }));
    }
  }, []);

  const analyzeDocument = async (): Promise<void> => {
    console.log('analyzeDocument called, uploadedFile:', state.uploadedFile);
    
    if (!state.uploadedFile) {
      console.log('No uploaded file found');
      return;
    }

    console.log('Starting analysis for file:', state.uploadedFile.name, 'Type:', state.uploadedFile.type);

    setState(prev => ({
      ...prev,
      isAnalyzing: true,
      error: null,
      extractedData: null,
      originalText: null,
    }));

    const formData = new FormData();
    formData.append('file', state.uploadedFile);

    try {
      console.log('Sending request to /api/upload...');
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response result:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Analysis failed');
      }

      setState(prev => ({
        ...prev,
        extractedData: result.data,
        originalText: result.originalText,
        isAnalyzing: false,
      }));
      
      console.log('Analysis completed successfully');
    } catch (err) {
      console.error('Analysis error:', err);
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'An error occurred',
        isAnalyzing: false,
      }));
    }
  };

  const handleClose = (): void => {
    setState({
      isUploading: false,
      isAnalyzing: false,
      extractedData: null,
      error: null,
      originalText: null,
      uploadedFile: null,
      filePreview: null,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-neutral-800 mb-2">
          Medical Document Analyzer
        </h1>
        <p className="text-lg text-neutral-600">
          Upload a medical document and extract patient information with AI
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          {!state.uploadedFile ? (
            <DocumentUploader
              onDrop={onDrop}
              isDragActive={false}
              isUploading={state.isUploading}
              uploadedFile={state.uploadedFile}
            />
          ) : (
            <DocumentPreview
              filePreview={state.filePreview!}
              uploadedFile={state.uploadedFile}
              onAnalyze={analyzeDocument}
              isAnalyzing={state.isAnalyzing}
              onClose={handleClose}
            />
          )}

          {state.error && <ErrorDisplay error={state.error} />}

          {state.extractedData && (
            <ExtractedDataDisplay
              extractedData={state.extractedData}
              originalText={state.originalText}
              uploadedFile={state.uploadedFile}
            />
          )}
        </div>

        <div className="xl:col-span-1">
          <div className="sticky top-6">
            <Instructions
              uploadedFile={state.uploadedFile}
              isAnalyzing={state.isAnalyzing}
              extractedData={state.extractedData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentAnalyzerContainer;
