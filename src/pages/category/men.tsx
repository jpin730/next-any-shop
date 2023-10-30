import { ProductList } from '@/components/products/ProductList'
import { FullScreenLoading } from '@/components/shared/FullScreenLoading'
import { ShopLayout } from '@/components/shared/ShopLayout'
import { useProducts } from '@/hooks/useProducts'
import { Typography } from '@mui/material'
import { type NextPage } from 'next'

const MenPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=men')

  return (
    <ShopLayout
      title={'Next Any Shop - Men'}
      pageDescription={'Find the best products for men.'}
    >
      <Typography variant="h1" sx={{ mb: 3 }}>
        Men
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  )
}

export default MenPage
