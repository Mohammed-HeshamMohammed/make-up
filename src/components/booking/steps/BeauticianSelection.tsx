import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { Label } from "../../../components/ui/label";
import { BookingData } from "../../../components/admin/types/booking";
import { Star } from "lucide-react";
import { useBeauticians } from '../../../hooks/useBeauticians';

interface BeauticianSelectionProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  categories: string[];
}

const BeauticianSelection = ({ bookingData, updateBookingData, categories }: BeauticianSelectionProps) => {
  const [selectedBeautician, setSelectedBeautician] = useState<string>(bookingData.beautician || "");
  const { data: beauticians = [], isLoading } = useBeauticians();

  // Filter beauticians based on selected service categories
  const filteredBeauticians = beauticians.filter((beautician: any) =>
    categories.some(category =>
      (beautician.specialties || []).some((specialty: string) =>
        specialty.toLowerCase().includes(category.toLowerCase())
      )
    )
  );

  // Ensure there's at least one beautician shown if filtering returns empty
  const displayBeauticians = filteredBeauticians.length > 0 ? filteredBeauticians : beauticians;

  // Handle beautician selection
  const handleBeauticianSelect = (name: string) => {
    setSelectedBeautician(name);
    updateBookingData({ beautician: name });
  };

  // Initialize with existing selection
  useEffect(() => {
    if (bookingData.beautician) {
      setSelectedBeautician(bookingData.beautician);
    }
  }, [bookingData.beautician]);

  if (isLoading) return <div>Loading beauticians...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-bold text-center">Choose Your Beautician</h2>
      <p className="text-center text-gray-600">Select a beautician who specializes in your chosen services</p>
      
      <RadioGroup 
        value={selectedBeautician} 
        onValueChange={handleBeauticianSelect}
        className="space-y-4"
      >
        {displayBeauticians.map((beautician: any) => (
          <div 
            key={beautician.id} 
            className={`flex items-center space-x-4 p-4 border rounded-md hover:bg-gray-50 cursor-pointer ${
              selectedBeautician === beautician.name ? "border-salon-purple bg-salon-pink/10" : ""
            }`}
          >
            <RadioGroupItem 
              value={beautician.name} 
              id={`beautician-${beautician.id}`}
              className="mt-1 data-[state=checked]:bg-salon-pink data-[state=checked]:border-salon-pink data-[state=checked]:text-salon-pink"
            />
            <img 
              src={beautician.image} 
              alt={beautician.name} 
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <Label 
                htmlFor={`beautician-${beautician.id}`} 
                className="text-lg font-medium cursor-pointer"
              >
                {beautician.name}
              </Label>
              <p className="text-sm text-gray-500">{beautician.experience} experience</p>
              <p className="text-sm text-gray-500">Specializes in: {(beautician.specialties || []).join(", ")}</p>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm ml-1">{beautician.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default BeauticianSelection;