import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

import "./Layout.css";

function Layout({ children }) {
  return (
    <>
      <Header />
      <Navbar />
      <main className="main"></main>
      <Footer />
    </>
  );
}

export default Layout;
