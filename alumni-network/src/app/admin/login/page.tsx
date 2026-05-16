import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

      <div className="text-center z-10 max-w-xl">
        <span className="text-xs font-mono tracking-[0.3em] text-zinc-500 uppercase">
          Alumni Network Platform
        </span>
        <h1 className="text-4xl font-bold tracking-tight mt-3 text-zinc-100 sm:text-5xl">
          School Club Directory
        </h1>
        <p className="text-zinc-400 mt-4 text-sm sm:text-base max-w-md mx-auto">
          This is the public landing page. We will build the metrics grid and the alumni card carousel here.
        </p>

       <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
  {/* 🟢 CHANGE THIS: From a disabled button to a live Next.js Link pointing to your directory */}

  {/* Link directly to your admin login page */}
  <Link 
    href="/admin/login" 
    className="w-full sm:w-auto bg-zinc-100 hover:bg-white text-black font-medium text-sm py-2.5 px-6 rounded-lg transition-all text-center"
  >
    Go to Admin Login →
  </Link>
</div>
      </div>
    </div>
  );
}