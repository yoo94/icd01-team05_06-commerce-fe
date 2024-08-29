import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface UserInfoFormProps {
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    postalCode: string;
    address: string;
    addressDetail: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ formData, onChange }) => {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">정보입력</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block pb-2 text-xs text-slate-500">
            이름
          </label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="이름을 입력해 주세요."
            value={formData.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block pb-2 text-xs text-slate-500">
            이메일
          </label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="이메일을 입력해 주세요."
            value={formData.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block pb-2 text-xs text-slate-500">
            비밀번호
          </label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="비밀번호를 입력해 주세요."
            value={formData.password}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block pb-2 text-xs text-slate-500">
            비밀번호 확인
          </label>
          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="비밀번호를 다시 입력해 주세요."
            value={formData.confirmPassword}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode" className="block pb-2 text-xs text-slate-500">
            우편번호
          </label>
          <div className="flex">
            <Input
              type="text"
              name="postalCode"
              id="postalCode"
              placeholder="우편번호를 입력해 주세요."
              value={formData.postalCode}
              onChange={onChange}
              required
              className="grow"
            />
            <Button
              type="button"
              variant="secondary"
              className="ml-2"
              onClick={() => {
                alert('우편번호 조회');
              }}
            >
              조회
            </Button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block pb-2 text-xs text-slate-500">
            기본 주소
          </label>
          <Input
            type="text"
            name="address"
            id="address"
            placeholder="기본 주소를 입력해 주세요."
            value={formData.address}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="addressDetail" className="block pb-2 text-xs text-slate-500">
            상세 주소
          </label>
          <Input
            type="text"
            name="addressDetail"
            id="addressDetail"
            placeholder="상세 주소를 입력해 주세요."
            value={formData.addressDetail}
            onChange={onChange}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default UserInfoForm;
