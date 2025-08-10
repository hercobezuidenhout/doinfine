'use client';

import { PropsWithChildren } from "react";

export interface PostStepProps {
    onStepChange?: (stepTitle: string) => void;
}

export const PostStep = ({ children }: PropsWithChildren) => {
    return (
        <>{children}</>
    );
};