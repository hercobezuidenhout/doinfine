import { CreateInvitationCommand } from "@/prisma/commands/create-invitation";
import { useMutation } from "@tanstack/react-query";

export const useCreateInvitationMutation = () => {
    const createInvitation = (scope: Pick<CreateInvitationCommand, 'scopeId'>) => fetch("/api/v1/invitations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(scope)
    }).then((res) => res.json());

    return useMutation({
        mutationFn: createInvitation
    });
};