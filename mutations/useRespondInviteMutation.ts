import { CreateScopeCommand } from "@/prisma/commands/create-scope";
import { InviteResponse } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRespondInviteMutation = (inviteId: number) => {
    const queryClient = useQueryClient();
    const respondInvite = (scope: Pick<InviteResponse, 'responseType'>) => fetch(`/api/v1/invitations/${inviteId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(scope)
    }).then((res) => res.json());

    return useMutation({
        mutationFn: respondInvite,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['currentUserScopes'] })
    });
};