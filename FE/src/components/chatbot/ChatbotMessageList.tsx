import React from 'react';
import { ChatMessage } from '@/types/chatbot';
import ChatbotMessageItem from './ChatbotMesageItem';

interface ChatbotMessageListProps {
  messages: ChatMessage[];
  onClose: () => void;
}

const ChatbotMessageList: React.FC<ChatbotMessageListProps> = ({ messages, onClose }) => (
  <>
    {messages.map((message, index) => (
      <ChatbotMessageItem key={index} message={message} onClose={onClose} />
    ))}
  </>
);

export default ChatbotMessageList;
