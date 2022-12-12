import { Box, Text } from '@chakra-ui/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'

import GuestLayout from '@/components/layout/guest-layout'

type Props = {
  // Add custom props here
}

const Homepage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('pages.home')

  useEffect(() => {
    console.log(props)
  })

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
