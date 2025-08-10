import { useQuery } from "@tanstack/react-query";

const ENDPOINT = "/api/v1/feed";
const KEY = ["feed"];

export const useFeedQuery = (scopeId?: number) => useQuery({
    queryKey: KEY,
    queryFn: async () => {
        return fetch(scopeId ? `${ENDPOINT}?scopeId=${scopeId}` : ENDPOINT).then((res: Response) => res.json());
    },
    refetchOnWindowFocus: false,
});