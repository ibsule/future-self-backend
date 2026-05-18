import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { ApiError } from '../api/client';
import { registerUser } from '../api/user';
import { PageHeader } from '../components/layout/PageHeader';
import { Alert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';
import { Field } from '../components/ui/Field';
import { useAuth } from '../context/AuthContext';

export function RegisterPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const trimmedEmail = email.trim();
      await registerUser({
        first_name: firstName.trim(),
        last_name: lastName.trim() || undefined,
        email: trimmedEmail,
        password,
      });
      const loginRes = await login(trimmedEmail, password);
      signIn(loginRes.data!.token);
      navigate('/compose', { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Registration failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <PageHeader
        eyebrow="First entry"
        title="Create your ledger"
        subtitle="One account. Many letters. All delivered in greyscale honesty."
      />
      <form onSubmit={handleSubmit} className="max-w-md space-y-8">
        {error && <Alert>{error}</Alert>}
        <Field
          label="First name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Field
          label="Last name"
          hint="Optional"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Field
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          label="Password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating…' : 'Register'}
          </Button>
          <Link
            to="/login"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted hover:text-ink"
          >
            Already registered
          </Link>
        </div>
      </form>
    </section>
  );
}
