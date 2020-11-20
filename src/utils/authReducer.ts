type Action = {
    type: string,
    payload: any
}

export function authReducer(initialState: any, action: Action) {
  switch (action.type) {
    case 'ON_CHANGE': {
      const { id, value, inputErr } = action.payload;

      return { ...initialState, [id]: value, inputError: inputErr };
    }
    case 'SET_INPUT_ERRORS':
      return { ...initialState, inputErrors: action.payload };
    case 'SET_SERVER_ERROR':
      return { ...initialState, serverError: action.payload };
    default:
      return initialState;
  }
}
