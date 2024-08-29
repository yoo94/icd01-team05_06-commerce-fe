import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ButtonLink from '@/components/button-link';

export default function LoginPage() {
  return (
    <>
      <form method="post" action="/api/login" className="mt-4">
        <div className="mb-4">
          <Input type="email" placeholder="아이디를 입력해 주세요." name="email" required />
        </div>
        <div className="mb-4">
          <Input type="password" placeholder="비밀번호를 입력해 주세요." name="password" required />
        </div>
        <div className="mb-16 flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Checkbox name="saveId" className="border-slate-300" />
            <label htmlFor="formSaveId" className="text-sm">
              아이디 저장
            </label>
          </div>
          <div className="text-right text-sm">
            <Link href="#" className="text-slate-400 hover:underline">
              아이디 찾기
            </Link>
            <span className="mx-2 text-slate-200">|</span>
            <Link href="#" className="text-slate-400 hover:underline">
              비밀번호 찾기
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button type="submit" variant="default" size="lg" className="w-full text-base">
            로그인
          </Button>
        </div>
      </form>
      <div className="relative py-8">
        <div className="absolute top-1/2 h-px w-full bg-slate-200"></div>
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-slate-500">
          또는
        </p>
      </div>
      <div className="flex">
        <ButtonLink
          variant="outline"
          className="w-full border-lime-600 text-base text-primary hover:bg-lime-50/50 hover:text-primary"
          size="lg"
          href="/join"
        >
          회원가입
        </ButtonLink>
      </div>
    </>
  );
}
