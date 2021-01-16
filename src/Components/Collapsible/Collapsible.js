import { ClickAwayListener } from "@material-ui/core";
import { Add, Close } from "@material-ui/icons";
import React, { useState } from "react";
import "./Collapsible.css";

function Collapsible({ header, body }) {
  const [hide, setHide] = useState(false);

  const handleClick = () => {
    setHide(!hide);
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setHide(false);
      }}
    >
      <div className="collapsible">
        <button className="accordion" onClick={handleClick}>
          {header}
          <span>{hide ? <Close /> : <Add />}</span>
        </button>
        <div className={`panel ${hide ? "show" : ""}`}>
          <p>{body}</p>
        </div>
      </div>
    </ClickAwayListener>
  );
}

export default Collapsible;
