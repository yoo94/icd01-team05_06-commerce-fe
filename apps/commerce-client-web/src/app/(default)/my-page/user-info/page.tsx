import UserInfoForm from './components/user-info-form';

const Page = async () => {
  return (
    <div className="mx-auto">
      <h1 className="mb-4">회원정보 수정</h1>
      {/* 클라이언트 컴포넌트인 Form */}
      <UserInfoForm />
    </div>
  );
};

export default Page;
