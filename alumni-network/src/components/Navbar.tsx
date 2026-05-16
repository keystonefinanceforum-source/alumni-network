'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // Sync auth state to show/hide internal directory links dynamically
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  return (
    <nav className="w-full bg-black/80 backdrop-blur-md border-b border-zinc-900 sticky top-0 z-50 h-16 px-6 flex items-center justify-between selection:bg-zinc-800">
      <div className="max-w-6xl w-full mx-auto flex justify-between items-center">
        
        {/* Brand Logo/Marker */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-5 h-5 bg-zinc-100 rounded-sm flex items-center justify-center font-mono text-[10px] text-black font-bold group-hover:bg-white transition-colors">
            Σ
          </div>
          <span className="text-xs font-bold tracking-widest text-zinc-200 font-mono">
            Ecosystem_
          </span>
        </Link>

        {/* Dynamic Route Links */}
        <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-wider">
          <Link 
            href="/" 
            className={`transition-colors ${pathname === '/' ? 'text-zinc-100 font-semibold' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Home
          </Link>

          {/* Only emphasize directory routes if user is authenticated */}
          {user && (
            <>
              <Link 
                href="/alumni" 
                className={`transition-colors ${pathname === '/alumni' ? 'text-zinc-100 font-semibold' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Directory
              </Link>
              <Link 
                href="/alumni/stories" 
                className={`transition-colors ${pathname === '/alumni/stories' ? 'text-zinc-100 font-semibold' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Stories
              </Link>
              <Link 
                href="/admin" 
                className={`transition-colors ${pathname === '/admin' ? 'text-zinc-100 font-semibold' : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900/50 px-2 py-1 rounded border border-zinc-800/60'}`}
              >
                Control
              </Link>
            </>
          )}

          {/* Auth Trigger Display */}
          {user ? (
            <button 
              onClick={handleLogout} 
              className="text-red-500/70 hover:text-red-400 transition-colors cursor-pointer ml-2"
            >
              [Sign Out]
            </button>
          ) : (
            <Link 
              href="/admin/login" 
              className={`transition-colors ${pathname === '/admin/login' ? 'text-zinc-100 font-semibold' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              Login
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}