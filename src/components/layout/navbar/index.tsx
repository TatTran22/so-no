import {
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import { useUser } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import { FiMenu } from 'react-icons/fi'

import { PaydayIcon } from '@/components/icons'

import DarkModeSwitch from './DarkModeSwitch'
import LanguagesButton from './LanguagesButton'
import LoginButton from './LoginButton'
import UserDropdown from './UserDropdown'
export default function NavBar() {
  const isDesktop = useBreakpointValue({ base: false, lg: true })

  const user = useUser()
  return (
    <Box as="nav" bg="bg-surface" width="full">
      <HStack justify="space-between">
        <HStack as={Link} href={'/'}>
          <PaydayIcon width={12} height={12} />
          <Text
            as="h1"
            fontSize="xl"
            fontWeight="bold"
            color={useColorModeValue('text-primary', 'text-primary-dark')}
          >
            Debt Book
          </Text>
        </HStack>
        {isDesktop ? (
          <Flex justify="end" flex="1" alignItems="center">
            <HStack position="relative" height="fit-content">
              <DarkModeSwitch />
              <LanguagesButton />
              {user ? <UserDropdown user={user} /> : <LoginButton />}
            </HStack>
          </Flex>
        ) : (
          <IconButton
            variant="ghost"
            icon={<FiMenu fontSize="1.25rem" />}
            aria-label="Open Menu"
          />
        )}
      </HStack>
    </Box>
  )
}
