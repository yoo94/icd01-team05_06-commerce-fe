import { getUserInfo } from '@/app/actions/auth-action';
import UserInfoForm from './components/user-info-form';

const Page = async () => {
  try {
    const userInfo = await getUserInfo(); // Fetch user data on the server side

    return (
      <div className="mx-auto">
        <h1 className="mb-4">회원정보 수정</h1>
        {/* Pass the fetched user info as a prop to the client-side form */}
        <UserInfoForm userInfo={userInfo} />
      </div>
    );
  } catch (error) {
    console.error('Error during fetching user info:', error);
    return <div>회원정보를 불러오는 중 오류가 발생했습니다.</div>;
  }
};

export default Page;
