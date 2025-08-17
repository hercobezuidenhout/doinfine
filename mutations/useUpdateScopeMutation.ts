import { UpdateScopeCommand } from "@/prisma/commands/update-scope";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateScopeMutation = (scopeId: number) => {
    const queryClient = useQueryClient();
    const updateScope = (scope: Omit<UpdateScopeCommand, 'id'>) => fetch(`/api/v1/scopes/${scopeId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(scope)
    }).then((res) => res.json());

    return useMutation({
        mutationFn: updateScope,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['currentUserScopes'] });
        }
    });
};