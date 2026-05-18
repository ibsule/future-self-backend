import { useState, type FormEvent } from 'react';
import { createMessage } from '../api/messages';
import { ApiError } from '../api/client';
import {
  SchedulePicker,
  type ScheduleMode,
} from '../components/compose/SchedulePicker';
import { PageHeader } from '../components/layout/PageHeader';
import { Alert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';
import { TextArea } from '../components/ui/TextArea';
import { Field } from '../components/ui/Field';
import { toIsoFromDatetimeLocal } from '../lib/dates';
import {
  CONTENT_MAX_WORDS,
  TITLE_MAX_WORDS,
  wordLimitError,
} from '../lib/words';

export function ComposePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mode, setMode] = useState<ScheduleMode>('relative');
  const [sendAfter, setSendAfter] = useState('1d');
  const [sendAtLocal, setSendAtLocal] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [scheduled, setScheduled] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const titleErr = wordLimitError(title, TITLE_MAX_WORDS, 'Title');
    const contentErr = wordLimitError(content, CONTENT_MAX_WORDS, 'Message');
    if (titleErr || contentErr) {
      setError(titleErr ?? contentErr);
      return;
    }

    if (mode === 'absolute' && !sendAtLocal) {
      setError('Choose a delivery date and time.');
      return;
    }

    if (mode === 'relative' && !sendAfter.trim()) {
      setError('Choose when to deliver this letter.');
      return;
    }

    setLoading(true);
    try {
      const payload =
        mode === 'relative'
          ? { title: title.trim(), content: content.trim(), send_after: sendAfter.trim() }
          : {
              title: title.trim(),
              content: content.trim(),
              send_at: toIsoFromDatetimeLocal(sendAtLocal),
            };

      await createMessage(payload);
      setScheduled(true);
      setTitle('');
      setContent('');
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not schedule letter.');
    } finally {
      setLoading(false);
    }
  }

  if (scheduled) {
    return (
      <section>
        <PageHeader
          eyebrow="Filed away"
          title="Your letter is scheduled"
          subtitle="It will reach your inbox when the moment you chose arrives. Until then, it waits in the archive."
        />
        <Alert tone="success">Message scheduled successfully.</Alert>
        <p className="mt-8">
          <Button type="button" onClick={() => setScheduled(false)}>
            Write another
          </Button>
        </p>
      </section>
    );
  }

  return (
    <section>
      <PageHeader
        eyebrow="Compose"
        title="A letter to your future self"
        subtitle="Plain words. No ornament. Set the hour, seal it, and let time carry it forward."
      />
      <form onSubmit={handleSubmit} className="space-y-10">
        {error && <Alert>{error}</Alert>}
        <Field
          label="Title"
          required
          value={title}
          hint={`Up to ${TITLE_MAX_WORDS} words`}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          label="Message"
          required
          value={content}
          maxWords={CONTENT_MAX_WORDS}
          onChange={(e) => setContent(e.target.value)}
        />
        <SchedulePicker
          mode={mode}
          onModeChange={setMode}
          sendAfter={sendAfter}
          onSendAfterChange={setSendAfter}
          sendAtLocal={sendAtLocal}
          onSendAtLocalChange={setSendAtLocal}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Scheduling…' : 'Schedule delivery'}
        </Button>
      </form>
    </section>
  );
}
