import * as ActionTypes from './actionTypes';
import { url } from '../url';

export const wordsLoading = () => ({
    type: ActionTypes.WORDS_LOADING,
});
  
export const wordsFailed = errmess => ({
    type: ActionTypes.WORDS_FAILED,
    payload: errmess,
});
  
export const addWords = words => ({
    type: ActionTypes.ADD_WORDS,
    payload: words,
});

export const fetchWords = () => dispatch => {
    dispatch(wordsLoading(true));
    return fetch(`${url}/word`)
      .then(response => {
        if (response.ok) {
          return response;
        }
  
        const error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      },
      error => {
        const errmess = new Error(error.message);
        throw errmess;
      })
      .then(response => response.json())
      .then(words => dispatch(addWords(words)))
      .catch(error => dispatch(wordsFailed(error.message)));
};
