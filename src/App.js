import React, { useEffect, useState } from "react";
import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import SignIn from "./Components/Auth/SignIn/SignIn";
import SignUp from "./Components/Auth/SignUp/SignUp";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import { useStateValue } from "./ContextApi/stateProvider";
import Home from "./Components/Home/Home";
import { auth } from "./Config/firebase";
import { actionType } from "./ContextApi/reducer";
import SearchResult from "./Components/SearchResult/SearchResult";
import Loading from "./Components/Loading/Loading";
import PageNotFound404 from "./Components/PageNotFound404/PageNotFound404";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    //to retain the user signed after refresh without localstorage

    const listener = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: actionType.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
      }
      setLoading(false);
    });

    //clean up
    return () => listener();
  }, [dispatch]);

  if (loading) {
    return (
      <Loading
        addStyle={{
          position: "fixed",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
          zIndex: "99999",
        }}
      />
    );
  } else {
    return (
      <div className="app">
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route path="/" exact>
              {!user ? <LandingPage /> : <Home />}
            </Route>
            <Route path="/browse/:param" exact>
              {!user ? <Redirect to="/signin" /> : <Home />}
            </Route>
            <Route path="/signin">
              {!user ? <SignIn /> : <Redirect to="/" />}
            </Route>
            <Route path="/signup">
              {!user ? <SignUp /> : <Redirect to="/" />}
            </Route>
            <Route path="/search/:query" exact>
              {!user ? <Redirect to="/signin" /> : <SearchResult />}
            </Route>
            <Route path="*">
              <PageNotFound404 />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
