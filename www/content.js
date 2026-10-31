/* =====================================================================
   Tangga — konten draf (bahasa Indonesia)
   ---------------------------------------------------------------------
   Struktur soal (Q):
     t  = teks soal            o = 5 pilihan (A–E)       k = indeks jawaban benar (0–4)
     b  = pembahasan           d = tingkat (1 mudah, 2 sedang, 3 sulit)
     h  = petunjuk (opsional)  p = bacaan/teks pendukung (opsional)
     x  = { indeksPilihanSalah: 'idAnakTanggaPrasyarat' } → dipakai untuk
          diagnosis “anak tangga mana yang goyah”.
   Struktur pelajaran (L) = 6 langkah Metode Tangga:
     hook → jelas (analogi/langkah/cerita/singkat) → contoh → rumpang → latihan → uji
   ===================================================================== */

const SUBTES = [
  { id: 'pu',  kode: 'PU',  nama: 'Penalaran Umum',               komponen: 'TPS',      soal: 30, menit: 30,   hue: 222 },
  { id: 'ppu', kode: 'PPU', nama: 'Pengetahuan & Pemahaman Umum', komponen: 'TPS',      soal: 20, menit: 15,   hue: 178 },
  { id: 'pbm', kode: 'PBM', nama: 'Pemahaman Bacaan & Menulis',   komponen: 'TPS',      soal: 20, menit: 25,   hue: 278 },
  { id: 'pk',  kode: 'PK',  nama: 'Pengetahuan Kuantitatif',      komponen: 'TPS',      soal: 20, menit: 20,   hue: 22 },
  { id: 'lbi', kode: 'LBI', nama: 'Literasi Bahasa Indonesia',    komponen: 'Literasi', soal: 30, menit: 42.5, hue: 140 },
  { id: 'lbe', kode: 'LBE', nama: 'Literasi Bahasa Inggris',      komponen: 'Literasi', soal: 20, menit: 20,   hue: 346 },
  { id: 'pm',  kode: 'PM',  nama: 'Penalaran Matematika',         komponen: 'Literasi', soal: 20, menit: 42.5, hue: 44 },
];

/* Satu “tangga” per subtes. Urutan = dari anak tangga paling bawah ke puncak. */
const TANGGA = {
  pu:  { judul: 'Logika: dari pernyataan ke silogisme', atoms: ['pu1', 'pu2', 'pu3', 'pu4', 'pu5', 'pu6'] },
  ppu: { judul: 'Makna kata & ide pokok',               atoms: ['ppu1', 'ppu2', 'ppu3', 'ppu4', 'ppu5'] },
  pbm: { judul: 'Kata baku & kalimat efektif',          atoms: ['pbm1', 'pbm2', 'pbm3', 'pbm4'] },
  pk:  { judul: 'Pecahan, desimal & persen',            atoms: ['pk1', 'pk2', 'pk3', 'pk4', 'pk5', 'pk6', 'pk7', 'pk8'] },
  lbi: { judul: 'Membaca teks panjang',                 atoms: ['lbi1', 'lbi2', 'lbi3', 'lbi4', 'lbi5'] },
  lbe: { judul: 'Reading in English',                   atoms: ['lbe1', 'lbe2', 'lbe3', 'lbe4', 'lbe5'] },
  pm:  { judul: 'Data, peluang & model',                atoms: ['pm1', 'pm2', 'pm3', 'pm4', 'pm5'] },
};

const ATOM = {};
function A(id, s, judul, ringkas, pra, L) { ATOM[id] = { id, s, judul, ringkas, pra, L: L || null }; }

/* ===================== PK — Pecahan, desimal & persen ===================== */

A('pk1', 'pk', 'Apa itu pecahan', 'Pecahan = berapa bagian dari keseluruhan yang dibagi sama besar.', [], {
  hook: 'Hampir semua soal persen, rasio, dan peluang di PK dan PM berdiri di atas satu ide: ==pecahan==.',
  jelas: {
    analogi: 'Bayangkan satu loyang martabak manis dipotong 8 sama besar. Kamu makan 3 potong. Bagian yang kamu makan = **3/8**.\n\nAngka bawah (**penyebut**) = jumlah potongan seluruhnya. Angka atas (**pembilang**) = potongan yang diambil. Pecahan cuma cara menulis “berapa bagian dari keseluruhan”.',
    langkah: [
      'Tentukan keseluruhannya, lalu dibagi menjadi berapa bagian sama besar → itu **penyebut**.',
      'Hitung berapa bagian yang diambil → itu **pembilang**.',
      'Tulis sebagai pembilang/penyebut.',
      'Sederhanakan: bagi pembilang dan penyebut dengan FPB-nya. Contoh 6/8 → dibagi 2 → 3/4.',
    ],
    cerita: 'Di kelasmu ada 30 siswa, 12 di antaranya ikut bimbel. Bagian siswa yang ikut bimbel = 12/30.\n\nKalau pembilang dan penyebut sama-sama dibagi 6, hasilnya **2/5**. Artinya: dari setiap 5 siswa, 2 ikut bimbel.',
    singkat: 'a/b = a bagian dari b bagian sama besar. **Pecahan senilai**: kalikan atau bagi atas dan bawah dengan angka yang sama (6/8 = 3/4).',
  },
  contoh: {
    soal: 'Dari 40 soal tryout, Dika menjawab benar 28. Berapa bagian soal yang dijawab benar, dalam bentuk paling sederhana?',
    langkah: ['Keseluruhan = 40 soal → penyebut 40.', 'Yang benar = 28 → pembilang 28.', '28/40: FPB(28, 40) = 4.', '28 ÷ 4 = 7 dan 40 ÷ 4 = 10 → **7/10**.'],
    jawab: '7/10',
  },
  rumpang: {
    soal: 'Dari 36 siswa, 24 lolos seleksi. Berapa bagian yang lolos, dalam bentuk paling sederhana?',
    langkah: ['Pecahan awal: 24/36.', 'FPB(24, 36) = ___.', '24 ÷ 12 = 2 dan 36 ÷ 12 = 3 → 2/3.'],
    kosong: '12', pilihan: ['6', '12', '4', '18'],
  },
  latihan: [
    { t: 'Pecahan yang senilai dengan 3/4 adalah ...', o: ['4/3', '6/8', '3/8', '9/16', '7/8'], k: 1, d: 1, b: 'Kalikan atas dan bawah dengan angka yang sama: (3 × 2)/(4 × 2) = 6/8.' },
    { t: 'Bentuk paling sederhana dari 18/24 adalah ...', o: ['9/12', '3/4', '2/3', '6/8', '4/5'], k: 1, d: 1, b: 'FPB(18, 24) = 6 → 18 ÷ 6 = 3 dan 24 ÷ 6 = 4 → 3/4. 9/12 dan 6/8 nilainya sama, tetapi belum paling sederhana.' },
    { t: 'Seutas tali 1 meter dipotong menjadi 5 bagian sama panjang. Tiga potong dipakai. Bagian tali yang dipakai adalah ...', o: ['3/5', '2/5', '5/3', '3/8', '1/3'], k: 0, d: 2, b: 'Keseluruhan dibagi 5 (penyebut), diambil 3 (pembilang) → 3/5.' },
    { t: 'Pecahan mana yang paling besar?', o: ['2/3', '3/5', '5/8', '7/12', 'Semuanya sama'], k: 0, d: 2, b: 'Samakan penyebut menjadi 120: 2/3 = 80/120, 3/5 = 72/120, 5/8 = 75/120, 7/12 = 70/120. Terbesar: 2/3.', h: 'Samakan penyebutnya dulu, atau ubah ke desimal.' },
  ],
  uji: [
    { t: 'Bentuk paling sederhana dari 45/60 adalah ...', o: ['9/12', '3/4', '15/20', '5/6', '2/3'], k: 1, d: 2, b: 'FPB(45, 60) = 15 → 45 ÷ 15 = 3, 60 ÷ 15 = 4 → 3/4.' },
    { t: 'Di sebuah kelas berisi 32 siswa, 3/8 di antaranya memilih PK sebagai subtes tersulit. Berapa siswa yang memilih PK?', o: ['8', '10', '12', '14', '24'], k: 2, d: 2, b: '32 ÷ 8 = 4 (satu bagian), lalu 3 × 4 = 12 siswa.' },
    { t: 'Pecahan yang terletak di antara 1/3 dan 1/2 adalah ...', o: ['1/4', '2/5', '3/5', '2/3', '1/5'], k: 1, d: 3, b: '1/3 ≈ 0,333 dan 1/2 = 0,5. Hanya 2/5 = 0,4 yang berada di antaranya.' },
  ],
});

A('pk2', 'pk', 'Pecahan ↔ desimal', 'Mengubah pecahan ke desimal dan sebaliknya dengan cepat.', ['pk1'], {
  hook: 'Di UTBK kamu sering harus cepat mengubah 3/4 menjadi 0,75. Bentuk desimal membuat ==membandingkan dan mengalikan== jauh lebih cepat.',
  jelas: {
    analogi: 'Pecahan dan desimal itu seperti uang Rp5.000 dalam bentuk satu lembar atau lima koin seribuan: nilainya sama, bentuknya beda. 1/2 dan 0,5 adalah “uang yang sama”.\n\nGaris pecahan artinya **dibagi**: 3/4 = 3 ÷ 4 = 0,75.',
    langkah: [
      'Pecahan → desimal: bagi pembilang dengan penyebut (3/4 = 3 ÷ 4 = 0,75).',
      'Trik cepat: ubah penyebut menjadi 10, 100, atau 1000 (3/4 = 75/100 = 0,75).',
      'Desimal → pecahan: tulis di atas 10, 100, atau 1000 sesuai banyak angka di belakang koma (0,35 = 35/100).',
      'Sederhanakan hasilnya (35/100 = 7/20).',
    ],
    cerita: 'Kamu menjawab benar 0,8 dari soal latihan. Berapa pecahannya? 0,8 = 8/10 = **4/5**. Jadi dari setiap 5 soal, 4 kamu jawab benar.',
    singkat: 'a/b = a ÷ b. Hafalkan: 1/2 = 0,5 · 1/4 = 0,25 · 3/4 = 0,75 · 1/5 = 0,2 · 1/8 = 0,125 · 1/3 ≈ 0,333.',
  },
  contoh: {
    soal: 'Ubah 7/20 menjadi desimal.',
    langkah: ['Cari pengali agar penyebut menjadi 100: 20 × 5 = 100.', 'Pembilang ikut dikali: 7 × 5 = 35.', '7/20 = 35/100 = **0,35**.'],
    jawab: '0,35',
  },
  rumpang: {
    soal: 'Ubah 0,625 menjadi pecahan paling sederhana.',
    langkah: ['Tiga angka di belakang koma → 625/1000.', 'FPB(625, 1000) = 125.', '625 ÷ 125 = 5 dan 1000 ÷ 125 = 8 → ___.'],
    kosong: '5/8', pilihan: ['5/8', '6/25', '25/40', '5/16'],
  },
  latihan: [
    { t: '3/5 dalam bentuk desimal adalah ...', o: ['0,35', '0,6', '0,53', '0,65', '1,67'], k: 1, d: 1, b: '3 ÷ 5 = 0,6. Atau: 3/5 = 6/10 = 0,6.', x: { 4: 'pk1' } },
    { t: '0,45 dalam bentuk pecahan paling sederhana adalah ...', o: ['45/10', '9/20', '4/5', '9/2', '45/1000'], k: 1, d: 1, b: '0,45 = 45/100. FPB(45, 100) = 5 → 9/20.', x: { 0: 'pk1', 4: 'pk1' } },
    { t: 'Urutan dari yang terkecil: 0,7; 3/4; 0,72; 2/3 adalah ...', o: ['2/3; 0,7; 0,72; 3/4', '0,7; 0,72; 2/3; 3/4', '2/3; 0,72; 0,7; 3/4', '3/4; 0,72; 0,7; 2/3', '0,7; 2/3; 3/4; 0,72'], k: 0, d: 2, b: 'Ubah semua ke desimal: 2/3 ≈ 0,667; 0,7; 0,72; 3/4 = 0,75.' },
    { t: '1/8 dalam bentuk desimal adalah ...', o: ['0,8', '0,18', '0,125', '0,0125', '1,8'], k: 2, d: 2, b: '1 ÷ 8 = 0,125. Ingat: 1/4 = 0,25, jadi 1/8 = setengahnya = 0,125.' },
  ],
  uji: [
    { t: 'Nilai dari 3/8 + 0,25 adalah ...', o: ['0,625', '0,55', '0,4', '0,675', '0,325'], k: 0, d: 2, b: '3/8 = 0,375. Lalu 0,375 + 0,25 = 0,625.' },
    { t: 'Pecahan yang sama dengan 1,25 adalah ...', o: ['5/4', '4/5', '1/25', '125/10', '12/5'], k: 0, d: 2, b: '1,25 = 125/100 = 5/4.' },
    { t: 'Jika x = 0,4 dan y = 3/5, nilai x/y adalah ...', o: ['2/3', '3/2', '0,24', '1/5', '6/25'], k: 0, d: 3, b: 'y = 3/5 = 0,6. x/y = 0,4/0,6 = 4/6 = 2/3. (0,24 adalah x × y, bukan x/y.)' },
  ],
});

A('pk3', 'pk', 'Arti persen (per seratus)', 'Persen = per seratus; mengubah persen ↔ pecahan ↔ desimal.', ['pk2'], {
  hook: 'Diskon, kenaikan harga, data survei — ==persen== ada di hampir setiap paket soal Penalaran Matematika.',
  jelas: {
    analogi: 'Persen artinya **per seratus**. Bayangkan aula yang selalu punya 100 kursi. 35% berarti 35 dari 100 kursi terisi.\n\nMengubah persen ke pecahan sama saja dengan menaruh angkanya di atas 100.',
    langkah: [
      'Persen → pecahan: tulis di atas 100 (35% = 35/100 = 7/20).',
      'Persen → desimal: geser koma 2 langkah ke kiri (35% = 0,35).',
      'Desimal → persen: geser koma 2 langkah ke kanan (0,08 = 8%).',
      'Pecahan → persen: ubah penyebut jadi 100 atau kalikan 100% (3/4 × 100% = 75%).',
    ],
    cerita: 'Survei OSIS: 3 dari 4 siswa ingin kantin buka lebih pagi. 3/4 = 75/100 = **75%**. Jadi kalau aula berisi 100 siswa, kira-kira 75 orang setuju.',
    singkat: 'p% = p/100. Ke desimal: ÷ 100. Dari desimal: × 100. Contoh: 12,5% = 0,125 = 1/8.',
  },
  contoh: {
    soal: 'Nyatakan 7/25 dalam persen.',
    langkah: ['Ubah penyebut menjadi 100: 25 × 4 = 100.', 'Pembilang ikut dikali 4: 7 × 4 = 28.', '7/25 = 28/100 = **28%**.'],
    jawab: '28%',
  },
  rumpang: {
    soal: 'Nyatakan 0,045 dalam persen.',
    langkah: ['Desimal → persen: geser koma 2 langkah ke kanan.', '0,045 → ___', 'Jadi 0,045 = 4,5%.'],
    kosong: '4,5%', pilihan: ['4,5%', '45%', '0,45%', '450%'],
  },
  latihan: [
    { t: '40% dalam bentuk pecahan paling sederhana adalah ...', o: ['4/10', '2/5', '40/10', '1/4', '4/5'], k: 1, d: 1, b: '40% = 40/100 = 2/5.', x: { 0: 'pk1' } },
    { t: '0,3 sama dengan ...', o: ['3%', '30%', '0,3%', '300%', '33%'], k: 1, d: 1, b: 'Desimal → persen: geser koma 2 langkah ke kanan. 0,3 = 0,30 → 30%.', x: { 0: 'pk2', 2: 'pk2' } },
    { t: '1/8 sama dengan ... %', o: ['8%', '12,5%', '18%', '0,125%', '80%'], k: 1, d: 2, b: '1/8 = 0,125 → × 100% = 12,5%.', x: { 0: 'pk1', 2: 'pk2' } },
    { t: 'Mana yang nilainya paling besar?', o: ['0,45', '9/20', '46%', '4,5/10', '0,449'], k: 2, d: 2, b: 'Ubah semua ke desimal: 0,45; 9/20 = 0,45; 46% = 0,46; 4,5/10 = 0,45; 0,449. Terbesar: 46%.' },
  ],
  uji: [
    { t: '3/5 sama dengan ...', o: ['35%', '53%', '60%', '0,6%', '6%'], k: 2, d: 2, b: '3/5 = 60/100 = 60%.', x: { 0: 'pk1', 1: 'pk1' } },
    { t: 'Dari 25 peserta tryout, 6 orang mendapat skor di atas 700. Persentase peserta dengan skor di atas 700 adalah ...', o: ['6%', '24%', '25%', '19%', '31%'], k: 1, d: 2, b: '6/25 = 24/100 = 24%.' },
    { t: 'Nilai dari 0,2 + 15% + 1/20 adalah ...', o: ['40%', '35%', '36%', '0,4%', '4%'], k: 0, d: 3, b: 'Samakan bentuk: 0,2 + 0,15 + 0,05 = 0,4 = 40%.', x: { 3: 'pk2', 4: 'pk2' } },
  ],
});

