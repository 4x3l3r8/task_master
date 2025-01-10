import { Category, Task } from "@/components/Calendar/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const simulateImageUpload = (_file: File): Promise<string> => {
  // replace with a dummy image so as not to fill up local storage on time
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate a fake URL or ID
      //   const fakeUrl = `https://fake-image-host.com/${file.name}-${Date.now()}.jpg`;
      const fakeUrl = `https://picsum.photos/id/${Date.now() % 1000}/1980`;
      resolve(fakeUrl);
    }, 1000); // Simulate upload time
  });
};

const STORAGE_KEY = "taskManagerTasks";

export const loadTasksFromStorage = (): Task[] => {
  const storedTasks = localStorage.getItem(STORAGE_KEY);
  return storedTasks ? JSON.parse(storedTasks) : [];
};

export const saveTasksToStorage = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const searchTasks = (tasks: Task[], searchTerm: string): Task[] => {
  const lowercasedTerm = searchTerm.toLowerCase().trim();

  // get today's tasks by parsing their IDs since it is the dateTime that is used as the Id
  const todaysTasks = tasks?.filter((task) => {
    const taskDate = new Date(task.id);
    const today = new Date();
    return taskDate.toDateString() === today.toDateString();
  });

  // Search in today's tasks only
  return todaysTasks?.filter((task) => {
    // Search in name
    if (task.name.toLowerCase().includes(lowercasedTerm)) return true;

    // Search in description (if it exists)
    if (task.description?.toLowerCase().includes(lowercasedTerm)) return true;

    // Search in priority
    if (task.priority.toLowerCase().includes(lowercasedTerm)) return true;

    // Search in status
    if (task.status.toLowerCase().includes(lowercasedTerm)) return true;

    // Search in deadline (assuming it's a string in a searchable format)
    if (task.deadline.toLowerCase().includes(lowercasedTerm)) return true;

    // Search in time
    if (task.time.toLowerCase().includes(lowercasedTerm)) return true;

    // If the search term is a valid date, compare it with the deadline
    const searchDate = new Date(searchTerm);
    if (!isNaN(searchDate.getTime())) {
      const taskDate = new Date(task.deadline);
      if (taskDate.toDateString() === searchDate.toDateString()) return true;
    }

    return false;
  });
};

export const isDateOverdue = (dateString: string) => {
  // Convert the date string (YYYY-MM-DD) to a Date object
  const inputDate = new Date(dateString);

  // Get today's date
  const today = new Date();

  // Set the time of today's date to 00:00:00 to compare only the date part
  today.setHours(0, 0, 0, 0);

  // Compare the dates
  return inputDate < today;
};

export const loadCategoriesFromStorage = (): Category[] => {
  const storedCategories = localStorage.getItem("taskManagerCategories");
  return storedCategories ? JSON.parse(storedCategories) : [];
};

export const saveCategoriesToStorage = (categories: Category[]): void => {
  localStorage.setItem("taskManagerCategories", JSON.stringify(categories));
};
