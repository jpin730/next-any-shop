import { type IUser } from '@/interfaces/IUser'

export interface AuthState {
  isLoggedIn: boolean
  user?: IUser
}

export const authInitialState: AuthState = {
  isLoggedIn: false,
  user: undefined,
}

type AuthAction =
  | { type: '[Auth] - Login'; payload: IUser }
  | { type: '[Auth] - Logout' }

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case '[Auth] - Login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      }

    case '[Auth] - Logout':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      }

    default:
      return state
  }
}
