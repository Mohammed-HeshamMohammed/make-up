import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookingForm from "../components/booking/BookingForm";
import  AuthModal  from "../components/AuthModal";
import { useAuth } from "../contexts/AuthContext";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [preSelectedService, setPreSelectedService] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const service = searchParams.get("service");
    if (service) {
      setPreSelectedService(service);
      console.log("Service selected from URL:", service); // Debug log
    }
    
    // Check authentication status when component mounts
    if (!isAuthenticated) {
      setShowAuthModal(true);
    }
  }, [searchParams, isAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 bg-salon-pink/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Book Your Appointment</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Let your glam come to <em>you</em>. Our mobile salon brings hair, nails, lashes, 
                and makeup services right to your location — home, office, or venue.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            {isAuthenticated ? (
              <BookingForm preSelectedService={preSelectedService} />
            ) : (
              <div className="text-center p-8 bg-gray-50 rounded-lg shadow-sm">
                <h2 className="text-2xl font-medium mb-4">Please Login to Continue</h2>
                <p className="text-gray-600 mb-6">
                  You need to be logged in to book an appointment. Please login or create an account.
                </p>
                <button 
                  className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-md"
                  onClick={() => setShowAuthModal(true)}
                >
                  Login / Sign Up
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      
      <AuthModal 
        open={showAuthModal} 
        onClose={() => {
          setShowAuthModal(false);
          if (!isAuthenticated) {
            navigate('/');
          }
        }}
        redirectTo="/booking"
      />
    </div>
  );
};

export default Booking;















