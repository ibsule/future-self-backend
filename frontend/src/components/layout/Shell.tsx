import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `font-mono text-[10px] uppercase tracking-[0.2em] transition-opacity ${
    isActive ? 'opacity-100' : 'opacity-50 hover:opacity-80'
  }`;

export function Shell() {
  const { isAuthed } = useAuth();

  return (
    <div className="grain relative flex min-h-screen flex-col">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-8">
        <Link
          to={isAuthed ? '/compose' : '/'}
          className="font-serif text-xl tracking-tight"
        >
          Future Self
        </Link>
        <nav className="flex items-center gap-6" aria-label="Main">
          {isAuthed ? (
            <>
              <NavLink to="/compose" className={linkClass}>
                Write
              </NavLink>
              <NavLink to="/archive" className={linkClass}>
                Archive
              </NavLink>
              <NavLink to="/settings" className={linkClass}>
                Account
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Sign in
              </NavLink>
              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-16">
        <Outlet />
      </main>

      <footer className="mx-auto w-full max-w-3xl border-t border-rule px-6 py-6 dark:border-rule-dark">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint">
          Letters across time
        </p>
      </footer>
    </div>
  );
}
