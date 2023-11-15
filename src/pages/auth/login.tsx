import { AuthLayout } from '@/components/shared/AuthLayout'
import { AuthContext } from '@/context/auth/AuthProvider'
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
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

interface LoginFormData {
  email: string
  password: string
}

const LoginPage: NextPage = () => {
  const router = useRouter()
  const { loginUser } = useContext(AuthContext)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { email: 'user@email.com', password: '123456' },
  })

  const onLoginUser: SubmitHandler<LoginFormData> = async ({
    email,
    password,
  }): Promise<void> => {
    setShowError(false)

    const response = await loginUser(email, password)

    if (response.hasError) {
      setShowError(true)
      setErrorMessage(response.message ?? 'Error on login')
      setTimeout(() => {
        setShowError(false)
      }, 3000)
      return
    }

    void router.replace(router.query.p?.toString() ?? '/')
  }

  const loginAsAdmin = (): void => {
    onLoginUser({ email: 'admin@email.com', password: '123456' })
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
                label={errorMessage}
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
            <Grid item xs={12} display="flex" justifyContent="center">
              <Link
                component="button"
                type="button"
                underline="hover"
                onClick={loginAsAdmin}
              >
                Login as Admin
              </Link>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={{
                  pathname: '/auth/register',
                  query: { p: router.query.p },
                }}
              >
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
