/** @type {import('next-seo').DefaultSeoProps} */
import siteMeta from '@/data/siteMetadata'

const defaultSEOConfig = {
  title: siteMeta.title,
  titleTemplate: `%s | ${siteMeta.title}`,
  defaultTitle: siteMeta.title,
  description: siteMeta.description,
  canonical: siteMeta.siteUrl,
  openGraph: {
    url: siteMeta.siteUrl,
    title: siteMeta.title,
    description: siteMeta.description,
    images: [
      {
        url: 'https://og-image.sznm.dev/**nextarter-chakra**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250',
        alt: 'Debt Book',
      },
    ],
    site_name: siteMeta.title,
  },
  twitter: {
    handle: '@tattran22',
    cardType: 'summary_large_image',
  },
}

export default defaultSEOConfig
