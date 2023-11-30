import Head from 'next/head'
import { useContext, type FC, type ReactNode } from 'react'
import { AdminNavbar } from './AdminNavbar'
import { SideMenu } from './SideMenu'
import { Box, Button, Typography } from '@mui/material'
import { anyShopApi } from '@/api/anyShopApi'
import { AuthContext } from '@/context/auth/AuthProvider'

interface Props {
  title: string
  children: ReactNode
}

export const AdminLayout: FC<Props> = ({ children, title }) => {
  const { logout } = useContext(AuthContext)

  const resetData = async (): Promise<void> => {
    try {
      await anyShopApi.get('/seed')
      logout()
    } catch {}
  }

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
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Typography variant="h1">{title}</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              void resetData()
            }}
          >
            Reset All Data
          </Button>
        </Box>
        {children}
      </main>
    </>
  )
}
