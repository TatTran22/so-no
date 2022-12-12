import {
  Box,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { UseFormReturn } from '@saas-ui/forms'
import {
  Form,
  FormLayout,
  PasswordInput,
  SubmitButton,
  SubmitHandler,
} from '@saas-ui/react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRef } from 'react'
import type { FieldError } from 'react-hook-form/dist/types/errors'
import * as yup from 'yup'

import AuthRedirect from '@/components/AuthRedirect'
import GuestLayout from '@/components/layout/guest-layout'

type LoginFormProps = {
  email: string
  password: string
}
export default function Login() {
  // props: InferGetStaticPropsType<typeof getStaticProps>
  const supabaseClient = useSupabaseClient()
  const { t } = useTranslation('pages.login')
  const loginFormRef = useRef<UseFormReturn<LoginFormProps, any>>(null)

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t('validation.email.email'))
      .required(t('validation.email.required')),
    password: yup.string().required(t('validation.password.required')),
  })

  const submit: SubmitHandler<LoginFormProps> = async (params) => {
    console.log(params)
    // return new Promise((resolve) => {
    //   setTimeout(resolve, 1000)
    // // })
    const { data, error } = await supabaseClient.auth.signInWithPassword(params)
    console.log(data, error)
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
    <GuestLayout title={t('title')} as={Center}>
      <Box
        py={{ base: '0', sm: '8' }}
        px={{ base: '4', sm: '10' }}
        // bg={{ base: 'gray.100', sm: 'bg-surface' }}
        boxShadow={{ base: 'none', sm: useColorModeValue('lg', 'dark-lg') }}
        borderRadius={{ base: 'none', sm: 'xl' }}
        w={'md'}
        h="fit-content"
      >
        <Stack spacing="6">
          <Heading as="h1" textColor="brand.400">
            {t('title')}
          </Heading>
          <Stack spacing="5">
            <Form<LoginFormProps>
              onSubmit={submit}
              schema={schema}
              ref={loginFormRef}
            >
              {({ formState, register }) => (
                <FormLayout spacing="5">
                  <FormControl isInvalid={!!formState.errors.email}>
                    <FormLabel htmlFor="name">{t('email')}</FormLabel>
                    <Input
                      type="email"
                      id="email"
                      {...register('email')}
                      autoComplete="email"
                    />
                    <FormErrorMessage>
                      {formState.errors.email &&
                        handleEmailErrorTranslation(formState.errors.email)}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!formState.errors.password}>
                    <FormLabel htmlFor="password">{t('password')}</FormLabel>
                    <PasswordInput
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      {...register('password')}
                    />
                    <FormErrorMessage>
                      {formState.errors.password &&
                        handlePasswordErrorTranslation(
                          formState.errors.password
                        )}
                    </FormErrorMessage>
                  </FormControl>
                  <SubmitButton width="full" size="md" mt="2" disableIfInvalid>
                    {t('submit')}
                  </SubmitButton>
                </FormLayout>
              )}
            </Form>
          </Stack>
        </Stack>
        <AuthRedirect
          text={t('signUpRedirect')}
          hrefText={t('signUpRedirectLink')}
          href={'/signup'}
        />
      </Box>
    </GuestLayout>
  )
}

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'pages.login',
      'navbar',
    ])),
  },
})
