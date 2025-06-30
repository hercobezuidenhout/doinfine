'use client';

import { FC, useEffect } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

export const RefreshOnLogin: FC = () => {
  const { session } = useSessionContext();
  const { refresh } = useRouter();

  useEffect(() => {
    if (session) refresh();
  }, [refresh, session]);

  return null;
};
