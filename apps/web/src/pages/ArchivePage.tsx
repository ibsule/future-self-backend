import { useEffect, useState } from 'react';
import { listMessages } from '../api/messages';
import { ApiError } from '../api/client';
import { MessageCard } from '../components/messages/MessageCard';
import { PageHeader } from '../components/layout/PageHeader';
import { Alert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';
import type { ScheduledMessage } from '../types/api';

export function ArchivePage() {
  const [messages, setMessages] = useState<ScheduledMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await listMessages();
        if (!cancelled) setMessages(res.data?.messages ?? []);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'Could not load archive.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section>
      <PageHeader
        eyebrow="Archive"
        title="Letters in waiting"
        subtitle="Every message you have filed — delivered or still crossing time."
      />
      {loading && (
        <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">
          Loading…
        </p>
      )}
      {error && <Alert>{error}</Alert>}
      {!loading && !error && messages.length === 0 && (
        <div className="space-y-6">
          <p className="text-ink-muted dark:text-[#a8a4a0]">No letters yet.</p>
          <Button to="/compose">Write your first</Button>
        </div>
      )}
      <ul className="space-y-6">
        {messages.map((msg) => (
          <li key={msg.id}>
            <MessageCard message={msg} />
          </li>
        ))}
      </ul>
    </section>
  );
}
