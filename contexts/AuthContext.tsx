'use client';

import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useContext, ReactNode, useEffect, useState } from "react";

interface AuthContextValue {
    user: User | undefined | null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode; }) => {
    const { auth } = createClient();
    const [user, setUser] = useState<User>();
    const router = useRouter();

    useEffect(() => {
        auth.onAuthStateChange((event, session) => {
            console.info(event);
            // You can handle auth state changes here if needed
            if (!session) {
                router.push('/login');
                return;
            }

            setUser(session.user);
        });
    }, [auth, router]);

    return user && (
        <AuthContext.Provider value={{ user: user }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for consuming context
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
