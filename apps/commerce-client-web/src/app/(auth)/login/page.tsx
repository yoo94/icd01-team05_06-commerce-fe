import LoginForm from './components/login-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const LoginPage = async () => {
  return (
    <>
      {/* Pass the CSRF token to the LoginForm component */}
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
          className="text-primary hover:text-primary w-full border-lime-600 text-base hover:bg-lime-50/50"
          size="lg"
          asChild
        >
          <Link href="/signup">회원가입</Link>
        </Button>
      </div>
    </>
  );
};

export default LoginPage;
