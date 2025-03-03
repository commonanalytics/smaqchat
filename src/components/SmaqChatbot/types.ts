export interface ChatTheme {
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  bubbleSize?: 'small' | 'medium' | 'large';
  windowSize?: 'small' | 'medium' | 'large';
  glassMorphism?: boolean;
  companyName?: string;
  logoUrl?: string;
}

export interface SmaqChatbotProps {
  apiKey: string;
  projectId: string;
  theme?: ChatTheme;
  initialMessage?: string;
  placeholder?: string;
  className?: string;
  params?: object;

}

export interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: number;
  chart_config?: {
    xaxis?: string;
    yaxis?: string;
    series?: string;
    title?: string;
    type?: string;
    xlabel?: string;
    ylabel?: string;
  };
  chart_data?: unknown;
}

export interface SendMessageRequest {
	message: string
}

export interface UseChatProps {
	params: object
	projectId: string
	apiKey: string
}

export interface ChatResponse {
  response: string;
  response_data?: unknown;
  chart_config?: {
    xaxis?: string;
    yaxis?: string;
    series?: string;
    title?: string;
    type?: string;
    xlabel?: string;
    ylabel?: string;
  };
}