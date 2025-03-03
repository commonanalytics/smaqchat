import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import './ChatBubble.css';

interface ChatBubbleProps {
  isOpen: boolean;
  onClick: () => void;
  theme?: {
    primaryColor?: string;
    bubbleSize?: 'small' | 'medium' | 'large';
  };
}

const ChatBubble = ({ isOpen, onClick, theme }: ChatBubbleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getBubbleSize = () => {
    switch (theme?.bubbleSize || 'medium') {
      case 'small': return '3rem';
      case 'large': return '4rem';
      default: return '3.5rem';
    }
  };

  const bubbleStyle = {
    width: getBubbleSize(),
    height: getBubbleSize(),
    backgroundColor: theme?.primaryColor || '#18181b',
    transform: `scale(${isHovered ? 1.1 : 1})`,
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="chat-bubble"
      style={bubbleStyle}
    >
      <div className="chat-bubble-icon">
        {isOpen ? (
          <X className="icon" />
        ) : (
          <MessageSquare className="icon" />
        )}
      </div>
    </button>
  );
};

export default ChatBubble;
