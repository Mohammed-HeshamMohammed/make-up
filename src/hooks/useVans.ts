import { useQuery } from '@tanstack/react-query';
import { supabase } from '../components/supabaseClient';

export function useVans() {
  return useQuery({
    queryKey: ['vans'],
    queryFn: async () => {
      const { data, error } = await supabase.from('vans').select('*');
      if (error) throw error;
      return data || [];
    },
  });
} 