import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User} from 'lucide-react';
import axios from "axios";

export const Berita = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    // Fungsi untuk mengambil data dari backend
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/berita");
        setNewsData(res.data);
      } catch (error) {
        console.error("Gagal mengambil berita:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div id="news" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Berita</h2>
        </div>
        <div className="row">
          {newsData.length > 0 ? (
            newsData.map((item, index) => (
              <div key={index} className="col-md-4">
                <Link to={`/berita/${item.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                            borderBottom: '1px solid #eee',
                            marginBottom: '24px',
                            cursor: 'pointer'
                          }}>
              {/* Gambar */}
              <img
                  src={item.photo.url}
                  alt={item.photo.context}
                    style={{
                            width: '100%',
                            height: '220px',
                            objectFit: 'cover',
                            display: 'block'
                          }}
              />

              {/* Baris bawah: tanggal + konten */}
                <div style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'stretch',
                            }}>
              {/* Kolom Tanggal */}
        <div style={{
          backgroundColor: '#1319ce',
          color: 'white',
          minWidth: '70px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px',
          fontWeight: 'bold',
          lineHeight: '1.4'
        }}>
          <span style={{ fontSize: '18px' }}>
            {new Date(item.date).getFullYear()}
          </span>
          <span style={{ fontSize: '13px' }}>
            {new Date(item.date).toLocaleString('id-ID', { month: 'short' }).toUpperCase()}
          </span>
        </div>

        {/* Kolom Konten */}
        <div style={{
          padding: '10px 14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        }}>
          <div className="flex items-center gap-3 mb-2 transition-colors group-hover:text-blue-600">
          <User 
            size={14} 
            strokeWidth={2.5} 
            className="mr-3 text-gray-400 group-hover:text-blue-500 transition-colors" 
          />
          <span className="text-[12px] font-semibold tracking-wider text-gray-500 dark:text-gray-400">
              {item.author.toUpperCase()}
          </span>
          </div>

          {/* Judul */}
          <h4 style={{
            margin: 0,
            fontWeight: 'bold',
            fontSize: '15px',
            color: '#222',
            textAlign: 'justify',
            lineHeight: '1.5'
          }}>
            {item.title}
          </h4>
        </div>
      </div>
    </div>
    </Link>
</div>
            ))
          ) : (
            <p>Memuat berita...</p>
          )}
        </div>
      </div>
      <a href="https://disnakertrans.jatengprov.go.id/publik/info/berita" target="_blank" rel="noopener noreferrer"
        className="btn btn-custom btn-lg page-scroll">
                  Selengkapnya
                </a>
    </div>
  );
};