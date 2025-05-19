import { useGlobalStore } from '@/store/globalStore';
import { getMySales } from '@/api/user/mySales';

export const useSales = () => {
  const { mySales, setMySales } = useGlobalStore();

  const fetchSales = async () => {
    const response = await getMySales();
    setMySales([...response.result]);
  };

  return { mySales, fetchSales };
};
