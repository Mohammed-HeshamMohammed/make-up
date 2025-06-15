import { useMutation } from '@tanstack/react-query';
import { supabase } from '../components/supabaseClient';

export function useCreateBooking() {
  return useMutation({
    mutationFn: async (bookingData: any) => {
      const { data, error } = await supabase.from('bookings').insert([bookingData]);
      if (error) throw error;
      return data;
    },
  });
} 