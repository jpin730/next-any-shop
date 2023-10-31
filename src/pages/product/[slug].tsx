import { ProductSlideshow } from '@/components/products/ProductSlideShow'
import { SizeSelector } from '@/components/products/SIzeSelector'
import { ItemCounter } from '@/components/shared/ItemCounter'
import { ShopLayout } from '@/components/shared/ShopLayout'
import {
  getAllProductSlugs,
  getProductBySlug,
} from '@/database/helpers/products'
import { type IProduct } from '@/interfaces/IProduct'
import { type ProductSlug } from '@/interfaces/ProductSlug'
import { toCurrency } from '@/utils/toCurrency'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import { type GetStaticPaths, type GetStaticProps, type NextPage } from 'next'

interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {
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

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await getAllProductSlugs()

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as unknown as ProductSlug
  const product = await getProductBySlug(slug)

  if (product === null) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  }
}

export default ProductPage
