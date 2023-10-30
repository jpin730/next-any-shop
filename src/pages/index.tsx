import { ProductList } from '@/components/products/ProductList'
import { FullScreenLoading } from '@/components/shared/FullScreenLoading'
import { ShopLayout } from '@/components/shared/ShopLayout'
import { useProducts } from '@/hooks/useProducts'
import Typography from '@mui/material/Typography'
import { type NextPage } from 'next'

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts('/products')

  return (
    <ShopLayout
      title="Next Any Shop"
      pageDescription="Best product here in Any Shop"
    >
      <Typography variant="h1" sx={{ mb: 3 }}>
        All products
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  )
}

export default HomePage
