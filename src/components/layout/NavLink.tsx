import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export function NavLink({ href, icon: Icon, children }: NavLinkProps) {
  const isActive = window.location.pathname === href;
  
  return (
    <a
      href={href}
      className={`${
        isActive
          ? 'bg-indigo-50 text-indigo-600'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
    >
      <Icon
        className={`${
          isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'
        } mr-3 h-5 w-5 flex-shrink-0`}
      />
      {children}
    </a>
  );
}