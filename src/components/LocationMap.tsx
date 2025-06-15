import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface LocationMapProps {
  location: string;
  onLocationSelect: (location: string) => void;
}

const LocationMap = ({ location, onLocationSelect }: LocationMapProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  
  
  // For now, we'll just simulate a map with a placeholder
  
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // In a real implementation, this would get coordinates from the map click
    // and reverse geocode to get the address
    
    // For now, we'll just use the existing location or a default
    const newLocation = location || "New Cairo";
    onLocationSelect(newLocation);
  };
  
  return (
    <div 
      className="w-full h-24 bg-gray-100 rounded-md flex items-center justify-center cursor-pointer relative overflow-hidden"
      onClick={handleMapClick}
    >
      {!mapLoaded ? (
        <div className="text-center">
          <div className="animate-pulse h-4 w-24 bg-gray-300 rounded mx-auto mb-2"></div>
          <div className="animate-pulse h-3 w-16 bg-gray-300 rounded mx-auto"></div>
        </div>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-100 opacity-50"></div>
          <div className="relative z-10 text-center">
            <MapPin className="h-6 w-6 text-pink-500 mx-auto mb-1" />
            <span className="text-sm block font-medium">
              {location || "Select location"}
            </span>
            <span className="text-xs text-gray-500">
              Tap to drop pin on map
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationMap;