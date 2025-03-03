import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ChatResponse, SendMessageRequest, UseChatProps } from "@/components/SmaqChatbot/types"
import axios from "axios"

export const useChat = ({ params, projectId, apiKey }: UseChatProps) => {
	const queryClient = useQueryClient()

	const sendMessage = async ({ message }: SendMessageRequest) => {
		const response = await axios.post<ChatResponse>(
			"https://beta.smaq-backend.com/api/chats/ask-question/",
			{
				project_id: projectId,
				message,
				params,
			},
			{
				headers: {
					"Content-Type": "application/json",
					"X-API-Key": apiKey,
				},
			}
		)

		return response.data
	}

	const mutation = useMutation({
		mutationFn: sendMessage,
		onSuccess: (data) => {
      console.log(data)
			queryClient.invalidateQueries({ queryKey: ["messages"] })
		},
	})

	return {
		sendMessage: mutation.mutateAsync,
		isLoading: mutation.isPending,
		error: mutation.error,
	}
}
