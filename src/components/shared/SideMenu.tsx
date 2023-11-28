import {
  useContext,
  type FC,
  type ReactNode,
  useState,
  useMemo,
  useCallback,
} from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle'
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings'
import Box from '@mui/material/Box'
import Category from '@mui/icons-material/Category'
import ConfirmationNumber from '@mui/icons-material/ConfirmationNumber'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import EscalatorWarning from '@mui/icons-material/EscalatorWarning'
import Female from '@mui/icons-material/Female'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Logout from '@mui/icons-material/Logout'
import Male from '@mui/icons-material/Male'
import Search from '@mui/icons-material/Search'
import VpnKey from '@mui/icons-material/VpnKey'
import { useRouter } from 'next/router'
import { SharedContext } from '@/context/shared/SharedProvider'
import { AuthContext } from '@/context/auth/AuthProvider'

interface NavItem {
  text: string
  action?: () => void // TODO: make required
  icon?: ReactNode
  responsive?: true
  subheader?: true
  hidden?: boolean
}

export const SideMenu: FC = () => {
  const router = useRouter()
  const { isMenuOpen, toggleSideMenu } = useContext(SharedContext)
  const { user, isLoggedIn, logout } = useContext(AuthContext)
  const [searchTerm, setSearchTerm] = useState('')

  const navigateTo = useCallback(
    (url: string): void => {
      toggleSideMenu()
      void router.push(url)
    },
    [router, toggleSideMenu],
  )

  const navItems = useMemo<NavItem[]>(
    () => [
      {
        text: 'Profile',
        icon: <AccountCircle />,
        hidden: !isLoggedIn,
      },
      {
        text: 'My orders',
        icon: <ConfirmationNumber />,
        hidden: !isLoggedIn,
        action: () => {
          navigateTo('/order/history')
        },
      },
      {
        text: 'Men',
        action: () => {
          navigateTo('/category/men')
        },
        icon: <Male />,
        responsive: true,
      },
      {
        text: 'Women',
        action: () => {
          navigateTo('/category/women')
        },
        icon: <Female />,
        responsive: true,
      },
      {
        text: 'Kids',
        action: () => {
          navigateTo('/category/kids')
        },
        icon: <EscalatorWarning />,
        responsive: true,
      },
      {
        text: 'Login',
        action: () => {
          navigateTo(`/auth/login?p=${encodeURIComponent(router.asPath)}`)
        },
        icon: <VpnKey />,
        hidden: isLoggedIn,
      },
      {
        text: 'Logout',
        action: logout,
        icon: <Logout />,
        hidden: !isLoggedIn,
      },
      {
        text: 'Admin Panel',
        subheader: true,
        hidden: user?.role !== 'admin',
      },
      {
        text: 'Products',
        icon: <Category />,
        hidden: user?.role !== 'admin',
      },
      {
        text: 'Orders',
        icon: <ConfirmationNumber />,
        hidden: user?.role !== 'admin',
      },
      {
        text: 'Users',
        icon: <AdminPanelSettings />,
        hidden: user?.role !== 'admin',
      },
      {
        text: user?.email ?? '',
        subheader: true,
        hidden: !isLoggedIn,
      },
    ],
    [isLoggedIn, logout, navigateTo, router.asPath, user?.email, user?.role],
  )

  const onSearchTerm = (): void => {
    const searchTermTrimmed = searchTerm.trim()
    if (searchTermTrimmed.length === 0) return
    navigateTo(`/search?q=${searchTermTrimmed}`)
  }

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
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
                  <IconButton onClick={onSearchTerm}>
                    <Search />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {navItems.map(
            ({ icon, text, action, responsive, subheader, hidden }) =>
              hidden !== true &&
              (subheader === true ? (
                <div key={text}>
                  <Divider />
                  <ListSubheader>{text}</ListSubheader>
                </div>
              ) : (
                <ListItemButton
                  key={text}
                  sx={responsive && { display: { xs: '', sm: 'none' } }}
                  onClick={() => {
                    action !== undefined && action()
                  }}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              )),
          )}
        </List>
      </Box>
    </Drawer>
  )
}
