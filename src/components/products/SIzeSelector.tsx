import { type IProductSize } from '@/interfaces/IProduct'
import { Box, Button } from '@mui/material'
import { type FC } from 'react'

interface Props {
  selectedSize?: IProductSize
  sizes: IProductSize[]
  onSelectedSize: (size: IProductSize) => void
}

export const SizeSelector: FC<Props> = ({
  sizes,
  selectedSize,
  onSelectedSize,
}) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          key={size}
          size="small"
          color={selectedSize === size ? 'primary' : 'info'}
          onClick={() => {
            onSelectedSize(size)
          }}
        >
          {size}
        </Button>
      ))}
    </Box>
  )
}
