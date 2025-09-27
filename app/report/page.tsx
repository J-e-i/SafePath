
'use client';

import { useState, useRef } from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

export default function ReportIncident() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSeverity, setSeverity] = useState('');
  const isMounted = useRef(true);

  const incidentTypes = [
    { id: 'theft', label: 'Theft', icon: 'ri-hand-coin-line' },
    { id: 'assault', label: 'Assault', icon: 'ri-user-unfollow-line' },
    { id: 'vandalism', label: 'Vandalism', icon: 'ri-hammer-line' },
    { id: 'harassment', label: 'Harassment', icon: 'ri-emotion-unhappy-line' },
    { id: 'suspicious', label: 'Suspicious Activity', icon: 'ri-eye-line' },
    { id: 'other', label: 'Other', icon: 'ri-more-line' }
  ];

  const severityLevels = [
    { id: 'low', label: 'Low', color: 'bg-green-100 text-green-800 border-green-200' },
    { id: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { id: 'high', label: 'High', color: 'bg-red-100 text-red-800 border-red-200' },
    { id: 'critical', label: 'Critical', color: 'bg-red-200 text-red-900 border-red-300' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMounted.current) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (isMounted.current) {
      setIsSubmitting(false);
      setShowSuccess(true);
    }
  };

  const handleLocationDetection = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (isMounted.current) {
            setSelectedLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
          }
        },
        (error) => {
          if (isMounted.current) {
            console.warn('Location access denied or unavailable:', error.message);
            setSelectedLocation('Unable to detect location - please enter manually');
          }
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      if (isMounted.current) {
        setSelectedLocation('Geolocation not supported by this browser');
      }
    }
  };

  const handleEmergencyCall = () => {
    window.location.href = 'tel:100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-20 pb-20 px-4">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Report Incident</h1>
            <p className="text-gray-600">Help keep your community safe by reporting incidents</p>
          </div>

          {/* Emergency Button */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <i className="ri-phone-line text-white text-xl"></i>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-red-900">Emergency?</h3>
                <p className="text-sm text-red-700">Call 100 (Police) immediately</p>
              </div>
              <Button variant="danger" size="sm" onClick={handleEmergencyCall}>
                Call 100
              </Button>
            </div>
          </div>

          {/* Report Form */}
          <form id="incident-report" onSubmit={handleSubmit} className="space-y-6">
            {/* Incident Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What happened?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {incidentTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    name="incidentType"
                    onClick={() => setSelectedType(type.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedType === type.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <i className={`${type.icon} text-lg`}></i>
                      <span className="text-sm font-medium">{type.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter location or use GPS"
                />
                <Button
                  type="button"
                  onClick={handleLocationDetection}
                  variant="outline"
                  className="px-3"
                >
                  <i className="ri-gps-line"></i>
                </Button>
              </div>
            </div>

            {/* Severity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Severity Level
              </label>
              <div className="grid grid-cols-2 gap-3">
                {severityLevels.map((level) => (
                  <button
                    key={level.id}
                    type="button"
                    name="severity"
                    onClick={() => setSeverity(level.id)}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      selectedSeverity === level.id
                        ? level.color
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">{level.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                maxLength={500}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Please provide details about what happened..."
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                Maximum 500 characters
              </div>
            </div>

            {/* Anonymous Option */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="anonymous"
                name="anonymous"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="anonymous" className="text-sm text-gray-700">
                Submit anonymously
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !selectedType || !selectedLocation || !selectedSeverity}
              className="w-full"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                'Submit Report'
              )}
            </Button>
          </form>
        </div>
      </main>

      <BottomNav />

      {/* Success Modal */}
      <Modal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Report Submitted"
        maxWidth="sm"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-check-line text-green-600 text-2xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank you for reporting</h3>
          <p className="text-gray-600 mb-4">Your report has been submitted and will help keep the community safe.</p>
          <Button onClick={() => setShowSuccess(false)} className="w-full">
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}
