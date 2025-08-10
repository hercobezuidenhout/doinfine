import { useQuery } from "@tanstack/react-query";

const ENDPOINT = "/api/v1/feed";
const KEY = ["feed"];

export const useFeedQuery = () => useQuery({
    queryKey: KEY,
    queryFn: async () => {
        return fetch(ENDPOINT).then((res: Response) => res.json());
    },
    refetchOnWindowFocus: false,
});