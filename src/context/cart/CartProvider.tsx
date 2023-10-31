import { type ICartProduct } from '@/interfaces/ICartProduct'
import { type FC, type ReactNode, createContext, useReducer } from 'react'
import { type CartState, cartInitialState, cartReducer } from './cartReducer'

interface ContextProps extends CartState {
  addProductToCart: (product: ICartProduct) => void
  removeCartProduct: (product: ICartProduct) => void
  updateCartQuantity: (product: ICartProduct) => void
}

export const CartContext = createContext<ContextProps>(
  {} as unknown as ContextProps,
)

interface ProviderProps {
  children: ReactNode
}

export const CartProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  // useEffect(() => {
  //     try {
  //         const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ): []
  //         dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
  //     } catch (error) {
  //         dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
  //     }
  // }, []);

  // useEffect(() => {
  //   Cookie.set('cart', JSON.stringify( state.cart ));
  // }, [state.cart]);

  // useEffect(() => {

  //     const numberOfItems = state.cart.reduce( ( prev, current ) => current.quantity + prev , 0 );
  //     const subTotal = state.cart.reduce( ( prev, current ) => (current.price * current.quantity) + prev, 0 );
  //     const taxRate =  Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

  //     const orderSummary = {
  //         numberOfItems,
  //         subTotal,
  //         tax: subTotal * taxRate,
  //         total: subTotal * ( taxRate + 1 )
  //     }

  //     dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
  // }, [state.cart]);

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

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        removeCartProduct,
        updateCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}