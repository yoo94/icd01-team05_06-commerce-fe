import { useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import useTermsStore from '@/stores/useTermsStore';
import parse from 'html-react-parser';

interface TermsAgreementProps {
  isAgreedPrivacy: boolean;
  isAgreedTerms: boolean;
  onPrivacyChange: (checked: boolean) => void;
  onTermsChange: (checked: boolean) => void;
}

const TermsAgreement: React.FC<TermsAgreementProps> = ({
  isAgreedPrivacy,
  isAgreedTerms,
  onPrivacyChange,
  onTermsChange,
}) => {
  const { terms, fetchTerms } = useTermsStore();

  useEffect(() => {
    fetchTerms(); // 컴포넌트가 처음 로드될 때 약관 데이터를 가져옵니다.
  }, [fetchTerms]);

  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="mb-4 text-2xl font-bold">약관동의</h2>
      <div className="h-28 overflow-y-scroll border p-4">
        <div className="text-xs leading-5 text-slate-500">{parse(terms.privacy)} </div>
      </div>
      <div className="h-28 overflow-y-scroll border p-4">
        <div className="text-xs leading-5 text-slate-500">{parse(terms.service)} </div>
      </div>
      <div>
        <Checkbox id="privacy" checked={isAgreedPrivacy} onCheckedChange={onPrivacyChange} />
        <label htmlFor="privacy" className="ml-2 text-sm">
          (필수) 개인정보처리방침에 동의합니다.
        </label>
      </div>
      <div>
        <Checkbox id="terms" checked={isAgreedTerms} onCheckedChange={onTermsChange} />
        <label htmlFor="terms" className="ml-2 text-sm">
          (필수) 서비스 이용약관에 동의합니다.
        </label>
      </div>
    </div>
  );
};

export default TermsAgreement;
