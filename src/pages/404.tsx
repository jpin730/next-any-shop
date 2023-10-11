import { ShopLayout } from '@/components/shared/ShopLayout'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { type NextPage } from 'next'

const Custom404: NextPage = () => {
  return (
    <ShopLayout title="Page not found" pageDescription="Nothing to show here">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
      >
        <Box
          display="flex"
          gap={{ xs: 1, sm: 2 }}
          alignItems="center"
          sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
          <Typography variant="h1">404</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography>We have not found what you are looking for</Typography>
        </Box>
      </Box>
    </ShopLayout>
  )
}

export default Custom404
