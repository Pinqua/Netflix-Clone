import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound404.css";

function PageNotFound404() {
  return (
    <div className="notFound404">
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
          <h2>Page not found</h2>
        </div>
        <Link to="/">Homepage</Link>
      </div>
    </div>
  );
}

export default PageNotFound404;
