
import { Card, CardContent } from "../components/ui/card";

export interface TestimonialProps {
  name: string;
  location: string;
  quote: string;
  image: string;
  rating: number;
}

const TestimonialCard = ({ name, location, quote, image, rating }: TestimonialProps) => {
  return (
    <Card className="bg-white border-none shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg 
                key={index} 
                className={`w-4 h-4 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        
        <p className="text-gray-700 mb-6 italic">"{quote}"</p>
        
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium text-salon-dark">{name}</h4>
            <p className="text-gray-500 text-xs">{location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;

