import { useAuthContext } from "@/contexts/AuthContext";
import { PostReaction } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePostReactionMutation = (postId: number, scopeId?: number) => {
    const queryClient = useQueryClient();
    const { user } = useAuthContext();

    const deletePostReaction = (postReaction: Pick<PostReaction, 'reaction'>) =>
        fetch(`/api/v1/feed/${postId}/reactions`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postReaction)
        }).then((res) => res.json());

    return useMutation({
        mutationFn: deletePostReaction,
        onMutate: async ({ reaction }) => {
            const queryKey = scopeId ? ['feed', scopeId] : ['feed'];
            console.log("onMutate-delete", queryKey);
            await queryClient.cancelQueries({ queryKey });

            const previousFeed = queryClient.getQueryData<any[]>(queryKey);

            queryClient.setQueryData<any[]>(queryKey, (old = []) =>
                old.map(post =>
                    post.id === postId
                        ? {
                            ...post,
                            reactions: post.reactions.filter(
                                (r: PostReaction) => !(r.reaction === reaction && r.userId === user?.id)
                            )
                        }
                        : post
                )
            );

            return { previousFeed };
        },
        onError: (_err, _variables, context) => {
            if (context?.previousFeed) {
                const queryKey = scopeId ? ['feed', scopeId] : ['feed'];
                queryClient.setQueryData(queryKey, context.previousFeed);
            }
        },
        onSettled: () => {
            const queryKey = scopeId ? ['feed', scopeId] : ['feed'];
            queryClient.invalidateQueries({ queryKey });
        },
    });
};
