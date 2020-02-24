import axios from 'axios';
import { FETCH_USER } from './types';

// this is the action creator. Actions are normally only allowed to return a plain object (action), but in this case, we want to perform something async inside this creator — resulting in a promise, not an object. redux thunk allows for this. , but in this case, we want to perform something async inside this creator — resulting in a promise, not an object. redux thunk allows for this, but notice that we're returning an async function as opposed to the value. 
// because we initializd redux with the thunk middleware, it will call this function once the promise is resolved and pass in the dispatch function. 
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/currentUser');

  // this is the action. Only pass in res.data because the rest of the object has a bunch of junk
  dispatch({type: FETCH_USER, payload: res.data})
}
