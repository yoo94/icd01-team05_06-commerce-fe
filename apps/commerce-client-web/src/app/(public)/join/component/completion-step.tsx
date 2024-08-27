import { HandThumbUpIcon } from '@heroicons/react/24/outline';

interface CompletionStepProps {
  userName: string;
}

const CompletionStep: React.FC<CompletionStepProps> = ({ userName }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">가입완료</h2>
      <div className="flex flex-col items-center justify-center h-80">
        <HandThumbUpIcon className="w-28 h-28 text-primary" />
        <p className="text-lg mt-6">
          환영합니다, <span className="font-bold">{userName}</span>님!
        </p>
        <p className="text-lg">회원가입이 완료되었습니다.</p>
      </div>
    </div>
  );
};

export default CompletionStep;
