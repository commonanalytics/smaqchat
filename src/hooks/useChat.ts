
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Message } from '@/components/FloatingChat/types';

interface SendMessageRequest {
  message: string;
  apiKey: string;
}

export const useChat = () => {
  const queryClient = useQueryClient();

  const sendMessage = async ({ message, apiKey }: SendMessageRequest) => {
    const response = await fetch('http://localhost:8000/api/chats/ask-question/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        message,
        db_connection_uuid: "67a45667ac63fe35fdaf41ee",
        session_id: "67a45667ac63fe35fdaf41e5"
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get response from chat API');
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  return {
    sendMessage: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
