import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, logoutAllSessions } from '../api/auth';
import { ApiError } from '../api/client';
import { PageHeader } from '../components/layout/PageHeader';
import { Alert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export function SettingsPage() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<'logout' | 'all' | null>(null);

  async function handleLogout() {
    setError(null);
    setLoading('logout');
    try {
      await logout();
    } catch (err) {
      if (err instanceof ApiError && err.status !== 401) {
        setError(err.message);
        setLoading(null);
        return;
      }
    }
    signOut();
    navigate('/login', { replace: true });
  }

  async function handleLogoutAll() {
    setError(null);
    setLoading('all');
    try {
      await logoutAllSessions();
    } catch (err) {
      if (err instanceof ApiError && err.status !== 401) {
        setError(err.message);
        setLoading(null);
        return;
      }
    }
    signOut();
    navigate('/login', { replace: true });
  }

  return (
    <section>
      <PageHeader
        eyebrow="Account"
        title="Sessions"
        subtitle="End this browser session or sign out everywhere you are logged in."
      />
      {error && <Alert>{error}</Alert>}
      <div className="flex max-w-md flex-col gap-4">
        <Button
          variant="outline"
          disabled={loading !== null}
          onClick={handleLogout}
        >
          {loading === 'logout' ? 'Signing out…' : 'Sign out'}
        </Button>
        <Button
          variant="ghost"
          disabled={loading !== null}
          onClick={handleLogoutAll}
        >
          {loading === 'all' ? 'Signing out…' : 'Sign out all devices'}
        </Button>
      </div>
    </section>
  );
}
