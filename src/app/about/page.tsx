'use client';

import React from 'react';
import Layout from '../../components/Layout';

const AboutPage: React.FC = () => {
  return (
    <Layout currentPage="about">
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl font-bold gradient-text mb-4">
              About PDF Analyser
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Your intelligent document analyzer powered by advanced AI technology
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-primary-100/50 p-8 animate-fade-in-left" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-neutral-800">What is PDF Analyser?</h2>
              </div>
              <p className="text-lg text-neutral-700 leading-relaxed">
                PDF Analyser is a cutting-edge document analysis tool that uses Google's Gemini Pro AI to automatically extract, 
                analyze, and organize information from PDFs and other document formats. Whether you're a professional, researcher, 
                or student, PDF Analyser helps you quickly understand and process complex documents with intelligent AI assistance.
              </p>
            </div>

            {/* Key Features */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-primary-100/50 p-8 animate-fade-in-right" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-primary-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-neutral-800">Key Features</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start group">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-3 mt-1 shadow-md group-hover:scale-110 transition-transform duration-200">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">AI-Powered Analysis</h3>
                      <p className="text-neutral-600 text-sm">Advanced Gemini Pro AI for accurate document processing</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-3 mt-1 shadow-md group-hover:scale-110 transition-transform duration-200">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">Smart Data Extraction</h3>
                      <p className="text-neutral-600 text-sm">Automatically identify and extract key information</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-3 mt-1 shadow-md group-hover:scale-110 transition-transform duration-200">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">Document History</h3>
                      <p className="text-neutral-600 text-sm">Track and review all your previous document analyses</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start group">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-3 mt-1 shadow-md group-hover:scale-110 transition-transform duration-200">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">Secure Processing</h3>
                      <p className="text-neutral-600 text-sm">Enterprise-grade security with encrypted data handling</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-3 mt-1 shadow-md group-hover:scale-110 transition-transform duration-200">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">Fast Results</h3>
                      <p className="text-neutral-600 text-sm">Get analysis results in seconds, not hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-3 mt-1 shadow-md group-hover:scale-110 transition-transform duration-200">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">User-Friendly Interface</h3>
                      <p className="text-neutral-600 text-sm">Intuitive design for seamless user experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-primary-100/50 p-8 animate-fade-in-left" style={{ animationDelay: '600ms' }}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-neutral-800">How It Works</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-full flex items-center justify-center font-bold mr-4 shadow-lg group-hover:scale-110 transition-transform duration-200">1</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Upload Documents</h3>
                    <p className="text-neutral-600">Simply drag and drop or select your PDFs and other document formats</p>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-full flex items-center justify-center font-bold mr-4 shadow-lg group-hover:scale-110 transition-transform duration-200">2</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">AI Processing</h3>
                    <p className="text-neutral-600">Our Gemini Pro AI analyzes the content and extracts relevant information</p>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-full flex items-center justify-center font-bold mr-4 shadow-lg group-hover:scale-110 transition-transform duration-200">3</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Get Results</h3>
                    <p className="text-neutral-600">Receive organized, structured data that's easy to understand and use</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technology Stack */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-primary-100/50 p-8 animate-fade-in-right" style={{ animationDelay: '800ms' }}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-primary-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-neutral-800">Technology Stack</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl border border-primary-200/50 hover:shadow-lg transition-all duration-200 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">AI Engine</h3>
                  <p className="text-neutral-600 text-sm">Google Gemini Pro for advanced document understanding</p>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl border border-primary-200/50 hover:shadow-lg transition-all duration-200 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Frontend</h3>
                  <p className="text-neutral-600 text-sm">React with Next.js for modern, responsive UI</p>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl border border-primary-200/50 hover:shadow-lg transition-all duration-200 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8 1.79 8 4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Backend</h3>
                  <p className="text-neutral-600 text-sm">Supabase for secure data storage and management</p>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-primary-100/50 p-8 animate-fade-in-left" style={{ animationDelay: '1000ms' }}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-secondary-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-neutral-800">Perfect For</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 border border-primary-200/50 rounded-2xl hover:shadow-lg transition-all duration-200 group">
                  <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">Professionals</h3>
                  <p className="text-neutral-600 text-sm">Process contracts, reports, and business documents quickly</p>
                </div>
                
                <div className="p-4 border border-primary-200/50 rounded-2xl hover:shadow-lg transition-all duration-200 group">
                  <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">Researchers</h3>
                  <p className="text-neutral-600 text-sm">Extract data from research papers and academic documents</p>
                </div>
                
                <div className="p-4 border border-primary-200/50 rounded-2xl hover:shadow-lg transition-all duration-200 group">
                  <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">Students</h3>
                  <p className="text-neutral-600 text-sm">Analyze study materials and extract key information</p>
                </div>
                
                <div className="p-4 border border-primary-200/50 rounded-2xl hover:shadow-lg transition-all duration-200 group">
                  <h3 className="font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">Business Users</h3>
                  <p className="text-neutral-600 text-sm">Streamline document processing and data entry workflows</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 rounded-3xl shadow-2xl p-8 text-white animate-fade-in-up" style={{ animationDelay: '1200ms' }}>
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-primary-100 mb-6 text-lg">
                  Experience the power of AI-driven document analysis today
                </p>
                <a 
                  href="/"
                  className="btn-secondary text-primary-700 bg-white hover:bg-primary-50 text-lg px-8 py-4 inline-block"
                >
                  Try PDF Analyser Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
