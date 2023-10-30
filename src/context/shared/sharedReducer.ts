export interface SharedState {
  isMenuOpen: boolean
}

export const sharedInitialState: SharedState = {
  isMenuOpen: false,
}

export interface SharedAction {
  type: '[Shared] - Toggle menu'
}

export const sharedReducer = (
  state: SharedState,
  action: SharedAction,
): SharedState => {
  switch (action.type) {
    case '[Shared] - Toggle menu':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      }

    default:
      return state
  }
}
