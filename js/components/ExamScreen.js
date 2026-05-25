function ExamScreen({ examState, setExamState, questions, studentInfo, settings, formatTime, handleSelectAnswer, triggerNotif, handleSubmitExam }) {
  const currentId = examState.activeQuestionsOrder[examState.currentQuestionIdx];
  const activeQuestion = questions.find(q => q.id === currentId);

  // Anti-Cheat: Deteksi pindah tab
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerNotif("Peringatan: Kamu terdeteksi meninggalkan halaman ujian! Pelanggaran dicatat.", "error");
        setExamState(prev => ({ ...prev, violations: (prev.violations || 0) + 1 }));
      }
    };

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "Yakin ingin keluar? Ujian sedang berlangsung!";
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      triggerNotif("Klik kanan dinonaktifkan selama ujian.", "warning");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [triggerNotif, setExamState]);

  if (!activeQuestion) return <div className="text-center p-10">Memuat soal...</div>;

  return (
    <div className="grid lg:grid-cols-4 gap-6 items-start">
      
      {/* Left Column: Question Screen (Col Span 3) */}
      <div className="lg:col-span-3 bg-white p-6 md:p-8 rounded-3xl shadow-md border border-slate-100 space-y-6">
        
        {/* Exam Sub-Header Info */}
        <div className="flex justify-between items-center border-b pb-4 flex-wrap gap-2">
          <div className="space-y-0.5">
            <span className="text-xs text-indigo-600 font-bold uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded">
              {activeQuestion.subject} - {activeQuestion.topic}
            </span>
            <h3 className="text-lg font-bold text-slate-800">Soal Nomor {examState.currentQuestionIdx + 1} dari {questions.length}</h3>
          </div>

          {/* Badges */}
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              activeQuestion.difficulty === 'Sukar' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
              activeQuestion.difficulty === 'Sedang' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
              'bg-emerald-50 text-emerald-700 border border-emerald-100'
            }`}>
              Tingkat: {activeQuestion.difficulty}
            </span>
            
            {/* POINT BADGE */}
            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
              <span>{activeQuestion.points} Poin</span>
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-blue-500 h-full transition-all duration-300"
            style={{ width: `${((examState.currentQuestionIdx + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question Text */}
        <div className="text-lg text-slate-800 font-medium whitespace-pre-line leading-relaxed">
          {activeQuestion.text}
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {activeQuestion.options.map((option, idx) => {
            const isSelected = examState.studentAnswers[activeQuestion.id] === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectAnswer(activeQuestion.id, idx)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start space-x-3 font-medium ${
                  isSelected 
                    ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-sm' 
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700 hover:border-slate-300'
                }`}
              >
                {/* Option Letter Indicator */}
                <span className={`w-6 h-6 flex-shrink-0 rounded-full text-xs font-extrabold flex items-center justify-center ${
                  isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="pt-0.5">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center border-t pt-6">
          <button
            disabled={examState.currentQuestionIdx === 0}
            onClick={() => setExamState(prev => ({ ...prev, currentQuestionIdx: prev.currentQuestionIdx - 1 }))}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 text-slate-700 font-bold transition-all flex items-center gap-1 text-sm"
          >
            {/* Arrow Left */}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Sebelumnya
          </button>

          <div className="flex items-center space-x-2">
            {/* Hint Button */}
            <button
              onClick={() => triggerNotif(`Petunjuk: ${activeQuestion.hint || "Pikirkan teori dasar dari materi ini."}`, "warning")}
              className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 transition-all font-semibold text-xs flex items-center gap-1"
            >
              Bantuan Petunjuk
            </button>
          </div>

          {examState.currentQuestionIdx < questions.length - 1 ? (
            <button
              onClick={() => setExamState(prev => ({ ...prev, currentQuestionIdx: prev.currentQuestionIdx + 1 }))}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all flex items-center gap-1 text-sm"
            >
              Selanjutnya
              {/* Arrow Right */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleSubmitExam}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold transition-all text-sm shadow-md shadow-emerald-100 flex items-center gap-1"
            >
              {/* Finish Icon */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Kumpulkan Jawaban
            </button>
          )}
        </div>
      </div>

      {/* Right Column: Timer & Grid Nav (Col Span 1) */}
      <div className="space-y-6">
        
        {/* Timer Box */}
        <div className="bg-white p-5 rounded-3xl shadow-md border border-slate-100 text-center space-y-2">
          <h4 className="text-xs text-slate-400 font-bold uppercase tracking-widest">Sisa Waktu</h4>
          <div className={`text-3xl font-mono font-extrabold ${examState.timeRemaining < 300 ? 'text-rose-600 animate-pulse' : 'text-slate-800'}`}>
            {formatTime(examState.timeRemaining)}
          </div>
          <div className="text-xs font-semibold text-slate-500">
            Siswa: {studentInfo.name} ({studentInfo.class})
          </div>
        </div>

        {/* Quick Navigation Numbers */}
        <div className="bg-white p-5 rounded-3xl shadow-md border border-slate-100 space-y-4">
          <h4 className="text-xs text-slate-500 font-extrabold uppercase tracking-wider text-center border-b pb-2">Navigasi Soal</h4>
          <div className="grid grid-cols-4 gap-2">
            {examState.activeQuestionsOrder.map((qId, index) => {
              const isAnswered = examState.studentAnswers[qId] !== undefined;
              const isActive = examState.currentQuestionIdx === index;
              return (
                <button
                  key={index}
                  onClick={() => setExamState(prev => ({ ...prev, currentQuestionIdx: index }))}
                  className={`h-10 text-xs font-bold rounded-lg flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white ring-2 ring-blue-300 scale-105 shadow-md'
                      : isAnswered
                      ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-400'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between text-[10px] font-bold text-slate-500 border-t pt-3">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-emerald-100 border border-emerald-400"></span> Diisi
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-blue-600"></span> Aktif
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-slate-100 border"></span> Kosong
            </span>
          </div>
        </div>

        {/* Force Submit Option */}
        <button
          onClick={handleSubmitExam}
          className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-2xl text-xs font-bold transition-all"
        >
          Selesai Lebih Cepat
        </button>
      </div>

    </div>
  );
}
