export interface Category {
  id: number;
  name: string;
}

export interface formValues {
  name: string;
  description?: string;
  priority: Priority | "";
  category: Category["id"];
  image?: File | string;
  deadline: string;
  time: string;
}

export type Priority = "low" | "medium" | "high";

export type taskStatus = "To do" | "In progress" | "Completed";

type Task = formValues & { id: number; status: taskStatus };
