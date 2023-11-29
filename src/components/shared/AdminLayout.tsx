import Head from 'next/head'
import { type FC, type ReactNode } from 'react'
import { AdminNavbar } from './AdminNavbar'
import { SideMenu } from './SideMenu'

interface Props {
  title: string
  children: ReactNode
}

export const AdminLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="og:title" content="" />
        <meta name="description" content="" />
        <meta name="og:description" content="" />
        <meta name="og:image" content="" />
      </Head>

      <nav>
        <AdminNavbar />
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
