// import logo from "@/assets/logo.png";
import { IconButton } from "@chakra-ui/button";
import { Flex, FlexProps, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

interface AuthMobileNavProps extends FlexProps {
  onOpen: () => void;
}

const AuthMobileNav = ({ onOpen, ...rest }: AuthMobileNavProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      display={{ base: "flex", md: "none" }}
      height={{ base: 20, md: 0 }}
      pos={"sticky"}
      zIndex={"overlay"}
      w={"full"}
      top={0}
      alignItems="center"
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton display={{ base: "flex", md: "none" }} onClick={onOpen} variant="outline" aria-label="open menu" icon={<FiMenu />} />
      <Text
        as={Link}
        to={"/"}
        display={{ base: "flex", md: "none" }}
        color={useColorModeValue("primary.900", "gray.50")}
        fontWeight="bold"
        fontSize={{ base: "2xl", md: "2xl" }}
      >
        TaskMaster
      </Text>
      {/* <Image justifySelf={"center"} src={logo} display={{ base: "flex", md: "none" }} /> */}.
    </Flex>
  );
};

AuthMobileNav.propTypes = {
  onOpen: PropTypes.func.isRequired,
};

export { AuthMobileNav };
