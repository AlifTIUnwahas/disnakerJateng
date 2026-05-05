import React from "react";
import SwiperHome from "./swiperHome";

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1 style={{textTransform: 'none'}}>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h1>
                <span></span>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
