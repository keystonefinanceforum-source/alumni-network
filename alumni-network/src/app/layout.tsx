import Navbar from '@/components/Navbar'; // 1. Import your new navbar component
import './globals.css';

export const metadata = {
  title: 'Club Alumni Network',
  description: 'Outcomes-focused alumni tracking ecosystem.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black antialiased">
        {/* 2. Place it right above your page content children */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}