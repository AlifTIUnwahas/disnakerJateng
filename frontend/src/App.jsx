import React, { useState, useEffect, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Loadable from "./components/Loadable";
import DashboardLayout from './layout/Dashboard';
import { Header } from "./components/header";
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
import { StrukturDinas } from "./pages/strukturDinas";
import { DashboardPosts } from "./pages/dashboard/Post/posts";
import AuthGuard from './components/AuthGuard';
import JsonData from "./data/data.json";
import ThemeCustomization from './themes';
import { ConfigProvider } from './contexts/ConfigContext';
import SmoothScroll from "smooth-scroll";
import "./App.css";

const LoginPage = Loadable(lazy(() => import('./pages/auth/Login')));
const RegisterPage = Loadable(lazy(() => import('./pages/auth/Register')));
const DashboardDefault = Loadable(lazy(() => import('./pages/dashboard/default')));
const Color = Loadable(lazy(() => import('./pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('./pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('./pages/component-overview/shadows')));

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
<ConfigProvider>
      <ThemeCustomization>
        <Router>
          <Routes>
            {/* 1. Portal Publik (Tanpa Layout Mantis jika ingin tetap style lama) */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home data={landingPageData} />} />
              <Route path="berita/:slug" element={<DetailBerita data={landingPageData.Berita} />} />
              <Route path="profil-dinas" element={<ProfilDinas />} />
              <Route path="visi-dinas" element={<VisiDinas />} />
              <Route path="tusi-dinas" element={<TusiDinas />} />
              <Route path="struktur-dinas" element={<StrukturDinas />}/>

              <Route path="profil-ppid" element={<ProfilPpid />} />
              <Route path="struktur" element={<Struktur data={landingPageData.Struktur} />} />
              <Route path="daftar-informasi-publik" element={<DIP />} />
              <Route path="info-sertamerta" element={<Serta />} />
              <Route path="info-kecuali" element={<DIK />} />
              <Route path="info-berkala" element={<Berkala />} />
            </Route>

            {/* 2. Rute Autentikasi */}
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            {/* 3. Rute Admin Dashboard (Menggunakan DashboardLayout Mantis) */}
            <Route path="/admin" element={
                  <AuthGuard>
                    <DashboardLayout />
                  </AuthGuard>}>
              <Route index element={<Navigate to="dashboard/default" replace />} />
              <Route path="/admin/dashboard/default" element={<DashboardDefault />} />
              <Route path="/admin/berita" element={<DashboardPosts />} />
              {/* Tambahkan sub-route admin lainnya di sini */}
            </Route>
          </Routes>
        </Router>
      </ThemeCustomization>
    </ConfigProvider>
  );
};

export default App;