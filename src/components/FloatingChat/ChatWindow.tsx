
import React from 'react';
import { cn } from '@/lib/utils';
import { Message } from './types';

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  theme?: {
    backgroundColor?: string;
    textColor?: string;
    glassMorphism?: boolean;
  };
  placeholder?: string;
}

const ChatWindow = ({ messages, onSendMessage, theme, placeholder }: ChatWindowProps) => {
  const [input, setInput] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div
      className={cn(
        'fixed bottom-24 right-4 w-96 rounded-2xl shadow-2xl transition-all duration-300',
        theme?.glassMorphism ? 'bg-white/80 backdrop-blur-lg' : 'bg-white',
        'animate-fade-in border border-gray-200'
      )}
      style={{ maxHeight: 'calc(100vh - 160px)' }}
    >
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex w-full animate-fade-in',
                message.type === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] rounded-lg px-4 py-2',
                  message.type === 'user'
                    ? 'bg-zinc-900 text-white'
                    : 'bg-gray-100 text-gray-900'
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="border-t p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder || "Type your message..."}
              className="flex-1 rounded-lg border border-gray-200 px-4 py-2 focus:border-zinc-900 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-white transition-colors hover:bg-zinc-800"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
