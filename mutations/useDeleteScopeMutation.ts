import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteScopeMutation = () => {
    const queryClient = useQueryClient();
    const deleteScope = (scopeId: number) => fetch(`/api/v1/scopes/${scopeId}`, {
        method: "DELETE"
    });

    return useMutation({
        mutationFn: deleteScope,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['currentUserScopes'] })
    });
};