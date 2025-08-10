'use client';

import { Avatar, Box, Button, ButtonGroup, CloseButton, Drawer, Field, HStack, Input, InputGroup, Portal, Stack, Steps, Text, Textarea } from "@chakra-ui/react";
import { FiEye, FiPenTool, FiSearch, FiUser } from "react-icons/fi";
import { LuUser, LuWallet, LuCalendar, LuCheck } from "react-icons/lu";

export const FineSomeoneButton = () => {
    const users = [
        {
            id: "1",
            name: "John Mason",
            email: "john.mason@example.com",
            avatar: "https://i.pravatar.cc/300?u=iu",
        },
        {
            id: "2",
            name: "Melissa Jones",
            email: "melissa.jones@example.com",
            avatar: "https://i.pravatar.cc/300?u=po",
        },
    ];

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
    ];

    const steps = [
        {
            icon: <FiEye />,
            description: (
                <>
                    <InputGroup startElement={<FiSearch />} mt={4}>
                        <Input placeholder="Group" />
                    </InputGroup>
                    <Stack gap="8" my={8}>
                        {groups.map((group) => (
                            <Steps.NextTrigger key={group.id} asChild>
                                <HStack gap="4">
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
            )
        },
        {
            icon: <FiUser />,
            description: (
                <>
                    <InputGroup startElement={<FiSearch />} mt={4}>
                        <Input placeholder="Friend" />
                    </InputGroup>
                    <Stack gap="8" my={8}>
                        {users.map((user) => (
                            <Steps.NextTrigger key={user.email} asChild>
                                <HStack gap="4">
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
            ),
        },
        {
            icon: <FiPenTool />,
            description: "Book an Appointment",
        },
    ];

    return (
        <Box position="fixed" bottom={0} left={0} right={0} p={4} bg={{ base: 'white', _dark: 'black' }}>
            <Drawer.Root placement='bottom' size='full'>
                <Drawer.Trigger asChild>
                    <Button width="full">
                        Fine someone
                    </Button>
                </Drawer.Trigger>
                <Portal>
                    <Drawer.Backdrop />
                    <Drawer.Positioner>
                        <Drawer.Content
                            roundedTopLeft="l3"
                        >
                            <Drawer.Header>
                                <Drawer.Title>Fine someone</Drawer.Title>
                            </Drawer.Header>
                            <Drawer.Body>
                                <Steps.Root defaultStep={0} count={steps.length} size="xs">
                                    <Steps.List>
                                        {steps.map((step, index) => (
                                            <Steps.Item key={index} index={index}>
                                                <Steps.Indicator>
                                                    <Steps.Status incomplete={step.icon} complete={<LuCheck />} />
                                                </Steps.Indicator>
                                                <Steps.Separator />
                                            </Steps.Item>
                                        ))}
                                    </Steps.List>

                                    {steps.map((step, index) => (
                                        <Steps.Content key={index} index={index}>
                                            {step.description}
                                        </Steps.Content>
                                    ))}
                                    <Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>
                                </Steps.Root>
                            </Drawer.Body>
                            <Drawer.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Drawer.CloseTrigger>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root>
        </Box>
    );
};