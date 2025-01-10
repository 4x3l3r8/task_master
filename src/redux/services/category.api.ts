import { Category } from "@/components/Calendar/types";
import { loadCategoriesFromStorage, saveCategoriesToStorage } from "@/utils/helpers";
import { baseApi } from "./api";

let categories: Category[] = loadCategoriesFromStorage();

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      queryFn: () => {
        return { data: categories };
      },
      providesTags: ["Category"],
    }),

    addCategory: builder.mutation<Category, { id: number; name: string }>({
      queryFn: async ({ id, name }) => {
        const newCategory: Category = { id, name };
        categories = [...categories, newCategory];
        saveCategoriesToStorage(categories);
        return { data: newCategory };
      },
      invalidatesTags: ["Category"],
    }),
  }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation } = categoryApi;
