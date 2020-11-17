import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import * as TYPES from '../actions/types';

export default (state = { auth: false }, action) => {
  switch (action.type) {
   
    case TYPES.LOGIN_SUCCESS:
      return { ...state,auth:true,...action};
    case TYPES.LOGIN_FAIL:
      return { ...state,auth:false,...action};

    case TYPES.GET_USER_SUCCES:
      return { ...state,auth:true,...action};
    case TYPES.GET_USER_FAIL:
      return { ...state,auth:false,...action};

    case TYPES.LOGOUT_SUCCESS:
      return { ...state,auth:false,...action};
    case TYPES.REGISTER_USER_SUCCES:
        return { ...state,...action};
    case TYPES.REGISTER_USER_FAIL:
      return { ...state,...action};

    case TYPES.SAVE_FILM_SUCCES:
        return { ...state,...action};
    case TYPES.SAVE_FILM_FAIL:
        return { ...state,...action};
        
    default:
      return state;
  }
};
