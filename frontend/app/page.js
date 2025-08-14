'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) router.push('/dashboard')
      else router.push('/login');
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <h2 className='text-lg '>loading...</h2>
      </div>
    )
  }

  return null;
}
