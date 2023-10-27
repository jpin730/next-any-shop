import { CartList } from '@/components/cart/CartList'
import { OrderSummary } from '@/components/cart/OrderSummary'
import { ShopLayout } from '@/components/shared/ShopLayout'
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material'
import { type NextPage } from 'next'
import NextLink from 'next/link'

const SummaryPage: NextPage = () => {
  return (
    <ShopLayout title="Order Summary" pageDescription="Order summary">
      <Typography variant="h1" sx={{ mb: 3 }}>
        Order Summary
      </Typography>

      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={8}>
          <CartList />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Summary (3 products)</Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Shipping address</Typography>
                <NextLink href="/checkout/address">
                  <Link component="span" underline="always">
                    Edit
                  </Link>
                </NextLink>
              </Box>

              <Typography>John Doe</Typography>
              <Typography>123 Somewhere St.</Typography>
              <Typography>Apartment 12</Typography>
              <Typography>California</Typography>
              <Typography>+1 123 456 7890</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Cart</Typography>
                <NextLink href="/cart">
                  <Link component="span" underline="always">
                    Edit
                  </Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 2 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirm Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage