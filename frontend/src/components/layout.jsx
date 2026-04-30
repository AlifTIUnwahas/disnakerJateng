import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./navigation";
import { Contact } from "./contact";

export const Layout = () => {
  return (
    <>
      <Navigation />
      
      <main>
        <Outlet />
      </main>

      <Contact />
    </>
  );
};