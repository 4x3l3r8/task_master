import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "./theme"
import PropTypes from "prop-types"
import React from "react"

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
    )
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
}