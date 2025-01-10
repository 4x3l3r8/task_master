import { Center, Heading, Text } from "@chakra-ui/react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout } from "./components/layouts";
import { Calendar } from "./pages";

const Routes = createBrowserRouter(
    [
        {
            children: [
                {
                    element: <Navigate to={"/calendar"} replace />,
                    path: "/"
                },
                {
                    element: <AuthLayout />,
                    children: [
                        {
                            path: "/calendar",
                            element: <Calendar />
                        }
                    ]
                }
            ],
            errorElement: <Center h={"100vh"} w={"100vw"} fontSize={"xl"} color={"red"}><Text>An Error Occurred!!</Text></Center>
        },
        {
            path: "*",
            element: (<Center h={"100vh"} w={"100vw"} fontSize={"xl"} flexDir={"column"} color={"red"}>
                <Heading fontSize={"9xl"} color={"red.700"}>404</Heading>
                <Text>Page Not Found</Text>
            </Center>)
        }
    ]
)

export default Routes