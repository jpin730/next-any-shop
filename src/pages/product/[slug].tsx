import { ProductSlideshow } from '@/components/products/ProductSlideShow'
import { SizeSelector } from '@/components/products/SIzeSelector'
import { ItemCounter } from '@/components/shared/ItemCounter'
import { ShopLayout } from '@/components/shared/ShopLayout'
import { CartContext } from '@/context/cart/CartProvider'
import {
  getAllProductSlugs,
  getProductBySlug,
} from '@/database/helpers/products'
import { type ICartProduct } from '@/interfaces/ICartProduct'
import { type IProductSize, type IProduct } from '@/interfaces/IProduct'
import { type ProductSlug } from '@/interfaces/ProductSlug'
import { toCurrency } from '@/utils/toCurrency'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import { type GetStaticPaths, type GetStaticProps, type NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

const MaxValuePerProduct = 10

interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter()
  const { addProductToCart } = useContext(CartContext)
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  })

  const selectedSize = (size: IProductSize): void => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }))
  }

  const onUpdateQuantity = (quantity: number): void => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }))
  }

  const onAddProduct = (): void => {
    if (tempCartProduct.size === undefined) {
      return
    }

    addProductToCart(tempCartProduct)
    void router.push('/cart')
  }

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
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updatedQuantity={onUpdateQuantity}
                maxValue={
                  product.inStock > MaxValuePerProduct
                    ? MaxValuePerProduct
                    : product.inStock
                }
              />
              <SizeSelector
                sizes={product.sizes}
                selectedSize={tempCartProduct.size}
                onSelectedSize={selectedSize}
              />
            </Box>

            {product.inStock > 0 ? (
              <Button
                color="secondary"
                className="circular-btn"
                onClick={onAddProduct}
              >
                {tempCartProduct.size === undefined
                  ? 'Select a size'
                  : 'Add to cart'}
              </Button>
            ) : (
              <Chip label="No available" variant="outlined" />
            )}

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
