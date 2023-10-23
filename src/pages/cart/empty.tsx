import { ShopLayout } from '@/components/shared/ShopLayout'
import { RemoveShoppingCartOutlined } from '@mui/icons-material'
import { Box, Divider, Link, Typography } from '@mui/material'
import { type NextPage } from 'next'
import NextLink from 'next/link'

const EmptyPage: NextPage = () => {
  return (
    <ShopLayout
      title="Empty Cart"
      pageDescription="There are no items in the shopping cart"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <Box
          display="flex"
          gap={{ xs: 1, sm: 2 }}
          alignItems="center"
          sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
          <RemoveShoppingCartOutlined fontSize="large" />
          <Divider orientation="vertical" flexItem />
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography>Cart is empty</Typography>
            <NextLink href="/">
              <Link component="span" color="secondary">
                Go back home
              </Link>
            </NextLink>
          </Box>
        </Box>
      </Box>
    </ShopLayout>
  )
}

export default EmptyPage
