import { Box } from "@chakra-ui/react";
import { LoginForm } from "./components/LoginForm";

export default function LoginPage() {
    return (
        <Box maxW="sm" mx="auto" mt={12} p={6}>
            <LoginForm />
        </Box>
    );
}