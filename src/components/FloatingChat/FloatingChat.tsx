
import React, { useState } from 'react';
import { FloatingChatProps, Message } from './types';
import ChatBubble from './ChatBubble';
import ChatWindow from './ChatWindow';

const FloatingChat: React.FC<FloatingChatProps> = ({
  apiKey,
  theme,
  initialMessage,
  placeholder,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    if (initialMessage) {
      return [
        {
          id: '1',
          content: initialMessage,
          type: 'bot',
          timestamp: Date.now(),
        },
      ];
    }
    return [];
  });

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      type: 'user',
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Here you would implement the actual API call using the apiKey
    // For now, we'll just echo back the message
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: `Received: ${content}`,
      type: 'bot',
      timestamp: Date.now(),
    };
    
    setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className={className}>
      {isOpen && (
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          theme={theme}
          placeholder={placeholder}
        />
      )}
      <ChatBubble
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        theme={theme}
      />
    </div>
  );
};

export default FloatingChat;
