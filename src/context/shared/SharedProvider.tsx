import { type ReactNode, createContext, useReducer, type FC } from 'react'
import {
  sharedInitialState,
  sharedReducer,
  type SharedState,
} from './sharedReducer'

interface ContextProps extends SharedState {
  toggleSideMenu: () => void
}

export const SharedContext = createContext<ContextProps>(
  {} as unknown as ContextProps,
)

interface ProviderProps {
  children: ReactNode
}

export const SharedProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(sharedReducer, sharedInitialState)

  const toggleSideMenu = (): void => {
    dispatch({ type: '[Shared] - Toggle menu' })
  }

  return (
    <SharedContext.Provider
      value={{
        ...state,
        toggleSideMenu,
      }}
    >
      {children}
    </SharedContext.Provider>
  )
}
