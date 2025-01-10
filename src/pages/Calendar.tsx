import { DropColumn, Search } from "@/components/Calendar";
import { Task } from "@/components/Calendar/types";
import { useGetTasksQuery } from "@/redux/services/task.api";
import { searchTasks } from "@/utils/helpers";
import { Box, ButtonGroup, Flex, Heading, HStack, Icon, IconButton, Skeleton } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export const Calendar = () => {
  const { data: tasks, isLoading } = useGetTasksQuery();

  const [searchValue, setSearchValue] = useState("");

  const filteredTasks = useMemo(() => {
    return searchTasks(tasks as Task[], searchValue);
  }, [tasks, searchValue]);

  const todoTasks = filteredTasks?.filter((task) => task.status === "To do") || [];
  const inProgressTasks = filteredTasks?.filter((task) => task.status === "In progress") || [];
  const completedTasks = filteredTasks?.filter((task) => task.status === "Completed") || [];

  return (
    <Box w={"full"}>
      <HStack w={"full"} flexDir={{ base: "column", md: "row" }}>
        <Flex w={"full"} gap={6} flex={3} justifyContent={{ base: "space-between", md: "start" }}>
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>2 August 2023</Heading>
          <ButtonGroup gap={3} variant={"outline"} colorScheme="blackAlpha">
            <IconButton aria-label="previous day" rounded={"full"} size={{ base: "sm", md: "md" }} icon={<Icon as={FiArrowLeft} color={"black"} />} />
            <IconButton aria-label="next day" rounded={"full"} size={{ base: "sm", md: "md" }} icon={<Icon as={FiArrowRight} color={"black"} />} />
          </ButtonGroup>
        </Flex>

        <Search initialValue={searchValue} onValueChange={(value) => setSearchValue(value)} />
      </HStack>

      {!isLoading && tasks ? (
        <DndProvider backend={HTML5Backend}>
          <Flex mt={4} gap={4} justifyContent={"space-between"} maxW={{ base: "full" }} overflowX={"scroll"}>
            <DropColumn title="To do" tasks={todoTasks} />
            <DropColumn title="In progress" tasks={inProgressTasks} />
            <DropColumn title="Completed" tasks={completedTasks} />
          </Flex>
        </DndProvider>
      ) : (
        <Flex mt={4} justifyContent={"space-between"}>
          {new Array(3).fill("").map((_, i) => (
            <Skeleton key={i} w={"30.33%"} h={"50vh"} />
          ))}
        </Flex>
      )}
    </Box>
  );
};
