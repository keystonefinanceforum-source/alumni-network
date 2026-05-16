'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';

interface Story {
  id: string;
  name: string;
  role: string;
  gradYear: number;
  reflection: string;
  mistake: string;
  advice: string;
}

export default function AlumniStories() {
  const router = useRouter();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Session lock: Redirect to login if user isn't authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin/login');
      } else {
        fetchStories();
      }
    });

    const fetchStories = async () => {
      try {
        const q = query(collection(db, 'stories'), orderBy('gradYear', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Story[];
        setStories(data);
      } catch (err) {
        console.error("Error fetching alumni stories:", err);
      } finally {
        setLoading(false);
      }
    };

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center font-mono text-xs uppercase tracking-widest">
        Verifying Credentials & Compiling Briefings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16 selection:bg-zinc-800">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="border-b border-zinc-900 pb-10 mb-16">
          <span className="text-xs font-mono tracking-[0.3em] text-zinc-500 uppercase block mb-2">
            Internal Briefings
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Retrospectives & Insights
          </h1>
          <p className="text-sm text-zinc-400 mt-3 max-w-xl leading-relaxed">
            Unfiltered reflections from club alumni on navigating the recruitment gauntlet, career errors, and optimization frameworks for juniors.
          </p>
        </div>

        {/* Stories Stack Container */}
        {stories.length === 0 ? (
          <div className="border border-dashed border-zinc-900 rounded-xl p-16 text-center text-sm font-mono text-zinc-500">
            No briefings published yet. Add stories through the admin panel workspace.
          </div>
        ) : (
          <div className="space-y-20">
            {stories.map((story) => (
              <article key={story.id} className="group border-l border-zinc-900 pl-6 md:pl-10 relative">
                <div className="absolute -left-[4px] top-1.5 w-[7px] h-[7px] bg-zinc-800 rounded-full group-hover:bg-zinc-500 transition-colors" />

                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    <span className="text-zinc-300 font-semibold">{story.name}</span>
                    <span>•</span>
                    <span>Class of {story.gradYear}</span>
                  </div>
                  <p className="text-sm font-medium text-zinc-400 mt-1">
                    {story.role}
                  </p>
                </div>

                <div className="space-y-6 max-w-2xl text-zinc-300 text-sm leading-relaxed">
                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">
                      01 / Club Core Takeaway
                    </h4>
                    <p>{story.reflection}</p>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">
                      02 / Calculated Errors
                    </h4>
                    <p className="text-zinc-400 italic">
                      "{story.mistake}"
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5 font-semibold">
                      03 / Strategic Advice to Juniors
                    </h4>
                    <p className="text-zinc-200 bg-zinc-950 border border-zinc-900 rounded-lg p-4 mt-2">
                      {story.advice}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}