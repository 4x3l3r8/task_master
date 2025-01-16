import { Box, Center, Heading, HStack, IconButton, Stack, Tag, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { PiPlus } from "react-icons/pi";
import { AddTaskModal } from "./AddTaskModal";
import { TaskCard } from "./TaskCard";
import { Task, taskStatus } from "./types";
import { useDrop } from "react-dnd";
import { useMoveTaskMutation, useReorderTasksMutation } from "@/redux/services/task.api";
import { toast } from "../shared";
import update from "immutability-helper";
import { useCallback } from "react";

interface DropColumnProps {
  title: taskStatus;
  tasks: Task[];
}

export const DropColumn = ({ title, tasks }: DropColumnProps) => {
  const [moveTask] = useMoveTaskMutation();
  const [reorder] = useReorderTasksMutation();
  const { isOpen: addIsOpen, onClose: addOnClose, onOpen: addOnOpen } = useDisclosure();

  /**
   * The `handleMove` function moves a task to a new status and displays a success message using a toast
   * notification.
   * @param {number} id - The `id` parameter in the `handleMove` function is a number that represents the
   * unique identifier of the task that is being moved.
   */
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

  /* The `moveCard` function defined using `useCallback` is responsible for updating the order of tasks
when a task card is dragged and dropped within the same column. */
  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    reorder({
      tasks: update(tasks, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, tasks[dragIndex] as Task],
        ],
      }),
    });
    console.log("reordered");
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "Task",
    drop: (dragItem: Task) => {
      handleMove(dragItem.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const bg = useColorModeValue(isOver ? "primary.50" : "#F5F7F9", isOver ? "primary.50" : "#7D8996");
  return (
    <>
      <Box w={{ md: "30.33%" }} bg={bg} rounded={"lg"} p={3} minW={"20rem"} h={"fit-content"} pos={"relative"} ref={drop}>
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
            return <TaskCard task={task} key={i} moveCard={moveCard} />;
          })}
          {tasks.length < 1 && (
            <Center
              rounded={"md"}
              mt={3}
              p={4}
              h={"72"}
              border="1px dashed"
              bg={isOver ? "primary.100" : "slate.300"}
              borderColor={isOver ? "primary.400" : "gray.300"}
            >
              <Text color={isOver ? "primary.400" : "secondary.200"}>{isOver ? "Drop Task here" : "No tasks yet"}</Text>
            </Center>
          )}
        </Stack>
        {/* {isOver && (
          <Center
            border={"1px dashed"}
            borderColor={"primary.400"}
            opacity={0.8}
            bg={"primary.100"}
            pos={"absolute"}
            w={"94%"}
            h={"80%"}
            bottom={0}
            rounded={"lg"}
          >
            <Text>Drop Task here</Text>
          </Center>
        )} */}
      </Box>
      <AddTaskModal onClose={addOnClose} isOpen={addIsOpen} />
    </>
  );
};
