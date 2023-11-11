import { FullScreenLoading } from '@/components/shared/FullScreenLoading'
import { ShopLayout } from '@/components/shared/ShopLayout'
import { CartContext } from '@/context/cart/CartProvider'
import { STATES } from '@/utils/states'
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import { type NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { type IAddress } from '@/interfaces/IAddress'

interface AddressFormData extends IAddress {}

const AddressPage: NextPage = () => {
  const { isLoaded, cart, address, updateAddress } = useContext(CartContext)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<AddressFormData>({
    defaultValues: address,
  })

  useEffect(() => {
    void (isLoaded && cart.length === 0 && router.replace('/cart/empty'))
  }, [cart.length, isLoaded, router])

  useEffect(() => {
    Object.entries(address).forEach(([key, value]) => {
      setValue(key as keyof IAddress, value)
    })
  }, [address, setValue])

  if (!isLoaded || cart.length === 0) {
    return <FullScreenLoading />
  }

  const onSubmitAddress = (data: AddressFormData): void => {
    updateAddress(data)
    void router.push('/checkout/summary')
  }

  return (
    <ShopLayout title="Address" pageDescription="Confirm address for shipping.">
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmitAddress)} noValidate>
        <Typography variant="h1" sx={{ mb: 3 }}>
          Address
        </Typography>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              label="First Name"
              variant="filled"
              fullWidth
              {...register('firstName', {
                required: 'Field is required',
              })}
              error={errors.firstName !== undefined}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Last Name"
              variant="filled"
              fullWidth
              {...register('lastName', {
                required: 'Field is required',
              })}
              error={errors.lastName !== undefined}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Address 1"
              variant="filled"
              fullWidth
              {...register('address', {
                required: 'Field is required',
              })}
              error={errors.address !== undefined}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Address 2 (optional)"
              variant="filled"
              fullWidth
              {...register('address2')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="ZIP Code"
              variant="filled"
              fullWidth
              {...register('zip', {
                required: 'Field is required',
              })}
              error={errors.zip !== undefined}
              helperText={errors.zip?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="City"
              variant="filled"
              fullWidth
              {...register('city', {
                required: 'Field is required',
              })}
              error={errors.city !== undefined}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="state"
              control={control}
              rules={{ required: 'Field is required' }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  select
                  fullWidth
                  label="State"
                  variant="filled"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors.state !== undefined}
                  helperText={errors.state?.message}
                >
                  <MenuItem value=""></MenuItem>
                  {STATES.map(({ code, name }) => (
                    <MenuItem key={code} value={code}>
                      {name} ({code})
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phone"
              variant="filled"
              fullWidth
              {...register('phone', {
                required: 'Field is required',
              })}
              error={errors.phone !== undefined}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
          >
            Review order
          </Button>
        </Box>
      </form>
    </ShopLayout>
  )
}

export default AddressPage
