import { useState } from "react";
import { Calendar } from "../../../components/ui/calendar";
import { Button } from "../../../components/ui/button";
import { CalendarIcon, Clock } from "lucide-react";
import { format, addDays, addMonths, isToday, isBefore } from "date-fns";
import { BookingData } from "../../../components/admin/types/booking";
import { toast } from "sonner";

interface DateTimeSelectionProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  isWedding: boolean;
}

const DateTimeSelection = ({ bookingData, updateBookingData, isWedding }: DateTimeSelectionProps) => {
  const today = new Date();
  // Wedding services still require 1 month advance booking
  const minDate = isWedding 
    ? addMonths(today, 1) 
    : today; // Allow booking from today for regular services
  
  const recommendedDate = isWedding 
    ? addDays(today, 35) // Recommended 5 weeks for weddings
    : addDays(today, 7); // Recommended 7 days for regular services

  // Available time slots
  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", 
    "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-bold text-center">Choose Date & Time</h2>
      
      {isWedding && (
        <div className="bg-salon-pink/10 p-4 rounded-md text-sm">
          <p className="font-medium">Wedding Booking Notice:</p>
          <p>Wedding services require at least 1 month advance booking to ensure availability of our bridal specialists.</p>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" /> Select Date
          </h3>
          <Calendar
            mode="single"
            selected={bookingData.date || undefined}
            onSelect={(date) => {
              if (date) {
                if (isWedding && isBefore(date, minDate)) {
                  toast.error("Wedding bookings require at least 1 month advance notice");
                  return;
                }
                
                updateBookingData({ date });
                
                if (!isWedding) {
                  if (isBefore(date, recommendedDate) && !isToday(date)) {
                    toast.info("We recommend booking at least 7 days in advance for the best availability");
                  }
                  
                  if (isToday(date)) {
                    toast.warning("Same-day bookings have a 10% surcharge");
                  }
                }
              }
            }}
            disabled={(date) => 
              // Disable dates in the past
              date < new Date(today.setHours(0, 0, 0, 0)) ||
              // For wedding bookings, disable dates less than 1 month away
              (isWedding && date < minDate)
            }
            className="rounded-md border"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" /> Select Time
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                type="button"
                variant={bookingData.time === time ? "default" : "outline"}
                className={`${
                  bookingData.time === time 
                    ? "bg-salon-purple hover:bg-salon-dark-purple" 
                    : "border-salon-purple text-salon-purple hover:bg-salon-pink/10"
                }`}
                onClick={() => updateBookingData({ time })}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {bookingData.date && bookingData.time && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <h3 className="font-medium">Your Selected Appointment:</h3>
          <p className="mt-1">
            {format(bookingData.date, "EEEE, MMMM d, yyyy")} at {bookingData.time}
          </p>
        </div>
      )}
    </div>
  );
};

export default DateTimeSelection;







