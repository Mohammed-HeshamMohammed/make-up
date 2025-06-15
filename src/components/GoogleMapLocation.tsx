import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface GoogleMapLocationProps {
  address: string;
  onLocationSelect: (location: string) => void;
}

const GoogleMapLocation = ({ address, onLocationSelect }: GoogleMapLocationProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  // Available locations that match the address
  const availableLocations = [
    "New Cairo",
    "El Rehab",
    "Sheikh Zayed",
    "Tagmo3",
    "Maadi",
    "Heliopolis",
    "Nasr City"
  ];

  // In a real implementation, this would initialize Google Maps API
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Update selected location based on address input
  useEffect(() => {
    if (address) {
      // Try to match the address with available locations
      const matchedLocation = availableLocations.find(location =>
        address.toLowerCase().includes(location.toLowerCase()) ||
        location.toLowerCase().includes(address.toLowerCase())
      );

      if (matchedLocation) {
        setSelectedLocation(matchedLocation);
      } else {
        // If no match found, try to extract area from address
        const addressParts = address.split(',').map(part => part.trim());
        const lastPart = addressParts[addressParts.length - 1];
        setSelectedLocation(lastPart || "New Cairo");
      }
    }
  }, [address]);

  const handleMapClick = () => {
    // Get coordinates for the current location
    const locationCoords = {
      "New Cairo": { lat: 30.0133, lng: 31.4967 },
      "El Rehab": { lat: 30.0722, lng: 31.4911 },
      "Sheikh Zayed": { lat: 30.0644, lng: 30.9767 },
      "Tagmo3": { lat: 30.0278, lng: 31.4594 },
      "Maadi": { lat: 29.9602, lng: 31.2569 },
      "Heliopolis": { lat: 30.0808, lng: 31.3228 },
      "Nasr City": { lat: 30.0626, lng: 31.3549 }
    };

    const currentLocation = selectedLocation || "New Cairo";
    const coords = locationCoords[currentLocation as keyof typeof locationCoords] || locationCoords["New Cairo"];

    // Create Google Maps URL with the current location
    const searchQuery = address ? encodeURIComponent(address) : `${coords.lat},${coords.lng}`;
    const mapsUrl = `https://www.google.com/maps/search/${searchQuery}/@${coords.lat},${coords.lng},15z`;

    // Open Google Maps in a new tab
    window.open(mapsUrl, '_blank');

    // Also trigger the location selection callback
    onLocationSelect(currentLocation);
  };
  
  return (
    <div
      className="w-full h-28 bg-gradient-to-br from-blue-50 to-green-50 border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center cursor-pointer relative overflow-hidden hover:from-blue-100 hover:to-green-100 hover:border-blue-400 transition-all duration-200"
      onClick={handleMapClick}
      title="Click to open Google Maps and adjust your location"
    >
      {!mapLoaded ? (
        <div className="text-center">
          <div className="animate-pulse h-4 w-24 bg-blue-300 rounded mx-auto mb-2"></div>
          <div className="animate-pulse h-3 w-16 bg-blue-300 rounded mx-auto"></div>
        </div>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-200/30 to-green-200/30"></div>
          <div className="relative z-10 text-center">
            <MapPin className="h-8 w-8 text-pink-500 mx-auto mb-2 drop-shadow-sm" />
            <span className="text-sm block font-semibold text-gray-800 mb-1">
              {selectedLocation || (address ? "Detected Area" : "Select location")}
            </span>
            <span className="text-xs text-blue-600 font-medium">
              🗺️ Click to open Google Maps
            </span>
            <span className="text-xs text-gray-500 block mt-1">
              Adjust your exact location
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default GoogleMapLocation;