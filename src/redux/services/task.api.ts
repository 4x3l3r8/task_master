import { formValues, Task, taskStatus } from "@/components/Calendar/types";
import { baseApi } from "./api";
import { loadTasksFromStorage, saveTasksToStorage, simulateImageUpload } from "@/utils/helpers";

let tasks: Task[] = loadTasksFromStorage();

const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      queryFn: () => {
        return { data: tasks };
      },
      providesTags: ["Task"],
    }),

    addTask: builder.mutation<Task, formValues>({
      queryFn: async (task) => {
        let imageUrl: string | undefined;

        if (task.image && typeof task.image !== "string") {
          imageUrl = await simulateImageUpload(task.image);
        } else if (task.image && typeof task.image === "string") {
          // check not necessary but 🤷‍♂️ edges
          imageUrl = task.image;
        } else {
          imageUrl = undefined;
        }

        const newTask: Task = { ...task, id: Date.now(), image: imageUrl, status: "To do" };
        tasks = [...tasks, newTask];
        saveTasksToStorage(tasks);
        return { data: newTask };
      },
      invalidatesTags: ["Task"],
    }),

    moveTask: builder.mutation<Task, { taskId: number; newStatus: taskStatus }>({
      queryFn: ({ taskId, newStatus }) => {
        const taskIndex = tasks.findIndex((t) => t.id === taskId);
        if (taskIndex === -1) {
          return { error: { status: 404, data: "Task not found" } };
        }
        const updatedTask = { ...tasks[taskIndex], status: newStatus };
        tasks[taskIndex] = updatedTask;
        saveTasksToStorage(tasks);
        return { data: updatedTask };
      },
      invalidatesTags: ["Task"],
    }),

    deleteTask: builder.mutation<object, { taskId: number }>({
      queryFn: ({ taskId }) => {
        const taskIndex = tasks.findIndex((t) => t.id === taskId);
        if (taskIndex === -1) {
          return { error: { status: 404, data: "Task not found" } };
        }

        tasks.splice(taskIndex, 1);
        saveTasksToStorage(tasks);
        return { data: {} };
      },
      invalidatesTags: ["Task"],
    }),

    editTask: builder.mutation<Task, Task>({
      queryFn: async (updatedtask) => {
        let imageUrl: string | undefined;
        if (updatedtask.image && typeof updatedtask.image !== "string") {
          imageUrl = await simulateImageUpload(updatedtask.image);
        } else if (updatedtask.image && typeof updatedtask.image === "string") {
          imageUrl = updatedtask.image;
        } else {
          imageUrl = undefined;
        }

        const taskIndex = tasks.findIndex((t) => t.id === updatedtask.id);

        if (taskIndex === -1) {
          return { error: { status: 404, data: "Task not found" } };
        }

        const newTask = { ...updatedtask, image: imageUrl };
        tasks[taskIndex] = newTask;
        saveTasksToStorage(tasks);
        return { data: newTask };
      },
      invalidatesTags: ["Task"],
    }),
  }),
});

export const { useGetTasksQuery, useAddTaskMutation, useMoveTaskMutation, useDeleteTaskMutation, useEditTaskMutation } = taskApi;
