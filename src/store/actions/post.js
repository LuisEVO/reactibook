import * as actionTypes from './actionTypes';
import firebase, {db} from '../../firebase';
import * as moment from 'moment'
const storageRef = firebase.storage().ref();

export const getPostsStart = () => {
  return {
    type: actionTypes.GET_POSTS
  }
};

export const getPostsSuccess = (data) => {
  return {
    type: actionTypes.GET_POSTS_SSUCCESS,
    payload: {data}
  }
};

export const getPostsError = (error) => {
  return {
    type: actionTypes.GET_POSTS_ERROR,
    payload: {error}
  }
};

export const listenPosts = () => {
  return (dispatch, getState) => {
    dispatch(getPostsStart());
    const state = getState();
    const unsubscribe = db.collection('posts')
      .where('userId', '==', state.auth.user)
      //.where('isPublic', '==', true)
      .orderBy('created','desc')
      .onSnapshot(
        querySnapshot => dispatch(getPostsSuccess(querySnapshot)),
        error => dispatch(getPostsError(error))
      );
    dispatch(setUnsubscribeListenPosts(unsubscribe));
  };
};

export const setUnsubscribeListenPosts = (unsubscribe) => {
  return {
    type: actionTypes.SET_UNSUBSCRIBE_LISTEN_POSTS,
    payload: {unsubscribe}
  }
};

export const stopListenPosts = () => {
  return {
    type: actionTypes.STOP_LISTEN_POSTS,
  }
};

export const newPostStart = () => {
  return {
    type: actionTypes.NEW_POST,
  }
};

export const newPostSuccess = () => {
  return {
    type: actionTypes.NEW_POST_SUCESS,
  }
};

export const newPostError = () => {
  return {
    type: actionTypes.NEW_POST_ERROR,
  }
};

export const editPostStart = () => {
  return {
    type: actionTypes.EDIT_POST,
  }
};

export const editPostSuccess = () => {
  return {
    type: actionTypes.EDIT_POST_SUCESS,
  }
};

export const editPostError = () => {
  return {
    type: actionTypes.EDIT_POST_ERROR,
  }
};

const getFileUrl = (data,fileDirName, callback) => {
  return dispatch => {
    storageRef.child(fileDirName).getDownloadURL().then((url) => {
      dispatch(callback({...data, file:url}))
    });
  }
};

const uploadFile = (data, file, callback) => {
  return (dispatch, getState) => {
    const state = getState();
    const fileDirName = `${state.auth.user}/${moment().format('DD/MM/YYYY-HH:mm:ss')}`;
    storageRef.child(fileDirName).put(file).then(() => {
      dispatch(getFileUrl(data, fileDirName, callback))
    });

  }
};

export const sendNewPost = (data) => {
  return (dispatch) => {
    dispatch(newPostStart());
    if (data.file) dispatch(uploadFile(data, data.file, uploadPost));
    else dispatch(uploadPost(data));
  }
};

const uploadPost = (data) => {
  return (dispatch, getState) => {
    const state = getState();
    const {text, isPublic, file} = data;
    db.collection('posts').add({
      text,
      isPublic,
      file,
      created: new Date(),
      userId: state.auth.user
    })
      .then(result=>dispatch(newPostSuccess()))
      .catch(error=>dispatch(newPostError()))
  }
};

export const sendEditPost = (data) => {
  return (dispatch) => {
    dispatch(editPostStart());
    if (data.newFile) dispatch(uploadFile(data, data.newFile, uploadEditPost));
    else dispatch(uploadEditPost(data));
  }
};

const uploadEditPost = (data) => {
  return (dispatch) => {
    const {id, text, isPublic, file} = data;
    db.collection('posts').doc(id)
      .update({
        text,
        isPublic,
        file,
        updated:new Date()
      })
      .then(result=>dispatch(editPostSuccess()))
      .catch(error=>dispatch(editPostError()))
  }
};




export const removePostStart = () => {
  return {
    type: actionTypes.REMOVE_POST
  }
};

export const removePostSuccess = () => {
  return {
    type: actionTypes.REMOVE_POST_SSUCCESS
  }
};

export const removePostError = (error) => {
  return {
    type: actionTypes.REMOVE_POST_ERROR,
    payload: {error}
  }
};

export const removePost = (id) => {
  return dispatch => {
    dispatch(removePostStart());
    db.collection('posts')
      .doc(id)
      .delete()
      .then(()=> dispatch(removePostSuccess()))
      .catch(error=>dispatch(removePostError(error)))
  };
};
