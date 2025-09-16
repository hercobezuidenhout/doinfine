"use client";

import { Box, SimpleGrid, Text } from "@chakra-ui/react";

const EMOJIS = [
    // Smileys & People
    "1f602", "1f923", "1f60d", "1f60a", "1f609", "1f601", "1f605", "1f914", "1f644", "1f622",
    "1f633", "1f60e", "1f614", "1f629", "1f970", "1f97a", "1f618", "1f973", "1f637",

    // Hands / Gestures
    "1f44d", "1f44c", "1f64f", "1f44f", "1f64c", "1f926", "1f937", "1f91d",

    // Hearts / Symbols
    "2764", "1f494", "1f496", "2728", "1f4af", "1f525", "1f389", "1f606", "1f60c",

    // Misc / Activities
    "1f440", "1f924", "1f921", "1f4aa"
];

export const codepointsToEmoji = (code: string) =>
    String.fromCodePoint(...code.split("-").map((c) => parseInt(c, 16)));

export function EmojiPicker({ onSelect }: { onSelect: (code: string) => void; }) {
    return (
        <>
            {EMOJIS.length > 0 ? (
                <SimpleGrid columns={6} gap={2}>
                    {EMOJIS.map((code) => {
                        const emoji = codepointsToEmoji(code);
                        return (
                            <Box
                                as="button"
                                key={code}
                                fontSize="22px"
                                p={2}
                                borderRadius="md"
                                _hover={{ bg: "gray.100" }}
                                onClick={() => onSelect(code)}
                            >
                                {emoji}
                            </Box>
                        );
                    })}
                </SimpleGrid>
            ) : (
                <Text fontSize="sm" color="gray.500" textAlign="center" py={6}>
                    No emoji available
                </Text>
            )}
        </>
    );
}
