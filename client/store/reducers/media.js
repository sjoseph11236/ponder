import axios from 'axios';

const initialState = {
  media: [],
};

// ACTION TYPES
const GOT_MEDIA = 'GOT_MEDIA';


// ACTION CREATORS
export const gotMedia = media => {
  return {
    type: GOT_MEDIA, 
    media
  }
}

// THUNK
export const getMediaThunk = () => {
  return async dispatch => {
    try {
      console.log('HERE AT MEID THUNK')
      const { data } = await axios.get('/api/media'); 
      dispatch(gotMedia(data));
    } catch (error) {
      console.log('This error is at getMediaThunk ', error);
    }
  }

}

// MEDIA REDUCER
const mediaReducer = (state = initialState, action) => { 
  switch(action.type) {
    case GOT_MEDIA: 
      return {...state, media: action.media };
    default:
      return state;
  }
}

export default mediaReducer;