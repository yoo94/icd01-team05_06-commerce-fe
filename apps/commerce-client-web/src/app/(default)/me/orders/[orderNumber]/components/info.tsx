import React from 'react';
import { cn } from '@/lib/utils';

interface InfoWrapperProps {
  title: string;
  children?: React.ReactNode;
}

export const Info = ({ title, children }: InfoWrapperProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm">{title}</div>
      {children && <div className="flex flex-col gap-2">{children}</div>}
    </div>
  );
};

interface InfoTableProps {
  children: React.ReactNode;
}

export const InfoTable = ({ children }: InfoTableProps) => {
  return <div className="flex flex-col border border-gray-200">{children}</div>;
};

interface InfoRowProps {
  title: React.ReactNode;
  content: React.ReactNode;
  borderTop?: boolean;
}

export const InfoRow = ({ title, content, borderTop }: InfoRowProps) => {
  return (
    <div className={cn('flex text-xs', borderTop && 'border-t border-gray-200')}>
      <div className="flex-1 bg-gray-100 px-2 py-1">{title}</div>
      <div className="flex-[3] px-2 py-1">{content}</div>
    </div>
  );
};