A('pk4', 'pk', 'Persen dari suatu bilangan', '“p% dari N” artinya p/100 × N; trik 10%.', ['pk3'], {
  hook: '“Berapa 15% dari 240?” — pertanyaan ini muncul di soal ==diskon, pajak, bunga,== dan data statistik.',
  jelas: {
    analogi: 'Kata **“dari”** dalam persen artinya **dikali**. 15% dari 240 = 15/100 × 240.\n\nBayangkan 240 dibagi menjadi 100 kotak kecil (masing-masing 2,4), lalu ambil 15 kotak: 15 × 2,4 = 36.',
    langkah: [
      'Ubah persen ke desimal: 15% = 0,15.',
      '“Dari” = kali: 0,15 × 240.',
      'Hitung: 0,15 × 240 = 36.',
      'Trik cepat: cari 10% dulu (geser koma satu langkah), lalu rakit. 10% dari 240 = 24, 5% = 12, jadi 15% = 36.',
    ],
    cerita: 'Uang jajanmu Rp50.000 seminggu dan kamu ingin menabung 20%. 10% dari 50.000 = 5.000, jadi 20% = **10.000**. Kamu menabung Rp10.000 per minggu.',
    singkat: 'p% dari N = p/100 × N. Trik 10%: geser koma satu langkah ke kiri, lalu kalikan atau jumlahkan.',
  },
  contoh: {
    soal: 'Berapa 35% dari 80?',
    langkah: ['10% dari 80 = 8.', '30% = 3 × 8 = 24.', '5% = setengah dari 10% = 4.', '35% = 24 + 4 = **28**.'],
    jawab: '28',
  },
  rumpang: {
    soal: 'Berapa 12% dari 250?',
    langkah: ['10% dari 250 = 25.', '1% dari 250 = 2,5, jadi 2% = 5.', '12% = 25 + 5 = ___.'],
    kosong: '30', pilihan: ['30', '27,5', '35', '300'],
  },
  latihan: [
    { t: '25% dari 160 adalah ...', o: ['25', '40', '64', '16', '135'], k: 1, d: 1, b: '25% = 1/4. 160 ÷ 4 = 40.', x: { 3: 'pk3' } },
    { t: '10% dari 3.500 adalah ...', o: ['35', '350', '3.150', '3,5', '3.510'], k: 1, d: 1, b: '10% = geser koma satu langkah ke kiri: 3.500 → 350.', x: { 0: 'pk3', 3: 'pk3' } },
    { t: 'Sebuah buku latihan UTBK seharga Rp120.000 diberi diskon 15%. Besar diskonnya adalah ...', o: ['Rp12.000', 'Rp15.000', 'Rp18.000', 'Rp102.000', 'Rp1.800'], k: 2, d: 2, b: '10% = 12.000, 5% = 6.000 → 15% = 18.000. (Rp102.000 adalah harga setelah diskon, bukan besar diskonnya.)', x: { 4: 'pk3' } },
    { t: 'Jika 20% dari x adalah 30, nilai x adalah ...', o: ['6', '60', '150', '600', '36'], k: 2, d: 2, b: '0,2 × x = 30 → x = 30 ÷ 0,2 = 150. Cek: 20% dari 150 = 30.', h: 'Tulis sebagai persamaan: 0,2 × x = 30.' },
  ],
  uji: [
    { t: '45% dari 60 adalah ...', o: ['24', '27', '30', '33', '2,7'], k: 1, d: 2, b: '10% = 6 → 40% = 24, 5% = 3 → 45% = 27.', x: { 4: 'pk3' } },
    { t: 'Di sekolah dengan 480 siswa, 35% adalah siswa kelas XII. Banyak siswa kelas XII adalah ...', o: ['148', '158', '168', '172', '312'], k: 2, d: 2, b: '0,35 × 480 = 168. (312 adalah 65% — siswa yang bukan kelas XII.)' },
    { t: '30% dari 40% dari 500 adalah ...', o: ['60', '70', '150', '200', '350'], k: 0, d: 3, b: 'Kerjakan dari dalam: 40% dari 500 = 200. Lalu 30% dari 200 = 60.' },
  ],
});

A('pk5', 'pk', 'Kenaikan & penurunan persen', 'Patokan perubahan persen selalu nilai awal.', ['pk4'], {
  hook: 'Harga naik 10%, peserta turun 25% — UTBK suka menguji apakah kamu tahu ==“persen dari apa”==.',
  jelas: {
    analogi: 'Bayangkan tinggi tanaman 50 cm. Naik 20% artinya tumbuh 20% dari tinggi **awal**: 0,2 × 50 = 10 cm, jadi 60 cm.\n\nPatokannya selalu nilai awal, seperti mengukur lari dari garis start, bukan dari garis finis.',
    langkah: [
      'Hitung besar perubahan: p% × nilai awal.',
      'Naik → nilai awal + perubahan. Turun → nilai awal − perubahan.',
      'Mencari persen perubahan: (baru − lama) ÷ lama × 100%.',
      'Hati-hati: penyebutnya selalu nilai **lama**, bukan nilai baru.',
    ],
    cerita: 'Skor tryout-mu naik dari 500 ke 560. Kenaikannya 60. Persennya 60 ÷ 500 = 0,12 = **12%**. Kalau kamu membagi dengan 560 (nilai baru), hasilnya salah.',
    singkat: 'Baru = lama ± p% × lama. Persen perubahan = (baru − lama) ÷ lama × 100%.',
  },
  contoh: {
    soal: 'Peserta UTBK di sebuah kota turun dari 8.000 menjadi 6.800. Berapa persen penurunannya?',
    langkah: ['Selisih: 8.000 − 6.800 = 1.200.', 'Bagi dengan nilai lama: 1.200 ÷ 8.000 = 0,15.', '0,15 = **15%**. Jadi turun 15%.'],
    jawab: '15%',
  },
  rumpang: {
    soal: 'Harga sepatu Rp400.000 naik 15%. Berapa harga barunya?',
    langkah: ['Kenaikan: 15% × 400.000 = 60.000.', 'Harga baru: 400.000 + 60.000 = ___.'],
    kosong: '460.000', pilihan: ['460.000', '415.000', '340.000', '600.000'],
  },
  latihan: [
    { t: 'Harga Rp200.000 turun 10%. Harga barunya adalah ...', o: ['Rp180.000', 'Rp190.000', 'Rp220.000', 'Rp20.000', 'Rp199.990'], k: 0, d: 1, b: '10% dari 200.000 = 20.000. Turun → 200.000 − 20.000 = 180.000.', x: { 3: 'pk4', 4: 'pk3' } },
    { t: 'Jumlah siswa naik dari 250 menjadi 300. Persentase kenaikannya adalah ...', o: ['16,7%', '20%', '50%', '25%', '30%'], k: 1, d: 2, b: 'Kenaikan 50 dibagi nilai LAMA 250 = 0,2 = 20%. (16,7% muncul kalau keliru membagi dengan 300.)' },
    { t: 'Nilai rata-rata kelas turun dari 80 menjadi 72. Persentase penurunannya adalah ...', o: ['8%', '10%', '11,1%', '12%', '72%'], k: 1, d: 2, b: 'Turun 8 dari nilai lama 80 → 8/80 = 10%.' },
    { t: 'Setelah naik 25%, harga sebuah tas menjadi Rp150.000. Harga awalnya adalah ...', o: ['Rp112.500', 'Rp120.000', 'Rp125.000', 'Rp187.500', 'Rp130.000'], k: 1, d: 3, b: 'Harga awal × 1,25 = 150.000 → harga awal = 150.000 ÷ 1,25 = 120.000. (112.500 salah karena 25% dihitung dari harga baru.)', h: 'Patokan 25% adalah harga AWAL yang belum diketahui.' },
  ],
  uji: [
    { t: 'Sebuah aplikasi punya 40.000 pengguna dan bertambah 35%. Jumlah pengguna sekarang adalah ...', o: ['14.000', '40.350', '54.000', '52.000', '75.000'], k: 2, d: 2, b: '35% dari 40.000 = 14.000. Total: 40.000 + 14.000 = 54.000.', x: { 0: 'pk4', 1: 'pk3' } },
    { t: 'Harga paket data naik dari Rp25.000 menjadi Rp27.000. Kenaikannya adalah ...', o: ['2%', '7,4%', '8%', '9%', '12,5%'], k: 2, d: 2, b: 'Naik 2.000 dari nilai lama 25.000 → 2.000/25.000 = 0,08 = 8%.' },
    { t: 'Setelah diskon 20%, harga sebuah kalkulator Rp96.000. Harga sebelum diskon adalah ...', o: ['Rp115.200', 'Rp116.000', 'Rp120.000', 'Rp76.800', 'Rp125.000'], k: 2, d: 3, b: 'Harga awal × 0,8 = 96.000 → harga awal = 120.000. (115.200 salah karena 20% dihitung dari harga setelah diskon.)' },
  ],
});

A('pk6', 'pk', 'Bentuk pengali (×1,2 dan ×0,8)', 'Naik p% = kali (1 + p%); turun p% = kali (1 − p%).', ['pk5'], {
  hook: 'Pengali adalah jalan pintas: ==satu perkalian== menggantikan dua langkah. Di UTBK yang dikejar waktu, ini menghemat puluhan detik.',
  jelas: {
    analogi: 'Bayangkan mesin fotokopi dengan tombol zoom. Naik 20% = zoom 120% → kalikan **1,2**. Turun 20% = zoom 80% → kalikan **0,8**.\n\nKamu tidak perlu menghitung “berapa tambahannya” lalu menjumlahkan; cukup tekan tombol zoom.',
    langkah: [
      'Naik p% → pengali (1 + p/100). Naik 20% → × 1,2.',
      'Turun p% → pengali (1 − p/100). Turun 20% → × 0,8.',
      'Nilai baru = nilai awal × pengali.',
      'Nilai awal = nilai baru ÷ pengali.',
    ],
    cerita: 'Gaji kakakmu Rp4.000.000 naik 5%. Daripada menghitung 5% lalu menambahkan, langsung saja 4.000.000 × 1,05 = **Rp4.200.000**.',
    singkat: 'Naik p%: × (1 + p%). Turun p%: × (1 − p%). Mundur ke nilai awal: bagi dengan pengalinya.',
  },
  contoh: {
    soal: 'Harga Rp250.000 turun 12%. Berapa harga barunya?',
    langkah: ['Turun 12% → pengali 1 − 0,12 = 0,88.', '250.000 × 0,88 = **220.000**.'],
    jawab: 'Rp220.000',
  },
  rumpang: {
    soal: 'Setelah naik 30%, sebuah nilai menjadi 390. Berapa nilai awalnya?',
    langkah: ['Naik 30% → pengali ___.', 'Nilai awal = 390 ÷ 1,3 = 300.'],
    kosong: '1,3', pilihan: ['1,3', '0,7', '0,3', '1,03'],
  },
  latihan: [
    { t: 'Pengali untuk kenaikan 7% adalah ...', o: ['0,07', '0,93', '1,07', '1,7', '7'], k: 2, d: 1, b: 'Naik 7% → 1 + 0,07 = 1,07.', x: { 3: 'pk3', 4: 'pk3' } },
    { t: 'Pengali untuk penurunan 35% adalah ...', o: ['0,35', '0,65', '1,35', '0,035', '65'], k: 1, d: 1, b: 'Turun 35% → 1 − 0,35 = 0,65.', x: { 3: 'pk3', 4: 'pk3' } },
    { t: 'Sebuah nilai dikali 0,85. Artinya nilai itu ...', o: ['naik 85%', 'turun 85%', 'naik 15%', 'turun 15%', 'turun 0,85%'], k: 3, d: 2, b: '0,85 = 1 − 0,15 → turun 15%.' },
    { t: 'Harga Rp80.000 naik 12,5%. Harga barunya adalah ...', o: ['Rp81.000', 'Rp88.000', 'Rp90.000', 'Rp92.500', 'Rp100.000'], k: 2, d: 2, b: '80.000 × 1,125 = 90.000. (12,5% = 1/8; 80.000 ÷ 8 = 10.000.)' },
  ],
  uji: [
    { t: 'Jika harga baru = harga lama × 0,92, maka harga ...', o: ['naik 8%', 'turun 8%', 'turun 92%', 'naik 92%', 'turun 0,08%'], k: 1, d: 2, b: '0,92 = 1 − 0,08 → turun 8%.' },
    { t: 'Setelah turun 25%, jumlah peserta menjadi 1.800. Jumlah peserta mula-mula adalah ...', o: ['1.350', '2.250', '2.400', '2.500', '7.200'], k: 2, d: 2, b: 'Awal × 0,75 = 1.800 → awal = 1.800 ÷ 0,75 = 2.400. (2.250 salah: itu 1.800 × 1,25.)', x: { 1: 'pk5' } },
    { t: 'Populasi sebuah kota tumbuh 4% per tahun. Pengali untuk pertumbuhan selama 2 tahun adalah ...', o: ['1,08', '1,0816', '1,8', '0,9216', '2,08'], k: 1, d: 3, b: 'Tiap tahun × 1,04, jadi dua tahun: 1,04 × 1,04 = 1,0816. (1,08 muncul kalau persennya dijumlahkan.)' },
  ],
});

A('pk7', 'pk', 'Perubahan beruntun: dikali, bukan dijumlah', 'Gabungkan perubahan berturut-turut dengan mengalikan pengalinya.', ['pk6'], {
  hook: 'Naik 20% lalu turun 20% — apakah kembali ke harga awal? Jebakan klasik ini ==menjatuhkan banyak peserta== UTBK.',
  jelas: {
    analogi: 'Pakai mesin fotokopi tadi: perbesar 120%, lalu hasil fotokopinya diperkecil 80%. Ukuran akhir = 1,2 × 0,8 = **0,96** dari aslinya.\n\nKenapa tidak kembali 100%? Karena pengecilan 20% dihitung dari gambar yang **sudah** diperbesar, jadi potongannya lebih besar daripada tambahannya.',
    langkah: [
      'Ubah setiap perubahan menjadi pengali.',
      'Kalikan semua pengali (urutannya tidak penting).',
      'Bandingkan hasilnya dengan 1: di atas 1 = naik, di bawah 1 = turun.',
      'Contoh: naik 20% lalu turun 20% → 1,2 × 0,8 = 0,96 → turun 4%.',
    ],
    cerita: 'Sebuah toko menaikkan harga hoodie 25% menjelang akhir tahun, lalu memberi “diskon 20%”. Pengali total: 1,25 × 0,8 = **1,00**. Harganya kembali persis seperti semula — diskonnya cuma membatalkan kenaikan tadi.',
    singkat: 'Perubahan beruntun = kalikan pengalinya, jangan jumlahkan persennya. Total perubahan = (1 + a)(1 + b) − 1.',
  },
  contoh: {
    soal: 'Harga emas naik 10%, lalu naik lagi 10%. Berapa total kenaikannya?',
    langkah: ['Pengali: 1,1 dan 1,1.', '1,1 × 1,1 = 1,21.', '1,21 − 1 = 0,21 → naik **21%** (bukan 20%).'],
    jawab: '21%',
  },
  rumpang: {
    soal: 'Harga turun 30% lalu naik 30%. Berapa perubahan totalnya?',
    langkah: ['Pengali: 0,7 dan 1,3.', '0,7 × 1,3 = ___.', '0,91 − 1 = −0,09 → turun 9%.'],
    kosong: '0,91', pilihan: ['0,91', '1,00', '0,6', '1,09'],
  },
  latihan: [
    { t: 'Sebuah nilai naik 50% lalu turun 50%. Dibanding nilai awal, hasil akhirnya ...', o: ['sama', 'naik 25%', 'turun 25%', 'turun 50%', 'naik 0,5%'], k: 2, d: 1, b: '1,5 × 0,5 = 0,75 → turun 25%.', x: { 4: 'pk3' } },
    { t: 'Harga Rp100.000 didiskon 20%, lalu didiskon lagi 10%. Harga akhirnya adalah ...', o: ['Rp70.000', 'Rp72.000', 'Rp73.000', 'Rp80.000', 'Rp90.000'], k: 1, d: 2, b: '100.000 × 0,8 × 0,9 = 72.000. (Rp70.000 muncul kalau diskonnya dijumlahkan menjadi 30%.)' },
    { t: 'Jumlah pembaca naik 10% di bulan pertama dan 20% di bulan kedua. Total kenaikannya adalah ...', o: ['30%', '31%', '32%', '22%', '2%'], k: 2, d: 2, b: '1,1 × 1,2 = 1,32 → naik 32%.' },
    { t: 'Sebuah harga naik x%, lalu turun x%, dan hasil akhirnya 4% lebih rendah dari harga awal. Nilai x adalah ...', o: ['2', '4', '16', '20', '40'], k: 3, d: 3, b: '(1 + x)(1 − x) = 1 − x² = 0,96 → x² = 0,04 → x = 0,2 = 20%.', h: 'Tulis pengalinya: (1 + x)(1 − x).' },
  ],
  uji: [
    { t: 'Naik 40% lalu turun 40%. Total perubahannya adalah ...', o: ['tidak berubah', 'turun 16%', 'turun 4%', 'naik 16%', 'turun 40%'], k: 1, d: 2, b: '1,4 × 0,6 = 0,84 → turun 16%.' },
    { t: 'Diskon 50% lalu diskon 20% (beruntun) setara dengan diskon tunggal sebesar ...', o: ['70%', '65%', '60%', '40%', '30%'], k: 2, d: 2, b: '0,5 × 0,8 = 0,4 → yang dibayar 40%, jadi diskon totalnya 60%.', x: { 3: 'pk6' } },
    { t: 'Harga turun 10% tiga kali berturut-turut. Harga akhir adalah ... dari harga awal.', o: ['70%', '72,9%', '73,9%', '90%', '97%'], k: 1, d: 3, b: '0,9 × 0,9 × 0,9 = 0,729 = 72,9%.' },
  ],
});

