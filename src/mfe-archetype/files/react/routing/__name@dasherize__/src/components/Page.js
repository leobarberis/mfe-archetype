import React from "react";
import { Link as RouterLink } from "react-router-dom";

export default () => {
  return (
    <div className="mdc-card mdc-card--outlined">
      <h1>My Page!</h1>
      <p>
        <RouterLink style={{ textDecoration: "none" }} to="/<%= name %>">
          <button className="mdc-button mdc-button--raised">
            <span className="mdc-button__label">Home</span>
          </button>
        </RouterLink>
      </p>
    </div>
  );
};
