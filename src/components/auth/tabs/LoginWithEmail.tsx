import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import {
  Form,
  FormLayout,
  PasswordInput,
  SubmitButton,
  SubmitHandler,
} from '@saas-ui/react'
import { useTranslation } from 'next-i18next'
import type { FieldError } from 'react-hook-form/dist/types/errors'
import * as yup from 'yup'

import MotionBox from '@/components/motion/Box'

export type LoginWithEmailFormProps = {
  email: string
  password: string
}

type LoginWithEmailProps = {
  handleEmailErrorTranslation: (error: FieldError) => string
  handlePasswordErrorTranslation: (error: FieldError) => string
  onSubmit: SubmitHandler<LoginWithEmailFormProps>
  isSubmitSuccessful: boolean
}

export default function LoginWithEmail({
  handleEmailErrorTranslation,
  handlePasswordErrorTranslation,
  onSubmit,
  isSubmitSuccessful,
}: LoginWithEmailProps) {
  const { t } = useTranslation('pages.login')
  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t('validation.email.email'))
      .required(t('validation.email.required')),
    password: yup.string().required(t('validation.password.required')),
  })

  return (
    <MotionBox transition="0.5s linear">
      <Form<LoginWithEmailFormProps> onSubmit={onSubmit} schema={schema}>
        {({ formState, register }) => (
          <FormLayout spacing="5">
            <FormControl isInvalid={!!formState.errors.email}>
              <FormLabel htmlFor="email-login">{t('email')}</FormLabel>
              <Input
                type="email"
                id="email-login"
                {...register('email')}
                autoComplete="email"
              />
              {formState.errors.email && (
                <FormErrorMessage>
                  {handleEmailErrorTranslation(formState.errors.email)}
                </FormErrorMessage>
              )}
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
                  handlePasswordErrorTranslation(formState.errors.password)}
              </FormErrorMessage>
            </FormControl>
            <SubmitButton width="full" size="md" mt="2" disableIfInvalid>
              {isSubmitSuccessful
                ? t('submitButton.success')
                : t('submitButton.text')}
            </SubmitButton>
          </FormLayout>
        )}
      </Form>
    </MotionBox>
  )
}
