import axios from 'axios';

const initialState = {
  media: [],
  combo: [],
};

// ACTION TYPES
const GOT_MEDIA = 'GOT_MEDIA';
const GOT_COMBO = 'GOT_COMBO';

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

export const getComboThunk = word => { 
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/media/combo/${word}`);
      dispatch(gotCombo(data));
    } catch (error) {
      console.error('This error is at getComboThunk ', error);
    }
  }
}

// MEDIA REDUCER
const mediaReducer = (state = initialState, action) => { 
  switch(action.type) {
    case GOT_MEDIA: 
      return { ...state, media: action.media };
    case GOT_COMBO: 
      return { ...state, combo: action.combo };
    default:
      return state;
  }
}

export default mediaReducer;