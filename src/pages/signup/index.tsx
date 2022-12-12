import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useCounter,
} from '@chakra-ui/react'
import { Form, FormLayout, SubmitButton, SubmitHandler } from '@saas-ui/react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRef, useState } from 'react'
import type { FieldError } from 'react-hook-form/dist/types/errors'
import * as yup from 'yup'

import AuthRedirect from '@/components/AuthRedirect'
import GuestLayout from '@/components/layout/guest-layout'

type SignUpFormProps = {
  email: string
  password: string
  passwordConfirmation: string
}

export default function Login() {
  const supabaseClient = useSupabaseClient()
  const { setValue, valueAsNumber } = useCounter({
    defaultValue: 0,
    step: 1,
    min: 0,
    max: 60,
  })
  const [otpTimestamp, setOtpTimestamp] = useState('')
  const stateRef = useRef<number>()
  stateRef.current = valueAsNumber
  const { t } = useTranslation('pages.signup')
  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t('validation.email.email'))
      .required(t('validation.email.required')),
    // password: yup
    //   .string()
    //   .min(8, () => t('validation.password.min'))
    //   .max(128, () => t('validation.password.max'))
    //   .required(() => t('validation.password.required')),
    // passwordConfirmation: yup
    //   .string()
    //   .oneOf([yup.ref('password'), null], () =>
    //     t('validation.passwordConfirmation.oneOf')
    //   ),
  })

  const submit: SubmitHandler<SignUpFormProps> = async (params) => {
    const { data, error } = await supabaseClient.auth.signInWithOtp({
      email: params.email,
      options: { emailRedirectTo: 'http://localhost:8888/login' },
    })
    console.log(data, error)
    if (!error) {
      // save timestamp to local storage
      setOtpTimestamp(new Date().toLocaleString())
      localStorage.setItem('otp_timestamp', otpTimestamp.toString())
      setValue(60)
      const interval = setInterval(() => {
        if (stateRef.current && stateRef.current > 0) {
          setValue((prev) => Number(prev) - 1)
        } else {
          clearInterval(interval)
        }
      }, 1000)
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

  // const handlePasswordErrorTranslation = (error: FieldError) => {
  //   switch (error.type) {
  //     case 'required':
  //       return t('validation.password.required')
  //     case 'min':
  //       return t('validation.password.min')
  //     case 'max':
  //       return t('validation.password.max')
  //     default:
  //       return error.message
  //   }
  // }

  return (
    <GuestLayout title={t('title')}>
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
            <Form<SignUpFormProps> onSubmit={submit} schema={schema}>
              {({ formState, register }) => (
                <Stack spacing={5}>
                  <FormLayout>
                    <FormControl isInvalid={!!formState.errors.email}>
                      <FormLabel htmlFor="name">{t('email')}</FormLabel>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        autoComplete="email"
                      />
                      {formState.errors.email && (
                        <FormErrorMessage>
                          {handleEmailErrorTranslation(formState.errors.email)}
                        </FormErrorMessage>
                      )}
                      <FormHelperText>
                        {valueAsNumber > 0
                          ? t('helperTextSent').replace(
                              '%d',
                              valueAsNumber.toString()
                            )
                          : t('helperText')}
                      </FormHelperText>
                    </FormControl>
                  </FormLayout>

                  <SubmitButton
                    width="full"
                    size="md"
                    colorScheme="green"
                    mt="6"
                    disableIfInvalid
                    isDisabled={valueAsNumber > 0}
                  >
                    {valueAsNumber > 0
                      ? t('submitButton.success')
                      : t('submitButton.text')}
                  </SubmitButton>
                </Stack>
              )}
            </Form>
          </Stack>
        </Stack>
        <AuthRedirect
          text={t('loginRedirectText')}
          hrefText={t('loginRedirectLink')}
          href={'/login'}
        />
      </Box>
    </GuestLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'pages.signup',
      'navbar',
    ])),
  },
})
