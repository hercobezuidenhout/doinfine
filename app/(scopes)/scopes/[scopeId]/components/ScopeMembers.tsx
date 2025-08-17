'use client';

import { useScopeMembersQuery } from "@/queries/useScopeMembersQuery";
import { InputGroup, Input, Stack, HStack, Text } from "@chakra-ui/react";
import { User } from "@prisma/client";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";

interface ScopeMembersProps {
    scopeId: number;
}

export const ScopeMembers = ({ scopeId }: ScopeMembersProps) => {
    const [filter, setFilter] = useState("");
    const { data: users } = useScopeMembersQuery(scopeId);

    const handleOnUserSelect = (user: User) => console.info(user);

    return (
        <>
            <InputGroup startElement={<LuSearch />} mt={4}>
                <Input placeholder="Search friends" variant="subtle" value={filter} onChange={(event) => setFilter(event.target.value)} />
            </InputGroup>
            <Stack gap="8" my={8}>
                {users?.filter((user: User) =>
                    user.name.toLowerCase().includes(filter.toLowerCase()) ||
                    user.email?.toLowerCase().includes(filter.toLowerCase())
                ).map((user: User) => (
                    <HStack key={user.id} gap="4" onClick={() => handleOnUserSelect(user)} cursor="pointer">
                        <Stack gap="0">
                            <Text fontWeight="medium">{user.name}</Text>
                            <Text color="fg.muted" textStyle="sm">
                                {user.email}
                            </Text>
                        </Stack>
                    </HStack>
                ))}
            </Stack>
        </>
    );
};