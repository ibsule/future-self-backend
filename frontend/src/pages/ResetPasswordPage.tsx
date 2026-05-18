import { useEffect, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../api/auth';
import { ApiError } from '../api/client';
import { PageHeader } from '../components/layout/PageHeader';
import { Alert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';
import { Field } from '../components/ui/Field';

export function ResetPasswordPage() {
  const [params] = useSearchParams();
  const tokenFromUrl = params.get('token') ?? '';
  const emailFromUrl = params.get('email') ?? '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const hasParams = Boolean(tokenFromUrl && emailFromUrl);

  useEffect(() => {
    if (!hasParams) {
      setError('This reset link is invalid or incomplete.');
    }
  }, [hasParams]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword({
        email: emailFromUrl,
        new_password: password,
        reset_password_token: tokenFromUrl,
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Reset failed.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <section>
        <PageHeader
          eyebrow="Complete"
          title="Password updated"
          subtitle="Your Future Self account is ready. You may sign in with your new password."
        />
        <Alert tone="success">
          Password reset successful. You can close this page and sign in.
        </Alert>
        <p className="mt-8">
          <Button to="/login">Sign in</Button>
        </p>
      </section>
    );
  }

  return (
    <section>
      <PageHeader
        eyebrow="Recovery"
        title="Set a new password"
        subtitle="Choose something you will remember when the letter finally arrives."
      />
      {!hasParams ? (
        <div className="space-y-6">
          <Alert>{error ?? 'Invalid reset link.'}</Alert>
          <Link
            to="/forgot-password"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted hover:text-ink"
          >
            Request a new link
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md space-y-8">
          {error && <Alert>{error}</Alert>}
          <Field label="Email" type="email" value={emailFromUrl} readOnly />
          <Field
            label="New password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Field
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving…' : 'Update password'}
          </Button>
        </form>
      )}
    </section>
  );
}
