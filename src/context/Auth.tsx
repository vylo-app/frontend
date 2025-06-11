import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import type { ReactNode } from 'react';

interface AuthContextProps {
  accessToken: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post('/api/auth/refresh', null, { withCredentials: true })
      .then((res) => setAccessToken(res.data.accessToken))
      .catch(() => setAccessToken(null))
      .finally(() => setLoading(false));
  }, []);

  return <AuthContext.Provider value={{ accessToken, isLoading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
