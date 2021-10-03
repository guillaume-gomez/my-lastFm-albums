import { userActions } from "../constants";

const initialState = {
  user: null,
  error: null
}

export default function(state = initialState, action) {
  const { type } = action;
  switch(type) {
    case userActions.FETCH_USER_DATA_SUCCESS:
      const { user } = action;
      return { user, error: null }
    case userActions.FETCH_USER_DATA_ERRORS:
      console.log("sjkfsjkfd")
      return Object.assign({}, state, { error: action.message });
    default:
      return state;
  }
};
