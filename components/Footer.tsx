import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-sans">
            &copy; {new Date().getFullYear()} The Daily Star. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
             <span>Internal Use Only</span>
             <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
             <span>Version 2.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};