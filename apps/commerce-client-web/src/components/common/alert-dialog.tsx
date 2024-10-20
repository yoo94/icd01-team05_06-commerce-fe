import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';

interface AlertDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
  thirdButtonName?: string;
  onThirdAction?: () => void;
}

const AlertDialogComponent = ({
  title,
  description,
  onConfirm,
  onCancel,
  thirdButtonName,
  onThirdAction,
}: AlertDialogProps) => {
  return (
    <AlertDialog open onOpenChange={(open) => !open && onCancel?.()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {onCancel && <AlertDialogCancel onClick={onCancel}>취소</AlertDialogCancel>}
          <AlertDialogAction onClick={onConfirm} className="self-end bg-slate-500">
            확인
          </AlertDialogAction>
          {thirdButtonName && (
            <AlertDialogAction onClick={onThirdAction}>{thirdButtonName}</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogComponent;
