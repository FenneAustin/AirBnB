import { csrfFetch } from "./csrf";

const LOAD = 'review/loadReviews'
const ADD_ONE = 'spot/addOne'
const DELETE_ONE = 'spot/deleteOne'


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
      dispatch(load(data.Reviews));
      return response;
}

// to be continued...
// end of day thoughts... should i put redux things into lcoal storage to persist past page refresh
