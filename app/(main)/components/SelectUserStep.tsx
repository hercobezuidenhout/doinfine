'use client';

import { InputGroup, Input, Stack, Steps, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { PostStepProps } from "./PostStep";
import { useScopeMembersQuery } from "@/queries/useScopeMembersQuery";
import { User } from "@prisma/client";
import { LuSearch } from "react-icons/lu";

interface SelectUserStepProps extends PostStepProps {
    scopeId: number;
    onUserSelect?: (user: User) => void;
}

export const SelectUserStep = ({ onStepChange, scopeId, onUserSelect }: SelectUserStepProps) => {
    const [filter, setFilter] = useState("");
    const { data: users } = useScopeMembersQuery(scopeId);

    const handleOnUserSelect = (user: User) => {
        onUserSelect?.(user);
        onStepChange?.("Set description");
    };

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
                    <Steps.NextTrigger key={user.email} asChild>
                        <HStack gap="4" onClick={() => handleOnUserSelect(user)} cursor="pointer">
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