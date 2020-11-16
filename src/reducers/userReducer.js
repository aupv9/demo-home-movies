import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import * as TYPES from '../actions/types';

export default (state = { auth: false }, action) => {
  switch (action.type) {
   
    case TYPES.LOGIN_SUCCESS:
      return { ...state,auth:true,...action};
      case TYPES.LOGIN_FAIL:
        return { ...state,auth:false,...action};
    default:
      return state;
  }
};
