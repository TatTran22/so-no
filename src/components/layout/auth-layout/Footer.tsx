import {
  Container,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

import SocialButton from '@/components/layout/auth-layout/SocialButton'
import siteMeta from '@/data/siteMetadata'

export default function Footer() {
  return (
    <Flex
      bg="bg-surface"
      color={useColorModeValue('darkGreen.200', 'gray.200')}
      h="fit-content"
      minH="50px"
      mt="auto"
      fontSize={{ base: 'sm', md: 'md' }}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
      >
        <Flex
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>{`© ${
            siteMeta.title
          } ${new Date().getFullYear()} - All rights reserved`}</Text>
          <Stack direction={'row'} spacing={6} hidden>
            <SocialButton label={'Twitter'} href={'#'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Flex>
      </Container>
    </Flex>
  )
}
