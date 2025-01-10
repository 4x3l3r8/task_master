import { Box, Center, Flex, Icon, IconButton, Image, Progress, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BiTrash } from "react-icons/bi";
import { LuUploadCloud } from "react-icons/lu";
import { toast } from "./Toast";

interface DropzoneProps {
  onFileAccepted: (acceptedFiles: File[] | string) => void;
  maxFiles?: number;
  multiple?: boolean;
  prevValue?: string | File;
  type?: "image" | "pdf" | "excel" | "all"
}

const fileTypeNameMatching = Object.freeze({
  image: { "image/*": [".png", ".jpg"] },  // put only accepted types
  pdf: { "appication/pdf": [".pdf"] },
  excel: { "text/csv": [".csv"], "application/xls": [".xlsx", ".xls"] },
  all: {
    "image/*": [],
    "application/pdf": [".pdf"],
  },
});

/**
 * The `Dropzone` function is a React component that allows users to drag and drop files, with options
 * for file type, maximum number of files, and multiple file selection.
 */
const Dropzone = ({
  onFileAccepted,
  maxFiles = 1,
  multiple = false,
  type = "image",
  prevValue,
}: DropzoneProps) => {
  const [files, setFiles] = useState<(File & { preview: string; path?: string })[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const updatedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(updatedFiles);
      onFileAccepted(updatedFiles);
    },
    accept: fileTypeNameMatching[type],
    maxFiles: maxFiles,
    multiple: multiple,
    onDropRejected: (rejectedFiles) => {
      toast({
        status: "warning",
        title: "Invalid file",
        description: `${rejectedFiles[0].file.name} is not a valid file`,
      });
    },
  });

  const dropText = isDragActive
    ? "Drop the files here ..."
    : <><Text as={"span"} color={"primary.500"}>Click to upload</Text> or drag and drop</>;

  const activeBg = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue(
    isDragActive ? "primary.300" : "gray.300",
    isDragActive ? "primary.500" : "gray.500"
  );


  useEffect(() => {
    return () => files?.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <Center
      w={"full"}
      p={4}
      cursor="pointer"
      bg={isDragActive ? activeBg : "transparent"}
      _hover={{ bg: activeBg }}
      transition="background-color 0.2s ease"
      borderRadius={12}
      border="1px solid"
      borderColor={borderColor}
      {...getRootProps()}
    >
      {/* <input {...formikFieldProps} {...getInputProps()} /> */}
      <input {...getInputProps()} />
      {files.length <= 0 && (prevValue === "" || !prevValue) && (
        <Box
          textAlign={"center"}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Icon as={LuUploadCloud} fontSize={22} mr={2} />
          <Text style={{ fontWeight: "bold", marginTop: "15px" }} color={"gray.500"} fontWeight={"normal !important"}>{dropText}</Text>
          <Text color={"gray.500"}>PNG or JPG</Text>
        </Box>
      )}
      {/* <aside style={thumbsContainer}>{thumbs}</aside> for multiple images*/}

      {files.length > 0 || prevValue ? (
        <Flex gap={3} alignItems={"center"} w={"full"}>
          <Flex w={"50%"} h={"126px"} overflow={"hidden"}>
            <Image rounded={"md"} w={"full"} objectFit={"cover"} src={files[0]?.preview ? files[0].preview : prevValue as string} onLoad={() => URL.revokeObjectURL(files[0]?.preview)} />
          </Flex>
          <Stack flex={1}>
            <Text fontWeight={"500"}>{files[0]?.name ?? "Image"}</Text>
            <Text color={"secondary.300"} fontWeight={"400"}>{(files[0]?.size ?? 22000 / 1024).toFixed(2)} KB</Text>
            <Flex alignItems={"center"} gap={1}>
              <Progress flex={1} value={100} rounded={"md"} size={"sm"} />
              <Text>100%</Text>
            </Flex>
          </Stack>
          <IconButton onClick={(e) => { e.stopPropagation(); setFiles([]); onFileAccepted("") }} variant={"ghost"} size={"lg"} colorScheme="gray" aria-label="delete image" icon={<Icon as={BiTrash} fontSize={24} />} />
        </Flex>
      ) : ""}
    </Center>
  );
};

Dropzone.propTypes = {
  onFileAccepted: PropTypes.func.isRequired,
  maxFiles: PropTypes.number,
  multiple: PropTypes.bool,
  type: PropTypes.string,
};

export { Dropzone };

