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
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material'
import { type NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const SummaryPage: NextPage = () => {
  const { isLoaded, cart, address, numberOfItems, createOrder } =
    useContext(CartContext)
  const router = useRouter()
  const [isPosting, setIsPosting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (Cookies.get('address') == null) void router.replace('/checkout/address')

    if (isLoaded && cart.length === 0 && !isPosting)
      void router.replace('/cart/empty')
  }, [cart.length, isLoaded, isPosting, router])

  if (!isLoaded || cart.length === 0) {
    return <FullScreenLoading />
  }

  const onCreateOrder = async (): Promise<void> => {
    setIsPosting(true)

    const { hasError, message } = await createOrder()

    if (hasError) {
      setIsPosting(false)
      setErrorMessage(message)
      return
    }

    void router.replace(`/order/${message}`)
  }

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
              <Typography variant="h2">
                Summary ({numberOfItems}{' '}
                {numberOfItems === 1 ? 'product' : 'products'})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Shipping address</Typography>
                <NextLink href="/checkout/address">
                  <Link component="span" underline="always">
                    Edit
                  </Link>
                </NextLink>
              </Box>

              <Typography>
                {address.firstName} {address.lastName}{' '}
              </Typography>
              <Typography>{address.address}</Typography>
              {address.address2 !== '' && (
                <Typography>{address.address2}</Typography>
              )}
              <Typography>
                {address.city}, {address.state}
              </Typography>
              <Typography>{address.zip}</Typography>
              <Typography>{address.phone}</Typography>

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

              <Box sx={{ mt: 2 }} display="flex" flexDirection="column">
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  onClick={() => {
                    void onCreateOrder()
                  }}
                  disabled={isPosting}
                >
                  Confirm Order
                </Button>

                <Chip
                  color="error"
                  variant="outlined"
                  label={errorMessage}
                  sx={{
                    display: errorMessage.length > 0 ? 'flex' : 'none',
                    mt: 2,
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage
