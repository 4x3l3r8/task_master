import { useAddCategoryMutation, useGetCategoriesQuery } from "@/redux/services/category.api";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { AutoComplete, AutoCompleteCreatable, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from "@choc-ui/chakra-autocomplete";
import { FormikProps } from "formik";
import { toast } from "../shared";
import { formValues } from "./types";

export const CategorySelect = ({
  formik: {
    setFieldValue,
    values,
    errors: { category: categoryError },
    touched: { category: categoryTouched },
    handleBlur,
  },
}: {
  formik: FormikProps<formValues>;
}) => {
  const { data, isLoading, refetch } = useGetCategoriesQuery(null);
  const [addCategory, { isLoading: addCategoryIsLoading }] = useAddCategoryMutation();

  return (
    <FormControl isRequired isInvalid={categoryTouched && Boolean(categoryError)}>
      <FormLabel>Category</FormLabel>
      <AutoComplete
        focusInputOnSelect={false}
        restoreOnBlurIfEmpty={false}
        isLoading={isLoading || addCategoryIsLoading}
        filter={(query, _optionValue, optionLabel) => optionLabel.toLowerCase().includes(query.toLowerCase())}
        onSelectOption={({ isNewInput, item }) => {
          if (isNewInput) {
            addCategory({ name: item.value })
              .unwrap()
              .then(() => {
                refetch();
                toast({ status: "success", title: "Category added successfully" });
              })
              .catch((err) => {
                console.log(err);
                toast({ status: "error", title: "Failed to add category", description: err.data });
              });
          } else {
            setFieldValue("category", item.value);
            // handleBlur();
          }
        }}
        value={values.category}
        onChange={(value) => setFieldValue("category", value)}
        openOnFocus={false}
        creatable
      >
        <AutoCompleteInput onBlur={handleBlur} placeholder="Start typing to select category" />
        <AutoCompleteList>
          {!isLoading &&
            data &&
            data.map((category, cid) => (
              <AutoCompleteItem key={`option-${cid}`} label={category.name} value={category} textTransform="capitalize">
                {category.name}
              </AutoCompleteItem>
            ))}
          <AutoCompleteCreatable alwaysDisplay={false}>{({ value }: { value: string }) => <>Create new '{value}' category</>}</AutoCompleteCreatable>
        </AutoCompleteList>
      </AutoComplete>
      <FormErrorMessage>{String(categoryError)}</FormErrorMessage>
    </FormControl>
  );
};
