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
      description: 'Drag and drop your medical document (PDF)',
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
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-primary-100/50 p-5">
      <div className="text-center mb-5">
        <h3 className="text-lg font-bold text-neutral-800 mb-2">📋 Process Status</h3>
        <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto"></div>
      </div>
      
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div 
            key={step.step} 
            className={`flex items-start space-x-3 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              step.status === 'completed' 
                ? 'bg-gradient-to-r from-primary-700 to-secondary-700 border border-primary-600' 
                : step.status === 'active'
                ? 'bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 animate-pulse-glow'
                : 'bg-neutral-50 border border-neutral-200'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              step.status === 'completed' 
                ? 'bg-white text-primary-700 shadow-lg' 
                : step.status === 'active'
                ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-lg animate-pulse'
                : 'bg-neutral-300 text-neutral-600'
            }`}>
              {step.status === 'completed' ? '✓' : step.step}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`text-sm font-semibold transition-colors duration-300 ${
                step.status === 'completed' 
                  ? 'text-white' 
                  : step.status === 'active'
                  ? 'text-primary-800'
                  : 'text-neutral-600'
              }`}>
                {step.title}
              </h4>
              <p className={`text-xs mt-1 leading-relaxed ${
                step.status === 'completed' 
                  ? 'text-white/80' 
                  : 'text-neutral-500'
              }`}>
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-primary-200/50">
        <h4 className="text-sm font-semibold text-neutral-800 mb-3 text-center">⚡ Quick Actions</h4>
        <div className="space-y-2">
          {!uploadedFile && (
            <div className="text-xs text-neutral-600 bg-gradient-to-r from-neutral-50 to-primary-50 p-3 rounded-xl border border-neutral-200/50 text-center animate-pulse">
              📤 Upload a document to get started
            </div>
          )}
          
          {uploadedFile && !extractedData && !isAnalyzing && (
            <div className="text-xs text-primary-700 bg-gradient-to-r from-primary-50 to-secondary-50 p-3 rounded-xl border border-primary-200/50 text-center animate-fade-in-up">
              🚀 Ready to analyze your document
            </div>
          )}
          
          {isAnalyzing && (
            <div className="text-xs text-primary-700 bg-gradient-to-r from-primary-50 to-secondary-50 p-3 rounded-xl border border-primary-200/50 text-center animate-pulse">
              🤖 AI is processing your document...
            </div>
          )}
          
          {extractedData && (
            <div className="text-xs text-emerald-700 bg-gradient-to-r from-emerald-50 to-green-50 p-3 rounded-xl border border-emerald-200/50 text-center animate-fade-in-up">
              ✅ Analysis complete! Review your results below
            </div>
          )}
        </div>
      </div>

      {uploadedFile && (
        <div className="mt-4 pt-4 border-t border-primary-200/50">
          <h4 className="text-sm font-semibold text-neutral-800 mb-3 text-center">📁 Current File</h4>
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-3 border border-primary-200/50">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-primary-600">📄</span>
              <span className="text-sm font-semibold text-neutral-800 truncate">
                {uploadedFile.name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-600">File Size:</span>
              <span className="text-xs font-semibold text-primary-700 bg-primary-100 px-2 py-1 rounded-full">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instructions;
