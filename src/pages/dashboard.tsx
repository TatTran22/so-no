import { Box } from '@chakra-ui/react'
import { useUser } from '@supabase/auth-helpers-react'
import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import AuthLayout from '@/components/layout/auth-layout'

export default function Dashboard() {
  const user = useUser()

  const { t } = useTranslation('pages.dashboard')

  return (
    <AuthLayout title={t('title')}>
      {user ? <Box>Hello {user.email}</Box> : <Box>Not logged in</Box>}
    </AuthLayout>
  )
}
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['pages.dashboard'])),
  },
})
