import React from 'react';
import { useSearchParams } from 'react-router-dom';
import BookingForm from './BookingForm';
import AuthModal from '../AuthModal';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const preSelectedService = searchParams.get('service');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <BookingForm preSelectedService={preSelectedService} />
    </div>
  );
};


export default AuthModal;

