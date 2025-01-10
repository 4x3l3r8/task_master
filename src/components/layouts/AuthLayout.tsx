import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import { SidebarContent } from "./SidebarContent"
import { AuthMobileNav } from "./AuthMobileNav"

export const AuthLayout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box minH="100vh" w={"100vw"} display={{ md: "flex" }}>
            <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'flex' }} />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent display={"flex"} flexDir={"column"}>
                    <SidebarContent onClose={onClose} display={{ base: 'flex', md: 'none' }} />
                </DrawerContent>
            </Drawer>
            <AuthMobileNav onOpen={onOpen} />
            <Box as="main" ml={{ base: 0, md: "auto" }} w={{ md: "85%" }} h={"full"} px={8} py={{ md: 10 }}>
                <Outlet />
            </Box>
        </Box>
    )
}