A('pk8', 'pk', 'Soal cerita persen ala UTBK', 'Menerjemahkan cerita menjadi nilai awal × pengali.', ['pk7'], {
  hook: 'Soal UTBK jarang berkata “hitung 20% dari 50”. Angkanya disembunyikan di dalam ==cerita, tabel, atau grafik==. Ini anak tangga puncak: menerjemahkan cerita menjadi pengali.',
  jelas: {
    analogi: 'Soal cerita itu seperti resep dalam bahasa asing. Bahannya sama (nilai awal, persen, pengali); kamu hanya perlu menerjemahkannya.\n\nLingkari nilai **awal**, garis bawahi setiap **perubahan**, lalu ubah satu per satu menjadi pengali.',
    langkah: [
      'Temukan nilai awal (sering tersembunyi: “mula-mula”, “sebelum”, “tahun lalu”).',
      'Ubah setiap perubahan menjadi pengali (naik → 1 + p, turun → 1 − p).',
      'Tentukan yang ditanya: nilai akhir, nilai awal, atau persen perubahan.',
      'Hitung, lalu cek: apakah jawabanmu masuk akal? (Naik → hasil lebih besar.)',
    ],
    cerita: 'Tahun lalu sebuah bimbel punya 1.200 siswa. Tahun ini 25% siswa lama berhenti, tetapi ada 400 siswa baru. Jumlah sekarang: 1.200 × 0,75 + 400 = 900 + 400 = **1.300**.',
    singkat: 'Cerita → nilai awal × pengali-pengali (± tambahan tetap). Yang ditanya menentukan langkah terakhir.',
  },
  contoh: {
    soal: 'Sebuah toko daring menaikkan harga 20%, lalu memberi kupon diskon 15% dari harga baru. Jika harga awal Rp200.000, berapa yang dibayar pembeli?',
    langkah: ['Pengali naik 20% = 1,2; pengali diskon 15% = 0,85.', 'Pengali total: 1,2 × 0,85 = 1,02.', 'Dibayar: 200.000 × 1,02 = **Rp204.000**.'],
    jawab: 'Rp204.000',
  },
  rumpang: {
    soal: 'Penjualan bulan Januari 500 unit. Februari naik 20%, lalu Maret turun 10% dari Februari. Berapa penjualan Maret?',
    langkah: ['Februari: 500 × 1,2 = 600.', 'Maret: 600 × ___ = 540.'],
    kosong: '0,9', pilihan: ['0,9', '0,1', '1,1', '0,8'],
  },
  latihan: [
    { t: 'Harga tiket konser Rp500.000. Pembeli awal mendapat potongan 10%, lalu pembayaran dengan dompet digital mendapat potongan tambahan 5% dari harga setelah potongan pertama. Harga yang dibayar adalah ...', o: ['Rp425.000', 'Rp427.500', 'Rp430.000', 'Rp450.000', 'Rp475.000'], k: 1, d: 2, b: '500.000 × 0,9 × 0,95 = 427.500. (Rp425.000 muncul kalau potongannya dijumlahkan menjadi 15%.)', x: { 0: 'pk7' } },
    { t: 'Skor Rani di tryout pertama 500. Di tryout kedua naik 10%, dan di tryout ketiga naik 10% lagi dari tryout kedua. Skor tryout ketiga adalah ...', o: ['600', '605', '610', '550', '620'], k: 1, d: 2, b: '500 × 1,1 × 1,1 = 605.', x: { 0: 'pk7' } },
    { t: 'Sebuah sekolah memiliki 600 siswa, 40% di antaranya kelas XII. Tahun depan, jumlah siswa kelas XII naik 25%, sedangkan jumlah siswa kelas lain tetap. Persentase siswa kelas XII tahun depan menjadi sekitar ...', o: ['45,5%', '50%', '65%', '41,7%', '48%'], k: 0, d: 3, b: 'Kelas XII: 240 → 300. Kelas lain tetap 360. Total baru 660. 300/660 ≈ 45,5%. (50% salah karena total siswa juga berubah.)' },
    { t: 'Sebuah ponsel dijual seharga Rp3.000.000 dan penjual mendapat untung 20% dari harga beli. Harga beli ponsel itu adalah ...', o: ['Rp2.400.000', 'Rp2.500.000', 'Rp2.600.000', 'Rp3.600.000', 'Rp2.880.000'], k: 1, d: 3, b: 'Harga beli × 1,2 = 3.000.000 → harga beli = 2.500.000. (Rp2.400.000 salah karena 20% dihitung dari harga jual.)', x: { 0: 'pk5', 3: 'pk6' } },
  ],
  uji: [
    { t: 'Harga beras naik 5% bulan ini dan diperkirakan naik 5% lagi bulan depan. Total kenaikan dalam dua bulan adalah ...', o: ['10%', '10,25%', '10,5%', '5,25%', '11%'], k: 1, d: 2, b: '1,05 × 1,05 = 1,1025 → naik 10,25%.', x: { 0: 'pk7' } },
    { t: 'Pengunjung perpustakaan hari Senin 240 orang. Selasa turun 25%, lalu Rabu naik 50% dari Selasa. Pengunjung hari Rabu adalah ...', o: ['240', '270', '300', '360', '180'], k: 1, d: 3, b: '240 × 0,75 = 180 (Selasa). 180 × 1,5 = 270 (Rabu).', x: { 2: 'pk7' } },
    { t: 'Harga sebuah barang setelah diskon 20% lalu dikenai pajak 10% (dari harga setelah diskon) adalah Rp176.000. Harga sebelum diskon dan pajak adalah ...', o: ['Rp160.000', 'Rp193.600', 'Rp200.000', 'Rp220.000', 'Rp195.556'], k: 2, d: 3, b: 'x × 0,8 × 1,1 = 0,88x = 176.000 → x = 200.000.', x: { 4: 'pk7', 1: 'pk6' } },
  ],
});

/* ===================== PU — Logika ===================== */

A('pu1', 'pu', 'Pernyataan & nilai kebenaran', 'Pernyataan = kalimat yang bisa bernilai benar atau salah.', [], {
  hook: 'Penalaran Umum menilai apakah sebuah kesimpulan mengikuti dari pernyataan. Langkah pertamanya: tahu ==mana yang termasuk pernyataan==.',
  jelas: {
    analogi: 'Pernyataan itu seperti sakelar lampu: hanya bisa **nyala** (benar) atau **mati** (salah), tidak bisa setengah.\n\n“Bandung terletak di Jawa Barat” adalah sakelar. “Tolong tutup pintu!” bukan sakelar — kalimat perintah tidak bisa benar atau salah.',
    langkah: [
      'Tanyakan: bisakah kalimat ini dinilai benar ATAU salah?',
      'Jika bisa (meski kamu belum tahu jawabannya) → pernyataan.',
      'Kalimat tanya, perintah, harapan, atau seruan → bukan pernyataan.',
      'Kalimat terbuka (memuat variabel, mis. “x + 2 = 5”) belum pernyataan sampai x diketahui.',
    ],
    cerita: 'Di grup kelas: “UTBK diadakan tahun depan” (pernyataan — bisa dicek), “Semangat ya!” (bukan — seruan), “Siapa yang mau belajar bareng?” (bukan — pertanyaan).',
    singkat: 'Pernyataan = kalimat yang bernilai benar atau salah, tidak keduanya. Perintah, pertanyaan, dan seruan bukan pernyataan.',
  },
  contoh: {
    soal: 'Manakah yang merupakan pernyataan: (1) 7 adalah bilangan prima, (2) Kerjakan soal nomor 5!, (3) x + 3 = 10?',
    langkah: ['(1) bisa dinilai → benar → pernyataan.', '(2) perintah → bukan pernyataan.', '(3) nilainya bergantung pada x → kalimat terbuka, bukan pernyataan.', 'Jawaban: **hanya (1)**.'],
    jawab: 'Hanya (1)',
  },
  rumpang: {
    soal: '“Semua bilangan genap habis dibagi 2.” Apakah ini pernyataan?',
    langkah: ['Bisakah dinilai benar/salah? Ya.', 'Nilainya: ___.', 'Jadi ini pernyataan yang bernilai benar.'],
    kosong: 'benar', pilihan: ['benar', 'salah', 'tidak bisa dinilai', 'tergantung'],
  },
  latihan: [
    { t: 'Manakah yang merupakan pernyataan?', o: ['Ayo belajar logika!', 'Apakah kamu siap UTBK?', '5 lebih besar dari 8.', 'Semoga lolos SNBT.', 'Tutup bukumu.'], k: 2, d: 1, b: '“5 lebih besar dari 8” bernilai salah, tetapi tetap pernyataan. Pernyataan tidak harus benar; yang penting bisa dinilai.' },
    { t: 'Kalimat “2x − 1 = 7” adalah ...', o: ['pernyataan benar', 'pernyataan salah', 'kalimat terbuka', 'kalimat perintah', 'kalimat tanya'], k: 2, d: 1, b: 'Nilainya bergantung pada x, jadi kalimat terbuka.' },
    { t: 'Manakah yang BUKAN pernyataan?', o: ['Matahari terbit dari timur.', 'Bandung terletak di Jawa Barat.', 'Betapa indahnya pemandangan ini!', '3 adalah bilangan genap.', 'Semua kucing adalah hewan.'], k: 2, d: 2, b: 'Kalimat seruan tidak bisa dinilai benar atau salah.' },
    { t: 'Pernyataan “15 habis dibagi 4” bernilai ...', o: ['benar', 'salah', 'kadang benar', 'bukan pernyataan', 'kalimat terbuka'], k: 1, d: 2, b: '15 ÷ 4 = 3 sisa 3, jadi pernyataan itu salah.' },
  ],
  uji: [
    { t: 'Pernyataan yang bernilai SALAH adalah ...', o: ['Jumlah sudut segitiga 180°.', '2 adalah bilangan prima.', 'Sebuah persegi memiliki 5 sisi.', 'Pergilah sekarang!', 'x + 1 = 4'], k: 2, d: 2, b: 'Persegi memiliki 4 sisi, jadi pernyataan itu salah. “Pergilah sekarang!” dan “x + 1 = 4” bukan pernyataan.' },
    { t: 'Kalimat “Dia adalah juara kelas” belum bisa dinilai karena ...', o: ['termasuk kalimat perintah, bukan pernyataan', '“dia” belum jelas siapa (kalimat terbuka)', 'termasuk kalimat tanya yang tidak bernilai', 'selalu benar karena juara pasti ada', 'selalu salah karena tidak ada buktinya'], k: 1, d: 2, b: '“Dia” berperan seperti variabel; nilainya baru bisa ditentukan setelah jelas siapa yang dimaksud.' },
    { t: 'Jika p: “4 > 2” dan q: “3 adalah bilangan genap”, maka ...', o: ['p benar, q benar', 'p benar, q salah', 'p salah, q benar', 'p salah, q salah', 'keduanya bukan pernyataan'], k: 1, d: 3, b: '4 > 2 benar; 3 bukan bilangan genap, jadi q salah.' },
  ],
});

A('pu2', 'pu', 'Negasi (ingkaran)', 'Membalik nilai kebenaran; aturan “dan/atau” dan “semua/ada”.', ['pu1'], {
  hook: 'Hampir setiap paket soal logika UTBK memuat soal ==“ingkaran dari pernyataan ... adalah”==. Kuncinya ada di sini.',
  jelas: {
    analogi: 'Negasi itu tombol pembalik sakelar: kalau pernyataan menyala (benar), negasinya mati (salah), dan sebaliknya.\n\nNegasi “Hari ini hujan” adalah “Hari ini **tidak** hujan”, bukan “Hari ini cerah” — cerah hanyalah salah satu kemungkinan dari “tidak hujan”.',
    langkah: [
      'Negasi sederhana: tambahkan “tidak”/“bukan” atau “tidak benar bahwa”.',
      'Negasi “p dan q” → “tidak p **atau** tidak q”.',
      'Negasi “p atau q” → “tidak p **dan** tidak q”.',
      'Negasi “semua A adalah B” → “ada A yang bukan B”. Negasi “ada A yang B” → “semua A bukan B”.',
    ],
    cerita: 'Guru berkata, “Semua siswa sudah mengumpulkan tugas.” Untuk membantahnya, kamu tidak perlu membuktikan semua siswa belum mengumpulkan. Cukup tunjukkan **satu** siswa yang belum: “Ada siswa yang belum mengumpulkan tugas.”',
    singkat: '~(p ∧ q) = ~p ∨ ~q. ~(p ∨ q) = ~p ∧ ~q. ~(semua) = ada yang tidak. ~(ada) = semua tidak.',
  },
  contoh: {
    soal: 'Negasi dari “Rina rajin dan pintar” adalah ...',
    langkah: ['Bentuknya “p dan q” (p: Rina rajin, q: Rina pintar).', 'Negasi “dan” → “atau”, setiap bagian dinegasikan.', 'Hasil: **“Rina tidak rajin atau tidak pintar.”**'],
    jawab: 'Rina tidak rajin atau tidak pintar.',
  },
  rumpang: {
    soal: 'Negasi dari “Semua peserta membawa kartu ujian” adalah ...',
    langkah: ['Negasi “semua” → “___”.', 'Bagian “membawa” dinegasikan → “tidak membawa”.', 'Hasil: “Ada peserta yang tidak membawa kartu ujian.”'],
    kosong: 'ada ... yang tidak', pilihan: ['ada ... yang tidak', 'semua ... tidak', 'tidak ada', 'beberapa ... membawa'],
  },
  latihan: [
    { t: 'Negasi dari “Hari ini hujan” adalah ...', o: ['Hari ini cerah.', 'Hari ini tidak hujan.', 'Kemarin hujan.', 'Hari ini mendung.', 'Besok hujan.'], k: 1, d: 1, b: 'Negasi cukup membalik nilainya: “tidak hujan”. “Cerah” bukan negasi karena terlalu spesifik.', x: { 0: 'pu1' } },
    { t: 'Negasi dari “Budi belajar atau bermain” adalah ...', o: ['Budi tidak belajar atau tidak bermain.', 'Budi tidak belajar dan tidak bermain.', 'Budi belajar dan bermain.', 'Budi tidak belajar dan bermain.', 'Budi belajar atau tidak bermain.'], k: 1, d: 2, b: '~(p ∨ q) = ~p ∧ ~q: “atau” berubah menjadi “dan”, keduanya dinegasikan.' },
    { t: 'Negasi dari “Semua siswa hadir” adalah ...', o: ['Semua siswa tidak hadir.', 'Tidak ada siswa yang hadir.', 'Ada siswa yang tidak hadir.', 'Beberapa siswa hadir.', 'Semua siswa hadir.'], k: 2, d: 2, b: 'Cukup satu siswa absen untuk membantah “semua hadir”: “Ada siswa yang tidak hadir.”' },
    { t: 'Negasi dari “Ada siswa yang tidak suka matematika” adalah ...', o: ['Ada siswa yang suka matematika.', 'Semua siswa suka matematika.', 'Semua siswa tidak suka matematika.', 'Tidak ada siswa yang suka matematika.', 'Beberapa siswa suka matematika.'], k: 1, d: 3, b: '~(ada yang tidak suka) = semua suka.', h: 'Negasi “ada” menjadi “semua”, lalu balik bagian “tidak suka”.' },
  ],
  uji: [
    { t: 'Negasi dari “Ani pergi ke perpustakaan dan Dodi pergi ke kantin” adalah ...', o: ['Ani tidak pergi ke perpustakaan dan Dodi tidak pergi ke kantin.', 'Ani tidak pergi ke perpustakaan atau Dodi tidak pergi ke kantin.', 'Ani pergi ke perpustakaan atau Dodi pergi ke kantin.', 'Ani tidak pergi ke perpustakaan dan Dodi pergi ke kantin.', 'Ani pergi ke kantin dan Dodi ke perpustakaan.'], k: 1, d: 2, b: '~(p ∧ q) = ~p ∨ ~q.' },
    { t: 'Negasi dari “Beberapa buah tidak manis” adalah ...', o: ['Beberapa buah manis.', 'Semua buah manis.', 'Semua buah tidak manis.', 'Tidak ada buah.', 'Ada buah yang manis.'], k: 1, d: 2, b: '~(ada yang tidak manis) = semua manis.' },
    { t: 'Pernyataan yang setara dengan “Tidak benar bahwa Sinta lulus dan Tono lulus” adalah ...', o: ['Sinta tidak lulus dan Tono tidak lulus.', 'Sinta tidak lulus atau Tono tidak lulus.', 'Sinta lulus atau Tono lulus.', 'Sinta lulus dan Tono tidak lulus.', 'Tono lulus.'], k: 1, d: 3, b: '“Tidak benar bahwa p dan q” = ~(p ∧ q) = ~p ∨ ~q.' },
  ],
});

