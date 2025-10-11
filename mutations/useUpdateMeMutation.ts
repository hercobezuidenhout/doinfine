import { User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateMeMutation = () => {
    const queryClient = useQueryClient();
    const updateMe = (user: Pick<User, 'name' | 'aboutMe'>) => fetch("/api/v1/me", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    return useMutation({
        mutationFn: updateMe,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['feed'] })
    });
};