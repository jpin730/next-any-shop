import { type IProductSize } from '@/interfaces/IProduct'
import { Box, Button } from '@mui/material'
import { type FC } from 'react'

interface Props {
  selectedSize?: IProductSize
  sizes: IProductSize[]
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          key={size}
          size="small"
          color={selectedSize === size ? 'primary' : 'info'}
        >
          {size}
        </Button>
      ))}
    </Box>
  )
}
