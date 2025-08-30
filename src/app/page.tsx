'use client';

import React, { useState } from 'react';
import Layout from '../components/Layout';
import DocumentUploader from '../components/DocumentUploader';
import DocumentPreview from '../components/DocumentPreview';
import ErrorDisplay from '../components/ErrorDisplay';
import ExtractedDataDisplay from '../components/ExtractedDataDisplay';
import Instructions from '../components/Instructions';

interface AppState {
  isUploading: boolean;
  isAnalyzing: boolean;
  extractedData: any;
  error: string | null;
  originalText: string | null;
  uploadedFile: File | null;
  filePreview: string | null;
}

const HomePage: React.FC = () => {
  const [state, setState] = useState<AppState>({
    isUploading: false,
    isAnalyzing: false,
    extractedData: null,
    error: null,
    originalText: null,
    uploadedFile: null,
    filePreview: null,
  });

  const onDrop = async (acceptedFiles: File[]) => {
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
  };

  const analyzeDocument = async () => {
    if (!state.uploadedFile) return;

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
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Analysis failed');
      }

      setState(prev => ({
        ...prev,
        extractedData: result.data,
        originalText: result.originalText,
        isAnalyzing: false,
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'An error occurred',
        isAnalyzing: false,
      }));
    }
  };

  const handleClose = () => {
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
    <Layout currentPage="home">
      <div className="min-h-screen bg-gradient-to-br from-green-25 via-green-50 via-emerald-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Intelligent</span>
              <br />
              <span className="text-neutral-800">Document Analysis</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Transform your documents into structured data with advanced AI technology. 
              Upload PDFs and get instant insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="animate-pulse-glow">
                <button 
                  className="btn-primary text-lg px-8 py-4"
                  onClick={() => {
                    const uploadSection = document.getElementById('upload');
                    if (uploadSection) {
                      const navbarHeight = 80; // Height of the navbar
                      const elementPosition = uploadSection.offsetTop - navbarHeight - 20; // Extra 20px padding
                      window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  Start Analyzing
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-neutral-800 mb-2">
                Medical Document Analyzer
              </h2>
              <p className="text-lg text-neutral-600">
                Upload a medical document and extract patient information with AI
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div id="upload" className="xl:col-span-2 space-y-6 animate-fade-in-left scroll-mt-24" style={{ animationDelay: '200ms' }}>
                {!state.uploadedFile ? (
                  <DocumentUploader
                    onDrop={onDrop}
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

              <div className="xl:col-span-1 animate-fade-in-right" style={{ animationDelay: '400ms' }}>
                <div className="sticky top-24">
                  <Instructions
                    uploadedFile={state.uploadedFile}
                    isAnalyzing={state.isAnalyzing}
                    extractedData={state.extractedData}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-800 mb-4">Why Choose Our Platform?</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Experience the power of AI-driven document analysis with enterprise-grade features
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '⚡',
                  title: 'AI-Powered Medical Document Analysis',
                  description: 'Advanced Google Gemini AI extracts patient information with high accuracy from any medical document format.'
                },
                {
                  icon: '🛡️',
                  title: 'Secure & Professional Document Management',
                  description: 'Enterprise-grade Supabase backend with secure storage and comprehensive analysis history for medical applications.'
                },
                {
                  icon: '🚀',
                  title: 'Intelligent PDF Processing & Preview',
                  description: 'Seamless upload, real-time AI analysis, and instant preview with original filename preservation.'
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl border border-primary-100/50 card-hover"
                  style={{ animationDelay: `${1000 + index * 200}ms` }}
                >
                  <div className="text-6xl mb-4 animate-float">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-neutral-800 mb-3">{feature.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
