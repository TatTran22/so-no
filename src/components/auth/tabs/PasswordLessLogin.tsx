import { CheckIcon } from '@chakra-ui/icons'
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react'
import { Form, FormLayout, SubmitButton, SubmitHandler } from '@saas-ui/react'
import { useTranslation } from 'next-i18next'
import type { FieldError } from 'react-hook-form/dist/types/errors'
import * as yup from 'yup'

import MotionBox from '@/components/motion/Box'

export type PasswordLessFormProps = {
  email: string
}

type PasswordLessLoginProps = {
  handleEmailErrorTranslation: (error: FieldError) => string
  onSubmit: SubmitHandler<PasswordLessFormProps>
  isSubmitSuccessful: boolean
}

export default function PasswordLessLogin({
  handleEmailErrorTranslation,
  onSubmit,
  isSubmitSuccessful,
}: PasswordLessLoginProps) {
  const { t } = useTranslation('pages.login')
  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t('validation.email.email'))
      .required(t('validation.email.required')),
  })

  return (
    <MotionBox transition="0.5s linear">
      <Form<PasswordLessFormProps> onSubmit={onSubmit} schema={schema}>
        {({ formState, register }) => (
          <Stack spacing={5}>
            <FormLayout>
              <FormControl isInvalid={!!formState.errors.email}>
                <FormLabel htmlFor="email">{t('email')}</FormLabel>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  autoComplete="email"
                />
                {isSubmitSuccessful && (
                  <FormHelperText
                    color="green.500"
                    as={Flex}
                    alignItems="center"
                  >
                    <CheckIcon mr={2} />
                    {t('submitSuccess')}
                  </FormHelperText>
                )}
                {formState.errors.email && (
                  <FormErrorMessage>
                    {handleEmailErrorTranslation(formState.errors.email)}
                  </FormErrorMessage>
                )}
                <FormHelperText textAlign="justify">
                  {t('helperText')}
                </FormHelperText>
              </FormControl>
            </FormLayout>
            <SubmitButton width="full" size="md" colorScheme="green" mt="6">
              {t('submitButton.text')}
            </SubmitButton>
          </Stack>
        )}
      </Form>
    </MotionBox>
  )
}
