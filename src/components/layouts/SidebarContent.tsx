// import logo from "@/assets/logo.png";
import { CloseButton } from "@chakra-ui/close-button";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { Icon } from "@chakra-ui/icon";
import { Box, BoxProps, Flex, FlexProps, Text } from "@chakra-ui/layout";
import { IconButton, useBoolean, useBreakpointValue } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { IconType } from "react-icons";
import { BsMoon, BsSun } from "react-icons/bs";
import { RiExpandLeftLine, RiExpandRightLine } from "react-icons/ri";
import { useMatches } from "react-router-dom";
import { navLink } from "./list";

interface NavItemProps extends FlexProps {
  to: string;
  name?: string;
  text?: boolean;
  icon: IconType;
}

const NavItem = ({ icon, children, to, text, ...rest }: NavItemProps) => {
  const matches = useMatches();
  const textColor = useColorModeValue("secondary.900", "gray.50");
  return (
    <Box as="a" href={to} style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="4"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "primary.50",
          color: "primary.700",
        }}
        bgColor={matches[2].pathname === to ? "#F5F3FF55" : "transparent"}
        borderRight={matches[2].pathname === to ? "6px solid #4F35F3" : "none"}
        {...rest}
      >
        <Text color={matches[2].pathname === to ? "#4F35F3" : textColor} display={"flex"}>
          <Icon
            mr="4"
            fontSize="24"
            _groupHover={{
              color: "primary.700",
            }}
            as={icon}
          />
          {text && <>{children}</>}
        </Text>
      </Flex>
    </Box>
  );
};
NavItem.propTypes = {
  icon: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarContentProps) => {
  const { toggleColorMode, colorMode } = useColorMode();
  // const isLowerThanXl = useBreakpointValue({ base: true, xl: false });
  const isHigherThanLg = useBreakpointValue({ base: false, xl: true });
  const isLowerThanMd = useBreakpointValue({ base: true, md: false });

  const [isExpanded, { toggle }] = useBoolean();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("primary.50", "gray.900")}
      flexDirection="column"
      borderRightColor={useColorModeValue("secondary.200", "gray.700")}
      w={{ base: "full", md: isExpanded ? 48 : 14, xl: "15%" }}
      borderRight={1}
      h="100%"
      {...rest}
    >
      <Flex h="28" alignItems="center" justifyContent={{ md: "space-between" }} position={"relative"}>
        <Text
          fontWeight="bold"
          color={useColorModeValue("primary.900", "gray.50")}
          flex={1}
          display={{ base: "block", md: isExpanded ? "block" : "none", xl: "block" }}
          ml={{ base: 4, md: 1 }}
          textAlign={"start"}
          fontSize={{ base: "2xl", md: "2xl", xl: "4xl" }}
        >
          TaskMaster
        </Text>
        <IconButton
          display={{ base: "none", md: "flex", xl: "none" }}
          onClick={toggle}
          variant="ghost"
          aria-label="open menu"
          fontSize={24}
          icon={isExpanded ? <RiExpandLeftLine /> : <RiExpandRightLine />}
        />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {navLink.map((link) => (
        <NavItem text={isHigherThanLg || isLowerThanMd || isExpanded} key={link.name} to={link.to} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}

      <IconButton
        alignSelf={"start"}
        roundedLeft={"none"}
        roundedRight={"full"}
        mt={"auto"}
        onClick={toggleColorMode}
        icon={<Icon as={colorMode === "dark" ? BsSun : BsMoon} />}
        aria-label="switch mode"
        pos={"fixed"}
        left={0}
        bottom={{ base: "5%", md: 1 }}
      />
    </Box>
  );
};

SidebarContent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export { SidebarContent };
