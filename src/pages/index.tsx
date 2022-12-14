import { Box, Text } from '@chakra-ui/react'
import type { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import GuestLayout from '@/components/layout/guest-layout'

type Props = {
  // Add custom props here
}

const Homepage = () => {
  const { t } = useTranslation('pages.home')

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
