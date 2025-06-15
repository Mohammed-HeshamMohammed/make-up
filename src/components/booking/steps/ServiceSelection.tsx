import React from "react";
import { useServices, useWeddingServices } from "../../../hooks/useServices";

const ServiceSelection = ({ bookingData, updateBookingData }) => {
  const [activeTab, setActiveTab] = React.useState("hair");
  
  // Fetch services using React Query hooks
  const { data: allServices = [], isLoading: servicesLoading, error: servicesError } = useServices();
  const { data: weddingServices = [], isLoading: weddingLoading, error: weddingError } = useWeddingServices();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Get services based on active tab
  const getDisplayedServices = () => {
    if (activeTab === "wedding") {
      return weddingServices;
    }
    return allServices.filter(service => service.category === activeTab);
  };

  const displayedServices = getDisplayedServices();

  // Handle loading states
  const isLoading = activeTab === "wedding" ? weddingLoading : servicesLoading;
  const error = activeTab === "wedding" ? weddingError : servicesError;

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>Error loading services: {error.message}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 bg-salon-pink text-white px-4 py-2 rounded-md"
        >
          Retry
        </button>
      </div>
    );
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
      
      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-salon-pink"></div>
          <p className="mt-2 text-gray-600">Loading services...</p>
        </div>
      ) : displayedServices.length > 0 ? (
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
      ) : (
        <div className="text-center py-8 text-gray-500">
          No services available in this category.
        </div>
      )}
      
      <div className="flex justify-end">
        <button 
          className="bg-salon-pink hover:bg-salon-dark-pink text-white px-6 py-2 rounded-md disabled:opacity-50"
          onClick={() => updateBookingData({ category: activeTab })}
          disabled={isLoading}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default ServiceSelection;