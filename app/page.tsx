'use client';

import { ColorModeButton } from "@/components/ui/color-mode";
import { createClient } from "@/utils/supabase/client";
import { Box, Button, Heading, Text, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const supabase = createClient();
  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error);
    } else {
      console.info("Successfully signed out");
    }

    router.refresh();
  };

  useEffect(() => {
    fetch("/api/v1/users/current")
      .then(response => response.json())
      .then(data => {
        console.log("Current user data:", data);
      })
      .catch(error => {
        console.error("Error fetching current user data:", error);
      });
  }, []);

  return (
    <Box minH="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Stack gap={8} align="center">
        <Heading size="2xl">Welcome to Doinfine</Heading>
        <Text>A simple, elegant landing page for your app.</Text>
        <Button width="full" onClick={signOut}>Sign Out</Button>
        <ColorModeButton />
      </Stack>
    </Box>
  );
}
