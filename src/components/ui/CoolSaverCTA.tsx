'use client';

import { Button } from './Button';
import { useCoolSaverModal } from '@/context/ModalContext';

interface CoolSaverCTAProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-inverse';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function CoolSaverCTA({
  variant = 'secondary',
  size = 'lg',
  fullWidth = false,
  className = '',
  children = 'Check If You Qualify',
}: CoolSaverCTAProps) {
  const { openCoolSaverModal } = useCoolSaverModal();

  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onClick={openCoolSaverModal}
      className={className}
    >
      {children}
    </Button>
  );
}
