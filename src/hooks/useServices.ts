import { useQuery } from '@tanstack/react-query';
import { supabase } from '../components/supabaseClient';

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase.from('services').select('*');
      if (error) throw error;
      return data || [];
    },
  });
}

export function useWeddingServices() {
  return useQuery({
    queryKey: ['weddingServices'],
    queryFn: async () => {
      const { data, error } = await supabase.from('services').select('*').eq('category', 'wedding');
      if (error) throw error;
      return data || [];
    },
  });
} 