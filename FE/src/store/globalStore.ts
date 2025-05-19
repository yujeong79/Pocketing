import { create } from 'zustand';
import { MySaleListResponse } from '@/types/mySale';
import { MyInfo } from '@/types/myInfo';

interface GlobalStore {
  mySales: MySaleListResponse[];
  setMySales: (mySales: MySaleListResponse[]) => void;
  isSalesLoading: boolean;
  setIsSalesLoading: (isSalesLoading: boolean) => void;

  myProfile: MyInfo;
  setMyProfile: (myProfile: MyInfo) => void;
  isProfileLoading: boolean;
  setIsProfileLoading: (isProfileLoading: boolean) => void;

  error: Error | null;
  setError: (error: Error | null) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  mySales: [],
  isSalesLoading: false,
  isProfileLoading: false,
  error: null,
  myProfile: {} as MyInfo,

  setMySales: (mySales: MySaleListResponse[]) => set({ mySales }),
  setIsSalesLoading: (isSalesLoading: boolean) => set({ isSalesLoading }),
  setMyProfile: (myProfile: MyInfo) => set({ myProfile }),
  setIsProfileLoading: (isProfileLoading: boolean) => set({ isProfileLoading }),
  setError: (error: Error | null) => set({ error }),
}));
