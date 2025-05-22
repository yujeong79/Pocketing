import { create } from 'zustand';
import { LikedInfo } from '@/types/member';

interface LikedMembersState {
  likedInfo: LikedInfo;
  updateGroupMembers: (groupId: number, memberIds: number[]) => void;
  getSelectedMembers: (groupId: number) => number[];
  hasSelectedMembers: (groupId: number) => boolean;
  removeGroup: (groupId: number) => void;
}

export const useLikedMembersStore = create<LikedMembersState>((set, get) => ({
  likedInfo: { likedGroupList: [] },

  updateGroupMembers: (groupId: number, memberIds: number[]) => {
    set((state) => {
      const existingGroupIndex = state.likedInfo.likedGroupList.findIndex(
        (group) => group.groupId === groupId
      );

      const newLikedGroupList = [...state.likedInfo.likedGroupList];

      if (existingGroupIndex >= 0) {
        newLikedGroupList[existingGroupIndex] = {
          ...newLikedGroupList[existingGroupIndex],
          likedMemberList: memberIds,
        };
      } else {
        newLikedGroupList.push({
          groupId,
          likedMemberList: memberIds,
        });
      }

      return {
        likedInfo: {
          likedGroupList: newLikedGroupList,
        },
      };
    });
  },

  getSelectedMembers: (groupId: number) => {
    const state = get();
    const group = state.likedInfo.likedGroupList.find((g) => g.groupId === groupId);
    return group?.likedMemberList || [];
  },

  hasSelectedMembers: (groupId: number) => {
    const state = get();
    const group = state.likedInfo.likedGroupList.find((g) => g.groupId === groupId);
    return (group?.likedMemberList.length || 0) > 0;
  },

  removeGroup: (groupId: number) => {
    set((state) => ({
      likedInfo: {
        likedGroupList: state.likedInfo.likedGroupList.filter((group) => group.groupId !== groupId),
      },
    }));
  },
}));
