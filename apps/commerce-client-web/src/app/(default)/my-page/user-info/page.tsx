import { authApi } from '@/lib/api';
import { ApiResponse, UserInfo } from '@/types/auth-types';

const Page = async () => {
  const response = await authApi.get('info').json<ApiResponse<UserInfo>>();

  if (!response.success) {
    throw new Error(response.error?.message);
  }

  const userInfo = response.data;

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
