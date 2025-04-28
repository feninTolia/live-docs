'use client';
import Loader from '@/components/Loader';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from '@liveblocks/react/suspense';
import { ReactNode } from 'react';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: '#3371FF', fontSize: '16px' },
      }}
    >
      <LiveblocksProvider authEndpoint={'/api/liveblocks-auth'}>
        <ClientSideSuspense fallback={<Loader />}>
          {children}
        </ClientSideSuspense>
      </LiveblocksProvider>
    </ClerkProvider>
  );
};

export default Providers;
