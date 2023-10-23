import { ShopLayout } from '@/components/shared/ShopLayout'
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { type NextPage } from 'next'

const AddressPage: NextPage = () => {
  return (
    <ShopLayout title="Address" pageDescription="Confirm address for shipping.">
      <Typography variant="h1" sx={{ mb: 3 }}>
        Address
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <TextField label="First Name" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Last Name" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField label="Address 1" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Address 2 (optional)" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField label="ZIP Code" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="City" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl variant="filled" fullWidth>
            <InputLabel>State</InputLabel>
            <Select variant="filled">
              <MenuItem value="ca">California</MenuItem>
              <MenuItem value="fl">Florida</MenuItem>
              <MenuItem value="ny">New York</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Phone" variant="filled" fullWidth />
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
        <Button color="secondary" className="circular-btn" size="large">
          Review order
        </Button>
      </Box>
    </ShopLayout>
  )
}

export default AddressPage
