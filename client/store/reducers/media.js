import axios from 'axios';
import { clearAnnotations } from '../reducers/annotations';

const initialState = {
  media: [],
  combo: {},
  combos: [],
  error: ''
};

// ACTION TYPES
const GOT_MEDIA = 'GOT_MEDIA';
const GOT_COMBO = 'GOT_COMBO';
const GOT_COMBOS = 'GOT_COMBOS';
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

export const gotCombos = combos => {
  return { 
    type: GOT_COMBOS,
    combos
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
      console.error(error);
    }
  }
}

export const getMediaByWordThunk = word => { 
  return async dispatch => { 
    try {
      console.log(" word 77",  word )
      const { data } = await axios.get(`/api/media/${word}`);
      console.log("data 79", data);
      if(data.length){ 
        dispatch(postComboThunk(word, data))
      }
      else{ 
        dispatch(getMediaByWordInDescriptionThunk(word));
      }
    } catch (error) {
      console.error(error);
    }
  }
}
export const getMediaByWordInDescriptionThunk = word => { 
  return async dispatch => {
    try {
      console.log('word  93', word);
      const { data } = await axios.get(`/api/media/description/${word}`);
      console.log("data 94 ", data );
      if(data.length){ 
        dispatch(postComboThunk(word, data))
      }
      else{ 
        dispatch(getYoutubeDataThunk(word));
      }
    } catch (error) {
      console.error(error);      
    }
  }
}
export const getCombosThunk = word => { 
  return async dispatch => { 
    try {
      const { data } = await axios.get(`/api/media/combos/${word}`);
      if(data.length){ 
        dispatch(gotCombos(data));
        dispatch(gotCombo(data[0]));
      }
      else{ 
        dispatch(postComboThunk(word));
      }
    } catch (error) {
      console.error(error);
    }
  }
}
export const getComboThunk = () => { 
  return async dispatch => { 
    try {
      const { data } = await axios.get('api/media/combo');
      dispatch(gotCombo(data));
    } catch (error) {
      console.error(error);
    }
  }
}

// export const checkMediaDescriptionThunk = word =>  {
//   return async dispatch => { 
//     try {
//       console.log('posting with', word);
//       const { data } = await axios.post(`/api/media/description/combo/${word}`);
//       // check if new combo was made. 
//       if(Object.keys(data).length){
//         dispatch(postedCombo(data));
//         dispatch(clearAnnotations());
//       }
//       else { 
//         // find new media with Youtube Api by the word.
//         dispatch(getYoutubeDataThunk(word));
//         // dispatch(getYoutubeMusicThunk(word));s
//       }
//     } catch (error) {
//       console.error(error);      
//     }
//   }
// }

// This thunk is triggered by submit of search bar
export const postComboThunk = (word, media) => { 
  return async dispatch => {
    try {
      console.log('posting with', word);
      const { data } = await axios.post(`/api/media/combo/${word}`, media);
      console.log("postComboThunk -> data", data);
      // check if new combo was made. 
      dispatch(postedCombo(data));
      dispatch(clearAnnotations());
    } catch (error) {
      dispatch(gotError(error.message));
      setTimeout(()=> {
        dispatch(clearError());
      }, 3000)
      console.error(error);
    }
  }
}

export const getYoutubeDataThunk = word => { 
  return async dispatch => {
    try {
      console.log('hear at Movie 186 ', word);
      const movies = await axios.get(`/api/youtube/movies/${word}`);
      console.log("movies  188", movies.data );
      const music = await axios.get(`/api/youtube/music/${word}`);
      console.log("music", music.data);
      if(!music.data.length && !movies.data.length){
        dispatch(gotError('Try a different word'));
        setTimeout(()=> {
          dispatch(clearError());
        }, 3000)
      }
      else {
        dispatch(getMediaByWordThunk(word));
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export const getNextComboThunk = currComboId => { 
  return async dispatch => {
    try {
      const { data } = await axios.get(`api/media/${currComboId}/next`);
      dispatch(gotCombo(data));
    } catch (error) {
      console.error(error);
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
    case GOT_COMBOS: 
      return { ...state, combos: action.combos };
    case POSTED_COMBO: 
      return { ...state, combo: action.combo };
    default:
      return state;
  }
}

export default mediaReducer;