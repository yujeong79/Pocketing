export interface Photocard {
  card_id: number;
  cheapest_post: {
    post_id: number | null;
    price: number | null;
    post_image_url: string | null;
    card_image_url: string | null;
    nickname: string;
    last_updated: string;
  };
}

export interface ChatbotMeta {
  user_id: number;
  total_results: number;
  in_response_to: number;
  new_chat_message_id: number;
}

export interface ChatbotResponse {
  status: string;
  code: number;
  message: string;
  result?: {
    text: string;
    photocards?: Photocard[];
    meta?: ChatbotMeta;
  };
}

export interface ChatMessage {
  text: string;
  isUser: boolean;
  image?: string;
  postId?: number;
  price?: number;
  nickname?: string;
  images?: string[];
}

export interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}
