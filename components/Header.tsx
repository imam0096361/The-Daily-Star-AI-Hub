import React from 'react';
import { APP_NAME } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex items-center justify-center w-12 h-12">
              <img 
                src="https://play-lh.googleusercontent.com/BTl8BuHW9GW6M3-LliMb5RASiephVLM1yMjhWQrO2c9yUPrC3a2Z1XWFCVM1wjBLRw=w480-h960-rw" 
                alt="The Daily Star Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-serif font-bold text-gray-900 tracking-tight leading-none">
                {APP_NAME}
              </h1>
              <span className="text-xs font-sans font-medium text-gray-500 tracking-wide uppercase mt-1">
                Newsroom Innovation
              </span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <span className="text-sm text-gray-500 font-sans">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="text-sm font-medium text-tds-red cursor-pointer hover:underline">
              Documentation
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};