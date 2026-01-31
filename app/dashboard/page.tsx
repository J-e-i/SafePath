'use client';

import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import Button from '../../components/ui/Button';
import axios from 'axios';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');
  const [crimeData, setCrimeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://data.cityofchicago.org/resource/ijzp-q8t2.json?$limit=1000')
      .then(res => {
        const allowedTypes = [
          'THEFT', 'ASSAULT', 'CRIM SEXUAL ASSAULT', 'SEX OFFENSE', 'HARASSMENT', 'ACCIDENT'
        ];
        const filtered = res.data
          .filter(
            (d: any) =>
              d.latitude &&
              d.longitude &&
              d.primary_type &&
              allowedTypes.includes(d.primary_type.toUpperCase())
          )
          .map((d: any) => ({
            ...d,
            latitude: Number(d.latitude),
            longitude: Number(d.longitude),
          }));
        setCrimeData(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Stats based on real data
  const stats = [
    { label: 'Total Incidents', value: crimeData.length.toLocaleString(), change: '+12%', trend: 'up' },
    { label: 'Reports Submitted', value: '0', change: '+0', trend: 'up' }, // Set to 0 since user hasn't reported yet
    { label: 'Risk Level', value: 'Medium', change: '-2 levels', trend: 'down' },
    { label: 'Safe Routes', value: '8', change: '+3', trend: 'up' }
  ];

  // Helper to clean up block names for display
  const formatBlock = (block: string) => {
    if (!block) return 'Unknown';
    // Remove leading numbers and X's, keep street name
    // Example: "048XX W DIVERSEY AVE" -> "W DIVERSEY AVE"
    return block.replace(/^\d+X*\s*/, '');
  };

  // Recent activity from real data
  const recentActivity = crimeData.slice(0, 4).map((crime, idx) => ({
    action: crime.primary_type || 'Incident reported',
    location: formatBlock(crime.block),
    time: crime.date ? new Date(crime.date).toLocaleString() : '',
    type: 'report'
  }));

  // My reports: show user's reports (for demo, just show first 3 crimes)
  const myReports = []; // No reports yet

  const safetyScore = 73;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'report': return 'ri-file-text-line';
      case 'update': return 'ri-refresh-line';
      case 'alert': return 'ri-alarm-warning-line';
      case 'route': return 'ri-route-line';
      default: return 'ri-information-line';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-20 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Your safety analytics overview</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={timeRange === '24h' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('24h')}
            >
              24h
            </Button>
            <Button
              variant={timeRange === '7d' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('7d')}
            >
              7d
            </Button>
            <Button
              variant={timeRange === '30d' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('30d')}
            >
              30d
            </Button>
          </div>
        </div>

        {/* Safety Score */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your Safety Score</h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Good</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative w-20 h-20">
              <div className="w-full h-full bg-gray-200 rounded-full"></div>
              <div 
                className="absolute inset-0 bg-green-500 rounded-full"
                style={{ 
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + (safetyScore / 100) * 50}% 0%, ${50 + (safetyScore / 100) * 50}% 100%, 50% 100%)`,
                  transform: 'rotate(-90deg)'
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-900">{safetyScore}</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Based on your location history and reported incidents</p>
              <div className="flex items-center space-x-2">
                <i className="ri-arrow-up-line text-green-500"></i>
                <span className="text-sm text-green-600">+5 points this week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
                <div className={`flex items-center space-x-1 text-xs ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <i className={`${stat.trend === 'up' ? 'ri-arrow-up-line' : 'ri-arrow-down-line'}`}></i>
                  <span>{stat.change}</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === 'reports'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Reports
          </button>
        </div>

        {/* Tab Content */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading crime data...</div>
        ) : (
        <>
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.length === 0 ? (
                  <div className="text-gray-500">No recent activity.</div>
                ) : (
                  recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <i className={`${getActivityIcon(activity.type)} text-blue-600`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{activity.action}</span>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{activity.location}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* AI Predictions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">AI Risk Predictions</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Live</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <i className="ri-error-warning-line text-yellow-600"></i>
                    <div>
                      <span className="font-medium">Medium Risk Predicted</span>
                      <p className="text-sm text-gray-600">T. Nagar area, 6-8 PM</p>
                    </div>
                  </div>
                  <span className="text-sm text-yellow-600">75% confidence</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <i className="ri-shield-check-line text-green-600"></i>
                    <div>
                      <span className="font-medium">Safe Route Available</span>
                      <p className="text-sm text-gray-600">Alternative path to Adyar</p>
                    </div>
                  </div>
                  <span className="text-sm text-green-600">92% confidence</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">My Reports</h2>
              <span className="text-sm text-gray-600">{myReports.length} total</span>
            </div>
            <div className="space-y-3">
              {myReports.length === 0 ? (
                <div className="text-gray-500">No reports found.</div>
              ) : (
                myReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <i className="ri-file-text-line text-blue-600"></i>
                      </div>
                      <div>
                        <span className="font-medium">{report.type}</span>
                        <p className="text-sm text-gray-600">{report.location} • {report.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                      <Button variant="outline" size="sm">
                        <i className="ri-eye-line"></i>
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
