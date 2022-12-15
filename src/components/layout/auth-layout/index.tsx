import { Box, useDisclosure } from '@chakra-ui/react'
import { AppShell } from '@saas-ui/app-shell'
import { NavItem, Sidebar, SidebarSection } from '@saas-ui/sidebar'
import {
  Session,
  // useSupabaseClient,
  // useUser,
} from '@supabase/auth-helpers-react'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useEffect } from 'react'
import { FiHome, FiSettings, FiUsers } from 'react-icons/fi'

import NavBar from '../navbar'

interface AuthLayoutProps {
  title: string
  children?: JSX.Element
  session?: Session | null
}

export default function AuthLayout({
  title,
  children,
  session,
}: AuthLayoutProps) {
  const { isOpen } = useDisclosure({
    defaultIsOpen: true,
  })

  useEffect(() => {
    console.log(session)
  }, [session])

  return (
    <AppShell
      minH="100%"
      navbar={
        <Box
          as="header"
          borderBottomWidth="1px"
          py="2"
          px="4"
          position="sticky"
          top="0"
          height={'72px'}
        >
          <NavBar />
        </Box>
      }
      sidebar={
        <Sidebar
          position="sticky"
          top="40px"
          breakpoints={{ base: false }}
          variant={isOpen ? 'default' : 'condensed'}
          transition="width"
          transitionDuration="normal"
          width={isOpen ? '280px' : '48px'}
          minWidth="auto"
          motionPreset="slideInOut"
        >
          <SidebarSection aria-label="Main">
            <NavItem as={Link} href="/dashboard" icon={<FiHome />} isActive>
              Home
            </NavItem>
            <NavItem icon={<FiUsers />}>Users</NavItem>
            <NavItem icon={<FiSettings />}>Settings</NavItem>
          </SidebarSection>
        </Sidebar>
      }
    >
      <NextSeo title={title} />
      <Box as="main" flex="1" py="2" px="4">
        {children}
      </Box>
    </AppShell>
  )
}
