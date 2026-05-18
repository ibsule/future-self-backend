import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { clearToken, getToken, setToken } from '../lib/token';

type AuthContextValue = {
  isAuthed: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [isAuthed, setIsAuthed] = useState(() => Boolean(getToken()));

  const signIn = useCallback((token: string) => {
    setToken(token);
    setIsAuthed(true);
  }, []);

  const signOut = useCallback(() => {
    clearToken();
    setIsAuthed(false);
  }, []);

  useEffect(() => {
    const onLogout = () => {
      signOut();
      navigate('/login', { replace: true });
    };
    window.addEventListener('auth:logout', onLogout);
    return () => window.removeEventListener('auth:logout', onLogout);
  }, [navigate, signOut]);

  const value = useMemo(
    () => ({ isAuthed, signIn, signOut }),
    [isAuthed, signIn, signOut],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
