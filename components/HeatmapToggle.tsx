'use client';

interface HeatmapToggleProps {
  viewMode: 'heatmap' | 'riskzones';
  onToggle: (mode: 'heatmap' | 'riskzones') => void;
}

export default function HeatmapToggle({ viewMode, onToggle }: HeatmapToggleProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-gray-200">
      <div className="flex items-center">
        <button
          onClick={() => onToggle('heatmap')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            viewMode === 'heatmap'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <i className="ri-fire-line"></i>
          <span>Heatmap</span>
        </button>
        
        <button
          onClick={() => onToggle('riskzones')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            viewMode === 'riskzones'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <i className="ri-focus-3-line"></i>
          <span>Risk Zones</span>
        </button>
      </div>
    </div>
  );
}