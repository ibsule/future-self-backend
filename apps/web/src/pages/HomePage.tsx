import { Button } from '../components/ui/Button';
import { PageHeader } from '../components/layout/PageHeader';
import { useAuth } from '../context/AuthContext';

export function HomePage() {
  const { isAuthed } = useAuth();

  return (
    <section>
      <PageHeader
        eyebrow="A letter to tomorrow"
        title="Write who you were. Read it when you've become someone else."
        subtitle="Futureself holds your words until the moment you choose and delivers them to your inbox like a note from the past."
      />
      <div className="flex flex-wrap gap-4">
        {isAuthed ? (
          <>
            <Button to="/compose">Write a letter</Button>
            <Button to="/archive" variant="outline">
              Open archive
            </Button>
          </>
        ) : (
          <>
            <Button to="/register">Begin</Button>
            <Button to="/login" variant="outline">
              Sign in
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
