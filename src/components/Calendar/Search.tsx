import { Icon, Input, InputGroup, InputLeftAddon, InputProps } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi'

export const Search = ({
    initialValue,
    onValueChange,
    debounce = 500,
    ...props
}: { debounce?: number; onValueChange: (value: string) => void, initialValue: string } & InputProps) => {

    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onValueChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value, onValueChange, debounce]);

    return (
        <InputGroup alignSelf={"right"} flex={1}>
            <InputLeftAddon bg={"transparent"} borderRight={"none"}>
                <Icon as={BiSearch} />
            </InputLeftAddon>
            <Input type="text" borderLeft={"none"} {...props} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search" />
        </InputGroup>
    )
}
