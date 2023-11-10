import { CartList } from '@/components/cart/CartList'
import { OrderSummary } from '@/components/cart/OrderSummary'
import { FullScreenLoading } from '@/components/shared/FullScreenLoading'
import { ShopLayout } from '@/components/shared/ShopLayout'
import { CartContext } from '@/context/cart/CartProvider'
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
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

const CartPage: NextPage = () => {
  const { isLoaded, cart } = useContext(CartContext)
  const router = useRouter()

  useEffect(() => {
    void (isLoaded && cart.length === 0 && router.replace('/cart/empty'))
  }, [cart.length, isLoaded, router])

  if (!isLoaded || cart.length === 0) {
    return <FullScreenLoading />
  }

  return (
    <ShopLayout title="Cart" pageDescription="Shopping cart">
      <Typography variant="h1" sx={{ mb: 3 }}>
        Cart
      </Typography>

      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={8}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Order</Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSummary />
              <Box sx={{ mt: 1 }}>
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  href="/checkout/address"
                >
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
