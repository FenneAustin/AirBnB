import { csrfFetch } from "./csrf";

const LOAD = 'review/loadReviews'
const ADD_ONE = 'review/addOne'
const DELETE_ONE = 'review/deleteOne'


const load = (reviews) => ({
    type: LOAD,
    payload: reviews,
})


const addOneReview = (review) => ({
    type: ADD_ONE,
    review
})

const deleteOne = (reviewId) => ({
  type: DELETE_ONE,
  payload: reviewId,
});


export const loadReviews = (spotId) => async (dispatch) => {
      const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "GET",
      });
      const data = await response.json();
      if(response.ok){
        if(data){
          dispatch(load(data));
        }
      }
      return response;
}


export const createReview = (newReview, spotId) => async (dispatch) => {
  const {
    review,
    stars
  } = newReview;

  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    body: JSON.stringify({
      review,
      stars
    }),
  });
  const data = await response.json();
  dispatch(addOneReview(data));
  return response;
};


export const deleteReview = (reviewId, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    // const data = await response.json();
    dispatch(deleteOne(spotId));
  }
  return response;
};

// to be continued...
// end of day thoughts... should i put redux things into lcoal storage to persist past page refresh

const initialState = []

const reviewReducer = (state = initialState, action) => {

  let newState;

  switch(action.type){
    case LOAD:
      newState =[action.payload]
      return newState;
    case DELETE_ONE:
      newState={...state}
      delete newState[action.reviewId]
      return newState;
    case ADD_ONE:
      newState={...state}
      newState[action.review.id] = action.review;
      return newState;
    default:
      return state;
  }
}



export default reviewReducer;
