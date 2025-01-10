import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import { TaskModalProps } from "./AddTaskModal"
import { useRef } from "react"
import { useDeleteTaskMutation } from "@/redux/services/task.api"
import { toast } from "../shared"

export const DeleteTaskAlert = ({ isOpen, onClose, taskId }: TaskModalProps & { taskId: number }) => {
    const cancelRef = useRef(null)
    const [deleteTask, { isLoading }] = useDeleteTaskMutation()

    const handleDelete = () => {
        deleteTask({ taskId }).unwrap().then(() => {
            toast({
                status: "success",
                title: "Operation Successful",
                description: "Task Deleted!"
            })
            onClose()
        }).catch(() => {
            toast({
                status: "error",
                title: "Operation Failed",
                description: "Task Deletion Failed!"
            })
        })
    }

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete Task
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} variant={"ghost"} colorScheme="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button isLoading={isLoading} colorScheme='red' onClick={handleDelete} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}
