import { Box, Spinner as ChakraSpinner, keyframes } from '@chakra-ui/react';
import PropTypes from "prop-types";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(0.8); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(0.8); opacity: 0.5; }
`;

const CustomSpinner = ({ size = '60px', color = 'primary.600' }) => {
    return (
        <Box
            position="relative"
            width={size}
            height={size}
            animation={`${pulse} 2s ease-in-out infinite`}
        >
            <ChakraSpinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color={color}
                size={size}
                position="absolute"
                top="0"
                left="0"
                animation={`${spin} 1.5s linear infinite`}
            />
            <ChakraSpinner
                thickness="4px"
                speed="0.9s"
                emptyColor="transparent"
                color={color}
                size={size}
                position="absolute"
                top="0"
                left="0"
                animation={`${spin} 2s ease-in-out infinite reverse`}
            />
        </Box>
    );
};

CustomSpinner.propTypes = {
    size: PropTypes.string,
    color: PropTypes.string,
}

export { CustomSpinner };