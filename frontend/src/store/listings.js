import { csrfFetch } from "./csrf";


const LOAD = 'listing/loadListings';

const load = (spots) => ({
    type: LOAD,
    payload: spots,
})



export const loadListings = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "GET",
  });
  const data = await response.json();
  dispatch(load(data.spots));
  return response;
};



const initialState = []

const listingsReducer = (state = initialState, action) => {
    let newState;

    switch(action.type) {
        case LOAD:
            newState = [...action.payload]
            return newState;
        default:
            return state;

    }
}


export default listingsReducer;
