import { Menu, MenuItem, MenuList } from "@chakra-ui/react"
import { ReactNode } from "react"

interface TaskCardMenuProps {
    deleteOnOpen: () => void
    editOnOpen: () => void
    children: ReactNode
}

export const TaskCardMenu = ({ children, deleteOnOpen, editOnOpen }: TaskCardMenuProps) => {
    return (
        <Menu size={"xs"}>
            {/* <MenuButton as={Button} rightIcon={<IoChevronDownCircleOutline />}>
                Actions
            </MenuButton> */}
            {children}
            <MenuList w={"24"}>
                <MenuItem onClick={editOnOpen}>Edit</MenuItem>
                <MenuItem color={"red"} onClick={deleteOnOpen}>Delete</MenuItem>
            </MenuList>
        </Menu>
    )
}
