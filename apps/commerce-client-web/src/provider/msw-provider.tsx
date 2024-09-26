'use client';

import React, { useEffect } from 'react';

interface MSWProviderProps {
  children: React.ReactNode;
}

const MSWProvider = ({ children }: MSWProviderProps) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      (async () => {
        const { initMsw } = await import('@/mocks');
        await initMsw();
      })();
    }
  }, []);

  return <>{children}</>;
};

export default MSWProvider;
