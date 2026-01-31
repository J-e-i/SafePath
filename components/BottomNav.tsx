'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/', icon: 'ri-home-4-line', label: 'Home' },
    { href: '/map', icon: 'ri-map-2-line', label: 'Map' },
    { href: '/report', icon: 'ri-add-circle-line', label: 'Report' },
    { href: '/dashboard', icon: 'ri-dashboard-line', label: 'Dashboard' },
    { href: '/profile', icon: 'ri-user-line', label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 z-40">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <i className={`${item.icon} text-xl`}></i>
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}