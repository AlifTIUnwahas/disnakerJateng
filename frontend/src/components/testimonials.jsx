import React, { useState, useEffect } from "react";

const LAYANAN_DATA = [
  {
    judul: "Penempatan Tenaga Kerja",
    deskripsi: "Fasilitasi penempatan tenaga kerja dalam dan luar negeri, serta bursa kerja.",
    warna: "#1A5276",
    tags: ["AKL", "AKAD", "AKAN"],
    link: "/layanan/penempatan",
  },
  {
    judul: "Pelatihan & Sertifikasi",
    deskripsi: "Pelatihan kerja berbasis kompetensi melalui jaringan BLK di seluruh Jawa Tengah.",
    warna: "#1E8449",
    tags: ["BLK", "Sertifikasi BNSP", "Magang"],
    link: "/layanan/pelatihan",
  },
  {
    judul: "Hubungan Industrial",
    deskripsi: "Mediasi, konsiliasi, dan arbitrase perselisihan hubungan industrial.",
    warna: "#7D6608",
    tags: ["PHK", "Upah", "PKB"],
    link: "/layanan/hubungan-industrial",
  },
  {
    judul: "Pengawasan Ketenagakerjaan",
    deskripsi: "Pemeriksaan norma kerja dan K3 di perusahaan sesuai perundang-undangan.",
    warna: "#922B21",
    tags: ["Norma Kerja", "K3", "Inspeksi"],
    link: "/layanan/pengawasan",
  },
  {
    judul: "Transmigrasi",
    deskripsi: "Program transmigrasi umum dan swakarsa mandiri bagi keluarga transmigran.",
    warna: "#515A5A",
    tags: ["TU", "TBS", "TSM"],
    link: "/layanan/transmigrasi",
  },
  {
    judul: "Jaminan Sosial Ketenagakerjaan",
    deskripsi: "Koordinasi kepesertaan BPJS Ketenagakerjaan dan perlindungan pekerja.",
    warna: "#154360",
    tags: ["BPJS", "JHT", "JKK"],
    link: "/layanan/jaminan-sosial",
  },
];

const PROFIL_DATA = {
  telepon: "(024) 8311713 / (024) 8311711",
  email: "disnakertrans@jatengprov.go.id"
};

const LayananCard = ({ layanan, delay }) => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div className={`col-md-4 mb-4 card-anim ${shown ? "is-visible" : ""}`}>
      <a href={layanan.link} className="layanan-card-root h-100 d-flex flex-column">
        <div className="layanan-content flex-grow-1">
          <div 
            className="layanan-ikon-circle" 
            style={{ backgroundColor: `${layanan.warna}1a`, color: layanan.warna }}
          >
            {/* Placeholder Ikon (Bisa diganti SVG spesifik) */}
            <svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
               <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2v-4h-2v4H8V7h2v2h2V7h2v10z"/>
            </svg>
          </div>
          
          <h3 className="layanan-judul">{layanan.judul}</h3>
          <p className="layanan-deskripsi">{layanan.deskripsi}</p>
          
          <div className="layanan-tags-wrapper d-flex flex-wrap gap-2 mt-3">
            {layanan.tags.map((tag) => (
              <span 
                key={tag} 
                className="layanan-tag"
                style={{ backgroundColor: `${layanan.warna}1a`, color: layanan.warna }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="layanan-footer">
          <span style={{ color: layanan.warna }}>Selengkapnya →</span>
        </div>
      </a>
    </div>
  );
};

export const Testimonials = () => {
  return (
    <div id="layanan" className="py-5 bg-light">
      <style>{`
        .layanan-card-root {
          display: flex;
          flex-direction: column;
          height: 30%;
          background: #fff;
          border-radius: 12px;
          text-decoration: none !important;
          border: 1px solid #eee;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .layanan-card-root:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .layanan-content {
          padding: 24px;
          flex-grow: 1;
        }
        .layanan-ikon-circle {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          transition: all 0.3s ease;
        }
        .layanan-card-root:hover .layanan-ikon-circle {
          background-color: currentColor !important;
          color: #fff !important;
        }
        .layanan-judul {
          font-size: 1.15rem;
          font-weight: 600;
          color: #222;
          margin-bottom: 10px;
        }
        .layanan-deskripsi {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.6;
          margin-bottom: 16px;
        }
        .layanan-tags-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .layanan-tag {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .layanan-footer {
          padding: 16px 24px;
          border-top: 1px solid #f5f5f5;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .card-anim {
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.35s ease-out;
        }
        .card-anim.is-visible {
          opacity: 1;
          transform: scale(1);
        }
        .custom-alert {
          background-color: #d1ecf1;
          border-left: 5px solid #17a2b8;
          border-radius: 8px;
          padding: 20px;
          margin-top: 40px;
          text-align: center;
        }
      `}</style>

      <div className="container">
          <div className="section-title text-center">
            <h2>Layanan</h2>
          </div>
        <div className="row g-4">
          {LAYANAN_DATA.map((l, i) => (
            <LayananCard key={l.judul} layanan={l} delay={i * 80} />
          ))}
        </div>

        <div className="custom-alert">
          <p className="mb-0" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            Untuk informasi lebih lanjut atau pengaduan, silakan hubungi kami melalui telepon{" "}
            <strong>{PROFIL_DATA.telepon}</strong> atau email{" "}
            <strong>{PROFIL_DATA.email}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
