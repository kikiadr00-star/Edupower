const STORAGE_KEYS = {
  QUESTIONS: 'cbt_kreasi_questions',
  RESULTS: 'cbt_kreasi_results',
  SETTINGS: 'cbt_kreasi_settings'
};

const loadFromStorage = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (err) {
    console.warn('Gagal memuat data dari localStorage:', err);
    return fallback;
  }
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn('Gagal menyimpan data ke localStorage:', err);
  }
};
