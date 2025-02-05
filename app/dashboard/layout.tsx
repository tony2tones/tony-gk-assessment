import Navbar from '@/app/components/nav-bar';
import { FC, ReactNode } from 'react';
import '@/app/globals.css';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col flex-1 h-screen">
      <Navbar />
      <div className="mt-20">{children}</div>
    </div>
  );
};

export default DashboardLayout;