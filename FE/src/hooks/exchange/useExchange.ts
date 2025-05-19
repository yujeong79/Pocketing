import { useGlobalStore } from '@/store/globalStore';
import { getMyCard } from '@/api/exchange/exchangeCard';

export const useMyCard = () => {
  const { myCard, setMyCard } = useGlobalStore();

  const fetchMyCard = async () => {
    try {
      const response = await getMyCard();
      setMyCard(response.result);
    } catch (error) {
      throw error;
    }
  };

  return { myCard, fetchMyCard };
};
