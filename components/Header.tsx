'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from './ui/Button';
import Modal from './ui/Modal';

export default function Header() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuth = () => {
    setIsLoggedIn(true);
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="ri-shield-check-line text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-pacifico)' }}>
                SafePath
              </span>
            </Link>
            
            <div className="flex items-center space-x-3">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm">
                      <i className="ri-dashboard-line mr-1"></i>
                      Dashboard
                    </Button>
                  </Link>
                  <Button onClick={handleLogout} variant="secondary" size="sm">
                    <i className="ri-logout-box-line mr-1"></i>
                    Logout
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsAuthOpen(true)} size="sm">
                  <i className="ri-user-line mr-1"></i>
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <Modal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        title={isLogin ? 'Login to SafePath' : 'Create Account'}
        maxWidth="sm"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleAuth(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>
          )}
          
          <Button type="submit" className="w-full">
            {isLogin ? 'Login' : 'Create Account'}
          </Button>
          
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}