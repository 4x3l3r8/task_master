import { TaskFormValidation, TaskModalProps } from "./AddTaskModal"
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { TaskForm } from "./TaskForm"
import { FormikHelpers, useFormik } from "formik"
import { formValues, Task } from "./types"
import { useEditTaskMutation } from "@/redux/services/task.api"
import { toast } from "../shared"



export const EditTaskModal = ({ isOpen, onClose, task }: TaskModalProps & { task: Task }) => {
    const [editTask, { isLoading }] = useEditTaskMutation()

    const handleSubmit = (values: formValues, formHelpers: FormikHelpers<formValues>) => {
        editTask({ ...values, id: task.id, status: task.status }).unwrap().then(() => {
            toast({
                status: "success",
                title: "Operation Successful",
                description: "Task has been updated!!"
            })
            onClose()
            formHelpers.resetForm()
        }).catch((e) => {
            toast({
                status: "error",
                title: "Operation Failed",
                description: "Failed to add new Task!!"
            })
            console.log(e)
        })
    }

    const formikHandler = useFormik<formValues>({
        initialValues: {
            name: task.name,
            description: task.description,
            priority: task.priority,
            deadline: task.deadline,
            time: task.time,
            image: task.image
        },
        enableReinitialize: true,
        validationSchema: TaskFormValidation,
        onSubmit: handleSubmit
    })

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
            <ModalOverlay />
            <ModalContent>
                <Box as="form" onSubmit={formikHandler.handleSubmit}>
                    <ModalHeader>Edit Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <TaskForm formik={formikHandler} />
                    </ModalBody>

                    <ModalFooter>
                        <Button isLoading={isLoading} w={"full"} type="submit">
                            Update
                        </Button>
                    </ModalFooter>
                </Box>
            </ModalContent>
        </Modal>
    )
}
