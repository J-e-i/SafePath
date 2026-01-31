'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import Button from '../../components/ui/Button';

export default function ProjectPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "SafePath - AI-Powered Safety Analytics",
      subtitle: "Current Implementation Status & Future Roadmap",
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
            <i className="ri-shield-check-line text-white text-4xl"></i>
          </div>
          <p className="text-lg text-gray-600">
            Community Safety Through Smart Technology
          </p>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-sm text-gray-600">Core Features</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">Mobile</div>
              <div className="text-sm text-gray-600">First Design</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">AI</div>
              <div className="text-sm text-gray-600">Powered</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Current Implementation - Core Features",
      subtitle: "✅ Successfully Implemented",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <i className="ri-home-4-line text-white"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-green-900">Dashboard & Analytics</h3>
                  <p className="text-sm text-green-700">Real-time safety score, incident tracking, risk analysis</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <i className="ri-map-2-line text-white"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-green-900">Interactive Safety Map</h3>
                  <p className="text-sm text-green-700">Risk zones, incident visualization, location filters</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <i className="ri-file-text-line text-white"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-green-900">Incident Reporting</h3>
                  <p className="text-sm text-green-700">Multi-category reporting, severity levels, GPS location</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-white"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-green-900">User Management</h3>
                  <p className="text-sm text-green-700">Profile system, achievements, emergency contacts</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <i className="ri-smartphone-line text-white"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-green-900">Mobile-First UI</h3>
                  <p className="text-sm text-green-700">Responsive design, intuitive navigation, accessibility</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Current Features - Detailed Breakdown",
      subtitle: "What's Working Now",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Frontend Implementation</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Next.js 14 with TypeScript</li>
              <li>• Tailwind CSS for styling</li>
              <li>• Remix Icons integration</li>
              <li>• Responsive mobile design</li>
              <li>• Component-based architecture</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-2">User Experience</h3>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Intuitive bottom navigation</li>
              <li>• Modal-based interactions</li>
              <li>• Form validation & feedback</li>
              <li>• Loading states & transitions</li>
              <li>• Accessibility considerations</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-2">Data Visualization</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Safety score circular progress</li>
              <li>• Risk level indicators</li>
              <li>• Incident timeline display</li>
              <li>• Statistics dashboard</li>
              <li>• Interactive filters</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Future Implementation - Phase 1",
      subtitle: "🔄 Next Development Sprint",
      content: (
        <div className="space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                <i className="ri-database-line text-white"></i>
              </div>
              <h3 className="font-semibold text-orange-900">Backend Infrastructure</h3>
            </div>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• API development (Node.js/Express)</li>
              <li>• Database setup (PostgreSQL/MongoDB)</li>
              <li>• User authentication system</li>
              <li>• Real-time data synchronization</li>
              <li>• Data persistence layer</li>
            </ul>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <i className="ri-map-pin-line text-white"></i>
              </div>
              <h3 className="font-semibold text-red-900">Location Services</h3>
            </div>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• GPS tracking integration</li>
              <li>• Geofencing for risk zones</li>
              <li>• Location-based notifications</li>
              <li>• Route optimization</li>
              <li>• Maps API integration</li>
            </ul>
          </div>
          
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <i className="ri-notification-line text-white"></i>
              </div>
              <h3 className="font-semibold text-indigo-900">Real-time Notifications</h3>
            </div>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Push notification system</li>
              <li>• Emergency alert broadcasts</li>
              <li>• Incident update notifications</li>
              <li>• Safety tip reminders</li>
              <li>• Community updates</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Future Implementation - Phase 2",
      subtitle: "🚀 Advanced Features",
      content: (
        <div className="space-y-4">
          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center">
                <i className="ri-brain-line text-white"></i>
              </div>
              <h3 className="font-semibold text-cyan-900">AI & Machine Learning</h3>
            </div>
            <ul className="text-sm text-cyan-700 space-y-1">
              <li>• Predictive risk analysis</li>
              <li>• Pattern recognition in incidents</li>
              <li>• Automated threat assessment</li>
              <li>• Smart route recommendations</li>
              <li>• Behavioral analytics</li>
            </ul>
          </div>
          
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <i className="ri-group-line text-white"></i>
              </div>
              <h3 className="font-semibold text-emerald-900">Community Features</h3>
            </div>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>• Community safety groups</li>
              <li>• Peer verification system</li>
              <li>• Safety buddy matching</li>
              <li>• Local safety forums</li>
              <li>• Volunteer coordination</li>
            </ul>
          </div>
          
          <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center">
                <i className="ri-shield-keyhole-line text-white"></i>
              </div>
              <h3 className="font-semibold text-violet-900">Advanced Security</h3>
            </div>
            <ul className="text-sm text-violet-700 space-y-1">
              <li>• End-to-end encryption</li>
              <li>• Anonymous reporting options</li>
              <li>• Data privacy controls</li>
              <li>• Multi-factor authentication</li>
              <li>• Secure emergency contacts</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Technical Architecture",
      subtitle: "System Design Overview",
      content: (
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Current Stack</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-3">
                <h4 className="font-medium text-blue-900">Frontend</h4>
                <p className="text-sm text-blue-700">Next.js 14, TypeScript, Tailwind CSS</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <h4 className="font-medium text-green-900">UI Components</h4>
                <p className="text-sm text-green-700">Custom components, Remix Icons</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Planned Stack</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-3">
                <h4 className="font-medium text-purple-900">Backend</h4>
                <p className="text-sm text-purple-700">Node.js, Express, Socket.io</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <h4 className="font-medium text-red-900">Database</h4>
                <p className="text-sm text-red-700">PostgreSQL, Redis</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <h4 className="font-medium text-orange-900">AI/ML</h4>
                <p className="text-sm text-orange-700">TensorFlow, Python</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <h4 className="font-medium text-indigo-900">Cloud</h4>
                <p className="text-sm text-indigo-700">AWS, Docker, Kubernetes</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Integration Points</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Google Maps API for location services</li>
              <li>• Push notification services</li>
              <li>• Emergency services integration</li>
              <li>• Third-party data sources</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Development Timeline",
      subtitle: "Project Roadmap",
      content: (
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
            
            <div className="relative flex items-center space-x-4 pb-6">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <i className="ri-check-line text-white"></i>
              </div>
              <div>
                <h3 className="font-semibold text-green-900">Phase 0 - Complete</h3>
                <p className="text-sm text-green-700">Frontend development, UI/UX design</p>
                <span className="text-xs text-green-600">✅ Completed</span>
              </div>
            </div>
            
            <div className="relative flex items-center space-x-4 pb-6">
              <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                <i className="ri-time-line text-white"></i>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-900">Phase 1 - In Progress</h3>
                <p className="text-sm text-yellow-700">Backend development, API integration</p>
                <span className="text-xs text-yellow-600">🔄 4-6 weeks</span>
              </div>
            </div>
            
            <div className="relative flex items-center space-x-4 pb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <i className="ri-robot-line text-white"></i>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">Phase 2 - Planned</h3>
                <p className="text-sm text-blue-700">AI implementation, advanced features</p>
                <span className="text-xs text-blue-600">📅 8-10 weeks</span>
              </div>
            </div>
            
            <div className="relative flex items-center space-x-4">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <i className="ri-rocket-line text-white"></i>
              </div>
              <div>
                <h3 className="font-semibold text-purple-900">Phase 3 - Future</h3>
                <p className="text-sm text-purple-700">Community features, scaling</p>
                <span className="text-xs text-purple-600">🚀 12-16 weeks</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Key Metrics & Goals",
      subtitle: "Success Indicators",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">95%</div>
              <div className="text-sm text-blue-700">User Satisfaction</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">50K</div>
              <div className="text-sm text-green-700">Active Users</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">85%</div>
              <div className="text-sm text-purple-700">Prediction Accuracy</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">30%</div>
              <div className="text-sm text-red-700">Incident Reduction</div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Success Milestones</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Launch MVP with core features</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Achieve 1K daily active users</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Deploy AI risk prediction model</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Expand to 5 major cities</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Slide Counter */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600">
              {currentSlide + 1} / {slides.length}
            </div>
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Slide Content */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 min-h-[500px]">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg text-gray-600">
                {slides[currentSlide].subtitle}
              </p>
            </div>
            
            <div className="mb-8">
              {slides[currentSlide].content}
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              variant="outline"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              Previous
            </Button>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <i className="ri-fullscreen-line mr-1"></i>
                Fullscreen
              </Button>
              <Button variant="outline" size="sm">
                <i className="ri-download-line mr-1"></i>
                Export
              </Button>
            </div>
            
            <Button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
            >
              Next
              <i className="ri-arrow-right-line ml-2"></i>
            </Button>
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}