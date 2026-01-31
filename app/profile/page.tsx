'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

export default function Profile() {
  // Add state for profile fields
  const [name, setName] = useState('Arjun Kumar');
  const [email, setEmail] = useState('arjun.kumar@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState({
    riskAlerts: true,
    incidentUpdates: true,
    safetyTips: false,
    communityUpdates: true
  });

  // Temp state for modal editing
  const [editName, setEditName] = useState(name);
  const [editEmail, setEditEmail] = useState(email);
  const [editPhone, setEditPhone] = useState(phone);

  const userStats = [
    { label: 'Reports Submitted', value: '0', icon: 'ri-file-text-line' },
    { label: 'Community Points', value: '1,000', icon: 'ri-trophy-line' },
    { label: 'Areas Helped', value: '0', icon: 'ri-map-pin-line' },
    { label: 'Safety Score', value: '73', icon: 'ri-shield-check-line' }
  ];

  // Achievements for a new user
  const achievements = [
    {
      title: 'Welcome Aboard!',
      description: 'Logged in for the first time',
      icon: 'ri-user-smile-line',
      earned: true
    },
    {
      title: 'Explorer',
      description: 'Used the navigation menu',
      icon: 'ri-compass-3-line',
      earned: true
    },
    {
      title: 'First Report',
      description: 'Submit your first incident report to unlock',
      icon: 'ri-medal-line',
      earned: false
    },
    {
      title: 'Community Helper',
      description: 'Help 5 different areas to unlock',
      icon: 'ri-shake-hands-line',
      earned: false
    }
  ];

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key as keyof typeof prev]: !prev[key as keyof typeof prev]
    }));
  };

  const handleEmergencyCall = () => {
    window.location.href = 'tel:100';
  };

  const handleContactCall = () => {
    window.location.href = 'tel:+919876543210';
  };

  // When opening the modal, set temp values
  const openEditProfile = () => {
    setEditName(name);
    setEditEmail(email);
    setEditPhone(phone);
    setIsEditingProfile(true);
  };

  // Save changes from modal
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setName(editName);
    setEmail(editEmail);
    setPhone(editPhone);
    setIsEditingProfile(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-20 px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{name.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">{name}</h1>
              <p className="text-gray-600">{email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Active since March 2024</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={openEditProfile}
            >
              <i className="ri-edit-line mr-1"></i>
              Edit
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {userStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className={`${stat.icon} text-blue-600`}></i>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Achievements</h2>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                achievement.earned ? 'bg-green-50' : 'bg-gray-50'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  achievement.earned ? 'bg-green-100' : 'bg-gray-200'
                }`}>
                  <i className={`${achievement.icon} ${
                    achievement.earned ? 'text-green-600' : 'text-gray-400'
                  }`}></i>
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    achievement.earned ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
                {achievement.earned && (
                  <i className="ri-check-line text-green-600"></i>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Settings</h2>
          <div className="space-y-3">
            <button 
              onClick={() => setShowSettings(true)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <i className="ri-notification-line text-gray-600"></i>
                <span className="font-medium">Notifications</span>
              </div>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <i className="ri-shield-keyhole-line text-gray-600"></i>
                <span className="font-medium">Privacy & Security</span>
              </div>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <i className="ri-map-pin-line text-gray-600"></i>
                <span className="font-medium">Location Settings</span>
              </div>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <i className="ri-question-line text-gray-600"></i>
                <span className="font-medium">Help & Support</span>
              </div>
              <i className="ri-arrow-right-s-line text-gray-400"></i>
            </button>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Emergency Contacts</h2>
            <Button variant="outline" size="sm">
              <i className="ri-add-line mr-1"></i>
              Add
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <i className="ri-phone-line text-red-600"></i>
                </div>
                <div>
                  <span className="font-medium">Police Emergency</span>
                  <p className="text-sm text-gray-600">100</p>
                </div>
              </div>
              <Button variant="danger" size="sm" onClick={handleEmergencyCall}>
                Call
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-blue-600"></i>
                </div>
                <div>
                  <span className="font-medium">Priya Sharma</span>
                  <p className="text-sm text-gray-600">+91 98765 43210</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleContactCall}>
                <i className="ri-phone-line"></i>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditingProfile}
        onClose={() => setIsEditingProfile(false)}
        title="Edit Profile"
        maxWidth="sm"
      >
        <form className="space-y-4" onSubmit={handleSaveProfile}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={editName}
              onChange={e => setEditName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={editEmail}
              onChange={e => setEditEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={editPhone}
              onChange={e => setEditPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditingProfile(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Notifications Settings Modal */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Notification Settings"
        maxWidth="sm"
      >
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <p className="text-sm text-gray-600">
                  {key === 'riskAlerts' && 'Get notified about risk changes in your area'}
                  {key === 'incidentUpdates' && 'Updates on incidents you\'ve reported'}
                  {key === 'safetyTips' && 'Weekly safety tips and recommendations'}
                  {key === 'communityUpdates' && 'Updates from your community'}
                </p>
              </div>
              <button
                onClick={() => handleNotificationToggle(key)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  value ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
          
          <Button
            onClick={() => setShowSettings(false)}
            className="w-full mt-6"
          >
            Save Settings
          </Button>
        </div>
      </Modal>
    </div>
  );
}
