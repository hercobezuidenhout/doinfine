import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <Flex height="95vh" alignItems="center" justifyContent="center" padding={4}>
                {children}
            </Flex>
        </>
    );
}