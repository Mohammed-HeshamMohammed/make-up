import { supabase} from '@/integrations/supabase/client';
import React, { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";
import ServiceSelectionNew from './steps/ServiceSelectionNew';
import DateTimeSelection from './steps/DateTimeSelection';
import BeauticianSelection from './steps/BeauticianSelection';
import LocationSelection from './steps/LocationSelection';
import PersonalDetails from './steps/PersonalDetails';
import PaymentMethod from './steps/PaymentMethod';
import Confirmation from './steps/Confirmation';
import LoyaltyTracking from './steps/LoyaltyTracking';
import RateExperience from './steps/RateExperience';
import { BookingData } from '../../components/admin/types/booking';
import { toast } from 'sonner';
import { generateConfirmationCode } from '../../lib/utils';
import { getMinimumPriceForService } from "../../components/admin/utils/bookingUtils";
import { useServices, useWeddingServices } from '../../hooks/useServices';
import { useCreateBooking } from '../../hooks/useCreateBooking';

interface BookingFormProps {
  preSelectedService?: string | null;
}

const BookingForm: React.FC<BookingFormProps> = ({ preSelectedService }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [bookingData, setBookingData] = useState<BookingData>({
    services: preSelectedService ? [preSelectedService] : [],
    category: '',
    date: undefined,
    time: undefined,
    beautician: undefined,
    location: undefined,
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    paymentMethod: 'cash'
  });

  const { data: services = [] } = useServices();
  const { data: weddingServices = [] } = useWeddingServices();
  const createBookingMutation = useCreateBooking();

  // Generate confirmation code when booking is submitted
  useEffect(() => {
    if (currentStep === 7) {
      setConfirmationCode(generateConfirmationCode());
    }
  }, [currentStep]);

  // Update booking data
  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  // Check if current step is wedding service
  const isWedding = bookingData.services.some(s => 
    s.toLowerCase().includes('bridal') || s.toLowerCase().includes('wedding')
  );

  // Get service categories for beautician filtering
  const getServiceCategories = () => {
    const categories: string[] = [];
    bookingData.services.forEach(service => {
      if (service.toLowerCase().includes('hair')) categories.push('hair');
      if (service.toLowerCase().includes('makeup')) categories.push('makeup');
      if (service.toLowerCase().includes('nail')) categories.push('nails');
      if (service.toLowerCase().includes('lash')) categories.push('lashes');
    });
    return categories.length > 0 ? categories : ['hair', 'makeup', 'nails', 'lashes'];
  };

  // Calculate total price based on actual service prices
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    bookingData.services.forEach(serviceName => {
      // First check regular services
      const regularService = services.find(s => s.title === serviceName);
      if (regularService) {
        const priceMatch = regularService.price.match(/(\d[\d,]*)/);
        if (priceMatch && priceMatch[1]) {
          totalPrice += parseInt(priceMatch[1].replace(/,/g, ''));
        }
      } else {
        // Check wedding services
        const weddingService = weddingServices.find(s => s.title === serviceName);
        if (weddingService) {
          const priceMatch = weddingService.price.match(/(\d[\d,]*)/);
          if (priceMatch && priceMatch[1]) {
            totalPrice += parseInt(priceMatch[1].replace(/,/g, ''));
          }
        }
      }
    });
    if (isSameDay) {
      totalPrice = totalPrice * 1.1;
    }
    return totalPrice;
  };

  // Check if same-day booking
  const isSameDay = bookingData.date ? 
    new Date(bookingData.date).toDateString() === new Date().toDateString() : false;

  // Handle form submission
  const handleSubmit = async () => {
    try {
      await createBookingMutation.mutateAsync(filterBookingDataForInsert(bookingData));
      toast.success('Booking submitted successfully!');
      setCurrentStep(prev => prev + 1);
    } catch (error: any) {
      toast.error('Failed to submit booking: ' + (error.message || 'Unknown error'));
    }
  };

  // Scroll to top when changing steps
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  // Add console logs to help debug the issue
  useEffect(() => {
    console.log("Current step:", currentStep);
    console.log("Current booking data:", bookingData);
  }, [currentStep, bookingData]);

  // Render current step
  const renderStep = () => {
    try {
      switch(currentStep) {
        case 1:
          return (
            <ServiceSelectionNew 
              bookingData={bookingData} 
              updateBookingData={updateBookingData}
            />
          );
        case 2:
          return (
            <DateTimeSelection 
              bookingData={bookingData} 
              updateBookingData={updateBookingData}
              isWedding={isWedding}
            />
          );
        case 3:
          return (
            <BeauticianSelection 
              bookingData={bookingData} 
              updateBookingData={updateBookingData}
              categories={getServiceCategories()}
            />
          );
        case 4:
          return (
            <LocationSelection 
              bookingData={bookingData} 
              updateBookingData={updateBookingData}
            />
          );
        case 5:
          return (
            <PersonalDetails 
              bookingData={bookingData} 
              updateBookingData={updateBookingData}
            />
          );
        case 6:
          return (
            <PaymentMethod 
              bookingData={bookingData} 
              updateBookingData={updateBookingData}
              totalPrice={calculateTotalPrice()}
              surchargeApplied={isSameDay}
            />
          );
        case 7:
          return (
            <Confirmation 
              bookingData={bookingData}
              totalPrice={calculateTotalPrice()}
              confirmationCode={confirmationCode}
              surchargeApplied={isSameDay}
            />
          );
        case 8:
          return (
            <LoyaltyTracking 
              bookingData={bookingData}
              confirmationCode={confirmationCode}
            />
          );
        case 9:
          return (
            <RateExperience 
              bookingData={bookingData}
              confirmationCode={confirmationCode}
            />
          );
        default:
          return <div>Unknown step</div>;
      }
    } catch (error) {
      console.error("Rendering error:", error);
      return <div>Something went wrong. Please try again.</div>;
    }
  };

  // Validate current step
  const validateStep = () => {
    try {
      switch(currentStep) {
        case 1: // Service Selection
          return bookingData.services.length > 0;
        case 2: // Date Time
          return bookingData.date && bookingData.time;
        case 3: // Beautician
          return bookingData.beautician !== undefined && bookingData.beautician !== '';
        case 4: // Location
          return bookingData.location && bookingData.address;
        case 5: // Personal Details
          return bookingData.name && bookingData.phone && bookingData.email;
        case 6: // Payment
          // Enhanced validation for payment methods
          if (bookingData.paymentMethod === 'card') {
            // Validate credit card information
            return bookingData.cardInfo && 
                  bookingData.cardInfo.cardNumber && 
                  bookingData.cardInfo.cardHolder && 
                  bookingData.cardInfo.expiryDate && 
                  bookingData.cardInfo.cvv;
          } else if (bookingData.paymentMethod === 'instapay') {
            // Validate receipt upload
            return bookingData.receiptImage !== undefined;
          }
          return bookingData.paymentMethod === 'instapay' || bookingData.paymentMethod === 'card';
        default:
          return true;
      }
    } catch (error) {
      console.error("Validation error:", error);
      return false;
    }
  };

  // Get total number of steps
  const totalSteps = 9;

  // Pre-select service if passed via URL
  useEffect(() => {
    if (preSelectedService) {
      console.log("BookingForm received preSelectedService:", preSelectedService);
      
      // Simple approach - just set the service directly
      setBookingData(prev => ({
        ...prev,
        services: [preSelectedService]
      }));
      
      // Log the updated booking data for debugging
      console.log("Updated booking data with preselected service");
    }
  }, [preSelectedService]);

  function filterBookingDataForInsert(bookingData: any) {
    // Only include columns that exist in your 'bookings' table
    const insertObj: any = {
      customer: bookingData.name,
      service: Array.isArray(bookingData.services) ? bookingData.services[0] : bookingData.services,
      location: bookingData.location,
      beautician: bookingData.beautician,
      date: bookingData.date,
      time: bookingData.time,
      status: 'pending',
      payment: bookingData.paymentMethod || 'cash',
      payment_status: 'pending',
      price: bookingData.price,
      phone: bookingData.phone,
      address: bookingData.address
    };
    // Optionally add van if you have it
    if (bookingData.van) insertObj.van = bookingData.van;
    return insertObj;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div 
              key={step} 
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep === step 
                  ? 'bg-salon-purple text-white' 
                  : currentStep > step 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Services</span>
          <span>Date</span>
          <span>Beautician</span>
          <span>Location</span>
          <span>Details</span>
          <span>Payment</span>
          <span>Confirm</span>
          <span>Loyalty</span>
          <span>Rate</span>
        </div>
      </div>

      {/* Current step content - Full width layout without summary */}
      <div className="mb-8">
        {renderStep()}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        {currentStep > 1 && currentStep < 8 && (
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(prev => prev - 1)}
          >
            Back
          </Button>
        )}
        
        {currentStep < 7 ? (
          <Button 
            className="bg-salon-purple hover:bg-salon-dark-purple ml-auto"
            onClick={() => {
              try {
                // Add validation for step 1
                if (currentStep === 1 && bookingData.services.length === 0) {
                  alert("Please select at least one service to continue");
                  return;
                }
                
                // Log before changing step
                console.log("Moving from step", currentStep, "to", currentStep + 1);
                
                // Advance to next step
                setCurrentStep(prev => prev + 1);
                
                // Log after changing step
                console.log("Successfully moved to step", currentStep + 1);
              } catch (error) {
                console.error("Error advancing to next step:", error);
                // Prevent blank screen by showing an error message
                toast.error("Something went wrong. Please try again.");
              }
            }}
            disabled={!validateStep()}
          >
            Next
          </Button>
        ) : currentStep === 7 ? (
          <Button 
            className="bg-salon-purple hover:bg-salon-dark-purple ml-auto"
            onClick={handleSubmit}
          >
            Complete Booking
          </Button>
        ) : currentStep === 8 ? (
          <Button 
            className="bg-salon-purple hover:bg-salon-dark-purple ml-auto"
            onClick={() => setCurrentStep(prev => prev + 1)}
          >
            Continue
          </Button>
        ) : (
          <Button 
            className="bg-salon-purple hover:bg-salon-dark-purple ml-auto"
            onClick={() => window.location.href = "/"}
          >
            Return Home
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingForm;