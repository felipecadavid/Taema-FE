import { createStore } from 'redux';
import reducer from './reducers';

export default function createAppStore() {
  return createStore(reducer);
}