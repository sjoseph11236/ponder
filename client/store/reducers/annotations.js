import axios from "axios";

// ACTION TYPES
const GOT_ANNOTATIONS = 'GOT_ANNOTATIONS';
const CLEAR_ANNOTATIONS = 'CLEAR_ANNOTATIONS';

// ACTION CREATORS 
export const gotAnnotations = annotations => {
  return { 
    type: GOT_ANNOTATIONS,
    annotations
  };
};

export const clearAnnotations = () => {
  return {
    type: CLEAR_ANNOTATIONS,
    clear: []
  }
}

// THUNKS 
export const getAnnotationsThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/annotations');
      dispatch(gotAnnotations(data));
    } catch (error) {
      console.log('This error is comming from getAnnotationsThunk ', error);
    }
  }
}

export const getComboAnnotationsThunk = comboId => {
  return async dispatch => { 
    try {
      const { data } = await axios.get(`/api/annotations/${comboId}/feed`);
      dispatch(gotAnnotations(data));
    } catch (error) {
      console.error('This error is at getComboAnnotationsThunk ', error);
    }
  }
}

export const postComboAnnotationThunk = (comboId, text)  => {
  return async dispatch => {
    try {
      const { data } = await axios.post(`/api/annotations/${comboId}/feed`, { text });
      dispatch(gotAnnotations(data));
    } catch (error) {
      console.error('This error is at postComboAnnotationThunk ', error);
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
    case CLEAR_ANNOTATIONS: 
      return { ...state, annotations: action.clear };
    default:
      return state; 
  }
}

export default annotationsReducer;