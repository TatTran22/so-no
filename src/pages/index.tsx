import { Box, Text } from '@chakra-ui/react'
import { useUser } from '@supabase/auth-helpers-react'
import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import GuestLayout from '@/components/layout/guest-layout'

type Props = {
  // Add custom props here
}

const Homepage = () => {
  const { t } = useTranslation('pages.home')
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user && router.query) {
      if (router.query.redirectedFrom === '/dashboard') {
        void router.push('/dashboard')
      }
    }
    console.log(router)
  }, [user, router.query])

  return (
    <GuestLayout title={t('title')}>
      <Box>
        <Text>{t('description')} </Text>
      </Box>
    </GuestLayout>
  )
}

// or getServerSideProps: GetServerSideProps<Props> = async ({ locale })
export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['pages.home', 'navbar'])),
  },
})

export default Homepage
