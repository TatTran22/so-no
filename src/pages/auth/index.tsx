import {
  Box,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import type { SubmitHandler } from '@saas-ui/react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useState } from 'react'
import type { FieldError } from 'react-hook-form/dist/types/errors'

import LoginWithEmail, {
  LoginWithEmailFormProps,
} from '@/components/auth/tabs/LoginWithEmail'
import PasswordLessLogin, {
  PasswordLessFormProps,
} from '@/components/auth/tabs/PasswordLessLogin'
import GuestLayout from '@/components/layout/guest-layout'

export default function Login() {
  const supabaseClient = useSupabaseClient()
  const { t } = useTranslation('pages.login')
  const router = useRouter()
  const toast = useToast()
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false)

  const handleLoginWithEmailSubmit: SubmitHandler<
    LoginWithEmailFormProps
  > = async (params) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword(params)
    console.log(data, error)
    if (!error) {
      setIsSubmitSuccessful(true)
      toast({
        title: t('notification.login.success'),
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      await router.push('/dashboard')
    } else {
      setIsSubmitSuccessful(false)
      toast({
        title: t('notification.login.error'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handlePasswordLessSubmit: SubmitHandler<PasswordLessFormProps> = async (
    params
  ) => {
    const { error } = await supabaseClient.auth.signInWithOtp({
      email: params.email,
      options: { emailRedirectTo: 'http://localhost:8888/dashboard' },
    })
    if (!error) {
      setIsSubmitSuccessful(true)
      toast({
        title: t('notification.passwordless.success.title'),
        status: 'success',
        description: t('notification.passwordless.success.description'),
        duration: 5000,
        isClosable: true,
      })
    } else {
      setIsSubmitSuccessful(false)
      toast({
        title: t('notification.passwordless.error.title'),
        status: 'error',
        description: t('notification.passwordless.error.description'),
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handleEmailErrorTranslation = (error: FieldError) => {
    switch (error.type) {
      case 'required':
        return t('validation.email.required')
      case 'email':
        return t('validation.email.email')
      default:
        return error.message ?? ''
    }
  }

  const handlePasswordErrorTranslation = (error: FieldError) => {
    switch (error.type) {
      case 'required':
        return t('validation.password.required')
      default:
        return error.message ?? ''
    }
  }

  return (
    <GuestLayout title={t('title')} as={Stack} alignItems="center">
      <Box
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        boxShadow={{ base: 'none', sm: useColorModeValue('lg', 'dark-lg') }}
        borderRadius={{ base: 'none', sm: 'xl' }}
        w={'md'}
        h="fit-content"
      >
        <Stack spacing="6" alignItems="center">
          <Heading as="h1" textColor="brand.400">
            {t('title')}
          </Heading>
          <Tabs
            isFitted
            variant="enclosed-colored"
            width="full"
            colorScheme="whatsapp"
          >
            <TabList>
              <Tab rounded="sm">{t('tabs.passwordLess')}</Tab>
              <Tab>{t('tabs.loginWithEmail')}</Tab>
            </TabList>

            <TabPanels pt={4}>
              <TabPanel>
                <PasswordLessLogin
                  handleEmailErrorTranslation={handleEmailErrorTranslation}
                  onSubmit={handlePasswordLessSubmit}
                  isSubmitSuccessful={isSubmitSuccessful}
                />
              </TabPanel>
              <TabPanel>
                <LoginWithEmail
                  handleEmailErrorTranslation={handleEmailErrorTranslation}
                  handlePasswordErrorTranslation={
                    handlePasswordErrorTranslation
                  }
                  onSubmit={handleLoginWithEmailSubmit}
                  isSubmitSuccessful={isSubmitSuccessful}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Box>
    </GuestLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'pages.login',
      'navbar',
    ])),
  },
})
