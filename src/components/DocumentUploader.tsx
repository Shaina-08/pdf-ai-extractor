'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { DocumentUploaderProps } from '../types/schemas';

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ onDrop, isUploading, uploadedFile }) => {
  const onDropCallback = useCallback((acceptedFiles: File[]) => {
    onDrop(acceptedFiles);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
  });

  return (
    <div className="text-center">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-12 transition-all duration-200 cursor-pointer ${
          isDragActive
                    ? 'border-green-600 bg-green-50'
        : 'border-gray-300 hover:border-green-600 hover:bg-gray-50'
        } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        
        {isUploading ? (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 mx-auto"></div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Uploading...</h3>
              <p className="text-gray-600">Please wait while we process your document</p>
            </div>
          </div>
        ) : uploadedFile ? (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">File Uploaded Successfully!</h3>
              <p className="text-gray-600 mb-2">{uploadedFile.name}</p>
              <p className="text-sm text-gray-500">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <span className="text-green-800 text-2xl">📄</span>
        </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isDragActive ? 'Drop your document here' : 'Upload Medical Document'}
              </h3>
              <p className="text-gray-600 mb-4">
                Drag and drop your document here, or click to browse
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <span className="mr-1">📄</span>
                  PDF
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUploader;
