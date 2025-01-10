import { Card, CardBody, CardFooter, Flex, Heading, HStack, Icon, IconButton, Image, MenuButton, Skeleton, Text, useDisclosure } from "@chakra-ui/react"
import { FiMoreHorizontal } from "react-icons/fi"
import { DeleteTaskAlert } from "./DeleteTaskAlert"
import { EditTaskModal } from "./EditTaskModal"
import { Flag } from "./Flags"
import { PriorityTag } from "./PriorityTag"
import { TaskCardMenu } from "./TaskCardMenu"
import { Priority, Task } from "./types"
import { useDrag } from "react-dnd"
import { isDateOverdue } from "@/utils/helpers"

export const TaskCard = ({ task }: { task: Task }) => {
    const { isOpen: editIsOpen, onClose: editOnClose, onOpen: editOnOpen } = useDisclosure()
    const { isOpen: deleteIsOpen, onClose: deleteOnClose, onOpen: deleteOnOpen } = useDisclosure()

    const [{ isDragging }, drag] = useDrag({
        type: "Task",
        item: task,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    })

    const getFlagStatus: () => "completed" | "overdue" | "new" = () => {
        if (task.status === "Completed") {
            return "completed"
        } else if (isDateOverdue(task.deadline)) {
            return "overdue"
        } else {
            return "new"
        }
    }

    return (
        <>
            <Card opacity={isDragging ? 0 : 1} pos={isDragging ? "absolute" : "initial"} ref={drag} cursor={isDragging ? "grabbing" : "default"}>
                <CardBody p={"16px"}>
                    <PriorityTag priority={task.priority as Priority} />
                    <HStack justifyContent={"space-between"} mt={3}>
                        <Heading fontSize={"16px"} fontWeight={"500"}>{task.name}</Heading>

                        <TaskCardMenu deleteOnOpen={deleteOnOpen} editOnOpen={editOnOpen}>
                            <MenuButton as={IconButton} colorScheme="gray" shadow={"sm"} variant={"outline"} size={"xs"} aria-label="Task actions" icon={<Icon as={FiMoreHorizontal} fontSize={16} />} />
                        </TaskCardMenu>
                    </HStack>
                    {task.image && <Image fallback={<Skeleton w={"full"} h={"125px"} mt={2} />} src={task.image as string} mt={2} rounded={"md"} h={"125px"} w={"full"} objectFit={"cover"} />}
                    {task.description && <Text>
                        {task.description}
                    </Text>}
                </CardBody>
                <CardFooter justifyContent={"space-between"} pt={0}>
                    <Flex alignItems={"center"} gap={3}>
                        <Flag status={getFlagStatus()} />
                        <Text color={"#6E7C87"} fontSize={"12px"}>{task.deadline}</Text>
                    </Flex>
                    <Text color={"#6E7C87"}>{task.time}</Text>
                </CardFooter>
            </Card>
            <EditTaskModal task={task} isOpen={editIsOpen} onClose={editOnClose} />
            <DeleteTaskAlert isOpen={deleteIsOpen} taskId={task.id} onClose={deleteOnClose} />
        </>
    )
}
