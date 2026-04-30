import React, { useState, useEffect } from "react";
import axios from "axios";
import { User } from 'lucide-react';
import { useParams } from "react-router-dom";

export const DetailBerita = () => {
  const { slug } = useParams(); // ambil slug dari URL
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/admin/berita/${slug}`);
        setNews(res.data);
      } catch (error) {
        console.error("Gagal mengambil detail berita:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug]);

  if (loading) return <p>Memuat berita...</p>;
  if (!news) return <p>Berita tidak ditemukan.</p>;

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      {/* Gambar */}
      <img
        src={news.photo.url}
        alt={news.photo.context}
        style={{ width: '100%', maxHeight: '2560px', objectFit: 'cover', marginBottom: '8px' }}
      />
      <p style={{ fontSize: '12px', color: '#888', marginBottom: '24px' }}>
        {news.photo.context}
      </p>

      {/* Kategori & Author */}
      <div style={{ marginBottom: '12px' }}>
        <span style={{
          backgroundColor: '#1a3a5c', color: 'white',
          padding: '4px 10px', borderRadius: '4px',
          fontSize: '12px', marginRight: '10px'
        }}>
          {news.category}
        </span>
        <User 
                    size={14} 
                    strokeWidth={2.5} 
                    className="mr-3 text-gray-400 group-hover:text-blue-500 transition-colors" 
        />
        <span style={{ fontSize: '12px', color: '#888' }}> {news.author}</span>
      </div>

      {/* Judul */}
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
        {news.title}
      </h1>

      {/* Konten */}
      <div>
        {news.content.map((paragraph, index) => (
          <p key={index} style={{ lineHeight: '1.8', marginBottom: '16px', fontSize: '16px' }}>
            {paragraph}
          </p>
        ))}
      </div>

      {/* Tags */}
      <div style={{ marginTop: '32px' }}>
        {news.tags.map((tag, index) => (
          <span key={index} style={{
            display: 'inline-block',
            backgroundColor: '#f0f0f0',
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '12px',
            marginRight: '8px',
            marginBottom: '8px'
          }}>
            #{tag}
          </span>
        ))}
      </div>

      {/* Tombol Kembali */}
      <div style={{ marginTop: '40px' }}>
        <a href="/" className="btn btn-default">← Kembali ke Berita</a>
      </div>
    </div>
  );
};
