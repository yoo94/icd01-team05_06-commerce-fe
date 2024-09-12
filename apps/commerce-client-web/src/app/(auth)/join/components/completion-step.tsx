import { HandThumbUpIcon } from '@heroicons/react/24/outline';

interface CompletionStepProps {
  userName: string;
}

const CompletionStep = ({ userName }: CompletionStepProps) => {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">가입완료</h2>
      <div className="flex h-80 flex-col items-center justify-center">
        <HandThumbUpIcon className="text-primary size-28" />
        <p className="mt-6 text-lg">
          환영합니다, <span className="font-bold">{userName}</span>님!
        </p>
        <p className="text-lg">회원가입이 완료되었습니다.</p>
      </div>
    </div>
  );
};

export default CompletionStep;
