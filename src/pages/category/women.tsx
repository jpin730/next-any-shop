import { ProductList } from '@/components/products/ProductList'
import { FullScreenLoading } from '@/components/shared/FullScreenLoading'
import { ShopLayout } from '@/components/shared/ShopLayout'
import { useProducts } from '@/hooks/useProducts'
import { Typography } from '@mui/material'
import { type NextPage } from 'next'

const WomenPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=women')

  return (
    <ShopLayout
      title={'Next Any Shop - Women'}
      pageDescription={'Find the best products for women.'}
    >
      <Typography variant="h1" sx={{ mb: 3 }}>
        Women
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  )
}

export default WomenPage
