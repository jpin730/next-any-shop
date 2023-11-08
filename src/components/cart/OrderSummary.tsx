import { CartContext } from '@/context/cart/CartProvider'
import { toCurrency } from '@/utils/toCurrency'
import { Grid, Typography } from '@mui/material'
import { useContext, type FC } from 'react'

export const OrderSummary: FC = () => {
  const { numberOfItems, subTotal, total, tax } = useContext(CartContext)

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Quantity</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {numberOfItems} {numberOfItems > 1 ? 'products' : 'product'}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{toCurrency(subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Tax (15%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{toCurrency(tax)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 1 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 1 }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">{toCurrency(total)}</Typography>
      </Grid>
    </Grid>
  )
}
