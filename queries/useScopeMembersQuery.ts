import { useQuery } from "@tanstack/react-query";

export const useScopeMembersQuery = (scopeId: number) => useQuery({
    queryKey: ["scope", scopeId, "members"],
    queryFn: async () => {
        return fetch(`/api/v1/scopes/${scopeId}/members`).then((res: Response) => res.json());
    },
});