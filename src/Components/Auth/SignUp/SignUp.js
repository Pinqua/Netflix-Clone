import React, { useState } from "react";
import "./SignUp.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../../Config/firebase";
import { LockOpen } from "@material-ui/icons";
import Loading from "../../Loading/Loading";
import netflixLogo from "../../../Images/netflixLogo.png";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const signupHandler = (e) => {
    e.preventDefault();
    if (password1 === password2) {
      setLoading(true);
      signUpwithEmail();
      setEmail("");
    } else {
      alert("Both passwords didn't match");
    }
    setPassword1("");
    setPassword2("");
  };

  const signUpwithEmail = () => {
    auth
      .createUserWithEmailAndPassword(email, password1)
      .then((user) => {
        if (user) {
          alert("Account Created");
        }
        setLoading(false);
        history.push("/");
      })
      .catch(function (error) {
        setLoading(false);
        //var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };

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
      <div className="signUp">
        <Link to="/">
          <img className="logo" src={netflixLogo} alt="netflix logo" />
        </Link>
        <div className="signup__container">
          <h1>Sign Up</h1>
          <form onSubmit={signupHandler}>
            <input
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
            />
            <input
              required
              type="password"
              onChange={(e) => setPassword1(e.target.value)}
              value={password1}
              placeholder="Password"
            />
            <input
              required
              type="password"
              onChange={(e) => setPassword2(e.target.value)}
              value={password2}
              placeholder="Confirm Password"
            />
            <button type="submit">Sign Up</button>
          </form>
          <Link to="/signin">
            <LockOpen />
            &nbsp;Sign In
          </Link>
        </div>
      </div>
    );
  }
}

export default SignUp;
