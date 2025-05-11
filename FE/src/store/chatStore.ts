import { create } from 'zustand';

interface ChatState {
  currentRoomId: string | null;
  setCurrentRoomId: (id: string | null) => void;
  isInRoom: (roomId: string) => boolean;
}

export const useChatStore = create<ChatState>((set, get) => ({
  currentRoomId: null,

  setCurrentRoomId: (id: string | null) => {
    set({ currentRoomId: id });
  },

  isInRoom: (roomId: string) => {
    return get().currentRoomId === roomId;
  },
}));
