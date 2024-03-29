import { userActions } from "../constants";
import { ImageType } from "../Interfaces";

export interface UserType {
  name: string;
  playcount: string;
  url: string;
  image: [ImageType, ImageType, ImageType, ImageType]
}

export interface UserReducerState {
  user: UserType | null;
  error: string | null;
}

const initialState = {
  user: null,
  error: null
}

export default function(state = initialState, action: any) {
  const { type } = action;
  switch(type) {
    case userActions.FETCH_USER_DATA_SUCCESS:
      const { user } = action;
      return { user, error: null }
    case userActions.FETCH_USER_DATA_ERRORS:
      return { user: null, error: action.message };
    default:
      return state;
  }
};
