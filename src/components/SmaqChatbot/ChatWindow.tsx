import React, { useEffect, useRef } from 'react';
import { ChatTheme, Message } from './types';
import { ChartVisualization } from '../Visualization/Chart';
import { MetricCard } from '../Visualization/Metric';
import { ChartTypeRegistry } from 'chart.js';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './ChatWindow.css';

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  theme?: ChatTheme;
  placeholder?: string;
  isLoading?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const ChatWindow = ({ messages, onSendMessage, theme, placeholder, isLoading, size = 'medium' }: ChatWindowProps) => {
  const [input, setInput] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  // Define width based on size prop
  const getWindowWidth = () => {
    switch (size) {
      case 'small':
        return '20rem'; // w-80
      case 'medium':
        return '24rem'; // w-96
      case 'large':
        return '32rem'; // w-[32rem]
      default:
        return '24rem';
    }
  };

  const chatWindowStyle = {
    width: getWindowWidth(),
    backgroundColor: theme?.glassMorphism ? 'rgba(255, 255, 255, 0.8)' : 'white',
    backdropFilter: theme?.glassMorphism ? 'blur(10px)' : 'none',
  };

  return (
    <div
      className={`chat-window ${theme?.glassMorphism ? 'glass-morphism' : ''}`}
      style={chatWindowStyle}
    >
      <div className="chat-window-container">
        <div className="chat-header">
          {theme?.logoUrl ? (
            <img
              src={theme.logoUrl}
              alt="Company logo"
              className="company-logo"
            />
          ) : (
            <img
              src="/Logo.png"
              alt="Company logo"
              className="company-logo"
            />
          )}
          <span className="company-name">
            {theme?.companyName || 'SMAQ Support'}
          </span>
        </div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div className="message-container" key={message.id}>
              <div
                className={`message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className={`message-content ${message.type === 'user' ? 'user-content' : 'bot-content'}`}>
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({node, ...props}) => <p className="markdown-paragraph" {...props} />,
                      ol: ({node, ...props}) => <ol className="markdown-list" {...props} />,
                      ul: ({node, ...props}) => <ul className="markdown-list" {...props} />,
                      li: ({node, ...props}) => <li className="markdown-item" {...props} />,
                      div: ({node, ...props}) => <div className="markdown-div" {...props} />
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
              {message.chart_config && message.chart_data && (
                message.chart_config.type === 'metric' ? (
                  <MetricCard
                    title={message.chart_config.title || 'Metric'}
                    value={
                      typeof message.chart_data[0] === 'object' && message.chart_data[0] !== null
                        ? Object.values(message.chart_data[0])[0]
                        : message.chart_data[0].value
                    }
                  />
                ) : (
                  <ChartVisualization
                    chartData={
                      {
                        title: message.chart_config.title || 'Chart',
                        type: message.chart_config.type as keyof ChartTypeRegistry,
                        xaxis: [message.chart_config.xaxis || ''],
                        yaxis: [message.chart_config.yaxis || ''],
                        xlabel: message.chart_config.xlabel || '',
                        ylabel: message.chart_config.ylabel || '',
                        data: message.chart_data as Record<string, unknown>[]
                      }
                    }
                  />
                ))}
            </div>
          ))}
          {isLoading && (
            <div className="loading-indicator">
              <div className="loading-content">
                <div className="loading-dot dot1"></div>
                <div className="loading-dot dot2"></div>
                <div className="loading-dot dot3"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="chat-input-form">
          <div className="input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder || "Type your message..."}
              className="message-input"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`send-button ${isLoading ? 'disabled' : ''}`}
              disabled={isLoading}
            >
              Send
            </button>
          </div>
          <div className="footer-text">
            Powered by <a href="https://smaq.io" target="_blank" rel="noopener noreferrer" className="footer-link">SMAQ</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
