import { useAuthContext } from "@/contexts/AuthContext";
import { PostReaction } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreatePostReactionMutation = (postId: number, scopeId?: number) => {
    const queryClient = useQueryClient();
    const { user } = useAuthContext();

    const createPostReaction = (postReaction: Pick<PostReaction, 'reaction'>) =>
        fetch(`/api/v1/feed/${postId}/reactions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postReaction)
        }).then((res) => res.json());

    return useMutation({
        mutationFn: createPostReaction,
        onMutate: async ({ reaction }) => {
            const queryKey = scopeId ? ['feed', scopeId] : ['feed'];
            await queryClient.cancelQueries({ queryKey });

            const previousFeed = queryClient.getQueryData<any[]>(queryKey);

            queryClient.setQueryData<any[]>(queryKey, (old = []) =>
                old.map(post =>
                    post.id === postId
                        ? {
                            ...post,
                            reactions: [
                                ...post.reactions,
                                { reaction, postId, userId: user?.id, createdAt: new Date().toISOString() }
                            ]
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
