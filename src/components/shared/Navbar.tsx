import NextLink from 'next/link'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Search from '@mui/icons-material/Search'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import { type FC } from 'react'

export const Navbar: FC = () => {
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

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <NextLink href="/category/men">
            <Button>Men</Button>
          </NextLink>
          <NextLink href="/category/women">
            <Button>Women</Button>
          </NextLink>
          <NextLink href="/category/kids">
            <Button>Kids</Button>
          </NextLink>
        </Box>

        <Box flex={1} />

        <IconButton>
          <Search />
        </IconButton>

        <NextLink href="/cart">
          <Link component="span">
            <IconButton>
              <Badge badgeContent={2} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button>Menu</Button>
      </Toolbar>
    </AppBar>
  )
}
