type Action = {
    type: string,
    payload: any
}

export function authReducer(initialState: any, action: Action) {
  switch (action.type) {
    case 'ON_CHANGE': {
      const { id, value } = action.payload;

      return { ...initialState, [id]: value };
    }
    case 'TOGGLE_PASSWORD_VISIBILITY':
      return {
        ...initialState,
        isPasswordVisible: action.payload,
      };
    case 'CHECK_INPUT_VALUES':
      return {
        ...initialState,
        areValuesProvided: action.payload,
      };
    case 'SET_INPUT_ERRORS':
      return { ...initialState, inputErrors: action.payload };
    default:
      return initialState;
  }
}
