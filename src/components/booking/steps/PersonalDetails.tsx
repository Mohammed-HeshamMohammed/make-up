import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import { BookingData } from "../../../components/admin/types/booking";
import { User, Phone, Mail, MessageSquare } from "lucide-react";

interface PersonalDetailsProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
}

const PersonalDetails = ({ bookingData, updateBookingData }: PersonalDetailsProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-bold text-center">Your Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="font-medium flex items-center gap-2">
            <User className="h-4 w-4" /> Full Name <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="fullName"
            placeholder="Enter your full name"
            value={bookingData.name}
            onChange={(e) => updateBookingData({ name: e.target.value })}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="font-medium flex items-center gap-2">
            <Phone className="h-4 w-4" /> Phone Number <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="phoneNumber"
            placeholder="Enter your phone number"
            value={bookingData.phone}
            onChange={(e) => updateBookingData({ phone: e.target.value })}
            required
          />
          <p className="text-xs text-gray-500">
            We'll send booking confirmation via SMS
          </p>
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="email" className="font-medium flex items-center gap-2">
            <Mail className="h-4 w-4" /> Email <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={bookingData.email}
            onChange={(e) => updateBookingData({ email: e.target.value })}
            required
          />
          <p className="text-xs text-gray-500">
            We'll send your booking confirmation to this email
          </p>
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="notes" className="font-medium flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Special Requests (Optional)
          </Label>
          <Textarea 
            id="notes"
            placeholder="Any special requests or notes for our beauticians"
            value={bookingData.notes}
            onChange={(e) => updateBookingData({ notes: e.target.value })}
            className="min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;

