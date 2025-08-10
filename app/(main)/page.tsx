'use client';

import { Box, Heading, Card, VStack, Button } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FineSomeoneButton } from "./components/FineSomeoneButton";

interface Post {
    id: number;
    group: string;
    finee: string;
    description: string;
    createdAt: string;
}

export default function Home() {
    const { data } = useQuery({
        queryKey: ["feed"],
        queryFn: async () => {
            return fetch("/api/v1/feed").then((res: Response) => res.json());
        },
        refetchOnWindowFocus: false,
    });

    return (
        <Box minH="100vh" display="flex" mt={10} flexDirection="column" alignItems="center" justifyContent="center">
            {data?.length > 0 && (
                <Box mt={8} width="full" p={4}>
                    <VStack alignItems="stretch" gap={8}>
                        {data.map((post: Post) => (
                            <Card.Root size="md" key={post.id}>
                                <Card.Header>
                                    <Heading size="md">{post.finee} - {post.group}</Heading>
                                </Card.Header>
                                <Card.Body color="fg.muted">
                                    {post.description}
                                </Card.Body>
                            </Card.Root>
                        ))}
                    </VStack>
                </Box>
            )}
            <FineSomeoneButton />
        </Box>
    );
}
