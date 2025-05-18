import { useGlobalStore } from '@/store/globalStore';
import { getMySales } from '@/api/user/mySales';

export const useSales = () => {
  const { mySales, setMySales } = useGlobalStore();

  const fetchSales = async () => {
    try {
      const response = await getMySales();
      setMySales(response.result);
    } catch (error) {
      throw error;
    }
  };

  return { mySales, fetchSales };
};
