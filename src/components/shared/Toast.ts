import { createStandaloneToast } from "@chakra-ui/react";

export const { toast } = createStandaloneToast({
  defaultOptions: {
    position: "top-right",
    variant: "top-accent",
  },
});
