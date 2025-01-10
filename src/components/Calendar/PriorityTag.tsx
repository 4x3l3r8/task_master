import { Tag, TagLabel } from '@chakra-ui/react'
import { Priority } from './types'

export const PriorityTag = ({ priority }: { priority: Priority }) => {
    const colorScheme = () => {
        switch (priority) {
            case "low":
                return "red"
            case "medium":
                return "messenger"
            case "high":
                return "whatsapp"
            default:
                return "gray"
        }
    }

    return (
        <Tag variant='subtle' colorScheme={colorScheme()}>
            <TagLabel>{priority.toUpperCase()}</TagLabel>
        </Tag>
    )
}
