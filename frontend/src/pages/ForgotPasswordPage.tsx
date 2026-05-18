import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { forgetPassword } from '../api/auth';
import { ApiError } from '../api/client';
import { PageHeader } from '../components/layout/PageHeader';
import { Alert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';
import { Field } from '../components/ui/Field';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await forgetPassword(email.trim());
      setSent(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Request failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <PageHeader
        eyebrow="Recovery"
        title="Forgot password"
        subtitle="We will email you a link to reset your password. It expires in fifteen minutes."
      />
      {sent ? (
        <Alert tone="success">
          If an account exists for that address, a reset link is on its way.
        </Alert>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md space-y-8">
          {error && <Alert>{error}</Alert>}
          <Field
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Sending…' : 'Send reset link'}
          </Button>
        </form>
      )}
      <p className="mt-8">
        <Link
          to="/login"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted hover:text-ink"
        >
          Back to sign in
        </Link>
      </p>
    </section>
  );
}
