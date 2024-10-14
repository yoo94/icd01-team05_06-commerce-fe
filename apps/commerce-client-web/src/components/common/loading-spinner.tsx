'use client';

import React from 'react';
import { useLoading } from './loading-context';

const LoadingSpinner = () => {
  const { isLoading } = useLoading();
  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-50">
      <div className="size-16 animate-spin rounded-full border-4 border-dashed border-white"></div>
    </div>
  );
};

export default LoadingSpinner;
