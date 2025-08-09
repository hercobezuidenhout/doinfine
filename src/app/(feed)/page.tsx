'use client';

import { Flex, Heading, Spacer, Icon } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";


import { Card, CardHeader, CardBody, CardFooter, Text, Avatar, Stack, Button } from "@chakra-ui/react";

const dummyPosts = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    user: `User ${i + 1}`,
    content: `This is a sample post #${i + 1} for the Doinfine feed.`
}));

const Page = () => (
    <>
        <Flex as="header" align="center" p={4} position="sticky" top={0} zIndex={1} bg="white">
            <Heading size="md">Doinfine</Heading>
            <Spacer />
            <Icon as={FaUserCircle} boxSize={8} />
        </Flex>
        <Stack gap={6} p={4}>
            {dummyPosts.map(post => (
                <Card.Root key={post.id}>
                    <CardHeader>
                        <Flex align="center" gap={3}>
                            <Avatar.Root name={post.user} />
                            <Heading size="sm">{post.user}</Heading>
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Text>{post.content}</Text>
                    </CardBody>
                    <CardFooter>
                        <Text fontSize="xs" color="gray.500">Just now</Text>
                    </CardFooter>
                </Card.Root>
            ))}
        </Stack>
        {/* ...existing code... */}
        <Flex position="fixed" bottom={0} left={0} width="100%" bg="white" p={4} zIndex={2} boxShadow="0 4px 12px rgba(0,0,0,0.10)">
            <Button
                bg="#4CD200" // bright green
                color="white"
                fontWeight="bold"
                width="full"
                borderRadius="md" // fully rounded edges
                px={10} // horizontal padding
                py={6} // vertical padding
                boxShadow="0px 4px #3ca400" // darker green shadow
                _hover={{
                    bg: "#45bf00", // slightly darker green on hover
                }}
                _active={{
                    boxShadow: "0px 2px #3ca400",
                    transform: "translateY(2px)",
                }}
            >
                START THE TEST
            </Button>
        </Flex>
    </>
);

export default Page;