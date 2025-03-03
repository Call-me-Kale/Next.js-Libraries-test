'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useSession, signIn, signOut } from 'next-auth/react';
import { z } from 'zod';
import { schema } from '@/zod/validation'; // import zdefiniowanego schematu
import { useCounterStore } from '../store/useCounterStore';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@radix-ui/react-checkbox';

export default function Home() {
  // Walidacja pro forma
  const result = schema.safeParse({ email: 'test@example.com' });
  console.log('Is email valid? ', result.success);

  // Zustand
  const { data: session } = useSession();
  const { count, increase } = useCounterStore();

  // dayjs (aktualny czas)
  const [date, setDate] = useState('');
  useEffect(() => {
    setDate(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hello from Next.js!</h1>
      <p className="mb-2">Current time (via dayjs): {date}</p>

      <div className="flex items-center gap-2 mb-4">
        <Button onClick={increase}>Count: {count}</Button>
        <Checkbox className="w-5 h-5" />
        <span>Example Radix UI checkbox</span>
      </div>

      <div className="my-4">
        {!session ? (
          <Button variant="primary" onClick={() => signIn('google')}>
            Sign in with Google
          </Button>
        ) : (
          <>
            <p>Signed in as {session.user?.email}</p>
            <Button variant="danger" onClick={() => signOut()}>
              Sign out
            </Button>
          </>
        )}
      </div>
    </main>
  );
}
