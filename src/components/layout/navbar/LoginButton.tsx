import { Button, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export default function LoginButton() {
  const router = useRouter()
  const { t } = useTranslation('navbar')
  return (
    <Button onClick={() => router.push('/login')} variant="primary">
      <Text>{t('button.login')}</Text>
    </Button>
  )
}
