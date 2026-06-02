import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';       
import Activity from './pages/Activity'; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman Utama */}
        <Route path="/" element={<Home />} />
        
        {/* Halaman Riwayat Transaksi */}
        <Route path="/activity" element={<Activity />} />
      </Routes>
    </BrowserRouter>
  );
}