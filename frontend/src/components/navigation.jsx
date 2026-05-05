import React from "react";
import { Link } from 'react-router-dom';

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <Link to="/" className="navbar-brand page-scroll" style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'flex-start',
                          textAlign: 'left'
                }}>
              <img src="/img/jateng.png" alt="Logo" 
                style={{ 
                        width: '50px', 
                        height: 'auto', 
                        marginRight: '12px',
                        display: 'block'
                }} />
              <span style={{ 
                            fontSize: '18px', 
                            fontWeight: '700', 
                            lineHeight: '1',
                            margin: 0,
                            color: '#333',
                            textTransform: 'uppercase'
              }}>Disnakertrans Jateng
              </span> 
        </div>
          </Link>
          
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a href="/"className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"aria-expanded="false">
                Disnakertrans<span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/profil-dinas">
                    Profil
                  </Link>
                </li>
                <li>
                  <Link to="/visi-dinas">
                    Visi dan Misi
                  </Link>
                </li>
                <li>
                  <Link to="/tusi-dinas">
                    Tugas dan Fungsi
                  </Link>
                </li>
                <li>
                  <Link to="/struktur-dinas">
                    Struktur Organisasi
                  </Link>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="/"className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"aria-expanded="false">
                PPID <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/daftar-informasi-publik">
                    Daftar Informasi Publik
                  </Link>
                </li>
                
                <li>
                  <Link to="/info-berkala">
                    Informasi Berkala
                  </Link>
                </li>
                <li>
                  <Link to="/info-sertamerta">
                    Informasi Serta Merta
                  </Link>
                </li>
                <li>
                  <Link to="/struktur">
                    Struktur PPID Pelaksana
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              
            </li>
            <li>
              
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
