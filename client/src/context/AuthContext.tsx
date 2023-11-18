import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { ProtectedGetRequest, apiUrl } from '../services/Server';

interface AuthContextData {
  isAuthenticated: boolean;
  userId: string;
  login: (uid:string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const checkUser = async () => {
        try {
            const jwtToken = localStorage.getItem('jwtToken');
    
            if (jwtToken) {
                const response = await ProtectedGetRequest(`${apiUrl}/auth/check-user`,jwtToken);
                if(response.ok || response.status === 304) {
                    setIsAuthenticated(true);
                }
                else{
                    setIsAuthenticated(true);
                }
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            setIsAuthenticated(false);
        }
      }
      checkUser();
  }, []);

  const login = (uid:string) => {
    setIsAuthenticated(true);
    setUserId(uid);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const contextValue: AuthContextData = {
    isAuthenticated,
    login,
    logout,
    userId
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
