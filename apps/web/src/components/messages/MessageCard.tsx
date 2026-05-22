import type { ScheduledMessage } from '../../types/api';
import { formatDeliveryDate } from '../../lib/dates';

type Props = {
  message: ScheduledMessage;
};

export function MessageCard({ message }: Props) {
  return (
    <article className="border border-rule p-5 transition-colors dark:border-rule-dark">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
          {message.sent ? 'Delivered' : 'Awaiting'}
        </span>
        <time
          className="font-mono text-[10px] text-ink-muted"
          dateTime={message.send_at}
        >
          {formatDeliveryDate(message.send_at)}
        </time>
      </div>
      <h2 className="mb-2 font-serif text-2xl">{message.title}</h2>
      <p className="line-clamp-4 whitespace-pre-wrap text-base leading-relaxed text-ink-muted dark:text-[#a8a4a0]">
        {message.content}
      </p>
    </article>
  );
}
