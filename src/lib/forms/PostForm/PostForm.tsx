'use client';

import { NewPostFabButton } from "@/app/(spaces)/spaces/[spaceId]/components/NewPostFabButton";
import { Can } from "@/lib/casl/Can";
import { PostModal } from "@/lib/modals/PostModal/PostModal";
import { subject } from "@casl/ability";
import { Box, Button, ButtonGroup, Card, CardBody, Divider, Text, VStack, useDisclosure} from "@chakra-ui/react";
import { Scope } from "@prisma/client";
import { useState } from "react";

const DEFAULT_POST_TYPE = 'WIN';

interface PostFormProps {
    scope: Scope;
}

export const PostForm = ({ scope }: PostFormProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [postType, setPostType] = useState<'WIN' | 'FINE' | 'PAYMENT'>(DEFAULT_POST_TYPE);

    const handleButtonClick = (selectedPostType) => {
        setPostType(selectedPostType);
    };

    const handleOnClose = () => {
        setPostType(DEFAULT_POST_TYPE);
        onClose();
    };

    
    return (
        <>
            <Card w="full" onClick={onOpen} display={{ base: 'none', md: 'block' }}>
                <CardBody>
                    <VStack gap={5}>
                        <Box cursor="text" backgroundColor="chakra-body-bg" borderRadius="full" borderColor="chakra-subtle-bg" borderWidth="1px" borderStyle="solid" width="full" paddingX={4} paddingY={2}>
                            <Text color="chakra-placeholder-color">Share a post</Text>
                        </Box>
                        <Divider variant="gradient" />
                        <ButtonGroup variant="ghost" w="xs" justifyContent="space-between">
                            <Can I="post" this={subject('Post', { scopeId: scope.id, type: 'WIN' })}>
                                <Button onClick={() => handleButtonClick('WIN')}>🎉 Win</Button>
                            </Can>
                            <Can I="post" this={subject('Post', { scopeId: scope.id, type: 'FINE' })}>
                                <Button onClick={() => handleButtonClick('FINE')}>🚨 Fine</Button>
                            </Can>
                            <Can I="post" this={subject('Post', { scopeId: scope.id, type: 'PAYMENT' })}>
                                <Button onClick={() => handleButtonClick('PAYMENT')}>💰 Pay</Button>
                            </Can>
                        </ButtonGroup>
                    </VStack>
                </CardBody>
            </Card>
            <NewPostFabButton onClick={onOpen} />
            <PostModal
                initialScope={scope}
                isOpen={isOpen}
                onClose={handleOnClose}
                initialPostType={postType}
            />
        </>
    );
};