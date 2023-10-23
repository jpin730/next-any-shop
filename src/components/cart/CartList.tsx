import { initialData } from '@/database/data'
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
import { type FC } from 'react'
import { ItemCounter } from '../shared/ItemCounter'
import { toCurrency } from '@/utils/toCurrency'

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

interface Props {
  editable?: boolean
}

export const CartList: FC<Props> = ({ editable = false }) => {
  return (
    <>
      {productsInCart.map((product) => (
        <Grid container spacing={2} key={product.slug} sx={{ mb: 3 }}>
          <Grid item xs={3}>
            {/* TODO: Go to product details page */}
            <NextLink href="/product/slug">
              <Link component="span" sx={{ borderRadius: 3 }}>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images.at(0)}`}
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
              <Typography variant="body1" fontWeight="600">
                {product.title}
              </Typography>
              <Typography variant="body1">
                Size: <strong>M</strong>
              </Typography>

              {editable ? (
                <ItemCounter />
              ) : (
                <Typography>
                  Quantity: <strong>3</strong>
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
              <Button variant="text" color="secondary">
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  )
}
