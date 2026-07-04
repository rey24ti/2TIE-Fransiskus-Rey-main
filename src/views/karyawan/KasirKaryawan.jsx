import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Box, Grid, Card, Stack, Typography, Chip, Paper, TextField, Button,
  Divider, Snackbar, Alert, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Pagination, Popover, List, ListItem, ListItemText,
  IconButton, Tooltip, Fade, Zoom, Badge, Avatar, ToggleButton,
  ToggleButtonGroup, Drawer, IconButton as MuiIconButton, useMediaQuery,
  Switch, FormControlLabel, InputAdornment, RadioGroup, Radio, FormControl, FormLabel,
  Collapse, MenuItem, Select
} from '@mui/material';
import {
  ShoppingCart, AddShoppingCart, AttachMoney, Remove, Add, Search, Print,
  FilterList, DeleteOutlineOutlined, Payment, PointOfSale,
  Menu as MenuIcon, DarkMode, LightMode, GetApp, Receipt as ReceiptIcon,
  LocalShipping, Home, LocationOn, CheckCircle, Pending, Cancel, Person, Phone
} from '@mui/icons-material';
import { alpha, createTheme, ThemeProvider } from '@mui/material/styles';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer
} from 'recharts';

const formatRupiah = (angka) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
  }).format(angka || 0);
};

const formatDate = (date) => new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(date);

function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });
  const setValue = (value) => {
    const toStore = value instanceof Function ? value(stored) : value;
    setStored(toStore);
    localStorage.setItem(key, JSON.stringify(toStore));
  };
  return [stored, setValue];
}

const KPIItem = React.memo(({ label, value, color, icon: Icon }) => (
  <Stack direction="row" alignItems="center" spacing={1.5}>
    <Avatar sx={{ width: 40, height: 40, bgcolor: alpha(color, 0.12), color }}>
      <Icon fontSize="small" />
    </Avatar>
    <Box>
      <Typography variant="caption" color="text.secondary" fontWeight={600}>{label}</Typography>
      <Typography variant="subtitle1" fontWeight={800} color={color}>{value}</Typography>
    </Box>
  </Stack>
));

const ProductCard = React.memo(({ product, onAdd }) => (
  <Zoom in style={{ transitionDelay: `${product.id * 20}ms` }}>
    <Paper
      elevation={0}
      sx={{
        p: 1.8, borderRadius: '24px', border: `1px solid ${alpha('#0f172a', 0.08)}`,
        cursor: 'pointer', transition: '0.2s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 3, borderColor: alpha('#2563eb', 0.4) }
      }}
      onClick={() => onAdd(product)}
    >
      <Stack spacing={0.8}>
        <Typography fontWeight={800} fontSize="0.9rem" noWrap>{product.nama}</Typography>
        <Typography variant="caption" color="text.secondary">Stok: {product.stok}</Typography>
        <Typography fontWeight={800} color="#10b981">{formatRupiah(product.harga)}</Typography>
        <Chip label={product.kategori} size="small" variant="outlined" sx={{ fontSize: '0.65rem', width: 'fit-content' }} />
      </Stack>
    </Paper>
  </Zoom>
));

