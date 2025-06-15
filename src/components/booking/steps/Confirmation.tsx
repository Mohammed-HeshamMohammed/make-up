
import React from "react";
import { BookingData } from "../../../components/admin/types/booking";
import { Check } from "lucide-react";
import { format } from "date-fns";
import { getMinimumPriceForService } from "../../../components/admin/utils/bookingUtils";

interface ConfirmationProps {
  bookingData: BookingData;
  confirmationCode: string;
  totalPrice: number;
  surchargeApplied: boolean;
}

const Confirmation = ({ bookingData, confirmationCode, totalPrice, surchargeApplied }: ConfirmationProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-playfair font-bold">Booking Confirmed!</h2>
        <p className="text-gray-600 mt-2">
          Your appointment has been successfully booked. We've sent a confirmation to your email and phone.
        </p>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-medium mb-4">Booking Summary</h3>
        
        {/* Confirmation code */}
        <div className="mb-4 p-3 bg-salon-purple/10 rounded-md">
          <p className="text-center font-medium">Confirmation Code: <span className="text-salon-purple">{confirmationCode}</span></p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Services */}
          <div>
            <h4 className="text-sm text-gray-500 mb-1">Services</h4>
            {bookingData.services.map((service, index) => (
              <p key={index} className="font-medium">{service}</p>
            ))}
          </div>
          
          {/* Date & Time */}
          <div>
            <h4 className="text-sm text-gray-500 mb-1">Date & Time</h4>
            <p className="font-medium">
              {bookingData.date && format(new Date(bookingData.date), "EEEE, MMMM dd, yyyy")}
            </p>
            <p className="font-medium">{bookingData.time}</p>
          </div>
          
          {/* Location */}
          <div>
            <h4 className="text-sm text-gray-500 mb-1">Location</h4>
            <p className="font-medium">{bookingData.location}</p>
            <p className="text-sm">{bookingData.address}</p>
          </div>
          
          {/* Contact Information */}
          <div>
            <h4 className="text-sm text-gray-500 mb-1">Contact Information</h4>
            <p className="font-medium">{bookingData.name}</p>
            <p className="text-sm">{bookingData.phone}</p>
            <p className="text-sm">{bookingData.email}</p>
          </div>
          
          {/* Payment Method */}
          <div>
            <h4 className="text-sm text-gray-500 mb-1">Payment Method</h4>
            <p className="font-medium">
              {bookingData.paymentMethod === 'cash' ? 'Cash on Delivery' : 
               bookingData.paymentMethod === 'card' ? 'Credit/Debit Card' : 
               bookingData.paymentMethod === 'instapay' ? 'InstaPay' : 
               'Payment Method'}
            </p>
          </div>
        </div>
        
        {/* Total price */}
        <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
          <span>Total Price</span>
          <span className="text-salon-pink">{totalPrice} EGP</span>
        </div>
      </div>
      
      {/* Questions section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-medium mb-2">Questions?</h3>
        <p>Contact our customer support at support@glamvan.com or call us at +20 01123456789</p>
      </div>
    </div>
  );
};

export default Confirmation;









