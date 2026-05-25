function Header({ view, setView, resetToLanding }) {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={resetToLanding}>
          {/* Custom SVG Graduation Cap Icon */}
          <svg className="w-8 h-8 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
          <div>
            <h1 className="text-xl font-bold tracking-tight">KREASI CBT KELAS 4</h1>
            <p className="text-xs text-blue-100 font-medium">Platform Evaluasi & Analisis Instan Siswa SD</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {view === 'landing' && (
            <button
              onClick={() => setView('teacher_dashboard')}
              className="bg-indigo-800 hover:bg-indigo-900 border border-indigo-400 text-xs text-white font-semibold py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Masuk Panel Guru
            </button>
          )}
          {view !== 'landing' && view !== 'student_exam' && (
            <button
              onClick={resetToLanding}
              className="bg-white hover:bg-slate-100 text-indigo-700 text-xs font-bold py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Halaman Utama
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
