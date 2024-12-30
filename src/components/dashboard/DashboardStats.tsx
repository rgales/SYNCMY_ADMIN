import React from 'react';
import { Users, Music, PlayCircle, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart } from './LineChart';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  change: string;
  trend: 'up' | 'down';
}

function StatCard({ title, value, icon: Icon, change, trend }: StatCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-200 hover:shadow-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="p-3 bg-indigo-50 rounded-full">
              <Icon className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                  trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {trend === 'up' ? (
                    <TrendingUp className="self-center flex-shrink-0 h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="self-center flex-shrink-0 h-4 w-4 mr-1" />
                  )}
                  {change}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardStats() {
  const stats = [
    { title: 'Total Users', value: '2,651', icon: Users, change: '+12.5%', trend: 'up' as const },
    { title: 'Active Tracks', value: '789', icon: Music, change: '+3.2%', trend: 'up' as const },
    { title: 'Total Plays', value: '24.5k', icon: PlayCircle, change: '+5.4%', trend: 'up' as const },
    { title: 'Downloads', value: '1,234', icon: Download, change: '-2.1%', trend: 'down' as const },
  ];

  return (
    <div className="space-y-8 mt-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Track Plays Over Time</h3>
          <LineChart 
            data={[10, 41, 35, 51, 49, 62, 69, 91, 148]}
            labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']}
            color="rgb(79, 70, 229)"
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Downloads Over Time</h3>
          <LineChart 
            data={[30, 25, 45, 30, 55, 40, 45, 35, 25]}
            labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']}
            color="rgb(16, 185, 129)"
          />
        </div>
      </div>
    </div>
  );
}