A('pu3', 'pu', 'Implikasi: jika–maka', 'p ⇒ q hanya salah jika p benar dan q salah.', ['pu2'], {
  hook: 'Separuh soal penalaran deduktif UTBK dibangun dari kalimat ==“jika ..., maka ...”==. Kamu perlu tahu kapan “janji” itu dilanggar.',
  jelas: {
    analogi: 'Implikasi itu seperti janji: “Jika kamu juara kelas, maka Ayah membelikan sepeda.”\n\nJanji hanya **dilanggar** dalam satu situasi: kamu juara, tapi sepeda tidak dibelikan. Kalau kamu tidak juara, Ayah boleh membelikan atau tidak — janjinya tetap tidak dilanggar.',
    langkah: [
      'Bentuk: jika p (syarat), maka q (akibat).',
      'p ⇒ q hanya SALAH ketika p benar dan q salah.',
      'Jika p salah, implikasi selalu benar (janji tidak dilanggar).',
      'Negasi “jika p maka q” adalah “p **dan** tidak q”.',
    ],
    cerita: 'Pengumuman: “Jika peserta terlambat, maka peserta tidak boleh masuk ruang ujian.” Satu-satunya pelanggaran: ada peserta terlambat yang dibiarkan masuk. Peserta tepat waktu yang masuk tidak melanggar apa pun.',
    singkat: 'p ⇒ q salah hanya jika p benar dan q salah. ~(p ⇒ q) = p ∧ ~q.',
  },
  contoh: {
    soal: 'Negasi dari “Jika hujan, maka jalanan licin” adalah ...',
    langkah: ['Bentuk p ⇒ q (p: hujan, q: jalanan licin).', 'Negasi implikasi: p dan tidak q.', 'Hasil: **“Hujan dan jalanan tidak licin.”**'],
    jawab: 'Hujan dan jalanan tidak licin.',
  },
  rumpang: {
    soal: 'Jika p benar dan q salah, maka “p ⇒ q” bernilai ...',
    langkah: ['Ini satu-satunya kasus janji dilanggar.', 'Nilai p ⇒ q = ___.'],
    kosong: 'salah', pilihan: ['salah', 'benar', 'tidak dapat ditentukan', 'benar jika q benar'],
  },
  latihan: [
    { t: 'Pernyataan “Jika 2 + 2 = 5, maka bulan terbuat dari keju” bernilai ...', o: ['benar', 'salah', 'tidak dapat ditentukan', 'bukan pernyataan', 'kadang benar'], k: 0, d: 1, b: 'Syaratnya (2 + 2 = 5) salah, jadi implikasi otomatis benar. Logika menilai bentuk, bukan isi yang aneh.' },
    { t: 'Negasi dari “Jika saya belajar, maka saya lulus” adalah ...', o: ['Jika saya tidak belajar, maka saya tidak lulus.', 'Saya belajar dan saya tidak lulus.', 'Saya tidak belajar atau saya lulus.', 'Jika saya lulus, maka saya belajar.', 'Saya tidak belajar dan saya lulus.'], k: 1, d: 2, b: '~(p ⇒ q) = p ∧ ~q.', x: { 0: 'pu2' } },
    { t: '“Jika p maka q” bernilai salah ketika ...', o: ['p benar, q benar', 'p benar, q salah', 'p salah, q benar', 'p salah, q salah', 'selalu benar'], k: 1, d: 2, b: 'Satu-satunya kasus janji dilanggar: syarat terpenuhi, akibat tidak terjadi.' },
    { t: 'Pengumuman: “Jika nilai ujian di atas 80, maka siswa mendapat sertifikat.” Situasi yang MELANGGAR pengumuman adalah ...', o: ['Nilai 70, tidak dapat sertifikat.', 'Nilai 70, dapat sertifikat.', 'Nilai 85, dapat sertifikat.', 'Nilai 90, tidak dapat sertifikat.', 'Nilai 60, dapat sertifikat.'], k: 3, d: 2, b: 'Pelanggaran hanya jika syarat terpenuhi (nilai > 80) tetapi akibatnya tidak terjadi.' },
  ],
  uji: [
    { t: 'Negasi dari “Jika harga naik, maka permintaan turun” adalah ...', o: ['Harga naik dan permintaan tidak turun.', 'Jika harga tidak naik, maka permintaan tidak turun.', 'Harga tidak naik dan permintaan turun.', 'Harga naik atau permintaan turun.', 'Jika permintaan turun, maka harga naik.'], k: 0, d: 2, b: '~(p ⇒ q) = p ∧ ~q.', x: { 1: 'pu2' } },
    { t: 'Jika p salah dan q salah, maka nilai “p ⇒ q” adalah ...', o: ['benar', 'salah', 'tidak tentu', 'sama dengan q', 'sama dengan p'], k: 0, d: 2, b: 'Syarat tidak terpenuhi → janji tidak dilanggar → benar.' },
    { t: 'Aturan “Jika ia siswa kelas XII, maka ia mengikuti UTBK” DILANGGAR oleh ...', o: ['siswa kelas XI yang mengikuti UTBK', 'siswa kelas XII yang mengikuti UTBK', 'siswa kelas XII yang tidak mengikuti UTBK', 'siswa kelas X yang tidak mengikuti UTBK', 'alumni yang mengikuti UTBK'], k: 2, d: 3, b: 'Hanya kasus p benar (kelas XII) dan q salah (tidak ikut UTBK) yang melanggar.' },
  ],
});

A('pu4', 'pu', 'Kontraposisi & kesetaraan', 'p ⇒ q setara dengan ~q ⇒ ~p dan ~p ∨ q.', ['pu3'], {
  hook: 'Soal ==“pernyataan yang setara dengan ...”== hampir selalu menguji kontraposisi. Sekali paham, soal ini jadi poin gratis.',
  jelas: {
    analogi: 'Kembali ke janji Ayah: “Jika juara, maka dapat sepeda.” Kalau kamu melihat temanmu **tidak** punya sepeda baru, kamu yakin dia **tidak** juara. Itulah kontraposisi: balik urutannya dan negasikan keduanya.\n\nTapi kalau temanmu punya sepeda baru, belum tentu dia juara — sepedanya bisa hadiah ulang tahun.',
    langkah: [
      'Implikasi: p ⇒ q.',
      'Kontraposisi (SETARA): ~q ⇒ ~p.',
      'Konvers q ⇒ p dan invers ~p ⇒ ~q TIDAK setara dengan p ⇒ q.',
      'Bentuk setara lain: p ⇒ q ≡ ~p ∨ q (“tidak p atau q”).',
    ],
    cerita: 'Aturan sekolah: “Jika siswa sakit, maka ia boleh pulang.” Setara: “Jika siswa tidak boleh pulang, maka ia tidak sakit.” Juga setara: “Siswa tidak sakit atau ia boleh pulang.”',
    singkat: 'p ⇒ q ≡ ~q ⇒ ~p ≡ ~p ∨ q. Konvers dan invers tidak setara.',
  },
  contoh: {
    soal: 'Kontraposisi dari “Jika saya lapar, maka saya makan” adalah ...',
    langkah: ['p: saya lapar, q: saya makan.', 'Kontraposisi: ~q ⇒ ~p.', 'Hasil: **“Jika saya tidak makan, maka saya tidak lapar.”**'],
    jawab: 'Jika saya tidak makan, maka saya tidak lapar.',
  },
  rumpang: {
    soal: 'Pernyataan “Jika rajin, maka sukses” setara dengan “Tidak rajin ___ sukses”.',
    langkah: ['p ⇒ q ≡ ~p ∨ q.', '~p = tidak rajin, q = sukses.', 'Kata hubungnya: ___.'],
    kosong: 'atau', pilihan: ['atau', 'dan', 'maka', 'jika'],
  },
  latihan: [
    { t: 'Kontraposisi dari “Jika hujan, maka jalan basah” adalah ...', o: ['Jika jalan basah, maka hujan.', 'Jika tidak hujan, maka jalan tidak basah.', 'Jika jalan tidak basah, maka tidak hujan.', 'Hujan dan jalan tidak basah.', 'Tidak hujan atau jalan tidak basah.'], k: 2, d: 1, b: '~q ⇒ ~p. Pilihan A adalah konvers, B adalah invers — keduanya tidak setara.' },
    { t: 'Pernyataan yang setara dengan “Jika ia lulus, maka ia senang” adalah ...', o: ['Ia tidak lulus atau ia senang.', 'Ia lulus dan ia tidak senang.', 'Jika ia senang, maka ia lulus.', 'Jika ia tidak lulus, maka ia tidak senang.', 'Ia lulus atau ia tidak senang.'], k: 0, d: 2, b: 'p ⇒ q ≡ ~p ∨ q. Pilihan B adalah negasinya.', x: { 1: 'pu3' } },
    { t: 'Konvers dari “Jika x = 2, maka x² = 4” adalah ...', o: ['Jika x² = 4, maka x = 2.', 'Jika x ≠ 2, maka x² ≠ 4.', 'Jika x² ≠ 4, maka x ≠ 2.', 'x = 2 dan x² ≠ 4.', 'x ≠ 2 atau x² = 4.'], k: 0, d: 2, b: 'Konvers = tukar urutan: q ⇒ p. Konvers tidak setara — x² = 4 bisa juga karena x = −2.' },
    { t: 'Pernyataan “Hanya siswa yang terdaftar yang boleh ikut ujian” setara dengan ...', o: ['Jika siswa terdaftar, maka ia boleh ikut ujian.', 'Jika siswa tidak terdaftar, maka ia tidak boleh ikut ujian.', 'Semua siswa boleh ikut ujian.', 'Jika siswa tidak ikut ujian, maka ia tidak terdaftar.', 'Siswa terdaftar dan ikut ujian.'], k: 1, d: 3, b: '“Hanya A yang B” = “Jika B, maka A” = “Jika ikut ujian, maka terdaftar”. Kontraposisinya: “Jika tidak terdaftar, maka tidak boleh ikut ujian.”', h: '“Hanya A yang B” sama dengan “Jika B, maka A”.' },
  ],
  uji: [
    { t: 'Kontraposisi dari “Jika Dani juara, maka ia mendapat beasiswa” adalah ...', o: ['Jika Dani tidak mendapat beasiswa, maka ia tidak juara.', 'Jika Dani mendapat beasiswa, maka ia juara.', 'Jika Dani tidak juara, maka ia tidak mendapat beasiswa.', 'Dani juara dan tidak mendapat beasiswa.', 'Dani juara atau mendapat beasiswa.'], k: 0, d: 2, b: '~q ⇒ ~p.' },
    { t: 'Pernyataan yang setara dengan “Tidak belajar atau lulus” adalah ...', o: ['Jika belajar, maka lulus.', 'Jika lulus, maka belajar.', 'Jika tidak belajar, maka tidak lulus.', 'Belajar dan tidak lulus.', 'Jika tidak lulus, maka belajar.'], k: 0, d: 2, b: '~p ∨ q ≡ p ⇒ q: “Jika belajar, maka lulus.”' },
    { t: 'Manakah pasangan yang SETARA?', o: ['“Jika p maka q” dan “Jika q maka p”', '“Jika p maka q” dan “Jika ~p maka ~q”', '“Jika p maka q” dan “Jika ~q maka ~p”', '“p dan q” dan “p atau q”', '“~(p dan q)” dan “~p dan ~q”'], k: 2, d: 3, b: 'Implikasi setara dengan kontraposisinya. Pilihan E salah: ~(p ∧ q) = ~p ∨ ~q.', x: { 4: 'pu2' } },
  ],
});

A('pu5', 'pu', 'Modus ponens, tollens & silogisme', 'Tiga pola kesimpulan sah dari pernyataan jika–maka.', ['pu4'], {
  hook: 'Soal ==“kesimpulan yang sah dari premis berikut”== adalah menu wajib Penalaran Umum. Tiga pola ini hampir selalu muncul.',
  jelas: {
    analogi: 'Bayangkan deretan domino. Premis “jika p maka q” berarti domino p menjatuhkan domino q.\n\nKalau p jatuh, q pasti jatuh (**modus ponens**). Kalau q masih berdiri, p pasti tidak jatuh (**modus tollens**). Tapi kalau q jatuh, belum tentu karena p — bisa saja tersenggol hal lain.',
    langkah: [
      'Modus ponens: p ⇒ q dan p → simpulkan q.',
      'Modus tollens: p ⇒ q dan ~q → simpulkan ~p.',
      'Silogisme: p ⇒ q dan q ⇒ r → simpulkan p ⇒ r.',
      'BUKAN kesimpulan sah: dari q menyimpulkan p, atau dari ~p menyimpulkan ~q.',
    ],
    cerita: 'Premis 1: Jika listrik padam, maka wifi mati. Premis 2: Wifi tidak mati. Kesimpulan: listrik tidak padam (modus tollens).\n\nTapi kalau wifi mati, belum tentu listrik padam — bisa saja kuota habis!',
    singkat: 'MP: p ⇒ q, p ∴ q. MT: p ⇒ q, ~q ∴ ~p. Silogisme: p ⇒ q, q ⇒ r ∴ p ⇒ r.',
  },
  contoh: {
    soal: 'P1: Jika Rina rajin, maka nilainya bagus. P2: Jika nilainya bagus, maka ia lolos PTN. Kesimpulan?',
    langkah: ['Bentuk: p ⇒ q dan q ⇒ r.', 'Pola silogisme: p ⇒ r.', 'Kesimpulan: **Jika Rina rajin, maka ia lolos PTN.**'],
    jawab: 'Jika Rina rajin, maka ia lolos PTN.',
  },
  rumpang: {
    soal: 'P1: Jika ujian sulit, maka banyak yang remedial. P2: Tidak banyak yang remedial. Kesimpulan?',
    langkah: ['Bentuk: p ⇒ q dan ~q.', 'Pola: modus tollens → ~p.', 'Kesimpulan: ___.'],
    kosong: 'Ujian tidak sulit', pilihan: ['Ujian tidak sulit', 'Ujian sulit', 'Banyak yang remedial', 'Tidak dapat disimpulkan'],
  },
  latihan: [
    { t: 'P1: Jika hari Minggu, maka sekolah libur. P2: Hari ini hari Minggu. Kesimpulan yang sah adalah ...', o: ['Hari ini bukan hari Minggu.', 'Sekolah libur.', 'Sekolah tidak libur.', 'Besok sekolah libur.', 'Tidak dapat disimpulkan.'], k: 1, d: 1, b: 'Modus ponens: p ⇒ q, p ∴ q.' },
    { t: 'P1: Jika lampu menyala, maka ada arus listrik. P2: Tidak ada arus listrik. Kesimpulan yang sah adalah ...', o: ['Lampu menyala.', 'Lampu tidak menyala.', 'Ada arus listrik.', 'Lampu rusak.', 'Tidak dapat disimpulkan.'], k: 1, d: 2, b: 'Modus tollens: p ⇒ q, ~q ∴ ~p.', x: { 4: 'pu4' } },
    { t: 'P1: Jika saya rajin, maka saya pintar. P2: Saya pintar. Kesimpulan yang sah adalah ...', o: ['Saya rajin.', 'Saya tidak rajin.', 'Saya tidak pintar.', 'Jika saya pintar, maka saya rajin.', 'Tidak dapat ditarik kesimpulan yang pasti.'], k: 4, d: 2, b: 'Dari q tidak bisa disimpulkan p (kesalahan “menegaskan akibat”). Kepintaran bisa datang dari hal lain.', x: { 0: 'pu4', 3: 'pu4' } },
    { t: 'P1: Jika x > 5, maka x > 3. P2: Jika x > 3, maka x² > 9. Kesimpulan yang sah adalah ...', o: ['Jika x > 5, maka x² > 9.', 'Jika x² > 9, maka x > 5.', 'Jika x ≤ 5, maka x² ≤ 9.', 'x > 5 dan x² ≤ 9.', 'Jika x > 3, maka x > 5.'], k: 0, d: 3, b: 'Silogisme: p ⇒ q, q ⇒ r ∴ p ⇒ r.' },
  ],
  uji: [
    { t: 'P1: Jika Andi lolos SNBT, maka ia kuliah di Bandung. P2: Andi tidak kuliah di Bandung. Kesimpulan yang sah adalah ...', o: ['Andi lolos SNBT.', 'Andi tidak lolos SNBT.', 'Andi kuliah di Jakarta.', 'Andi tidak kuliah.', 'Tidak dapat disimpulkan.'], k: 1, d: 2, b: 'Modus tollens.' },
    { t: 'P1: Jika hujan deras, maka sungai meluap. P2: Jika sungai meluap, maka jalan banjir. Kesimpulan yang sah adalah ...', o: ['Jika jalan banjir, maka hujan deras.', 'Jika hujan deras, maka jalan banjir.', 'Jika tidak hujan deras, maka jalan tidak banjir.', 'Hujan deras dan jalan tidak banjir.', 'Sungai meluap.'], k: 1, d: 2, b: 'Silogisme: p ⇒ r.', x: { 0: 'pu4', 2: 'pu4' } },
    { t: 'P1: Jika ia belajar, maka ia lulus. P2: Ia tidak belajar. Kesimpulan yang sah adalah ...', o: ['Ia tidak lulus.', 'Ia lulus.', 'Ia mengulang.', 'Jika ia lulus, maka ia belajar.', 'Tidak dapat ditarik kesimpulan yang pasti.'], k: 4, d: 3, b: 'Dari ~p tidak bisa disimpulkan ~q (kesalahan “menyangkal syarat”). Ia mungkin lulus karena hal lain.', x: { 0: 'pu4' } },
  ],
});

