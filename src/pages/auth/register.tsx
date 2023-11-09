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
import { useForm } from 'react-hook-form'

interface RegisterFormData {
  name: string
  email: string
  password: string
}

const RegisterPage: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormData>()

  const [showError, setShowError] = useState(false)

  const onRegisterForm = async ({
    name,
    email,
    password,
  }: RegisterFormData): Promise<void> => {
    setShowError(true)
    // const { hasError, message } = await registerUser(name, email, password);

    // if ( hasError ) {
    //     setShowError(true);
    //     setErrorMessage( message! );
    setTimeout(() => {
      setShowError(false)
    }, 3000)
    //     return;
    // }

    // router.replace('/');
  }
  return (
    <AuthLayout title="Register">
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1">Create account</Typography>
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
                label="Full name"
                variant="filled"
                fullWidth
                {...register('name', {
                  required: 'Field is required',
                  minLength: {
                    value: 2,
                    message: 'Field must be at least 2 characters',
                  },
                })}
                error={errors.name !== undefined}
                helperText={errors.name?.message}
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
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
