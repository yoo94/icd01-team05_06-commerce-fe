'use client';

import { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import getQueryClient from '@/configs/tanstack-query/get-query-client';
import { SessionProvider } from 'next-auth/react';
import MSWProvider from '@/provider/msw-provider';

const AppProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();

  return (
    <MSWProvider>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </MSWProvider>
  );
};

export default AppProvider;
