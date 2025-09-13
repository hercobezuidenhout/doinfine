import { Post } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateFineMutationType = Pick<Post, 'scopeId' | 'description' | 'issuedToId'>;

export const useCreateFineMutation = () => {
    const queryClient = useQueryClient();

    const createFine = (scope: CreateFineMutationType) => fetch("/api/v1/fines", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(scope)
    }).then((res) => res.json());

    return useMutation({
        mutationFn: createFine,
        onSuccess: (data: CreateFineMutationType) => {
            queryClient.invalidateQueries({ queryKey: ['feed'] });
            queryClient.invalidateQueries({ queryKey: ["feed", data.scopeId] });
        }
    });
};