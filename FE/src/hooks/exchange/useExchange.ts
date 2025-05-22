import { useGlobalStore } from '@/store/globalStore';
import { getMyCard, getOthersCard } from '@/api/exchange/exchangeCard';

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

export const useOthersCard = () => {
  const { myWishCard, setMyWishCard } = useGlobalStore();

  const fetchOthersCard = async () => {
    try {
      const response = await getOthersCard();
      setMyWishCard(response.result);
    } catch (error) {
      throw error;
    }
  };

  return { myWishCard, fetchOthersCard };
};
