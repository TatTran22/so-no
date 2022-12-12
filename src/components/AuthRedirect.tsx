import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

type AuthRedirectProps = {
  text: string
  hrefText: string
  href: string
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({
  text,
  hrefText,
  href,
}) => {
  return (
    <Box>
      <Flex flexDir="column" marginTop={4}>
        <Divider orientation="horizontal" />
        <Flex flexDir="row" marginTop={4} justify="center">
          <Text fontSize="md">
            {`${text} `}
            <Link href={href}>
              <Text as="span" color="brand.400" fontWeight="bold">
                {hrefText}
              </Text>
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default AuthRedirect
