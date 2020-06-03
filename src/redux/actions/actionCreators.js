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


export const postWords = (text1, text2) => (dispatch) => {
    const newWords = {
        text1: text1,
        text2: text2
    };

    return fetch(`${url}/word`, {
        method: 'POST',
        body: JSON.stringify(newWords),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;

                throw error;
            }
        },
            error => {
                var errorMessage = new Error(error.errorMessage);
                throw errorMessage;
            }
        )
        .then(response => response.json())
        .then(response => dispatch(addWords(response)))
        .catch(error => {
            console.log('Post words: ' + error.message);
            alert('Words could not be posted:\n' + error.message)
        })
};