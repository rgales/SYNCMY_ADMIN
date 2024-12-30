import React, { useEffect, useState } from 'react';
import { LoginForm } from './components/auth/LoginForm';
import { Layout } from './components/layout/Layout';
import { DashboardStats } from './components/dashboard/DashboardStats';
import { UsersList } from './components/dashboard/UsersList';
import { TracksList } from './components/dashboard/TracksList';
import { supabase } from './lib/supabase';

function App() {
  const [session, setSession] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardStats />;
      case 'users':
        return <UsersList />;
      case 'tracks':
        return <TracksList />;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
}

export default App;