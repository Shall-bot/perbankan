import React, { useState, useEffect, useRef } from 'react';
import {
  QrCode, X, ChevronLeft, CheckCircle2, XCircle, Camera,
  AlertCircle, ShieldCheck, Zap, Copy, RefreshCw
} from 'lucide-react';

const STEP = {
  CHOOSE_MODE: 'choose_mode',
  SCAN:        'scan',
  INPUT_AMOUNT:'input_amount',
  REVIEW:      'review',
  PIN:         'pin',
  PROCESSING:  'processing',
  SUCCESS:     'success',
  FAILED:      'failed',
  SHOW_QR:     'show_qr',
};

const MOCK_MERCHANTS = [
  { name: 'Warung Makan Bu Sari', category: 'Restoran', nmid: 'ID123400001234567' },
  { name: 'Indomaret Gajah Mada', category: 'Minimarket', nmid: 'ID123400009876543' },
  { name: 'Apotek Kimia Farma',   category: 'Apotek',    nmid: 'ID123400005678901' },
];

export default function QRISModal({ onClose }) {
  const [step, setStep]           = useState(STEP.CHOOSE_MODE);
  const [mode, setMode]           = useState(null);
  const [merchant, setMerchant]   = useState(null);
  const [amount, setAmount]       = useState('');
  const [pin, setPin]             = useState('');
  const [pinError, setPinError]   = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [scanProgress, setScanProgress] = useState(0);
  const timerRef = useRef(null);

  const formatRp = (val) => {
    const num = val.replace(/\D/g, '');
    return num ? parseInt(num, 10).toLocaleString('id-ID') : '';
  };

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    setAmount(raw);
  };

  useEffect(() => {
    if (step === STEP.SCAN) {
      setScanProgress(0);
      const picked = MOCK_MERCHANTS[Math.floor(Math.random() * MOCK_MERCHANTS.length)];
      const t = setTimeout(() => setMerchant(picked), 2800);
      const prog = setInterval(() => setScanProgress(p => Math.min(p + 4, 90)), 120);
      return () => { clearTimeout(t); clearInterval(prog); };
    }
  }, [step]);

  useEffect(() => {
    if (merchant && step === STEP.SCAN) {
      setScanProgress(100);
      setTimeout(() => setStep(STEP.INPUT_AMOUNT), 400);
    }
  }, [merchant]);

  useEffect(() => {
    if (step === STEP.PROCESSING) {
      const t = setTimeout(() => {
        setStep(Math.random() < 0.9 ? STEP.SUCCESS : STEP.FAILED);
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [step]);

  useEffect(() => {
    if (step === STEP.SUCCESS) {
      setCountdown(5);
      timerRef.current = setInterval(() => {
        setCountdown(c => {
          if (c <= 1) { clearInterval(timerRef.current); onClose(); return 0; }
          return c - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [step]);

  const handlePinInput = (digit) => {
    if (pin.length >= 6) return;
    const next = pin + digit;
    setPin(next);
    setPinError(false);
    if (next.length === 6) {
      setTimeout(() => {
        if (next === '123456') setStep(STEP.PROCESSING);
        else { setPinError(true); setPin(''); }
      }, 300);
    }
  };

  const handlePinDelete = () => setPin(p => p.slice(0, -1));

  const amountNum = parseInt(amount || '0', 10);
  const fee = amountNum >= 1000 ? 1000 : 0;
  const total = amountNum + fee;

  const renderChooseMode = () => (
    <div className="flex flex-col gap-4 mt-2">
      <button onClick={() => { setMode('pay'); setStep(STEP.SCAN); }} className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group text-left">
        <div className="p-3 bg-indigo-500/20 rounded-xl border border-indigo-500/20 group-hover:scale-110 transition-transform">
          <Camera className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <p className="font-semibold text-white">Bayar dengan QRIS</p>
          <p className="text-sm text-slate-400 mt-0.5">Scan kode QR merchant untuk membayar</p>
        </div>
      </button>
      <button onClick={() => { setMode('receive'); setStep(STEP.SHOW_QR); }} className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group text-left">
        <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/20 group-hover:scale-110 transition-transform">
          <QrCode className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <p className="font-semibold text-white">Tampilkan QR Saya</p>
          <p className="text-sm text-slate-400 mt-0.5">Terima pembayaran dari orang lain</p>
        </div>
      </button>
    </div>
  );

  const renderScan = () => (
    <div className="flex flex-col items-center gap-5 mt-2">
      <div className="relative w-64 h-64 rounded-2xl overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        {['top-3 left-3','top-3 right-3','bottom-3 left-3','bottom-3 right-3'].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-6 h-6 border-indigo-400`} style={{ borderTop: pos.includes('top') ? '3px solid' : 'none', borderBottom: pos.includes('bottom') ? '3px solid' : 'none', borderLeft: pos.includes('left') ? '3px solid' : 'none', borderRight: pos.includes('right') ? '3px solid' : 'none', borderColor: '#818cf8' }} />
        ))}
        <div className="absolute left-4 right-4 h-0.5 bg-indigo-400/80" style={{ top: `${scanProgress}%`, transition: 'top 0.12s linear', boxShadow: '0 0 8px #818cf8' }} />
        {!merchant && <div className="text-center z-10"><QrCode className="w-16 h-16 text-white/20 mx-auto mb-2" /><p className="text-xs text-white/40">Arahkan ke kode QR</p></div>}
        {merchant && <div className="z-10 flex flex-col items-center gap-2"><CheckCircle2 className="w-12 h-12 text-emerald-400" /><p className="text-white font-medium text-sm">QR Terdeteksi</p></div>}
      </div>
      <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden"><div className="h-full bg-indigo-500 transition-all duration-200 rounded-full" style={{ width: `${scanProgress}%` }} /></div>
      <p className="text-sm text-slate-400">{merchant ? 'Berhasil membaca kode QR…' : 'Memindai kode QRIS…'}</p>
    </div>
  );

  const renderInputAmount = () => (
    <div className="flex flex-col gap-5 mt-2">
      <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">{merchant?.name[0]}</div>
        <div><p className="font-semibold text-white">{merchant?.name}</p><p className="text-xs text-slate-400 mt-0.5">{merchant?.category} · {merchant?.nmid}</p></div>
        <div className="ml-auto"><span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-lg font-medium">Terverifikasi</span></div>
      </div>
      <div>
        <label className="text-sm text-slate-400 mb-2 block">Jumlah Pembayaran</label>
        <div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 font-semibold">Rp</span><input type="text" inputMode="numeric" placeholder="0" value={formatRp(amount)} onChange={handleAmountChange} className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-xl font-bold placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-white/30 transition-all" /></div>
        <div className="flex gap-2 mt-3 flex-wrap">
          {[10000, 25000, 50000, 100000].map(v => (<button key={v} onClick={() => setAmount(String(v))} className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-all">{v.toLocaleString('id-ID')}</button>))}
        </div>
      </div>
      {amountNum > 0 && (
        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 space-y-2 text-sm">
          <div className="flex justify-between text-slate-400"><span>Nominal</span><span>Rp {amountNum.toLocaleString('id-ID')}</span></div>
          <div className="flex justify-between text-slate-400"><span>Biaya Layanan</span><span>Rp {fee.toLocaleString('id-ID')}</span></div>
          <div className="flex justify-between font-semibold text-white border-t border-white/10 pt-2 mt-2"><span>Total Bayar</span><span>Rp {total.toLocaleString('id-ID')}</span></div>
        </div>
      )}
      <button disabled={amountNum < 1000} onClick={() => setStep(STEP.REVIEW)} className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all active:scale-[0.98] shadow-lg">Lanjutkan</button>
      {amountNum < 1000 && amountNum > 0 && <p className="text-xs text-center text-red-400">Minimal pembayaran Rp 1.000</p>}
    </div>
  );

  const renderReview = () => (
    <div className="flex flex-col gap-5 mt-2">
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center gap-4"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">{merchant?.name[0]}</div><div><p className="font-semibold text-white text-sm">{merchant?.name}</p><p className="text-xs text-slate-400">{merchant?.category}</p></div></div>
        <div className="p-5 space-y-3 text-sm">
          {[ ['Nominal', `Rp ${amountNum.toLocaleString('id-ID')}`], ['Biaya Layanan', `Rp ${fee.toLocaleString('id-ID')}`], ['Metode', 'Saldo NeoBank'], ['Tanggal', new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })], ].map(([k, v]) => (
            <div key={k} className="flex justify-between"><span className="text-slate-400">{k}</span><span className="text-slate-200 font-medium">{v}</span></div>
          ))}
          <div className="flex justify-between border-t border-white/10 pt-3"><span className="text-white font-semibold">Total Bayar</span><span className="text-indigo-300 font-bold text-base">Rp {total.toLocaleString('id-ID')}</span></div>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-sm"><ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" /><span className="text-emerald-300">Saldo mencukupi · Rp 45.250.000</span></div>
      <button onClick={() => setStep(STEP.PIN)} className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-xl transition-all active:scale-[0.98] shadow-lg">Konfirmasi &amp; Masukkan PIN</button>
    </div>
  );

  const renderPin = () => (
    <div className="flex flex-col items-center gap-6 mt-2">
      <div className="text-center"><p className="text-slate-300 text-sm">Masukkan PIN NeoBank kamu</p><p className="text-xs text-slate-500 mt-1">6 digit angka yang kamu buat saat registrasi</p></div>
      <div className="flex gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${ pinError ? 'border-red-400 bg-red-400' : pin.length > i ? 'border-indigo-400 bg-indigo-400' : 'border-white/20 bg-transparent' }`} />
        ))}
      </div>
      {pinError && <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2"><AlertCircle className="w-4 h-4" /><span>PIN salah. Silakan coba lagi.</span></div>}
      <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
        {[1,2,3,4,5,6,7,8,9,'',0,'del'].map((key, i) => {
          if (key === '') return <div key={i} />;
          if (key === 'del') return <button key={i} onClick={handlePinDelete} className="h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 active:scale-95 transition-all"><X className="w-5 h-5" /></button>;
          return <button key={i} onClick={() => handlePinInput(String(key))} className="h-14 rounded-2xl bg-white/5 border border-white/10 text-white text-xl font-semibold hover:bg-white/10 active:scale-95 transition-all">{key}</button>;
        })}
      </div>
      <p className="text-xs text-slate-500">Hint: gunakan 123456</p>
    </div>
  );

  const renderProcessing = () => (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="relative w-20 h-20"><div className="absolute inset-0 rounded-full border-4 border-indigo-500/20" /><div className="absolute inset-0 rounded-full border-4 border-t-indigo-400 animate-spin" /><div className="absolute inset-0 flex items-center justify-center"><Zap className="w-8 h-8 text-indigo-400" /></div></div>
      <div className="text-center space-y-1"><p className="font-semibold text-white">Memproses Pembayaran</p><p className="text-sm text-slate-400">Mohon tunggu sebentar…</p></div>
      <div className="space-y-2 w-full">
        {['Menghubungi jaringan QRIS', 'Memverifikasi merchant', 'Mendebit saldo'].map((t, i) => (<div key={i} className="flex items-center gap-3 text-sm text-slate-400"><div className="w-4 h-4 rounded-full bg-indigo-500/30 border border-indigo-500/40 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" /></div>{t}</div>))}
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="flex flex-col items-center gap-5 py-4">
      <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center"><CheckCircle2 className="w-12 h-12 text-emerald-400" /></div>
      <div className="text-center"><p className="text-2xl font-bold text-white">Pembayaran Berhasil!</p><p className="text-slate-400 text-sm mt-1">Transaksi kamu telah selesai</p></div>
      <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 text-sm">
        <div className="flex justify-between"><span className="text-slate-400">Merchant</span><span className="text-white font-medium">{merchant?.name}</span></div>
        <div className="flex justify-between"><span className="text-slate-400">Total Dibayar</span><span className="text-emerald-400 font-bold">Rp {total.toLocaleString('id-ID')}</span></div>
        <div className="flex justify-between"><span className="text-slate-400">No. Referensi</span><span className="text-slate-200 font-mono text-xs">NEO{Date.now().toString().slice(-10)}</span></div>
        <div className="flex justify-between"><span className="text-slate-400">Waktu</span><span className="text-slate-200">{new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span></div>
      </div>
      <div className="flex items-center gap-2 text-slate-400 text-sm"><RefreshCw className="w-4 h-4 animate-spin" style={{ animationDuration: '2s' }} /><span>Menutup otomatis dalam <span className="text-indigo-300 font-semibold">{countdown}s</span>…</span></div>
      <button onClick={onClose} className="w-full py-3.5 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-medium rounded-xl transition-all">Selesai</button>
    </div>
  );

  const renderFailed = () => (
    <div className="flex flex-col items-center gap-5 py-4">
      <div className="w-20 h-20 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center"><XCircle className="w-12 h-12 text-red-400" /></div>
      <div className="text-center"><p className="text-2xl font-bold text-white">Pembayaran Gagal</p><p className="text-slate-400 text-sm mt-1 max-w-xs">Koneksi ke jaringan QRIS terputus. Saldo kamu tidak didebit.</p></div>
      <div className="flex items-center gap-2 text-sm text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5 w-full"><AlertCircle className="w-4 h-4 flex-shrink-0" /><span>Tidak ada dana yang terdebet dari akun kamu</span></div>
      <div className="flex gap-3 w-full">
        <button onClick={() => { setStep(STEP.PIN); setPin(''); }} className="flex-1 py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white font-medium rounded-xl transition-all">Coba Lagi</button>
        <button onClick={onClose} className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all">Batal</button>
      </div>
    </div>
  );

  const renderShowQR = () => (
    <div className="flex flex-col items-center gap-5 mt-2">
      <p className="text-sm text-slate-400 text-center">Tunjukkan kode QR ini ke kasir atau teman kamu</p>
      <div className="bg-white p-5 rounded-2xl shadow-xl">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="50" height="50" rx="3" fill="#1e1b4b"/><rect x="18" y="18" width="34" height="34" rx="2" fill="white"/><rect x="24" y="24" width="22" height="22" rx="1" fill="#1e1b4b"/>
          <rect x="120" y="10" width="50" height="50" rx="3" fill="#1e1b4b"/><rect x="128" y="18" width="34" height="34" rx="2" fill="white"/><rect x="134" y="24" width="22" height="22" rx="1" fill="#1e1b4b"/>
          <rect x="10" y="120" width="50" height="50" rx="3" fill="#1e1b4b"/><rect x="18" y="128" width="34" height="34" rx="2" fill="white"/><rect x="24" y="134" width="22" height="22" rx="1" fill="#1e1b4b"/>
          {[0,1,2,3,4,5,6].map(i => i%2===0 && (<rect key={i} x={70+i*7} y="68" width="6" height="6" fill="#1e1b4b"/>))}
          {[0,1,2,3,4,5,6].map(i => i%2===0 && (<rect key={i} x="68" y={70+i*7} width="6" height="6" fill="#1e1b4b"/>))}
          {[ [77,80],[84,80],[91,80],[105,80],[112,80],[119,80],[77,87],[98,87],[112,87],[126,87], [133,87],[140,87],[77,94],[91,94],[105,94],[119,94],[133,94],[84,101],[98,101],[112,101], [126,101],[140,101],[77,108],[91,108],[105,108],[112,108],[133,108],[140,108],[77,115], [84,115],[98,115],[119,115],[77,122],[98,122],[105,122],[112,122],[126,122],[133,122], [77,129],[84,129],[91,129],[112,129],[119,129],[140,129],[77,136],[98,136],[119,136], [126,136],[133,136],[77,143],[84,143],[91,143],[98,143],[105,143],[126,143],[77,150], [98,150],[105,150],[119,150],[126,150],[133,150], ].map(([x,y], i) => <rect key={i} x={x} y={y} width="6" height="6" fill="#1e1b4b"/>)}
          <rect x="80" y="80" width="20" height="20" rx="3" fill="#4f46e5"/><text x="90" y="93" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">N</text>
        </svg>
      </div>
      <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 text-sm">
        <div className="flex justify-between"><span className="text-slate-400">Nama</span><span className="text-white font-medium">Budi Santoso</span></div>
        <div className="flex justify-between"><span className="text-slate-400">Nomor Rekening</span><div className="flex items-center gap-1.5"><span className="text-white font-mono">**** 3842</span><button className="text-indigo-400 hover:text-indigo-300"><Copy className="w-3.5 h-3.5" /></button></div></div>
        <div className="flex justify-between"><span className="text-slate-400">Bank</span><span className="text-white">NeoBank</span></div>
      </div>
      <p className="text-xs text-slate-500 text-center">QR berlaku sesuai standar QRIS Bank Indonesia</p>
    </div>
  );

  const stepConfig = {
    [STEP.CHOOSE_MODE]:  { title: 'QRIS',                   back: null },
    [STEP.SCAN]:         { title: 'Scan Kode QR',           back: STEP.CHOOSE_MODE },
    [STEP.INPUT_AMOUNT]: { title: 'Masukkan Nominal',       back: STEP.SCAN },
    [STEP.REVIEW]:       { title: 'Konfirmasi Pembayaran',  back: STEP.INPUT_AMOUNT },
    [STEP.PIN]:          { title: 'Masukkan PIN',           back: STEP.REVIEW },
    [STEP.PROCESSING]:   { title: 'Memproses',              back: null },
    [STEP.SUCCESS]:      { title: 'Berhasil',               back: null },
    [STEP.FAILED]:       { title: 'Pembayaran Gagal',       back: null },
    [STEP.SHOW_QR]:      { title: 'QR Code Saya',          back: STEP.CHOOSE_MODE },
  };

  const cfg = stepConfig[step];

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={step !== STEP.PROCESSING ? onClose : undefined} />
      <div className="relative w-full sm:w-auto sm:min-w-[400px] sm:max-w-md bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto z-10">
        <div className="flex justify-center pt-3 pb-1 sm:hidden"><div className="w-10 h-1 bg-white/20 rounded-full" /></div>
        <div className="flex items-center justify-between px-6 pt-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            {cfg.back && (<button onClick={() => setStep(cfg.back)} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"><ChevronLeft className="w-5 h-5" /></button>)}
            <div className="flex items-center gap-2"><div className="p-1.5 bg-indigo-500/20 rounded-lg"><QrCode className="w-4 h-4 text-indigo-400" /></div><span className="font-semibold text-white">{cfg.title}</span></div>
          </div>
          {step !== STEP.PROCESSING && (<button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"><X className="w-5 h-5" /></button>)}
        </div>
        <div className="px-6 pb-6 pt-2">
          {step === STEP.CHOOSE_MODE  && renderChooseMode()}
          {step === STEP.SCAN         && renderScan()}
          {step === STEP.INPUT_AMOUNT && renderInputAmount()}
          {step === STEP.REVIEW       && renderReview()}
          {step === STEP.PIN          && renderPin()}
          {step === STEP.PROCESSING   && renderProcessing()}
          {step === STEP.SUCCESS      && renderSuccess()}
          {step === STEP.FAILED       && renderFailed()}
          {step === STEP.SHOW_QR      && renderShowQR()}
        </div>
      </div>
    </div>
  );
}