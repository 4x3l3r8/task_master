import {
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  MenuButton,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";
import { DeleteTaskAlert } from "./DeleteTaskAlert";
import { EditTaskModal } from "./EditTaskModal";
import { Flag } from "./Flags";
import { PriorityTag } from "./PriorityTag";
import { TaskCardMenu } from "./TaskCardMenu";
import { Priority, Task } from "./types";
import { useDrag, useDrop } from "react-dnd";
import { isDateOverdue } from "@/utils/helpers";
import { useRef } from "react";

export const TaskCard = ({ task, moveCard }: { task: Task; moveCard: (dragIndex: number, hoverIndex: number) => void }) => {
  const { isOpen: editIsOpen, onClose: editOnClose, onOpen: editOnOpen } = useDisclosure();
  const { isOpen: deleteIsOpen, onClose: deleteOnClose, onOpen: deleteOnOpen } = useDisclosure();

  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "Task",
    item: task,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop<Task, void, { handlerId: unknown | null }>({
    accept: "Task",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: Task, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = task.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as DOMRect).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const getFlagStatus: () => "completed" | "overdue" | "new" = () => {
    if (task.status === "Completed") {
      return "completed";
    } else if (isDateOverdue(task.deadline)) {
      return "overdue";
    } else {
      return "new";
    }
  };

  drag(drop(ref));

  return (
    <>
      <Card
        opacity={isDragging ? 0 : 1}
        pos={isDragging ? "absolute" : "initial"}
        ref={ref}
        cursor={isDragging ? "grabbing" : "grab"}
        data-handler-id={handlerId}
      >
        <CardBody p={"16px"}>
          <PriorityTag priority={task.priority as Priority} />
          <HStack justifyContent={"space-between"} mt={3}>
            <Heading fontSize={"16px"} fontWeight={"500"}>
              {task.name}
            </Heading>

            <TaskCardMenu deleteOnOpen={deleteOnOpen} editOnOpen={editOnOpen}>
              <MenuButton
                as={IconButton}
                colorScheme="gray"
                shadow={"sm"}
                variant={"outline"}
                size={"xs"}
                aria-label="Task actions"
                icon={<Icon as={FiMoreHorizontal} fontSize={16} />}
              />
            </TaskCardMenu>
          </HStack>
          {task.image && (
            <Image
              fallback={<Skeleton w={"full"} h={"125px"} mt={2} />}
              src={task.image as string}
              mt={2}
              rounded={"md"}
              h={"125px"}
              w={"full"}
              objectFit={"cover"}
            />
          )}
          {task.description && <Text>{task.description}</Text>}
        </CardBody>
        <CardFooter justifyContent={"space-between"} pt={0}>
          <Flex alignItems={"center"} gap={3}>
            <Flag status={getFlagStatus()} />
            <Text color={"#6E7C87"} fontSize={"12px"}>
              {task.deadline}
            </Text>
          </Flex>
          <Text color={"#6E7C87"}>{task.time}</Text>
        </CardFooter>
      </Card>
      <EditTaskModal task={task} isOpen={editIsOpen} onClose={editOnClose} />
      <DeleteTaskAlert isOpen={deleteIsOpen} taskId={task.id} onClose={deleteOnClose} />
    </>
  );
};
