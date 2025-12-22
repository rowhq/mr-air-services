'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { CoolSaverModal } from '@/components/ui/CoolSaverModal';

interface ModalContextType {
  openCoolSaverModal: () => void;
  closeCoolSaverModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isCoolSaverOpen, setIsCoolSaverOpen] = useState(false);

  const openCoolSaverModal = () => setIsCoolSaverOpen(true);
  const closeCoolSaverModal = () => setIsCoolSaverOpen(false);

  return (
    <ModalContext.Provider value={{ openCoolSaverModal, closeCoolSaverModal }}>
      {children}
      <CoolSaverModal isOpen={isCoolSaverOpen} onClose={closeCoolSaverModal} />
    </ModalContext.Provider>
  );
}

export function useCoolSaverModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useCoolSaverModal must be used within a ModalProvider');
  }
  return context;
}
