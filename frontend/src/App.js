import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ListingsView from "./components/ListingsView";
import FilterBar from './components/ListingsView/FilterBar'
import CreateListing from './components/CreateListing/index'
import SpotPage from './components/SpotPage/index'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <FilterBar />
            <ListingsView />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/become-a-host'>
            <CreateListing />
          </Route>
          <Route path='/spots/:spotId'>
            <SpotPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
