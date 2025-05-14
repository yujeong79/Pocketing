import { create } from 'zustand';
import { ChatMessage } from '@/types/chat';

export interface ChatState {
  roomId: number | null;
  messages: ChatMessage[];
  setMessages: (msgs: ChatMessage[]) => void;
  addMessage: (msg: ChatMessage) => void;
  clearMessages: () => void;
  page: number;
  setPage: (page: number) => void;
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  roomId: null,
  messages: [],
  setMessages: (msgs) => set({ messages: msgs }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set({ messages: [] }),
  page: 0,
  setPage: (page) => set({ page }),
  hasMore: true,
  setHasMore: (hasMore) => set({ hasMore }),
}));
