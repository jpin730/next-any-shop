import { type FC } from 'react'
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
import Login from '@mui/icons-material/Login'
import Male from '@mui/icons-material/Male'
import Search from '@mui/icons-material/Search'
import VpnKey from '@mui/icons-material/VpnKey'

export const SideMenu: FC = () => {
  return (
    <Drawer
      open={false}
      anchor="right"
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
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

          <ListItemButton>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary={'Profile'} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <ConfirmationNumber />
            </ListItemIcon>
            <ListItemText primary={'My orders'} />
          </ListItemButton>

          <ListItemButton sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemIcon>
              <Male />
            </ListItemIcon>
            <ListItemText primary={'Men'} />
          </ListItemButton>

          <ListItemButton sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemIcon>
              <Female />
            </ListItemIcon>
            <ListItemText primary={'Women'} />
          </ListItemButton>

          <ListItemButton sx={{ display: { xs: '', sm: 'none' } }}>
            <ListItemIcon>
              <EscalatorWarning />
            </ListItemIcon>
            <ListItemText primary={'Kids'} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <VpnKey />
            </ListItemIcon>
            <ListItemText primary={'Login'} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <Login />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItemButton>

          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          <ListItemButton>
            <ListItemIcon>
              <Category />
            </ListItemIcon>
            <ListItemText primary={'Products'} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ConfirmationNumber />
            </ListItemIcon>
            <ListItemText primary={'Orders'} />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary={'Users'} />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  )
}
