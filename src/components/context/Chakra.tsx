import '@fontsource/inter/variable.css'

import { extendTheme } from '@chakra-ui/react'
import { yupFieldResolver, yupResolver } from '@saas-ui/forms/yup'
import { Form, SaasProvider, theme as baseTheme } from '@saas-ui/react'
import type { ReactNode } from 'react'
import { AnyObjectSchema } from 'yup'

import theme from '@/theme'
Form.getResolver = (schema: AnyObjectSchema) => yupResolver(schema) // @hookform/resolvers
Form.getFieldResolver = (schema: AnyObjectSchema) => yupFieldResolver(schema) // AutoForm field resolver

const myTheme = extendTheme(theme, baseTheme)

interface ChakraProps {
  children: ReactNode
}

export const Chakra = ({ children }: ChakraProps) => {
  return <SaasProvider theme={myTheme}>{children}</SaasProvider>
}
