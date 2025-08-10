'use client';

import { InputGroup, Input, Stack, Steps, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { PostStepProps } from "./PostStep";

export const SelectUserStep = ({ onStepChange }: PostStepProps) => {
    const [filter, setFilter] = useState("");

    const users = [
        {
            id: "1",
            name: "John Mason",
            email: "john.mason@example.com"
        },
        {
            id: "2",
            name: "Melissa Jones",
            email: "melissa.jones@example.com"
        },
        {
            id: "3",
            name: "Daniel Reed",
            email: "daniel.reed@example.com"
        },
        {
            id: "4",
            name: "Samantha Green",
            email: "samantha.green@example.com"
        },
        {
            id: "5",
            name: "Ryan Carter",
            email: "ryan.carter@example.com"
        },
        {
            id: "6",
            name: "Olivia Turner",
            email: "olivia.turner@example.com"
        },
        {
            id: "7",
            name: "Ethan Brooks",
            email: "ethan.brooks@example.com"
        },
        {
            id: "8",
            name: "Chloe Bennett",
            email: "chloe.bennett@example.com"
        },
        {
            id: "9",
            name: "Liam Price",
            email: "liam.price@example.com"
        },
        {
            id: "10",
            name: "Sophia Ward",
            email: "sophia.ward@example.com"
        },
        {
            id: "11",
            name: "Michael Hughes",
            email: "michael.hughes@example.com"
        },
        {
            id: "12",
            name: "Ava Cooper",
            email: "ava.cooper@example.com"
        },
        {
            id: "13",
            name: "Benjamin Scott",
            email: "benjamin.scott@example.com"
        },
        {
            id: "14",
            name: "Grace Mitchell",
            email: "grace.mitchell@example.com"
        },
        {
            id: "15",
            name: "Noah Edwards",
            email: "noah.edwards@example.com"
        },
        {
            id: "16",
            name: "Isabella Ross",
            email: "isabella.ross@example.com"
        },
        {
            id: "17",
            name: "Jack Kelly",
            email: "jack.kelly@example.com"
        },
        {
            id: "18",
            name: "Mia Collins",
            email: "mia.collins@example.com"
        },
        {
            id: "19",
            name: "Lucas Morris",
            email: "lucas.morris@example.com"
        },
        {
            id: "20",
            name: "Amelia Gray",
            email: "amelia.gray@example.com"
        },
        {
            id: "21",
            name: "Henry Foster",
            email: "henry.foster@example.com"
        },
        {
            id: "22",
            name: "Ella Simmons",
            email: "ella.simmons@example.com"
        },
    ];


    return (
        <>
            <InputGroup startElement={<FiSearch />} mt={4}>
                <Input placeholder="Friend" value={filter} onChange={(event) => setFilter(event.target.value)} />
            </InputGroup>
            <Stack gap="8" my={8}>
                {users.filter(user =>
                    user.name.toLowerCase().includes(filter.toLowerCase()) ||
                    user.email.toLowerCase().includes(filter.toLowerCase())
                ).map((user) => (
                    <Steps.NextTrigger key={user.email} asChild>
                        <HStack gap="4" onClick={() => onStepChange?.("Post caption")}>
                            <Stack gap="0">
                                <Text fontWeight="medium">{user.name}</Text>
                                <Text color="fg.muted" textStyle="sm">
                                    {user.email}
                                </Text>
                            </Stack>
                        </HStack>
                    </Steps.NextTrigger>
                ))}
            </Stack>
        </>
    );
};