import { DropColumn, Search } from "@/components/Calendar";
import { Task } from "@/components/Calendar/types";
import { useGetTasksQuery } from "@/redux/services/task.api";
import { searchTasks } from "@/utils/helpers";
import { Box, ButtonGroup, Flex, Heading, HStack, Icon, IconButton, Progress, Skeleton, Text, VStack } from "@chakra-ui/react";
import { addDays, format, isSameDay, subDays } from "date-fns";
import { useMemo, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export const Calendar = () => {
  const { data: tasks, isLoading } = useGetTasksQuery();
  const [searchValue, setSearchValue] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  const formattedDate = useMemo(() => format(currentDate, "d MMMM yyyy"), [currentDate]);

  const filteredTasks = useMemo(() => {
    return searchTasks(tasks as Task[], searchValue);
  }, [tasks, searchValue]);

  const todoTasks = filteredTasks?.filter((task) => task.status === "To do") || [];
  const inProgressTasks = filteredTasks?.filter((task) => task.status === "In progress") || [];
  const completedTasks = filteredTasks?.filter((task) => task.status === "Completed") || [];

  // Handle "Previous" button
  const goToYesterday = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  // Handle "Next" button
  const goToTomorrow = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  const yesterday = subDays(new Date(), 1);
  const tomorrow = addDays(new Date(), 1);

  const completedPercentage = useMemo(() => {
    const completedCount = tasks?.filter((task) => task.status === "Completed").length || 0;
    const totalCount = tasks?.length || 0;
    return totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  }, [tasks]);

  return (
    <Box w={"full"}>
      <HStack w={"full"} flexDir={{ base: "column", md: "row" }}>
        <Flex w={"full"} gap={6} flex={3} justifyContent={{ base: "space-between", md: "start" }}>
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>{formattedDate}</Heading>
          <ButtonGroup gap={3} variant={"outline"} colorScheme="blackAlpha">
            <IconButton
              aria-label="previous day"
              colorScheme="primary"
              isDisabled={isSameDay(currentDate, yesterday)}
              variant={"ghost"}
              onClick={goToYesterday}
              rounded={"full"}
              size={{ base: "sm", md: "md" }}
              icon={<Icon as={FiArrowLeft} />}
            />
            <IconButton
              aria-label="next day"
              colorScheme="primary"
              onClick={goToTomorrow}
              isDisabled={isSameDay(currentDate, tomorrow)}
              variant={"ghost"}
              rounded={"full"}
              size={{ base: "sm", md: "md" }}
              icon={<Icon as={FiArrowRight} />}
            />
          </ButtonGroup>
        </Flex>

        <Search initialValue={searchValue} onValueChange={(value) => setSearchValue(value)} />
      </HStack>

      <HStack my={4}>
        <VStack gap={0}>
          <Heading fontSize={"lg"}>
            {completedTasks.length}/{tasks?.length}
          </Heading>
          <Text>completed</Text>
        </VStack>
        <Progress flex={1} colorScheme="green" size={"sm"} rounded={"full"} value={completedPercentage} />
      </HStack>

      {!isLoading && tasks ? (
        <DndProvider backend={HTML5Backend}>
          <Flex mt={4} gap={4} justifyContent={"space-between"} maxW={"calc(100)"} overflowX={"scroll"}>
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