A('pu6', 'pu', 'Kuantor: semua & beberapa', 'Silogisme kategoris dengan gambar lingkaran.', ['pu5', 'pu2'], {
  hook: 'Soal ==“Semua A adalah B. Beberapa C adalah A. Maka ...”== muncul hampir di setiap UTBK. Caranya: gambar lingkaran.',
  jelas: {
    analogi: 'Bayangkan kotak pensil di dalam tas. “Semua pensil adalah alat tulis” berarti kotak pensil ada **di dalam** kotak alat tulis yang lebih besar.\n\nApa pun yang ada di kotak pensil otomatis ada di kotak alat tulis — tapi tidak semua alat tulis adalah pensil.',
    langkah: [
      '“Semua A adalah B” → lingkaran A di dalam lingkaran B.',
      '“Beberapa A adalah B” → lingkaran A dan B beririsan (minimal satu anggota).',
      '“Tidak ada A yang B” → lingkaran A dan B terpisah.',
      'Kesimpulan sah hanya jika BENAR untuk SEMUA cara menggambar yang mungkin.',
    ],
    cerita: 'Semua siswa XII-IPA ikut UTBK. Beberapa peserta UTBK mendaftar kedokteran. Apakah ada siswa XII-IPA yang mendaftar kedokteran? **Belum tentu!** Bisa saja semua pendaftar kedokteran berasal dari kelas lain.',
    singkat: 'Semua A ⊂ B. Beberapa = irisan tidak kosong. Kesimpulan sah = selalu benar di semua diagram yang mungkin.',
  },
  contoh: {
    soal: 'P1: Semua atlet rajin berlatih. P2: Beberapa siswa adalah atlet. Kesimpulan?',
    langkah: ['Atlet ⊂ rajin berlatih.', 'Ada siswa di dalam lingkaran atlet.', 'Siswa itu pasti juga di dalam lingkaran rajin berlatih.', 'Kesimpulan: **Beberapa siswa rajin berlatih.**'],
    jawab: 'Beberapa siswa rajin berlatih.',
  },
  rumpang: {
    soal: 'P1: Tidak ada ikan yang bernapas dengan paru-paru. P2: Lumba-lumba bernapas dengan paru-paru. Kesimpulan?',
    langkah: ['Lingkaran “ikan” dan “bernapas dengan paru-paru” terpisah.', 'Lumba-lumba ada di lingkaran “paru-paru”.', 'Jadi lumba-lumba ___.'],
    kosong: 'bukan ikan', pilihan: ['bukan ikan', 'adalah ikan', 'mungkin ikan', 'bernapas dengan insang'],
  },
  latihan: [
    { t: 'P1: Semua mamalia bernapas dengan paru-paru. P2: Kucing adalah mamalia. Kesimpulan yang sah adalah ...', o: ['Kucing bernapas dengan paru-paru.', 'Semua yang bernapas dengan paru-paru adalah kucing.', 'Kucing bukan mamalia.', 'Hanya kucing yang mamalia.', 'Tidak dapat disimpulkan.'], k: 0, d: 1, b: 'Kucing ⊂ mamalia ⊂ bernapas dengan paru-paru.' },
    { t: 'P1: Semua siswa SMA X memakai seragam. P2: Dina memakai seragam. Kesimpulan yang sah adalah ...', o: ['Dina siswa SMA X.', 'Dina bukan siswa SMA X.', 'Dina pasti siswa SMA.', 'Semua yang berseragam adalah siswa SMA X.', 'Tidak dapat ditarik kesimpulan yang pasti.'], k: 4, d: 2, b: 'Dina ada di lingkaran “berseragam”, tetapi lingkaran itu lebih besar daripada “siswa SMA X”. Dina bisa di dalam atau di luar.', x: { 0: 'pu5' } },
    { t: 'P1: Semua penulis gemar membaca. P2: Beberapa guru adalah penulis. Kesimpulan yang sah adalah ...', o: ['Semua guru gemar membaca.', 'Beberapa guru gemar membaca.', 'Semua yang gemar membaca adalah penulis.', 'Tidak ada guru yang gemar membaca.', 'Beberapa penulis bukan guru.'], k: 1, d: 2, b: 'Guru yang penulis pasti ada di lingkaran “gemar membaca”.' },
    { t: 'P1: Semua A adalah B. P2: Beberapa B adalah C. Kesimpulan yang PASTI benar adalah ...', o: ['Beberapa A adalah C.', 'Semua C adalah A.', 'Semua A adalah C.', 'Beberapa C adalah B.', 'Tidak ada A yang C.'], k: 3, d: 3, b: '“Beberapa B adalah C” berarti ada anggota yang ada di B dan C sekaligus, jadi “beberapa C adalah B” pasti benar. Pilihan A belum tentu: irisan B dan C bisa berada di luar A.' },
  ],
  uji: [
    { t: 'P1: Tidak ada pelajar yang boleh merokok di sekolah. P2: Rudi adalah pelajar. Kesimpulan yang sah adalah ...', o: ['Rudi boleh merokok di sekolah.', 'Rudi tidak boleh merokok di sekolah.', 'Rudi bukan pelajar.', 'Beberapa pelajar boleh merokok.', 'Tidak dapat disimpulkan.'], k: 1, d: 2, b: 'Lingkaran “pelajar” terpisah dari “boleh merokok di sekolah”.' },
    { t: 'P1: Semua peserta lomba mendapat sertifikat. P2: Beberapa siswa kelas XI tidak mendapat sertifikat. Kesimpulan yang sah adalah ...', o: ['Semua siswa kelas XI peserta lomba.', 'Beberapa siswa kelas XI bukan peserta lomba.', 'Semua peserta lomba adalah siswa kelas XI.', 'Tidak ada siswa kelas XI yang ikut lomba.', 'Beberapa peserta lomba tidak mendapat sertifikat.'], k: 1, d: 3, b: 'Siswa yang tidak mendapat sertifikat pasti berada di luar lingkaran “peserta lomba” (modus tollens dalam bentuk kuantor).', x: { 3: 'pu2' } },
    { t: 'P1: Semua bilangan genap habis dibagi 2. P2: Bilangan n habis dibagi 2. Menurut bentuk premisnya saja, kesimpulan “n bilangan genap” ...', o: ['sah, karena kedua premisnya sama-sama bernilai benar', 'sah, karena n yang habis dibagi 2 memang selalu genap', 'tidak sah: “habis dibagi 2” tidak menjamin “genap” menurut bentuk premis', 'tidak sah, karena salah satu premisnya bernilai salah', 'sah, karena bentuknya sama dengan pola modus ponens'], k: 2, d: 3, b: 'Polanya “menegaskan akibat”. Di dunia nyata kesimpulannya benar, tetapi logika UTBK menilai apakah kesimpulan MENGIKUTI dari premis. Di sini tidak.', x: { 4: 'pu5' } },
  ],
});

/* ===================== PBM — Kata baku & kalimat efektif ===================== */

A('pbm1', 'pbm', 'Kata baku vs tidak baku', 'Mengenali ejaan baku menurut KBBI dan pola-pola serapan.', [], {
  hook: 'Soal PBM sering memintamu menemukan ==kata tidak baku== dalam paragraf. Ada pola yang bisa dihafal.',
  jelas: {
    analogi: 'Kata baku itu seperti seragam upacara: ada satu versi resmi menurut KBBI. “Apotek” memakai seragam resmi; “apotik” memakai baju bebas.\n\nDi ujian, juri hanya menilai seragam resmi.',
    langkah: [
      'Cek ejaan resmi di KBBI (versi daring tersedia gratis).',
      'Pola serapan: -tif/-sif dari -tive/-sive (efektif, pasif); “ku” bukan “kw” (kualitas, kuitansi).',
      'Pola vokal: praktik (bukan praktek), risiko (bukan resiko), nasihat (bukan nasehat).',
      'Pola huruf: ijazah, izin, jadwal, zaman — z dan w sesuai asal katanya.',
    ],
    cerita: 'Di surat izin kegiatan OSIS tertulis “ijin”, “jadual”, dan “resiko”. Guru Bahasa Indonesia mencoretnya dengan tinta merah menjadi **izin**, **jadwal**, dan **risiko**.',
    singkat: 'Hafalkan pasangan tersering: apotek, ijazah, izin, jadwal, kualitas, praktik, risiko, sistem, analisis, nasihat, objek, silakan, hakikat.',
  },
  contoh: {
    soal: 'Temukan kata tidak baku: “Para siswa melakukan praktek di laboratorium sesuai jadwal.”',
    langkah: ['Periksa kata yang sering keliru: “praktek”, “jadwal”.', '“Praktek” → bentuk bakunya “praktik”.', '“Jadwal” sudah baku.', 'Kata tidak baku: **praktek**.'],
    jawab: 'praktek (baku: praktik)',
  },
  rumpang: {
    soal: 'Bentuk baku dari “analisa” adalah ...',
    langkah: ['Kata ini diserap dari “analysis” → akhiran -isis.', 'Bentuk baku: ___.'],
    kosong: 'analisis', pilihan: ['analisis', 'analisa', 'analysa', 'analisys'],
  },
  latihan: [
    { t: 'Kata baku di bawah ini adalah ...', o: ['apotik', 'ijasah', 'kualitas', 'resiko', 'nasehat'], k: 2, d: 1, b: 'Bentuk baku: apotek, ijazah, kualitas, risiko, nasihat.' },
    { t: 'Bentuk baku dari “silahkan” adalah ...', o: ['silakan', 'silahkan', 'sillakan', 'silah kan', 'silaken'], k: 0, d: 1, b: 'Bentuk bakunya “silakan” (dari kata dasar “sila”), tanpa huruf h.' },
    { t: 'Kalimat yang semua katanya baku adalah ...', o: ['Dia mengurus ijin di kantor.', 'Jadwal praktik sudah diumumkan.', 'Kwalitas produk itu menurun.', 'Obyek penelitian belum ditentukan.', 'Hakekat belajar adalah berubah.'], k: 1, d: 2, b: 'Bentuk baku: izin, kualitas, objek, hakikat. Hanya kalimat B yang semuanya baku.' },
    { t: 'Kata tidak baku dalam kalimat “Sistim penilaian ujian menggunakan analisis butir soal” adalah ...', o: ['sistim', 'penilaian', 'ujian', 'analisis', 'butir'], k: 0, d: 2, b: 'Bentuk bakunya “sistem”.' },
  ],
  uji: [
    { t: 'Kata yang TIDAK baku adalah ...', o: ['karier', 'efektif', 'frekwensi', 'teladan', 'persen'], k: 2, d: 2, b: 'Bentuk bakunya “frekuensi”.' },
    { t: 'Perbaikan kata tidak baku yang tepat adalah ...', o: ['merubah → mengubah', 'mengubah → merubah', 'nasihat → nasehat', 'praktik → praktek', 'izin → ijin'], k: 0, d: 2, b: 'Kata dasarnya “ubah”, jadi bentuk yang benar “mengubah”. Pilihan lain justru mengubah kata baku menjadi tidak baku.' },
    { t: '“(1) Jadwal kegiatan OSIS disusun berdasarkan (2) analisis kebutuhan. Setiap kegiatan memiliki (3) risiko, sehingga (4) kwitansi pembelian harus disimpan sebagai (5) bukti.” Kata yang tidak baku adalah ...', o: ['(1)', '(2)', '(3)', '(4)', '(5)'], k: 3, d: 3, b: 'Bentuk bakunya “kuitansi”.' },
  ],
});

