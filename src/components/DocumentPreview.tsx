'use client';

import React, { useState, useEffect } from 'react';
import { DocumentPreviewProps } from '../types/schemas';

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ 
  filePreview, 
  uploadedFile, 
  onAnalyze, 
  isAnalyzing, 
  onClose 
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 15;
        });
      }, 500);
      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isAnalyzing]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Document Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PDF Preview */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Document</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
              <iframe
                src={filePreview}
                className="w-full h-80"
                title="PDF Preview"
              />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="truncate">{uploadedFile.name}</span>
              <span>{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">AI Analysis</h3>
              <p className="text-gray-600 text-sm mb-4">
                Extract patient information from this document using Gemini AI
              </p>
              
              <button
                onClick={() => {
                  console.log('Button clicked! Calling onAnalyze...');
                  onAnalyze();
                }}
                disabled={isAnalyzing}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  isAnalyzing
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-md transform hover:scale-[1.02]'
                }`}
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span>Extract Patient Data</span>
                  </div>
                )}
              </button>
            </div>

            {isAnalyzing && (
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-900">AI Analysis Progress</span>
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    Gemini AI
                  </span>
                </div>
                
                <div className="w-full bg-blue-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-blue-700">
                  <span>{Math.round(progress)}% Complete</span>
                  <span>Extracting patient information...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
