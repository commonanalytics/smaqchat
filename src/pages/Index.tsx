
import { FloatingChat } from '@/components/FloatingChat';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Floating Chat Demo</h1>
        <p className="text-xl text-gray-600">Click the chat bubble in the bottom right corner!</p>
      </div>
      
      <FloatingChat
        apiKey="your-api-key"
        theme={{
          primaryColor: 'bg-zinc-900',
          glassMorphism: true,
          bubbleSize: 'medium',
        }}
        initialMessage="Hello! How can I help you today?"
      />
    </div>
  );
};

export default Index;
