import NextLink from 'next/link'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import ClearOutlined from '@mui/icons-material/ClearOutlined'
import Menu from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import { useContext, type FC, useState } from 'react'
import { useRouter } from 'next/router'
import { SharedContext } from '@/context/shared/SharedProvider'
import { Input, InputAdornment } from '@mui/material'

interface NavItem {
  text: string
  path: string
}

const navItems: NavItem[] = [
  {
    text: 'Men',
    path: '/category/men',
  },
  {
    text: 'Women',
    path: '/category/women',
  },
  {
    text: 'Kids',
    path: '/category/kids',
  },
]

export const Navbar: FC = () => {
  const { toggleSideMenu } = useContext(SharedContext)
  const { asPath, push } = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const onSearchTerm = (): void => {
    const searchTermTrimmed = searchTerm.trim()
    if (searchTermTrimmed.length === 0) return
    void push(`/search?q=${searchTermTrimmed}`)
  }

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

        <Box
          sx={{
            display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' },
          }}
          className="fadeIn"
        >
          {navItems.map(({ text, path }) => (
            <NextLink href={path} key={path}>
              <Button color={path === asPath ? 'primary' : undefined}>
                {text}
              </Button>
            </NextLink>
          ))}
        </Box>

        <Box flex={1} />

        {isSearchVisible ? (
          <Input
            autoFocus
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            className="fadeIn"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
            onKeyUp={(e) => {
              e.key === 'Enter' && onSearchTerm()
            }}
            type="text"
            placeholder="Search..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setIsSearchVisible(false)
                  }}
                >
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            onClick={() => {
              setIsSearchVisible(true)
            }}
            className="fadeIn"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            <SearchOutlined />
          </IconButton>
        )}

        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
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
