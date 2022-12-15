import { Box, Text } from '@chakra-ui/react'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Session } from '@supabase/auth-helpers-react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// import { useRouter } from 'next/router'
import { useEffect } from 'react'

import GuestLayout from '@/components/layout/guest-layout'

type ProfilePageProps = {
  initialSession: Session | null
  profile: Profile
}
export default function Profile({ profile }: ProfilePageProps) {
  const { t } = useTranslation('pages.profile')
  // const user = useUser()
  // const router = useRouter()
  // const { uuid } = router.query

  // if (error) {
  //   return (
  //     <GuestLayout title={t('title')}>
  //       <Box>{t('error')}</Box>
  //     </GuestLayout>
  //   )
  // }
  //
  // if (!profile) {
  //   return (
  //     <GuestLayout title={t('title')}>
  //       <Box>{t('loading')}</Box>
  //     </GuestLayout>
  //   )
  // }
  useEffect(() => {
    console.log(profile)
  }, [profile])

  return (
    <GuestLayout title={t('title')}>
      <Box>
        <Text>{profile.username}</Text>
      </Box>
    </GuestLayout>
  )
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async (
  ctx: GetServerSidePropsContext
) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Run queries with RLS on the server
  const username = ctx.query.username
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      initialSession: session,
      profile: data as Profile,
      ...(await serverSideTranslations(ctx.locale ?? 'en', [
        'pages.profile',
        'navbar',
      ])),
    },
  }
}
