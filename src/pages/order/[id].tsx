import { anyShopApi } from '@/api/anyShopApi'
import { CartList } from '@/components/cart/CartList'
import { OrderSummary } from '@/components/cart/OrderSummary'
import { FullScreenLoading } from '@/components/shared/FullScreenLoading'
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
  Typography,
} from '@mui/material'
import { type GetServerSideProps, type NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface Props {
  order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const {
    _id,
    address,
    isPaid,
    numberOfItems,
    orderItems,
    paidAt,
    subTotal,
    tax,
    total,
  } = order

  const [paying, setPaying] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const payOrder = async (): Promise<void> => {
    setPaying(true)
    try {
      await anyShopApi.put(`/orders/${_id}`)
      void router.replace(router.asPath)
      setErrorMessage('')
    } catch (error) {
      console.error(error)
      setErrorMessage('Error paying order. Try again later.')
    }
    setTimeout(() => {
      setPaying(false)
    }, 1000)
  }

  if (paying) {
    return <FullScreenLoading />
  }

  return (
    <ShopLayout
      title={`Order ${_id?.toUpperCase()}`}
      pageDescription="Order summary"
    >
      <Typography variant="h1" sx={{ mb: 3 }}>
        Order {_id?.toUpperCase()}
      </Typography>

      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={8}>
          <CartList products={orderItems} />
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
              </Box>

              <Typography>
                {address.firstName} {address.lastName}
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
              </Box>

              <OrderSummary
                orderValues={{ numberOfItems, subTotal, total, tax }}
              />

              <Box sx={{ mt: 2 }} display="flex" flexDirection="column">
                {isPaid ? (
                  <Chip
                    label="Order paid"
                    variant="outlined"
                    color="secondary"
                    icon={<CreditScoreOutlined />}
                  />
                ) : (
                  <Chip
                    label="Pending payment"
                    variant="outlined"
                    icon={<CreditCardOffOutlined />}
                  />
                )}
              </Box>

              {!isPaid && (
                <Box sx={{ mt: 2 }} display="flex" flexDirection="column">
                  <Button
                    color="secondary"
                    className="circular-btn"
                    fullWidth
                    onClick={() => {
                      void payOrder()
                    }}
                  >
                    Pay order
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
              )}

              {isPaid && paidAt != null && (
                <Typography
                  display="block"
                  variant="caption"
                  color="GrayText"
                  textAlign="center"
                  sx={{ mt: 2 }}
                >
                  Paid at: {new Date(paidAt).toLocaleString()}
                </Typography>
              )}
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
