import { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Fade,
  Zoom,
  Stack,
  Paper,
  alpha,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CategoryIcon from '@mui/icons-material/Category';
import CloseIcon from '@mui/icons-material/Close';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { QRCodeCanvas } from 'qrcode.react';

// Helper gambar
const getProductImage = (keyword, title) => {
  let searchKeyword = keyword;
  if (title.toLowerCase().includes('semen')) searchKeyword = 'cement bag';
  else if (title.toLowerCase().includes('pasir')) searchKeyword = 'sand construction';
  else if (title.toLowerCase().includes('batu') || title.toLowerCase().includes('kerikil')) searchKeyword = 'gravel';
  else if (title.toLowerCase().includes('besi') || title.toLowerCase().includes('baja')) searchKeyword = 'steel bar';
  else if (title.toLowerCase().includes('bata')) searchKeyword = 'brick wall';
  else if (title.toLowerCase().includes('genteng')) searchKeyword = 'roof tile';
  else if (title.toLowerCase().includes('kayu')) searchKeyword = 'wood plank';
  else if (title.toLowerCase().includes('cat')) searchKeyword = 'paint bucket';
  else if (title.toLowerCase().includes('keramik')) searchKeyword = 'ceramic tile';
  else if (title.toLowerCase().includes('kloset')) searchKeyword = 'toilet';
  else if (title.toLowerCase().includes('kabel')) searchKeyword = 'electric cable';
  else if (title.toLowerCase().includes('pipa')) searchKeyword = 'pvc pipe';
  else if (title.toLowerCase().includes('paku')) searchKeyword = 'nail';
  else if (title.toLowerCase().includes('palu')) searchKeyword = 'hammer tool';
  else if (title.toLowerCase().includes('obeng')) searchKeyword = 'screwdriver';
  else if (title.toLowerCase().includes('sekop')) searchKeyword = 'shovel';
  else searchKeyword = keyword;
  return `https://source.unsplash.com/featured/300x200?${encodeURIComponent(searchKeyword)}&construction`;
};

// ==================== DATA PRODUK LENGKAP ====================
const allProducts = [
  // Bahan Bangunan Utama
  { name: 'Semen Portland', category: 'Bahan Utama', subcategory: 'Semen', unit: 'sak', price: 65000, priceStr: 'Rp65.000', imageKeyword: 'cement' },
  { name: 'Semen Putih', category: 'Bahan Utama', subcategory: 'Semen', unit: 'sak', price: 85000, priceStr: 'Rp85.000', imageKeyword: 'white cement' },
  { name: 'Semen Instan (Mortar)', category: 'Bahan Utama', subcategory: 'Semen', unit: 'sak', price: 75000, priceStr: 'Rp75.000', imageKeyword: 'mortar' },
  { name: 'Pasir Pasang', category: 'Bahan Utama', subcategory: 'Pasir & Batu', unit: 'm³', price: 250000, priceStr: 'Rp250.000', imageKeyword: 'sand' },
  { name: 'Pasir Beton', category: 'Bahan Utama', subcategory: 'Pasir & Batu', unit: 'm³', price: 280000, priceStr: 'Rp280.000', imageKeyword: 'sand concrete' },
  { name: 'Batu Belah', category: 'Bahan Utama', subcategory: 'Pasir & Batu', unit: 'm³', price: 300000, priceStr: 'Rp300.000', imageKeyword: 'crushed stone' },
  { name: 'Batu Koral', category: 'Bahan Utama', subcategory: 'Pasir & Batu', unit: 'kg', price: 5000, priceStr: 'Rp5.000', imageKeyword: 'coral stone' },
  { name: 'Kerikil', category: 'Bahan Utama', subcategory: 'Pasir & Batu', unit: 'm³', price: 220000, priceStr: 'Rp220.000', imageKeyword: 'gravel' },
  { name: 'Besi Beton Polos 8mm', category: 'Bahan Utama', subcategory: 'Besi & Baja', unit: 'batang', price: 85000, priceStr: 'Rp85.000', imageKeyword: 'steel rebar' },
  { name: 'Besi Beton Ulir 10mm', category: 'Bahan Utama', subcategory: 'Besi & Baja', unit: 'batang', price: 120000, priceStr: 'Rp120.000', imageKeyword: 'deformed bar' },
  { name: 'Wiremesh M6', category: 'Bahan Utama', subcategory: 'Besi & Baja', unit: 'lembar', price: 350000, priceStr: 'Rp350.000', imageKeyword: 'wire mesh' },
  { name: 'Baja Ringan C75', category: 'Bahan Utama', subcategory: 'Besi & Baja', unit: 'batang', price: 95000, priceStr: 'Rp95.000', imageKeyword: 'light steel' },
  { name: 'Hollow 4x4', category: 'Bahan Utama', subcategory: 'Besi & Baja', unit: 'batang', price: 110000, priceStr: 'Rp110.000', imageKeyword: 'hollow steel' },
  { name: 'Siku 4x4', category: 'Bahan Utama', subcategory: 'Besi & Baja', unit: 'batang', price: 105000, priceStr: 'Rp105.000', imageKeyword: 'angle iron' },
  { name: 'Pipa Besi 1/2"', category: 'Bahan Utama', subcategory: 'Besi & Baja', unit: 'batang', price: 75000, priceStr: 'Rp75.000', imageKeyword: 'iron pipe' },
  { name: 'Bata Merah', category: 'Bahan Utama', subcategory: 'Bata & Batako', unit: 'buah', price: 800, priceStr: 'Rp800', imageKeyword: 'red brick' },
  { name: 'Hebel (Bata Ringan) 7,5cm', category: 'Bahan Utama', subcategory: 'Bata & Batako', unit: 'm³', price: 750000, priceStr: 'Rp750.000', imageKeyword: 'aac block' },
  { name: 'Batako Press', category: 'Bahan Utama', subcategory: 'Bata & Batako', unit: 'buah', price: 2500, priceStr: 'Rp2.500', imageKeyword: 'concrete block' },
  { name: 'Roster', category: 'Bahan Utama', subcategory: 'Bata & Batako', unit: 'buah', price: 3500, priceStr: 'Rp3.500', imageKeyword: 'roster brick' },
  // Atap & Plafon
  { name: 'Genteng Tanah Liat', category: 'Atap & Plafon', subcategory: 'Atap', unit: 'buah', price: 2000, priceStr: 'Rp2.000', imageKeyword: 'clay roof tile' },
  { name: 'Genteng Metal', category: 'Atap & Plafon', subcategory: 'Atap', unit: 'lembar', price: 35000, priceStr: 'Rp35.000', imageKeyword: 'metal roof' },
  { name: 'Spandek Pasir 0.3mm', category: 'Atap & Plafon', subcategory: 'Atap', unit: 'meter', price: 65000, priceStr: 'Rp65.000', imageKeyword: 'spandek roof' },
  { name: 'Asbes Gelombang', category: 'Atap & Plafon', subcategory: 'Atap', unit: 'lembar', price: 85000, priceStr: 'Rp85.000', imageKeyword: 'asbestos roof' },
  { name: 'Onduline', category: 'Atap & Plafon', subcategory: 'Atap', unit: 'lembar', price: 180000, priceStr: 'Rp180.000', imageKeyword: 'bitumen roof' },
  { name: 'Gypsum 9mm', category: 'Atap & Plafon', subcategory: 'Plafon', unit: 'lembar', price: 55000, priceStr: 'Rp55.000', imageKeyword: 'gypsum board' },
  { name: 'GRC Board 4mm', category: 'Atap & Plafon', subcategory: 'Plafon', unit: 'lembar', price: 70000, priceStr: 'Rp70.000', imageKeyword: 'grc board' },
  { name: 'Plafon PVC', category: 'Atap & Plafon', subcategory: 'Plafon', unit: 'm²', price: 120000, priceStr: 'Rp120.000', imageKeyword: 'pvc ceiling' },
  { name: 'List Plafon Gypsum', category: 'Atap & Plafon', subcategory: 'Plafon', unit: 'batang', price: 15000, priceStr: 'Rp15.000', imageKeyword: 'gypsum molding' },
  // Kayu & Triplek
  { name: 'Kayu Kaso 4x6', category: 'Kayu & Triplek', subcategory: 'Kayu', unit: 'batang', price: 45000, priceStr: 'Rp45.000', imageKeyword: 'lumber' },
  { name: 'Kayu Balok 6x12', category: 'Kayu & Triplek', subcategory: 'Kayu', unit: 'batang', price: 120000, priceStr: 'Rp120.000', imageKeyword: 'timber beam' },
  { name: 'Kayu Reng 3x4', category: 'Kayu & Triplek', subcategory: 'Kayu', unit: 'batang', price: 30000, priceStr: 'Rp30.000', imageKeyword: 'wood strip' },
  { name: 'Papan Borneo', category: 'Kayu & Triplek', subcategory: 'Kayu', unit: 'lembar', price: 95000, priceStr: 'Rp95.000', imageKeyword: 'plywood board' },
  { name: 'Triplek Cor 12mm', category: 'Kayu & Triplek', subcategory: 'Triplek', unit: 'lembar', price: 130000, priceStr: 'Rp130.000', imageKeyword: 'plywood formwork' },
  { name: 'Multipleks 18mm', category: 'Kayu & Triplek', subcategory: 'Triplek', unit: 'lembar', price: 210000, priceStr: 'Rp210.000', imageKeyword: 'multiplex' },
  { name: 'MDF 9mm', category: 'Kayu & Triplek', subcategory: 'Triplek', unit: 'lembar', price: 90000, priceStr: 'Rp90.000', imageKeyword: 'mdf board' },
  { name: 'Teakwood', category: 'Kayu & Triplek', subcategory: 'Triplek', unit: 'lembar', price: 380000, priceStr: 'Rp380.000', imageKeyword: 'teak wood' },
  // Finishing
  { name: 'Cat Tembok Interior (5kg)', category: 'Finishing', subcategory: 'Cat', unit: 'pail', price: 150000, priceStr: 'Rp150.000', imageKeyword: 'interior paint' },
  { name: 'Cat Tembok Eksterior (5kg)', category: 'Finishing', subcategory: 'Cat', unit: 'pail', price: 175000, priceStr: 'Rp175.000', imageKeyword: 'exterior paint' },
  { name: 'Cat Kayu & Besi (1kg)', category: 'Finishing', subcategory: 'Cat', unit: 'kaleng', price: 85000, priceStr: 'Rp85.000', imageKeyword: 'wood paint' },
  { name: 'Cat Dasar (Plimer) 5kg', category: 'Finishing', subcategory: 'Cat', unit: 'pail', price: 120000, priceStr: 'Rp120.000', imageKeyword: 'primer paint' },
  { name: 'Lem Fox (160g)', category: 'Finishing', subcategory: 'Perekat', unit: 'buah', price: 18000, priceStr: 'Rp18.000', imageKeyword: 'glue' },
  { name: 'Lem Pipa PVC (100ml)', category: 'Finishing', subcategory: 'Perekat', unit: 'buah', price: 12000, priceStr: 'Rp12.000', imageKeyword: 'pvc glue' },
  { name: 'Silikon Sealant', category: 'Finishing', subcategory: 'Perekat', unit: 'buah', price: 35000, priceStr: 'Rp35.000', imageKeyword: 'silicone sealant' },
  { name: 'Thinner (1 liter)', category: 'Finishing', subcategory: 'Perekat', unit: 'botol', price: 45000, priceStr: 'Rp45.000', imageKeyword: 'thinner' },
  { name: 'Waterproofing No Drop (4kg)', category: 'Finishing', subcategory: 'Perekat', unit: 'pail', price: 120000, priceStr: 'Rp120.000', imageKeyword: 'waterproofing' },
  // Lantai & Dinding
  { name: 'Keramik Lantai 40x40', category: 'Lantai & Dinding', subcategory: 'Keramik', unit: 'box', price: 85000, priceStr: 'Rp85.000', imageKeyword: 'floor tile' },
  { name: 'Keramik Dinding 25x40', category: 'Lantai & Dinding', subcategory: 'Keramik', unit: 'box', price: 70000, priceStr: 'Rp70.000', imageKeyword: 'wall tile' },
  { name: 'Granit Tile 60x60', category: 'Lantai & Dinding', subcategory: 'Keramik', unit: 'box', price: 180000, priceStr: 'Rp180.000', imageKeyword: 'granite tile' },
  { name: 'Kloset Duduk', category: 'Lantai & Dinding', subcategory: 'Sanitari', unit: 'unit', price: 750000, priceStr: 'Rp750.000', imageKeyword: 'toilet bowl' },
  { name: 'Kloset Jongkok', category: 'Lantai & Dinding', subcategory: 'Sanitari', unit: 'unit', price: 350000, priceStr: 'Rp350.000', imageKeyword: 'squat toilet' },
  { name: 'Wastafel', category: 'Lantai & Dinding', subcategory: 'Sanitari', unit: 'unit', price: 450000, priceStr: 'Rp450.000', imageKeyword: 'washbasin' },
  { name: 'Bak Mandi', category: 'Lantai & Dinding', subcategory: 'Sanitari', unit: 'unit', price: 550000, priceStr: 'Rp550.000', imageKeyword: 'bath tub' },
  { name: 'Shower Set', category: 'Lantai & Dinding', subcategory: 'Sanitari', unit: 'set', price: 380000, priceStr: 'Rp380.000', imageKeyword: 'shower' },
  { name: 'Kran Air (Standard)', category: 'Lantai & Dinding', subcategory: 'Sanitari', unit: 'buah', price: 55000, priceStr: 'Rp55.000', imageKeyword: 'water faucet' },
  // Kelistrikan
  { name: 'Kabel NYA 1.5mm (100m)', category: 'Kelistrikan', subcategory: 'Kabel', unit: 'roll', price: 180000, priceStr: 'Rp180.000', imageKeyword: 'electrical wire' },
  { name: 'Kabel NYM 2x1.5 (50m)', category: 'Kelistrikan', subcategory: 'Kabel', unit: 'roll', price: 210000, priceStr: 'Rp210.000', imageKeyword: 'nyy cable' },
  { name: 'Kabel NYY 3x2.5 (50m)', category: 'Kelistrikan', subcategory: 'Kabel', unit: 'roll', price: 350000, priceStr: 'Rp350.000', imageKeyword: 'power cable' },
  { name: 'Saklar Tunggal', category: 'Kelistrikan', subcategory: 'Alat Listrik', unit: 'buah', price: 25000, priceStr: 'Rp25.000', imageKeyword: 'light switch' },
  { name: 'Stopkontak', category: 'Kelistrikan', subcategory: 'Alat Listrik', unit: 'buah', price: 30000, priceStr: 'Rp30.000', imageKeyword: 'power outlet' },
  { name: 'Fitting Lampu', category: 'Kelistrikan', subcategory: 'Alat Listrik', unit: 'buah', price: 12000, priceStr: 'Rp12.000', imageKeyword: 'lamp holder' },
  { name: 'Pipa Konduit 5/8"', category: 'Kelistrikan', subcategory: 'Alat Listrik', unit: 'batang', price: 18000, priceStr: 'Rp18.000', imageKeyword: 'conduit pipe' },
  { name: 'Isolasi Listrik', category: 'Kelistrikan', subcategory: 'Alat Listrik', unit: 'roll', price: 8000, priceStr: 'Rp8.000', imageKeyword: 'electrical tape' },
  { name: 'Lampu LED 12W', category: 'Kelistrikan', subcategory: 'Pencahayaan', unit: 'buah', price: 45000, priceStr: 'Rp45.000', imageKeyword: 'led lamp' },
  { name: 'Downlight LED 7W', category: 'Kelistrikan', subcategory: 'Pencahayaan', unit: 'buah', price: 65000, priceStr: 'Rp65.000', imageKeyword: 'led downlight' },
  // Perpipaan
  { name: 'Pipa PVC AW 1/2" (4m)', category: 'Perpipaan', subcategory: 'Pipa', unit: 'batang', price: 38000, priceStr: 'Rp38.000', imageKeyword: 'pvc pipe' },
  { name: 'Pipa PVC D 3/4" (4m)', category: 'Perpipaan', subcategory: 'Pipa', unit: 'batang', price: 48000, priceStr: 'Rp48.000', imageKeyword: 'pvc pipe' },
  { name: 'Pipa PPR 1/2" (4m)', category: 'Perpipaan', subcategory: 'Pipa', unit: 'batang', price: 65000, priceStr: 'Rp65.000', imageKeyword: 'ppr pipe' },
  { name: 'Sok Pipa 1/2"', category: 'Perpipaan', subcategory: 'Fitting', unit: 'buah', price: 3000, priceStr: 'Rp3.000', imageKeyword: 'pipe socket' },
  { name: 'Elbow (Keni) 1/2"', category: 'Perpipaan', subcategory: 'Fitting', unit: 'buah', price: 3500, priceStr: 'Rp3.500', imageKeyword: 'pipe elbow' },
  { name: 'Tee 1/2"', category: 'Perpipaan', subcategory: 'Fitting', unit: 'buah', price: 5000, priceStr: 'Rp5.000', imageKeyword: 'pipe tee' },
  { name: 'Watermur 1/2"', category: 'Perpipaan', subcategory: 'Fitting', unit: 'buah', price: 25000, priceStr: 'Rp25.000', imageKeyword: 'water meter' },
  { name: 'Shock Drat 1/2"', category: 'Perpipaan', subcategory: 'Fitting', unit: 'buah', price: 12000, priceStr: 'Rp12.000', imageKeyword: 'pipe adapter' },
  // Hardware & Tools
  { name: 'Paku Beton 5cm', category: 'Hardware & Tools', subcategory: 'Hardware', unit: 'kg', price: 18000, priceStr: 'Rp18.000', imageKeyword: 'concrete nail' },
  { name: 'Paku Kayu 3cm', category: 'Hardware & Tools', subcategory: 'Hardware', unit: 'kg', price: 15000, priceStr: 'Rp15.000', imageKeyword: 'wood nail' },
  { name: 'Sekrup Gypsum', category: 'Hardware & Tools', subcategory: 'Hardware', unit: 'box', price: 25000, priceStr: 'Rp25.000', imageKeyword: 'screw' },
  { name: 'Baut Baja 8mm', category: 'Hardware & Tools', subcategory: 'Hardware', unit: 'set', price: 10000, priceStr: 'Rp10.000', imageKeyword: 'bolt' },
  { name: 'Engsel Pintu', category: 'Hardware & Tools', subcategory: 'Hardware', unit: 'buah', price: 22000, priceStr: 'Rp22.000', imageKeyword: 'door hinge' },
  { name: 'Gembok Besar', category: 'Hardware & Tools', subcategory: 'Hardware', unit: 'buah', price: 45000, priceStr: 'Rp45.000', imageKeyword: 'padlock' },
  { name: 'Handle Pintu', category: 'Hardware & Tools', subcategory: 'Hardware', unit: 'set', price: 85000, priceStr: 'Rp85.000', imageKeyword: 'door handle' },
  { name: 'Palu Konde', category: 'Hardware & Tools', subcategory: 'Tools', unit: 'buah', price: 55000, priceStr: 'Rp55.000', imageKeyword: 'hammer' },
  { name: 'Gergaji Kayu', category: 'Hardware & Tools', subcategory: 'Tools', unit: 'buah', price: 65000, priceStr: 'Rp65.000', imageKeyword: 'hand saw' },
  { name: 'Tang Kombinasi', category: 'Hardware & Tools', subcategory: 'Tools', unit: 'buah', price: 48000, priceStr: 'Rp48.000', imageKeyword: 'pliers' },
  { name: 'Obeng Set', category: 'Hardware & Tools', subcategory: 'Tools', unit: 'set', price: 70000, priceStr: 'Rp70.000', imageKeyword: 'screwdriver set' },
  { name: 'Meteran 5m', category: 'Hardware & Tools', subcategory: 'Tools', unit: 'buah', price: 25000, priceStr: 'Rp25.000', imageKeyword: 'measuring tape' },
  { name: 'Kuas Cat 2"', category: 'Hardware & Tools', subcategory: 'Tools', unit: 'buah', price: 8000, priceStr: 'Rp8.000', imageKeyword: 'paint brush' },
  { name: 'Roller Cat', category: 'Hardware & Tools', subcategory: 'Tools', unit: 'buah', price: 35000, priceStr: 'Rp35.000', imageKeyword: 'paint roller' },
  { name: 'Sekop Tajam', category: 'Hardware & Tools', subcategory: 'Tools', unit: 'buah', price: 65000, priceStr: 'Rp65.000', imageKeyword: 'shovel' },
  { name: 'Cangkul', category: 'Hardware & Tools', subcategory: 'Tools', unit: 'buah', price: 75000, priceStr: 'Rp75.000', imageKeyword: 'hoe' }
];

const categories = ['Semua', ...new Set(allProducts.map(p => p.category))];

export default function ProdukBangunan() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [openQris, setOpenQris] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
      const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.subcategory.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== null) setSelectedCategory(newCategory);
  };

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setOpenQris(true);
  };

  const handleCloseQris = () => {
    setOpenQris(false);
    setSelectedProduct(null);
  };

  const totalPrice = selectedProduct ? selectedProduct.price * quantity : 0;
  const formattedTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalPrice);
  const qrisData = selectedProduct ? `QRIS://${selectedProduct.name}?amount=${totalPrice}&order_id=INV-${Date.now()}` : '';

  return (
    <Box sx={{ minHeight: '100vh', background: `linear-gradient(145deg, ${alpha('#f8fafc', 0.97)} 0%, ${alpha('#f1f5f9', 0.98)} 100%)`, py: { xs: 4, md: 6 }, position: 'relative' }}>
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <Box sx={{ position: 'absolute', top: -200, right: -100, width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${alpha('#2563eb', 0.05)} 0%, transparent 70%)` }} />
        <Box sx={{ position: 'absolute', bottom: -150, left: -80, width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${alpha('#dc2626', 0.04)} 0%, transparent 70%)` }} />
      </Box>

      <Container maxWidth="xl">
        <Fade in timeout={600}>
          <Stack spacing={1.5} sx={{ mb: 5, textAlign: 'center' }}>
            <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: 3, color: '#2563eb' }}>Toko Material</Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: -0.02, background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>Seluruh Kebutuhan Bangunan</Typography>
          </Stack>
        </Fade>

        <Fade in timeout={800}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
            <TextField placeholder="Cari produk (misal: semen, pipa, palu)..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} variant="outlined" size="medium" sx={{ flex: 1, maxWidth: { xs: '100%', md: 400 }, '& .MuiOutlinedInput-root': { borderRadius: 6, bgcolor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' } }} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#94a3b8' }} /></InputAdornment>, endAdornment: searchTerm && (<InputAdornment position="end"><IconButton size="small" onClick={() => setSearchTerm('')}><CloseIcon fontSize="small" /></IconButton></InputAdornment>) }} />
            <ToggleButtonGroup value={selectedCategory} exclusive onChange={handleCategoryChange} sx={{ flexWrap: 'wrap', gap: 1, '& .MuiToggleButton-root': { borderRadius: 6, px: 2.5, py: 0.8, border: '1px solid', borderColor: alpha('#94a3b8', 0.2), bgcolor: 'white', fontWeight: 600, textTransform: 'none', '&.Mui-selected': { bgcolor: '#2563eb', color: 'white', borderColor: '#2563eb', '&:hover': { bgcolor: '#1d4ed8' } } } }}> {categories.map(cat => (<ToggleButton key={cat} value={cat}>{cat === 'Semua' ? <CategoryIcon sx={{ fontSize: 18, mr: 0.5 }} /> : null}{cat}</ToggleButton>))} </ToggleButtonGroup>
          </Stack>
        </Fade>

        <Typography variant="body2" sx={{ mb: 3, fontWeight: 500, color: 'text.secondary' }}>Menampilkan {filteredProducts.length} produk</Typography>

        {filteredProducts.length === 0 ? (
          <Paper sx={{ textAlign: 'center', py: 8, borderRadius: 6, bgcolor: alpha('#fff', 0.7) }}><Typography variant="h6">Tidak ada produk yang cocok dengan pencarian "{searchTerm}"</Typography></Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredProducts.map((product, idx) => (
              <Zoom in timeout={300 + (idx % 12) * 40} style={{ transitionDelay: `${(idx % 12) * 20}ms` }} key={idx}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Card elevation={0} sx={{ height: '100%', borderRadius: 4, bgcolor: 'white', border: '1px solid', borderColor: alpha('#e2e8f0', 0.6), transition: 'all 0.3s cubic-bezier(0.2,0,0,1)', overflow: 'hidden', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 20px 30px -12px rgba(0,0,0,0.15)', borderColor: alpha('#2563eb', 0.3), '& .product-image': { transform: 'scale(1.05)' } } }}>
                    <CardMedia component="img" className="product-image" image={getProductImage(product.imageKeyword, product.name)} alt={product.name} sx={{ height: 180, objectFit: 'cover', transition: 'transform 0.4s ease', bgcolor: alpha('#e2e8f0', 0.3) }} onError={(e) => { e.target.src = 'https://placehold.co/300x200/e2e8f0/475569?text=' + encodeURIComponent(product.name.substring(0,20)); }} />
                    <CardContent sx={{ p: 2.5 }}>
                      <Stack spacing={1.8}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1rem', lineHeight: 1.3, minHeight: 48 }}>{product.name}</Typography>
                          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                            <Chip label={product.category} size="small" sx={{ fontSize: '0.65rem', fontWeight: 600, bgcolor: alpha('#2563eb', 0.1), color: '#2563eb', height: 24 }} />
                            <Chip label={product.subcategory} size="small" variant="outlined" sx={{ fontSize: '0.65rem', fontWeight: 500, borderColor: alpha('#94a3b8', 0.3), height: 24 }} />
                          </Stack>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">Satuan: <strong>{product.unit}</strong></Typography>
                          <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a', mt: 0.5 }}>{product.priceStr}</Typography>
                        </Box>
                        <Button variant="contained" fullWidth startIcon={<QrCodeIcon />} onClick={() => handleBuyClick(product)} sx={{ textTransform: 'none', borderRadius: 3, fontWeight: 700, bgcolor: '#2563eb', '&:hover': { bgcolor: '#1d4ed8', transform: 'scale(0.98)' } }}>Bayar Dengan QRIS</Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              </Zoom>
            ))}
          </Grid>
        )}

        <Dialog open={openQris} onClose={handleCloseQris} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ fontWeight: 800, bgcolor: alpha('#2563eb', 0.05) }}>Pembayaran QRIS</DialogTitle>
          <DialogContent dividers>
            {selectedProduct && (
              <Stack spacing={2}>
                <Typography variant="subtitle1" fontWeight={700}>{selectedProduct.name}</Typography>
                <FormControl fullWidth size="small">
                  <InputLabel>Jumlah ({selectedProduct.unit})</InputLabel>
                  <Select value={quantity} label={`Jumlah (${selectedProduct.unit})`} onChange={(e) => setQuantity(e.target.value)}>
                    {[1,2,3,4,5,6,7,8,9,10].map(q => (<MenuItem key={q} value={q}>{q} {selectedProduct.unit}</MenuItem>))}
                  </Select>
                </FormControl>
                <Alert severity="info" sx={{ fontSize: '0.9rem' }}>Total: <strong>{formattedTotal}</strong></Alert>
                <Divider />
                <Box textAlign="center" sx={{ py: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>Scan QRIS berikut menggunakan aplikasi pembayaran (GoPay, OVO, DANA, LinkAja, dll)</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <QRCodeCanvas value={qrisData} size={180} level="H" />
                  </Box>
                  <Typography variant="caption" color="text.secondary">Kode transaksi: INV-{Date.now()}</Typography>
                </Box>
              </Stack>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseQris} color="error">Batal</Button>
            <Button variant="contained" onClick={() => { alert('Simulasi: Pembayaran berhasil! Transaksi akan diproses.'); handleCloseQris(); }} sx={{ bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' } }}>Konfirmasi Pembayaran</Button>
          </DialogActions>
        </Dialog>

        <Fade in timeout={1000}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 6, pt: 3 }}>
            <Typography variant="caption" color="text.secondary" textAlign="center">✅ Produk original & bergaransi • 🚚 Pengiriman ke seluruh Indonesia • 💳 Pembayaran via QRIS</Typography>
          </Stack>
        </Fade>
      </Container>
    </Box>
  );
}