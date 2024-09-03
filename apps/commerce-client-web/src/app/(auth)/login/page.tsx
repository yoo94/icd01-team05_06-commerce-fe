'use client';

import LoginForm from './components/login-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <div className="relative py-8">
        <div className="absolute top-1/2 h-px w-full bg-slate-200"></div>
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-slate-500">
          또는
        </p>
      </div>
      <div className="flex">
        <Button
          variant="outline"
          className="w-full border-lime-600 text-base text-primary hover:bg-lime-50/50 hover:text-primary"
          size="lg"
          asChild
        >
          <Link href="/join">회원가입</Link>
        </Button>
      </div>
    </>
  );
}