A('pbm2', 'pbm', 'di- awalan vs di kata depan', '“di” + tempat ditulis terpisah; di- + kata kerja pasif disambung.', ['pbm1'], {
  hook: '“di” yang ditulis ==serangkai atau terpisah== adalah jebakan favorit di soal ejaan.',
  jelas: {
    analogi: 'Ujinya sederhana: tukar “di” dengan “ke”. Jika masih masuk akal (“di rumah” → “ke rumah”), “di” adalah **kata depan** penunjuk tempat → ditulis **terpisah**.\n\nJika tidak masuk akal (“dibaca” → “kebaca”?), “di” adalah **awalan** kata kerja pasif → ditulis **serangkai**.',
    langkah: [
      'Kata depan “di” + tempat/waktu → dipisah: di rumah, di atas, di sini.',
      'Awalan “di-” + kata kerja (bentuk pasif) → disambung: dibaca, ditulis, diumumkan.',
      'Uji cepat: ganti dengan “ke”, atau ubah ke bentuk aktif (dibaca → membaca).',
      'Ingat juga: “di mana”, “di antara” dipisah; “disebabkan”, “dikarenakan” disambung.',
    ],
    cerita: 'Pengumuman di mading: “Hasil seleksi akan di umumkan dirumah masing-masing.” Seharusnya: “Hasil seleksi akan **diumumkan** **di rumah** masing-masing.” Dua “di”, dua aturan berbeda.',
    singkat: 'di + tempat = pisah. di- + kata kerja pasif = sambung.',
  },
  contoh: {
    soal: 'Perbaiki: “Buku itu di letakkan diatas meja.”',
    langkah: ['“di letakkan” → kata kerja pasif (aktifnya: meletakkan) → “diletakkan”.', '“diatas” → menunjuk tempat → “di atas”.', 'Hasil: **“Buku itu diletakkan di atas meja.”**'],
    jawab: 'Buku itu diletakkan di atas meja.',
  },
  rumpang: {
    soal: '“Surat itu ___ kemarin.” (kata dasar: kirim)',
    langkah: ['Bentuk aktifnya “mengirim”, jadi ini kata kerja pasif.', 'Penulisan yang benar: ___.'],
    kosong: 'dikirim', pilihan: ['dikirim', 'di kirim', 'di-kirim', 'di kirimkan'],
  },
  latihan: [
    { t: 'Penulisan yang benar adalah ...', o: ['di tulis', 'dirumah', 'di sekolah', 'diluar', 'di baca'], k: 2, d: 1, b: '“di sekolah” menunjuk tempat → dipisah. “ditulis” dan “dibaca” seharusnya disambung; “di rumah” dan “di luar” seharusnya dipisah.' },
    { t: 'Kalimat dengan penulisan “di” yang tepat adalah ...', o: ['Tas itu disimpan di lemari.', 'Tas itu di simpan dilemari.', 'Tas itu disimpan dilemari.', 'Tas itu di simpan di lemari.', 'Tas itu di-simpan di lemari.'], k: 0, d: 1, b: '“disimpan” (pasif) disambung; “di lemari” (tempat) dipisah.' },
    { t: 'Kata yang penulisannya SALAH adalah ...', o: ['di antara', 'dimana', 'di sini', 'dimakan', 'diambil'], k: 1, d: 2, b: 'Yang benar “di mana” (dipisah).' },
    { t: 'Perbaikan yang tepat untuk “Dia di tunjuk sebagai ketua dikelas itu” adalah ...', o: ['Dia ditunjuk sebagai ketua di kelas itu.', 'Dia di tunjuk sebagai ketua di kelas itu.', 'Dia ditunjuk sebagai ketua dikelas itu.', 'Dia di-tunjuk sebagai ketua di-kelas itu.', 'Dia ditunjuk sebagai ketua di-kelas itu.'], k: 0, d: 2, b: '“ditunjuk” (pasif) disambung; “di kelas” (tempat) dipisah.' },
  ],
  uji: [
    { t: 'Penulisan yang benar adalah ...', o: ['diperhatikan', 'di perhatikan', 'diperhati kan', 'di-perhatikan', 'diper hatikan'], k: 0, d: 2, b: 'Kata kerja pasif ditulis serangkai: diperhatikan.' },
    { t: 'Kalimat yang SALAH penulisannya adalah ...', o: ['Rapat diadakan di aula.', 'Soal itu dikerjakan di kelas.', 'Naskah dikumpulkan di meja guru.', 'Pemenang di umumkan di lapangan.', 'Hasilnya dicatat di buku.'], k: 3, d: 2, b: 'Seharusnya “diumumkan” (disambung).' },
    { t: 'Penulisan yang tepat untuk melengkapi “(1) antara peserta itu, siswa terbaik (2) hadiah” adalah ...', o: ['Di antara ... diberi', 'Di antara ... di beri', 'Diantara ... diberi', 'Diantara ... di beri', 'Di-antara ... diberi'], k: 0, d: 3, b: '“di antara” selalu dipisah; “diberi” adalah kata kerja pasif, jadi disambung.' },
  ],
});

A('pbm3', 'pbm', 'Kalimat efektif: hemat kata', 'Membuang kata mubazir: jamak ganda, sinonim bertumpuk, “daripada”.', ['pbm1'], {
  hook: 'Soal ==“kalimat yang paling efektif”== sering hanya menguji satu hal: adakah kata yang mubazir.',
  jelas: {
    analogi: 'Kalimat efektif itu seperti koper yang dikemas rapi: tidak ada barang dobel. “Para siswa-siswa” membawa dua payung untuk satu kepala: “para” sudah berarti banyak, jadi “siswa” tidak perlu diulang.',
    langkah: [
      'Buang penanda jamak ganda: para siswa-siswa → para siswa; banyak rumah-rumah → banyak rumah.',
      'Buang sinonim bertumpuk: agar supaya → agar; demi untuk → demi; sejak dari → sejak.',
      'Buang “daripada” yang tidak membandingkan: tujuan daripada kegiatan → tujuan kegiatan.',
      'Buang kata ulang setelah “saling”: saling bantu-membantu → saling membantu.',
    ],
    cerita: 'Spanduk: “Agar supaya para siswa-siswa sukses, marilah kita saling bahu-membahu.” Versi efektif: “Agar para siswa sukses, marilah kita **bahu-membahu**.”',
    singkat: 'Satu makna, satu kata. Buang jamak ganda, sinonim bertumpuk, “daripada” yang keliru, dan “saling” + kata ulang berbalasan.',
  },
  contoh: {
    soal: 'Perbaiki: “Sejak dari kecil, ia sudah gemar membaca.”',
    langkah: ['“Sejak dari” adalah sinonim bertumpuk.', 'Cukup pakai salah satu: “sejak”.', 'Hasil: **“Sejak kecil, ia sudah gemar membaca.”**'],
    jawab: 'Sejak kecil, ia sudah gemar membaca.',
  },
  rumpang: {
    soal: 'Perbaiki: “Kita harus saling hormat-menghormati.”',
    langkah: ['“Saling” sudah bermakna timbal balik.', 'Kata ulang “hormat-menghormati” jadi berlebihan.', 'Hasil: “Kita harus saling ___.”'],
    kosong: 'menghormati', pilihan: ['menghormati', 'hormat-menghormati', 'menghormat-hormati', 'hormat'],
  },
  latihan: [
    { t: 'Kalimat yang efektif adalah ...', o: ['Para siswa-siswa dimohon berkumpul.', 'Para siswa dimohon berkumpul.', 'Para siswa-siswa sekalian dimohon berkumpul.', 'Semua para siswa dimohon berkumpul.', 'Para semua siswa dimohon berkumpul.'], k: 1, d: 1, b: '“Para” sudah menyatakan jamak, jadi “siswa” tidak perlu diulang.' },
    { t: 'Kata yang mubazir dalam kalimat “Belajarlah dengan tekun agar supaya lolos SNBT” adalah ...', o: ['belajarlah', 'dengan', 'tekun', 'supaya', 'lolos'], k: 3, d: 1, b: '“Agar” dan “supaya” bersinonim; cukup salah satu.' },
    { t: 'Kalimat yang paling efektif adalah ...', o: ['Tujuan daripada kegiatan ini adalah mempererat persahabatan.', 'Tujuan kegiatan ini adalah mempererat persahabatan.', 'Adapun tujuan daripada kegiatan ini adalah untuk mempererat persahabatan.', 'Tujuan dari pada kegiatan ini untuk mempererat persahabatan.', 'Kegiatan ini tujuannya adalah daripada mempererat persahabatan.'], k: 1, d: 2, b: '“Daripada” dipakai untuk membandingkan, bukan untuk menyatakan kepemilikan.' },
    { t: 'Kalimat berikut mengandung pemborosan, KECUALI ...', o: ['Ia naik ke atas panggung.', 'Mereka saling pukul-memukul.', 'Demi untuk masa depan, ia belajar.', 'Banyak siswa mengikuti uji coba.', 'Sejak dari pagi ia menunggu.'], k: 3, d: 2, b: '“Naik ke atas”, “saling pukul-memukul”, “demi untuk”, dan “sejak dari” semuanya mubazir.' },
  ],
  uji: [
    { t: 'Kalimat yang efektif adalah ...', o: ['Mereka saling tolong-menolong.', 'Mereka saling menolong.', 'Mereka saling tolong-menolongi.', 'Mereka saling bantu-membantu.', 'Mereka saling bertolong-tolongan.'], k: 1, d: 2, b: 'Setelah “saling”, cukup kata kerja biasa: saling menolong.' },
    { t: 'Perbaikan yang tepat untuk “Banyak peserta-peserta yang hadir sejak dari pagi” adalah ...', o: ['Banyak peserta yang hadir sejak pagi.', 'Banyak peserta-peserta hadir sejak pagi.', 'Peserta-peserta banyak hadir sejak dari pagi.', 'Banyak peserta yang hadir sejak dari pagi.', 'Para peserta-peserta hadir sejak pagi.'], k: 0, d: 2, b: 'Buang jamak ganda (“banyak” + “peserta-peserta”) dan sinonim bertumpuk (“sejak dari”).' },
    { t: '“(1) Hasil survei menunjukkan minat baca siswa meningkat. (2) Para siswa-siswa lebih sering ke perpustakaan. (3) Mereka meminjam buku setiap minggu. (4) Petugas mencatat kenaikan peminjaman. (5) Sekolah berencana menambah koleksi.” Kalimat yang tidak efektif adalah ...', o: ['(1)', '(2)', '(3)', '(4)', '(5)'], k: 1, d: 3, b: 'Kalimat (2) memakai jamak ganda: “para siswa-siswa”.' },
  ],
});

A('pbm4', 'pbm', 'Kalimat efektif: subjek yang jelas', 'Kata depan di awal kalimat sering “menyembunyikan” subjek.', ['pbm3', 'pbm2'], {
  hook: 'Kesalahan paling sering di soal PBM: kalimat yang ==kehilangan subjek== karena diawali kata depan.',
  jelas: {
    analogi: 'Setiap kalimat butuh pemeran utama (**subjek**). Kata depan seperti “di”, “dalam”, “bagi”, “kepada” itu seperti tirai: kalau kamu memasangnya di depan pemeran utama, ia bersembunyi dan kalimat kehilangan pemerannya.',
    langkah: [
      'Cari predikat (kata kerja utama), lalu tanya: siapa/apa yang melakukannya?',
      'Jika jawabannya diawali kata depan (di, dalam, bagi, kepada, untuk), subjeknya tersembunyi.',
      'Perbaiki: hapus kata depannya, atau tambahkan subjek baru.',
      'Contoh: “Dalam rapat itu membahas anggaran” → “Rapat itu membahas anggaran” atau “Dalam rapat itu, panitia membahas anggaran.”',
    ],
    cerita: 'Pengumuman: “Bagi peserta yang terlambat dilarang masuk.” Siapa yang dilarang? Subjeknya bersembunyi di balik “bagi”. Perbaikan: **“Peserta yang terlambat dilarang masuk.”**',
    singkat: 'Kata depan di awal kalimat + predikat langsung = subjek hilang. Hapus kata depannya atau tambahkan subjek.',
  },
  contoh: {
    soal: 'Perbaiki: “Kepada para peserta harap mengisi daftar hadir.”',
    langkah: ['Predikat: “harap mengisi”. Siapa? “kepada para peserta” → diawali kata depan.', 'Hapus “kepada”.', 'Hasil: **“Para peserta harap mengisi daftar hadir.”**'],
    jawab: 'Para peserta harap mengisi daftar hadir.',
  },
  rumpang: {
    soal: 'Perbaiki: “Di dalam buku itu menjelaskan cara belajar efektif.”',
    langkah: ['Subjeknya bersembunyi di balik “di dalam”.', 'Hapus kata depannya: “___ itu menjelaskan cara belajar efektif.”'],
    kosong: 'Buku', pilihan: ['Buku', 'Di buku', 'Dalam buku', 'Di dalam buku'],
  },
  latihan: [
    { t: 'Kalimat yang subjeknya jelas adalah ...', o: ['Dalam rapat itu membahas jadwal ujian.', 'Rapat itu membahas jadwal ujian.', 'Di rapat itu membahas jadwal ujian.', 'Bagi rapat itu membahas jadwal ujian.', 'Pada rapat itu membahas jadwal ujian.'], k: 1, d: 1, b: 'Tanpa kata depan, “rapat itu” menjadi subjek.' },
    { t: 'Kalimat yang TIDAK efektif adalah ...', o: ['Peserta wajib membawa kartu ujian.', 'Bagi peserta wajib membawa kartu ujian.', 'Semua peserta wajib membawa kartu ujian.', 'Kartu ujian wajib dibawa peserta.', 'Peserta ujian wajib membawa kartu.'], k: 1, d: 2, b: '“Bagi” menyembunyikan subjek “peserta”.' },
    { t: 'Perbaikan untuk “Menurut para ahli mengatakan bahwa membaca melatih otak” adalah ...', o: ['Menurut para ahli, membaca melatih otak.', 'Menurut para ahli mengatakan membaca melatih otak.', 'Para ahli menurut mengatakan membaca melatih otak.', 'Menurut para ahli bahwa membaca melatih otak.', 'Para ahli menurut bahwa membaca melatih otak.'], k: 0, d: 2, b: '“Menurut” dan “mengatakan” tumpang tindih. Pakai salah satu: “Menurut para ahli, ...” atau “Para ahli mengatakan bahwa ...”.', x: { 1: 'pbm3' } },
    { t: 'Kalimat berikut efektif, KECUALI ...', o: ['Dalam penelitian itu, peneliti menggunakan metode survei.', 'Penelitian itu menggunakan metode survei.', 'Dalam penelitian itu menggunakan metode survei.', 'Peneliti menggunakan metode survei dalam penelitian itu.', 'Metode survei digunakan dalam penelitian itu.'], k: 2, d: 3, b: 'Kalimat C tidak punya subjek: “dalam penelitian itu” diawali kata depan.' },
  ],
  uji: [
    { t: 'Kalimat yang efektif adalah ...', o: ['Kepada siswa kelas XII dimohon berkumpul di aula.', 'Siswa kelas XII dimohon berkumpul di aula.', 'Bagi siswa kelas XII dimohon berkumpul di aula.', 'Untuk siswa kelas XII dimohon berkumpul di aula.', 'Kepada siswa-siswa kelas XII dimohon berkumpul.'], k: 1, d: 2, b: 'Subjek “siswa kelas XII” tidak boleh diawali kata depan.' },
    { t: '“Di sekolah itu menerapkan kurikulum baru.” Perbaikan yang tepat adalah ...', o: ['Di sekolah itu menerapkan kurikulum yang baru.', 'Sekolah itu menerapkan kurikulum baru.', 'Di sekolah itu diterapkan oleh kurikulum baru.', 'Pada sekolah itu menerapkan kurikulum baru.', 'Di sekolah itu, menerapkan kurikulum baru.'], k: 1, d: 2, b: 'Hapus “di” agar “sekolah itu” menjadi subjek.' },
    { t: '“(1) Perpustakaan sekolah kini buka hingga sore. (2) Bagi siswa yang ingin meminjam buku harus menunjukkan kartu pelajar. (3) Setiap siswa boleh meminjam tiga buku. (4) Buku harus dikembalikan dalam seminggu. (5) Denda berlaku untuk keterlambatan.” Kalimat yang tidak efektif adalah ...', o: ['(1)', '(2)', '(3)', '(4)', '(5)'], k: 1, d: 3, b: 'Kalimat (2): “bagi” menyembunyikan subjek. Perbaikan: “Siswa yang ingin meminjam buku harus menunjukkan kartu pelajar.”' },
  ],
});

/* PPU, LBI, LBE, dan PM ada di content2.js (dimuat setelah file ini). */

