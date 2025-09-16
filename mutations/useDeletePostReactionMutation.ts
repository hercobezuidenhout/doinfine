import { useAuthContext } from "@/contexts/AuthContext";
import { PostReaction } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePostReactionMutation = (postId: number) => {
    const queryClient = useQueryClient();
    const { user } = useAuthContext();

    const deletePostReaction = (postReaction: Pick<PostReaction, 'reaction'>) => fetch(`/api/v1/feed/${postId}/reactions`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postReaction)
    }).then((res) => res.json());

    return useMutation({
        mutationFn: deletePostReaction,
        onMutate: async ({ reaction }) => {
            await queryClient.cancelQueries({ queryKey: ['feed', postId, 'reactions'] });
            const previousReactions = queryClient.getQueryData<PostReaction[]>(['feed', postId, 'reactions']);

            queryClient.setQueryData<PostReaction[]>(['feed', postId, 'reactions'], (old = []) =>
                old.filter(r => !(r.reaction === reaction && r.userId === user?.id))
            );

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