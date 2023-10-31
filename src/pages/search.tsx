import { ProductList } from '@/components/products/ProductList'
import { ShopLayout } from '@/components/shared/ShopLayout'
import { getProductsByTerm } from '@/database/helpers/products'
import { type IProduct } from '@/interfaces/IProduct'
import { Box, Link, Typography } from '@mui/material'
import { type GetServerSideProps, type NextPage } from 'next'
import NextLink from 'next/link'

interface Props {
  products: IProduct[]
  foundProducts: boolean
  q: string
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, q }) => {
  return (
    <ShopLayout
      title={`Next Any Shop - Search "${q}"`}
      pageDescription="Find the best products here"
    >
      <Typography variant="h1" sx={{ mb: 1 }}>
        Products
      </Typography>
      <Box display="flex" gap={1}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Showing results for:
        </Typography>
        <Typography
          variant="h2"
          color="secondary"
          fontStyle="italic"
          fontWeight={500}
        >
          {q}
        </Typography>
      </Box>

      {foundProducts ? (
        <ProductList products={products} />
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h2">No product was found.</Typography>
          <NextLink href="/">
            <Link component="span" color="secondary">
              Go back home
            </Link>
          </NextLink>
        </Box>
      )}
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { q = '' } = query as { q: string }

  if (q.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    }
  }

  const products = await getProductsByTerm(q)
  const foundProducts = products.length > 0

  return {
    props: {
      products,
      foundProducts,
      q,
    },
  }
}

export default SearchPage
