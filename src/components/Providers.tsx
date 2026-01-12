'use client';

import { ReactNode } from 'react';
import { SessionProvider } from "next-auth/react";
import { ModalProvider } from '@/context/ModalContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ModalProvider>
        {children}
      </ModalProvider>
    </SessionProvider>
  );
}
