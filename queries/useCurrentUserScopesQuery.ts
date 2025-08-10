import { useQuery } from "@tanstack/react-query";

const ENDPOINT = "/api/v1/current/scopes";
const KEY = ["currentUserScopes"];

export const useCurrentUserScopesQuery = () => useQuery({
    queryKey: KEY,
    queryFn: async () => {
        return fetch(ENDPOINT).then((res: Response) => res.json());
    },
    refetchOnWindowFocus: false,
});