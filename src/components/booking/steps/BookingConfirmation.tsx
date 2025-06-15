import React from "react";
import { BookingData } from "../../../components/admin/types/booking";
import { Button } from "../../../components/ui/button";
import { Check, Calendar, MapPin, User } from "lucide-react";
import { format } from "date-fns";

interface BookingConfirmationProps {
  bookingData: BookingData;
  onSubmit: () => void;
}

const BookingConfirmation = ({ bookingData, onSubmit }: BookingConfirmationProps) => {
  // Calculate total price (this is a simplified version)
  const calculateTotalPrice = () => {
    // In a real app, you would look up the actual prices from your services data
    // This is just a placeholder
    return "1,500 EGP";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-bold text-center">Confirm Your Booking</h2>
      <p className="text-center text-gray-600">Please review your booking details before submitting</p>
      
      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <div className="border-b pb-4">
          <h3 className="font-medium text-lg mb-2">Selected Services</h3>
          <ul className="space-y-2">
            {bookingData.services.map((service, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border-b pb-4">
          <h3 className="font-medium text-lg mb-2">Date & Time</h3>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-salon-purple" />
            <span>
              {bookingData.date ? format(bookingData.date, 'MMMM d, yyyy') : 'Not selected'} at {bookingData.time || 'Not selected'}
            </span>
          </div>
        </div>
        
        <div className="border-b pb-4">
          <h3 className="font-medium text-lg mb-2">Location</h3>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-salon-purple" />
            <span>{bookingData.address || 'Not provided'}</span>
          </div>
        </div>
        
        <div className="border-b pb-4">
          <h3 className="font-medium text-lg mb-2">Personal Details</h3>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-salon-purple" />
            <span>{bookingData.name || 'Not provided'}</span>
          </div>
          <div className="ml-6">
            <p>Email: {bookingData.email || 'Not provided'}</p>
            <p>Phone: {bookingData.phone || 'Not provided'}</p>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-2">Payment Method</h3>
          <p>{bookingData.paymentMethod || 'Not selected'}</p>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Price:</span>
            <span className="text-xl font-bold text-salon-purple">{calculateTotalPrice()}</span>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <Button 
          onClick={onSubmit}
          className="bg-salon-purple hover:bg-salon-dark-purple px-8 py-2"
        >
          Submit Booking Request
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;








