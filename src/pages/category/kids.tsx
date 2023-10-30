import { ProductList } from '@/components/products/ProductList'
import { FullScreenLoading } from '@/components/shared/FullScreenLoading'
import { ShopLayout } from '@/components/shared/ShopLayout'
import { useProducts } from '@/hooks/useProducts'
import { Typography } from '@mui/material'
import { type NextPage } from 'next'

const KidsPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=kid')

  return (
    <ShopLayout
      title={'Next Any Shop - Kids'}
      pageDescription={'Find the best products for kids.'}
    >
      <Typography variant="h1" sx={{ mb: 3 }}>
        Kids
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  )
}

export default KidsPage
