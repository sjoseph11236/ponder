import Axios from "axios";

// ACTION TYPES
const GOT_ANNOTATIONS = 'GOT_ANNOTATIONS';

// ACTION CREATORS 
export const gotAnnotations = annotations => {
  return { 
    type: GOT_ANNOTATIONS,
    annotations
  };
};

// THUNKS 
export const getAnnotationsThunk = () => {
  return async dispatch => {
    try {
      const { data } = await Axios.get('/api/annotations');
      dispatch(gotAnnotations(data));
    } catch (error) {
      console.log('This error is comming from getAnnotationsThunk ', error);
    }
  }
}

const intialState = { 
  annotations: []
}

// REDUCER
const annotationsReducer = (state = intialState, action) => {
  switch(action.type) {
    case GOT_ANNOTATIONS: 
      return { ...state, annotations: action.annotations };
    default:
      return state; 
  }
}

export default annotationsReducer;