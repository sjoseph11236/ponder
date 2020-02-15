import axios from 'axios';

const initialState = {
  media: [],
  combo: {},
  error: ''
};

// ACTION TYPES
const GOT_MEDIA = 'GOT_MEDIA';
const GOT_COMBO = 'GOT_COMBO'
const POSTED_COMBO = 'POSTED_COMBO';
const GOT_ERROR = 'GOT_ERROR'
const CLEAR_ERROR = 'CLEAR_ERROR';

// ACTION CREATORS
export const gotMedia = media => {
  return {
    type: GOT_MEDIA, 
    media
  }
}

export const gotCombo = combo => {
  return { 
    type: GOT_COMBO,
    combo
  }
}

export const postedCombo = combo => { 
  return { 
    type: POSTED_COMBO,
    combo
  }
}

export const gotError = error => {
  return { 
    type: GOT_ERROR,
    error
  }
}

export const clearError = () => {
  return { 
    type: CLEAR_ERROR,
    clear: ''
  }
}

// THUNK
export const getMediaThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/media'); 
      dispatch(gotMedia(data));
    } catch (error) {
      console.error('This error is at getMediaThunk ', error);
    }
  }
}

export const getComboThunk = () => { 
  return async dispatch => { 
    try {
      const { data } = await axios.get('api/media/combo');
      dispatch(gotCombo(data));
    } catch (error) {
      console.error('This error is at getComboThunk ', error);
    }
  }
}

export const postComboThunk = word => { 
  return async dispatch => {
    try {
      const { data } = await axios.post(`/api/media/combo/${word}`);
      dispatch(postedCombo(data));
    } catch (error) {
      dispatch(gotError(error.message));
      setTimeout(()=> {
        dispatch(clearError());
      }, 3000)
      console.error('This error is at postComboThunk ', error);
    }
  }
}

// MEDIA REDUCER
const mediaReducer = (state = initialState, action) => { 
  switch(action.type) {
    case GOT_ERROR: 
      return { ...state, error: action.error };
    case CLEAR_ERROR: 
      return { ...state, error: action.clear};
    case GOT_MEDIA: 
      return { ...state, media: action.media };
    case GOT_COMBO: 
      return { ...state, combo: action.combo };
    case POSTED_COMBO: 
      return { ...state, combo: action.combo };
    default:
      return state;
  }
}

export default mediaReducer;