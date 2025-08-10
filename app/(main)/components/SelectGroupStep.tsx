'use client';

import { InputGroup, Input, Stack, Steps, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { PostStepProps } from "./PostStep";

export const SelectGroupStep = ({ onStepChange }: PostStepProps) => {
    const [filter, setFilter] = useState("");

    const groups = [
        {
            id: "1",
            name: "Braai Maatjies",
            description: "Want a tjoppie is lekker!",
        },
        {
            id: "2",
            name: "Team RockIT",
            description: "Don't be late to that meeting!",
        },
        {
            id: "3",
            name: "Tennis Troupe",
            description: "Double faults deserve double fines 🎾",
        },
        {
            id: "4",
            name: "Brew Crew",
            description: "Spill a beer? Pay the price 🍺",
        },
        {
            id: "5",
            name: "Roadtrip Rebels",
            description: "Snacks and playlist or pay up 🚗",
        },
        {
            id: "6",
            name: "FIFA Fanatics",
            description: "Losing 10-0? That’s a fine 🎮",
        },
        {
            id: "7",
            name: "Office Jokers",
            description: "Printer jam = your problem 🖨️",
        },
        {
            id: "8",
            name: "Sunday Hikers",
            description: "Arrive without water? R20 thanks 🥾",
        },
        {
            id: "9",
            name: "Board Game Bandits",
            description: "Flip the board, lose your cash 🎲",
        },
        {
            id: "10",
            name: "Wine Warriors",
            description: "Sip, don’t spill 🍷",
        },
        {
            id: "11",
            name: "Late Night Legends",
            description: "Yawns cost R5 after midnight 🌙",
        },
        {
            id: "12",
            name: "Fantasy League Failures",
            description: "Forgot to set your team? Pay up 🏈",
        },
        {
            id: "13",
            name: "Camping Crew",
            description: "Leave the tent unzipped = bugs + fine ⛺",
        },
        {
            id: "14",
            name: "Pub Quiz Pros",
            description: "Wrong answer? Pay your dues 🧠",
        },
        {
            id: "15",
            name: "Surf Squad",
            description: "Miss the wave? That’s R10 🌊",
        },
        {
            id: "16",
            name: "Parkrun Posse",
            description: "Forgot your barcode? R15 fine 🏃",
        },
        {
            id: "17",
            name: "Spicy Curry Club",
            description: "Order mild? That’s a spice fine 🌶️",
        },
        {
            id: "18",
            name: "Bakkie Buddies",
            description: "Don’t help load? R25 fine 🚚",
        },
        {
            id: "19",
            name: "DIY Disasters",
            description: "Wrong tool for the job? Pay up 🔨",
        },
        {
            id: "20",
            name: "Fishing Fools",
            description: "Catch nothing? R10 per hour 🎣",
        },
        {
            id: "21",
            name: "Poker Sharks",
            description: "Fold too soon? Chips to the kitty ♠️",
        },
        {
            id: "22",
            name: "Coffee Cartel",
            description: "Spill the latte? That’s R5 ☕",
        },
    ];


    return (
        <>
            <InputGroup startElement={<FiSearch />} mt={4}>
                <Input placeholder="Group" value={filter} onChange={(event) => setFilter(event.target.value)} />
            </InputGroup>
            <Stack gap="8" my={8}>
                {groups.filter(group =>
                    group.name.toLowerCase().includes(filter.toLowerCase()) ||
                    group.description.toLowerCase().includes(filter.toLowerCase())
                ).map((group) => (
                    <Steps.NextTrigger key={group.id} asChild>
                        <HStack gap="4" onClick={() => onStepChange?.("Select user")}>
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