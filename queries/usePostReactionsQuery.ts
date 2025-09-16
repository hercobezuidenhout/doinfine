import { useQuery } from "@tanstack/react-query";

export const usePostReactionsQuery = (postId: number) =>
    useQuery({
        queryKey: ['feed', postId, 'reactions'],
        queryFn: async () => fetch(`/api/v1/feed/${postId}/reactions`).then(res => res.json())
    })