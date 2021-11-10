import { SET_TOKEN } from './constants';

function setToken(data) {
  return {
    type: SET_TOKEN,
    payload: data
  };
}

export default setToken;