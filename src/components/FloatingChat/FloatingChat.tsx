
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

    try {
      // Make API call to the chat endpoint
      const response = await fetch('http://localhost:8000/api/chats/ask-question/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({
          message: content,
          db_connection_uuid: "67a45667ac63fe35fdaf41ee",
          session_id: "67a45667ac63fe35fdaf41e5"
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from chat API');
      }

      const data = await response.json();
      
      // Add bot response message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || data.message || 'No response received',
        type: 'bot',
        timestamp: Date.now(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, there was an error processing your message. Please try again.',
        type: 'bot',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
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
