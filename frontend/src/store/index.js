import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from '../store/session'
import listingsReducer from '../store/listings'
import reviewReducer from '../store/reviews'
import favoriteReducer from '../store/favorite'


const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  listings: listingsReducer,
  reviews: reviewReducer,
  favorites: favoriteReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
