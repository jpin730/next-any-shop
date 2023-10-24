import { AuthLayout } from '@/components/shared/AuthLayout'
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { type NextPage } from 'next'
import NextLink from 'next/link'

const LoginPage: NextPage = () => {
  return (
    <AuthLayout title="Login">
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1">Login</Typography>
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
              Login
            </Button>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="end">
            <NextLink href="/auth/register">
              <Link component="span" underline="always">
                Don&apos;t you have an account?
              </Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  )
}

export default LoginPage
