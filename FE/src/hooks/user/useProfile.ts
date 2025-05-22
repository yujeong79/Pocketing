import { useGlobalStore } from '@/store/globalStore';
import { getMyInfo } from '@/api/user/myInfo';

export const useProfile = () => {
  const { myProfile, setMyProfile } = useGlobalStore();

  const fetchProfile = async () => {
    const response = await getMyInfo();
    setMyProfile(response.result);
  };

  return { myProfile, fetchProfile };
};
