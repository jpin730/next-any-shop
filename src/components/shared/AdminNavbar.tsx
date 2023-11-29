import { SharedContext } from '@/context/shared/SharedProvider'
import { Menu } from '@mui/icons-material'
import {
  AppBar,
  Box,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@mui/material'
import NextLink from 'next/link'
import { type FC, useContext } from 'react'

export const AdminNavbar: FC = () => {
  const { toggleSideMenu } = useContext(SharedContext)

  return (
    <AppBar>
      <Toolbar>
        <NextLink
          href="/"
          style={{
            textDecoration: 'none',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Link component="span" display="flex" alignItems="center">
            <Typography variant="h6">Any</Typography>
            <Typography variant="h6" fontWeight={300}>
              Shop
            </Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <IconButton
          onClick={() => {
            toggleSideMenu()
          }}
        >
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
