import { AuthLayout } from '@/components/shared/AuthLayout'
import { isEmail } from '@/utils/validators'
import ErrorOutline from '@mui/icons-material/ErrorOutline'
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import { type NextPage } from 'next'
import NextLink from 'next/link'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

interface LoginFormData {
  email: string
  password: string
}

const LoginPage: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>()

  const [showError, setShowError] = useState(false)

  const onLoginUser: SubmitHandler<LoginFormData> = ({
    email,
    password,
  }): void => {
    setShowError(true)

    // const isValidLogin = await loginUser(email, password)

    // if (!isValidLogin) {
    //   setShowError(true)
    setTimeout(() => {
      setShowError(false)
    }, 3000)
    //   return
    // }

    // router.replace('/');
  }

  return (
    <AuthLayout title="Login">
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1">Login</Typography>
              <Chip
                label="Credentials are not valid"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? 'flex' : 'none', mt: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: 'Field is required',
                  validate: isEmail,
                })}
                error={errors.email !== undefined}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'Field is required',
                  minLength: {
                    value: 6,
                    message: 'Field must be at least 6 characters',
                  },
                })}
                error={errors.password !== undefined}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
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
      </form>
    </AuthLayout>
  )
}

export default LoginPage
