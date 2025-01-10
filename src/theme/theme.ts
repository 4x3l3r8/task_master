import { extendTheme, ThemeComponentProps, ThemeConfig, withDefaultColorScheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

export const theme = extendTheme(
  {
    fonts: {
      heading: `"SF Pro Display", sans-serif`,
      body: `"Inter", sans-serif`,
    },
    colors: {
      primary: {
        50: "#e8dcff",
        100: "#d0bafe",
        200: "#b698fc",
        300: "#9977f9",
        400: "#7957f6",
        500: "#4f35f3",
        600: "#452ec6", // Your specified button color
        700: "#3b279b",
        800: "#301f72",
        900: "#24184c",
        // 900: "#171028",
      },
      secondary: {
        50: "#e6eaed",
        100: "#c1ccd3",
        200: "#98adb8",
        300: "#6f8e9d",
        400: "#4b7082",
        500: "#275267",
        600: "#03334d",
        700: "#022b42",
        800: "#001e2f",
        900: "#001727", // Your specified heading color
      },
    },
    components: {
      Button: {
        baseStyle: {
          fontWeight: 500,
        },
        variants: {
          ghost: (props: ThemeComponentProps) => {
            return {
              color: props.colorMode === "dark" ? `${props.colorScheme}.200` : `${props.colorScheme}.500`,
            };
          },
          solid: (props: ThemeComponentProps) => ({
            color: props.colorMode === "dark" ? `${props.colorScheme}.50` : `${props.colorScheme}.50`,
          }),
        },
      },
      Heading: {
        baseStyle: (props: ThemeComponentProps) => ({
          color: props.colorMode === "dark" ? "gray.100" : "secondary.900",
        }),
      },
      Text: {
        baseStyle: (props: ThemeComponentProps) => ({
          color: props.colorMode === "dark" ? "gray.300" : "secondary.900",
        }),
      },
    },
    styles: {
      global: (props: ThemeComponentProps) => {
        return {
          html: {
            scrollBehavior: "smooth",
            boxSizing: "border-box",
          },
          body: {
            boxSizing: "border-box",
            overflowX: "hidden",
            bg: props.colorMode === "dark" ? "gray.800" : "white",
            // color: props.colorMode === "dark" ? "gray.100" : "secondary.900",
          },
        };
      },
    },
    config,
  },
  withDefaultColorScheme({ colorScheme: "primary" })
);
