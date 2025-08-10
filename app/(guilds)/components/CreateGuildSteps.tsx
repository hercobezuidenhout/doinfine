'use client';

import { Steps, ButtonGroup, Button, Field, Input, Blockquote, Stack, Card, Heading, Text, Clipboard, IconButton, HStack } from "@chakra-ui/react";
import { LuArrowLeft, LuCheck, LuDot, LuShare } from "react-icons/lu";

export const CreateGuildSteps = () => {

    const steps = [
        {
            icon: <LuDot />,
            description: (
                <Stack gap={4}>
                    <Blockquote.Root>
                        <Blockquote.Content>
                            Every legend starts with a guild… now yours begins.
                        </Blockquote.Content>
                    </Blockquote.Root>
                    <Field.Root required gap={2}>
                        <Field.Label>
                            Guild name <Field.RequiredIndicator />
                        </Field.Label>
                        <Input placeholder="Choose your guild's name" />
                        <Field.HelperText>e.g. Pink Fluffy Kittens</Field.HelperText>
                    </Field.Root>
                </Stack>
            ),
        },
        {
            icon: <LuDot />,
            description: (
                <Stack gap={4}>
                    <Blockquote.Root>
                        <Blockquote.Content>
                            These are the words your guild will carry into every challenge and fine.
                        </Blockquote.Content>
                    </Blockquote.Root>
                    <Field.Root required gap={2}>
                        <Field.Label>
                            Guild creed <Field.RequiredIndicator />
                        </Field.Label>
                        <Input placeholder="Choose your guild's creed" />
                        <Field.HelperText>e.g. We march with paws of silk and claws of steel, purring in peace until the moment to strike.</Field.HelperText>
                    </Field.Root>
                </Stack>
            ),
        },
        {
            icon: <LuDot />,
            description: (
                <Stack gap={4}>
                    <Blockquote.Root>
                        <Blockquote.Content>
                            Please review your guild before you continue.
                        </Blockquote.Content>
                    </Blockquote.Root>
                    <Card.Root size="sm">
                        <Card.Header>
                            <Heading size="md">Pink Fluffy Kittens</Heading>
                        </Card.Header>
                        <Card.Body color="fg.muted">
                            We march with paws of silk and claws of steel, purring in peace until the moment to strike.
                        </Card.Body>
                    </Card.Root>
                </Stack>
            ),
        },
    ];

    return (
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
                <Steps.Content key={index} index={index} py={4}>
                    {step.description}
                </Steps.Content>
            ))}

            <Steps.CompletedContent>
                <Stack mt={4} gap={4}>
                    <Heading>You have created a new guild!</Heading>
                    <Text>To invite people to your guild, share this invite link with them.</Text>
                    <Stack>
                        <Card.Root size="sm" variant="subtle">
                            <Card.Body>
                                <HStack justifyContent="space-between">
                                    <Text fontWeight="bold" color="fg.muted">https://somelink.com</Text>

                                    <Clipboard.Root value="https://chakra-ui.com">
                                        <Clipboard.Trigger asChild>
                                            <IconButton variant="surface" size="xs">
                                                <Clipboard.Indicator />
                                            </IconButton>
                                        </Clipboard.Trigger>
                                    </Clipboard.Root>
                                </HStack>
                            </Card.Body>
                        </Card.Root>
                        {navigator && typeof navigator.share === 'function' && (
                            <IconButton onClick={async () => {
                                await navigator.share({
                                    title: '🛡️ Join my Doinfine Guild!',
                                    text: 'Ready to team up, conquer quests, and build legendary stories together? Join us now!',
                                    url: "https://doinfine.app",
                                });
                            }}>
                                <LuShare />
                            </IconButton>
                        )}
                    </Stack>
                </Stack>
            </Steps.CompletedContent>

            <ButtonGroup size="sm" justifyContent="end">
                <Steps.PrevTrigger asChild>
                    <Button variant="ghost">
                        <LuArrowLeft /> Back
                    </Button>
                </Steps.PrevTrigger>
                <Steps.NextTrigger asChild>
                    <Button>Next</Button>
                </Steps.NextTrigger>
            </ButtonGroup>
        </Steps.Root >
    );
};