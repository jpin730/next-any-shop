import { useContext, type FC, type ReactNode } from 'react'
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

interface NavItem {
  text: string
  icon?: ReactNode
  path?: string
  responsive?: true
  subheader?: true
}

export const SideMenu: FC = () => {
  const router = useRouter()
  const { isMenuOpen, toggleSideMenu } = useContext(SharedContext)

  const navItems: NavItem[] = [
    {
      text: 'Profile',
      icon: <AccountCircle />,
    },
    {
      text: 'My orders',
      icon: <ConfirmationNumber />,
    },
    {
      text: 'Men',
      path: '/category/men',
      icon: <Male />,
      responsive: true,
    },
    {
      text: 'Women',
      path: '/category/women',
      icon: <Female />,
      responsive: true,
    },
    {
      text: 'Kids',
      path: '/category/kids',
      icon: <EscalatorWarning />,
      responsive: true,
    },
    {
      text: 'Login',
      icon: <VpnKey />,
    },
    {
      text: 'Logout',
      icon: <Logout />,
    },
    {
      text: 'Admin Panel',
      subheader: true,
    },
    {
      text: 'Products',
      icon: <Category />,
    },
    {
      text: 'Orders',
      icon: <ConfirmationNumber />,
    },
    {
      text: 'Users',
      icon: <AdminPanelSettings />,
    },
  ]

  const navigateTo = (url: string): void => {
    toggleSideMenu()
    void router.push(url)
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
              type="text"
              placeholder="Search..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility">
                    <Search />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {navItems.map(({ icon, text, path, responsive, subheader }) =>
            subheader === true ? (
              <div key={text}>
                <Divider />
                <ListSubheader>{text}</ListSubheader>
              </div>
            ) : (
              <ListItemButton
                key={text}
                sx={responsive && { display: { xs: '', sm: 'none' } }}
                onClick={() => {
                  path !== undefined && navigateTo(path)
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            ),
          )}
        </List>
      </Box>
    </Drawer>
  )
}
