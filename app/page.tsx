'use client';

import React, { useEffect, useState } from 'react';
import  Header  from '../components/Header';
import BottomNav from '../components/BottomNav';
import Link from 'next/link';
import axios from 'axios';

interface RiskLevel {
  area: string;
  level: 'Low' | 'Medium' | 'High' | 'Critical';
  color: string;
  incidents: number;
}

interface Incident {
  type: string;
  location: string;
  time: string;
  severity: 'low' | 'medium' | 'high';
}

const COMMUNITY_AREA_NAMES: Record<string, string> = {
  "8": "Near North Side",
  "25": "Austin",
  "28": "Near West Side",
  "24": "Rogers Park",
  // ...add more as needed (see full list: https://data.cityofchicago.org/api/views/cauq-8yn6/rows.csv?accessType=DOWNLOAD)
};

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState('Chicago, IL');
  const [riskLevels, setRiskLevels] = useState<RiskLevel[]>([]);
  const [recentIncidents, setRecentIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://data.cityofchicago.org/resource/ijzp-q8t2.json?$limit=1000')
      .then(res => {
        // Calculate risk levels by area
        const areaMap: Record<string, { count: number }> = {};
        res.data.forEach((d: any) => {
          const area = d.community_area || d.district || d.beat || 'Unknown';
          if (!areaMap[area]) areaMap[area] = { count: 0 };
          areaMap[area].count += 1;
        });

        const sortedAreas = Object.entries(areaMap)
          .sort((a, b) => b[1].count - a[1].count)
          .slice(0, 4)
          .map(([area, info]) => {
            let level: RiskLevel['level'] = 'Low';
            let color = 'bg-green-500';
            if (info.count >= 30) { level = 'Critical'; color = 'bg-red-700'; }
            else if (info.count >= 15) { level = 'High'; color = 'bg-red-500'; }
            else if (info.count >= 7) { level = 'Medium'; color = 'bg-yellow-500'; }
            return { area, level, color, incidents: info.count };
          });

        setRiskLevels(sortedAreas);

        // Recent incidents
        const incidents: Incident[] = res.data
          .filter((d: any) => d.primary_type && d.block && d.date)
          .sort((a: any, b: any) => {
            const da = a.date ? new Date(a.date).getTime() : 0;
            const db = b.date ? new Date(b.date).getTime() : 0;
            return db - da;
          })
          .slice(0, 5)
          .map((d: any) => ({
            type: d.primary_type,
            location: d.block ? d.block.replace(/^\d+X*\s*/, '') : 'Unknown',
            time: d.date ? new Date(d.date).toLocaleString() : '',
            severity:
              d.primary_type === 'ASSAULT' || d.primary_type === 'BATTERY'
                ? 'high'
                : d.primary_type === 'THEFT' || d.primary_type === 'ROBBERY'
                ? 'medium'
                : 'low',
          }));

        setRecentIncidents(incidents);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-20 pb-32 px-4">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h1 className="text-2xl font-bold mb-2">Stay Safe with AI-Powered Analytics</h1>
              <p className="text-blue-100 mb-4">Real-time incident tracking and predictive risk assessment for your safety</p>
              <div className="flex items-center space-x-2 text-sm">
                <i className="ri-map-pin-line"></i>
                <span>{currentLocation}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link href="/report">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center hover:bg-red-100 transition-colors">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-alarm-warning-line text-white text-xl"></i>
              </div>
              <h3 className="font-semibold text-red-900">Report Incident</h3>
              <p className="text-sm text-red-700 mt-1">Quick emergency reporting</p>
            </div>
          </Link>

          <Link href="/map">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center hover:bg-blue-100 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-map-2-line text-white text-xl"></i>
              </div>
              <h3 className="font-semibold text-blue-900">Safety Map</h3>
              <p className="text-sm text-blue-700 mt-1">View risk heatmap</p>
            </div>
          </Link>
        </div>

        {/* Risk Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Current Risk Levels</h2>
          <div className="space-y-3">
            {loading ? (
              <div className="text-gray-500">Loading...</div>
            ) : (
              riskLevels.map((area, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${area.color}`}></div>
                    <div>
                      <span className="font-medium">
                        {COMMUNITY_AREA_NAMES[area.area] || area.area}
                      </span>
                      <p className="text-sm text-gray-600">{area.incidents} incidents today</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    area.level === 'Low' ? 'bg-green-100 text-green-800' :
                    area.level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    area.level === 'High' ? 'bg-red-100 text-red-800' :
                    'bg-red-200 text-red-900'
                  }`}>
                    {area.level}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Incidents</h2>
            <Link href="/dashboard">
              <span className="text-blue-600 text-sm font-medium">View All</span>
            </Link>
          </div>
          <div className="space-y-3">
            {loading ? (
              <div className="text-gray-500">Loading...</div>
            ) : (
              recentIncidents.map((incident, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    incident.severity === 'low' ? 'bg-green-100' :
                    incident.severity === 'medium' ? 'bg-yellow-100' :
                    'bg-red-100'
                  }`}>
                    <i className={`ri-error-warning-line text-sm ${
                      incident.severity === 'low' ? 'text-green-600' :
                      incident.severity === 'medium' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{incident.type}</span>
                      <span className="text-xs text-gray-500">{incident.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{incident.location}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
