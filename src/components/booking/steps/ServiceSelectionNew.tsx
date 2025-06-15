import React, { useEffect } from "react";
import { useServices, useWeddingServices } from '../../../hooks/useServices';

interface Service {
  id: number;
  category: string;
  title: string;
  description: string;
  price: string;
  image?: string;
  link?: string;
  icon?: string;
}

const ServiceSelection = ({ bookingData, updateBookingData }) => {
  // Determine initial tab based on preSelectedService
  const getInitialTab = () => {
    if (bookingData.services.length > 0) {
      const service = bookingData.services[0].toLowerCase();
      if (service.includes('wedding') || service.includes('bridal')) return 'wedding';
      if (service.includes('hair')) return 'hair';
      if (service.includes('makeup')) return 'makeup';
      if (service.includes('nail')) return 'nails';
      if (service.includes('lash')) return 'lashes';
    }
    return 'hair';
  };

  const [activeTab, setActiveTab] = React.useState(getInitialTab);

  // Update active tab when services change
  useEffect(() => {
    if (bookingData.services.length > 0) {
      const newTab = getInitialTab();
      setActiveTab(newTab);
    }
  }, [bookingData.services]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Fetch services from Supabase
  const { data: allServices = [] } = useServices();
  const { data: weddingServices = [] } = useWeddingServices();

  // Get services based on active tab
  const getDisplayedServices = (): Service[] => {
    if (activeTab === "wedding") {
      return Array.isArray(weddingServices) ? weddingServices : [];
    }
    return Array.isArray(allServices) ? allServices.filter((service: Service) => service.category === activeTab) : [];
  };

  const displayedServices = getDisplayedServices();

  if (!Array.isArray(allServices) || !Array.isArray(weddingServices)) {
    return <div>Loading services...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-playfair font-bold text-center mb-3">Select Your Services</h2>
      <p className="text-center text-gray-600 mb-6">
        Mix and match services from different categories as you need!
      </p>
      
      <div className="mb-10">
        <div className="grid grid-cols-5 gap-1 bg-gray-100 rounded-lg">
          <button
            className={`py-2 px-4 text-center ${
              activeTab === "hair" ? "bg-salon-pink text-white" : ""
            }`}
            onClick={() => handleTabChange("hair")}
          >
            Hair
          </button>
          <button
            className={`py-2 px-4 text-center ${
              activeTab === "makeup" ? "bg-salon-pink text-white" : ""
            }`}
            onClick={() => handleTabChange("makeup")}
          >
            Makeup
          </button>
          <button
            className={`py-2 px-4 text-center ${
              activeTab === "nails" ? "bg-salon-pink text-white" : ""
            }`}
            onClick={() => handleTabChange("nails")}
          >
            Nails
          </button>
          <button
            className={`py-2 px-4 text-center ${
              activeTab === "lashes" ? "bg-salon-pink text-white" : ""
            }`}
            onClick={() => handleTabChange("lashes")}
          >
            Lashes
          </button>
          <button
            className={`py-2 px-4 text-center rounded-r-lg ${
              activeTab === "wedding" ? "bg-salon-pink text-white" : ""
            }`}
            onClick={() => handleTabChange("wedding")}
          >
            Wedding
          </button>
        </div>
      </div>
      
      {displayedServices.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {displayedServices.map((service) => (
            <div key={service.id} className="border border-gray-200 p-4 rounded-md">
              <div className="flex items-start">
                <input 
                  type="checkbox"
                  id={`service-${service.id}`}
                  className="mt-1 mr-3"
                  onChange={(e) => {
                    const updatedServices = e.target.checked
                      ? [...bookingData.services, service.title]
                      : bookingData.services.filter(s => s !== service.title);
                    updateBookingData({ services: updatedServices });
                  }}
                  checked={bookingData.services.includes(service.title)}
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <label htmlFor={`service-${service.id}`} className="text-lg font-medium">
                      {service.title}
                    </label>
                    <span className="text-salon-pink font-medium">
                      {service.price}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* REMOVED THE NEXT BUTTON COMPLETELY */}
    </div>
  );
};

export default ServiceSelection;