/* Soal tambahan untuk tryout & latihan. */
const BANK_EXTRA = [
  { id: 'x-ppu1', s: 'ppu', a: 'ppu1', t: 'Kata yang paling dekat maknanya dengan “lugas” adalah ...', o: ['rumit', 'apa adanya', 'berbelit-belit', 'indah', 'samar'], k: 1, d: 1, b: '“Lugas” berarti bersifat seperlunya, tidak berbelit-belit, apa adanya.' },
  { id: 'x-ppu2', s: 'ppu', a: 'ppu2', t: 'Antonim kata “nisbi” adalah ...', o: ['relatif', 'mutlak', 'sementara', 'kecil', 'lemah'], k: 1, d: 2, b: '“Nisbi” berarti relatif; lawannya “mutlak”.' },
  { id: 'x-ppu3', s: 'ppu', a: 'ppu3', t: 'Makna kata “ranah” dalam kalimat “Penelitian itu masuk ranah ekonomi” adalah ...', o: ['lembah', 'bidang', 'tanah', 'aturan', 'hasil'], k: 1, d: 2, b: 'Dalam konteks ini “ranah” berarti bidang atau lingkup kajian.' },
  { id: 'x-lbi1', s: 'lbi', a: 'lbi2', p: 'Gerakan literasi sekolah mewajibkan siswa membaca 15 menit sebelum pelajaran dimulai. Setelah dua tahun berjalan, sebuah sekolah mencatat kunjungan perpustakaan naik hingga dua kali lipat. Namun, para guru menilai kemampuan siswa merangkum bacaan belum banyak berubah. Menurut mereka, membaca rutin perlu diikuti latihan menulis ringkasan agar pemahaman ikut tumbuh.', t: 'Ide pokok teks tersebut adalah ...', o: ['Siswa wajib membaca 15 menit.', 'Kunjungan perpustakaan naik dua kali lipat.', 'Membaca rutin belum cukup tanpa latihan merangkum.', 'Guru menolak gerakan literasi.', 'Perpustakaan perlu buku baru.'], k: 2, d: 2, b: 'Kalimat-kalimat lain mendukung gagasan bahwa membaca rutin perlu dilengkapi latihan merangkum.' },
  { id: 'x-lbi2', s: 'lbi', a: 'lbi3', p: 'Gerakan literasi sekolah mewajibkan siswa membaca 15 menit sebelum pelajaran dimulai. Setelah dua tahun berjalan, sebuah sekolah mencatat kunjungan perpustakaan naik hingga dua kali lipat. Namun, para guru menilai kemampuan siswa merangkum bacaan belum banyak berubah. Menurut mereka, membaca rutin perlu diikuti latihan menulis ringkasan agar pemahaman ikut tumbuh.', t: 'Simpulan yang TIDAK sesuai dengan teks adalah ...', o: ['Program sudah berjalan dua tahun.', 'Kunjungan perpustakaan meningkat.', 'Kemampuan merangkum siswa meningkat pesat.', 'Guru menyarankan latihan menulis ringkasan.', 'Siswa membaca sebelum pelajaran.'], k: 2, d: 2, b: 'Teks menyatakan kemampuan merangkum “belum banyak berubah”.' },
  { id: 'x-lbe1', s: 'lbe', a: 'lbe2', p: 'Many students believe that studying for long hours the night before an exam is the best strategy. However, research on memory suggests otherwise. Spacing study sessions over several days helps the brain store information more durably, while cramming often leads to quick forgetting. In other words, how you distribute your study time may matter as much as how long you study.', t: 'The main idea of the passage is that ...', o: ['students should study at night', 'cramming is the most effective strategy', 'spreading study time over several days improves memory', 'exams should be held more often', 'research on memory is limited'], k: 2, d: 2, b: 'Gagasan utama: cara membagi waktu belajar (spacing) membantu ingatan bertahan lebih lama.' },
  { id: 'x-lbe2', s: 'lbe', a: 'lbe1', p: 'Many students believe that studying for long hours the night before an exam is the best strategy. However, research on memory suggests otherwise. Spacing study sessions over several days helps the brain store information more durably, while cramming often leads to quick forgetting. In other words, how you distribute your study time may matter as much as how long you study.', t: 'The word “durably” in the passage is closest in meaning to ...', o: ['quickly', 'lastingly', 'loosely', 'rarely', 'partly'], k: 1, d: 2, b: '“Durably” = in a lasting way (tahan lama), kontras dengan “quick forgetting”.' },
  { id: 'x-lbe3', s: 'lbe', a: 'lbe3', p: 'Many students believe that studying for long hours the night before an exam is the best strategy. However, research on memory suggests otherwise. Spacing study sessions over several days helps the brain store information more durably, while cramming often leads to quick forgetting. In other words, how you distribute your study time may matter as much as how long you study.', t: 'The word “otherwise” indicates that the research ...', o: ['supports the students’ belief', 'contradicts the students’ belief', 'ignores the topic', 'is unrelated to exams', 'proves cramming works'], k: 1, d: 2, b: '“However ... suggests otherwise” menandakan pertentangan dengan keyakinan siswa di kalimat pertama.' },
  { id: 'x-pm1', s: 'pm', a: 'pm2', t: 'Skor tryout lima siswa: 540, 560, 600, 620, 680. Rata-ratanya adalah ...', o: ['580', '590', '600', '610', '620'], k: 2, d: 1, b: 'Jumlah = 3.000; 3.000 ÷ 5 = 600.' },
  { id: 'x-pm2', s: 'pm', a: 'pm4', t: 'Sebuah kartu diambil acak dari 10 kartu bernomor 1 sampai 10. Peluang terambil kartu bernomor genap adalah ...', o: ['1/5', '2/5', '1/2', '3/5', '4/5'], k: 2, d: 1, b: 'Ada 5 nomor genap dari 10 kemungkinan: 5/10 = 1/2.' },
  { id: 'x-pm3', s: 'pm', a: 'pm3', t: 'Skala sebuah peta 1 : 250.000. Jarak dua kota di peta 4 cm. Jarak sebenarnya adalah ...', o: ['1 km', '10 km', '100 km', '25 km', '2,5 km'], k: 1, d: 2, b: '4 × 250.000 = 1.000.000 cm = 10 km.' },
];

/* ===================== Permainan harian ===================== */

/* Kata Hari Ini — 5 huruf, arti mengikuti KBBI (diparafrasekan). */
const KATA = [
  { w: 'NALAR', arti: 'pertimbangan tentang baik-buruk; akal budi; jalan pikiran', contoh: 'Soal penalaran umum menguji nalar, bukan hafalan.' },
  { w: 'LUGAS', arti: 'bersifat seperlunya; tidak berbelit-belit; apa adanya', contoh: 'Jawaban esainya lugas dan mudah dipahami.' },
  { w: 'SAHIH', arti: 'sah; benar; tidak bercela', contoh: 'Kesimpulan itu sahih karena mengikuti premisnya.' },
  { w: 'RANAH', arti: 'bidang atau lingkup (ilmu, kajian)', contoh: 'Topik itu masuk ranah ekonomi.' },
  { w: 'MAKNA', arti: 'arti; maksud pembicara atau penulis', contoh: 'Tentukan makna kata dari konteks kalimatnya.' },
  { w: 'ASASI', arti: 'bersifat dasar; pokok', contoh: 'Pendidikan adalah hak asasi setiap anak.' },
  { w: 'FAKTA', arti: 'hal yang merupakan kenyataan; sesuatu yang benar-benar ada atau terjadi', contoh: 'Bedakan fakta dan opini dalam teks itu.' },
  { w: 'OPINI', arti: 'pendapat; pikiran; pendirian', contoh: 'Kalimat “seharusnya” sering menandai opini.' },
  { w: 'RAGAM', arti: 'macam; jenis; corak', contoh: 'Ada beragam strategi menjawab soal literasi.' },
  { w: 'DALIL', arti: 'keterangan yang dijadikan bukti atau alasan suatu kebenaran', contoh: 'Ia mengajukan dalil yang kuat untuk pendapatnya.' },
  { w: 'TESIS', arti: 'pernyataan atau teori yang didukung oleh argumen', contoh: 'Paragraf pertama teks argumentasi berisi tesis.' },
  { w: 'RINCI', arti: 'terperinci; mendetail', contoh: 'Laporan itu disusun secara rinci.' },
  { w: 'NISBI', arti: 'relatif; tidak mutlak', contoh: 'Ukuran “jauh” itu nisbi, tergantung pembandingnya.' },
  { w: 'PUDAR', arti: 'kurang terang; luntur; berkurang', contoh: 'Semangatnya tidak pernah pudar menjelang ujian.' },
  { w: 'TEKUN', arti: 'rajin, keras hati, dan bersungguh-sungguh', contoh: 'Siswa yang tekun berlatih sedikit demi sedikit.' },
  { w: 'GIGIH', arti: 'tetap teguh pada pendirian; ulet', contoh: 'Ia gigih belajar meski sempat gagal.' },
  { w: 'PELIK', arti: 'sulit; rumit; sukar dipecahkan', contoh: 'Soal pelik bisa dipecah menjadi langkah kecil.' },
  { w: 'RUMIT', arti: 'sulit; sukar; berbelit-belit', contoh: 'Masalah rumit terasa ringan jika dicicil.' },
  { w: 'SIGAP', arti: 'cekatan; tangkas; cepat bertindak', contoh: 'Panitia sigap membantu peserta yang tersesat.' },
  { w: 'HEMAT', arti: 'berhati-hati dalam membelanjakan; tidak boros', contoh: 'Kalimat efektif itu hemat kata.' },
  { w: 'BIJAK', arti: 'selalu menggunakan akal budi; pandai; mahir', contoh: 'Kelola waktu ujian dengan bijak.' },
  { w: 'ACUAN', arti: 'sesuatu yang dipakai sebagai rujukan; cetakan', contoh: 'Kisi-kisi resmi menjadi acuan belajar.' },
  { w: 'PAKAR', arti: 'ahli', contoh: 'Para pakar pendidikan menyarankan belajar berjeda.' },
  { w: 'RESAH', arti: 'gelisah; tidak tenang', contoh: 'Ia resah menunggu pengumuman SNBT.' },
  { w: 'TEGAR', arti: 'kukuh; tidak mudah goyah', contoh: 'Tetap tegar meski hasil tryout belum memuaskan.' },
  { w: 'KONON', arti: 'kabarnya; katanya', contoh: 'Konon, soal tahun ini lebih banyak cerita.' },
  { w: 'ANDAL', arti: 'dapat dipercaya; memberi hasil yang sama pada ujian berulang', contoh: 'Data yang andal penting untuk penelitian.' },
  { w: 'LAZIM', arti: 'sudah biasa; umum', contoh: 'Kesalahan itu lazim terjadi pada soal persen.' },
  { w: 'JAMAK', arti: 'lazim; umum; banyak (lebih dari satu)', contoh: 'Kata “para” menandai bentuk jamak.' },
  { w: 'SURAM', arti: 'agak gelap; muram', contoh: 'Masa depan tidak suram selama kamu terus belajar.' },
];

/* Kelompok — susun 16 kata menjadi 4 kelompok. */
const KELOMPOK = [
  [
    { nama: 'Sinonim “pandai”', kata: ['CERDAS', 'PINTAR', 'CAKAP', 'MAHIR'] },
    { nama: 'Bangun ruang', kata: ['KUBUS', 'BALOK', 'TABUNG', 'KERUCUT'] },
    { nama: 'Fungsi dalam kalimat', kata: ['SUBJEK', 'PREDIKAT', 'OBJEK', 'KETERANGAN'] },
    { nama: 'Kata baku', kata: ['APOTEK', 'IJAZAH', 'RISIKO', 'KUALITAS'] },
  ],
  [
    { nama: 'Sinonim “cepat”', kata: ['LEKAS', 'SEGERA', 'KILAT', 'GESIT'] },
    { nama: 'Bilangan prima', kata: ['DUA', 'TIGA', 'LIMA', 'TUJUH'] },
    { nama: 'Konjungsi', kata: ['TETAPI', 'KARENA', 'SEHINGGA', 'MESKIPUN'] },
    { nama: 'Satuan panjang', kata: ['METER', 'INCI', 'KAKI', 'MIL'] },
  ],
  [
    { nama: 'Serapan dari bahasa Arab', kata: ['KITAB', 'ILMU', 'HAKIM', 'ADIL'] },
    { nama: 'Serapan dari bahasa Belanda', kata: ['KANTOR', 'HANDUK', 'KULKAS', 'WORTEL'] },
    { nama: 'Planet', kata: ['MERKURIUS', 'VENUS', 'MARS', 'SATURNUS'] },
    { nama: 'Sinonim “rumit”', kata: ['PELIK', 'SULIT', 'SUKAR', 'RUWET'] },
  ],
  [
    { nama: 'Kuadrat sempurna', kata: ['16', '25', '36', '49'] },
    { nama: 'Bangun datar', kata: ['TRAPESIUM', 'LAYANG-LAYANG', 'JAJARGENJANG', 'BELAH KETUPAT'] },
    { nama: 'Penanda kesimpulan', kata: ['JADI', 'MAKA', 'AKIBATNYA', 'ALHASIL'] },
    { nama: 'Jenis teks', kata: ['NARASI', 'DESKRIPSI', 'EKSPOSISI', 'ARGUMENTASI'] },
  ],
  [
    { nama: 'Kata ulang berbalasan', kata: ['PUKUL-MEMUKUL', 'TOLONG-MENOLONG', 'SURAT-MENYURAT', 'TARIK-MENARIK'] },
    { nama: 'Sinonim “besar”', kata: ['AKBAR', 'AGUNG', 'RAYA', 'RAKSASA'] },
    { nama: 'Istilah statistika', kata: ['MEDIAN', 'MODUS', 'KUARTIL', 'JANGKAUAN'] },
    { nama: 'Kata tanya', kata: ['APA', 'SIAPA', 'MENGAPA', 'BAGAIMANA'] },
  ],
];

/* Pola — deret bilangan/huruf. */
const POLA = [
  { seq: '2, 6, 12, 20, 30, ...', o: ['36', '40', '42', '48'], k: 2, d: 1, b: 'Selisihnya 4, 6, 8, 10, lalu 12 → 30 + 12 = 42. (Polanya n × (n + 1).)' },
  { seq: '1, 4, 9, 16, 25, ...', o: ['30', '35', '36', '49'], k: 2, d: 1, b: 'Bilangan kuadrat: 1², 2², 3², 4², 5², lalu 6² = 36.' },
  { seq: '2, 3, 5, 8, 13, ...', o: ['18', '20', '21', '26'], k: 2, d: 1, b: 'Setiap suku = jumlah dua suku sebelumnya: 8 + 13 = 21.' },
  { seq: '100, 95, 85, 70, 50, ...', o: ['20', '25', '30', '35'], k: 1, d: 1, b: 'Berkurang 5, 10, 15, 20, lalu 25 → 50 − 25 = 25.' },
  { seq: '81, 27, 9, 3, ...', o: ['0', '1', '1/3', '2'], k: 1, d: 1, b: 'Setiap suku dibagi 3: 3 ÷ 3 = 1.' },
  { seq: '3, 5, 9, 17, 33, ...', o: ['49', '57', '65', '66'], k: 2, d: 2, b: 'Setiap suku × 2 − 1: 33 × 2 − 1 = 65.' },
  { seq: '4, 8, 6, 12, 10, 20, ...', o: ['18', '22', '24', '40'], k: 0, d: 2, b: 'Bergantian × 2 lalu − 2: 20 − 2 = 18.' },
  { seq: '2, 5, 10, 17, 26, ...', o: ['35', '36', '37', '39'], k: 2, d: 2, b: 'Polanya n² + 1: 6² + 1 = 37.' },
  { seq: '3, 6, 11, 18, 27, ...', o: ['36', '38', '39', '40'], k: 1, d: 2, b: 'Selisihnya bilangan ganjil 3, 5, 7, 9, lalu 11 → 27 + 11 = 38.' },
  { seq: '5, 7, 11, 13, 17, ...', o: ['18', '19', '21', '23'], k: 1, d: 2, b: 'Deret bilangan prima mulai dari 5. Prima setelah 17 adalah 19.' },
  { seq: '1, 2, 6, 24, 120, ...', o: ['240', '600', '720', '840'], k: 2, d: 3, b: 'Dikali 2, 3, 4, 5, lalu 6: 120 × 6 = 720.' },
  { seq: '1, 3, 7, 15, 31, ...', o: ['47', '62', '63', '64'], k: 2, d: 3, b: 'Setiap suku × 2 + 1, atau 2ⁿ − 1: 31 × 2 + 1 = 63.' },
  { seq: 'A, C, F, J, O, ...', o: ['S', 'T', 'U', 'V'], k: 2, d: 3, b: 'Lompatannya +2, +3, +4, +5, lalu +6. O (15) + 6 = U (21).' },
  { seq: '2, 4, 3, 9, 4, 16, 5, ...', o: ['20', '25', '6', '36'], k: 1, d: 3, b: 'Pasangan bilangan dan kuadratnya: 2→4, 3→9, 4→16, 5→25.' },
  { seq: '1, 1, 2, 6, 24, ...', o: ['48', '96', '120', '144'], k: 2, d: 3, b: 'Dikali 1, 2, 3, 4, lalu 5: 24 × 5 = 120.' },
];

