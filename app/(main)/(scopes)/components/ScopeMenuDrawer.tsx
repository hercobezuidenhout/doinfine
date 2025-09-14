'use client'

import { useDeleteScopeMutation } from "@/mutations/useDeleteScopeMutation"
import { Button, Drawer, IconButton, Stack } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { LuSettings } from "react-icons/lu"

interface ScopeMenuDrawerProps {
    scopeId: number
}

const DELETE_TEXT = "Delete"
const CONFIRM_DELETE_TEXT = "Confirm Delete"

export const ScopeMenuDrawer = ({ scopeId }: ScopeMenuDrawerProps) => {
    const { mutateAsync, isPending } = useDeleteScopeMutation()
    const [deleteText, setDeleteText] = useState(DELETE_TEXT)
    const router = useRouter()

    const handleDelete = async () => {
        switch (deleteText) {
            case DELETE_TEXT:
                setDeleteText(CONFIRM_DELETE_TEXT)
                return
            case CONFIRM_DELETE_TEXT:
                await mutateAsync(scopeId)
                router.push('/scopes')
                break
            default:
                console.error("Unexpected delete text:", deleteText)
                return
        };
    }

    return (
        <Drawer.Root placement={{ base: 'bottom', md: 'end' }}>
            <Drawer.Backdrop />
            <Drawer.Trigger asChild>
                <IconButton aria-label="Scope menu" size="sm">
                    <LuSettings />
                </IconButton>
            </Drawer.Trigger>
            <Drawer.Positioner padding={4}>
                <Drawer.Content rounded="md">
                    <Drawer.CloseTrigger />
                    <Drawer.Header>
                        <Drawer.Title>
                            Manage group
                        </Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        <Stack>
                            {deleteText !== CONFIRM_DELETE_TEXT && (
                                <Button onClick={() => router.push(`/scopes/${scopeId}/edit`)} disabled={isPending} variant="surface">
                                    Edit
                                </Button>
                            )}
                            <Button onClick={handleDelete} loading={isPending} colorPalette="red" variant="surface">
                                {deleteText}
                            </Button>
                        </Stack>
                    </Drawer.Body>
                    <Drawer.Footer />
                </Drawer.Content>
            </Drawer.Positioner>
        </Drawer.Root>
    )
}