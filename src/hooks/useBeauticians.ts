import { useQuery } from '@tanstack/react-query';
import { supabase } from '../components/supabaseClient';

export function useBeauticians() {
  return useQuery({
    queryKey: ['beauticians'],
    queryFn: async () => {
      const { data, error } = await supabase.from('Beautician').select('*');
      if (error) throw error;
      return data || [];
    },
  });
} 