import { Box, Drawer, DrawerContent, HStack, useDisclosure } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { SidebarContent } from "./SidebarContent";
import { AuthMobileNav } from "./AuthMobileNav";

export const AuthLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HStack h="100vh" w={"100vw"} align={"start"} flexDir={{ base: "column", md: "row" }} id="main">
      <SidebarContent onClose={() => onClose} display={{ base: "none", md: "flex" }} />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
        <DrawerContent display={"flex"} flexDir={"column"}>
          <SidebarContent onClose={onClose} display={{ base: "flex", md: "none" }} />
        </DrawerContent>
      </Drawer>
      <AuthMobileNav onOpen={onOpen} />
      <Box as="main" flex={1} h={"full"} w={"inherit"} px={{ base: 2, xl: 8 }} py={{ md: 10 }} overflowX={"scroll"}>
        {/* <Box as="main" ml={{ base: 0, md: "auto" }} w={{ md: "full", xl: "85%" }} h={"full"} px={{ xl: 8 }} py={{ md: 10 }}> */}
        <Outlet />
      </Box>
    </HStack>
  );
};
