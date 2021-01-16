import React from "react";
import "./Jumbotron.css";

function Jumbotron({ img, img_position, alt, title, content }) {
  return (
    <div className="jumbotron">
      {img_position ? (
        <div className="jumbotron__content">
          <div className="jumbotron__text">
            <h1>{title}</h1>
            <p>{content}</p>
          </div>
          <img src={img} alt={alt} />
        </div>
      ) : (
        <div className="jumbotron__content">
          <img className="jumboImage-1" src={img} alt={alt} />
          <div className="jumbotron__text">
            <h1>{title}</h1>
            <p>{content}</p>
          </div>
          <img className="jumboImage-2" src={img} alt={alt} />
        </div>
      )}
    </div>
  );
}

export default Jumbotron;
