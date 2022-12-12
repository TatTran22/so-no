import { Flex, FlexProps, Icon, Link } from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface NavItemProps extends FlexProps {
  icon: IconType
  children: JSX.Element
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{
        textDecoration: 'none',
        backgroundColor: 'brand.800',
      }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        direction="row"
        p="4"
        // mx="4"
        // borderRadius="sm"
        // borderBottom="1px"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'gray.100',
          color: '#1b1b1b',
        }}
        _active={{
          bg: 'gray.100',
          color: '#1b1b1b',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'gray.800',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

export default NavItem
