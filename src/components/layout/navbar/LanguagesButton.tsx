import { Skeleton } from '@chakra-ui/react'
import { Select } from '@saas-ui/react'
import { i18n as nextI18n } from 'next-i18next'
import { useRouter } from 'next/router'

import { i18n } from '~/next-i18next.config'

const LanguagesButton = () => {
  const router = useRouter()

  const languageLabels = {
    en: 'English',
    vi: 'Tiếng Việt',
  }

  type SupportedLanguage = keyof typeof languageLabels
  const availableLanguages = i18n.locales as SupportedLanguage[]

  const languageOptions = availableLanguages.map((language) => ({
    value: language,
    label: languageLabels[language] || language,
  }))

  const handleLanguageChange = (newLocale: SupportedLanguage) => {
    const { pathname, asPath, query } = router
    void router.push({ pathname, query }, asPath, { locale: newLocale })
  }

  return (
    <>
      {nextI18n ? (
        <Select
          name="language"
          defaultValue={nextI18n.language}
          options={languageOptions}
          size="sm"
          onChange={(value) => handleLanguageChange(value as SupportedLanguage)}
        />
      ) : (
        <Skeleton />
      )}
    </>
  )
}

export default LanguagesButton
