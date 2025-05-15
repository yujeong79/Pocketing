import { Group } from '@/types/group';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MainPageState {
  selectedGroupId: number | null;
  setSelectedGroupId: (id: number | null) => void;
  selectedMember: number | null;
  setSelectedMember: (id: number | null) => void;
  selectedAlbumId: number | null;
  setSelectedAlbumId: (id: number | null) => void;
  selectedAllGroup: number | null;
  setSelectedAllGroup: (id: number | null) => void;
  selectedGroupData: Group | null;
  setSelectedGroupData: (data: Group | null) => void;
}

export const useMainPageStore = create<MainPageState>()(
  persist(
    (set) => ({
      selectedGroupId: null,
      setSelectedGroupId: (id) => set({ selectedGroupId: id }),
      selectedMember: null,
      setSelectedMember: (id) => set({ selectedMember: id }),
      selectedAlbumId: null,
      setSelectedAlbumId: (id) => set({ selectedAlbumId: id }),
      selectedAllGroup: null,
      setSelectedAllGroup: (id) => set({ selectedAllGroup: id }),
      selectedGroupData: null,
      setSelectedGroupData: (data) => set({ selectedGroupData: data }),
    }),
    {
      name: 'main-page-store', // localStorage key
    }
  )
);
