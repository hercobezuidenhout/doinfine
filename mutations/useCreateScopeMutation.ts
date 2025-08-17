import { CreateScopeCommand } from "@/prisma/commands/create-scope";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateScopeMutation = () => {
    const queryClient = useQueryClient();
    const createScope = (scope: Omit<CreateScopeCommand, 'userId'>) => fetch("/api/v1/scopes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(scope)
    }).then((res) => res.json());

    return useMutation({
        mutationFn: createScope,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['currentUserScopes'] })
    });
};