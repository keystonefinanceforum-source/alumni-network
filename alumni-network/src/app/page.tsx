import Link from 'next/link';

export default function Home() {
  // Analytical metric points mapping to Objective 5
  const metrics = [
    { value: '40+', label: 'Active Alumni', detail: 'Spanning global hubs' },
    { value: '12', label: 'Top-Tier Universities', detail: 'Ivy League & elite local tracks' },
    { value: '5', label: 'Countries Represented', detail: 'Cross-border network presence' },
    { value: '20+', label: 'Marquee Placements', detail: 'IB, Consulting, & Quant Tech' },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between selection:bg-zinc-800 relative overflow-hidden">
      
      {/* Premium Ambient Background Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_60%,transparent_100%)] pointer-events-none opacity-70" />
      <div className="absolute top-[-10%] left-[50%] -translate-x-1/12 w-[600px] h-[300px] bg-zinc-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header Navigation bar */}
      <header className="w-full max-w-6xl mx-auto px-6 h-20 flex justify-between items-center border-b border-zinc-900/80 relative z-10">
        <div className="flex items-center gap-3">
          {/* Minimal Geometric Placeholder for Logo */}
          <div className="w-6 h-6 bg-zinc-100 rounded-sm flex items-center justify-center font-mono text-[10px] text-black font-bold">
            Σ
          </div>
          <span className="text-sm font-bold tracking-tight text-zinc-200 font-mono">
            NETWORK_
          </span>
        </div>
        <nav className="flex items-center gap-6 text-xs font-mono text-zinc-400">
          <Link href="/alumni" className="hover:text-zinc-200 transition-colors">Directory</Link>
          <Link href="/alumni/stories" className="hover:text-zinc-200 transition-colors">Stories</Link>
          <Link href="/admin/login" className="text-zinc-600 hover:text-zinc-400 transition-colors">Internal</Link>
        </nav>
      </header>

      {/* Main Hero Workspace */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-6 flex flex-col justify-center py-16 relative z-10">
        
        {/* Value Proposition Messaging Block */}
        <div className="max-w-2xl mb-20">
          <span className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 border border-zinc-800 bg-zinc-950/50 px-2.5 py-1 rounded-md mb-6">
            Ecosystem Alpha
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-100 leading-[1.05]">
            We optimize for future outcomes.
          </h1>
          <p className="text-base text-zinc-400 mt-6 leading-relaxed max-w-lg">
            A high-conviction network tracking collective placement records across hyper-competitive divisions. We scale talent through structured mentorship architecture.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4 font-mono text-xs">
            <Link 
              href="/alumni" 
              className="bg-zinc-100 hover:bg-white text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200"
            >
              Explore Directory →
            </Link>
            <Link 
              href="/alumni/stories" 
              className="bg-zinc-950 hover:bg-zinc-900 text-zinc-300 border border-zinc-800 py-3 px-6 rounded-lg transition-all duration-200"
            >
              Read Retrospectives
            </Link>
          </div>
        </div>

        {/* Dynamic Metric Grid (Objective 5 Execution) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 border-t border-zinc-900 pt-12">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="bg-zinc-950/40 border border-zinc-900 p-5 rounded-xl backdrop-blur-sm group hover:border-zinc-800 transition-all"
            >
              <div className="text-2xl sm:text-3xl font-bold text-zinc-100 font-mono tracking-tight group-hover:text-white">
                {metric.value}
              </div>
              <div className="text-xs font-semibold text-zinc-400 mt-2 font-mono uppercase tracking-wider">
                {metric.label}
              </div>
              <div className="text-[11px] text-zinc-500 mt-0.5 leading-snug">
                {metric.detail}
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Footer Meta Details */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-8 border-t border-zinc-900 text-[11px] font-mono text-zinc-600 flex flex-col sm:flex-row justify-between gap-4 relative z-10">
        <div>
          &copy; {new Date().getFullYear()} Club Network. Strictly Student-Driven.
        </div>
        <div className="flex gap-4">
          <span>LATENCY // OPTIMIZED</span>
          <span>SYSTEM // SECURE</span>
        </div>
      </footer>

    </div>
  );
}