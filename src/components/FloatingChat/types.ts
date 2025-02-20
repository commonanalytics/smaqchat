
export interface ChatTheme {
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  bubbleSize?: 'small' | 'medium' | 'large';
  glassMorphism?: boolean;
}

export interface FloatingChatProps {
  apiKey: string;
  theme?: ChatTheme;
  initialMessage?: string;
  placeholder?: string;
  className?: string;
}

export interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: number;
}
