import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserDTO } from '@repo/types';

interface AuthState {
  user: UserDTO | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  setAuth: (user: UserDTO, accessToken: string) => void;
  clearAuth: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: (user, accessToken) => {
        set({ 
          user, 
          accessToken, 
          isAuthenticated: true, 
          isLoading: false 
        });
      },

      clearAuth: () => {
        set({ 
          user: null, 
          accessToken: null, 
          isAuthenticated: false, 
          isLoading: false 
        });
      },

      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'auth-storage',
      // We only want to persist part of the state to localStorage if needed
      // (Refresh token is usually in HttpOnly cookie, so we don't need a lot here)
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken
      }),
    }
  )
);
