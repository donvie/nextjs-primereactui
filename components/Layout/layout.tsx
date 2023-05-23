import { Inter } from 'next/font/google';
import "primereact/resources/primereact.min.css";  
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div suppressHydrationWarning={true} className={inter.className}>{children}</div>;
}
