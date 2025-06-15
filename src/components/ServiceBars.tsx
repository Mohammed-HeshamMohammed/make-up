import { Link } from "react-router-dom";
import { Scissors } from "lucide-react";
import { useServices } from '../hooks/useServices';

// Define the Service interface
interface Service {
  category: string;
  // Add other service properties as needed
  id?: string;
  name?: string;
  price?: number;
  description?: string;
}

const categoryImages: Record<string, string> = {
  hair: "/lovable-uploads/2dcece83-1b6b-47ac-ac5d-19574f52d920.png",
  makeup: "/lovable-uploads/3260662e-8417-4825-9bbd-5858adede228.png",
  nails: "/lovable-uploads/ffd07d25-8d73-46e7-a912-6fdc85b0a049.png",
  lashes: "/lovable-uploads/7b8a8247-58bd-488e-9ebf-be1c00853425.png",
  wedding: "/lovable-uploads/wedding.jpg",
};

const ServiceBars = () => {
  const { data: services = [], isLoading } = useServices();
  
  // Type the services array properly
  const typedServices = services as Service[];
  const serviceCategories = Array.from(new Set(typedServices.map((s) => s.category)));

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="py-16 bg-white" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h5 className="text-salon-purple text-lg mb-2 font-medium">Our Services</h5>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Premium Beauty Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience luxury salon-quality treatments with our mobile salon. 
            Our expert beauticians bring professional services directly to your location.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {serviceCategories.map((service, index) => (
            <Link 
              key={index}
              to={`/services?category=${service}`}
              className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={categoryImages[service] || "/fallback.jpg"}
                  alt={service}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-playfair font-bold text-center px-4">
                    {service}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Scissors className="h-8 w-8 text-salon-purple" />
                  <svg className="w-5 h-5 text-salon-purple group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  Professional services for {service}
                </p>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <span className="text-salon-purple text-sm font-medium flex items-center">
                    Learn More
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/services" 
            className="inline-flex text-xl items-center text-salon-purple hover:text-salon-dark-purple transition-colors font-medium"
          >
            View All Services
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceBars;