import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  useMergeRefs,
} from '@chakra-ui/react'
import { forwardRef, useRef } from 'react'

export const EmailField = forwardRef<
  HTMLInputElement,
  InputProps & { errormsg?: string }
>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const mergeRef = useMergeRefs(inputRef, ref)

  return (
    <FormControl isInvalid={!!props.errormsg}>
      <FormLabel htmlFor="email">Email</FormLabel>
      <InputGroup>
        <Input
          id="email"
          ref={mergeRef}
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </InputGroup>
      {props.errormsg && <FormErrorMessage>{props.errormsg}</FormErrorMessage>}
    </FormControl>
  )
})

EmailField.displayName = 'EmailField'
