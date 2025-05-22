import { useEffect, useRef } from 'react';
import WebSocketService from '@/services/websocket';
import { ChatMessage } from '@/types/chat';

interface UseChatSocketProps {
  roomId: string | undefined;
  token: string | undefined;
  onMessage: (msg: ChatMessage) => void;
}

export function useChatSocket({ roomId, token, onMessage }: UseChatSocketProps) {
  const webSocketService = useRef(WebSocketService.getInstance());

  useEffect(() => {
    if (!roomId || !token) return;
    webSocketService.current.connect(token);
    const ws = webSocketService.current;
    return () => {
      ws.disconnect();
    };
  }, [roomId, token]);

  useEffect(() => {
    if (!onMessage) return;
    webSocketService.current.addMessageHandler(onMessage);
    const ws = webSocketService.current;
    return () => {
      ws.removeMessageHandler(onMessage);
    };
  }, [onMessage]);

  const sendMessage = (content: string) => {
    if (!roomId) return;
    webSocketService.current.sendMessage(Number(roomId), content);
  };

  return { sendMessage, isConnected: webSocketService.current.isConnected() };
}
