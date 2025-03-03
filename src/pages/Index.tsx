import { SmaqChatbot } from '@/components/SmaqChatbot/SmaqChatbot';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Floating Chat Demo</h1>
        <p className="text-xl text-gray-600">Click the chat bubble in the bottom right corner!</p>
      </div>

      <SmaqChatbot
        apiKey={import.meta.env.VITE_SMAQ_API_KEY}
        projectId={import.meta.env.VITE_SMAQ_PROJECT_ID}
        theme={{
          primaryColor: 'bg-zinc-900',
          glassMorphism: true,
          bubbleSize: 'large',
          // companyName: 'SMAQ Support V1',
          // logoUrl: 'https://lovable.dev/img/lovable-logo.svg',
          windowSize: 'large'
        }}
        // initialMessage="Hello! How can I help you today?"
        params={{
          workspaceId: "f8d933b9-e971-4dd0-b452-ad5ea0545aa0"
        }}
      />
    </div>
  );
};

export default Index;
