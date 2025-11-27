import React from 'react'
import { Icon, DivideIcon as LucideIcon } from 'lucide-react';

function KPICard({ title, value, change, icon: Icon, trend, color }) {
  const colorClasses = {
    blue: 'from-blue-400 to-blue-500',
    green: 'from-green-400 to-green-500',
    purple: 'from-purple-400 to-purple-500',
    orange: 'from-orange-400 to-orange-500',
  };

  const trendColors = {
    up: 'text-green-600 bg-green-100',
    down: 'text-red-600 bg-red-100',
    neutral: 'text-gray-600 bg-gray-100',
  };

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
      <div className='flex items-center justify-between p-4'>
        
        <div>
          <p className='text-gray-400 text-sm font-medium mb-1'>{title}</p>
          <p className='text-2xl font-bold text-gray-600 mb-2'>{value}</p>

          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${trendColors[trend]}`}>
            {change}
          </div>
        </div>

        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colorClasses[color]} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

export default KPICard;
