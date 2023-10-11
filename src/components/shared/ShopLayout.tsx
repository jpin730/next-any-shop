import Head from 'next/head'
import { type FC } from 'react'
import { Navbar } from './Navbar'

interface Props {
  title: string
  pageDescription: string
  imageFullUrl?: string
  children: React.ReactNode
}

export const ShopLayout: FC<Props> = ({
  children,
  title,
  pageDescription,
  imageFullUrl,
}) => {
  const defaultImageUrl =
    'https://next-any-shop-jpin730.vercel.app/og-image.png'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <meta name="description" content={pageDescription} />
        <meta name="og:description" content={pageDescription} />
        <meta name="og:image" content={imageFullUrl ?? defaultImageUrl} />
      </Head>

      <nav>
        <Navbar />
      </nav>

      {/* TODO:  <SideMenu /> */}

      <main
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
