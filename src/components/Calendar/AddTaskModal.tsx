import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { FormikHelpers, useFormik } from "formik";
import { mixed, object, string } from "yup";
import { TaskForm } from "./TaskForm";
import { formValues } from "./types";
import { useAddTaskMutation } from "@/redux/services/task.api";
import { toast } from "../shared";

export interface TaskModalProps {
    onClose: () => void;
    isOpen: boolean
}

export const TaskFormValidation = object().shape({
    name: string().required("This field is required"),
    description: string(),
    deadline: string().required("This field is required"),
    time: string().required("This field is required"),
    priority: string().required("This field is required"),
    file: mixed()
})


export const AddTaskModal = ({ isOpen, onClose }: TaskModalProps) => {
    const [addTask, { isLoading }] = useAddTaskMutation()

    const handleSubmit = (values: formValues, formHelpers: FormikHelpers<formValues>) => {
        addTask(values).unwrap().then(() => {
            toast({
                status: "success",
                title: "Operation Successful",
                description: "New Task has been added!!"
            })
            onClose()
            formHelpers.resetForm()
        }).catch(() => {
            toast({
                status: "error",
                title: "Operation Failed",
                description: "Failed to add new Task!!"
            })
        })
    }

    const formikHandler = useFormik<formValues>({
        initialValues: {
            name: "",
            description: "",
            priority: "",
            deadline: "",
            time: "",
            image: ""
        },
        validationSchema: TaskFormValidation,
        onSubmit: handleSubmit
    })

    const handleClose = () => {
        formikHandler.resetForm()
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} size={"2xl"}>
            <ModalOverlay />
            <ModalContent>
                <Box as="form" onSubmit={formikHandler.handleSubmit} >
                    <ModalHeader>Add Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <TaskForm formik={formikHandler} />
                    </ModalBody>

                    <ModalFooter>
                        <Button w={"full"} isLoading={isLoading} type="submit">Update</Button>
                    </ModalFooter>
                </Box>
            </ModalContent>
        </Modal>
    )
}
