import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material'
import NextLink from 'next/link'
import { useContext, type FC } from 'react'
import { ItemCounter } from '../shared/ItemCounter'
import { toCurrency } from '@/utils/toCurrency'
import { CartContext } from '@/context/cart/CartProvider'
import { type ICartProduct } from '@/interfaces/ICartProduct'

interface Props {
  editable?: boolean
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const { cart, updateCartQuantity, removeCartProduct } =
    useContext(CartContext)

  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantityValue: number,
  ): void => {
    product.quantity = newQuantityValue
    updateCartQuantity(product)
  }
  return (
    <>
      {cart.map((product) => (
        <Grid
          container
          spacing={2}
          key={product.slug + product.size}
          sx={{ mb: 3 }}
        >
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`}>
              <Link component="span" sx={{ borderRadius: 3 }}>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
                    component="img"
                    sx={{
                      borderRadius: 3,
                      maxHeight: '150px',
                      objectFit: 'contain',
                    }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <NextLink href={`/product/${product.slug}`}>
                <Link component="span" underline="hover">
                  <Typography variant="body1" fontWeight="600">
                    {product.title}
                  </Typography>
                </Link>
              </NextLink>
              <Typography variant="body1">
                Size: <strong>{product.size}</strong>
              </Typography>

              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={10}
                  updatedQuantity={(value) => {
                    onNewCartQuantityValue(product, value)
                  }}
                />
              ) : (
                <Typography>
                  Quantity: <strong>{product.quantity}</strong>
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">
              {toCurrency(product.price)}
            </Typography>

            {editable && (
              <Button
                variant="text"
                color="secondary"
                onClick={() => {
                  removeCartProduct(product)
                }}
              >
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  )
}
