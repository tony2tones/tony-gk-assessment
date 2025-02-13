'use client'

import { useAuthRedirect } from '../utils/authCheck';
import ProfileWidget from './profile-widget';

const Dashboard = () => {
  const { user, loading } = useAuthRedirect();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        No data found
      </div>
    );
  }

  return (
    <div className="container mt-9 flex flex-col items-center justify-center bg-white shadow-md">
      <div className="bg-slate-100 p-4 rounded-md shadow-cyan-600 shadow-lg">
        <ProfileWidget uid={user.uid} email={user.email} />
      </div>
    </div>
  );
}

export default Dashboard;
