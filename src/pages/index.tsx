import { ProductList } from '@/components/products/ProductList'
import { ShopLayout } from '@/components/shared/ShopLayout'
import { initialData } from '@/database/data'
import { type IProduct } from '@/interfaces/IProduct'
import Typography from '@mui/material/Typography'
import { type NextPage } from 'next'

const HomePage: NextPage = () => {
  return (
    <ShopLayout
      title="Next Any Shop"
      pageDescription="Best product here in Any Shop"
    >
      <Typography variant="h1" sx={{ mb: 3 }}>
        All products
      </Typography>

      <ProductList products={initialData.products as IProduct[]} />
    </ShopLayout>
  )
}

export default HomePage
