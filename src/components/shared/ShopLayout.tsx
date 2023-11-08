import Head from 'next/head'
import { type FC } from 'react'
import { Navbar } from './Navbar'
import { SideMenu } from './SideMenu'

interface Props {
  title: string
  pageDescription: string
  ogImage?: string
  children: React.ReactNode
}

export const ShopLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  ogImage,
}) => {
  const origin = 'https://next-any-shop-jpin730.vercel.app'
  const ogImageFullUrl = `${origin}/${ogImage ?? 'og-image.png'}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <meta name="description" content={pageDescription} />
        <meta name="og:description" content={pageDescription} />
        <meta name="og:image" content={ogImageFullUrl} />
      </Head>

      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <main
        className="fadeIn"
        style={{
          margin: '80px auto',
          maxWidth: '1440px',
          padding: '0px 30px',
        }}
      >
        {children}
      </main>

      <footer>{/* TODO: footer */}</footer>
    </>
  )
}
