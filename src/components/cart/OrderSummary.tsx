import { toCurrency } from '@/utils/toCurrency'
import { Grid, Typography } from '@mui/material'
import { type FC } from 'react'

export const OrderSummary: FC = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>Quantity</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>3 items</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{toCurrency(155.36)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Tax (15%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{toCurrency(35.34)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 1 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 1 }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">{toCurrency(186.34)}</Typography>
      </Grid>
    </Grid>
  )
}
