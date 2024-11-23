'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { userStatus } from '@/lib/data_api';
// import { useRouter } from 'next/router';

interface UserInfo {
  id: number,
  username: string
}

interface AuthContextProps {
  isAuthenticated: boolean,
  user: UserInfo | null,
  updateAuthStatus: () => void,
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authStatus, SetAuthStatus] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  const fetchUserStatus = async() => {
    const data = await userStatus();
    if ( data === false) {
      SetAuthStatus(false);
      setUser(null);
      return;
    }
    SetAuthStatus(data.status);
    setUser(data.user)
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
