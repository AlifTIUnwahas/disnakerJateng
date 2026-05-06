import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { Berita } from "./components/berita";
import { Berkala } from "./pages/berkala"
import { About } from "./components/about";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { DetailBerita } from "./components/detailBerita";
import { Layout } from "./components/layout";
import { Struktur } from "./pages/Struktur";
import { DIP } from "./pages/publikInfo";
import { Serta } from "./pages/sertaMerta";
import { SwiperHome } from './components/swiperHome';
import { DIK } from "./pages/infoKecuali";
import { ProfilPpid } from "./pages/profilPpid";
import { ProfilDinas } from "./pages/sejarahDinas";
import { VisiDinas } from "./pages/visiMisiDinas"
import { TusiDinas } from "./pages/tusiDinas";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

// Halaman utama (landing page)
const Home = ({ data }) => (
  <div>
    <Header data={data.Header} />
    <SwiperHome />
    <Berita data={data.Berita} />
    <About data={data.About} />
    <Gallery data={data.Gallery} />
    <Testimonials data={data.Testimonials} />
  </div>
);

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});

  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home data={landingPageData} />} />
          <Route path="berita/:slug" element={<DetailBerita data={landingPageData.Berita} />} />
          {/* <Route path="layanan" element={<Layanan />} /> */}
          <Route path="profil-dinas" element={<ProfilDinas />} />
          <Route path="visi-dinas" element={<VisiDinas />} />
          <Route path="tusi-dinas" element={<TusiDinas />} />
          {/* Route PPID */}
          <Route path="profil-ppid" element={<ProfilPpid />} />
          <Route path="struktur" element={<Struktur data={landingPageData.Struktur} />} />
          <Route path="daftar-informasi-publik" element={<DIP />} />
          <Route path="info-sertamerta" element={<Serta />} />
          <Route path="info-kecuali" element={<DIK />} />
          <Route path="info-berkala" element={<Berkala />} />
          {/* <Route path="profil" element={<Profil />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;