/*
  # Music Licensing Platform Schema

  1. New Tables
    - `profiles`
      - Extended user profile information
      - Linked to Supabase auth.users
      - Stores name, phone, contact info
    - `tracks`
      - Music track information
      - Stores metadata and statistics
    - `track_plays`
      - Track play history
      - Analytics data for plays/downloads
    - `user_roles`
      - Role management for admins/managers

  2. Security
    - Enable RLS on all tables
    - Policies for admin access
    - Policies for user data access

  3. Changes
    - Initial schema creation
    - Setup of foreign key relationships
    - Analytics tracking setup
*/

-- Create enum for account status
CREATE TYPE account_status AS ENUM ('active', 'suspended');

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'user');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  phone text,
  email text NOT NULL,
  contact_info text,
  status account_status DEFAULT 'active',
  role user_role DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tracks table
CREATE TABLE IF NOT EXISTS tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist text NOT NULL,
  duration integer NOT NULL, -- in seconds
  uploaded_by uuid REFERENCES profiles(id),
  total_plays integer DEFAULT 0,
  total_downloads integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create track_plays table for analytics
CREATE TABLE IF NOT EXISTS track_plays (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id uuid REFERENCES tracks(id),
  user_id uuid REFERENCES profiles(id),
  play_type text NOT NULL CHECK (play_type IN ('play', 'download')),
  played_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE track_plays ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Profiles are viewable by admins and managers"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('admin', 'manager'));

CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can update any profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Policies for tracks
CREATE POLICY "Tracks are viewable by everyone"
  ON tracks
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins and managers can update tracks"
  ON tracks
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('admin', 'manager'));

-- Policies for track_plays
CREATE POLICY "Track plays are viewable by admins and managers"
  ON track_plays
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('admin', 'manager'));

-- Functions for analytics
CREATE OR REPLACE FUNCTION increment_track_plays(track_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE tracks
  SET total_plays = total_plays + 1
  WHERE id = track_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;