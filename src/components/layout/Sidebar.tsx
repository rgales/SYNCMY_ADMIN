import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Music2, 
  BarChart2, 
  Settings, 
  HelpCircle 
} from 'lucide-react';
import { NavLink } from './NavLink';

export function Sidebar() {
  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Users', icon: Users, href: '/users' },
    { name: 'Tracks', icon: Music2, href: '/tracks' },
    { name: 'Analytics', icon: BarChart2, href: '/analytics' },
    { name: 'Settings', icon: Settings, href: '/settings' },
    { name: 'Help', icon: HelpCircle, href: '/help' },
  ];

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-col flex-grow bg-gray-800 border-r border-gray-700">
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-purple-600">
          <h1 className="text-xl font-bold text-white">Sync MY Admin</h1>
        </div>
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                href={item.href}
                icon={item.icon}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}