function ResultCard({ examResults, settings, resetToLanding, triggerNotif, questions }) {
  const latestResult = examResults[0];
  if (!latestResult) return null;

  const isPassed = latestResult.score >= settings.passingScore;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Core Score Summary */}
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center space-y-6">
        <div className="space-y-2">
          <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black">
            {isPassed ? (
              <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            ) : (
              <div className="bg-amber-100 text-amber-600 p-4 rounded-full">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
            )}
          </div>
          <h3 className="text-3xl font-black text-slate-800">
            {isPassed ? 'Hebat! Kamu Lulus' : 'Ayo Semangat Belajar Lagi!'}
          </h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Terima kasih **{latestResult.studentName}** telah menyelesaikan evaluasi ini dengan penuh kejujuran.
          </p>
          {latestResult.violations > 0 && (
            <div className="bg-rose-50 text-rose-700 text-xs font-bold py-2 px-4 rounded-xl border border-rose-200 mt-2 inline-block">
              ⚠️ Terdeteksi {latestResult.violations} kali keluar dari halaman ujian.
            </div>
          )}
        </div>

        {/* Score Stats Grid */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div>
            <span className="block text-xs text-slate-400 font-bold uppercase">Skor Kamu</span>
            <span className={`text-2xl font-black ${isPassed ? 'text-emerald-600' : 'text-amber-600'}`}>
              {latestResult.score} / 100
            </span>
          </div>
          <div className="border-x border-slate-200">
            <span className="block text-xs text-slate-400 font-bold uppercase">Total Poin</span>
            <span className="text-2xl font-black text-blue-600">
              {latestResult.earnedPoints} <span className="text-xs text-slate-400 font-medium">/ {latestResult.totalPoints}</span>
            </span>
          </div>
          <div>
            <span className="block text-xs text-slate-400 font-bold uppercase">Kriteria Lulus</span>
            <span className="text-2xl font-black text-slate-700">
              {settings.passingScore}
            </span>
          </div>
        </div>

        <div className="flex justify-center space-x-3">
          <button
            onClick={resetToLanding}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all text-sm"
          >
            Kembali Ke Menu
          </button>
          <button
            onClick={() => {
              triggerNotif("Menyiapkan halaman cetak...");
              setTimeout(() => window.print(), 500);
            }}
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all text-sm no-print flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Cetak Hasil
          </button>
        </div>
      </div>

      {/* Question Breakdown Review */}
      <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 space-y-4">
        <h4 className="text-lg font-bold text-slate-800 border-b pb-2 flex items-center gap-1.5">
          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Tinjauan Pembahasan Soal
        </h4>

        <div className="space-y-4">
          {questions.map((q, index) => {
            const ansIndex = latestResult.answers[q.id];
            const isCorrect = ansIndex === q.correctIndex;
            return (
              <div key={q.id} className={`p-4 rounded-xl border-l-4 ${isCorrect ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'}`}>
                <div className="flex justify-between items-start gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-500">Soal {index + 1} ({q.subject})</span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {isCorrect ? `+${q.points} Poin` : '0 Poin / Salah'}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-800 mb-2">{q.text}</p>
                <div className="text-xs space-y-1 text-slate-600">
                  <p>
                    <span className="font-bold">Jawaban Kamu: </span>
                    {ansIndex !== undefined ? q.options[ansIndex] : <span className="text-rose-600">Tidak Dijawab</span>}
                  </p>
                  {!isCorrect && (
                    <p>
                      <span className="font-bold text-emerald-700">Jawaban Benar: </span>
                      <span className="text-emerald-800 font-medium">{q.options[q.correctIndex]}</span>
                    </p>
                  )}
                  
                  {/* Explanation Rationale */}
                  <p className="bg-white p-2 rounded border border-slate-100 mt-2 text-slate-500 leading-relaxed italic">
                    <span className="font-semibold text-slate-700">Kunci & Pembahasan:</span> {q.options[q.correctIndex]} adalah jawaban yang benar karena {q.subject === "Matematika" ? "perhitungan logisnya tepat." : "berdasarkan kesesuaian materi pelajaran."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
