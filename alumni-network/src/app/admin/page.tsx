'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, query, orderBy, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';

interface Alumnus {
  id?: string;
  name: string;
  gradYear: number;
  division: string;
  currentOrg: string;
  linkedinUrl: string;
  category: 'finance' | 'consulting' | 'tech' | 'higher-ed' | 'other';
}

interface Story {
  id?: string;
  name: string;
  role: string;
  gradYear: number;
  reflection: string;
  mistake: string;
  advice: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'directory' | 'stories'>('directory');
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Trackers for current item edits
  const [editingAlumniId, setEditingAlumniId] = useState<string | null>(null);
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);

  const [alumniList, setAlumniList] = useState<Alumnus[]>([]);
  const [storiesList, setStoriesList] = useState<Story[]>([]);

  // Directory Input Fields States
  const [name, setName] = useState('');
  const [gradYear, setGradYear] = useState(new Date().getFullYear());
  const [division, setDivision] = useState('');
  const [currentOrg, setCurrentOrg] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [category, setCategory] = useState<Alumnus['category']>('finance');

  // Stories Input Fields States
  const [storyName, setStoryName] = useState('');
  const [storyRole, setStoryRole] = useState('');
  const [storyGradYear, setStoryGradYear] = useState(new Date().getFullYear());
  const [reflection, setReflection] = useState('');
  const [mistake, setMistake] = useState('');
  const [advice, setAdvice] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin/login');
      } else {
        setLoading(false);
        fetchAlumni();
        fetchStories();
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchAlumni = async () => {
    try {
      const q = query(collection(db, 'alumni'), orderBy('gradYear', 'desc'));
      const querySnapshot = await getDocs(q);
      setAlumniList(querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })) as Alumnus[]);
    } catch (err) { console.error(err); }
  };

  const fetchStories = async () => {
    try {
      const q = query(collection(db, 'stories'), orderBy('gradYear', 'desc'));
      const querySnapshot = await getDocs(q);
      setStoriesList(querySnapshot.docs.map(d => ({ id: d.id, ...d.data() })) as Story[]);
    } catch (err) { console.error(err); }
  };

  const handleSaveAlumni = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const payload: Omit<Alumnus, 'id'> = { name, gradYear: Number(gradYear), division, currentOrg, linkedinUrl, category };
      
      if (editingAlumniId) {
        await updateDoc(doc(db, 'alumni', editingAlumniId), payload);
        setMessage({ text: 'Profile modifications successfully pushed to ledger.', type: 'success' });
        setEditingAlumniId(null);
      } else {
        await addDoc(collection(db, 'alumni'), payload);
        setMessage({ text: 'New profile written to live environment.', type: 'success' });
      }
      setName(''); setDivision(''); setCurrentOrg(''); setLinkedinUrl('');
      fetchAlumni();
    } catch (err) {
      setMessage({ text: 'Error executing database transaction.', type: 'error' });
    } finally { setSubmitting(false); }
  };

  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const payload: Omit<Story, 'id'> = { name: storyName, role: storyRole, gradYear: Number(storyGradYear), reflection, mistake, advice };
      
      if (editingStoryId) {
        await updateDoc(doc(db, 'stories', editingStoryId), payload);
        setMessage({ text: 'Briefing entry successfully edited.', type: 'success' });
        setEditingStoryId(null);
      } else {
        await addDoc(collection(db, 'stories'), payload);
        setMessage({ text: 'New brief live-published successfully.', type: 'success' });
      }
      setStoryName(''); setStoryRole(''); setReflection(''); setMistake(''); setAdvice('');
      fetchStories();
    } catch (err) {
      setMessage({ text: 'Error executing story transaction.', type: 'error' });
    } finally { setSubmitting(false); }
  };

  const handleDeleteAlumnus = async (id: string) => {
    if (!confirm("Permanently wipe profile from registry?")) return;
    try {
      await deleteDoc(doc(db, 'alumni', id));
      setMessage({ text: 'Profile removed.', type: 'success' });
      fetchAlumni();
    } catch (err) { console.error(err); }
  };

  const handleDeleteStory = async (id: string) => {
    if (!confirm("Permanently wipe this retrospective?")) return;
    try {
      await deleteDoc(doc(db, 'stories', id));
      setMessage({ text: 'Briefing removed.', type: 'success' });
      fetchStories();
    } catch (err) { console.error(err); }
  };

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex justify-center items-center font-mono text-xs uppercase tracking-widest">Verifying Session Credentials...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center border-b border-zinc-900 pb-6 mb-8">
          <div>
            <span className="text-xs font-mono tracking-[0.2em] text-zinc-500 uppercase">Control Panel</span>
            <h1 className="text-xl font-bold tracking-tight text-zinc-200 mt-1">Network Administration</h1>
          </div>
          <button onClick={() => signOut(auth)} className="text-xs font-mono bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-zinc-900">Sign Out</button>
        </div>

        <div className="flex gap-4 border-b border-zinc-900 pb-4 mb-8 font-mono text-xs">
          <button onClick={() => { setActiveTab('directory'); setMessage({ text: '', type: '' }); }} className={`pb-2 relative cursor-pointer ${activeTab === 'directory' ? 'text-zinc-100 font-bold' : 'text-zinc-600'}`}>
            [1] Directory Editor {activeTab === 'directory' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-400" />}
          </button>
          <button onClick={() => { setActiveTab('stories'); setMessage({ text: '', type: '' }); }} className={`pb-2 relative cursor-pointer ${activeTab === 'stories' ? 'text-zinc-100 font-bold' : 'text-zinc-600'}`}>
            [2] Retrospectives Hub {activeTab === 'stories' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-400" />}
          </button>
        </div>

        {message.text && (
          <div className={`p-3 border rounded-lg text-xs font-mono mb-8 max-w-xl ${message.type === 'success' ? 'bg-emerald-950/20 border-emerald-900/50 text-emerald-400' : 'bg-red-950/20 border-red-900/50 text-red-400'}`}>{message.text}</div>
        )}

        {activeTab === 'directory' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6">
              <h2 className="text-xs font-semibold tracking-wide uppercase text-zinc-400 mb-6 font-mono">{editingAlumniId ? 'Modify Record' : 'Publish Profile'}</h2>
              <form onSubmit={handleSaveAlumni} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Full Name</label>
                  <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Rahul Menon" className="w-full bg-black border border-zinc-900 focus:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Grad Year</label>
                    <input required type="number" value={gradYear} onChange={e => setGradYear(Number(e.target.value))} className="w-full bg-black border border-zinc-900 focus:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Sector Track</label>
                    <select value={category} onChange={e => setCategory(e.target.value as Alumnus['category'])} className="w-full bg-black border border-zinc-900 focus:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none">
                      <option value="finance">Finance</option>
                      <option value="consulting">Consulting</option>
                      <option value="tech">Technology</option>
                      <option value="higher-ed">Higher Ed</option>
                      <option value="other">Other Sector</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Club Division</label>
                  <input required type="text" value={division} onChange={e => setDivision(e.target.value)} placeholder="M&A Division" className="w-full bg-black border border-zinc-900 focus:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Placement Destination</label>
                  <input required type="text" value={currentOrg} onChange={e => setCurrentOrg(e.target.value)} placeholder="Goldman Sachs" className="w-full bg-black border border-zinc-900 focus:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">LinkedIn URL</label>
                  <input required type="url" value={linkedinUrl} onChange={e => setLinkedinUrl(e.target.value)} placeholder="https://linkedin.com/in/..." className="w-full bg-black border border-zinc-900 focus:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none" />
                </div>
                <button type="submit" disabled={submitting} className="w-full bg-zinc-100 hover:bg-white text-black font-medium text-sm py-2 px-4 rounded-lg transition-colors cursor-pointer disabled:bg-zinc-800 disabled:text-zinc-500">
                  {submitting ? 'Writing...' : editingAlumniId ? 'Update Profile' : 'Publish Profile'}
                </button>
                {editingAlumniId && (
                  <button type="button" onClick={() => { setEditingAlumniId(null); setName(''); setDivision(''); setCurrentOrg(''); setLinkedinUrl(''); }} className="w-full bg-zinc-900 text-zinc-400 text-xs py-1.5 mt-2 rounded hover:bg-zinc-850">
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-xs font-semibold tracking-wide uppercase text-zinc-500 mb-6 font-mono">Live Repository Inventory ({alumniList.length})</h2>
              {alumniList.length === 0 ? (
                <div className="border border-dashed border-zinc-900 rounded-xl p-12 text-center text-xs font-mono text-zinc-600">No active data rows found.</div>
              ) : (
                <div className="border border-zinc-900 rounded-xl divide-y divide-zinc-900 overflow-hidden bg-zinc-950">
                  {alumniList.map((alumni) => (
                    <div key={alumni.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm hover:bg-zinc-900/40 transition-colors">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-zinc-200">{alumni.name}</h3>
                          <span className="text-[9px] font-mono uppercase border border-zinc-850 text-zinc-500 bg-black px-1.5 py-0.2 rounded">{alumni.category}</span>
                        </div>
                        <p className="text-xs text-zinc-500 mt-0.5">{alumni.division} • Class of {alumni.gradYear}</p>
                        <p className="text-xs text-zinc-400 mt-1 italic font-mono">{alumni.currentOrg}</p>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-[11px] self-end sm:self-auto">
                        <button onClick={() => { setName(alumni.name); setGradYear(alumni.gradYear); setDivision(alumni.division); setCurrentOrg(alumni.currentOrg); setLinkedinUrl(alumni.linkedinUrl); setCategory(alumni.category); setEditingAlumniId(alumni.id || null); }} className="px-2.5 py-1 text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800 rounded transition-colors cursor-pointer">Edit</button>
                        <button onClick={() => alumni.id && handleDeleteAlumnus(alumni.id)} className="px-2.5 py-1 text-red-500/70 hover:text-red-400 bg-red-950/10 border border-red-900/30 rounded transition-colors cursor-pointer">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6">
              <h2 className="text-xs font-semibold tracking-wide uppercase text-zinc-400 mb-6 font-mono">{editingStoryId ? 'Modify Briefing' : 'Publish Briefing'}</h2>
              <form onSubmit={handleSaveStory} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Author Name</label>
                  <input required type="text" value={storyName} onChange={e => setStoryName(e.target.value)} placeholder="Rahul Menon" className="w-full bg-black border border-zinc-900 focus:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Grad Year</label>
                    <input required type="number" value={storyGradYear} onChange={e => setStoryGradYear(Number(e.target.value))} className="w-full bg-black border border-zinc-900 focus:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Headline Context</label>
                    <input required type="text" value={storyRole} onChange={e => setStoryRole(e.target.value)} placeholder="Analyst at McKinsey" className="w-full bg-black border border-zinc-900 focus:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">01 / Club Core Takeaway</label>
                  <textarea required value={reflection} onChange={e => setReflection(e.target.value)} rows={3} placeholder="What they learned..." className="w-full bg-black border border-zinc-900 focus:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none resize-none" />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">02 / Calculated Errors</label>
                  <textarea required value={mistake} onChange={e => setMistake(e.target.value)} rows={3} placeholder="My biggest recruitment error was..." className="w-full bg-black border border-zinc-900 focus:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none resize-none" />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">03 / Strategic Advice</label>
                  <textarea required value={advice} onChange={e => setAdvice(e.target.value)} rows={3} placeholder="What juniors should focus on..." className="w-full bg-black border border-zinc-900 focus:border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none resize-none" />
                </div>
                <button type="submit" disabled={submitting} className="w-full bg-zinc-100 hover:bg-white text-black font-medium text-sm py-2 px-4 rounded-lg transition-colors cursor-pointer disabled:bg-zinc-800 disabled:text-zinc-500">
                  {submitting ? 'Writing...' : editingStoryId ? 'Update Briefing' : 'Publish Briefing'}
                </button>
                {editingStoryId && (
                  <button type="button" onClick={() => { setEditingStoryId(null); setStoryName(''); setStoryRole(''); setReflection(''); setMistake(''); setAdvice(''); }} className="w-full bg-zinc-900 text-zinc-400 text-xs py-1.5 mt-2 rounded hover:bg-zinc-850">Cancel Edit</button>
                )}
              </form>
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-xs font-semibold tracking-wide uppercase text-zinc-500 mb-6 font-mono">Live Briefing Inventory ({storiesList.length})</h2>
              {storiesList.length === 0 ? (
                <div className="border border-dashed border-zinc-900 rounded-xl p-12 text-center text-xs font-mono text-zinc-600">No active data rows found.</div>
              ) : (
                <div className="border border-zinc-900 rounded-xl divide-y divide-zinc-900 overflow-hidden bg-zinc-950">
                  {storiesList.map((story) => (
                    <div key={story.id} className="p-4 flex justify-between items-center text-sm hover:bg-zinc-900/40 transition-colors">
                      <div>
                        <h3 className="font-semibold text-zinc-200">{story.name}</h3>
                        <p className="text-xs text-zinc-500 mt-0.5">{story.role} • Class of {story.gradYear}</p>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <button onClick={() => { setStoryName(story.name); setStoryRole(story.role); setStoryGradYear(story.gradYear); setReflection(story.reflection); setMistake(story.mistake); setAdvice(story.advice); setEditingStoryId(story.id || null); }} className="px-2.5 py-1 text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800 rounded transition-colors cursor-pointer">Edit</button>
                        <button onClick={() => story.id && handleDeleteStory(story.id)} className="px-2.5 py-1 text-red-500/70 hover:text-red-400 bg-red-950/10 border border-red-900/30 rounded transition-colors cursor-pointer">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}