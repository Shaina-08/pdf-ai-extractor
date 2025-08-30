'use client';

import React, { useState } from 'react';
import { ExtractedDataDisplayProps } from '../types/schemas';

const ExtractedDataDisplay: React.FC<ExtractedDataDisplayProps> = ({ extractedData, originalText }) => {
  const [showOriginalText, setShowOriginalText] = useState(false);

  const dataFields = [
    {
      key: 'patientName',
      label: 'Patient Name',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200'
    },
    {
      key: 'dateOfBirth',
      label: 'Date of Birth',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
      borderColor: 'border-green-200'
    },
    {
      key: 'patientId',
      label: 'Patient ID',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      ),
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-800',
      borderColor: 'border-purple-200'
    },
    {
      key: 'insuranceProvider',
      label: 'Insurance Provider',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-800',
      borderColor: 'border-orange-200'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Extracted Patient Data</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">AI Verified</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataFields.map((field) => (
              <div key={field.key} className={`${field.bgColor} ${field.borderColor} border rounded-lg p-4`}>
                <div className="flex items-center mb-2">
                  <div className={`${field.textColor} mr-2`}>
                    {field.icon}
                  </div>
                  <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                    {field.label}
                  </h3>
                </div>
                <p className={`text-lg font-semibold ${field.textColor}`}>
                  {extractedData[field.key as keyof typeof extractedData] || 'Not found'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {originalText && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Source Document</h3>
              <button
                onClick={() => setShowOriginalText(!showOriginalText)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
              >
                <span>{showOriginalText ? 'Hide' : 'Show'} Text</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${showOriginalText ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            {showOriginalText && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="max-h-64 overflow-y-auto">
                  <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                    {originalText}
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  AI extracted data from the above document text
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtractedDataDisplay;
