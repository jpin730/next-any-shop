import { CartList } from '@/components/cart/CartList'
import { OrderSummary } from '@/components/cart/OrderSummary'
import { ShopLayout } from '@/components/shared/ShopLayout'
import { getOrderById } from '@/database/helpers/orders'
import { type IOrder } from '@/interfaces/IOrder'
import { isValidToken } from '@/utils/jwt'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'
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
import { type GetServerSideProps, type NextPage } from 'next'
import NextLink from 'next/link'

interface Props {
  order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {
  return (
    <ShopLayout title="Order #1234567" pageDescription="Order summary">
      <Typography variant="h1" sx={{ mb: 3 }}>
        Order #1234567
      </Typography>

      <Chip
        sx={{ mb: 3 }}
        label="Pending payment"
        variant="outlined"
        icon={<CreditCardOffOutlined />}
      />

      <Chip
        sx={{ mb: 3 }}
        label="Order paid"
        variant="outlined"
        color="secondary"
        icon={<CreditScoreOutlined />}
      />

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
                  Pay
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = '' } = query
  const { token = '' } = req.cookies

  let userId = ''

  try {
    userId = await isValidToken(token)
  } catch (error) {
    userId = ''
  }

  if (token === '' || userId === '') {
    return {
      redirect: {
        destination: `/auth/login?p=${encodeURIComponent(
          `/order/${id.toString()}`,
        )}`,
        permanent: false,
      },
    }
  }

  const order = await getOrderById(id.toString())

  if (order == null || order.user !== userId) {
    return {
      redirect: {
        destination: '/order/history',
        permanent: false,
      },
    }
  }

  return {
    props: {
      order,
    },
  }
}

export default OrderPage
