import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-slate-50 selection:bg-red-100 selection:text-red-900">
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
};

export default App;