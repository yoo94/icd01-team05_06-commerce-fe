import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@/components/ui/button';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 z-50 bg-black/50" />
      <div className="fixed left-1/2 top-1/2 z-50 w-2/4 -translate-x-1/2 -translate-y-1/2 bg-white p-8">
        <Button onClick={onClose}>닫기</Button>
        {children}
      </div>
    </>,
    document.getElementById('global-modal') as HTMLElement,
  );
};

export default Modal;
