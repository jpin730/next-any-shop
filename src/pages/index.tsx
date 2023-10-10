import { ShopLayout } from '@/components/shared/ShopLayout'
import Typography from '@mui/material/Typography'
import { type NextPage } from 'next'

const HomePage: NextPage = () => {
  return (
    <ShopLayout
      title="Next Any Shop"
      pageDescription="Best product here in Any Shop"
    >
      <Typography variant="h1" component="h1">
        Shop
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        All products
      </Typography>
    </ShopLayout>
  )
}

export default HomePage
