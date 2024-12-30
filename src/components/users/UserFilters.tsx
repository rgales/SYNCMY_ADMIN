import React from 'react';
import { Search, Filter } from 'lucide-react';

interface UserFiltersProps {
  onSearch: (query: string) => void;
  onFilterStatus: (status: string) => void;
}

export function UserFilters({ onSearch, onFilterStatus }: UserFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
      <div className="flex-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
          placeholder="Search users..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex-shrink-0">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="focus:ring-indigo-500 focus:border-indigo-500 pl-10 pr-10 py-2 text-base border-gray-300 rounded-md"
            onChange={(e) => onFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>
    </div>
  );
}