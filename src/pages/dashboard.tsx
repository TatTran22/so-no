import { Box } from '@chakra-ui/react'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Session } from '@supabase/auth-helpers-react'
import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import AuthLayout from '@/components/layout/auth-layout'
import Profile from '@/pages/profile/[username]'

type DashboardPageProps = {
  initialSession: Session | null
  profile: Profile
}
export default function Dashboard({
  initialSession,
  profile,
}: DashboardPageProps) {
  const router = useRouter()
  const { t } = useTranslation('pages.dashboard')
  useEffect(() => {
    console.log(router)
  }, [router])
  return (
    <AuthLayout title={t('title')} session={initialSession}>
      {initialSession?.user ? (
        <Box>Hello {profile.username}</Box>
      ) : (
        <Box>Not logged in</Box>
      )}
    </AuthLayout>
  )
}
export const getServerSideProps: GetServerSideProps<
  DashboardPageProps
> = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  let thisProfile = null

  if (session && session.user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session?.user?.id)
      .single()
    thisProfile = profile

    if (!profile) {
      const { data: newProfile } = await supabase.from('profiles').insert([
        {
          id: session?.user?.id,
          username: session?.user?.email,
        },
      ])
      thisProfile = newProfile
    }
  }

  return {
    props: {
      initialSession: session,
      profile: thisProfile,
      ...(await serverSideTranslations(ctx.locale ?? 'en', [
        'pages.profile',
        'navbar',
      ])),
    },
  }
}
