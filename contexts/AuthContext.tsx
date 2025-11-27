'use client';

import { useCurrentUserQuery } from "@/queries/useCurrentUserQuery";
import { Center, Spinner } from "@chakra-ui/react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useContext, ReactNode, useEffect } from "react";

interface AuthContextValue {
    user: User | undefined | null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode; }) => {
    const { data: user, isLoading, isFetched } = useCurrentUserQuery();
    const router = useRouter();

    useEffect(() => {
        if (isFetched || isLoading) return;
        if (!user?.data.user) {
            router.push('/login');
        }
    }, [isLoading, isFetched, user, router]);

    if (!isLoading && !user?.data.user) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ user: user?.data.user }}>
            {!isLoading && children}
            {isLoading && (
                <Center height="95vh">
                    <Spinner />
                </Center>
            )}
        </AuthContext.Provider>
    );
};

// Custom hook for consuming context
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
