function LandingPage({ setView }) {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center py-10">
      {/* Left Column: Visual Intro */}
      <div className="space-y-6">
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">CBT Kelas IV SD</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
          Ujian Lebih <span className="text-indigo-600 underline decoration-indigo-200">Menyenangkan</span>, Analisis Lebih Akurat!
        </h2>
        <p className="text-slate-600 text-lg leading-relaxed">
          Platform ujian daring interaktif yang dirancang khusus untuk mengacak butir soal secara otomatis dengan **bobot poin soal yang fleksibel (berbeda-beda)**. Memudahkan Bapak/Ibu Guru mendeteksi titik kesulitan belajar siswa dengan analisis butir soal instan!
        </p>
        
        <div className="flex flex-wrap gap-4 pt-2">
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-semibold text-slate-700">Acak Soal Sekali Klik</span>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span className="text-xs font-semibold text-slate-700">Poin Berbeda Tiap Tingkat Kesulitan</span>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="text-xs font-semibold text-slate-700">Analisis Otomatis Terintegrasi</span>
          </div>
        </div>
      </div>

      {/* Right Column: Portal Cards */}
      <div className="space-y-4">
        {/* Student Portal Card */}
        <div 
          onClick={() => setView('student_setup')}
          className="bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50 p-6 rounded-3xl border-2 border-blue-200 hover:border-blue-400 cursor-pointer shadow-lg hover:shadow-xl transition-all group duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold py-1 px-3 rounded-full">KAMPUS SISWA</span>
              <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors">Masuk sebagai Siswa</h3>
              <p className="text-sm text-slate-500">Gunakan komputer/tablet untuk mulai mengerjakan evaluasi acak berpoin.</p>
            </div>
            <div className="bg-blue-100 group-hover:bg-blue-600 p-4 rounded-2xl text-blue-600 group-hover:text-white transition-all">
              {/* Student Icon */}
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>

        {/* Teacher Portal Card */}
        <div 
          onClick={() => setView('teacher_login')}
          className="bg-white hover:bg-gradient-to-br hover:from-white hover:to-indigo-50 p-6 rounded-3xl border-2 border-indigo-100 hover:border-indigo-400 cursor-pointer shadow-md hover:shadow-lg transition-all group duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <span className="bg-indigo-100 text-indigo-700 text-xs font-bold py-1 px-3 rounded-full">RUANG GURU</span>
              <h3 className="text-2xl font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">Masuk sebagai Guru</h3>
              <p className="text-sm text-slate-500">Kelola soal, sesuaikan poin per butir soal, dan pantau hasil statistik siswa.</p>
            </div>
            <div className="bg-indigo-100 group-hover:bg-indigo-600 p-4 rounded-2xl text-indigo-600 group-hover:text-white transition-all">
              {/* Chart / Presentation Icon */}
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
