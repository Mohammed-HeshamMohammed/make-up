
import React, { useState, useEffect } from "react";
import { BookingData } from "../../../components/admin/types/booking";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import GoogleMapLocation from "@/components/GoogleMapLocation";

// Correct service areas for GlamVan
const CAIRO_LOCATIONS = [
  "New Cairo",
  "El Rehab",
  "Sheikh Zayed"
];

interface LocationSelectionProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
}

const LocationSelection = ({ bookingData, updateBookingData }: LocationSelectionProps) => {
  const [selectedLocation, setSelectedLocation] = useState(bookingData.location || "");
  const [address, setAddress] = useState(bookingData.address || "");

  // Handle location selection
  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    updateBookingData({ location });
  };

  // Handle address change
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    updateBookingData({ address: newAddress });
  };

  // Handle map location selection
  const handleMapLocationSelect = (location: string) => {
    setSelectedLocation(location);
    updateBookingData({ location });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-bold text-center">Choose Your Location</h2>
      <p className="text-center text-gray-600">Select where you'd like to receive your service</p>
      
      <RadioGroup 
        value={selectedLocation} 
        onValueChange={handleLocationSelect}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {CAIRO_LOCATIONS.map((location) => (
          <div key={location} className="relative">
            <RadioGroupItem value={location} id={location} className="peer sr-only" />
            <Label
              htmlFor={location}
              className="flex p-4 border rounded-md cursor-pointer peer-data-[state=checked]:border-salon-purple peer-data-[state=checked]:bg-salon-pink/10"
            >
              {location}
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      <div className="space-y-4">
        <Label htmlFor="address">Detailed Address</Label>
        <Input
          id="address"
          placeholder="Enter your full address, building number, apartment, etc."
          value={address}
          onChange={handleAddressChange}
          className="w-full"
        />
      </div>
      
      {/* Google Maps Integration */}
      <div className="mt-6">
        <Label className="mb-2 block">Confirm on Map</Label>
        <GoogleMapLocation 
          address={address} 
          onLocationSelect={handleMapLocationSelect} 
        />
      </div>
    </div>
  );
};

export default LocationSelection;















