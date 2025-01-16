import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import { FormikProps } from "formik";
import PropTypes from "prop-types";
import { CgChevronDown } from "react-icons/cg";
import { formValues } from "./types";

export const PriorityTagSelect = ({
  formik: {
    setFieldValue,
    values,
    errors: { priority: priorityError },
    touched: { priority: priorityTouched },
  },
}: {
  formik: FormikProps<formValues>;
}) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  return (
    <FormControl isRequired isInvalid={priorityTouched && Boolean(priorityError)}>
      <FormLabel>Priority</FormLabel>
      <Box rounded={"lg"} border={"1px solid"} borderColor={"gray.200"} pl={3} as={Flex} alignItems={"center"} onClick={onToggle} cursor={"pointer"}>
        {
          {
            low: (
              <Tag variant={"subtle"} colorScheme="red">
                Low
              </Tag>
            ),
            medium: (
              <Tag variant={"subtle"} colorScheme="messenger">
                Medium
              </Tag>
            ),
            high: (
              <Tag variant={"subtle"} colorScheme="whatsapp">
                High
              </Tag>
            ),
            "": <></>,
          }[values.priority]
        }

        <Menu isOpen={isOpen} onClose={onClose} isLazy placement="left-start">
          <MenuButton as={IconButton} icon={<Icon as={CgChevronDown} />} variant={"ghost"} size={"md"} m={0} ml={"auto"} />
          <MenuList>
            <MenuOptionGroup value={values.priority} type="radio" onChange={(value) => setFieldValue("priority", value)}>
              <MenuItemOption value="high" flexDir={"row-reverse"} color={"whatsapp.500"} _checked={{ bgColor: "whatsapp.50" }}>
                High
              </MenuItemOption>
              <MenuItemOption value="medium" flexDir={"row-reverse"} color={"messenger.500"} _checked={{ bgColor: "messenger.50" }}>
                Medium
              </MenuItemOption>
              <MenuItemOption value="low" flexDir={"row-reverse"} color={"red.500"} _checked={{ bgColor: "red.50" }}>
                Low
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Box>
      <FormErrorMessage>{priorityError}</FormErrorMessage>
    </FormControl>
  );
};

PriorityTagSelect.propTypes = {
  formik: PropTypes.object.isRequired,
};
