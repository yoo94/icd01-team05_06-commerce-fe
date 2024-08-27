import { Checkbox } from '@/components/ui/checkbox';

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
  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="text-2xl font-bold mb-4">약관동의</h2>
      <div className="h-28 overflow-y-scroll border p-4">
        <p>여기에 개인정보처리방침의 내용이 들어갑니다...</p>
      </div>
      <div className="h-28 overflow-y-scroll border p-4">
        <p>여기에 서비스 이용약관의 내용이 들어갑니다...</p>
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
