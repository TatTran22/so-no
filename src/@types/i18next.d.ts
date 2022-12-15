/**
 * If you want to enable locale keys typechecking and enhance IDE experience.
 *
 * Requires `resolveJsonModule:true` in your tsconfig.json.
 *
 * @link https://www.i18next.com/overview/typescript
 */
import 'i18next'

import type common from '~/public/locales/en/common.json'
import type navbar from '~/public/locales/en/navbar.json'
import type dashboard from '~/public/locales/en/pages.dashboard.json'
import type home from '~/public/locales/en/pages.home.json'
import type login from '~/public/locales/en/pages.login.json'
import type profile from '~/public/locales/en/pages.profile.json'
import type signup from '~/public/locales/en/pages.signup.json'

interface I18nNamespaces {
  common: typeof common
  navbar: typeof navbar
  'pages.dashboard': typeof dashboard
  'pages.profile': typeof profile
  'pages.home': typeof home
  'pages.login': typeof login
  'pages.signup': typeof signup
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: I18nNamespaces
  }
}
