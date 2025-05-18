import { create } from 'zustand';
import { MySaleListResponse } from '@/types/mySale';

interface GlobalStore {
  mySales: MySaleListResponse[];
  setMySales: (mySales: MySaleListResponse[]) => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: Error | null;
  setError: (error: Error | null) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  mySales: [],
  isLoading: false,
  error: null,

  setMySales: (mySales: MySaleListResponse[]) => set({ mySales }),

  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: Error | null) => set({ error }),
}));
