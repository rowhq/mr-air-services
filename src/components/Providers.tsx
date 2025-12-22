'use client';

import { ReactNode } from 'react';
import { ModalProvider } from '@/context/ModalContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ModalProvider>
      {children}
    </ModalProvider>
  );
}
