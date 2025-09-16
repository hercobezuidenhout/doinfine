import { PostReaction } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePostReactionMutation = (postId: number) => {
    const queryClient = useQueryClient();

    const createPostReaction = (postReaction: Pick<PostReaction, 'reaction'>) => fetch(`/api/v1/feed/${postId}/reactions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postReaction)
    }).then((res) => res.json());

    return useMutation({
        mutationFn: createPostReaction,
        onMutate: async ({ reaction }) => {
            const previousReactions = queryClient.getQueryData<PostReaction[]>(['feed', postId, 'reactions']);

            queryClient.setQueryData<PostReaction[]>(['feed', postId, 'reactions'], (old = []) => [
                ...old,
                { reaction, postId, userId: 'temp', createdAt: new Date() } as PostReaction,
            ]);

            return { previousReactions };
        },
        onError: (_err, _variables, context) => {
            if (context?.previousReactions) {
                queryClient.setQueryData(['feed', postId, 'reactions'], context.previousReactions);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['feed', postId, 'reactions'] });
        },
    });
};