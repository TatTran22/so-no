import { Box, BoxProps } from '@chakra-ui/react'
import { AppShell } from '@saas-ui/app-shell'
import { NextSeo } from 'next-seo'

import NavBar from '../navbar'

type GuestLayoutProps = {
  title: string
  children?: JSX.Element
} & BoxProps

export default function GuestLayout({
  title,
  children,
  ...props
}: GuestLayoutProps) {
  return (
    <AppShell
      minH="100vh"
      navbar={
        <Box
          as="header"
          // borderBottomWidth="1px"
          py="2"
          px="4"
          position="sticky"
          top="0"
          height={'72px'}
        >
          <NavBar />
        </Box>
      }
    >
      <NextSeo title={title} />
      <Box as="main" flex="1" py="2" px="4" {...props}>
        {children}
      </Box>
    </AppShell>
  )
}
