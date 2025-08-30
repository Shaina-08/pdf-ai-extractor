'use client';

import React from 'react';
import { InstructionsProps } from '../types/schemas';

const Instructions: React.FC<InstructionsProps> = ({ uploadedFile, isAnalyzing, extractedData }) => {
  const getCurrentStep = () => {
    if (!uploadedFile) return 1;
    if (uploadedFile && !extractedData && !isAnalyzing) return 2;
    if (isAnalyzing) return 3;
    if (extractedData) return 4;
    return 1;
  };

  const currentStep = getCurrentStep();

  const steps = [
    {
      step: 1,
      title: 'Upload Document',
      description: 'Drag and drop your medical document (PDF,TXT)',
      icon: '📄',
      status: currentStep >= 1 ? 'completed' : 'pending'
    },
    {
      step: 2,
      title: 'Review & Analyze',
      description: 'Preview the document and click analyze to extract data',
      icon: '🔍',
      status: currentStep >= 2 ? 'completed' : 'pending'
    },
    {
      step: 3,
      title: 'AI Processing',
      description: 'Gemini AI extracts patient information from your document',
      icon: '🤖',
      status: currentStep === 3 ? 'active' : currentStep > 3 ? 'completed' : 'pending'
    },
    {
      step: 4,
      title: 'View Results',
      description: 'Review extracted patient data in organized format',
      icon: '✅',
      status: currentStep >= 4 ? 'completed' : 'pending'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Process Status</h3>
      
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.step} className="flex items-start space-x-3">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step.status === 'completed' 
                ? 'bg-green-100 text-green-700' 
                : step.status === 'active'
                ? 'bg-blue-100 text-blue-700 animate-pulse'
                : 'bg-gray-100 text-gray-400'
            }`}>
              {step.status === 'completed' ? '✓' : step.step}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`text-sm font-medium ${
                step.status === 'completed' 
                  ? 'text-green-900' 
                  : step.status === 'active'
                  ? 'text-blue-900'
                  : 'text-gray-500'
              }`}>
                {step.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h4>
        <div className="space-y-2">
          {!uploadedFile && (
            <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
              Upload a document to get started
            </div>
          )}
          
          {uploadedFile && !extractedData && !isAnalyzing && (
            <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded border border-blue-200">
              Ready to analyze your document
            </div>
          )}
          
          {isAnalyzing && (
            <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded border border-blue-200">
              AI is processing your document...
            </div>
          )}
          
          {extractedData && (
            <div className="text-xs text-green-600 bg-green-50 p-2 rounded border border-green-200">
              Analysis complete! Review your results below
            </div>
          )}
        </div>
      </div>

      {uploadedFile && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Current File</h4>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-gray-500">📄</span>
              <span className="text-sm font-medium text-gray-900 truncate">
                {uploadedFile.name}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instructions;
