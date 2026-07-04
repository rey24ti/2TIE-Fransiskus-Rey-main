import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const materialBangunan = [
  "Semen Tiga Roda", "Cat Tembok Dulux 5kg", "Paku Beton 5cm", "Besi Beton 8mm", 
  "Besi Beton 10mm", "Besi Beton 12mm", "Pipa PVC Wavin 3 Inch", "Pipa PVC Wavin 4 Inch", 
  "Bata Merah Press", "Batako Semen", "Semen Padang", "Semen Gresik", 
  "Cat Avian Kayu & Besi 1kg", "Cat Nippon Paint Weatherbond", "Triplek 9mm", "Triplek 12mm"
];

export default function ProductDetail() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setProduct(response.data); 
        } else {
          setError(response.statusText);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  if (!product && !error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2, fontWeight: 600 }}>Loading Detail Produk...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error" variant="h6">Error: {error}</Typography>
      </Box>
    );
  }

  const indexMaterial = (product.id - 1) % materialBangunan.length;
  const namaLokalBangunan = materialBangunan[indexMaterial] || product.title;

  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', bgcolor: '#f8fafc', minHeight: '100vh', alignItems: 'center' }}>
      <Card sx={{ maxWidth: 480, width: '100%', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', overflow: 'hidden', bgcolor: '#fff' }}>
        
        {/* HANYA BERISI KONTEN DATA SAJA - TANPA GAMBAR */}
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: '#1e293b' }}>
            {namaLokalBangunan}
          </Typography>

          <Box sx={{ bgcolor: '#f8fafc', p: 2, borderRadius: '8px', mb: 4, border: '1px solid #f1f5f9' }}>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 1.5 }}>
              <strong>Kategori:</strong> Bahan Bangunan
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 1.5 }}>
              <strong>Brand:</strong> Lokal Industri
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 1.5 }}>
              <strong>Stok Gudang:</strong> {product.stock} unit
            </Typography>
            <Typography variant="h6" sx={{ color: '#1e88e5', fontWeight: 800, mt: 2 }}>
              Harga: Rp {(product.price * 15000).toLocaleString('id-ID')}
            </Typography>
          </Box>

          <Button 
            component={Link}
            to="/" 
            variant="contained" 
            startIcon={<ArrowBackIcon />}
            fullWidth
            sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, bgcolor: '#384252', p: 1.2, '&:hover': { bgcolor: '#1e293b' } }}
          >
            Kembali ke Dashboard Toko
          </Button>
        </CardContent>

      </Card>
    </Box>
  );
}