/* Sprint Logika — benar/salah dalam 60 detik. k = true jika pernyataan/kesimpulan BENAR (sah). */
const SPRINT = [
  { p: 'Semua siswa kelas XII ikut UTBK. Rina siswa kelas XII.\n∴ Rina ikut UTBK.', k: true, b: 'Pola modus ponens.' },
  { p: 'Semua kucing adalah mamalia. Semua mamalia bernapas dengan paru-paru.\n∴ Semua kucing bernapas dengan paru-paru.', k: true, b: 'Lingkaran kucing ⊂ mamalia ⊂ paru-paru.' },
  { p: 'Semua dokter pandai. Andi pandai.\n∴ Andi dokter.', k: false, b: 'Menegaskan akibat. Orang pandai belum tentu dokter.' },
  { p: 'Jika hujan, jalan basah. Hujan turun.\n∴ Jalan basah.', k: true, b: 'Modus ponens.' },
  { p: 'Jika hujan, jalan basah. Jalan basah.\n∴ Hujan turun.', k: false, b: 'Jalan bisa basah karena hal lain, misalnya disiram.' },
  { p: 'Jika hujan, jalan basah. Jalan tidak basah.\n∴ Tidak hujan.', k: true, b: 'Modus tollens.' },
  { p: 'Jika hujan, jalan basah. Tidak hujan.\n∴ Jalan tidak basah.', k: false, b: 'Menyangkal syarat; jalan tetap bisa basah karena sebab lain.' },
  { p: 'Jika belajar, maka lulus. Jika lulus, maka senang.\n∴ Jika belajar, maka senang.', k: true, b: 'Silogisme: p ⇒ q, q ⇒ r ∴ p ⇒ r.' },
  { p: 'Beberapa siswa suka matematika. Semua yang suka matematika suka fisika.\n∴ Beberapa siswa suka fisika.', k: true, b: 'Siswa yang suka matematika pasti suka fisika.' },
  { p: 'Semua A adalah B. Beberapa B adalah C.\n∴ Beberapa A adalah C.', k: false, b: 'Irisan B dan C bisa berada di luar A.' },
  { p: 'Tidak ada ikan yang bernapas dengan paru-paru. Lumba-lumba bernapas dengan paru-paru.\n∴ Lumba-lumba bukan ikan.', k: true, b: 'Lingkaran ikan dan paru-paru terpisah.' },
  { p: 'Semua peserta membawa kartu ujian. Budi tidak membawa kartu ujian.\n∴ Budi bukan peserta.', k: true, b: 'Bentuk modus tollens.' },
  { p: 'Beberapa buah berwarna merah. Apel adalah buah.\n∴ Apel berwarna merah.', k: false, b: '“Beberapa” tidak menjamin apel termasuk yang merah.' },
  { p: 'Negasi dari “Semua siswa hadir” adalah “Ada siswa yang tidak hadir”.', k: true, b: '~(semua) = ada yang tidak.' },
  { p: 'Negasi dari “Semua siswa hadir” adalah “Semua siswa tidak hadir”.', k: false, b: 'Negasi “semua” adalah “ada yang tidak”.' },
  { p: 'Negasi dari “Ani rajin dan pintar” adalah “Ani tidak rajin atau tidak pintar”.', k: true, b: 'De Morgan: ~(p ∧ q) = ~p ∨ ~q.' },
  { p: 'Negasi dari “Jika hujan, saya di rumah” adalah “Hujan dan saya tidak di rumah”.', k: true, b: '~(p ⇒ q) = p ∧ ~q.' },
  { p: '“Jika p maka q” setara dengan “Jika tidak q maka tidak p”.', k: true, b: 'Kontraposisi selalu setara.' },
  { p: '“Jika p maka q” setara dengan “Jika q maka p”.', k: false, b: 'Itu konvers, tidak setara.' },
  { p: '“Jika p maka q” setara dengan “tidak p atau q”.', k: true, b: 'p ⇒ q ≡ ~p ∨ q.' },
  { p: 'Semua burung bisa terbang. Penguin adalah burung.\n∴ Penguin bisa terbang.', k: true, b: 'Sah menurut premis. UTBK menilai apakah kesimpulan mengikuti premis, bukan fakta dunia nyata.' },
  { p: 'Hanya siswa berprestasi yang mendapat beasiswa. Doni mendapat beasiswa.\n∴ Doni siswa berprestasi.', k: true, b: '“Hanya A yang B” = “Jika B, maka A”.' },
  { p: 'Hanya siswa berprestasi yang mendapat beasiswa. Doni berprestasi.\n∴ Doni mendapat beasiswa.', k: false, b: 'Berprestasi adalah syarat perlu, bukan jaminan.' },
  { p: 'Jika rajin, maka lulus. Jika tidak lulus, maka mengulang. Dina tidak mengulang.\n∴ Dina rajin.', k: false, b: 'Dari “tidak mengulang” hanya bisa disimpulkan Dina lulus. Lulus tidak menjamin rajin.' },
  { p: 'Semua bilangan genap habis dibagi 2. 14 habis dibagi 2.\n∴ 14 bilangan genap.', k: false, b: 'Kesimpulannya benar di dunia nyata, tetapi TIDAK mengikuti dari bentuk premisnya (menegaskan akibat).' },
  { p: 'Rapat diadakan Senin atau Selasa. Rapat tidak diadakan Senin.\n∴ Rapat diadakan Selasa.', k: true, b: 'Silogisme disjungtif.' },
  { p: 'Rapat diadakan Senin atau Selasa. Rapat diadakan Senin.\n∴ Rapat tidak diadakan Selasa.', k: false, b: '“Atau” dalam logika bersifat inklusif; keduanya bisa terjadi.' },
  { p: 'Tidak semua siswa membawa laptop.\n∴ Ada siswa yang tidak membawa laptop.', k: true, b: '“Tidak semua” = “ada yang tidak”.' },
  { p: 'Semua anggota tim memakai seragam.\n∴ Yang tidak memakai seragam bukan anggota tim.', k: true, b: 'Kontraposisi dari pernyataan semula.' },
  { p: 'Negasi dari “Beberapa buah tidak manis” adalah “Semua buah manis”.', k: true, b: '~(ada yang tidak manis) = semua manis.' },
];

/* Benar atau Rusak — pilih kalimat/kata yang benar. a = benar, r = rusak. */
const RUSAK = [
  { a: 'apotek', r: 'apotik', b: 'Bentuk baku: apotek.' },
  { a: 'ijazah', r: 'ijasah', b: 'Bentuk baku: ijazah.' },
  { a: 'risiko', r: 'resiko', b: 'Bentuk baku: risiko.' },
  { a: 'kualitas', r: 'kwalitas', b: 'Bentuk baku: kualitas.' },
  { a: 'analisis', r: 'analisa', b: 'Bentuk baku: analisis.' },
  { a: 'praktik', r: 'praktek', b: 'Bentuk baku: praktik.' },
  { a: 'sistem', r: 'sistim', b: 'Bentuk baku: sistem.' },
  { a: 'nasihat', r: 'nasehat', b: 'Bentuk baku: nasihat.' },
  { a: 'objek', r: 'obyek', b: 'Bentuk baku: objek.' },
  { a: 'jadwal', r: 'jadual', b: 'Bentuk baku: jadwal.' },
  { a: 'silakan', r: 'silahkan', b: 'Bentuk baku: silakan.' },
  { a: 'mengubah', r: 'merubah', b: 'Kata dasarnya “ubah” → mengubah.' },
  { a: 'izin', r: 'ijin', b: 'Bentuk baku: izin.' },
  { a: 'hakikat', r: 'hakekat', b: 'Bentuk baku: hakikat.' },
  { a: 'teladan', r: 'tauladan', b: 'Bentuk baku: teladan.' },
  { a: 'Para siswa berkumpul di aula.', r: 'Para siswa-siswa berkumpul di aula.', b: '“Para” sudah bermakna jamak.' },
  { a: 'Kami saling membantu.', r: 'Kami saling bantu-membantu.', b: '“Saling” tidak perlu diikuti kata ulang berbalasan.' },
  { a: 'Rapat itu membahas anggaran.', r: 'Di dalam rapat itu membahas anggaran.', b: 'Kata depan “di dalam” menyembunyikan subjek.' },
  { a: 'Demi masa depan, ia belajar.', r: 'Demi untuk masa depan, ia belajar.', b: '“Demi” dan “untuk” bersinonim; cukup satu.' },
  { a: 'Sejak kecil ia gemar membaca.', r: 'Sejak dari kecil ia gemar membaca.', b: '“Sejak dari” mubazir.' },
  { a: 'Tujuan kegiatan ini mempererat persahabatan.', r: 'Tujuan daripada kegiatan ini mempererat persahabatan.', b: '“Daripada” hanya untuk membandingkan.' },
  { a: 'Semua peserta harap hadir.', r: 'Bagi semua peserta harap hadir.', b: '“Bagi” menyembunyikan subjek.' },
  { a: 'Buku itu dibaca Ani.', r: 'Buku itu di baca Ani.', b: 'Awalan di- pada kata kerja pasif ditulis serangkai.' },
  { a: 'Ia tinggal di rumah nenek.', r: 'Ia tinggal dirumah nenek.', b: 'Kata depan “di” + tempat ditulis terpisah.' },
  { a: 'Di mana kamu belajar?', r: 'Dimana kamu belajar?', b: '“Di mana” ditulis terpisah.' },
];

/* Tebak Angka — estimasi cepat. v = nilai tepat. */
const ANGKA = [
  { q: '19% dari 403', v: 76.57, trik: '20% dari 400 = 80, lalu kurangi sedikit.' },
  { q: '48 × 52', v: 2496, trik: '(50 − 2)(50 + 2) = 2.500 − 4 = 2.496.' },
  { q: '√2.000', v: 44.72, trik: '45² = 2.025, jadi sedikit di bawah 45.' },
  { q: '1/7 dalam persen', v: 14.29, trik: '1/7 ≈ 0,142857 → sekitar 14,3%.' },
  { q: '3,9²', v: 15.21, trik: '4² = 16, dikurangi sedikit: (4 − 0,1)² = 16 − 0,8 + 0,01.' },
  { q: '998 × 1,02', v: 1017.96, trik: '1.000 × 1,02 = 1.020, dikurangi 2 × 1,02.' },
  { q: '25% dari 25% dari 800', v: 50, trik: '1/4 × 1/4 = 1/16; 800 ÷ 16 = 50.' },
  { q: '7,5 × 12', v: 90, trik: '7,5 × 12 = 15 × 6 = 90.' },
  { q: '2¹⁰', v: 1024, trik: 'Hafalkan: 2¹⁰ = 1.024 ≈ 1.000.' },
  { q: '15% dari 640', v: 96, trik: '10% = 64, 5% = 32 → 96.' },
  { q: 'Rp50.000 naik 20% lalu turun 20% (dalam ribu rupiah)', v: 48, trik: '50 × 1,2 × 0,8 = 50 × 0,96 = 48.' },
  { q: '17 × 23', v: 391, trik: '(20 − 3)(20 + 3) = 400 − 9 = 391.' },
  { q: '999 ÷ 37', v: 27, trik: '37 × 27 = 999 (37 × 3 = 111).' },
  { q: '12,5% dari 96', v: 12, trik: '12,5% = 1/8; 96 ÷ 8 = 12.' },
  { q: '0,25 × 0,4 × 1.000', v: 100, trik: '0,25 × 0,4 = 0,1; × 1.000 = 100.' },
];

/* Kartu — dek bawaan. */
const DEK = {
  inggris: {
    nama: 'Kosakata Inggris (LBE)', s: 'lbe', kartu: [
      ['abundant', 'melimpah', 'Fresh water is abundant in the region during the rainy season.'],
      ['adequate', 'memadai; cukup', 'The school lacks adequate funding for new books.'],
      ['allocate', 'mengalokasikan; menyediakan', 'She allocates two hours a day to practice questions.'],
      ['ambiguous', 'ambigu; bermakna ganda', 'The instructions were ambiguous, so many students were confused.'],
      ['assess', 'menilai', 'Teachers assess progress with weekly quizzes.'],
      ['assumption', 'asumsi; anggapan', 'The argument rests on a weak assumption.'],
      ['coherent', 'runtut; padu', 'A coherent paragraph develops one main idea.'],
      ['comprehensive', 'menyeluruh', 'The report gives a comprehensive view of the problem.'],
      ['constrain', 'membatasi', 'Limited time constrains how much we can review.'],
      ['crucial', 'sangat penting', 'Sleep is crucial for memory.'],
      ['decline', 'menurun; penurunan', 'The number of visitors declined last year.'],
      ['derive', 'memperoleh; berasal dari', 'Many English words derive from Latin.'],
      ['diminish', 'berkurang; mengecil', 'The noise diminished as the bus moved away.'],
      ['emerge', 'muncul', 'A clear pattern emerged from the data.'],
      ['enhance', 'meningkatkan', 'Practice tests enhance exam confidence.'],
      ['evident', 'jelas; nyata', 'It was evident that she had studied hard.'],
      ['hypothesis', 'hipotesis; dugaan sementara', 'The experiment tested a simple hypothesis.'],
      ['imply', 'menyiratkan', 'His silence implied that he disagreed.'],
      ['inevitable', 'tak terelakkan', 'Mistakes are inevitable when you learn something new.'],
      ['infer', 'menyimpulkan', 'From the passage, we can infer that the writer is worried.'],
      ['mitigate', 'mengurangi (dampak)', 'Planting trees can mitigate flooding.'],
      ['notion', 'gagasan; pengertian', 'The notion that talent is fixed is misleading.'],
      ['obsolete', 'usang', 'Old phones quickly become obsolete.'],
      ['phenomenon', 'fenomena; gejala', 'Rainbows are a natural phenomenon.'],
      ['relevant', 'relevan; berkaitan', 'Only include relevant details in your summary.'],
      ['reluctant', 'enggan', 'He was reluctant to ask questions in class.'],
      ['scarce', 'langka', 'Clean water is scarce in some villages.'],
      ['subsequent', 'berikutnya', 'Subsequent studies confirmed the result.'],
      ['sustain', 'mempertahankan; menopang', 'Short daily sessions help you sustain motivation.'],
      ['underlying', 'mendasari', 'We need to find the underlying cause.'],
    ].map(([w, arti, contoh], i) => ({ id: 'en' + i, depan: w, belakang: arti, contoh })),
  },
  baku: {
    nama: 'Kata Baku (PBM)', s: 'pbm', kartu: [
      ['apotik / apotek?', 'apotek'], ['ijasah / ijazah?', 'ijazah'], ['resiko / risiko?', 'risiko'],
      ['kwalitas / kualitas?', 'kualitas'], ['analisa / analisis?', 'analisis'], ['praktek / praktik?', 'praktik'],
      ['sistim / sistem?', 'sistem'], ['nasehat / nasihat?', 'nasihat'], ['obyek / objek?', 'objek'],
      ['jadual / jadwal?', 'jadwal'], ['silahkan / silakan?', 'silakan'], ['merubah / mengubah?', 'mengubah'],
      ['ijin / izin?', 'izin'], ['hakekat / hakikat?', 'hakikat'], ['tauladan / teladan?', 'teladan'],
      ['frekwensi / frekuensi?', 'frekuensi'], ['karir / karier?', 'karier'], ['kwitansi / kuitansi?', 'kuitansi'],
      ['efektip / efektif?', 'efektif'], ['katagori / kategori?', 'kategori'],
    ].map(([d, b], i) => ({ id: 'bk' + i, depan: d, belakang: b + ' ✓' })),
  },
  rumus: {
    nama: 'Rumus & Logika (PK/PU)', s: 'pk', kartu: [
      ['Naik p% → pengali?', '× (1 + p/100). Contoh: naik 20% → × 1,2'],
      ['Turun p% → pengali?', '× (1 − p/100). Contoh: turun 20% → × 0,8'],
      ['Perubahan beruntun a% lalu b%', '(1 + a)(1 + b) − 1. Dikali, bukan dijumlah.'],
      ['Persen perubahan', '(baru − lama) ÷ lama × 100%'],
      ['Mencari nilai awal', 'nilai baru ÷ pengali'],
      ['1/8 = ... desimal = ... %', '0,125 = 12,5%'],
      ['Negasi “p dan q”', '~p atau ~q'],
      ['Negasi “p atau q”', '~p dan ~q'],
      ['Negasi “jika p maka q”', 'p dan ~q'],
      ['Kontraposisi p ⇒ q', '~q ⇒ ~p (setara)'],
      ['p ⇒ q setara dengan ...', '~p ∨ q (tidak p atau q)'],
      ['Negasi “semua A adalah B”', 'Ada A yang bukan B'],
      ['Modus tollens', 'p ⇒ q, ~q ∴ ~p'],
      ['“Hanya A yang B” =', 'Jika B, maka A'],
      ['Peluang kejadian A', 'n(A) ÷ n(S)'],
    ].map(([d, b], i) => ({ id: 'rm' + i, depan: d, belakang: b })),
  },
};

const LENCANA = [
  { id: 'langkah', nama: 'Langkah pertama', ket: 'Menyelesaikan satu anak tangga' },
  { id: 's7', nama: 'Seminggu penuh', ket: 'Streak 7 hari' },
  { id: 's30', nama: 'Sebulan tanpa putus', ket: 'Streak 30 hari' },
  { id: 's100', nama: 'Seratus hari', ket: 'Streak 100 hari' },
  { id: 'kuasai', nama: 'Benar-benar kuasai', ket: 'Satu anak tangga mencapai level Kuasai' },
  { id: 'puncak', nama: 'Sampai puncak', ket: 'Semua anak tangga dalam satu tangga minimal Cakap' },
  { id: 'soal100', nama: '100 soal', ket: 'Menjawab 100 soal' },
  { id: 'tryout', nama: 'Tryout pertama', ket: 'Menyelesaikan satu tryout mini' },
  { id: 'kata', nama: 'Penebak kata', ket: 'Menebak Kata Hari Ini' },
  { id: 'arsitek', nama: 'Arsitek tangga', ket: 'Membuat tangga baru bersama Kak Tangga' },
  { id: 'jujur', nama: 'Jujur pada diri', ket: 'Memperbarui penilaian diri' },
];
