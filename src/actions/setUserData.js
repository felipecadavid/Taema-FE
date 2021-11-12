import { SET_USER_DATA } from './constants';

function setUserData(data) {
  return {
    type: SET_USER_DATA,
    payload: data
  };
}

export default setUserData;