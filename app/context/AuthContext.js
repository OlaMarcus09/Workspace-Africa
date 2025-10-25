'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { databaseService } from "../../lib/utils/supabase-client";

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(false);

  // Check if Supabase is configured
  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      setIsConfigured(true);
    } else {
      console.warn('Supabase environment variables are missing');
      setIsConfigured(false);
      setLoading(false);
    }
  }, []);

  // Create or update user profile
  const createUserProfile = async (userData) => {
    try {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userData.id)
        .single();

      if (!existingProfile) {
        const { data: newProfile, error } = await supabase
          .from('profiles')
          .insert([
            {
              id: userData.id,
              email: userData.email,
              full_name: userData.user_metadata?.full_name,
              role: userData.user_metadata?.role || 'professional',
              company_name: userData.user_metadata?.company_name,
              space_name: userData.user_metadata?.space_name
            }
          ])
          .select()
          .single();

        if (error) throw error;
        return newProfile;
      }

      return existingProfile;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  };

  // Check for active session on mount
  useEffect(() => {
    if (!isConfigured) return;

    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          // Create or get user profile
          const userProfile = await createUserProfile(session.user);
          setProfile(userProfile);
        } else {
          setUser(null);
          setProfile(null);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          const userProfile = await createUserProfile(session.user);
          setProfile(userProfile);
        } else {
          setUser(null);
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [isConfigured]);

  // Sign up function
  const signUp = async (email, password, userData = {}) => {
    if (!isConfigured) {
      throw new Error('Authentication is not configured');
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(error.message || 'Failed to sign up');
    }
  };

  // Sign in function
  const signIn = async (email, password) => {
    if (!isConfigured) {
      throw new Error('Authentication is not configured');
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(error.message || 'Failed to sign in');
    }
  };

  // Sign out function
  const signOut = async () => {
    if (!isConfigured) {
      throw new Error('Authentication is not configured');
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      throw new Error(error.message || 'Failed to sign out');
    }
  };

  // Update profile
  const updateProfile = async (updates) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      const updatedProfile = await databaseService.updateProfile(user.id, updates);
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (error) {
      throw new Error(error.message || 'Failed to update profile');
    }
  };

  const value = {
    user,
    profile,
    signUp,
    signIn,
    signOut,
    updateProfile,
    loading,
    isConfigured
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
