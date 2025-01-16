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

    addCategory: builder.mutation<Category, { name: string }>({
      queryFn: async ({ name }) => {
        if (categories.find((category) => category.name.toLowerCase() === name.toLowerCase())) {
          return { error: { status: 400, data: "Category already exists" } };
        }
        const newCategory: Category = { id: Date.now(), name };
        categories = [...categories, newCategory];
        saveCategoriesToStorage(categories);
        return { data: newCategory };
      },
      invalidatesTags: ["Category"],
    }),
  }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation } = categoryApi;
