import { useGlobalStore } from '@/store/globalStore';
import { getMySales, getMyCompleteSales } from '@/api/user/mySales';

export const useSales = () => {
  const { mySales, setMySales } = useGlobalStore();

  const fetchSales = async () => {
    const response = await getMySales();
    setMySales([...response.result]);
  };

  return { mySales, fetchSales };
};

export const useCompleteSales = () => {
  const { myCompleteSales, setMyCompleteSales } = useGlobalStore();

  const fetchCompleteSales = async () => {
    const response = await getMyCompleteSales();
    setMyCompleteSales([...response.result]);
  };

  return { myCompleteSales, fetchCompleteSales };
};
