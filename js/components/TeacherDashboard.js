function TeacherDashboard({
  teacherTab, setTeacherTab,
  stats, settings, setSettings,
  questions, setQuestions,
  examResults, setExamResults,
  getTotalMaxPoints,
  isImporting, setIsImporting,
  isAddingQuestion, setIsAddingQuestion,
  editingQuestion, setEditingQuestion,
  importMode, setImportMode,
  pasteData, setPasteData,
  handleFileUpload, handlePasteSubmit, downloadJSONTemplate,
  handleSaveQuestion, handleDeleteQuestion,
  triggerNotif
}) {
  return (
    <div className="space-y-6">
      
      {/* Header Guru */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-800">Panel Utama Guru (CBT)</h3>
          <p className="text-sm text-slate-500">Gunakan halaman ini untuk memantau nilai, mengubah bobot nilai, serta menganalisis kesulitan soal.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 flex-wrap gap-2">
          <button
            onClick={() => {
              setIsAddingQuestion(true);
              setEditingQuestion(null);
              setIsImporting(false);
              setTeacherTab('questions');
            }}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            Buat Soal
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar space-x-2 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
        {[
          { id: 'dashboard', label: 'Ringkasan & Analisis' },
          { id: 'questions', label: 'Bank Soal & Bobot' },
          { id: 'results', label: 'Daftar Hasil Siswa' },
          { id: 'settings', label: 'Pengaturan Ujian' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setTeacherTab(tab.id)}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
              teacherTab === tab.id 
                ? 'bg-slate-100 text-slate-800 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT: 1. DASHBOARD OVERVIEW */}
      {teacherTab === 'dashboard' && (
        <div className="space-y-6">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
              <span className="text-xs text-slate-400 font-bold uppercase">Rata-Rata Kelas</span>
              <h4 className="text-3xl font-black text-slate-800 mt-1">{stats.avgScore}</h4>
              <p className="text-[10px] text-slate-500">Dari {examResults.length} siswa</p>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
              <span className="text-xs text-slate-400 font-bold uppercase">Tingkat Kelulusan</span>
              <h4 className="text-3xl font-black text-emerald-600 mt-1">{stats.passingRate}%</h4>
              <p className="text-[10px] text-slate-500">Siswa dengan nilai &ge; {settings.passingScore}</p>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
              <span className="text-xs text-slate-400 font-bold uppercase">Nilai Tertinggi</span>
              <h4 className="text-3xl font-black text-blue-600 mt-1">{stats.maxScore}</h4>
              <p className="text-[10px] text-slate-500">Skor siswa terbaik saat ini</p>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
              <span className="text-xs text-slate-400 font-bold uppercase">Total Poin Ujian</span>
              <h4 className="text-3xl font-black text-indigo-600 mt-1">{getTotalMaxPoints()}</h4>
              <p className="text-[10px] text-slate-500">Kumulatif seluruh bobot poin</p>
            </div>
          </div>

          {/* Question Difficulty & Analytical Insights */}
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Item Difficulty Analysis Table */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-800 text-base">Analisis Butir Soal & Tingkat Kemudahan</h4>
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-0.5 rounded">Otomatis Terkoreksi</span>
              </div>
              <p className="text-xs text-slate-500">
                Tabel di bawah menganalisis persentase kebenaran jawaban siswa untuk tiap soal. Soal dengan rasio di bawah **50% (Merah)** mengindikasikan bahwa materi tersebut sulit dipahami siswa.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b text-slate-400 font-bold">
                      <th className="p-3">Soal / Topik</th>
                      <th className="p-3">Kesulitan</th>
                      <th className="p-3">Bobot</th>
                      <th className="p-3 text-center">Tingkat Keberhasilan</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {stats.itemAnalysis.map((item, idx) => {
                      const isWarning = item.correctRate < 50;
                      return (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-3">
                            <div className="font-semibold text-slate-700">Soal {idx + 1}: {item.topic}</div>
                            <div className="text-[10px] text-slate-400">{item.subject}</div>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              item.difficulty === 'Sukar' ? 'bg-rose-50 text-rose-700' :
                              item.difficulty === 'Sedang' ? 'bg-amber-50 text-amber-700' :
                              'bg-emerald-50 text-emerald-700'
                            }`}>
                              {item.difficulty}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-slate-600">{item.points} Poin</td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <div className="w-12 bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${isWarning ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                  style={{ width: `${item.correctRate}%` }}
                                ></div>
                              </div>
                              <span className={`font-bold ${isWarning ? 'text-rose-600' : 'text-emerald-600'}`}>
                                {item.correctRate}%
                              </span>
                            </div>
                            <div className="text-[9px] text-slate-400">{item.correctCount} dari {item.totalAttempts} Siswa Benar</div>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                setEditingQuestion(questions.find(q => q.id === item.questionId));
                                setIsAddingQuestion(false);
                                setIsImporting(false);
                                setTeacherTab('questions');
                              }}
                              className="text-blue-600 hover:text-blue-800 font-semibold"
                            >
                              Ubah Poin
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Insight Sidebar Panel */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
              <h4 className="font-bold text-slate-800 text-base">Rekomendasi Analisis Guru</h4>
              <div className="space-y-3 text-xs leading-relaxed">
                
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 space-y-1">
                  <span className="font-bold text-amber-800">Butuh Perbaikan Kelas</span>
                  <div className="text-amber-700">
                    {stats.itemAnalysis.filter(i => i.correctRate < 50).length > 0 ? (
                      <span>Beberapa topik ujian memiliki nilai keberhasilan di bawah 50%. Direkomendasikan melakukan remedial pada materi tersebut.</span>
                    ) : (
                      <span>Luar biasa! Tingkat pemahaman siswa di seluruh materi berada di atas rata-rata kelulusan.</span>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 space-y-1">
                  <span className="font-bold text-blue-800">Fleksibilitas Analisis</span>
                  <p className="text-blue-700">
                    Sistem CBT ini mendukung pembobotan berbeda. Soal bertipe **Sukar** secara otomatis diberi poin tinggi (contoh: 15 Poin) agar Anda dapat mengukur kemampuan tingkat tinggi (HOTS) siswa dengan lebih presisi.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 space-y-1">
                  <span className="font-bold text-emerald-800">Ekspor Hasil Nilai</span>
                  <p className="text-emerald-700">
                    Anda dapat menyalin data hasil pengerjaan siswa pada tab **Daftar Hasil Siswa** untuk dimasukkan langsung ke lembar kerja Excel/E-Rapor.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB CONTENT: 2. QUESTION BANK & EDITOR */}
      {teacherTab === 'questions' && (
        <div className="space-y-6">
          
          {/* BULK IMPORT / UPLOAD SECTION */}
          {isImporting && (
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-3xl space-y-4 animate-fade-in-down">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-800 text-lg flex items-center gap-1.5">
                    <span>Impor / Upload Soal Massal</span>
                  </h4>
                  <p className="text-xs text-slate-500">Unggah file JSON atau salin-tempel kode struktur soal untuk mengimpor banyak soal sekaligus.</p>
                </div>
                <button
                  onClick={downloadJSONTemplate}
                  className="bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold py-1.5 px-3 rounded-lg flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Unduh Template Soal (.json)
                </button>
              </div>

              <div className="bg-white p-4 rounded-2xl border space-y-3">
                <div className="flex items-center space-x-6 flex-wrap gap-2 text-sm">
                  <span className="font-bold text-slate-600">Metode Penggabungan:</span>
                  <label className="inline-flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="import_mode"
                      checked={importMode === 'append'}
                      onChange={() => setImportMode('append')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs text-slate-700">Gabung dengan soal lama</span>
                  </label>
                  <label className="inline-flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="import_mode"
                      checked={importMode === 'replace'}
                      onChange={() => setImportMode('replace')}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <span className="text-xs text-slate-700 font-semibold text-rose-600">Ganti semua soal yang ada</span>
                  </label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* File Uploader */}
                <div className="bg-white p-5 rounded-2xl border border-dashed border-slate-300 hover:border-emerald-400 transition-colors flex flex-col justify-center items-center text-center space-y-3">
                  <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">Unggah File JSON</p>
                    <p className="text-xs text-slate-400">Pilih berkas template yang telah Anda edit (.json)</p>
                  </div>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                  />
                </div>

                {/* Paste Area */}
                <form onSubmit={handlePasteSubmit} className="bg-white p-5 rounded-2xl border space-y-3">
                  <p className="text-sm font-bold text-slate-700">Atau Tempel (Paste) Teks JSON</p>
                  <textarea
                    rows="4"
                    value={pasteData}
                    onChange={(e) => setPasteData(e.target.value)}
                    placeholder='[{"subject": "Bahasa...", "text": "Pertanyaan...", "options": ["A", "B", ...], "correctIndex": 0, "points": 10}]'
                    className="w-full text-xs font-mono p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50"
                  ></textarea>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsImporting(false)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-lg"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg"
                    >
                      Impor Teks Tempel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Editor Modal/Form Manual */}
          {(isAddingQuestion || editingQuestion) && (
            <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-200 space-y-4 animate-fade-in-down">
              <h4 className="font-bold text-slate-800 text-lg">
                {editingQuestion ? 'Ubah Detail & Bobot Soal' : 'Tambah Soal Baru'}
              </h4>

              <form onSubmit={handleSaveQuestion} className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mata Pelajaran</label>
                    <input
                      type="text"
                      name="subject"
                      defaultValue={editingQuestion?.subject || ""}
                      placeholder="Contoh: Matematika, IPA"
                      required
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Topik Utama</label>
                    <input
                      type="text"
                      name="topic"
                      defaultValue={editingQuestion?.topic || ""}
                      placeholder="Contoh: KPK, Ekosistem"
                      required
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Bobot Poin Soal (1 - 100)</label>
                    <input
                      type="number"
                      name="points"
                      defaultValue={editingQuestion?.points || 10}
                      min="1"
                      max="100"
                      required
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white font-bold text-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Teks Pertanyaan</label>
                  <textarea
                    name="text"
                    rows="3"
                    defaultValue={editingQuestion?.text || ""}
                    placeholder="Tuliskan pertanyaan lengkap..."
                    required
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white"
                  ></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tingkat Kesulitan</label>
                    <select
                      name="difficulty"
                      defaultValue={editingQuestion?.difficulty || "Sedang"}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white"
                    >
                      <option value="Mudah">Mudah</option>
                      <option value="Sedang">Sedang</option>
                      <option value="Sukar">Sukar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kunci Jawaban Benar</label>
                    <select
                      name="correctIndex"
                      defaultValue={editingQuestion?.correctIndex || 0}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white font-bold text-emerald-600"
                    >
                      <option value={0}>Pilihan A</option>
                      <option value={1}>Pilihan B</option>
                      <option value={2}>Pilihan C</option>
                      <option value={3}>Pilihan D</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase">Pilihan Jawaban (A, B, C, D)</label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {['A', 'B', 'C', 'D'].map((letter, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <span className="font-extrabold text-xs text-slate-400">{letter}</span>
                        <input
                          type="text"
                          name={`opt${i}`}
                          defaultValue={editingQuestion?.options?.[i] || ""}
                          placeholder={`Isi teks jawaban ${letter}...`}
                          required
                          className="flex-grow px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingQuestion(false);
                      setEditingQuestion(null);
                    }}
                    className="px-4 py-2 bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                  >
                    Batalkan
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                  >
                    Simpan Soal
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* List of Questions Table */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-800 text-base">Daftar Bank Soal & Bobot Poin Aktif</h4>
              <span className="text-xs text-slate-400">Total: {questions.length} Soal</span>
            </div>

            {questions.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm space-y-3">
                <p>Belum ada soal tersedia.</p>
                <button
                  onClick={() => setIsImporting(true)}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Klik di sini untuk upload soal massal via JSON
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {questions.map((q, idx) => (
                  <div key={q.id} className="p-4 rounded-2xl border border-slate-150 hover:border-slate-300 transition-all flex justify-between items-start gap-4 flex-wrap md:flex-nowrap">
                    <div className="space-y-2 flex-grow">
                      <div className="flex items-center space-x-2 flex-wrap gap-1">
                        <span className="text-xs font-extrabold text-blue-600">#{idx + 1}</span>
                        <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">
                          {q.subject}
                        </span>
                        <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded">
                          Topik: {q.topic}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          q.difficulty === 'Sukar' ? 'bg-rose-50 text-rose-700' :
                          q.difficulty === 'Sedang' ? 'bg-amber-50 text-amber-700' :
                          'bg-emerald-50 text-emerald-700'
                        }`}>
                          Kesulitan: {q.difficulty}
                        </span>
                        <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                          {q.points} Poin
                        </span>
                      </div>
                      
                      <p className="text-sm font-semibold text-slate-800">{q.text}</p>
                      
                      {/* List choices */}
                      <div className="grid md:grid-cols-2 gap-1 text-xs text-slate-600">
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx} className="flex items-center space-x-1.5">
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${
                              oIdx === q.correctIndex ? 'bg-emerald-100 text-emerald-800 font-extrabold' : 'bg-slate-50 text-slate-400'
                            }`}>
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className={oIdx === q.correctIndex ? 'font-bold text-slate-800' : ''}>{opt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-1 flex-shrink-0 md:self-center">
                      <button
                        onClick={() => {
                          setEditingQuestion(q);
                          setIsAddingQuestion(false);
                          setIsImporting(false);
                        }}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-blue-600"
                        title="Edit Soal"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-rose-50 text-rose-600"
                        title="Hapus Soal"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB CONTENT: 3. RESULTS HISTORY */}
      {teacherTab === 'results' && (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-slate-800 text-base">Rekap Hasil Pengerjaan Siswa</h4>
            <button
              onClick={() => {
                if (confirm("Apakah Anda ingin menghapus seluruh riwayat pengerjaan siswa untuk memulai ulang sesi baru?")) {
                  setExamResults([]);
                  triggerNotif("Riwayat ujian berhasil dibersihkan!", "warning");
                }
              }}
              className="text-xs text-rose-600 hover:text-rose-800 font-bold"
            >
              Bersihkan Riwayat
            </button>
          </div>

          {examResults.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              Belum ada siswa yang mengumpulkan jawaban. Bagikan tes ke siswa terlebih dahulu!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b text-slate-400 font-bold">
                    <th className="p-3">Nama Siswa</th>
                    <th className="p-3">Kelas & No</th>
                    <th className="p-3">Waktu Selesai</th>
                    <th className="p-3 text-center">Poin Tercapai</th>
                    <th className="p-3 text-center">Skor Akhir</th>
                    <th className="p-3 text-center">Pelanggaran</th>
                    <th className="p-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-slate-600">
                  {examResults.map((r) => {
                    const isPassed = r.score >= settings.passingScore;
                    return (
                      <tr key={r.id} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-slate-800">{r.studentName}</td>
                        <td className="p-3">Kelas {r.studentClass} / Absen {r.studentNo}</td>
                        <td className="p-3 text-slate-400">{r.submittedAt}</td>
                        <td className="p-3 text-center font-bold text-blue-600">
                          {r.earnedPoints} <span className="text-[10px] text-slate-400">/ {r.totalPoints}</span>
                        </td>
                        <td className="p-3 text-center font-extrabold text-slate-800 text-sm">{r.score}</td>
                        <td className="p-3 text-center">
                          {r.violations > 0 ? (
                            <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-1 rounded-full" title="Siswa keluar dari tab ujian">
                              {r.violations} kali
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[10px]">-</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                            isPassed ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                          }`}>
                            {isPassed ? 'Lulus' : 'Belum Lulus'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: 4. SETTINGS */}
      {teacherTab === 'settings' && (
        <div className="max-w-md bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
          <h4 className="font-bold text-slate-800 text-base">Aturan Parameter Ujian (CBT)</h4>
          
          <div className="space-y-4 text-sm">
            
            {/* Randomize Toggle */}
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="block font-semibold text-slate-700">Acak Urutan Soal</span>
                <span className="text-xs text-slate-400">Urutan soal siswa diacak secara acak tiap ujian dimulai.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.randomizeQuestions}
                  onChange={(e) => setSettings(prev => ({ ...prev, randomizeQuestions: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Duration Slider */}
            <div className="space-y-2 border-b pb-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">Durasi Ujian</span>
                <span className="text-sm font-bold text-blue-600">{settings.durationMinutes} Menit</span>
              </div>
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={settings.durationMinutes}
                onChange={(e) => setSettings(prev => ({ ...prev, durationMinutes: Number(e.target.value) }))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-2 border-b pb-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">KKM (Kriteria Ketuntasan Minimal)</span>
                <span className="text-sm font-bold text-emerald-600">{settings.passingScore} / 100</span>
              </div>
              <input
                type="range"
                min="50"
                max="90"
                step="5"
                value={settings.passingScore}
                onChange={(e) => setSettings(prev => ({ ...prev, passingScore: Number(e.target.value) }))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* PIN Settings */}
            <div className="space-y-2 border-b pb-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">Ubah PIN Keamanan Guru</span>
              </div>
              <input
                type="text"
                value={settings.teacherPin || ''}
                onChange={(e) => setSettings(prev => ({ ...prev, teacherPin: e.target.value }))}
                placeholder="Masukkan PIN baru"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-bold"
              />
              <p className="text-xs text-slate-400">Pastikan Anda mengingat PIN ini. Default: 123456</p>
            </div>

            <button
              onClick={() => {
                saveToStorage(STORAGE_KEYS.SETTINGS, settings);
                triggerNotif("Semua pengaturan baru berhasil disimpan!");
              }}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-blue-100"
            >
              Terapkan & Simpan Aturan
            </button>

            <button
              onClick={() => {
                if (confirm("Apakah Anda yakin ingin mereset semua data ke pengaturan awal? Semua soal, hasil ujian, dan pengaturan akan dikembalikan ke default.")) {
                  localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
                  localStorage.removeItem(STORAGE_KEYS.RESULTS);
                  localStorage.removeItem(STORAGE_KEYS.SETTINGS);
                  setQuestions(INITIAL_QUESTIONS);
                  setExamResults([]);
                  setSettings(DEFAULT_SETTINGS);
                  triggerNotif("Semua data berhasil direset ke pengaturan awal!", "warning");
                }
              }}
              className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold rounded-xl text-xs transition-all"
            >
              Reset Semua Data ke Awal
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
