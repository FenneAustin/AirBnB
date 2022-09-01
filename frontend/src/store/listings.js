import { csrfFetch } from "./csrf";


const LOAD = 'listing/loadListings';
const ADD_ONE = 'spot/addOne'
const DELETE_ONE = 'spot/deleteOne'

const load = (spots) => ({
    type: LOAD,
    payload: spots,

})

const addOneSpot = (spot) => ({
  type: ADD_ONE,
  spot
})

const deleteOne = (spotId) => ({
  type: DELETE_ONE,
  payload: spotId
})




export const loadListings = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "GET",
  });
  const data = await response.json();
  dispatch(load(data.spots));
  return response;
};

export const createSpot = (spot) => async (dispatch) => {
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewimage,} = spot;

  const response = await csrfFetch("/api/spots/", {
    method: "POST",
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewimage,
    }),
  });
  const data = await response.json();
  console.log(data)
  dispatch(addOneSpot(data));
  return response;
};

export const deleteSpot = (spotId) => async (dispatch) => {

  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if(response.ok){
  // const data = await response.json();
    dispatch(deleteOne(spotId));
  }

  return response;
};




const initialState = []

const listingsReducer = (state = initialState, action) => {
    let newState;

    switch(action.type) {
        case LOAD:
            newState = [...action.payload]
            return newState;
        case ADD_ONE:
          newState = {...state}
          newState[action.spot.id] = action.spot
          return newState;
        case DELETE_ONE:
          newState = {...state}
          delete newState[action.spotId]
          return newState
        default:
            return state;

    }
}


export default listingsReducer;
