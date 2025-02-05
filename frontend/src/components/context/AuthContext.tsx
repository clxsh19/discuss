'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { userData } from '@/lib/data_api';
import { promises } from 'dns';
// import { useRouter } from 'next/router';

interface UserInfo {
  id: number,
  username: string
}

interface AuthContextProps {
  isAuthenticated: boolean,
  user: UserInfo | null,
  updateAuthStatus: () => Promise<void>,
  loading: boolean,
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authStatus, setAuthStatus] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserStatus = async (): Promise<void> => {
    console.log('fetching auth status')
    setLoading(true);
    try {
      const data = await userData();
      setAuthStatus(data.status);
      setUser(data.user);
    } catch (error) {
      console.error('Error fetching user status:', error);
      setAuthStatus(false);
      setUser(null);
    } 
   
    setLoading(false);
  };

  useEffect(() => {
    fetchUserStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authStatus,
        user,
        updateAuthStatus: fetchUserStatus,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
