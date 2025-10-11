'use client';

import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";

interface BackButtonProps {
    href?: string;
}

export const BackButton = ({ href }: BackButtonProps) => {
    const router = useRouter();

    const handleOnClick = () => href ? router.push(href) : router.push('/');

    return (
        <Button
            onClick={handleOnClick}
            size="xs"
            variant="ghost"
            fontWeight="black"
            padding={0}>
            <LuArrowLeft /> Back
        </Button>
    );
};