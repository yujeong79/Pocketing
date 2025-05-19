import { useGlobalStore } from '@/store/globalStore';
import { getMyInfo } from '@/api/user/myInfo';

export const useProfile = () => {
  const { myProfile, setMyProfile } = useGlobalStore();

  const fetchProfile = async () => {
    try {
      const response = await getMyInfo();
      setMyProfile(response.result);
    } catch (error) {
      throw error;
    }
  };

  return { myProfile, fetchProfile };
};
