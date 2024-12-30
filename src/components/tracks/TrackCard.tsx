import React from 'react';
import { Music, Play, Download, Clock } from 'lucide-react';

interface TrackCardProps {
  track: {
    id: string;
    title: string;
    artist: string;
    duration: number;
    total_plays: number;
    total_downloads: number;
    isActive?: boolean;
  };
  onToggleActive: (id: string) => void;
}

export function TrackCard({ track, onToggleActive }: TrackCardProps) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-200 hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-50 rounded-full">
              <Music className="h-8 w-8 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">{track.title}</h3>
              <p className="text-sm text-gray-500">{track.artist}</p>
            </div>
          </div>
          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={track.isActive}
                onChange={() => onToggleActive(track.id)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Play className="h-4 w-4" />
            <span>{track.total_plays.toLocaleString()} plays</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Download className="h-4 w-4" />
            <span>{track.total_downloads.toLocaleString()} downloads</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 justify-end">
            <Clock className="h-4 w-4" />
            <span>{formatDuration(track.duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}