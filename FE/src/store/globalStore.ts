import { create } from 'zustand';
import { MySaleListResponse } from '@/types/mySale';
import { MyInfo } from '@/types/myInfo';
import { GetRegisteredCardResponse } from '@/types/exchange';

interface GlobalStore {
  mySales: MySaleListResponse[];
  setMySales: (mySales: MySaleListResponse[]) => void;
  isSalesLoading: boolean;
  setIsSalesLoading: (isSalesLoading: boolean) => void;

  myProfile: MyInfo;
  setMyProfile: (myProfile: MyInfo) => void;
  isProfileLoading: boolean;
  setIsProfileLoading: (isProfileLoading: boolean) => void;

  myCard: GetRegisteredCardResponse;
  setMyCard: (myCard: GetRegisteredCardResponse) => void;
  isMyCardLoading: boolean;
  setIsMyCardLoading: (isMyCardLoading: boolean) => void;

  myWishCard: GetRegisteredCardResponse;
  setMyWishCard: (myWishCard: GetRegisteredCardResponse) => void;
  isMyWishCardLoading: boolean;
  setIsMyWishCardLoading: (isMyWishCardLoading: boolean) => void;

  error: Error | null;
  setError: (error: Error | null) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  mySales: [],
  isSalesLoading: false,
  myProfile: {} as MyInfo,
  isProfileLoading: false,
  myCard: {} as GetRegisteredCardResponse,
  isMyCardLoading: false,
  myWishCard: {} as GetRegisteredCardResponse,
  isMyWishCardLoading: false,
  error: null,

  setMySales: (mySales: MySaleListResponse[]) => set({ mySales }),
  setIsSalesLoading: (isSalesLoading: boolean) => set({ isSalesLoading }),
  setMyProfile: (myProfile: MyInfo) => set({ myProfile }),
  setIsProfileLoading: (isProfileLoading: boolean) => set({ isProfileLoading }),
  setMyCard: (myCard: GetRegisteredCardResponse) => set({ myCard }),
  setIsMyCardLoading: (isMyCardLoading: boolean) => set({ isMyCardLoading }),
  setMyWishCard: (myWishCard: GetRegisteredCardResponse) => set({ myWishCard }),
  setIsMyWishCardLoading: (isMyWishCardLoading: boolean) => set({ isMyWishCardLoading }),
  setError: (error: Error | null) => set({ error }),
}));
