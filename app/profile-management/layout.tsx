import Navbar from '@/app/components/navbar';
import { FC, ReactNode } from 'react';

interface UserManagementLayoutProps {
  children: ReactNode;
}

const UserManagementLayout: FC<UserManagementLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col flex-1 h-screen">
      <Navbar />
      <div className="mt-20">{children}</div>
    </div>
  );
};

export default UserManagementLayout;