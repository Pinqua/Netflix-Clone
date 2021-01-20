import React from "react";
import Loader from "react-loader-spinner";
import "./Loading.css";

function Loading({ LoaderType, addStyle, LoaderStyle }) {
  return (
    <div className="loading" style={addStyle}>
      <Loader
        type={!LoaderType ? "BallTriangle" : LoaderType}
        color="#e50914"
        style={LoaderStyle}
      />
    </div>
  );
}

export default Loading;
