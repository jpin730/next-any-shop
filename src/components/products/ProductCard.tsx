import { type IProduct } from '@/interfaces/IProduct'
import { toCurrency } from '@/utils/toCurrency'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import NextLink from 'next/link'
import { useMemo, type FC, useState } from 'react'

interface Props {
  product: IProduct
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)

  const productImage = useMemo(
    () => `/products/${product.images.at(isHovered ? 1 : 0)}`,
    [isHovered, product.images],
  )

  return (
    <Grid
      item
      xs={6}
      md={4}
      onMouseEnter={() => {
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
    >
      <Card>
        <NextLink href={`/product/${product.slug}`} prefetch={false}>
          <Link component="span">
            <CardActionArea>
              <CardMedia
                component="img"
                className="fadeIn"
                image={productImage}
                alt={product.title}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box sx={{ mt: 1 }} className="fadeIn">
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={400}>{toCurrency(product.price)}</Typography>
      </Box>
    </Grid>
  )
}
