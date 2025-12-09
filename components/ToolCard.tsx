import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const Icon = tool.icon;

  const getCategoryStyles = (category: Tool['category']) => {
    switch (category) {
      case 'Audio': return 'bg-blue-50 text-blue-700';
      case 'Translation': return 'bg-green-50 text-green-700';
      case 'Reporting': return 'bg-purple-50 text-purple-700';
      case 'Visuals': return 'bg-pink-50 text-pink-700';
      case 'Digital': return 'bg-indigo-50 text-indigo-700';
      case 'HR': return 'bg-teal-50 text-teal-700';
      case 'Editorial': return 'bg-orange-50 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* Card Header Background Pattern */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-200 via-tds-red to-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-red-50 transition-colors duration-300">
            <Icon className="w-8 h-8 text-gray-700 group-hover:text-tds-red transition-colors duration-300" />
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${getCategoryStyles(tool.category)}`}>
            {tool.category}
          </span>
        </div>

        <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-tds-red transition-colors">
          {tool.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-1 font-sans">
          {tool.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tool.tags.map((tag) => (
            <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6 pt-0 mt-auto">
        <a 
          href={tool.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-tds-red transition-colors duration-300 group/btn"
        >
          <span className="font-medium">Launch Tool</span>
          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};