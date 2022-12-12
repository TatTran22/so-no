import {
  Button,
  Center,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Persona } from '@saas-ui/react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import type { User } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import { FiLogOut } from 'react-icons/fi'

type UserDropdownProps = {
  user: User
}
const UserDropdown = ({ user }: UserDropdownProps) => {
  const supabase = useSupabaseClient()
  const toast = useToast()
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: 'An error occurred while logging out',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } else {
      await router.push('/')
    }
  }

  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={Button}
        rounded={'full'}
        variant={'link'}
        cursor={'pointer'}
        minW={0}
      >
        <Persona
          name="Tat Tran"
          secondaryLabel="Founder"
          presence="online"
          hideDetails
          size="sm"
        />
      </MenuButton>
      {user ? (
        <MenuList alignItems={'center'} px="4" maxW="xs">
          <Center py="2">
            <Persona
              name="Tat Tran"
              secondaryLabel="Founder"
              presence="online"
              size="lg"
            />
          </Center>
          <Center width="full">
            <Text
              fontSize="lg"
              fontWeight="semibold"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {user.email}
            </Text>
          </Center>
          <MenuDivider />
          <MenuItem
            onClick={handleLogout}
            isDisabled={false}
            icon={<Icon as={FiLogOut} />}
          >
            Log Out
          </MenuItem>
        </MenuList>
      ) : (
        <Skeleton />
      )}
    </Menu>
  )
}

export default UserDropdown
