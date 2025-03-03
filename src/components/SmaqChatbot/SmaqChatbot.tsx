import React, { useState } from 'react';
import { SmaqChatbotProps, Message } from './types';
import ChatBubble from './ChatBubble';
import ChatWindow from './ChatWindow';
import { useChat } from '@/hooks/useChat';
import './SmaqChatbot.css';

export const SmaqChatbot: React.FC<SmaqChatbotProps> = ({
  apiKey,
  projectId,
  theme,
  initialMessage = 'Hello! How can I help you today?',
  placeholder,
  className,
  params,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    if (initialMessage) {
      return [
        {
          id: Date.now().toString() + Math.random().toString(36).substring(2, 15),
          content: initialMessage,
          type: 'bot',
          timestamp: Date.now(),
        },
      ];
    }
    return [];
  });

  const { sendMessage, isLoading } = useChat({
    params,
    projectId,
    apiKey,
  });

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 15),
      content,
      type: 'user',
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const result = await sendMessage({ message: content });
      
      console.log(result);

      // Add bot response message
      const botMessage: Message = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 15),
        content: result.response || 'No response received',
        chart_config: result.chart_config,
        chart_data: result.response_data,
        type: 'bot',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message to chat
      const errorMessage: Message = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 15),
        content: 'Sorry, there was an error processing your message. Please try again.',
        type: 'bot',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className={`smaq-chatbot-container ${className || ''}`}>
      {isOpen && (
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          theme={theme}
          placeholder={placeholder}
          isLoading={isLoading}
          size={theme?.windowSize}
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
