import React, { useState, useEffect } from "react";
import axios from "axios";

export const Struktur = (props) => {
  const [listStruktur, setListStruktur] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- SISIPKAN DI SINI ---
  const namaBidang = {
    2: "TIM PERTIMBANGAN",
    3: "BIDANG PENGELOLA DATA DAN INFORMASI",
    4: "BIDANG PELAYANAN INFORMASI DAN SOSIAL MEDIA",
    5: "DINAS INDUK",
    6: "BALAI KESELAMATAN KERJA",
    7: "BALAI LATIHAN KERJA SEMARANG 1",
    8: "BALAI LATIHAN KERJA SEMARANG 2",
    9: "BALAI PELAYANAN PENYELESAIAN PERSELISIHAN TENAGA KERJA",
    10: "BALAI PELATIHAN KERJA TRANSMIGRASI KLAMPOK",
    11: "BALAI LATIHAN KERJA CILACAP",
    12: "BIDANG DOKUMENTASI DAN ARSIP",
    13: "BIDANG PENGADUAN DAN PENYELESAIAN SENGKETA"
  };

  useEffect(() => {
    const fetchStructure = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/struktur");
        
        // Sorting tetap diperlukan agar data tidak acak
        const sortedData = res.data.sort((a, b) => {
          if (a.urutan_kategori !== b.urutan_kategori) {
            return a.urutan_kategori - b.urutan_kategori;
          }
          return a.no - b.no;
        });
        
        setListStruktur(sortedData);
      } catch (error) {
        console.error("Gagal mengambil struktur:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStructure();
  }, []);
if (loading) return <div className="container mt-5"><p>Memuat data...</p></div>;
  return (
    <div id="struktur" className="text-center">
        <h2>Struktur Organisasi PPID Pelaksana</h2>
    <div className="container">
      <p>Berdasarkan 
        <a href="https://drive.google.com/file/d/12GQMrVDukJoaF8cHj3Pj_-CaNrEoZEU2/view?usp=sharing" target="_blank" rel="noopener noreferrer"> Keputusan Kepala Dinas Tenaga Kerja dan Transmigrasi Provinsi Jawa Tengah Nomor : 000.8.3 / 18 TAHUN 2025 </a></p>
      <table className="table table-bordered">
        <thead>
            <tr>
              <th style={{ width: "5%" }}>NO</th>
              <th style={{ width: "30%" }}>NAMA</th>
              <th style={{ width: "30%" }}>JABATAN KEDINASAN</th>
              <th style={{ width: "35%" }}>JABATAN DALAM PPID</th>
            </tr>
        </thead>
        <tbody>
          {listStruktur.map((item, index) => {
            const showHeader = index === 0 || item.urutan_kategori !== listStruktur[index - 1].urutan_kategori;

            return (
              <React.Fragment key={item._id}>
                {showHeader && (
                  <tr style={{ backgroundColor: "#d9e1f2", fontWeight: "bold" }}>
                    <td colSpan="4">
                      {namaBidang[item.urutan_kategori]}
                    </td>
                  </tr>
                )}
                <tr>
                  <td>{item.no}</td>
                  <td>{item.nama}</td>
                  <td>{item.jabatan_kedinasan}</td>
                  <td>{item.jabatan_ppid}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      
    </div>
    <ul>
      <li>
      <a href="https://drive.google.com/file/d/1zc_pKfqZ_q9qvxSDBVNOfH6rkaYlYPq-/view?usp=drive_link" target="_blank" rel="noopener noreferrer">SK PPID TENTANG PEMBENTUKAN TIM PEJABAT PENGELOLA INFORMASI DAN DOKUMENTASI (PPID) PELAKSANA DINAS TENAGA KERJA DAN TRANSMIGRASI PROVINSI JAWA TENGAH TAHUN 2025</a>
      </li>
      <li>
      <a href="https://drive.google.com/file/d/12GQMrVDukJoaF8cHj3Pj_-CaNrEoZEU2/view?usp=sharing" target="_blank" rel="noopener noreferrer">SK PPID TENTANG PERUBAHAN TIM PEJABAT PENGELOLA INFORMASI DAN DOKUMENTASI (PPID) PELAKSANA DINAS TENAGA KERJA DAN TRANSMIGRASI PROVINSI JAWA TENGAH TAHUN 2025 </a>
      </li>
    </ul>
    </div>
  );
};