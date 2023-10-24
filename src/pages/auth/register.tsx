import { AuthLayout } from '@/components/shared/AuthLayout'
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { type NextPage } from 'next'
import NextLink from 'next/link'

const RegisterPage: NextPage = () => {
  return (
    <AuthLayout title="Register">
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1">Create account</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label="Full name" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="filled"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
            >
              Create
            </Button>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="end">
            <NextLink href="/auth/login">
              <Link component="span" underline="always">
                Do you already have an account?
              </Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  )
}

export default RegisterPage
