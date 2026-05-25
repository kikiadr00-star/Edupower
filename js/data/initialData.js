const INITIAL_QUESTIONS = [
  {
    id: 1,
    subject: "Matematika",
    text: "Kelipatan persekutuan terkecil (KPK) dari bilangan 12 dan 18 adalah...",
    options: ["24", "36", "48", "72"],
    correctIndex: 1,
    points: 15,
    difficulty: "Sukar",
    topic: "FPB & KPK"
  },
  {
    id: 2,
    subject: "Bahasa Indonesia",
    text: "Bacalah paragraf berikut!\n\"Kelinci adalah hewan mamalia yang sangat lincah. Mereka memakan sayuran hijau seperti wortel dan kangkung. Kaki belakangnya yang panjang membantu mereka melompat dengan sangat tinggi.\"\n\nIde pokok paragraf di atas adalah...",
    options: [
      "Kelinci suka melompat tinggi", 
      "Makanan kelinci adalah wortel", 
      "Kelinci merupakan hewan mamalia lincah", 
      "Bentuk kaki belakang kelinci"
    ],
    correctIndex: 2,
    points: 10,
    difficulty: "Sedang",
    topic: "Ide Pokok Paragraf"
  },
  {
    id: 3,
    subject: "IPA",
    text: "Ketika kita menendang bola ke arah gawang, bola akan bergerak maju dengan cepat. Gaya yang kita berikan pada bola tersebut adalah gaya...",
    options: ["Gaya pegas", "Gaya otot", "Gaya gesek", "Gaya magnet"],
    correctIndex: 1,
    points: 5,
    difficulty: "Mudah",
    topic: "Gaya dan Gerak"
  },
  {
    id: 4,
    subject: "IPS",
    text: "Simbol gambar segitiga berwarna merah pada peta umum biasanya digunakan untuk menunjukkan keberadaan...",
    options: ["Gunung berapi aktif", "Ibu kota provinsi", "Danau buatan", "Bandar udara"],
    correctIndex: 0,
    points: 10,
    difficulty: "Sedang",
    topic: "Simbol Peta"
  },
  {
    id: 5,
    subject: "Matematika",
    text: "Bentuk pecahan desimal yang senilai dengan pecahan biasa $\\frac{3}{5}$ adalah...",
    options: ["0,3", "0,5", "0,6", "0,75"],
    correctIndex: 2,
    points: 15,
    difficulty: "Sukar",
    topic: "Pecahan Desimal"
  },
  {
    id: 6,
    subject: "IPA",
    text: "Proses perubahan uap air menjadi titik-titik air di awan akibat suhu udara yang dingin dalam siklus air dinamakan...",
    options: ["Evaporasi", "Kondensasi", "Presipitasi", "Transpirasi"],
    correctIndex: 1,
    points: 10,
    difficulty: "Sedang",
    topic: "Siklus Air"
  },
  {
    id: 7,
    subject: "Bahasa Indonesia",
    text: "Kalimat berikut yang merupakan kalimat imperatif (perintah) yang benar adalah...",
    options: [
      "Wah, indah sekali pemandangan di gunung ini!",
      "Ibu sedang memasak opor ayam di dapur.",
      "Tolong matikan lampu kamar itu jika tidak digunakan!",
      "Mengapa kamu tidak masuk sekolah kemarin?"
    ],
    correctIndex: 2,
    points: 5,
    difficulty: "Mudah",
    topic: "Jenis Kalimat"
  },
  {
    id: 8,
    subject: "PPKn",
    text: "Sikap yang sesuai dengan pengamalan sila ketiga Pancasila, 'Persatuan Indonesia', di lingkungan sekolah adalah...",
    options: [
      "Melaksanakan ibadah sesuai agama masing-masing",
      "Bekerja bakti membersihkan ruang kelas tanpa membeda-bedakan teman",
      "Memilih ketua kelas lewat musyawarah mufakat",
      "Menolong teman yang terjatuh karena rasa kemanusiaan"
    ],
    correctIndex: 1,
    points: 10,
    difficulty: "Sedang",
    topic: "Pengamalan Pancasila"
  }
];

const DEFAULT_SETTINGS = {
  randomizeQuestions: true,
  durationMinutes: 30,
  passingScore: 70,
  teacherPin: "123456"
};
