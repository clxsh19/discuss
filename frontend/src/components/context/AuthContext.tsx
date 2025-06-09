'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { userData } from '@/lib/data_api';
// import { useRouter } from 'next/router';
import { UserInfo, AuthContextProps, AuthProviderProps } from '@/interface/context/AuthContextProps';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authStatus, setAuthStatus] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserStatus = async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await userData();
      alert(data);
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
