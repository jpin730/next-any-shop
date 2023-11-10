import {
  type FC,
  createContext,
  useReducer,
  type ReactNode,
  useEffect,
} from 'react'
import { authInitialState, authReducer, type AuthState } from './authReducer'
import Cookies from 'js-cookie'
import { anyShopApi } from '@/api/anyShopApi'
import { type AxiosError } from 'axios'
import { useRouter } from 'next/router'

interface ContextResponse {
  hasError: boolean
  message?: string
}

interface ContextProps extends AuthState {
  loginUser: (email: string, password: string) => Promise<ContextResponse>
  registerUser: (
    name: string,
    email: string,
    password: string,
  ) => Promise<ContextResponse>
  logout: () => void
}

export const AuthContext = createContext({} as unknown as ContextProps)

interface ProviderProps {
  children: ReactNode
}

export const AuthProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState)

  const router = useRouter()

  useEffect(() => {
    void checkToken()
  }, [])

  const checkToken = async (): Promise<void> => {
    if (Cookies.get('token') === undefined) return

    try {
      const { data } = await anyShopApi.get('/auth/validate')
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: '[Auth] - Login', payload: user })
    } catch (error) {
      Cookies.remove('token')
    }
  }

  const loginUser = async (
    email: string,
    password: string,
  ): Promise<ContextResponse> => {
    try {
      const { data } = await anyShopApi.post('/auth/login', { email, password })
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: '[Auth] - Login', payload: user })
      return { hasError: false }
    } catch (error) {
      const message = (error as AxiosError<{ message?: string }>).response?.data
        .message
      return { hasError: true, message }
    }
  }

  const registerUser = async (
    name: string,
    email: string,
    password: string,
  ): Promise<ContextResponse> => {
    try {
      const { data } = await anyShopApi.post('/auth/register', {
        name,
        email,
        password,
      })
      const { token, user } = data
      Cookies.set('token', token)
      dispatch({ type: '[Auth] - Login', payload: user })
      return {
        hasError: false,
      }
    } catch (error) {
      const message = (error as AxiosError<{ message?: string }>).response?.data
        .message
      return { hasError: true, message }
    }
  }

  const logout = (): void => {
    Cookies.remove('token')
    Cookies.remove('cart')
    router.reload()
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
