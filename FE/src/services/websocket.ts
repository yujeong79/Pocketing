import SockJS from 'sockjs-client';
import { Client, Message, Frame } from '@stomp/stompjs';
import { ChatMessage } from '../types/chat';

class WebSocketService {
  private static instance: WebSocketService;
  private client: Client | null = null;
  private messageHandlers: ((message: ChatMessage) => void)[] = [];

  private constructor() {}

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public connect(token: string): Promise<void> {
    if (this.client && this.client.connected) {
      console.log('이미 WebSocket이 연결되어 있습니다.');
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const baseUrl =
        import.meta.env.VITE_WS_BASE_URL || import.meta.env.VITE_API_BASE_URL.replace('/api', '');
      const socket = new SockJS(`${baseUrl}/ws`);

      console.log('WebSocket 연결 시도');

      this.client = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        debug: (str) => {
          console.log('WebSocket Debug:', str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 0,
        heartbeatOutgoing: 0,
        onConnect: (frame) => {
          console.log('✅ WebSocket 연결 성공:', frame);
          this.subscribeToMessages();
          resolve();
        },
        onDisconnect: () => {
          console.log('❌ WebSocket 연결 해제');
        },
        onStompError: (error: Frame) => {
          console.error('❌ STOMP 에러:', error);
          reject(error);
        },
        onWebSocketError: (error) => {
          console.error('❌ WebSocket 에러:', error);
          reject(error);
        },
      });

      this.client.activate();
    });
  }

  private subscribeToMessages(): void {
    if (!this.client?.connected) return;

    this.client.subscribe('/user/queue/messages', (message: Message) => {
      const chatMessage: ChatMessage = JSON.parse(message.body);
      this.messageHandlers.forEach((handler) => handler(chatMessage));
    });
  }

  public sendMessage(roomId: number, content: string): void {
    if (!this.client?.connected) {
      console.error('❌ WebSocket이 연결되어 있지 않습니다.');
      return;
    }

    const payload = {
      roomId,
      messageContent: content,
    };

    this.client.publish({
      destination: '/app/chat.send',
      body: JSON.stringify(payload),
    });
  }

  public addMessageHandler(handler: (message: ChatMessage) => void): void {
    this.messageHandlers.push(handler);
  }

  public removeMessageHandler(handler: (message: ChatMessage) => void): void {
    this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
  }

  public disconnect(): void {
    if (this.client?.connected) {
      this.client.deactivate();
    }
  }

  public isConnected(): boolean {
    return !!this.client?.connected;
  }
}

export default WebSocketService;
