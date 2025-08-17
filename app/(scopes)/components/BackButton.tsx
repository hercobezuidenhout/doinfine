'use client';

import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";

export const BackButton = () => {
    const router = useRouter();

    return (
        <Button
            onClick={() => router.back()}
            size="xs"
            variant="ghost"
            fontWeight="black"
            padding={0}>
            <LuArrowLeft /> Back
        </Button>
    );
};