function StudentSetup({ studentInfo, setStudentInfo, questions, settings, getTotalMaxPoints, setView, startExam }) {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
      <div className="text-center mb-6 space-y-2">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
          {/* User Edit Icon */}
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-800">Lengkapi Identitas Diri</h3>
        <p className="text-sm text-slate-500">Silakan isi kolom di bawah dengan jujur sebelum memulai ujian.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Nama Lengkap Siswa</label>
          <input
            type="text"
            placeholder="Contoh: Muhammad Rian"
            value={studentInfo.name}
            onChange={(e) => setStudentInfo(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-800 font-medium"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">Kelas</label>
            <select
              value={studentInfo.class}
              onChange={(e) => setStudentInfo(prev => ({ ...prev, class: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-800 font-medium"
            >
              <option value="">-- Pilih Kelas --</option>
              <option value="4-A">Kelas 4-A</option>
              <option value="4-B">Kelas 4-B</option>
              <option value="4-C">Kelas 4-C</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">No Absen</label>
            <input
              type="number"
              placeholder="Contoh: 12"
              value={studentInfo.rollNo}
              onChange={(e) => setStudentInfo(prev => ({ ...prev, rollNo: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-800 font-medium"
            />
          </div>
        </div>

        {/* INFO BOX */}
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex items-start space-x-3 text-amber-800">
          <svg className="w-5 h-5 flex-shrink-0 text-amber-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-xs space-y-1">
            <p className="font-bold">Informasi Ujian:</p>
            <ul className="list-disc list-inside space-y-0.5 text-amber-700">
              <li>Jumlah Soal: {questions.length} butir</li>
              <li>Waktu Pengerjaan: {settings.durationMinutes} menit</li>
              <li>Urutan Soal: <span className="font-bold">{settings.randomizeQuestions ? 'Diacak' : 'Urut'}</span></li>
              <li>Poin maksimal: {getTotalMaxPoints()} poin</li>
            </ul>
          </div>
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            onClick={() => setView('landing')}
            className="w-1/3 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all text-sm"
          >
            Batal
          </button>
          <button
            onClick={startExam}
            className="w-2/3 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-200 hover:shadow-lg transition-all text-sm"
          >
            Mulai Ujian Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
