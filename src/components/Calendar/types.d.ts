export interface formValues {
  name: string;
  description?: string;
  priority: Priority | "";
  image?: File | string;
  deadline: string;
  time: string;
}

export type Priority = "low" | "medium" | "high";

export type taskStatus = "To do" | "In progress" | "Completed";

type Task = formValues & { id: number; status: taskStatus };
