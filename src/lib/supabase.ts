import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  category: string;
  thumbnail_url: string;
  youtube_playlist_url?: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface Instructor {
  id: string;
  name: string;
  expertise: string;
  photo_url: string;
  bio?: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  student_name: string;
  content: string;
  rating: number;
  created_at: string;
}
