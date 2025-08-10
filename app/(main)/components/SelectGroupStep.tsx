'use client';

import { InputGroup, Input, Stack, Steps, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { PostStepProps } from "./PostStep";
import { useCurrentUserScopesQuery } from "@/queries/useCurrentUserScopesQuery";
import { Scope } from "@prisma/client";
import { LuSearch } from "react-icons/lu";

interface SelectGroupStepProps extends PostStepProps {
    onGroupSelect?: (group: Scope) => void;
}

export const SelectGroupStep = ({ onStepChange, onGroupSelect }: SelectGroupStepProps) => {
    const [filter, setFilter] = useState("");
    const { data: groups } = useCurrentUserScopesQuery();

    const handleOnGroupSelect = (group: Scope) => {
        onGroupSelect?.(group);
        onStepChange?.("Select user");
    };

    return (
        <>
            <InputGroup startElement={<LuSearch />} mt={4}>
                <Input placeholder="Search guilds" value={filter} onChange={(event) => setFilter(event.target.value)} />
            </InputGroup>
            <Stack gap="8" my={8}>
                {groups?.filter((group: Scope) =>
                    group.name.toLowerCase().includes(filter.toLowerCase()) ||
                    group.description?.toLowerCase().includes(filter.toLowerCase())
                ).map((group: Scope) => (
                    <Steps.NextTrigger key={group.id} asChild>
                        <HStack gap="4" onClick={() => handleOnGroupSelect(group)} cursor="pointer">
                            <Stack gap="0">
                                <Text fontWeight="medium">{group.name}</Text>
                                <Text color="fg.muted" textStyle="sm">
                                    {group.description}
                                </Text>
                            </Stack>
                        </HStack>
                    </Steps.NextTrigger>
                ))}
            </Stack>
        </>
    );
};