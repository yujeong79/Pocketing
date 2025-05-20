import { create } from 'zustand';
import { MySaleListResponse, MyCompleteListResponse } from '@/types/mySale';
import { MyInfo } from '@/types/myInfo';
import { GetRegisteredCardResponse } from '@/types/exchange';
import { NotificationContent } from '@/types/notification';

interface GlobalStore {
  mySales: MySaleListResponse[];
  setMySales: (mySales: MySaleListResponse[]) => void;
  isSalesLoading: boolean;
  setIsSalesLoading: (isSalesLoading: boolean) => void;

  myCompleteSales: MyCompleteListResponse[];
  setMyCompleteSales: (myCompleteSales: MyCompleteListResponse[]) => void;
  isCompleteSalesLoading: boolean;
  setIsCompleteSalesLoading: (isCompleteSalesLoading: boolean) => void;

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

  notification: NotificationContent[];
  setNotification: (notification: NotificationContent[]) => void;
  isNotificationLoading: boolean;
  setIsNotificationLoading: (isNotificationLoading: boolean) => void;

  error: Error | null;
  setError: (error: Error | null) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  mySales: [],
  isSalesLoading: false,
  myCompleteSales: [],
  isCompleteSalesLoading: false,
  myProfile: {} as MyInfo,
  isProfileLoading: false,
  myCard: {} as GetRegisteredCardResponse,
  isMyCardLoading: false,
  myWishCard: {} as GetRegisteredCardResponse,
  isMyWishCardLoading: false,
  notification: [],
  isNotificationLoading: false,
  error: null,

  setMySales: (mySales: MySaleListResponse[]) => set({ mySales }),
  setIsSalesLoading: (isSalesLoading: boolean) => set({ isSalesLoading }),
  setMyCompleteSales: (myCompleteSales: MyCompleteListResponse[]) => set({ myCompleteSales }),
  setIsCompleteSalesLoading: (isCompleteSalesLoading: boolean) => set({ isCompleteSalesLoading }),
  setMyProfile: (myProfile: MyInfo) => set({ myProfile }),
  setIsProfileLoading: (isProfileLoading: boolean) => set({ isProfileLoading }),
  setMyCard: (myCard: GetRegisteredCardResponse) => set({ myCard }),
  setIsMyCardLoading: (isMyCardLoading: boolean) => set({ isMyCardLoading }),
  setMyWishCard: (myWishCard: GetRegisteredCardResponse) => set({ myWishCard }),
  setIsMyWishCardLoading: (isMyWishCardLoading: boolean) => set({ isMyWishCardLoading }),
  setNotification: (notification: NotificationContent[]) => set({ notification }),
  setIsNotificationLoading: (isNotificationLoading: boolean) => set({ isNotificationLoading }),
  setError: (error: Error | null) => set({ error }),
}));
