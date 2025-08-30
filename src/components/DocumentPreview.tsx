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
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-primary-100/50">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary-900">Document Preview</h2>
          <button
            onClick={onClose}
            className="text-primary-400 hover:text-primary-600 transition-colors p-2 hover:bg-primary-100 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-8">
          <div className="space-y-4">
            
            <div className="border-2 border-primary-200 rounded-2xl overflow-hidden bg-white shadow-lg">
              <iframe
                src={filePreview}
                className="w-full h-96"
                title="PDF Preview"
              />
            </div>
            
            <div className="flex items-center justify-between text-sm text-primary-700 bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-xl border border-primary-200/50">
              <span className="font-medium truncate">{uploadedFile.name}</span>
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-200/50">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">🤖 AI Analysis</h3>
                <p className="text-primary-700 text-sm leading-relaxed">
                  Extract patient information from this document using Gemini AI
                </p>
              </div>
              
              <button
                onClick={() => {
                  console.log('Button clicked! Calling onAnalyze...');
                  onAnalyze();
                }}
                disabled={isAnalyzing}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isAnalyzing
                    ? 'bg-primary-200 text-primary-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700 hover:shadow-xl shadow-lg'
                }`}
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span>Extract Patient Data</span>
                  </div>
                )}
              </button>
            </div>

            {isAnalyzing && (
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-200/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-primary-900">AI Analysis Progress</span>
                  <span className="text-xs text-primary-700 bg-primary-100 px-3 py-1 rounded-full font-medium">
                    Gemini AI
                  </span>
                </div>
                
                <div className="w-full bg-primary-200 rounded-full h-3 mb-3">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-primary-700">
                  <span className="font-medium">{Math.round(progress)}% Complete</span>
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
