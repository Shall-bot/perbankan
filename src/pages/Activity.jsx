import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowDownLeft, 
  ArrowUpRight,
  ArrowLeft,
  Settings
} from 'lucide-react';

// --- MOCK DATA ---
const monthlyStats = [
  { month: 'Jan', in: 1500000, out: 800000 },
  { month: 'Feb', in: 2000000, out: 1200000 },
  { month: 'Mar', in: 1800000, out: 1500000 },
  { month: 'Apr', in: 2500000, out: 900000 },
  { month: 'Mei', in: 2200000, out: 1800000 },
  { month: 'Jun', in: 3000000, out: 1100000 },
];

const transactions = [
  { id: 1, type: 'out', title: 'Transfer ke Andi', date: 'Hari ini, 14:30', amount: 250000 },
  { id: 2, type: 'in', title: 'Gaji Masuk', date: 'Kemarin, 09:00', amount: 8500000 },
  { id: 3, type: 'out', title: 'Pembayaran PLN', date: '20 Mei, 18:45', amount: 350000 },
  { id: 4, type: 'out', title: 'Top Up Gopay', date: '19 Mei, 12:15', amount: 100000 },
  { id: 5, type: 'in', title: 'Terima dari Salma', date: '15 Mei, 09:00', amount: 200000 },
  { id: 6, type: 'out', title: 'Biaya Admin', date: '10 Mei, 12:00', amount: 2500 },
];

export default function Activity() {
  const [filter, setFilter] = useState('all');

  const formatIDR = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value).replace('Rp', 'Rp '); // Menambahkan spasi setelah Rp agar mirip desain
  };

  const maxChartValue = Math.max(...monthlyStats.flatMap(m => [m.in, m.out]));
  const filteredTransactions = transactions.filter(t => 
    filter === 'all' ? true : t.type === filter
  );

  return (
    // Background utama menggunakan warna gelap kebiruan mirip screenshot
    <div className="min-h-screen bg-[#0a0f1d] text-slate-200 p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Section */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="p-2 bg-[#161b2d] rounded-full border border-slate-800 hover:bg-[#1e243b] transition-colors text-slate-300"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-semibold text-slate-100">Riwayat Aktivitas</h1>
          </div>
          {/* Ikon Pengaturan di Kanan (Opsional, menyesuaikan layout) */}
          <button className="p-2 bg-[#161b2d] rounded-full text-slate-400 hover:text-slate-200 transition-colors">
            <Settings size={20} />
          </button>
        </header>

        {/* Chart Section - Menyesuaikan warna panel */}
        <section className="bg-[#161b2d] p-6 rounded-2xl border border-[#232942]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-sm font-semibold text-slate-200">Grafik Arus Kas</h2>
            
            <div className="flex gap-4 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></div> Pemasukan
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-sm bg-rose-500"></div> Pengeluaran
              </div>
            </div>
          </div>

          <div className="h-52 flex items-end justify-between gap-2 md:gap-6 pt-4 border-b border-[#232942] pb-2">
            {monthlyStats.map((stat, index) => {
              const inHeight = (stat.in / maxChartValue) * 100;
              const outHeight = (stat.out / maxChartValue) * 100;
              
              return (
                <div key={index} className="flex flex-col items-center flex-1 group relative">
                  <div className="w-full flex justify-center gap-1.5 items-end h-full">
                    <div 
                      style={{ height: `${inHeight}%` }} 
                      className="w-full max-w-[20px] bg-emerald-500/80 rounded-t-sm hover:bg-emerald-400 transition-all duration-300 relative"
                    ></div>
                    <div 
                      style={{ height: `${outHeight}%` }} 
                      className="w-full max-w-[20px] bg-rose-500/80 rounded-t-sm hover:bg-rose-400 transition-all duration-300"
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-slate-500 mt-4">{stat.month}</span>
                  
                  {/* Tooltip Hover */}
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#0a0f1d] border border-[#232942] text-slate-200 text-xs p-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10 shadow-xl">
                    <span className="text-emerald-400 font-medium">+ {formatIDR(stat.in)}</span> <br/>
                    <span className="text-rose-400 font-medium">- {formatIDR(stat.out)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* History Section */}
        <section className="bg-[#161b2d] rounded-2xl border border-[#232942] overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-[#232942]">
            <h2 className="text-sm font-semibold text-slate-200">Aktivitas Terakhir</h2>
            
            {/* Filter Pills */}
            <div className="flex bg-[#0a0f1d] p-1 rounded-lg border border-[#232942]">
              {['all', 'in', 'out'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
                    filter === f 
                      ? 'bg-[#1e243b] text-indigo-400 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {f === 'all' ? 'Semua' : f === 'in' ? 'Pemasukan' : 'Pengeluaran'}
                </button>
              ))}
            </div>
          </div>

          {/* List Transaksi */}
          <div className="px-6 pb-2">
            {filteredTransactions.length > 0 ? (
              <div className="divide-y divide-[#232942]">
                {filteredTransactions.map((trx) => (
                  <div key={trx.id} className="py-4 hover:bg-[#1a2035] -mx-6 px-6 flex items-center justify-between transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      {/* Ikon Arrow: Diadaptasi langsung dari gambar */}
                      <div className={`p-2.5 rounded-xl flex items-center justify-center ${
                        trx.type === 'in' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {trx.type === 'in' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} strokeWidth={2.5} />}
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sm text-slate-200">{trx.title}</h3>
                        <p className="text-[11px] text-slate-500 mt-1">{trx.date}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className={`text-sm font-semibold tracking-wide ${
                        trx.type === 'in' ? 'text-emerald-400' : 'text-slate-200'
                      }`}>
                        {trx.type === 'in' ? '+' : '-'}{formatIDR(trx.amount)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 text-sm">
                <p>Belum ada transaksi di kategori ini.</p>
              </div>
            )}
          </div>
          
          {/* Tombol Lihat Semua (Opsional, disamakan dengan desain) */}
          <button className="w-full p-4 text-xs font-medium text-indigo-400 hover:bg-[#1a2035] transition-colors border-t border-[#232942]">
            Muat Lebih Banyak
          </button>
        </section>
        
      </div>
    </div>
  );
}