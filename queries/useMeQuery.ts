import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useMeQuery = () => {
    return useQuery<User>({
        queryKey: ['me'],
        queryFn: async () => {
            return fetch('/api/v1/me').then((res: Response) => res.json());
        },
    });
};