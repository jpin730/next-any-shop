import { ProductSlideshow } from '@/components/products/ProductSlideShow'
import { SizeSelector } from '@/components/products/SIzeSelector'
import { ItemCounter } from '@/components/shared/ItemCounter'
import { ShopLayout } from '@/components/shared/ShopLayout'
import { initialData } from '@/database/data'
import { toCurrency } from '@/utils/toCurrency'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import { type NextPage } from 'next'

const product = initialData.products[0]

const ProductPage: NextPage = () => {
  return (
    <ShopLayout
      title={product.title}
      pageDescription={product.description}
      ogImage={`products/${product.images.at(1)}`}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {toCurrency(product.price)}
            </Typography>

            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Quantity</Typography>
              <ItemCounter />
              <SizeSelector
                selectedSize={product.sizes[2]}
                sizes={product.sizes}
              />
            </Box>

            <Button color="secondary" className="circular-btn">
              Add to cart
            </Button>

            <Chip label="No available" variant="outlined" />

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default ProductPage
