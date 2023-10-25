import { Database } from './contexts/supabase';

export type Team = Database['public']['Tables']['Teams']['Row'];
export type Athlete = Database['public']['Tables']['Athletes']['Row'];
