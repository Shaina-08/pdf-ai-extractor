'use client';

import React, { useState } from 'react';
import { ExtractedDataDisplayProps } from '../types/schemas';

const ExtractedDataDisplay: React.FC<ExtractedDataDisplayProps> = ({ extractedData, originalText, uploadedFile }) => {
  const [showOriginalText, setShowOriginalText] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showWarning, setShowWarning] = useState(false);
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(extractedData.fullText || '');
      setShowCopyTooltip(true);
      setTimeout(() => setShowCopyTooltip(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const dataFields = [
    {
      key: 'patientName',
      label: 'Patient Name',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      bgColor: 'bg-green-50',
      textColor: 'text-green-900',
      borderColor: 'border-green-300'
    },
    {
      key: 'dateOfBirth',
      label: 'Date of Birth',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: 'bg-green-50',
      textColor: 'text-green-900',
      borderColor: 'border-green-300'
    },
    {
      key: 'patientId',
      label: 'Patient ID',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      ),
      bgColor: 'bg-green-100',
      textColor: 'text-green-900',
      borderColor: 'border-green-300'
    },
    {
      key: 'insuranceProvider',
      label: 'Insurance Provider',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-800',
      borderColor: 'border-orange-200'
    }
  ];

  const handleSave = async () => {
    if (!showWarning) {
      setShowWarning(true);
      return;
    }

    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const formData = new FormData();
      formData.append('extractedData', JSON.stringify(extractedData));
      formData.append('originalText', originalText || '');
      
      if (uploadedFile) {
        formData.append('file', uploadedFile);
      }

      const response = await fetch('/api/save-analysis', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSaveStatus('success');
        setShowWarning(false);
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        throw new Error(result.error || 'Failed to save');
      }
    } catch (error) {
      console.error('Save error:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {extractedData.fullText && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Extracted Text</h2>
              <div className="flex items-center space-x-2 relative">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">AI Extracted</span>
                <button
                  onClick={handleCopyText}
                  className="ml-2 p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  title="Copy text"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                {showCopyTooltip && (
                  <div className="fixed bottom-8 right-8 bg-green-500 text-white px-4 py-3 rounded-xl shadow-2xl animate-bounce z-50">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">🎉</span>
                      <span className="text-base font-semibold">Text Copied!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="max-h-96 overflow-y-auto">
                <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed font-serif tracking-wide">
                  {extractedData.fullText}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Extracted Patient Data</h3>
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
                  <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                    {field.label}
                  </h3>
                </div>
                <p className={`text-base font-semibold ${field.textColor}`}>
                  {extractedData[field.key as keyof typeof extractedData] || 'Not found'}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {showWarning && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Data Privacy Warning
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>
                            By saving this analysis, you acknowledge that:
                          </p>
                          <ul className="list-disc list-inside mt-1 space-y-1">
                            <li>This data will be stored in our secure database</li>
                            <li>Other authorized users may have access to view this information</li>
                            <li>Patient data will be handled according to our privacy policy</li>
                            <li>You have obtained proper consent for data processing</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {saveStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2 text-sm font-medium text-green-800">
                          Analysis saved successfully!
                        </span>
                      </div>
                      <a
                        href="/history"
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-primary-700 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                      >
                        View History
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                    {uploadedFile && (
                      <p className="text-xs text-green-600 mt-2 ml-7">
                        File &quot;{uploadedFile.name}&quot; uploaded to storage
                      </p>
                    )}
                  </div>
                )}

                {saveStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-sm font-medium text-red-800">
                        Failed to save analysis. Please try again.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {showWarning ? 'Click "Save Analysis" to confirm and save to database' : 'Save this analysis to your history'}
              </div>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white transition-all duration-200 shadow-lg hover:shadow-xl ${
                  showWarning
                    ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                    : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:ring-red-500'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105`}
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-25" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : showWarning ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Analysis
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    Save to History
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {originalText && !extractedData.fullText && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Source Document</h3>
              <button
                onClick={() => setShowOriginalText(!showOriginalText)}
                className="text-sm text-green-700 hover:text-green-900 font-medium flex items-center space-x-1"
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
