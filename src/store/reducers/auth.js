import * as actionTypes from '../actions/actionTypes'

const initialState = {
  loading: false,
  user: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  state = {...state, user:localStorage.getItem('user')};
  switch(action.type){
    case actionTypes.AUTH_SIGNIN:
      return {...state, loading:true};
    case actionTypes.AUTH_SIGNIN_SUCCESS:
      const uid = action.payload.data.user.uid;
      localStorage.setItem('user', uid);
      return {...state, user:uid, loading:false};
    case actionTypes.AUTH_SIGNIN_ERROR:
      let error = null;
      if (action.payload.errorCode === 'auth/user-not-found') error = 'This user is not registered';
      else if (action.payload.errorCode === 'auth/wrong-password') error = 'Wrong password';
      return {...state, loading:false, error};
    case actionTypes.AUTH_LOGOUT:
      return {...state, loading:true};
    case actionTypes.AUTH_LOGOUT_SUCCESS:
      localStorage.removeItem('user');
      return {...state, user:null, loading:false};
    case actionTypes.AUTH_LOGOUT_ERROR:
      return {...state, loading:false, error:action.payload.error};
    case actionTypes.RESET:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;