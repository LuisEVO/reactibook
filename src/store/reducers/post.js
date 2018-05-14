import * as actionTypes from '../actions/actionTypes'

const initialState = {
  loading: false,
  newPostStatus: null,
  editPostStatus: null,
  error: null,
  records:[],
  unsubscribe: null
};

const postReducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.GET_POSTS:
      return {...state, loading:true};
    case actionTypes.GET_POSTS_SSUCCESS:
      let records = [];
      action.payload.data.forEach((doc) => {
        /*
        const data = doc.data();
        if (
          (data.userId === action.payload.userId) ||
          (data.isPublic)
        )
        */
        records.push({id:doc.id,...doc.data()});
      });
      return {...state, loading:false, error:null, records};
    case actionTypes.GET_POSTS_ERROR:
      console.log(action.payload.error);
      return {...state, loading:false, error:action.payload.error};
    case actionTypes.SET_UNSUBSCRIBE_LISTEN_POSTS:
      return {...state, unsubscribe:action.payload.unsubscribe};
    case actionTypes.STOP_LISTEN_POSTS:
      console.log(state.unsubscribe)
      state.unsubscribe();
      return {...state, unsubscribe:null};

    case actionTypes.NEW_POST:
      return {...state, newPostStatus:'LOADING'};
    case actionTypes.NEW_POST_SUCESS:
      return {...state, newPostStatus:'SUCCESS'};
    case actionTypes.NEW_POST_ERROR:
      return {...state, newPostStatus:'ERROR'};

    case actionTypes.EDIT_POST:
      return {...state, editPostStatus:'LOADING'};
    case actionTypes.EDIT_POST_SUCESS:
      return {...state, editPostStatus:'SUCCESS'};
    case actionTypes.EDIT_POST_ERROR:
      return {...state, editPostStatus:'ERROR'};


    case actionTypes.RESET:
      return initialState;
    default:
      return state;
  }
};

export default postReducer;