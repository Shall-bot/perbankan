import React, { useState } from 'react';
import { 
  Search, 
  Menu, 
  Home, 
  CreditCard, 
  ArrowRightLeft, 
  Clock, 
  Settings, 
  User,
  LogOut,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  MoreHorizontal,
  QrCode,
  Smartphone // Menambahkan icon Smartphone
} from 'lucide-react';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans relative overflow-hidden selection:bg-indigo-500/30">
      
      {/* Ambient Background Glowing Orbs for Glassmorphism Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-[30%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-purple-500/20 blur-[100px]" />
        <div className="absolute bottom-[20%] left-[20%] w-[25vw] h-[25vw] rounded-full bg-emerald-500/10 blur-[100px]" />
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } flex flex-col`}
      >
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <div className="flex items-center gap-2 text-white">
            <Wallet className="w-8 h-8 text-indigo-400" />
            <span className="text-xl font-bold tracking-wide">NeoBank</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-white bg-white/10 border border-white/5 rounded-xl font-medium shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all">
            <Home className="w-5 h-5 text-indigo-400" />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all">
            <ArrowRightLeft className="w-5 h-5" />
            Transfer
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all">
            <CreditCard className="w-5 h-5" />
            Kartu
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all">
            <Clock className="w-5 h-5" />
            Aktivitas
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-all">
            <Settings className="w-5 h-5" />
            Pengaturan
          </a>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl font-medium transition-all">
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        
        {/* Header */}
        <header className="h-16 bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 lg:hidden rounded-lg transition-colors focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-white hidden sm:block tracking-wide">Selamat Datang, Budi!</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari transaksi..." 
                className="pl-10 pr-4 py-2 bg-black/20 border border-white/10 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-white/30 w-64 transition-all"
              />
            </div>
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold cursor-pointer shadow-lg border border-white/20">
              B
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-hide">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Top Section: Balance & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Balance Card - Highlighted Glass */}
              <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600/40 to-blue-600/40 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-white shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] relative overflow-hidden group">
                {/* Internal decorative glares */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none"></div>
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                
                <div className="relative z-10">
                  <p className="text-indigo-200 font-medium mb-2 flex items-center gap-2">
                    <Wallet className="w-4 h-4" /> Total Saldo Aktif
                  </p>
                  <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                    Rp 45.250.000
                  </h2>
                </div>
              </div>

              {/* My Cards Summary */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-white tracking-wide">Kartu Saya</h3>
                  <button className="text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors">Lihat Semua</button>
                </div>
                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-white relative overflow-hidden shadow-inner">
                  {/* Mastercard style circles */}
                  <div className="absolute top-0 right-0 p-4 opacity-70">
                    <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="12" fill="#ff5f00" fillOpacity="0.8"/>
                      <circle cx="28" cy="12" r="12" fill="#ffb900" fillOpacity="0.8"/>
                    </svg>
                  </div>
                  <div className="w-8 h-6 bg-white/20 rounded-md mb-6 backdrop-blur-sm border border-white/10"></div>
                  <p className="text-sm tracking-[0.2em] mb-4 text-slate-200 font-mono">**** **** **** 3842</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Card Holder</p>
                      <p className="text-sm font-medium">Budi Santoso</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Expires</p>
                      <p className="text-sm font-medium">12/28</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 tracking-wide">Layanan Cepat</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: ArrowRightLeft, label: 'Transfer', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                  { icon: CreditCard, label: 'Pembayaran', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                  { icon: QrCode, label: 'QRIS', color: 'text-purple-400', bg: 'bg-purple-500/10' },
                  { icon: Smartphone, label: 'Top Up', color: 'text-orange-400', bg: 'bg-orange-500/10' }, // Mengganti Lainnya dengan Top Up
                ].map((action, index) => (
                  <button key={index} className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-all duration-300 group">
                    <div className={`p-3 rounded-xl ${action.bg} border border-white/5 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                      <action.icon className={`w-6 h-6 ${action.color}`} />
                    </div>
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <h3 className="text-lg font-semibold text-white tracking-wide">Aktivitas Terakhir</h3>
                <button className="text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors">Lihat Semua</button>
              </div>
              <div className="divide-y divide-white/5">
                {[
                  { title: 'Transfer ke Andi', type: 'out', amount: '-Rp 250.000', date: 'Hari ini, 14:30', icon: ArrowUpRight, iconColor: 'text-red-400', iconBg: 'bg-red-500/10' },
                  { title: 'Gaji Masuk', type: 'in', amount: '+Rp 8.500.000', date: 'Kemarin, 09:00', icon: ArrowDownLeft, iconColor: 'text-emerald-400', iconBg: 'bg-emerald-500/10' },
                  { title: 'Pembayaran PLN', type: 'out', amount: '-Rp 350.000', date: '20 Mei, 18:45', icon: ArrowUpRight, iconColor: 'text-red-400', iconBg: 'bg-red-500/10' },
                  { title: 'Top Up Gopay', type: 'out', amount: '-Rp 100.000', date: '19 Mei, 12:15', icon: ArrowUpRight, iconColor: 'text-red-400', iconBg: 'bg-red-500/10' },
                ].map((tx, index) => (
                  <div key={index} className="p-4 sm:p-6 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${tx.iconBg} border border-white/5 group-hover:scale-105 transition-transform`}>
                        <tx.icon className={`w-5 h-5 ${tx.iconColor}`} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-200 group-hover:text-white transition-colors">{tx.title}</p>
                        <p className="text-sm text-slate-400">{tx.date}</p>
                      </div>
                    </div>
                    <div className={`font-semibold tracking-wide ${tx.type === 'in' ? 'text-emerald-400' : 'text-slate-200'}`}>
                      {tx.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Future Features Placeholder */}
            <div className="bg-indigo-900/20 backdrop-blur-md border border-indigo-500/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg">
              <div className="p-4 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded-2xl mb-4 shadow-inner">
                <Settings className="w-6 h-6 animate-[spin_4s_linear_infinite]" />
              </div>
              <h4 className="font-medium text-indigo-200 mb-2 text-lg tracking-wide">Area Modul Tambahan</h4>
              <p className="text-sm text-indigo-300/70 max-w-md leading-relaxed">
                Ruang kosong bergaya glassmorphism ini bisa digunakan untuk meletakkan komponen lain, seperti Grafik Pengeluaran Bulanan atau Promo Eksklusif Bank.
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}