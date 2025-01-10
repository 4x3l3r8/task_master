import { Flex, FormControl, FormErrorMessage, FormLabel, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { Dropzone } from "../shared";
import { CategorySelect } from "./CategorySelect";
import { PriorityTagSelect } from "./PriorityTagSelect";
import { formValues } from "./types";

const today = new Date().toISOString().split("T");

export const TaskForm = ({ formik }: { formik: FormikProps<formValues> }) => {
  return (
    <Stack gap={4}>
      <FormControl isRequired isInvalid={formik.touched.name && Boolean(formik.errors.name)}>
        <FormLabel>Task Name</FormLabel>
        <Input id="name" name="name" onChange={formik.handleChange} value={formik.values.name} />
        <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={formik.touched.description && Boolean(formik.errors.description)}>
        <FormLabel display={"flex"}>
          Description{" "}
          <Text color={"gray.400"} fontWeight={"normal"} ml={1}>
            (Optional)
          </Text>
        </FormLabel>
        <Textarea resize={"none"} id="description" name="description" onChange={formik.handleChange} value={formik.values.description} />
        <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
      </FormControl>

      <PriorityTagSelect formik={formik} />

      {/* <FormControl isRequired isInvalid={formik.touched.category && Boolean(formik.errors.category)}>
        <FormLabel>Category</FormLabel>
        <Select placeholder="Select category" onChange={formik.handleChange} value={formik.values.category} id="category" name="category">
          {isLoading || !data ? (
            <>
              <Spinner />
            </>
          ) : (
            data.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          )}
        </Select>
      </FormControl> */}

      <CategorySelect formik={formik} />

      <FormControl isInvalid={formik.touched.image && Boolean(formik.errors.image)}>
        <FormLabel display={"flex"}>
          Upload cover{" "}
          <Text color={"gray.400"} fontWeight={"normal"} ml={1}>
            (Optional)
          </Text>
        </FormLabel>
        <Dropzone
          onFileAccepted={(file) => {
            formik.setFieldValue("image", file[0]);
          }}
          prevValue={formik.values.image}
          type="image"
        />
        <FormErrorMessage>{formik.errors.image}</FormErrorMessage>
      </FormControl>

      <Flex gap={4}>
        <FormControl isRequired isInvalid={formik.touched.deadline && Boolean(formik.errors.deadline)}>
          <FormLabel>Deadline</FormLabel>
          <Input type="date" min={today[0]} id="deadline" name="deadline" onChange={formik.handleChange} value={formik.values.deadline} />
          <FormErrorMessage>{formik.errors.deadline}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={formik.touched.time && Boolean(formik.errors.time)}>
          <FormLabel>Time</FormLabel>
          <Input type="time" min={today[1]} id="time" name="time" onChange={formik.handleChange} value={formik.values.time} />
          <FormErrorMessage>{formik.errors.time}</FormErrorMessage>
        </FormControl>
      </Flex>
    </Stack>
  );
};
