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
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['feed', postId, 'reactions'] })
    });
};