'use client';

import { useState, useEffect } from 'react';
import UserInfoForm from './components/user-info-form';
import PasswordConfirmationForm from './components/password-confirm-form';
import { getUserInfo } from '@/app/actions/auth-action';
import { AuthToken } from '@/types/auth-types';
import { useUserStore } from '@/stores/use-user-store';

const Page = () => {
  const { userInfoData, setUserInfoData, setUserSession, authToken, setAuthToken } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // When the token is available, fetch the user info
  useEffect(() => {
    if (authToken) {
      const fetchUserInfo = async () => {
        setLoading(true);
        try {
          const fetchedUserInfo = await getUserInfo(); // Fetch user info using the token
          setUserSession({
            id: fetchedUserInfo.id,
            email: fetchedUserInfo.email,
            name: fetchedUserInfo.name,
          });
          setUserInfoData(fetchedUserInfo);
        } catch (error) {
          console.error('Error fetching user info:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserInfo();
    }
  }, [authToken]);

  const handlePasswordVerified = (authToken: AuthToken) => {
    setAuthToken(authToken.token);
  };

  return (
    <div className="mx-auto">
      <h1 className="mb-4">회원정보 관리</h1>

      {!authToken ? (
        <PasswordConfirmationForm onPasswordVerified={handlePasswordVerified} />
      ) : loading ? (
        <div>Loading user information...</div>
      ) : (
        userInfoData && <UserInfoForm />
      )}
    </div>
  );
};

export default Page;
