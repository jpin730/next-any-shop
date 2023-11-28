import { CartContext } from '@/context/cart/CartProvider'
import { toCurrency } from '@/utils/toCurrency'
import { Grid, Typography } from '@mui/material'
import { useContext, type FC } from 'react'

interface Props {
  orderValues?: {
    numberOfItems: number
    subTotal: number
    total: number
    tax: number
  }
}

export const OrderSummary: FC<Props> = ({ orderValues }) => {
  const { numberOfItems, subTotal, total, tax } = useContext(CartContext)

  const summaryValues = orderValues ?? { numberOfItems, subTotal, total, tax }

  const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE)

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Quantity</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {summaryValues.numberOfItems}{' '}
          {summaryValues.numberOfItems > 1 ? 'products' : 'product'}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{toCurrency(summaryValues.subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Tax ({taxRate * 100}%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{toCurrency(summaryValues.tax)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 1 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 1 }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">
          {toCurrency(summaryValues.total)}
        </Typography>
      </Grid>
    </Grid>
  )
}
