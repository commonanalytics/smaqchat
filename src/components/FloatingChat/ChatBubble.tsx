
import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  const bubbleSizes = {
    small: 'w-12 h-12',
    medium: 'w-14 h-14',
    large: 'w-16 h-16'
  };

  const size = theme?.bubbleSize || 'medium';

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'fixed flex items-center justify-center rounded-full shadow-lg transition-all duration-300 ease-in-out',
        bubbleSizes[size],
        isHovered ? 'scale-110' : 'scale-100',
        theme?.primaryColor || 'bg-zinc-900 hover:bg-zinc-800'
      )}
      style={{
        bottom: '2rem',
        right: '2rem',
        transform: `scale(${isHovered ? 1.1 : 1})`,
      }}
    >
      <div className="relative animate-fade-in">
        {isOpen ? (
          <X className="h-6 w-6 text-white transition-transform" />
        ) : (
          <MessageSquare className="h-6 w-6 text-white transition-transform" />
        )}
      </div>
    </button>
  );
};

export default ChatBubble;
