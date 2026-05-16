'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';

interface Alumnus {
  id: string;
  name: string;
  gradYear: number;
  division: string;
  currentOrg: string;
  linkedinUrl: string;
  category: 'finance' | 'consulting' | 'tech' | 'higher-ed' | 'other';
}

export default function AlumniDirectory() {
  const router = useRouter();
  const [alumni, setAlumni] = useState<Alumnus[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    // Session lock: Redirect to login if user isn't authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin/login');
      } else {
        getAlumniData();
      }
    });

    const getAlumniData = async () => {
      try {
        const q = query(collection(db, 'alumni'), orderBy('gradYear', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Alumnus[];
        setAlumni(data);
      } catch (err) {
        console.error("Error fetching directory data:", err);
      } finally {
        setLoading(false);
      }
    };

    return () => unsubscribe();
  }, [router]);

  // Client-side filtering logic
  const filteredAlumni = activeFilter === 'all' 
    ? alumni 
    : alumni.filter(a => a.category === activeFilter);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center font-mono text-xs uppercase tracking-widest">
        Syncing Secure Network Database...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16 selection:bg-zinc-800">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Page Header Area */}
        <div className="max-w-xl mb-12">
          <span className="text-xs font-mono tracking-[0.3em] text-zinc-500 uppercase block mb-2">
            Verified Cohorts
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Alumni Ecosystem
          </h1>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
            A secure, internal database tracking placement records across hyper-competitive divisions.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-6 mb-10 font-mono text-xs">
          {['all', 'finance', 'consulting', 'tech', 'higher-ed'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg border uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeFilter === filter
                  ? 'bg-zinc-100 border-white text-black font-semibold'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              {filter.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Main Grid View */}
        {filteredAlumni.length === 0 ? (
          <div className="border border-dashed border-zinc-800 rounded-xl p-16 text-center text-sm font-mono text-zinc-500">
            No profiles match the selected track parameters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAlumni.map((person) => (
              <div 
                key={person.id}
                className="bg-zinc-900/20 border border-zinc-800/80 rounded-xl p-6 hover:border-zinc-700 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 bg-zinc-950 px-2 py-0.5 border border-zinc-800 rounded">
                      Class of {person.gradYear}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      {person.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-zinc-100 tracking-tight group-hover:text-white">
                    {person.name}
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono mt-0.5">
                    {person.division}
                  </p>

                  <div className="mt-6 pt-4 border-t border-zinc-800/60">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                      Current Placement
                    </span>
                    <p className="text-sm font-medium text-zinc-200 mt-1">
                      {person.currentOrg}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-800/40 flex items-center justify-between gap-3 font-mono text-xs">
                  <a 
                    href={person.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    LinkedIn ↗
                  </a>
                  
                  <a 
                    href="https://forms.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-zinc-900 text-zinc-300 border border-zinc-800/80 hover:bg-zinc-800 hover:text-zinc-200 px-3 py-1.5 rounded transition-all"
                  >
                    Request Mentorship
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}