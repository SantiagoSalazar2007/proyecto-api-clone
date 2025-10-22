import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Proyecto API - Frontend',
  description: 'Frontend conectado al backend NestJS'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}

