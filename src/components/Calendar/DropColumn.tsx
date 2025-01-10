import { Box, Center, Heading, HStack, IconButton, Stack, Tag, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { PiPlus } from "react-icons/pi";
import { AddTaskModal } from "./AddTaskModal";
import { TaskCard } from "./TaskCard";
import { Task, taskStatus } from "./types";
import { useDrop } from "react-dnd";
import { useMoveTaskMutation } from "@/redux/services/task.api";
import { toast } from "../shared";

interface DropColumnProps {
  title: taskStatus;
  tasks: Task[];
}

export const DropColumn = ({ title, tasks }: DropColumnProps) => {
  const bg = useColorModeValue("#F5F7F9", "#7D8996");
  const [moveTask] = useMoveTaskMutation();
  const { isOpen: addIsOpen, onClose: addOnClose, onOpen: addOnOpen } = useDisclosure();

  const handleMove = (id: number) => {
    moveTask({ newStatus: title, taskId: id })
      .unwrap()
      .then(() => {
        toast({
          status: "success",
          title: "Operation Successful",
          description: "Task moved successfully",
        });
      });
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "Task",
    drop: (dragItem: Task) => {
      handleMove(dragItem.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <>
      <Box w={{ md: "30.33%" }} bg={bg} rounded={"lg"} p={3} minW={"20rem"} pos={"relative"} ref={drop}>
        <HStack>
          <Heading fontSize={"xl"} fontWeight={"400"} color={"gray.400"}>
            {title}
          </Heading>
          <Tag colorScheme="blackAlpha">{tasks.length}</Tag>

          <IconButton onClick={addOnOpen} aria-label="add new todo item" variant={"ghost"} colorScheme="gray" icon={<PiPlus />} ml="auto" />
        </HStack>

        <Stack gap={3}>
          {/* {new Array(3).fill("").map((_, i) => {
                        return <TaskCard key={i} />
                    })} */}
          {tasks.map((task, i) => {
            return <TaskCard task={task} key={i} />;
          })}
          {tasks.length < 1 && (
            <Center rounded={"md"} mt={3} p={4} border="1px dashed" borderColor={"gray.300"}>
              <Text color={"secondary.200"}>No tasks</Text>
            </Center>
          )}
        </Stack>
        {isOver && (
          <Center
            border={"1px dashed"}
            borderColor={"primary.400"}
            opacity={0.8}
            bg={"primary.100"}
            pos={"absolute"}
            w={"94%"}
            h={"80%"}
            top={16}
            rounded={"lg"}
          >
            <Text>Drop Task here</Text>
          </Center>
        )}
      </Box>
      <AddTaskModal onClose={addOnClose} isOpen={addIsOpen} />
    </>
  );
};