const CartItem = React.memo(({ item, onUpdateQty, onRemove }) => (
  <Box sx={{ py: 1 }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
      <Box sx={{ flex: 2 }}>
        <Typography fontWeight={800}>{item.nama}</Typography>
        <Typography variant="caption" color="text.secondary">{formatRupiah(item.harga)}</Typography>
      </Box>
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton size="small" onClick={() => onUpdateQty(item.id, item.qty - 1)} sx={{ border: `1px solid ${alpha('#0f172a', 0.1)}`, borderRadius: '12px' }}>
          <Remove fontSize="small" />
        </IconButton>
        <TextField
          value={item.qty}
          onChange={(e) => {
            let val = parseInt(e.target.value);
            if (isNaN(val)) val = 1;
            onUpdateQty(item.id, val);
          }}
          inputProps={{ style: { textAlign: 'center', width: 50, padding: '4px' } }}
          size="small"
          variant="outlined"
          sx={{ width: 70 }}
        />
        <IconButton size="small" onClick={() => onUpdateQty(item.id, item.qty + 1)} sx={{ border: `1px solid ${alpha('#0f172a', 0.1)}`, borderRadius: '12px' }}>
          <Add fontSize="small" />
        </IconButton>
      </Stack>
      <Typography fontWeight={800} color="#10b981" sx={{ minWidth: 110, textAlign: 'right' }}>
        {formatRupiah(item.harga * item.qty)}
      </Typography>
      <IconButton size="small" onClick={() => onRemove(item.id)} sx={{ color: '#ef4444' }}>
        <DeleteOutlineOutlined fontSize="small" />
      </IconButton>
    </Stack>
  </Box>
));

// ===================== KOMPONEN UTAMA - FULL WIDTH =====================
export default function KasirKaryawan() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: { mode: darkMode ? 'dark' : 'light', primary: { main: '#2563eb' } },
    shape: { borderRadius: 16 },
  });
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [barang, setBarang] = useLocalStorage('data_toko', [
    { id: 1, nama: 'Semen Padang', stok: 100, harga: 65000, kategori: 'Semen' },
    { id: 2, nama: 'Cat Dulux', stok: 20, harga: 150000, kategori: 'Cat' },
    { id: 3, nama: 'Besi Beton 10mm', stok: 50, harga: 85000, kategori: 'Besi' },
    { id: 4, nama: 'Pipa PVC 1/2"', stok: 200, harga: 25000, kategori: 'Pipa' },
    { id: 5, nama: 'Semen Tiga Roda', stok: 75, harga: 68000, kategori: 'Semen' },
    { id: 6, nama: 'Cat Propan', stok: 15, harga: 120000, kategori: 'Cat' },
  ]);
  const [riwayat, setRiwayat] = useLocalStorage('riwayat_toko', []);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');
  const [filterDate, setFilterDate] = useState('today');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [cashReceived, setCashReceived] = useState('');
  const [lastTransaction, setLastTransaction] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // ── STATE UNTUK FITUR PENGANTARAN ──
  const [deliveryOption, setDeliveryOption] = useState('pickup'); // 'pickup' atau 'delivery'
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(15000);
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState('pending'); // pending, in_transit, delivered, cancelled
  const [showDeliveryTracker, setShowDeliveryTracker] = useState(false);

  // ── STATE IDENTITAS PELANGGAN ──
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // ── ONGKIR PRESET ──
  const deliveryFeeOptions = [
    { value: 10000, label: 'Rp 10.000 (Dekat)' },
    { value: 15000, label: 'Rp 15.000 (Sedang)' },
    { value: 20000, label: 'Rp 20.000 (Jauh)' },
    { value: 25000, label: 'Rp 25.000 (Luar Kota)' },
  ];

  const categories = useMemo(() => ['Semua', ...new Set(barang.map(b => b.kategori))], [barang]);
  const filteredProducts = useMemo(() => {
    let filtered = barang;
    if (search) filtered = filtered.filter(p => p.nama.toLowerCase().includes(search.toLowerCase()));
    if (category !== 'Semua') filtered = filtered.filter(p => p.kategori === category);
    return filtered;
  }, [barang, search, category]);
  
  const cartTotal = useMemo(() => cart.reduce((s, i) => s + i.harga * i.qty, 0), [cart]);
  const deliveryFeeTotal = useMemo(() => deliveryOption === 'delivery' ? deliveryFee : 0, [deliveryOption, deliveryFee]);
  const grandTotal = useMemo(() => cartTotal + deliveryFeeTotal, [cartTotal, deliveryFeeTotal]);
  const changeAmount = useMemo(() => (parseInt(cashReceived.replace(/\D/g, '')) || 0) - grandTotal, [cashReceived, grandTotal]);

  const filteredRiwayat = useMemo(() => {
    let filtered = [...riwayat];
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (filterDate === 'today') filtered = filtered.filter(r => new Date(r.tanggalLengkap) >= today);
    else if (filterDate === 'week') filtered = filtered.filter(r => new Date(r.tanggalLengkap) >= new Date(now - 7 * 86400000));
    else if (filterDate === 'month') filtered = filtered.filter(r => new Date(r.tanggalLengkap) >= new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()));
    return filtered;
  }, [riwayat, filterDate]);

  const totalPenjualan = filteredRiwayat.reduce((s, r) => s + r.total, 0);
  const totalTransaksi = filteredRiwayat.length;
  const totalPages = Math.ceil(filteredRiwayat.length / rowsPerPage);
  const paginatedRiwayat = filteredRiwayat.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const keluarPerBarang = useMemo(() => {
    const map = new Map();
    for (const r of riwayat || []) {
      const nama = r?.nama;
      const qty = Number(r?.qty || 0);
      if (!nama) continue;
      map.set(nama, (map.get(nama) || 0) + qty);
    }
    return map;
  }, [riwayat]);

  const totalKeluarAll = useMemo(() => {
    let sum = 0;
    for (const v of keluarPerBarang.values()) sum += v;
    return sum;
  }, [keluarPerBarang]);

  const barangMasukKeluarRows = useMemo(() => {
    return (barang || []).map((b) => ({
      nama: b.nama,
      kategori: b.kategori,
      masuk: 0,
      keluar: keluarPerBarang.get(b.nama) || 0,
      stokTersisa: b.stok,
    }));
  }, [barang, keluarPerBarang]);

  const totalStokTersisa = useMemo(() => {
    return (barang || []).reduce((s, b) => s + Number(b?.stok || 0), 0);
  }, [barang]);

  const chartData = useMemo(() => {
    const last7 = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() - i); d.setHours(0,0,0,0);
      return { date: d, total: 0 };
    }).reverse();
    riwayat.forEach(r => {
      const tgl = new Date(r.tanggalLengkap);
      const idx = last7.findIndex(d => d.date.toDateString() === tgl.toDateString());
      if (idx !== -1) last7[idx].total += r.total;
    });
    return last7.map(d => ({ tanggal: formatDate(d.date), penjualan: d.total }));
  }, [riwayat]);

  const addToCart = useCallback((product) => {
    if (product.stok <= 0) return setSnackbar({ open: true, message: 'Stok habis!', severity: 'error' });
    setCart(prev => {
      const exist = prev.find(i => i.id === product.id);
      if (exist) {
        if (exist.qty + 1 > product.stok) {
          setSnackbar({ open: true, message: `Stok ${product.nama} hanya ${product.stok}`, severity: 'warning' });
          return prev;
        }
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((id, newQty) => {
    const product = barang.find(p => p.id === id);
    if (newQty > product.stok) return setSnackbar({ open: true, message: `Stok maksimal ${product.stok}`, severity: 'warning' });
    if (newQty <= 0) setCart(prev => prev.filter(i => i.id !== id));
    else setCart(prev => prev.map(i => i.id === id ? { ...i, qty: newQty } : i));
  }, [barang]);

  const removeFromCart = useCallback((id) => setCart(prev => prev.filter(i => i.id !== id)), []);

  const handleCheckout = useCallback(() => {
    if (!cart.length) return setSnackbar({ open: true, message: 'Keranjang kosong', severity: 'warning' });
    
    // Validasi delivery
    if (deliveryOption === 'delivery') {
      if (!deliveryAddress.trim()) {
        return setSnackbar({ open: true, message: 'Alamat pengiriman wajib diisi', severity: 'warning' });
      }
      if (!customerName.trim()) {
        return setSnackbar({ open: true, message: 'Nama pelanggan wajib diisi', severity: 'warning' });
      }
      if (!customerPhone.trim()) {
        return setSnackbar({ open: true, message: 'Nomor telepon wajib diisi', severity: 'warning' });
      }
    }

    if (paymentMethod === 'cash') {
      const paid = parseInt(cashReceived.replace(/\D/g, '')) || 0;
      if (paid < grandTotal) return setSnackbar({ open: true, message: 'Uang kurang', severity: 'error' });
    }
    
    for (const item of cart) {
      const product = barang.find(p => p.id === item.id);
      if (!product || product.stok < item.qty) return setSnackbar({ open: true, message: `Stok ${item.nama} tidak cukup`, severity: 'error' });
    }
    
    const newBarang = barang.map(p => {
      const cartItem = cart.find(i => i.id === p.id);
      return cartItem ? { ...p, stok: p.stok - cartItem.qty } : p;
    });
    setBarang(newBarang);
    
    const newTransactions = cart.map(item => ({
      id: Date.now() + item.id,
      nama: item.nama, 
      qty: item.qty, 
      hargaSatuan: item.harga, 
      total: item.harga * item.qty,
      tgl: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      tanggalLengkap: new Date().toLocaleDateString('id-ID'),
      metode: paymentMethod === 'cash' ? 'Tunai' : 'Kartu',
      // Info pengantaran
      deliveryOption: deliveryOption,
      deliveryAddress: deliveryOption === 'delivery' ? deliveryAddress : null,
      deliveryFee: deliveryOption === 'delivery' ? deliveryFee : 0,
      deliveryStatus: deliveryOption === 'delivery' ? 'Menunggu' : null,
      deliveryNotes: deliveryOption === 'delivery' ? deliveryNotes : null,
      // Identitas pelanggan
      customerName: deliveryOption === 'delivery' ? customerName : null,
      customerPhone: deliveryOption === 'delivery' ? customerPhone : null,
      grandTotal: grandTotal,
    }));
    
    const newRiwayat = [...newTransactions, ...riwayat];
    setRiwayat(newRiwayat);
    
    setLastTransaction({ 
      cart: [...cart], 
      total: grandTotal,
      subtotal: cartTotal,
      deliveryFee: deliveryFeeTotal,
      paid: parseInt(cashReceived.replace(/\D/g, '')) || 0, 
      change: changeAmount, 
      method: paymentMethod,
      deliveryOption: deliveryOption,
      deliveryAddress: deliveryAddress,
      deliveryStatus: 'Menunggu',
      customerName: customerName,
      customerPhone: customerPhone,
    });
    
    setCart([]);
    setCashReceived('');
    setDeliveryAddress('');
    setDeliveryNotes('');
    setDeliveryOption('pickup');
    setCustomerName('');
    setCustomerPhone('');
    
    setSnackbar({ open: true, message: deliveryOption === 'delivery' ? '✅ Transaksi berhasil! Pesanan akan diantar.' : '✅ Transaksi berhasil!', severity: 'success' });
  }, [cart, paymentMethod, cashReceived, grandTotal, cartTotal, deliveryFeeTotal, barang, riwayat, changeAmount, setBarang, setRiwayat, deliveryOption, deliveryAddress, deliveryFee, deliveryNotes, customerName, customerPhone]);

  const printLastStruk = useCallback(() => {
    if (!lastTransaction) return;
    const win = window.open('', '_blank');
    win.document.write(`
      <html><head><title>Struk Kasir</title>
      <style>body{font-family:'Courier New',monospace;margin:20px} table{width:100%} th,td{border-bottom:1px dashed #ccc;padding:6px 0;text-align:left} .total{font-size:1.2rem;font-weight:bold;text-align:right}</style>
      </head><body>
      <h2>TOKO BANGUNAN</h2><p>${new Date().toLocaleString()}</p><hr/>
      ${lastTransaction.deliveryOption === 'delivery' ? `
        <div style="margin-bottom:8px;">
          <strong>Pelanggan:</strong> ${lastTransaction.customerName || '-'}<br/>
          <strong>Telepon:</strong> ${lastTransaction.customerPhone || '-'}<br/>
          <strong>Alamat:</strong> ${lastTransaction.deliveryAddress || '-'}
        </div>
        <hr/>
      ` : ''}
      <table><thead><tr><th>Item</th><th>Qty</th><th>Harga</th><th>Total</th></tr></thead><tbody>
      ${lastTransaction.cart.map(item => `<tr><td>${item.nama}</td><td>${item.qty}</td><td>${formatRupiah(item.harga)}</td><td>${formatRupiah(item.harga * item.qty)}</td></tr>`).join('')}
      </tbody></table><hr/>
      <div style="text-align:right">
        <div>Subtotal: ${formatRupiah(lastTransaction.subtotal || lastTransaction.total - (lastTransaction.deliveryFee || 0))}</div>
        ${lastTransaction.deliveryFee ? `<div>Ongkir: ${formatRupiah(lastTransaction.deliveryFee)}</div>` : ''}
        <div class="total">Total: ${formatRupiah(lastTransaction.total)}</div>
      </div>
      <div>Metode: ${lastTransaction.method === 'cash' ? 'Tunai' : 'Kartu'}</div>
      ${lastTransaction.method === 'cash' ? `<div>Tunai: ${formatRupiah(lastTransaction.paid)}</div><div>Kembali: ${formatRupiah(lastTransaction.change)}</div>` : ''}
      ${lastTransaction.deliveryOption === 'delivery' ? `<div style="margin-top:8px;border-top:1px dashed #ccc;padding-top:8px">🚚 PENGANTARAN</div><div>Status: ${lastTransaction.deliveryStatus || 'Menunggu'}</div>` : ''}
      <hr/><p>Terima kasih!</p></body></html>
    `);
    win.document.close();
    win.print();
  }, [lastTransaction]);

  // ── Fungsi update status pengantaran ──
  const updateDeliveryStatus = (transactionId, newStatus) => {
    setRiwayat(prev => prev.map(r => {
      if (r.id === transactionId) {
        return { ...r, deliveryStatus: newStatus };
      }
      return r;
    }));
    setSnackbar({ open: true, message: `Status pengantaran diubah menjadi: ${newStatus}`, severity: 'success' });
  };

  const exportCSV = () => {
    const headers = ['Tanggal', 'Jam', 'Produk', 'Qty', 'Harga Satuan', 'Total', 'Metode', 'Pengantaran', 'Alamat', 'Status', 'Pelanggan', 'No Telp'];
    const rows = riwayat.map(r => [
      r.tanggalLengkap, r.tgl, r.nama, r.qty, r.hargaSatuan, r.total, r.metode,
      r.deliveryOption === 'delivery' ? 'Antar' : 'Ambil Sendiri',
      r.deliveryAddress || '-',
      r.deliveryStatus || '-',
      r.customerName || '-',
      r.customerPhone || '-'
    ]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `riwayat_${new Date().toISOString()}.csv`;
    link.click();
    setSnackbar({ open: true, message: 'Ekspor CSV berhasil', severity: 'success' });
  };

  const clearRiwayat = () => {
    if (window.confirm('Hapus semua riwayat?')) { setRiwayat([]); setSnackbar({ open: true, message: 'Riwayat dihapus', severity: 'info' }); }
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'F2') { e.preventDefault(); document.getElementById('search-product')?.focus(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // ── Count delivery orders ──
  const deliveryCount = useMemo(() => {
    return riwayat.filter(r => r.deliveryOption === 'delivery').length;
  }, [riwayat]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 2, px: { xs: 1, md: 2 } }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" sx={{ mb: 3 }} gap={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {isMobile && <MuiIconButton onClick={() => setDrawerOpen(true)}><MenuIcon /></MuiIconButton>}
            <PointOfSale sx={{ fontSize: 34, color: 'primary.main' }} />
            <Typography variant="h5" fontWeight={800}>Kasir POS Pro</Typography>
            <Chip label="Toko Bangunan" size="small" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), fontWeight: 700 }} />
            <FormControlLabel control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} icon={<LightMode />} checkedIcon={<DarkMode />} />} label="" />
          </Stack>
          <Stack direction="row" spacing={2}>
            <KPIItem label="Penjualan (filter)" value={formatRupiah(totalPenjualan)} color="#f59e0b" icon={AttachMoney} />
            <KPIItem label="Transaksi" value={totalTransaksi} color="#10b981" icon={ReceiptIcon} />
            <KPIItem label="Pengantaran" value={deliveryCount} color="#2563eb" icon={LocalShipping} />
            <KPIItem label="Keranjang" value={cart.length} color="#8b5cf6" icon={ShoppingCart} />
          </Stack>
        </Stack>

        {/* GRID DENGAN LEBAR PROPORSIONAL - FULL WIDTH */}
        <Grid container spacing={2.5}>
          {!isMobile && (
            <Grid item xs={12} md={4} lg={3}>
              <ProductPanel products={filteredProducts} categories={categories} selectedCategory={category} onCategoryChange={setCategory} search={search} onSearchChange={setSearch} onAddToCart={addToCart} />
            </Grid>
          )}
          <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { width: '85%', p: 2 } }}>
            <ProductPanel products={filteredProducts} categories={categories} selectedCategory={category} onCategoryChange={setCategory} search={search} onSearchChange={setSearch} onAddToCart={addToCart} />
          </Drawer>

          <Grid item xs={12} md={5} lg={5}>
            <Card sx={{ borderRadius: '28px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box sx={{ p: 2.5, borderBottom: 1, borderColor: 'divider' }}>
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Badge badgeContent={cart.length} color="error"><ShoppingCart color="primary" /></Badge>
                    <Typography variant="h6" fontWeight={800}>Keranjang Belanja</Typography>
                  </Stack>
                  {cart.length > 0 && <Button size="small" onClick={() => setCart([])} color="error" startIcon={<DeleteOutlineOutlined />}>Kosongkan</Button>}
                </Stack>
              </Box>
              <Box sx={{ flex: 1, maxHeight: 440, overflow: 'auto', p: 1.5 }}>
                {cart.length === 0 ? (
                  <Stack alignItems="center" justifyContent="center" sx={{ py: 8 }}>
                    <Avatar sx={{ width: 80, height: 80, bgcolor: alpha(theme.palette.primary.main, 0.08), mb: 2 }}>
                      <AddShoppingCart sx={{ fontSize: 40, color: 'primary.main' }} />
                    </Avatar>
                    <Typography color="text.secondary">Keranjang kosong</Typography>
                    <Typography variant="caption">Klik produk untuk menambah</Typography>
                  </Stack>
                ) : (
                  <Stack divider={<Divider sx={{ my: 1 }} />}>
                    {cart.map(item => <CartItem key={item.id} item={item} onUpdateQty={updateQty} onRemove={removeFromCart} />)}
                  </Stack>
                )}
              </Box>
              {cart.length > 0 && (
                <Box sx={{ p: 2.5, borderTop: 1, borderColor: 'divider', bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle1" fontWeight={800}>Subtotal</Typography>
                    <Typography variant="h6" fontWeight={800} color="primary.main">{formatRupiah(cartTotal)}</Typography>
                  </Stack>
                  {deliveryOption === 'delivery' && (
                    <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.5 }}>
                      <Typography variant="body2" fontWeight={600} color="text.secondary">Ongkos Kirim</Typography>
                      <Typography variant="body2" fontWeight={700} color="#f59e0b">{formatRupiah(deliveryFee)}</Typography>
                    </Stack>
                  )}
                  <Divider sx={{ my: 1.5 }} />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle1" fontWeight={900}>Total</Typography>
                    <Typography variant="h6" fontWeight={900} color="primary.main">{formatRupiah(grandTotal)}</Typography>
                  </Stack>
                </Box>
              )}
            </Card>
          </Grid>

          <Grid item xs={12} md={3} lg={4}>
            <Card sx={{ borderRadius: '28px', p: 2.5 }}>
              <Typography fontWeight={800} mb={1.5}>Metode Pembayaran</Typography>
              <ToggleButtonGroup value={paymentMethod} exclusive onChange={(e, val) => val && setPaymentMethod(val)} fullWidth size="small" sx={{ mb: 2.5 }}>
                <ToggleButton value="cash">💵 Tunai</ToggleButton>
                <ToggleButton value="card">💳 Kartu</ToggleButton>
              </ToggleButtonGroup>

              {/* ─── OPSI PENGANTARAN ─── */}
              <Divider sx={{ my: 2 }} />
              <Typography fontWeight={800} mb={1.5}>Opsi Pengantaran</Typography>
              
              <RadioGroup value={deliveryOption} onChange={(e) => setDeliveryOption(e.target.value)} sx={{ mb: 2 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                  <FormControlLabel 
                    value="pickup" 
                    control={<Radio />} 
                    label={
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Home fontSize="small" />
                        <Typography variant="body2" fontWeight={deliveryOption === 'pickup' ? 700 : 400}>Ambil Sendiri</Typography>
                      </Stack>
                    }
                    sx={{ flex: 1 }}
                  />
                  <FormControlLabel 
                    value="delivery" 
                    control={<Radio />} 
                    label={
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <LocalShipping fontSize="small" />
                        <Typography variant="body2" fontWeight={deliveryOption === 'delivery' ? 700 : 400}>Antar</Typography>
                      </Stack>
                    }
                    sx={{ flex: 1 }}
                  />
                </Stack>
              </RadioGroup>

              <Collapse in={deliveryOption === 'delivery'}>
                <Stack spacing={2} sx={{ mt: 1, p: 1.5, bgcolor: alpha('#0f172a', 0.03), borderRadius: '16px' }}>
                  {/* IDENTITAS PELANGGAN */}
                  <TextField
                    fullWidth
                    label="Nama Pelanggan *"
                    placeholder="Masukkan nama lengkap"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Person /></InputAdornment>,
                    }}
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Nomor Telepon *"
                    placeholder="08xxxxxxxx"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Phone /></InputAdornment>,
                    }}
                    size="small"
                  />
                  <TextField
                    fullWidth
                    label="Alamat Pengiriman *"
                    placeholder="Jl. Contoh No. 123, Kota"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    multiline
                    rows={2}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><LocationOn /></InputAdornment>,
                    }}
                    size="small"
                  />
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Typography variant="body2" fontWeight={600} sx={{ minWidth: 80 }}>Ongkos Kirim</Typography>
                    <Select
                      value={deliveryFee}
                      onChange={(e) => setDeliveryFee(e.target.value)}
                      size="small"
                      sx={{ flex: 1, borderRadius: '12px' }}
                    >
                      {deliveryFeeOptions.map(opt => (
                        <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                      ))}
                    </Select>
                  </Stack>
                  <TextField
                    fullWidth
                    label="Catatan Pengiriman (opsional)"
                    placeholder="Contoh: Belakang rumah, dekat gerbang..."
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    size="small"
                  />
                </Stack>
              </Collapse>

              {paymentMethod === 'cash' && (
                <>
                  <Typography fontWeight={600} mb={1} sx={{ mt: 2 }}>Jumlah Tunai (Rp)</Typography>
                  <TextField
                    fullWidth
                    placeholder="0"
                    value={cashReceived}
                    onChange={(e) => setCashReceived(e.target.value.replace(/\D/g, ''))}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><AttachMoney /></InputAdornment>,
                      sx: { borderRadius: '24px', fontSize: '1.3rem', fontWeight: 700 }
                    }}
                  />
                  {cashReceived && (
                    <Stack direction="row" justifyContent="space-between" sx={{ mt: 2, p: 1.5, bgcolor: alpha('#0f172a', 0.04), borderRadius: '24px' }}>
                      <Typography fontWeight={600}>Kembalian</Typography>
                      <Typography fontWeight={800} color={changeAmount >= 0 ? '#10b981' : '#ef4444'}>{formatRupiah(Math.max(0, changeAmount))}</Typography>
                    </Stack>
                  )}
                </>
              )}

              <Button
                fullWidth variant="contained" size="large" onClick={handleCheckout}
                disabled={!cart.length || (paymentMethod === 'cash' && (parseInt(cashReceived) || 0) < grandTotal)}
                startIcon={deliveryOption === 'delivery' ? <LocalShipping /> : <Payment />}
                sx={{ borderRadius: '28px', py: 1.6, fontWeight: 800, mt: 2 }}
              >
                {deliveryOption === 'delivery' ? 'Bayar & Antar' : 'Bayar Sekarang'}
              </Button>

              {lastTransaction && (
                <Paper sx={{ mt: 2, p: 2, bgcolor: alpha('#10b981', 0.08), borderRadius: '24px', textAlign: 'center' }}>
                  <Typography fontWeight={600}>Transaksi terakhir: {formatRupiah(lastTransaction.total)}</Typography>
                  {lastTransaction.deliveryOption === 'delivery' && (
                    <>
                      <Typography variant="caption" display="block" color="text.secondary">
                        🚚 Antar ke: {lastTransaction.deliveryAddress}
                      </Typography>
                      <Typography variant="caption" display="block" color="text.secondary">
                        Pelanggan: {lastTransaction.customerName} - {lastTransaction.customerPhone}
                      </Typography>
                    </>
                  )}
                  <Button size="small" onClick={printLastStruk} startIcon={<Print />} sx={{ mt: 1 }}>Cetak Struk</Button>
                </Paper>
              )}

              <Divider sx={{ my: 2.5 }} />
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography fontWeight={800}>Riwayat Transaksi</Typography>
                <Stack direction="row" spacing={1}>
                  <Tooltip title="Filter tanggal"><IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}><FilterList fontSize="small" /></IconButton></Tooltip>
                  <Tooltip title="Ekspor CSV"><IconButton size="small" onClick={exportCSV}><GetApp fontSize="small" /></IconButton></Tooltip>
                  <Tooltip title="Hapus semua"><IconButton size="small" onClick={clearRiwayat}><DeleteOutlineOutlined fontSize="small" /></IconButton></Tooltip>
                </Stack>
              </Stack>

              {/* ─── RIWAYAT DENGAN STATUS PENGANTARAN ─── */}
              <TableContainer sx={{ maxHeight: 280, mt: 1.5 }}>
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Jam</TableCell>
                      <TableCell>Barang</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="center">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedRiwayat.slice(0, 5).map(r => (
                      <TableRow key={r.id} hover>
                        <TableCell>{r.tgl}</TableCell>
                        <TableCell>
                          {r.nama} x{r.qty}
                          {r.deliveryOption === 'delivery' && (
                            <Chip label="🚚 Antar" size="small" sx={{ ml: 0.5, fontSize: '0.55rem', height: 18 }} />
                          )}
                        </TableCell>
                        <TableCell align="right">{formatRupiah(r.total)}</TableCell>
                        <TableCell align="center">
                          {r.deliveryOption === 'delivery' ? (
                            <Chip 
                              label={r.deliveryStatus || 'Menunggu'} 
                              size="small"
                              color={
                                r.deliveryStatus === 'Selesai' ? 'success' :
                                r.deliveryStatus === 'Dalam Perjalanan' ? 'primary' :
                                r.deliveryStatus === 'Batal' ? 'error' : 'warning'
                              }
                              sx={{ fontSize: '0.6rem', height: 20 }}
                            />
                          ) : (
                            <Chip label="Ambil" size="small" variant="outlined" sx={{ fontSize: '0.6rem', height: 20 }} />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {!filteredRiwayat.length && <TableRow><TableCell colSpan={4} align="center">Belum ada transaksi</TableCell></TableRow>}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* ─── DAFTAR PESANAN YANG PERLU DIANTAR ─── */}
              {deliveryCount > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography fontWeight={700} fontSize="0.85rem" sx={{ mb: 1 }}>
                    🚚 Pesanan Perlu Diantar ({deliveryCount})
                  </Typography>
                  <TableContainer sx={{ maxHeight: 150 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Jam</TableCell>
                          <TableCell>Pelanggan</TableCell>
                          <TableCell>Alamat</TableCell>
                          <TableCell align="center">Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {riwayat.filter(r => r.deliveryOption === 'delivery').slice(0, 3).map(r => (
                          <TableRow key={r.id} hover>
                            <TableCell>{r.tgl}</TableCell>
                            <TableCell>{r.customerName || '-'}<br/><small>{r.customerPhone || '-'}</small></TableCell>
                            <TableCell sx={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {r.deliveryAddress}
                            </TableCell>
                            <TableCell align="center">
                              <Chip 
                                label={r.deliveryStatus || 'Menunggu'} 
                                size="small"
                                color={
                                  r.deliveryStatus === 'Selesai' ? 'success' :
                                  r.deliveryStatus === 'Dalam Perjalanan' ? 'primary' :
                                  r.deliveryStatus === 'Batal' ? 'error' : 'warning'
                                }
                                sx={{ fontSize: '0.55rem', height: 18 }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {totalPages > 1 && <Pagination count={totalPages} page={currentPage} onChange={(e, p) => setCurrentPage(p)} size="small" sx={{ mt: 1.5, justifyContent: 'center', display: 'flex' }} />}

              <Box sx={{ mt: 3 }}>
                <Typography fontWeight={800} mb={1}>Penjualan 7 hari</Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tanggal" tick={{ fontSize: 10 }} />
                    <YAxis tickFormatter={(v) => `Rp${(v/1000).toFixed(0)}k`} />
                    <RechartsTooltip formatter={(v) => formatRupiah(v)} />
                    <Line type="monotone" dataKey="penjualan" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Box>

              {/* ======= DATA BARANG (MASUK/KELUAR/SISA) ======= */}
              <Box sx={{ mt: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography fontWeight={900}>Data Barang</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Masuk=0, Keluar diambil dari riwayat (qty)
                  </Typography>
                </Stack>

                <Grid container spacing={1.2} sx={{ mb: 1.5 }}>
                  <Grid item xs={4}>
                    <Card sx={{ p: 1.2, borderRadius: '16px', border: `1px solid ${alpha('#0f172a', 0.08)}` }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={800}>Keluar</Typography>
                      <Typography fontWeight={950} color="primary.main">{totalKeluarAll}</Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card sx={{ p: 1.2, borderRadius: '16px', border: `1px solid ${alpha('#0f172a', 0.08)}` }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={800}>Masuk</Typography>
                      <Typography fontWeight={950} color="primary.main">0</Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card sx={{ p: 1.2, borderRadius: '16px', border: `1px solid ${alpha('#0f172a', 0.08)}` }}>
                      <Typography variant="caption" color="text.secondary" fontWeight={800}>Stok Sisa</Typography>
                      <Typography fontWeight={950} color="primary.main">{totalStokTersisa}</Typography>
                    </Card>
                  </Grid>
                </Grid>

                <TableContainer sx={{ maxHeight: 260 }}>
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 900 }}>Barang</TableCell>
                        <TableCell sx={{ fontWeight: 900 }}>Kategori</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 900 }}>Masuk</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 900 }}>Keluar</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 900 }}>Sisa</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {barangMasukKeluarRows.map((row) => (
                        <TableRow key={row.nama} hover>
                          <TableCell sx={{ fontWeight: 800 }}>{row.nama}</TableCell>
                          <TableCell>{row.kategori}</TableCell>
                          <TableCell align="right">{row.masuk}</TableCell>
                          <TableCell align="right">{row.keluar}</TableCell>
                          <TableCell align="right">{row.stokTersisa}</TableCell>
                        </TableRow>
                      ))}
                      {barangMasukKeluarRows.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                            Tidak ada data barang
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)} PaperProps={{ sx: { borderRadius: '24px' } }}>
          <List>
            {['today','week','month','all'].map(val => (
              <ListItem button key={val} onClick={() => { setFilterDate(val); setAnchorEl(null); setCurrentPage(1); }}>
                <ListItemText primary={val === 'today' ? 'Hari Ini' : val === 'week' ? '7 Hari' : val === 'month' ? '30 Hari' : 'Semua'} />
              </ListItem>
            ))}
          </List>
        </Popover>

        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
          <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: '20px' }}>{snackbar.message}</Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

const ProductPanel = ({ products, categories, selectedCategory, onCategoryChange, search, onSearchChange, onAddToCart }) => (
  <Card sx={{ borderRadius: '28px', p: 2.5, height: '100%' }}>
    <Stack spacing={2.5}>
      <TextField fullWidth id="search-product" placeholder="Cari produk (F2)" value={search} onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{ startAdornment: <Search sx={{ color: '#94a3b8', mr: 1 }} />, sx: { borderRadius: '24px' } }} size="small" />
      <Box>
        <Typography variant="subtitle2" fontWeight={700} mb={1.5}>Kategori</Typography>
        <ToggleButtonGroup value={selectedCategory} exclusive onChange={(e, val) => val && onCategoryChange(val)} size="small" sx={{ flexWrap: 'wrap', gap: 0.8 }}>
          {categories.map(cat => <ToggleButton key={cat} value={cat} sx={{ borderRadius: '24px!important', px: 2, textTransform: 'none' }}>{cat}</ToggleButton>)}
        </ToggleButtonGroup>
      </Box>
      <Divider />
      <Typography variant="subtitle2" fontWeight={700}>Daftar Produk</Typography>
      <Grid container spacing={1.5}>
        {products.map(product => <Grid item xs={6} key={product.id}><ProductCard product={product} onAdd={onAddToCart} /></Grid>)}
        {!products.length && <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}><Typography color="text.secondary">Tidak ada produk</Typography></Box>}
      </Grid>
    </Stack>
  </Card>
);