import { type ICartProduct } from '@/interfaces/ICartProduct'
import {
  type FC,
  type ReactNode,
  createContext,
  useReducer,
  useEffect,
  useRef,
} from 'react'
import { type CartState, cartInitialState, cartReducer } from './cartReducer'
import Cookies from 'js-cookie'
import { getAddressFromCookies } from '@/utils/getAddressFromCookies'
import { type IAddress } from '@/interfaces/IAddress'
import { type IOrder } from '@/interfaces/IOrder'
import { anyShopApi } from '@/api/anyShopApi'
import axios from 'axios'

interface ContextProps extends CartState {
  addProductToCart: (product: ICartProduct) => void
  removeCartProduct: (product: ICartProduct) => void
  updateCartQuantity: (product: ICartProduct) => void
  updateAddress: (address: IAddress) => void
  createOrder: () => Promise<{
    hasError: boolean
    message: string
  }>
}

export const CartContext = createContext({} as unknown as ContextProps)

interface ProviderProps {
  children: ReactNode
}

export const CartProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)
  const firstTimeLoad = useRef(true)

  useEffect(() => {
    try {
      const cookieProducts = JSON.parse(Cookies.get('cart') ?? '[]')
      dispatch({
        type: '[Cart] - Load cart from cookies | storage',
        payload: cookieProducts,
      })
    } catch (error) {
      dispatch({
        type: '[Cart] - Load cart from cookies | storage',
        payload: [],
      })
    }
  }, [])

  useEffect(() => {
    dispatch({
      type: '[Cart] - Load address from cookies',
      payload: getAddressFromCookies(),
    })
  }, [])

  useEffect(() => {
    if (firstTimeLoad.current) {
      firstTimeLoad.current = false
      if (state.cart.length === 0) return
    }

    Cookies.set('cart', JSON.stringify(state.cart))
  }, [state.cart])

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0,
    )
    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0,
    )
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE)

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    }

    dispatch({ type: '[Cart] - Update order summary', payload: orderSummary })
  }, [state.cart])

  const addProductToCart = (product: ICartProduct): void => {
    const productInCart = state.cart.some((p) => p._id === product._id)
    if (!productInCart) {
      dispatch({
        type: '[Cart] - Update products in cart',
        payload: [...state.cart, product],
      })
      return
    }

    const productInCartButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size,
    )
    if (!productInCartButDifferentSize) {
      dispatch({
        type: '[Cart] - Update products in cart',
        payload: [...state.cart, product],
      })
      return
    }

    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p
      if (p.size !== product.size) return p
      p.quantity += product.quantity
      return p
    })

    dispatch({
      type: '[Cart] - Update products in cart',
      payload: updatedProducts,
    })
  }

  const updateCartQuantity = (product: ICartProduct): void => {
    dispatch({ type: '[Cart] - Change cart quantity', payload: product })
  }

  const removeCartProduct = (product: ICartProduct): void => {
    dispatch({ type: '[Cart] - Remove product in cart', payload: product })
  }

  const updateAddress = (address: IAddress): void => {
    Cookies.set('address', JSON.stringify(address))

    dispatch({ type: '[Cart] - Update address', payload: address })
  }

  const createOrder = async (): Promise<{
    hasError: boolean
    message: string
  }> => {
    try {
      if (state.address == null) {
        return {
          hasError: true,
          message: 'Address is required',
        }
      }

      const body: IOrder = {
        orderItems: state.cart,
        address: state.address,
        numberOfItems: state.numberOfItems,
        subTotal: state.subTotal,
        tax: state.tax,
        total: state.total,
        isPaid: false,
      }
      const { data } = await anyShopApi.post<IOrder>('/orders', body)

      dispatch({ type: '[Cart] - Order complete' })

      return {
        hasError: false,
        message: data._id ?? '',
      }
    } catch (error) {
      console.error(error)

      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        }
      }
      return {
        hasError: true,
        message: 'Server error',
      }
    }
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        removeCartProduct,
        updateCartQuantity,
        updateAddress,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
