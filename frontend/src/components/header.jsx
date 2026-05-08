import React from "react";

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">

              <div className="col-md-8 col-md-offset-2 intro-text">
                <div style={{ display: "flex", gap: "20px", marginBottom: "30px", justifyContent: "center", alignItems: "center"}}>
                  <img src="/img/jateng.png" alt="Logo Jateng" style={{ height: "70px" }} />
                  <img src="/img/ayoKerjo.png" alt="Logo Ayo Kerjo" style={{ height: "60px" }} />
                  <img src="/img/ngopeniNglakoni.png" alt="Logo Ngopeni Nglakoni Jateng" style={{ height: "60px" }} />
                </div>
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
