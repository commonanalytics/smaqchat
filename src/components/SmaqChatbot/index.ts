import { SmaqChatbot } from './SmaqChatbot';
import '../../index.css';

// Named export (for those who prefer destructuring)
export { SmaqChatbot };

// Types export
export type { SmaqChatbotProps, Message, ChatTheme, SendMessageRequest, UseChatProps, ChatResponse } from './types';

// Default export
export default SmaqChatbot;

// Re-export everything
export * from './SmaqChatbot';
export * from './types';
