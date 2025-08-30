'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { AnalysisRecord } from '../../lib/supabase';

const HistoryPage: React.FC = () => {
  const [analyses, setAnalyses] = useState<AnalysisRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchHistory();
  }, []);

  const toggleCard = (id: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/get-history');
      const result = await response.json();

      if (response.ok) {
        setAnalyses(result.data);
      } else {
        setError(result.error || 'Failed to fetch history');
      }
    } catch {
      setError('Failed to fetch analysis history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getStatusColor = (data: AnalysisRecord) => {
    const hasData = data.patient_name || data.patient_id || data.date_of_birth || data.insurance_provider;
    return hasData ? 'bg-primary-100 text-primary-800 border-primary-300' : 'bg-amber-100 text-amber-800 border-amber-300';
  };

  const getStatusText = (data: AnalysisRecord) => {
    const hasData = data.patient_name || data.patient_id || data.date_of_birth || data.insurance_provider;
    return hasData ? 'Complete' : 'Partial';
  };

  const isPDF = (fileType: string | null) => {
    return fileType === 'application/pdf';
  };

  const isImage = (fileType: string | null) => {
    return fileType && fileType.startsWith('image/');
  };

  const canPreview = (fileType: string | null) => {
    return isPDF(fileType) || isImage(fileType);
  };

  if (loading) {
    return (
      <Layout currentPage="history">
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <p className="text-lg text-primary-700 font-medium">Loading your analysis history...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout currentPage="history">
        <div className="min-h-screen bg-gradient-to-br from-primary-25 via-primary-50 to-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm border border-red-200 rounded-2xl p-8 text-center shadow-xl animate-fade-in-up">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-3">Unable to Load History</h3>
              <p className="text-primary-700 mb-6 max-w-md mx-auto">{error}</p>
              <button
                onClick={fetchHistory}
                className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-xl font-medium hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentPage="history">
      <div className="min-h-screen bg-gradient-to-br from-primary-25 via-primary-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-primary-900 mb-2">
                  Analysis History
                </h1>
                <p className="text-primary-700">
                  Review and manage your previously analyzed documents
                </p>
              </div>
              <button
                onClick={fetchHistory}
                disabled={loading}
                className="bg-white/80 backdrop-blur-sm border border-primary-200 text-primary-700 px-6 py-3 rounded-xl font-medium hover:bg-white hover:border-primary-300 transition-all duration-200 transform hover:scale-105 shadow-sm flex items-center"
              >
                <svg className={`w-5 h-5 mr-3 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
              </button>
            </div>
          </div>

          {analyses.length === 0 ? (
            <div className="animate-scale-in">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-primary-200 p-12">
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                    <svg className="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-primary-900 mb-4">Begin Your Journey</h3>
                  <p className="text-primary-700 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                    Your analyzed documents will appear here, ready for review and reference.
                  </p>
                  <Link
                    href="/#upload"
                    className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-lg px-8 py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    Start Your First Analysis
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {analyses.map((analysis, index) => {
                const isExpanded = expandedCards.has(analysis.id || '');
                return (
                  <div 
                    key={analysis.id} 
                    className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-primary-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] animate-fade-in-up cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => analysis.id && toggleCard(analysis.id)}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-sm">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-primary-900 mb-1">
                              {analysis.file_name || 'Document Analysis'}
                            </h3>
                            <div className="flex items-center space-x-3 text-xs text-primary-600">
                              <span>{analysis.created_at ? formatDate(analysis.created_at) : 'Unknown date'}</span>
                              <span>•</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(analysis)}`}>
                                {getStatusText(analysis)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <svg 
                            className={`w-5 h-5 text-primary-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-primary-100 bg-primary-50/50">
                        <div className="p-4 space-y-4">
                          {/* File Info */}
                          <div className="grid grid-cols-2 gap-4 text-xs text-primary-700">
                            {analysis.file_type && (
                              <div>
                                <span className="font-medium">File type:</span> {analysis.file_type}
                              </div>
                            )}
                            {analysis.file_size && (
                              <div>
                                <span className="font-medium">Size:</span> {formatFileSize(analysis.file_size)}
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="lg:col-span-2">
                              {analysis.file_url && canPreview(analysis.file_type) ? (
                                <div className="bg-white rounded-lg p-3 border border-primary-200">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-sm font-semibold text-primary-800">Document Preview</h4>
                                    <a
                                      href={analysis.file_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-primary-600 hover:text-primary-700 font-medium hover:underline"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      Open Full Size
                                    </a>
                                  </div>
                                  
                                  <div className="w-full h-48 border border-primary-200 rounded-md overflow-hidden bg-white shadow-sm">
                                    {isPDF(analysis.file_type) ? (
                                      <iframe
                                        src={`${analysis.file_url}#toolbar=0&navpanes=0&scrollbar=0`}
                                        className="w-full h-full"
                                        title="PDF Preview"
                                      />
                                    ) : isImage(analysis.file_type) ? (
                                      <img
                                        src={analysis.file_url}
                                        alt="Document Preview"
                                        className="w-full h-full object-contain"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center text-primary-400">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div className="bg-white rounded-lg p-4 border border-primary-200 text-center">
                                  <div className="w-10 h-10 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                  </div>
                                  <p className="text-primary-500 text-xs">Preview not available</p>
                                </div>
                              )}
                            </div>

                            <div className="lg:col-span-1">
                              <h4 className="text-sm font-semibold text-primary-800 mb-3">Extracted Data</h4>
                              <div className="space-y-2">
                                {analysis.patient_name && analysis.patient_name.trim() !== '' && analysis.patient_name.trim().toLowerCase() !== 'null' && (
                                  <div className="bg-white border border-primary-200 rounded-md p-2 hover:bg-primary-50 transition-all duration-200">
                                    <div className="flex items-center mb-1">
                                      <div className="w-5 h-5 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-sm flex items-center justify-center mr-2 shadow-sm">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                      </div>
                                      <span className="text-xs font-medium text-primary-600 uppercase tracking-wider">Patient Name</span>
                                    </div>
                                    <p className="text-xs font-medium text-primary-800 truncate">{analysis.patient_name}</p>
                                  </div>
                                )}

                                {analysis.date_of_birth && analysis.date_of_birth.trim() !== '' && analysis.date_of_birth.trim().toLowerCase() !== 'null' && (
                                  <div className="bg-white border border-primary-200 rounded-md p-2 hover:bg-primary-50 transition-all duration-200">
                                    <div className="flex items-center mb-1">
                                      <div className="w-5 h-5 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-sm flex items-center justify-center mr-2 shadow-sm">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                                        </svg>
                                      </div>
                                      <span className="text-xs font-medium text-primary-600 uppercase tracking-wider">Date of Birth</span>
                                    </div>
                                    <p className="text-xs font-medium text-primary-800">{analysis.date_of_birth}</p>
                                  </div>
                                )}

                                {analysis.patient_id && analysis.patient_id.trim() !== '' && analysis.patient_id.trim().toLowerCase() !== 'null' && (
                                  <div className="bg-white border border-primary-200 rounded-md p-2 hover:bg-primary-50 transition-all duration-200">
                                    <div className="flex items-center mb-1">
                                      <div className="w-5 h-5 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-sm flex items-center justify-center mr-2 shadow-sm">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                        </svg>
                                      </div>
                                      <span className="text-xs font-medium text-primary-600 uppercase tracking-wider">Patient ID</span>
                                    </div>
                                    <p className="text-xs font-medium text-primary-800 truncate">{analysis.patient_id}</p>
                                  </div>
                                )}

                                {analysis.insurance_provider && analysis.insurance_provider.trim() !== '' && analysis.insurance_provider.trim().toLowerCase() !== 'null' && (
                                  <div className="bg-white border border-primary-200 rounded-md p-2 hover:bg-primary-50 transition-all duration-200">
                                    <div className="flex items-center mb-1">
                                      <div className="w-5 h-5 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-sm flex items-center justify-center mr-2 shadow-sm">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                      </div>
                                      <span className="text-xs font-medium text-primary-600 uppercase tracking-wider">Insurance Provider</span>
                                    </div>
                                    <p className="text-xs font-medium text-primary-800 truncate">{analysis.insurance_provider}</p>
                                  </div>
                                )}

                                {(!analysis.patient_name || analysis.patient_name.trim() === '' || analysis.patient_name.trim().toLowerCase() === 'null') &&
                                 (!analysis.date_of_birth || analysis.date_of_birth.trim() === '' || analysis.date_of_birth.trim().toLowerCase() === 'null') &&
                                 (!analysis.patient_id || analysis.patient_id.trim() === '' || analysis.patient_id.trim().toLowerCase() === 'null') &&
                                 (!analysis.insurance_provider || analysis.insurance_provider.trim() === '' || analysis.insurance_provider.trim().toLowerCase() === 'null') && (
                                  <div className="bg-white border border-primary-200 rounded-md p-3 text-center">
                                    <div className="w-6 h-6 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-1">
                                      <svg className="w-3 h-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                    </div>
                                    <p className="text-primary-500 text-xs">No data was extracted from this document</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {analysis.original_text && (
                            <details className="mt-4">
                              <summary className="cursor-pointer text-sm text-primary-700 hover:text-primary-800 font-medium flex items-center group" onClick={(e) => e.stopPropagation()}>
                                <svg className="w-4 h-4 mr-2 text-primary-500 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                View Original Text
                              </summary>
                              <div className="mt-2 bg-white rounded-md p-3 border border-primary-200">
                                <p className="text-xs text-primary-700 whitespace-pre-wrap leading-relaxed max-h-24 overflow-y-auto">
                                  {analysis.original_text}
                                </p>
                              </div>
                            </details>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HistoryPage;
