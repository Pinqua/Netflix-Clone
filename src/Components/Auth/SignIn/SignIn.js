import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../../../ContextApi/stateProvider";
import "./SignIn.css";
import { auth, provider } from "../../../Config/firebase";
import { actionType } from "../../../ContextApi/reducer";
import Loading from "../../Loading/Loading";
import netflixLogo from "../../../Images/netflixLogo.png";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, dispatch] = useStateValue();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const signinHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    signInwithEmail();
    setEmail("");
    setPassword("");
  };

  const signInwithEmail = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        setLoading(false);
        dispatch({
          type: actionType.SET_USER,
          user: result.user,
        });
        history.push("/");
      })
      .catch(function (error) {
        setLoading(false);
        // Handle Errors here.
        //var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const signInwithGoogle = () => {
    setLoading(true);
    auth
      .signInWithPopup(provider)
      .then((result) => {
        setLoading(false);
        dispatch({
          type: actionType.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  //Loader
  if (loading) {
    return (
      <Loading
        LoaderType={"TailSpin"}
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
      <div className="signIn">
        <Link to="/">
          <img className="logo" src={netflixLogo} alt="netflix logo" />
        </Link>
        <div className="signin__container">
          <h1>Sign In</h1>
          <form onSubmit={signinHandler}>
            <input
              value={email}
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              value={password}
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit">Sign In</button>
          </form>
          <h3 className="signin__google" onClick={signInwithGoogle}>
            Login with&nbsp;
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="google-logo"
            />
          </h3>
          <h3>
            New to Netflix? <Link to="/signup">Sign up now.</Link>
          </h3>
          <p>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. Learn more.
          </p>
        </div>
      </div>
    );
  }
}

export default SignIn;
