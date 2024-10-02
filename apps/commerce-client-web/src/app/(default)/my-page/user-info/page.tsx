import { getUserInfo } from '@/app/actions/auth-action';
import { UserInfo } from '@/types/auth-types';

const Page = async () => {
  const userInfo: UserInfo = await getUserInfo();

  return (
    <div className="mx-auto">
      <h1 className="mb-4">회원정보 수정</h1>
      <div>
        <p>이름: {userInfo.name}</p>
        <p>이메일: {userInfo.email}</p>
        <p>전화번호: {userInfo.phone}</p>
      </div>
    </div>
  );
};

export default Page;
