function TeacherLogin({ setView, settings, triggerNotif }) {
  const [pin, setPin] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === settings.teacherPin) {
      triggerNotif("Berhasil masuk ke Panel Guru", "success");
      setView('teacher_dashboard');
    } else {
      triggerNotif("PIN salah! Akses ditolak.", "error");
      setPin('');
    }
  };

  return (
    <div className="flex justify-center items-center py-12 animate-fade-in">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-indigo-100 max-w-md w-full">
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-800">Keamanan Panel Guru</h3>
          <p className="text-sm text-slate-500">Masukkan PIN keamanan untuk mengakses ruang guru.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">PIN Akses</label>
            <input
              type="password"
              autoFocus
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Masukkan PIN..."
              className="w-full text-center text-2xl tracking-widest px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all font-bold text-slate-800"
              required
            />
            <p className="text-[10px] text-slate-400 text-center">Default PIN: 123456</p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setView('landing')}
              className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-colors"
            >
              Kembali
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all"
            >
              Buka Panel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
