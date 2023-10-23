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
  Typography,
} from '@mui/material'
import { type NextPage } from 'next'

const CartPage: NextPage = () => {
  return (
    <ShopLayout title="Cart" pageDescription="Shopping cart">
      <Typography variant="h1" sx={{ mb: 3 }}>
        Cart
      </Typography>

      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={8}>
          <CartList />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Order</Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSummary />
              <Box sx={{ mt: 1 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default CartPage
