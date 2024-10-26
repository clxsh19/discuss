'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { userStatus } from '@/lib/data_api';
import { useRouter } from 'next/router';

interface AuthContextProps {
  isAuthenticated: boolean,
  updateAuthStatus: () => void,
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authStatus, SetAuthStatus] = useState(false);

  const fetchUserStatus = async() => {
    const status = await userStatus();
    console.log('Auth context status : ',  status);
    SetAuthStatus(status);
  };  

  useEffect(() => {
    fetchUserStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authStatus,
        updateAuthStatus: fetchUserStatus,
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
