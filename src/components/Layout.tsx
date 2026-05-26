import { ReactNode } from 'react';
import { Navbar } from './Navbar';

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="pt-14">
    <Navbar />
    <main className="max-w-7xl mx-auto px-4 py-6">
      {children}
    </main>
  </div>
);
