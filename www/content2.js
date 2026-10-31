/* =====================================================================
   Tangga — konten tulisan tangan untuk PPU, LBI, LBE, dan PM
   (sebelumnya disusun AI; kini tersedia tanpa AI). Format sama dengan content.js.
   ===================================================================== */

/* ===================== PPU — Makna kata & ide pokok ===================== */

A('ppu1', 'ppu', 'Sinonim & makna kata', 'Menemukan kata yang paling dekat maknanya.', [], {
  hook: 'Soal PPU sering menanyakan ==kata yang paling dekat maknanya==. Kosakata yang luas = poin cepat dalam hitungan detik.',
  jelas: {
    analogi: 'Sinonim itu seperti dua kunci yang membuka pintu yang sama: bentuknya berbeda, fungsinya sama. “Cerdas” dan “pandai” membuka pintu yang sama.\n\nHati-hati dengan kunci yang **mirip tapi tidak pas**: “cerdik” lebih dekat ke ‘pintar mengakali’, bukan sekadar pandai.',
    langkah: [
      'Pahami dulu arti kata soal. Kalau ragu, buat kalimat contoh dengan kata itu.',
      'Ganti kata itu dengan tiap pilihan di dalam kalimatmu.',
      'Pilih yang maknanya tetap sama dan kalimatnya terasa wajar.',
      'Waspadai pengecoh: kata yang bunyinya mirip atau satu tema, tetapi maknanya berbeda.',
    ],
    cerita: 'Gurumu menulis: “Penjelasannya lugas.” Kamu ragu arti ‘lugas’. Coba ganti: “Penjelasannya **apa adanya**” — masuk akal. “Penjelasannya **rumit**” — maknanya berubah total. Jadi sinonim lugas: apa adanya, tidak berbelit-belit.',
    singkat: 'Sinonim = kata berbeda, makna sama atau sangat mirip. Uji dengan substitusi: masukkan pilihan ke kalimat, maknanya harus tetap.',
  },
  contoh: {
    soal: 'Sinonim kata “hakiki” adalah ...',
    langkah: ['Buat kalimat: “Kebahagiaan hakiki datang dari dalam diri.”', 'Ganti dengan ‘sejati’: “Kebahagiaan sejati datang dari dalam diri.” Maknanya tetap.', 'Jadi sinonim “hakiki” = **sejati** (yang sebenarnya).'],
    jawab: 'sejati',
  },
  rumpang: {
    soal: 'Sinonim kata “gigih” adalah ...',
    langkah: ['Kalimat contoh: “Ia gigih belajar meski sempat gagal.”', 'Kata pengganti yang maknanya tetap: “Ia ___ belajar meski sempat gagal.”'],
    kosong: 'ulet', pilihan: ['ulet', 'malas', 'gesit', 'ragu'],
  },
  latihan: [
    { t: 'Sinonim kata “pakar” adalah ...', o: ['ahli', 'pemula', 'pengamat', 'pelajar', 'pemimpin'], k: 0, d: 1, b: 'Pakar = orang yang ahli di suatu bidang.' },
    { t: 'Sinonim kata “resah” adalah ...', o: ['gelisah', 'gembira', 'tenang', 'marah', 'lelah'], k: 0, d: 1, b: 'Resah = gelisah, tidak tenang.' },
    { t: 'Kata yang paling dekat maknanya dengan “nisbi” adalah ...', o: ['mutlak', 'relatif', 'pasti', 'tetap', 'sempurna'], k: 1, d: 2, b: 'Nisbi = relatif, tidak mutlak. “Mutlak” justru lawan katanya.' },
    { t: 'Kata yang paling dekat maknanya dengan “kendala” adalah ...', o: ['hambatan', 'tujuan', 'peluang', 'bantuan', 'rencana'], k: 0, d: 2, b: 'Kendala = hambatan, halangan.' },
  ],
  uji: [
    { t: 'Sinonim kata “sahih” adalah ...', o: ['sah', 'salah', 'samar', 'lemah', 'baru'], k: 0, d: 2, b: 'Sahih = sah, benar, dapat dipercaya.' },
    { t: 'Kata yang paling dekat maknanya dengan “lazim” adalah ...', o: ['langka', 'umum', 'aneh', 'resmi', 'mahal'], k: 1, d: 2, b: 'Lazim = sudah biasa, umum.' },
    { t: 'Sinonim kata “prakarsa” adalah ...', o: ['inisiatif', 'hasil', 'hambatan', 'tujuan', 'keputusan'], k: 0, d: 3, b: 'Prakarsa = inisiatif, usaha untuk memulai sesuatu.' },
  ],
});

A('ppu2', 'ppu', 'Antonim', 'Menemukan lawan kata yang tepat.', ['ppu1'], {
  hook: 'Antonim menguji apakah kamu tahu makna kata sampai ke ==kebalikannya==. Soalnya sering muncul berdampingan dengan sinonim.',
  jelas: {
    analogi: 'Antonim itu seperti dua ujung jungkat-jungkit: kalau satu ujung naik, ujung lain turun. “Mutlak” dan “nisbi” duduk di dua ujung yang berlawanan.\n\nKata yang hanya **berbeda** (seperti “mutlak” dan “kecil”) tidak duduk di jungkat-jungkit yang sama.',
    langkah: [
      'Tentukan dulu makna kata soal (cari sinonimnya di kepala).',
      'Pikirkan kebalikan dari makna itu.',
      'Pilih jawaban yang berlawanan dalam hal yang sama, bukan sekadar berbeda.',
      'Hati-hati: pengecoh sering berupa sinonim kata soal.',
    ],
    cerita: 'Temanmu bilang tugasnya ‘rumit’. Lawannya bukan ‘pendek’ — tugas pendek bisa saja rumit. Lawan ‘rumit’ adalah **sederhana**, karena keduanya membicarakan hal yang sama: tingkat kesulitan.',
    singkat: 'Antonim = lawan kata dalam aspek yang sama. Cari makna dulu, lalu balikkan. Coret pilihan yang justru sinonimnya.',
  },
  contoh: {
    soal: 'Antonim kata “boros” adalah ...',
    langkah: ['Makna boros: menghabiskan uang atau barang secara berlebihan.', 'Kebalikannya: tidak berlebihan dalam membelanjakan.', 'Antonim: **hemat**.'],
    jawab: 'hemat',
  },
  rumpang: {
    soal: 'Antonim kata “statis” adalah ...',
    langkah: ['Statis artinya diam, tidak bergerak atau berubah.', 'Kebalikannya: bergerak, terus berubah → ___.'],
    kosong: 'dinamis', pilihan: ['dinamis', 'stabil', 'tetap', 'pasif'],
  },
  latihan: [
    { t: 'Antonim kata “fana” adalah ...', o: ['sementara', 'abadi', 'rapuh', 'indah', 'nyata'], k: 1, d: 1, b: 'Fana (tidak kekal) berlawanan dengan abadi (kekal). “Sementara” justru sinonimnya.', x: { 0: 'ppu1' } },
    { t: 'Antonim kata “optimis” adalah ...', o: ['yakin', 'pesimis', 'semangat', 'realistis', 'gembira'], k: 1, d: 1, b: 'Optimis (berpengharapan baik) berlawanan dengan pesimis.' },
    { t: 'Antonim kata “konkret” adalah ...', o: ['nyata', 'abstrak', 'jelas', 'padat', 'keras'], k: 1, d: 2, b: 'Konkret = nyata, berwujud; lawannya abstrak.', x: { 0: 'ppu1' } },
    { t: 'Antonim kata “eksklusif” adalah ...', o: ['inklusif', 'istimewa', 'terbatas', 'mewah', 'khusus'], k: 0, d: 2, b: 'Eksklusif (khusus untuk kalangan tertentu) berlawanan dengan inklusif (terbuka, mencakup semua). Pilihan lain justru dekat maknanya dengan eksklusif.' },
  ],
  uji: [
    { t: 'Antonim kata “mayoritas” adalah ...', o: ['minoritas', 'kebanyakan', 'semua', 'populasi', 'separuh'], k: 0, d: 2, b: 'Mayoritas (bagian terbesar) berlawanan dengan minoritas (bagian terkecil).' },
    { t: 'Antonim kata “sinkron” adalah ...', o: ['selaras', 'serentak', 'tidak serentak', 'sejalan', 'seimbang'], k: 2, d: 2, b: 'Sinkron = serentak, selaras waktunya. Pilihan lain justru sinonimnya.', x: { 0: 'ppu1', 1: 'ppu1' } },
    { t: 'Antonim kata “apatis” adalah ...', o: ['acuh', 'peduli', 'malas', 'pasif', 'diam'], k: 1, d: 3, b: 'Apatis = acuh tak acuh, tidak peduli; lawannya peduli.' },
  ],
});

A('ppu3', 'ppu', 'Makna kata dalam konteks', 'Arti kata bisa berubah sesuai kalimatnya.', ['ppu1'], {
  hook: 'Satu kata bisa punya banyak arti. UTBK sering menanyakan ==makna kata di kalimat tertentu==, bukan arti kamus yang paling umum.',
  jelas: {
    analogi: 'Kata itu seperti bunglon: warnanya menyesuaikan dahan tempat ia hinggap. “Bunga” di taman berarti tumbuhan; “bunga” di bank berarti tambahan uang pinjaman.\n\nLihat **dahannya** (kalimatnya) untuk tahu warnanya.',
    langkah: [
      'Baca kalimat lengkapnya, jangan hanya katanya.',
      'Tutup kata itu, lalu tebak kata apa yang pas di posisinya.',
      'Bandingkan tebakanmu dengan pilihan jawaban.',
      'Cek ulang: masukkan jawaban ke kalimat — maknanya harus tetap utuh.',
    ],
    cerita: 'Di grup kelas: “Nilai ujianku **jatuh** minggu ini.” ‘Jatuh’ di sini bukan terjatuh dari tempat tinggi, melainkan ‘turun’. Kata ‘nilai’ yang menentukan maknanya.',
    singkat: 'Makna kontekstual = makna kata menurut kalimatnya. Tutup kata itu, tebak penggantinya, lalu cocokkan.',
  },
  contoh: {
    soal: '“Pemerintah akan **menekan** angka pengangguran.” Makna kata menekan adalah ...',
    langkah: ['Konteks: angka pengangguran — sesuatu yang ingin dibuat kecil.', 'Tebakan pengganti: ‘mengurangi’.', 'Jadi menekan = **mengurangi**, bukan mendorong dengan tangan.'],
    jawab: 'mengurangi',
  },
  rumpang: {
    soal: '“Ia **mengantongi** izin dari sekolah.” Makna kata mengantongi adalah ...',
    langkah: ['Konteks: izin — sesuatu yang didapat, bukan benda yang dimasukkan ke saku.', 'Pengganti yang pas: “Ia ___ izin dari sekolah.”'],
    kosong: 'memperoleh', pilihan: ['memperoleh', 'menyembunyikan', 'menyimpan di saku', 'meminta'],
  },
  latihan: [
    { t: '“Harga cabai **melambung** menjelang Lebaran.” Makna kata melambung adalah ...', o: ['naik tinggi', 'terbang', 'memantul', 'turun', 'tetap'], k: 0, d: 1, b: 'Dalam konteks harga, melambung = naik tinggi.' },
    { t: '“Rapat itu **alot** karena banyak perbedaan pendapat.” Makna kata alot adalah ...', o: ['sulit mencapai kesepakatan', 'berjalan dengan sangat keras', 'selesai dalam waktu singkat', 'ramai dihadiri banyak orang', 'tertunda sampai minggu depan'], k: 0, d: 2, b: 'Alot aslinya ‘liat, sukar dikunyah’; dalam konteks rapat berarti sulit mencapai kesepakatan.' },
    { t: '“Ide itu masih **mentah** dan perlu dikembangkan.” Makna kata mentah adalah ...', o: ['belum matang', 'tidak dimasak', 'sangat bagus', 'sudah lama', 'terlalu mahal'], k: 0, d: 2, b: 'Untuk ide, mentah = belum dipikirkan dengan matang.' },
    { t: '“Kebijakan baru itu **menuai** kritik.” Makna kata menuai adalah ...', o: ['mendapat', 'memotong padi', 'menghindari', 'menjawab', 'menyebarkan'], k: 0, d: 3, b: 'Menuai aslinya memotong padi; dalam konteks ini berarti mendapat (hasil atau akibat).' },
  ],
  uji: [
    { t: '“Tim kami **tumbang** di babak semifinal.” Makna kata tumbang adalah ...', o: ['kalah', 'roboh ke tanah', 'mundur', 'menang', 'cedera'], k: 0, d: 2, b: 'Dalam konteks pertandingan, tumbang = kalah.' },
    { t: '“Kasus itu kini **mencuat** ke publik.” Makna kata mencuat adalah ...', o: ['muncul ke permukaan', 'tenggelam', 'selesai', 'hilang', 'disembunyikan'], k: 0, d: 2, b: 'Mencuat = menonjol, muncul dan menjadi perhatian.' },
    { t: '“Biaya pendidikan yang tinggi **membebani** keluarga.” Makna kata membebani adalah ...', o: ['memberatkan', 'mengangkat', 'mendukung', 'membiayai', 'menguntungkan'], k: 0, d: 3, b: 'Membebani = memberatkan, menjadi tanggungan yang berat.' },
  ],
});

A('ppu4', 'ppu', 'Ide pokok paragraf', 'Menemukan gagasan utama sebuah paragraf.', ['ppu3'], {
  hook: 'Hampir semua soal bacaan dimulai dari satu pertanyaan: ==apa ide pokoknya?== Ide pokok adalah peta untuk menjawab soal lainnya.',
  jelas: {
    analogi: 'Paragraf itu seperti payung: ide pokok adalah kain payungnya, kalimat penjelas adalah jari-jari yang menopangnya. Semua jari-jari mengarah ke satu payung.\n\nCari kalimat yang **dipayungi** kalimat lain.',
    langkah: [
      'Baca seluruh paragraf sekali.',
      'Cek kalimat pertama dan terakhir — ide pokok paling sering ada di sana (paragraf deduktif atau induktif).',
      'Uji: apakah kalimat lain menjelaskan, memberi contoh, atau alasan untuk kalimat itu?',
      'Jika tidak ada satu kalimat yang memayungi, rangkum sendiri dalam satu kalimat.',
    ],
    cerita: '“Sarapan penting bagi pelajar. Sarapan memberi energi untuk berpikir. Siswa yang sarapan lebih mudah fokus. Mereka juga tidak cepat lapar saat pelajaran.” Kalimat 2–4 menjelaskan kalimat 1. Ide pokok: **sarapan penting bagi pelajar**.',
    singkat: 'Ide pokok = gagasan yang dijelaskan kalimat-kalimat lain. Cek kalimat pertama/terakhir; uji apakah kalimat lain mendukungnya. Waspadai kata “namun”.',
  },
  contoh: {
    soal: '“Banyak siswa mengeluh sulit tidur. Mereka bermain gawai hingga larut. Cahaya layar menunda rasa kantuk. Akibatnya, mereka bangun dengan badan lelah. Kebiasaan bermain gawai sebelum tidur ternyata merugikan kesehatan.” Apa ide pokoknya?',
    langkah: ['Kalimat 1–4 berisi rincian: sulit tidur, main gawai, cahaya layar, bangun lelah.', 'Kalimat terakhir menyimpulkan semuanya.', 'Ide pokok (paragraf induktif): **bermain gawai sebelum tidur merugikan kesehatan**.'],
    jawab: 'Bermain gawai sebelum tidur merugikan kesehatan.',
  },
  rumpang: {
    soal: '“(1) Perpustakaan sekolah kini lebih ramai. (2) Ruangannya diberi pendingin udara. (3) Koleksi novel ditambah. (4) Ada pula sudut diskusi yang nyaman.” Ide pokoknya ada di kalimat ke-...',
    langkah: ['Kalimat 2–4 adalah alasan mengapa perpustakaan ramai.', 'Jadi ide pokok ada di kalimat ke-___ (paragraf deduktif).'],
    kosong: '1', pilihan: ['1', '2', '3', '4'],
  },
  latihan: [
    { p: '(1) Bahasa daerah di Indonesia terancam punah. (2) Banyak orang tua tidak lagi mengajarkannya kepada anak. (3) Anak-anak lebih sering memakai bahasa Indonesia atau bahasa asing. (4) Penutur aslinya pun semakin berkurang setiap tahun.', t: 'Ide pokok paragraf tersebut adalah ...', o: ['Bahasa daerah di Indonesia terancam punah.', 'Orang tua tidak mengajarkan bahasa daerah.', 'Anak-anak lebih suka bahasa asing.', 'Penutur asli bahasa daerah berkurang.', 'Bahasa Indonesia makin populer.'], k: 0, d: 1, b: 'Kalimat (2)–(4) adalah alasan atau bukti untuk kalimat (1). Ide pokok ada di kalimat pertama (paragraf deduktif).' },
    { p: '(1) Bahasa daerah di Indonesia terancam punah. (2) Banyak orang tua tidak lagi mengajarkannya kepada anak. (3) Anak-anak lebih sering memakai bahasa Indonesia atau bahasa asing. (4) Penutur aslinya pun semakin berkurang setiap tahun.', t: 'Kalimat penjelas dalam paragraf tersebut adalah ...', o: ['kalimat (1) saja', 'kalimat (1) dan (2)', 'kalimat (2), (3), dan (4)', 'kalimat (4) saja', 'semua kalimat'], k: 2, d: 2, b: 'Kalimat (2)–(4) menjelaskan mengapa bahasa daerah terancam punah.' },
    { p: 'Petani di desa itu mulai memakai pupuk organik. Mereka mengolah kotoran ternak dan sisa panen menjadi kompos. Biaya pupuk turun hampir separuh. Tanah pun menjadi lebih gembur. Dengan cara ini, petani mendapat dua keuntungan sekaligus: hemat biaya dan tanah lebih subur.', t: 'Ide pokok paragraf tersebut adalah ...', o: ['Petani mengolah kotoran ternak dan sisa panen menjadi kompos.', 'Pupuk organik membuat petani hemat biaya dan tanahnya lebih subur.', 'Biaya pupuk yang dikeluarkan petani turun hampir separuh.', 'Tanah di desa itu menjadi lebih gembur dari sebelumnya.', 'Petani di desa itu kini bisa panen dua kali dalam setahun.'], k: 1, d: 2, b: 'Kalimat terakhir merangkum rincian sebelumnya (paragraf induktif).' },
    { p: 'Belajar kelompok sering dianggap membuang waktu karena banyak bercanda. Namun, jika diatur dengan baik, belajar kelompok justru efektif. Setiap anggota bisa menjelaskan materi yang ia kuasai. Kesalahan pemahaman juga lebih cepat ketahuan karena dibahas bersama.', t: 'Ide pokok paragraf tersebut adalah ...', o: ['Belajar kelompok membuang waktu.', 'Belajar kelompok yang diatur dengan baik justru efektif.', 'Anggota kelompok suka bercanda.', 'Setiap anggota harus menguasai materi.', 'Kesalahan pemahaman sering terjadi.'], k: 1, d: 3, b: 'Kalimat pertama hanya anggapan umum yang dibantah oleh “Namun”. Ide pokok ada di kalimat kedua dan didukung kalimat 3–4.', h: 'Perhatikan kata “Namun”.' },
  ],
  uji: [
    { p: 'Membaca buku cetak masih punya keunggulan. Pembaca cenderung lebih fokus karena tidak terganggu notifikasi. Halaman fisik juga membantu mengingat letak informasi. Selain itu, mata tidak cepat lelah karena tidak menatap layar bercahaya.', t: 'Ide pokok paragraf tersebut adalah ...', o: ['Membaca buku cetak masih punya keunggulan.', 'Notifikasi mengganggu pembaca.', 'Halaman fisik membantu mengingat.', 'Layar bercahaya melelahkan mata.', 'Buku digital lebih praktis.'], k: 0, d: 2, b: 'Kalimat 2–4 merinci keunggulan yang disebut di kalimat 1.' },
    { p: '(1) Sungai di kampung itu dulu jernih. (2) Kini airnya keruh dan berbau. (3) Warga membuang sampah rumah tangga ke sungai. (4) Sebuah pabrik juga mengalirkan limbahnya tanpa diolah. (5) Pencemaran sungai itu disebabkan oleh ulah manusia sendiri.', t: 'Ide pokok paragraf tersebut terletak pada kalimat ...', o: ['(1)', '(2)', '(3)', '(4)', '(5)'], k: 4, d: 2, b: 'Kalimat (5) menyimpulkan kalimat-kalimat sebelumnya (paragraf induktif).' },
    { p: 'Di kota besar, makin banyak warga bersepeda ke kantor. Jalur khusus sepeda mulai dibangun di jalan utama. Beberapa kantor menyediakan tempat parkir dan kamar mandi untuk pesepeda. Bahkan, ada perusahaan yang memberi insentif bagi karyawan yang tidak membawa mobil.', t: 'Gagasan utama paragraf tersebut adalah ...', o: ['Bersepeda ke kantor makin didukung di kota besar.', 'Jalur sepeda dibangun di jalan utama.', 'Kantor menyediakan kamar mandi.', 'Perusahaan memberi insentif uang.', 'Mobil dilarang di kota besar.'], k: 0, d: 3, b: 'Semua kalimat menunjukkan dukungan terhadap kebiasaan bersepeda ke kantor; ide pokok perlu dirangkum. Pilihan lain hanya satu rincian.' },
  ],
});

A('ppu5', 'ppu', 'Hubungan antarparagraf', 'Memahami bagaimana paragraf saling terhubung.', ['ppu4'], {
  hook: 'Soal bacaan panjang sering bertanya ==bagaimana paragraf kedua berhubungan dengan paragraf pertama==: menjelaskan, membantah, memberi contoh, atau menyimpulkan?',
  jelas: {
    analogi: 'Paragraf dalam teks itu seperti gerbong kereta: tiap gerbong punya isi sendiri, tapi dihubungkan oleh sambungan. Kata penghubung seperti “namun”, “oleh karena itu”, dan “misalnya” adalah sambungannya — dan sambungan itu memberi tahu **arah perjalanan**.',
    langkah: [
      'Tentukan ide pokok tiap paragraf dalam satu kalimat pendek.',
      'Lihat kata penghubung di awal paragraf berikutnya.',
      '“Namun/sebaliknya” = pertentangan; “misalnya/contohnya” = contoh; “oleh karena itu/jadi/akibatnya” = akibat atau simpulan; “selain itu” = tambahan.',
      'Jika tidak ada penghubung, bandingkan kedua ide pokok: memperluas, membantah, atau sebab-akibat?',
    ],
    cerita: 'Paragraf 1: “Banyak sekolah melarang ponsel di kelas.” Paragraf 2: “**Namun**, beberapa guru justru memakai ponsel untuk kuis daring.” Kata ‘namun’ menandakan paragraf 2 **mempertentangkan** paragraf 1.',
    singkat: 'Lihat penghubung (namun = pertentangan, misalnya = contoh, oleh karena itu = akibat/simpulan, selain itu = tambahan), lalu bandingkan ide pokok kedua paragraf.',
  },
  contoh: {
    soal: 'Paragraf 1 menjelaskan penyebab banjir di sebuah kota. Paragraf 2 diawali “Oleh karena itu, pemerintah membangun waduk dan memperbaiki saluran air.” Hubungan paragraf 2 dengan paragraf 1 adalah ...',
    langkah: ['Ide pokok paragraf 1: penyebab banjir.', 'Penghubung paragraf 2: “oleh karena itu” → tindak lanjut/akibat.', 'Jadi paragraf 2 berisi **solusi atau tindak lanjut** dari masalah di paragraf 1.'],
    jawab: 'Paragraf 2 menyajikan tindak lanjut (solusi) atas masalah di paragraf 1.',
  },
  rumpang: {
    soal: 'Paragraf 2 diawali “Misalnya, siswa yang tidur cukup lebih mudah mengingat pelajaran.” Hubungannya dengan paragraf 1 adalah ...',
    langkah: ['Kata penghubungnya: “misalnya”.', 'Jadi paragraf 2 memberi ___ untuk paragraf 1.'],
    kosong: 'contoh', pilihan: ['contoh', 'bantahan', 'simpulan', 'pertanyaan'],
  },
  latihan: [
    { t: 'Paragraf 2 diawali dengan “Sebaliknya, ...”. Paragraf 2 kemungkinan besar ...', o: ['mempertentangkan isi paragraf 1', 'memberi contoh untuk paragraf 1', 'mengulang paragraf 1', 'menyimpulkan paragraf 1', 'tidak berhubungan dengan paragraf 1'], k: 0, d: 1, b: '“Sebaliknya” menandai pertentangan.' },
    { t: 'Paragraf 1 membahas manfaat olahraga bagi jantung. Paragraf 2 diawali “Selain itu, olahraga juga memperbaiki suasana hati.” Hubungan kedua paragraf adalah ...', o: ['paragraf 2 menambahkan manfaat lain', 'paragraf 2 membantah paragraf 1', 'paragraf 2 memberi contoh paragraf 1', 'paragraf 2 adalah akibat paragraf 1', 'paragraf 2 menyimpulkan paragraf 1'], k: 0, d: 2, b: '“Selain itu” menandai tambahan informasi yang sejenis.' },
    { p: '(Paragraf 1) Harga minyak goreng naik tajam bulan lalu karena pasokan kelapa sawit berkurang. (Paragraf 2) Akibatnya, banyak pedagang gorengan menaikkan harga atau mengecilkan ukuran dagangannya.', t: 'Hubungan paragraf 2 dengan paragraf 1 adalah ...', o: ['sebab–akibat: paragraf 2 berisi dampak dari paragraf 1', 'pertentangan', 'paragraf 2 memberi contoh penyebab', 'paragraf 2 mengulang isi paragraf 1', 'paragraf 2 berisi solusi pemerintah'], k: 0, d: 2, b: '“Akibatnya” menandai bahwa paragraf 2 berisi dampak kenaikan harga di paragraf 1.' },
    { p: '(Paragraf 1) Sebagian orang menganggap gim daring hanya membuang waktu. (Paragraf 2) Penelitian menunjukkan beberapa gim strategi dapat melatih kemampuan memecahkan masalah. Meski begitu, waktu bermain tetap perlu dibatasi.', t: 'Fungsi paragraf 2 terhadap paragraf 1 adalah ...', o: ['menyanggah sebagian anggapan di paragraf 1 dengan hasil penelitian', 'mendukung sepenuhnya anggapan di paragraf 1 dengan data', 'memberi contoh gim yang paling banyak membuang waktu', 'menyimpulkan bahwa gim daring sebaiknya dilarang', 'mengulang pendapat paragraf 1 dengan kata-kata lain'], k: 0, d: 3, b: 'Paragraf 2 menghadirkan temuan yang bertentangan dengan anggapan di paragraf 1, lalu menambahkan batasan — jadi menyanggah sebagian, bukan sepenuhnya.', x: { 1: 'ppu4' } },
  ],
  uji: [
    { t: 'Paragraf 1 menjelaskan langkah-langkah membuat kompos. Paragraf 2 diawali “Jadi, dengan sedikit usaha, sampah dapur bisa menjadi pupuk yang berguna.” Paragraf 2 berfungsi sebagai ...', o: ['simpulan', 'pertentangan', 'contoh', 'pertanyaan baru', 'pengantar'], k: 0, d: 2, b: '“Jadi” menandai simpulan.' },
    { p: '(Paragraf 1) Pemerintah daerah menggratiskan bus sekolah. (Paragraf 2) Contohnya, di Kecamatan Sukamaju kini ada lima rute bus yang melayani 1.200 siswa setiap hari.', t: 'Hubungan paragraf 2 dengan paragraf 1 adalah ...', o: ['paragraf 2 memberi contoh penerapan kebijakan di paragraf 1', 'paragraf 2 membantah paragraf 1', 'paragraf 2 adalah penyebab paragraf 1', 'paragraf 2 menyimpulkan paragraf 1', 'keduanya tidak berhubungan'], k: 0, d: 2, b: '“Contohnya” menandai bahwa paragraf 2 berisi contoh nyata kebijakan di paragraf 1.' },
    { p: '(Paragraf 1) Kota itu membangun taman di setiap kelurahan. (Paragraf 2) Sejak taman dibuka, warga lebih sering berolahraga pagi dan anak-anak punya tempat bermain yang aman. (Paragraf 3) Karena itu, kota lain mulai meniru program yang sama.', t: 'Hubungan paragraf 2 dan paragraf 3 adalah ...', o: ['paragraf 3 berisi akibat lanjutan dari manfaat di paragraf 2', 'paragraf 3 membantah manfaat yang disebut di paragraf 2', 'paragraf 3 memberi contoh lain untuk isi paragraf 2', 'paragraf 2 dan 3 saling bertentangan tentang taman', 'paragraf 3 hanya mengulang informasi dari paragraf 1'], k: 0, d: 3, b: 'Paragraf 2 menunjukkan manfaat taman; “karena itu” di paragraf 3 menandai akibat lanjutan dari manfaat tersebut.' },
  ],
});

/* ===================== LBI — Membaca teks panjang ===================== */

const P_KOP = 'Koperasi siswa SMA Harapan didirikan pada 2018 dengan modal awal Rp2 juta dari iuran 40 siswa. Awalnya koperasi hanya menjual alat tulis. Sejak 2021, koperasi juga menjual makanan ringan sehat dan menerima titipan kue dari orang tua siswa. Keuntungan tahun lalu mencapai Rp15 juta; sepertiganya dipakai untuk beasiswa siswa kurang mampu.';
const P_PUS = 'Perpustakaan Daerah membuka layanan baru mulai 1 Agustus. Warga bisa meminjam hingga 5 buku selama 14 hari dengan menunjukkan KTP. Pelajar yang belum punya KTP cukup membawa kartu pelajar. Keterlambatan pengembalian dikenai denda Rp500 per buku per hari. Layanan buka Senin–Sabtu pukul 08.00–16.00.';
A('lbi1', 'lbi', 'Membaca cepat: mencari informasi', 'Teknik memindai teks untuk menemukan informasi tertentu.', [], {
  hook: 'Teks Literasi bisa panjang, tetapi soalnya sering menanyakan ==satu informasi spesifik==. Memindai (scanning) menghemat banyak waktu.',
  jelas: {
    analogi: 'Memindai teks itu seperti mencari namamu di daftar pengumuman kelulusan: kamu tidak membaca setiap nama, matamu meloncat mencari huruf awal yang cocok.\n\nDi teks, ‘huruf awal’-nya adalah **kata kunci** dari soal: angka, nama, tahun, atau istilah.',
    langkah: [
      'Baca soalnya dulu dan lingkari kata kunci (angka, nama, tahun, istilah).',
      'Pindai teks untuk mencari kata kunci itu atau sinonimnya — jangan baca semua kata.',
      'Setelah ketemu, baca juga satu kalimat sebelum dan sesudahnya.',
      'Cocokkan dengan pilihan: hati-hati dengan pilihan yang memakai kata dari teks tetapi maknanya diubah.',
    ],
    cerita: 'Soal bertanya: “Kapan program itu dimulai?” Kamu mencari angka tahun dan menemukan “sejak 2019”. Ternyata 2019 adalah tahun uji coba; program resmi dimulai 2021 di kalimat berikutnya. Karena itu, **baca juga kalimat di sekitarnya**!',
    singkat: 'Soal dulu → kata kunci → pindai → baca kalimat di sekitarnya → cocokkan makna, bukan sekadar kata.',
  },
  contoh: {
    soal: 'Teks: “Festival buku tahunan di kota itu digelar pada 12–14 Juli. Tahun ini panitia menargetkan 5.000 pengunjung, naik dari 3.200 pengunjung tahun lalu.” Berapa pengunjung tahun lalu?',
    langkah: ['Kata kunci: “tahun lalu”.', 'Pindai: frasa “tahun lalu” ada di akhir kalimat kedua.', 'Angka di dekatnya: **3.200** (5.000 adalah target tahun ini — pengecoh).'],
    jawab: '3.200 pengunjung',
  },
  rumpang: {
    soal: 'Teks: “Bus kampus beroperasi setiap 15 menit pada hari kerja, sedangkan pada akhir pekan setiap 30 menit.” Seberapa sering bus beroperasi pada hari Sabtu?',
    langkah: ['Kata kunci: hari Sabtu → termasuk akhir pekan.', 'Jawabannya: setiap ___ menit.'],
    kosong: '30', pilihan: ['30', '15', '45', '60'],
  },
  latihan: [
    { p: P_KOP, t: 'Koperasi siswa didirikan pada tahun ...', o: ['2018', '2021', '2019', '2020', '2015'], k: 0, d: 1, b: 'Kalimat pertama: “didirikan pada 2018”. Tahun 2021 adalah saat koperasi mulai menjual makanan.' },
    { p: P_KOP, t: 'Berapa siswa yang menyumbang modal awal?', o: ['40', '20', '15', '2', '30'], k: 0, d: 1, b: '“iuran 40 siswa”.' },
    { p: P_KOP, t: 'Berapa keuntungan tahun lalu yang dipakai untuk beasiswa?', o: ['Rp5 juta', 'Rp15 juta', 'Rp2 juta', 'Rp7,5 juta', 'Rp10 juta'], k: 0, d: 2, b: 'Sepertiga dari Rp15 juta = Rp5 juta. Informasinya digabung dengan sedikit hitungan.' },
    { p: P_KOP, t: 'Pernyataan yang SESUAI dengan teks adalah ...', o: ['Sejak awal koperasi sudah menjual makanan ringan.', 'Koperasi menerima titipan kue dari orang tua siswa.', 'Modal awal koperasi berasal dari sekolah.', 'Seluruh keuntungan dipakai untuk beasiswa.', 'Koperasi didirikan oleh guru.'], k: 1, d: 2, b: 'Teks menyebut koperasi menerima titipan kue sejak 2021. Pilihan lain bertentangan dengan teks.' },
  ],
  uji: [
    { p: P_PUS, t: 'Berapa lama masa pinjam buku?', o: ['14 hari', '5 hari', '7 hari', '30 hari', 'sampai 1 Agustus'], k: 0, d: 2, b: '“meminjam hingga 5 buku selama 14 hari”.' },
    { p: P_PUS, t: 'Seorang pelajar terlambat mengembalikan 2 buku selama 3 hari. Dendanya adalah ...', o: ['Rp3.000', 'Rp1.500', 'Rp1.000', 'Rp500', 'Rp6.000'], k: 0, d: 2, b: 'Rp500 × 2 buku × 3 hari = Rp3.000.' },
    { p: P_PUS, t: 'Pernyataan yang TIDAK sesuai dengan teks adalah ...', o: ['Layanan buka setiap hari, termasuk Minggu.', 'Pelajar boleh memakai kartu pelajar.', 'Denda dihitung per buku per hari.', 'Warga dapat meminjam hingga 5 buku.', 'Layanan baru dimulai 1 Agustus.'], k: 0, d: 3, b: 'Teks menyebut layanan buka Senin–Sabtu, jadi tidak buka hari Minggu.' },
  ],
});

const P_BACA = 'Kebiasaan membaca anak bisa tumbuh dari rumah. Orang tua yang sering membaca di depan anak memberi contoh nyata. Rumah yang menyediakan rak buku kecil di ruang keluarga membuat buku mudah dijangkau. Kegiatan membacakan cerita sebelum tidur juga membangun ikatan emosional sekaligus memperkaya kosakata anak. Dengan langkah-langkah sederhana ini, keluarga berperan besar dalam menumbuhkan minat baca.';
const P_TANAH = 'Banyak kota pesisir di Indonesia mengalami penurunan muka tanah. Penyebab utamanya adalah pengambilan air tanah secara berlebihan untuk rumah tangga dan industri. Ketika air di bawah tanah disedot terus-menerus, lapisan tanah memadat dan permukaannya turun. Akibatnya, banjir rob makin sering terjadi. Penyediaan air perpipaan yang cukup dinilai sebagai salah satu cara mengurangi ketergantungan pada air tanah.';
A('lbi2', 'lbi', 'Ide pokok & gagasan pendukung', 'Membedakan gagasan utama dari rincian pendukung.', ['lbi1'], {
  hook: 'Di teks Literasi yang panjang, kamu perlu membedakan ==gagasan utama== dari rincian pendukung. Banyak pengecoh berupa rincian yang benar, tetapi bukan gagasan utama.',
  jelas: {
    analogi: 'Bayangkan sebuah rumah: gagasan utama adalah atapnya, gagasan pendukung adalah tiang-tiangnya. Tiang itu nyata dan penting, tapi kalau ditanya ‘ini rumah apa?’, jawabannya dilihat dari **keseluruhan atap**, bukan dari satu tiang.',
    langkah: [
      'Baca judul (jika ada) dan kalimat pertama tiap paragraf.',
      'Tanyakan: secara keseluruhan teks ini membahas apa?',
      'Tandai rincian — angka, contoh, nama, alasan. Itu gagasan pendukung.',
      'Pilih jawaban yang mencakup seluruh teks, bukan hanya satu bagian.',
    ],
    cerita: 'Teks tentang sampah plastik di laut memuat data jumlah sampah, contoh hewan yang terdampak, dan usulan solusi. Pilihan ‘Penyu sering terjerat plastik’ benar menurut teks, tetapi itu satu tiang saja. Gagasan utamanya: **sampah plastik mengancam kehidupan laut dan perlu ditangani**.',
    singkat: 'Gagasan utama mencakup seluruh teks; gagasan pendukung = data, contoh, alasan. Pengecoh favorit: rincian yang benar tetapi terlalu sempit.',
  },
  contoh: {
    soal: 'Sebuah teks memuat: (1) pengguna transportasi umum naik 30%, (2) pemerintah menambah 50 bus listrik, (3) kemacetan di jalan utama berkurang. Gagasan utama yang paling tepat adalah ...',
    langkah: ['Ketiga rincian membicarakan perbaikan transportasi umum dan dampaknya.', '‘Pemerintah menambah 50 bus’ hanya satu rincian.', 'Gagasan utama: **perbaikan transportasi umum menambah penggunanya dan mengurangi kemacetan**.'],
    jawab: 'Perbaikan transportasi umum menambah pengguna dan mengurangi kemacetan.',
  },
  rumpang: {
    soal: 'Dalam teks tentang manfaat menabung sejak remaja, kalimat “Rina menabung Rp10.000 setiap minggu” berfungsi sebagai ...',
    langkah: ['Kalimat itu berisi contoh konkret.', 'Jadi kalimat itu adalah gagasan ___.'],
    kosong: 'pendukung', pilihan: ['pendukung', 'utama', 'simpulan', 'pertentangan'],
  },
  latihan: [
    { p: P_BACA, t: 'Gagasan utama teks tersebut adalah ...', o: ['Keluarga berperan besar menumbuhkan minat baca anak.', 'Orang tua harus membeli rak buku.', 'Membacakan cerita memperkaya kosakata.', 'Anak harus membaca setiap malam.', 'Buku sebaiknya diletakkan di kamar tidur.'], k: 0, d: 2, b: 'Semua kalimat menjelaskan cara keluarga menumbuhkan minat baca; kalimat terakhir merangkumnya.' },
    { p: P_BACA, t: 'Kalimat “Rumah yang menyediakan rak buku kecil di ruang keluarga membuat buku mudah dijangkau” berfungsi sebagai ...', o: ['gagasan pendukung', 'gagasan utama', 'simpulan', 'bantahan', 'judul'], k: 0, d: 1, b: 'Kalimat itu memberi contoh langkah — gagasan pendukung.' },
    { p: P_BACA, t: 'Manakah yang TIDAK disebut sebagai gagasan pendukung dalam teks?', o: ['Anak perlu les membaca di bimbel.', 'Orang tua memberi contoh membaca.', 'Rak buku di ruang keluarga.', 'Membacakan cerita sebelum tidur.', 'Membaca bersama membangun ikatan emosional.'], k: 0, d: 2, b: 'Les di bimbel tidak disebut dalam teks.', x: { 1: 'lbi1', 2: 'lbi1' } },
    { p: 'Teknologi pengenal wajah kini dipakai di bandara untuk mempercepat pemeriksaan penumpang. Di beberapa sekolah, teknologi yang sama dipakai untuk mencatat kehadiran. Namun, para ahli mengingatkan bahwa data wajah termasuk data pribadi yang sensitif. Jika bocor, data itu tidak bisa diganti seperti kata sandi. Karena itu, penggunaannya perlu diatur dengan aturan perlindungan data yang ketat.', t: 'Gagasan utama teks tersebut adalah ...', o: ['Pengenal wajah bermanfaat, tetapi perlu diatur ketat karena datanya sensitif.', 'Bandara kini memakai pengenal wajah untuk mempercepat pemeriksaan.', 'Sekolah mulai mencatat kehadiran siswa dengan pengenal wajah.', 'Data wajah lebih mudah diganti daripada kata sandi jika bocor.', 'Teknologi pengenal wajah sebaiknya dilarang di semua tempat umum.'], k: 0, d: 3, b: 'Teks memuat manfaat, lalu risiko, lalu usulan pengaturan. Gagasan utama harus mencakup ketiganya; ‘sebaiknya dilarang’ terlalu jauh dari teks.' },
  ],
  uji: [
    { p: P_TANAH, t: 'Gagasan utama teks tersebut adalah ...', o: ['Pengambilan air tanah berlebihan menurunkan muka tanah kota pesisir; air perpipaan bisa membantu.', 'Banjir rob makin sering terjadi di kota-kota pesisir Indonesia.', 'Industri dan rumah tangga sama-sama memakai banyak air tanah.', 'Lapisan tanah memadat ketika air di bawahnya disedot terus-menerus.', 'Kota-kota pesisir di Indonesia sebaiknya segera dipindahkan.'], k: 0, d: 2, b: 'Teks membahas masalah, penyebab, dampak, dan solusi; gagasan utama mencakup semuanya.' },
    { p: P_TANAH, t: 'Kalimat “Akibatnya, banjir rob makin sering terjadi” berfungsi sebagai ...', o: ['gagasan pendukung berupa dampak', 'gagasan utama seluruh teks', 'solusi atas masalah dalam teks', 'pertentangan dengan kalimat sebelumnya', 'definisi istilah banjir rob'], k: 0, d: 2, b: 'Kalimat itu menjelaskan dampak — gagasan pendukung.' },
    { p: P_TANAH, t: 'Informasi yang TIDAK dibahas dalam teks adalah ...', o: ['besarnya biaya membangun air perpipaan', 'penyebab penurunan muka tanah', 'proses lapisan tanah memadat', 'dampak berupa banjir rob', 'salah satu solusi'], k: 0, d: 3, b: 'Teks tidak menyebut biaya pembangunan air perpipaan.', x: { 1: 'lbi1' } },
  ],
});

const P_JAM = 'Sebuah sekolah menerapkan jam baca 15 menit setiap pagi selama satu semester. Di akhir semester, nilai rata-rata tes pemahaman bacaan siswa naik dari 68 menjadi 75. Guru juga mencatat lebih banyak siswa meminjam buku dari perpustakaan. Meski begitu, sekolah belum membandingkannya dengan kelas yang tidak menjalankan jam baca.';
const P_BANK = 'Uji coba bank sampah di tiga kelurahan berlangsung enam bulan. Warga menyetor sampah plastik dan kertas yang sudah dipilah, lalu mendapat saldo tabungan. Volume sampah dari ketiga kelurahan yang dibuang ke tempat pembuangan akhir (TPA) turun sekitar 18%. Kelurahan yang paling sering mengadakan sosialisasi mencatat jumlah penyetor terbanyak.';
A('lbi3', 'lbi', 'Menarik simpulan teks', 'Membuat simpulan yang didukung isi teks.', ['lbi2'], {
  hook: 'Soal ‘simpulan yang tepat’ menguji apakah kamu bisa ==menyimpulkan tanpa menambah-nambah==. Simpulan harus didukung teks, bukan opini atau pengetahuanmu sendiri.',
  jelas: {
    analogi: 'Menyimpulkan itu seperti kerja detektif: kesimpulan harus berasal dari bukti di tempat kejadian. Detektif yang menuduh tanpa bukti (‘pasti pelakunya tetangga’) melompat terlalu jauh.\n\nDi UTBK, pilihan yang **terdengar benar tapi tidak ada buktinya** di teks adalah jebakan.',
    langkah: [
      'Pahami gagasan utama teks.',
      'Untuk tiap pilihan, tanyakan: adakah buktinya di teks?',
      'Coret pilihan yang terlalu luas (‘semua’, ‘selalu’, ‘pasti’), terlalu jauh, atau memakai info dari luar teks.',
      'Pilih simpulan yang paling didukung dan mencakup isi teks.',
    ],
    cerita: 'Teks: siswa yang tidur cukup nilainya lebih baik, menurut penelitian di dua sekolah. Simpulan ‘tidur cukup berkaitan dengan nilai yang lebih baik’ didukung. Simpulan ‘semua siswa yang begadang pasti gagal’ **terlalu jauh** — teks tidak membuktikannya.',
    singkat: 'Simpulan = didukung bukti teks dan tidak berlebihan. Waspadai ‘semua/selalu/pasti’ dan informasi dari luar teks.',
  },
  contoh: {
    soal: 'Teks: “Di desa yang memakai irigasi tetes, penggunaan air turun 40% dan hasil panen cabai tetap.” Simpulan yang tepat adalah ...',
    langkah: ['Bukti: air turun 40%, panen tetap.', 'Simpulan yang didukung: irigasi tetes menghemat air tanpa mengurangi hasil panen cabai.', '‘Irigasi tetes menaikkan semua hasil panen’ tidak didukung — panen hanya ‘tetap’.'],
    jawab: 'Irigasi tetes menghemat air tanpa menurunkan hasil panen cabai.',
  },
  rumpang: {
    soal: 'Teks: “Sebanyak 7 dari 10 responden survei memilih belajar daring karena fleksibel.” Simpulan: ___ responden memilih belajar daring.',
    langkah: ['7 dari 10 = 70%, lebih dari separuh.', 'Kata yang tepat dan tidak berlebihan: ___ responden.'],
    kosong: 'Sebagian besar', pilihan: ['Sebagian besar', 'Semua', 'Sedikit', 'Tidak ada'],
  },
  latihan: [
    { p: P_JAM, t: 'Simpulan yang paling tepat adalah ...', o: ['Jam baca diikuti kenaikan nilai, tetapi pengaruhnya belum terbukti tanpa pembanding.', 'Jam baca pasti menaikkan nilai pemahaman bacaan semua siswa.', 'Jam baca tidak bermanfaat karena kenaikan nilainya kecil.', 'Perpustakaan sekolah itu kekurangan buku bacaan untuk siswa.', 'Semua sekolah wajib menerapkan jam baca setiap pagi.'], k: 0, d: 2, b: 'Data menunjukkan kenaikan, tetapi kalimat terakhir menyebut belum ada pembanding — simpulan harus hati-hati.' },
    { p: P_JAM, t: 'Pernyataan yang dapat disimpulkan dari teks adalah ...', o: ['Jumlah siswa yang meminjam buku bertambah.', 'Nilai setiap siswa naik 7 poin.', 'Jam baca dilakukan setiap sore.', 'Nilai kelas lain turun.', 'Jam baca berlangsung satu tahun.'], k: 0, d: 2, b: 'Teks: “lebih banyak siswa meminjam buku”. ‘Nilai setiap siswa naik 7’ salah — yang naik adalah rata-rata.', x: { 2: 'lbi1', 4: 'lbi1' } },
    { p: P_JAM, t: 'Mengapa simpulan “jam baca menyebabkan kenaikan nilai” belum kuat?', o: ['Belum ada kelompok pembanding yang tidak menjalankan jam baca.', 'Nilai rata-rata siswa justru turun setelah jam baca.', 'Hanya guru yang membaca selama jam baca berlangsung.', 'Jam baca hanya dijalankan selama satu minggu.', 'Siswa tidak meminjam buku dari perpustakaan.'], k: 0, d: 3, b: 'Tanpa pembanding, kenaikan bisa disebabkan hal lain, misalnya soal tes yang berbeda.' },
    { p: 'Hasil survei di sebuah kota menunjukkan 64% pelajar berangkat sekolah diantar orang tua dengan motor, 21% naik angkutan umum, dan sisanya berjalan kaki atau bersepeda.', t: 'Simpulan yang tepat adalah ...', o: ['Sebagian besar pelajar di kota itu diantar orang tua dengan motor.', 'Tidak ada pelajar yang bersepeda.', 'Angkutan umum paling banyak dipakai.', 'Semua pelajar diantar orang tua.', 'Pelajar yang berjalan kaki lebih dari 30%.'], k: 0, d: 1, b: '64% = sebagian besar. Sisanya hanya 15% berjalan kaki atau bersepeda, jadi pilihan lain salah.' },
  ],
  uji: [
    { p: P_BANK, t: 'Simpulan yang paling tepat adalah ...', o: ['Bank sampah dapat mengurangi sampah ke TPA, terutama bila didukung sosialisasi.', 'Bank sampah berhasil menghapus seluruh sampah di ketiga kelurahan.', 'Warga di ketiga kelurahan tidak tertarik menabung sampah.', 'Sosialisasi tidak berpengaruh pada jumlah warga yang menyetor.', 'Bank sampah hanya menerima sampah kertas dari warga.'], k: 0, d: 2, b: 'Data: sampah ke TPA turun 18%; kelurahan dengan sosialisasi paling sering punya penyetor terbanyak.' },
    { p: P_BANK, t: 'Pernyataan yang TIDAK dapat disimpulkan dari teks adalah ...', o: ['Bank sampah membuat warga kaya.', 'Warga memilah sampah sebelum menyetor.', 'Uji coba berlangsung enam bulan.', 'Ada tiga kelurahan yang ikut uji coba.', 'Warga mendapat saldo tabungan.'], k: 0, d: 2, b: 'Teks tidak menyebut besar saldo, apalagi membuat warga kaya.' },
    { p: P_BANK, t: 'Jika kota ingin memperluas program, langkah yang paling didukung teks adalah ...', o: ['memperbanyak sosialisasi kepada warga', 'menghapus sistem tabungan', 'hanya menerima sampah plastik', 'menutup TPA', 'menghentikan pemilahan sampah'], k: 0, d: 3, b: 'Teks menunjukkan sosialisasi berkaitan dengan jumlah penyetor terbanyak.' },
  ],
});

A('lbi4', 'lbi', 'Sikap & tujuan penulis', 'Mengenali maksud dan sikap penulis.', ['lbi3'], {
  hook: 'Soal ‘tujuan penulis’ dan ‘sikap penulis’ muncul hampir di setiap teks Literasi. Kuncinya: ==perhatikan pilihan kata== penulis.',
  jelas: {
    analogi: 'Pilihan kata penulis itu seperti nada suara saat berbicara. “Kebijakan ini **patut diapresiasi**” dan “Kebijakan ini **terlalu terburu-buru**” membicarakan hal yang sama dengan nada berbeda: yang pertama mendukung, yang kedua mengkritik.',
    langkah: [
      'Tentukan jenis teks: memberi informasi, membujuk, bercerita, atau mengkritik?',
      'Tandai kata bernada: positif (‘patut’, ‘berhasil’), negatif (‘sayangnya’, ‘gagal’), atau netral.',
      'Tujuan dirumuskan dengan kata kerja: menginformasikan, meyakinkan, membandingkan, mengkritik, menjelaskan.',
      'Sikap dirumuskan dengan sifat: mendukung, menolak, khawatir, netral/objektif, optimis, skeptis.',
    ],
    cerita: 'Penulis menulis: “**Sayangnya**, program itu diluncurkan tanpa uji coba yang memadai.” Kata ‘sayangnya’ dan ‘tanpa uji coba yang memadai’ menunjukkan sikap **kritis**, meskipun ia tidak menulis ‘saya menolak’.',
    singkat: 'Tujuan = untuk apa teks ditulis (menginformasikan, membujuk, mengkritik). Sikap = perasaan penulis terhadap topik, dibaca dari kata-kata bernada.',
  },
  contoh: {
    soal: '“Program makan siang bergizi patut diapresiasi. Meski begitu, kualitas menu perlu diawasi agar tujuan program tercapai.” Bagaimana sikap penulis?',
    langkah: ['‘Patut diapresiasi’ → positif, mendukung.', '‘Perlu diawasi’ → ada catatan kehati-hatian.', 'Sikap: **mendukung dengan catatan**.'],
    jawab: 'Mendukung, tetapi memberi catatan pengawasan.',
  },
  rumpang: {
    soal: 'Teks berita yang hanya memaparkan jadwal, lokasi, dan syarat pendaftaran lomba bertujuan untuk ...',
    langkah: ['Tidak ada kata bernada atau ajakan.', 'Isinya fakta-fakta, jadi tujuannya ___.'],
    kosong: 'menginformasikan', pilihan: ['menginformasikan', 'mengkritik', 'menghibur', 'membujuk'],
  },
  latihan: [
    { p: 'Ayo kurangi plastik sekali pakai! Bawa botol minum sendiri, tolak sedotan plastik, dan gunakan tas belanja kain. Langkah kecilmu hari ini menyelamatkan laut kita besok.', t: 'Tujuan penulis teks tersebut adalah ...', o: ['mengajak pembaca mengurangi plastik sekali pakai', 'menjelaskan proses daur ulang plastik', 'melaporkan jumlah sampah plastik', 'mengkritik pabrik plastik', 'menceritakan pengalaman pribadi'], k: 0, d: 1, b: 'Kalimat ajakan (“Ayo…”) menunjukkan teks persuasif.' },
    { p: 'Kebijakan baru itu diumumkan pada malam hari dan berlaku keesokan paginya. Sayangnya, sekolah tidak punya cukup waktu untuk menyiapkan jadwal. Akibatnya, banyak siswa kebingungan di hari pertama.', t: 'Sikap penulis terhadap kebijakan tersebut adalah ...', o: ['kritis', 'mendukung penuh', 'netral', 'gembira', 'acuh tak acuh'], k: 0, d: 2, b: 'Kata ‘sayangnya’ dan penekanan pada dampak buruk menunjukkan sikap kritis.' },
    { p: 'Survei menunjukkan 52% responden setuju jam sekolah dimulai lebih siang, 41% tidak setuju, dan 7% tidak berpendapat. Pendukung beralasan siswa bisa tidur lebih cukup, sedangkan penolak khawatir jam pulang menjadi terlalu sore.', t: 'Sikap penulis dalam teks tersebut adalah ...', o: ['netral/objektif', 'mendukung jam masuk lebih siang', 'menolak jam masuk lebih siang', 'khawatir', 'marah'], k: 0, d: 2, b: 'Penulis memaparkan data dan alasan kedua pihak tanpa memihak.' },
    { p: 'Pembangunan jalan tol itu memangkas waktu tempuh dua kota dari 5 jam menjadi 2 jam. Namun, ratusan petani kehilangan sawah tanpa ganti rugi yang layak. Kemajuan semestinya tidak dibayar mahal oleh warga kecil.', t: 'Tujuan penulis adalah ...', o: ['mengkritik dampak pembangunan bagi petani meski mengakui manfaatnya', 'memuji pembangunan jalan tol yang memangkas waktu tempuh', 'melaporkan waktu tempuh terbaru antara dua kota', 'menolak semua bentuk pembangunan di daerah pertanian', 'menjelaskan cara membangun jalan tol dengan cepat'], k: 0, d: 3, b: 'Penulis mengakui manfaat, tetapi kalimat terakhir menunjukkan kritik terhadap dampaknya bagi petani.', x: { 2: 'lbi3', 3: 'lbi3' } },
  ],
  uji: [
    { p: 'Dengan aplikasi ini, kamu bisa belajar kapan saja hanya 10 menit sehari. Ribuan pengguna sudah merasakan manfaatnya. Unduh sekarang dan rasakan bedanya!', t: 'Tujuan penulis teks tersebut adalah ...', o: ['membujuk pembaca mengunduh aplikasi', 'menjelaskan cara kerja aplikasi', 'mengkritik aplikasi belajar', 'melaporkan hasil penelitian', 'menghibur pembaca'], k: 0, d: 2, b: 'Ajakan “Unduh sekarang” dan klaim manfaat menunjukkan tujuan membujuk (iklan).' },
    { p: 'Hasil panen padi tahun ini turun 12%. Petani menyebut hujan datang terlambat. Pemerintah daerah menyiapkan bantuan benih untuk musim tanam berikutnya.', t: 'Sikap penulis teks tersebut adalah ...', o: ['objektif', 'pesimis', 'menolak', 'mengejek', 'sangat gembira'], k: 0, d: 2, b: 'Teks hanya memuat fakta dari berbagai pihak tanpa kata bernada.' },
    { p: 'Banyak yang menganggap sastra tidak berguna bagi calon insinyur. Padahal, membaca novel melatih empati dan kemampuan memahami sudut pandang orang lain — dua hal yang dibutuhkan saat merancang teknologi untuk manusia.', t: 'Pernyataan yang sesuai dengan sikap penulis adalah ...', o: ['Penulis tidak setuju bahwa sastra tidak berguna bagi calon insinyur.', 'Penulis setuju sastra tidak berguna.', 'Penulis netral terhadap sastra.', 'Penulis menganggap insinyur tidak butuh empati.', 'Penulis menolak teknologi.'], k: 0, d: 3, b: 'Kata “Padahal” menandai penulis membantah anggapan di kalimat pertama.' },
  ],
});

const P_EKS = 'Tabel. Jumlah anggota ekstrakurikuler SMA Nusantara\nBasket: 2024 = 48, 2025 = 60\nPaduan suara: 2024 = 35, 2025 = 28\nRobotik: 2024 = 20, 2025 = 40\nJurnalistik: 2024 = 25, 2025 = 25';
const P_WAKTU = 'Grafik batang. Rata-rata waktu belajar mandiri siswa kelas XII per hari (menit)\nSenin 50 · Selasa 45 · Rabu 60 · Kamis 40 · Jumat 30 · Sabtu 90 · Minggu 75';
A('lbi5', 'lbi', 'Membaca grafik & tabel dalam teks', 'Menghubungkan data visual dengan isi bacaan.', ['lbi2'], {
  hook: 'Teks Literasi UTBK sering disertai ==tabel atau grafik==. Soalnya menguji apakah kamu bisa membaca angka dengan teliti dan menghubungkannya dengan teks.',
  jelas: {
    analogi: 'Tabel itu seperti jadwal pelajaran: setiap sel punya ‘alamat’ baris dan kolom. Untuk mencari ‘Matematika hari Rabu’, kamu menelusuri baris Rabu dan kolom jamnya.\n\nDi soal, alamatnya ada di pertanyaan — **baca label baris dan kolom dulu** sebelum angkanya.',
    langkah: [
      'Baca judul tabel atau grafik dan satuannya (persen, ribu, rupiah, menit).',
      'Baca label baris dan kolom (atau sumbu x dan y).',
      'Cari sel atau titik yang ditanyakan.',
      'Jika soal membandingkan atau menghitung perubahan, kerjakan pelan-pelan dan periksa satuannya.',
    ],
    cerita: 'Grafik menunjukkan pengguna internet naik dari 60 juta menjadi 75 juta. Soal bertanya kenaikannya dalam persen. Kenaikan 15 juta dari 60 juta = **25%**, bukan 15%. Satuan ‘juta’ dan ‘persen’ sering dijadikan jebakan.',
    singkat: 'Judul & satuan → label baris/kolom → sel yang ditanya → hitung hati-hati. Bedakan selisih (angka) dan persentase perubahan (selisih ÷ nilai awal).',
  },
  contoh: {
    soal: 'Tabel jumlah peminjam buku: Januari 120, Februari 150, Maret 135. Bulan dengan kenaikan peminjam terbesar dari bulan sebelumnya adalah ...',
    langkah: ['Januari → Februari: +30.', 'Februari → Maret: −15 (turun).', 'Kenaikan terbesar terjadi di **Februari**.'],
    jawab: 'Februari',
  },
  rumpang: {
    soal: 'Tabel: penjualan kantin Senin Rp400.000, Selasa Rp500.000. Berapa persen kenaikan dari Senin ke Selasa?',
    langkah: ['Selisih: Rp100.000.', 'Persentase: 100.000 ÷ 400.000 = ___.'],
    kosong: '25%', pilihan: ['25%', '20%', '100%', '10%'],
  },
  latihan: [
    { p: P_EKS, t: 'Ekstrakurikuler dengan anggota terbanyak pada 2025 adalah ...', o: ['Basket', 'Robotik', 'Paduan suara', 'Jurnalistik', 'Basket dan Robotik sama banyak'], k: 0, d: 1, b: 'Basket (60) adalah angka tertinggi di 2025.' },
    { p: P_EKS, t: 'Ekstrakurikuler yang anggotanya naik dua kali lipat adalah ...', o: ['Robotik', 'Basket', 'Paduan suara', 'Jurnalistik', 'Tidak ada'], k: 0, d: 2, b: 'Robotik: 20 → 40 (dua kali lipat).' },
    { p: P_EKS, t: 'Persentase kenaikan anggota Basket dari 2024 ke 2025 adalah ...', o: ['25%', '12%', '20%', '60%', '48%'], k: 0, d: 2, b: 'Naik 12 dari 48 → 12 ÷ 48 = 25%. (20% muncul kalau keliru membagi dengan 60.)', x: { 2: 'pk5' } },
    { p: P_EKS, t: 'Pernyataan yang sesuai dengan tabel adalah ...', o: ['Total anggota keempat ekstrakurikuler naik dari 2024 ke 2025.', 'Anggota Paduan suara naik 7 orang.', 'Anggota Jurnalistik turun.', 'Robotik adalah yang terbanyak di 2024.', 'Semua ekstrakurikuler bertambah anggotanya.'], k: 0, d: 3, b: 'Total 2024 = 48 + 35 + 20 + 25 = 128; total 2025 = 60 + 28 + 40 + 25 = 153. Paduan suara justru turun 7, Jurnalistik tetap.' },
  ],
  uji: [
    { p: P_WAKTU, t: 'Hari dengan waktu belajar mandiri paling sedikit adalah ...', o: ['Jumat', 'Kamis', 'Selasa', 'Minggu', 'Senin'], k: 0, d: 2, b: 'Jumat: 30 menit.' },
    { p: P_WAKTU, t: 'Selisih waktu belajar hari Sabtu dan hari Jumat adalah ...', o: ['60 menit', '45 menit', '30 menit', '90 menit', '120 menit'], k: 0, d: 2, b: '90 − 30 = 60 menit.' },
    { p: P_WAKTU, t: 'Rata-rata waktu belajar mandiri pada hari Senin–Jumat adalah ...', o: ['45 menit', '50 menit', '40 menit', '55 menit', '56 menit'], k: 0, d: 3, b: '(50 + 45 + 60 + 40 + 30) ÷ 5 = 225 ÷ 5 = 45 menit.' },
  ],
});

/* ===================== LBE — Reading in English ===================== */
/* Bacaan & soal dalam bahasa Inggris; penjelasan dalam bahasa Indonesia. */

A('lbe1', 'lbe', 'Vocabulary in context', 'Menebak arti kata bahasa Inggris dari konteks.', [], {
  hook: 'Soal “The word X is closest in meaning to…” hampir selalu muncul di LBE. Kamu ==tidak perlu hafal semua kata== — konteks kalimat bisa membantumu menebak.',
  jelas: {
    analogi: 'Kata asing di teks itu seperti wajah baru di kelas: kamu bisa menebak sifatnya dari teman-teman di sekitarnya.\n\nKata-kata di sekitar kata sulit — terutama **but, because, such as** — adalah petunjuk tentang maknanya.',
    langkah: [
      'Baca kalimat yang memuat kata itu, plus satu kalimat sebelum dan sesudahnya.',
      'Cari petunjuk: kontras (but, however, unlike), contoh (such as), sebab-akibat (because, so), atau definisi (which means).',
      'Tutup kata itu dan tebak kata sederhana yang pas.',
      'Pilih jawaban yang paling dekat dengan tebakanmu, lalu cek dengan memasukkannya ke kalimat.',
    ],
    cerita: '“The old bridge was **fragile**, so trucks were not allowed to cross it.” Kamu tidak tahu ‘fragile’. Petunjuknya: truk dilarang lewat → jembatan itu lemah. Jadi fragile ≈ **weak, easily broken** (rapuh).',
    singkat: 'Gunakan petunjuk konteks: kontras, contoh, sebab-akibat, definisi. Tutup kata → tebak → cocokkan → cek ulang.',
  },
  contoh: {
    soal: '“Unlike her talkative brother, Maya is quite **reticent** in class.” The word “reticent” is closest in meaning to ...',
    langkah: ['Petunjuk kontras: “Unlike her talkative brother”.', 'Kebalikan dari talkative (banyak bicara) = pendiam.', 'Reticent ≈ **quiet / reserved**.'],
    jawab: 'quiet',
  },
  rumpang: {
    soal: '“The medicine **alleviated** his pain, and he finally fell asleep.” The word “alleviated” means ...',
    langkah: ['Petunjuk akibat: “he finally fell asleep” → rasa sakitnya berkurang.', 'Alleviated ≈ ___.'],
    kosong: 'reduced', pilihan: ['reduced', 'increased', 'caused', 'ignored'],
  },
  latihan: [
    { t: '“After walking for six hours, the hikers were **exhausted** and could not take another step.” The word “exhausted” is closest in meaning to ...', o: ['very tired', 'very happy', 'lost', 'hungry', 'excited'], k: 0, d: 1, b: '“Could not take another step” menunjukkan sangat lelah.' },
    { t: '“Water is **scarce** in the desert, so people store every drop they can.” The word “scarce” means ...', o: ['limited', 'clean', 'cheap', 'everywhere', 'cold'], k: 0, d: 2, b: 'Orang menyimpan setiap tetes → airnya sedikit/langka.' },
    { t: '“The new policy was **controversial**: some people praised it, while others strongly opposed it.” The word “controversial” is closest in meaning to ...', o: ['causing disagreement', 'widely accepted', 'very old', 'easy to understand', 'secret'], k: 0, d: 2, b: 'Ada yang memuji, ada yang menentang → menimbulkan perdebatan.' },
    { t: '“Although the evidence was **meager**, the detective was confident about his theory.” The word “meager” is closest in meaning to ...', o: ['insufficient', 'strong', 'clear', 'false', 'recent'], k: 0, d: 3, b: '“Although” menandai kontras: buktinya sedikit/kurang, tetapi detektif tetap yakin.' },
  ],
  uji: [
    { t: '“The singer’s voice was so **feeble** that the audience at the back could barely hear her.” The word “feeble” means ...', o: ['weak', 'loud', 'beautiful', 'high', 'rough'], k: 0, d: 2, b: 'Penonton di belakang hampir tidak mendengar → suaranya lemah.' },
    { t: '“Many birds **migrate** to warmer regions when winter comes.” The word “migrate” is closest in meaning to ...', o: ['move', 'sleep', 'sing', 'hide', 'fight'], k: 0, d: 2, b: 'Pergi ke daerah yang lebih hangat saat musim dingin → berpindah.' },
    { t: '“Her explanation was so **lucid** that even the youngest students understood the concept.” The word “lucid” is closest in meaning to ...', o: ['clear', 'long', 'boring', 'difficult', 'funny'], k: 0, d: 3, b: 'Siswa termuda pun paham → penjelasannya jelas.' },
  ],
});

const P_NUTRI = 'Many people think that only athletes need to care about nutrition. In fact, what we eat affects everyone. Students who eat a healthy breakfast tend to concentrate better in class. Office workers who drink enough water feel less tired in the afternoon. Even older adults can lower their risk of disease by choosing fresh food over processed snacks.';
const P_GARDEN = 'Urban gardens are becoming popular in many cities. Residents grow vegetables on rooftops, balconies, and empty lots. Besides providing fresh food, these gardens help cool buildings and give neighbors a place to meet. Some schools even use them to teach students about science and healthy eating.';
A('lbe2', 'lbe', 'Main idea', 'Menemukan gagasan utama teks bahasa Inggris.', ['lbe1'], {
  hook: '“What is the main idea of the passage?” adalah soal paling umum di LBE. Kalau kamu tahu ==gagasan utamanya==, soal lain jadi lebih mudah.',
  jelas: {
    analogi: 'Main idea itu seperti judul film. Adegannya banyak, tapi judulnya merangkum seluruh cerita.\n\nPilihan yang hanya menyebut satu adegan **terlalu sempit**; pilihan yang membicarakan film lain **terlalu luas**.',
    langkah: [
      'Baca kalimat pertama dan terakhir paragraf atau teks.',
      'Tanyakan: apa yang paling sering dibicarakan, dan apa yang dikatakan tentangnya?',
      'Coret pilihan yang terlalu sempit (satu detail) atau terlalu luas (melebihi isi teks).',
      'Pilih yang merangkum seluruh teks.',
    ],
    cerita: 'Teks membahas kebiasaan tidur remaja: jam tidur makin larut, penyebabnya gawai, dan dampaknya ke nilai. ‘Teenagers use phones at night’ terlalu sempit; ‘Sleep is important for all animals’ terlalu luas. Main idea: **teenagers’ late sleeping habits, caused partly by devices, affect their school performance**.',
    singkat: 'Main idea = rangkuman seluruh teks. Tolak yang terlalu sempit (detail) dan terlalu luas (keluar topik).',
  },
  contoh: {
    soal: 'Passage: “Bees do more than make honey. They pollinate about one third of the crops we eat. Without bees, fruits such as apples and almonds would become rare and expensive.” What is the main idea?',
    langkah: ['Topik: lebah (bees).', 'Yang dikatakan: lebah penting untuk penyerbukan tanaman pangan.', 'Main idea: **bees are important because they pollinate many food crops**.'],
    jawab: 'Bees are important because they pollinate many food crops.',
  },
  rumpang: {
    soal: 'Sebuah passage membahas tiga cara menghemat listrik di rumah. Pilihan “Turn off lights when leaving a room” sebagai main idea adalah ...',
    langkah: ['Itu hanya salah satu dari tiga cara.', 'Jadi pilihan itu terlalu ___ untuk menjadi main idea.'],
    kosong: 'sempit', pilihan: ['sempit', 'luas', 'tepat', 'panjang'],
  },
  latihan: [
    { p: P_NUTRI, t: 'What is the main idea of the passage?', o: ['Good nutrition benefits everyone, not only athletes.', 'Athletes need to follow special diets to win.', 'Students should always eat breakfast before class.', 'Drinking water is the best way to stay alert.', 'Processed snacks are cheaper than fresh food.'], k: 0, d: 2, b: 'Kalimat kedua menyatakan gagasan utama (“affects everyone”), lalu diberi contoh siswa, pekerja kantor, dan lansia.' },
    { p: P_NUTRI, t: 'The examples of students, office workers, and older adults are used to ...', o: ['support the idea that nutrition matters for everyone', 'show that athletes eat worse than other people', 'compare the eating habits of different jobs', 'explain how to cook healthy meals at home', 'criticize office workers for drinking too little'], k: 0, d: 2, b: 'Ketiga contoh mendukung gagasan bahwa nutrisi penting bagi semua orang.' },
    { p: 'Plastic bags take hundreds of years to break down. Some countries have banned them, while others charge shoppers a small fee for each bag. In places with a fee, the number of bags used has dropped sharply. These results suggest that simple policies can change people’s shopping habits.', t: 'The passage mainly discusses ...', o: ['how policies on plastic bags can change shopping habits', 'why plastic bags are cheaper than paper bags', 'the history of shopping in different countries', 'how shoppers can recycle plastic bags at home', 'which countries produce the most plastic bags'], k: 0, d: 2, b: 'Teks membahas kebijakan (larangan atau biaya) dan dampaknya; kalimat terakhir merangkumnya.' },
    { p: 'For years, many people believed that goldfish had a memory span of only three seconds. However, experiments have shown that goldfish can remember feeding signals for months. In one study, fish learned to push a lever to get food and still remembered the trick weeks later.', t: 'Which statement best expresses the main idea?', o: ['Goldfish have much better memory than people used to believe.', 'Goldfish only remember for three seconds.', 'Scientists like to study fish.', 'Goldfish can push levers.', 'Fish need food every day.'], k: 0, d: 3, b: '“However” membalik anggapan lama; detail eksperimen mendukung bahwa ingatan ikan mas jauh lebih baik.', x: { 1: 'lbe1' } },
  ],
  uji: [
    { p: P_GARDEN, t: 'What is the main idea of the passage?', o: ['Urban gardens are growing in popularity and offer several benefits.', 'Rooftops are the best place for vegetables.', 'Neighbors rarely meet in cities.', 'Schools teach science only in gardens.', 'Vegetables are expensive in cities.'], k: 0, d: 2, b: 'Kalimat pertama + rangkaian manfaat (makanan segar, menyejukkan bangunan, tempat bertemu, sarana belajar).' },
    { p: P_GARDEN, t: 'Which of the following is a supporting detail, not the main idea?', o: ['Some schools use the gardens to teach science.', 'Urban gardens offer many benefits.', 'Urban gardens are becoming popular.', 'Gardens are changing city life.', 'Cities are adopting urban gardens.'], k: 0, d: 2, b: 'Penggunaan oleh sekolah adalah salah satu contoh manfaat — detail pendukung.' },
    { p: 'Volunteering is often seen as something people do only to help others. Yet research shows that volunteers also benefit: they report lower stress, stronger friendships, and a greater sense of purpose. In other words, helping others can also help ourselves.', t: 'The best title for the passage is ...', o: ['Helping Others Helps Us Too', 'How to Find Volunteer Work', 'Stress in Modern Life', 'Making New Friends at School', 'Why People Avoid Volunteering'], k: 0, d: 3, b: 'Kalimat terakhir merangkum: membantu orang lain juga menguntungkan diri sendiri.' },
  ],
});

const P_KOMODO = 'The Komodo dragon is the largest living lizard in the world. It can grow up to three meters long and weigh more than 70 kilograms. Komodo dragons live on a few islands in eastern Indonesia, including Komodo and Rinca. They are carnivores and can eat up to 80 percent of their body weight in a single meal. Because their population is small, they are protected by law.';
const P_WEEK = 'A small town introduced a four-day school week as a one-year trial. Teachers used the extra day for training, and students could join sports or volunteer activities. After one year, attendance stayed the same, but teachers reported feeling less stressed. This encouraged two nearby towns to consider the idea.';
A('lbe3', 'lbe', 'Detail & reference', 'Melacak detail dan rujukan (it, they, this).', ['lbe2'], {
  hook: 'Soal detail (“According to the passage…”) dan rujukan (“The word ‘it’ refers to…”) adalah ==poin yang paling bisa dipastikan== — jawabannya tertulis di teks.',
  jelas: {
    analogi: 'Kata rujukan seperti **it, they, this** itu seperti panah penunjuk jalan: ia selalu menunjuk ke sesuatu yang sudah disebut sebelumnya.\n\nIkuti panahnya mundur ke kalimat sebelumnya, cari kata benda yang cocok jumlah dan maknanya.',
    langkah: [
      'Detail: cari kata kunci soal di teks (scanning), lalu baca kalimatnya utuh.',
      'Rujukan: lihat kata gantinya (it, they, this, these, which).',
      'Mundur ke kata benda terdekat yang cocok: tunggal/jamak, benda/orang.',
      'Cek: ganti kata ganti dengan jawabanmu — kalimatnya harus tetap masuk akal.',
    ],
    cerita: '“The village built a new well. **It** now provides clean water for 200 families.” ‘It’ menunjuk ke **the well**, karena yang menyediakan air adalah sumurnya. Coba ganti: “The well now provides clean water…” — masuk akal.',
    singkat: 'Detail: kata kunci → kalimat utuh. Rujukan: ikuti kata ganti mundur ke kata benda yang cocok jumlah dan maknanya; cek dengan substitusi.',
  },
  contoh: {
    soal: '“Scientists studied two groups of students. The first group slept eight hours, while the second slept five. **They** found that the first group remembered more words.” What does “They” refer to?',
    langkah: ['“They” = jamak, pelaku dari “found” (menemukan hasil penelitian).', 'Kandidat jamak: scientists, groups, students.', 'Yang menemukan hasil adalah peneliti → **the scientists**.'],
    jawab: 'the scientists',
  },
  rumpang: {
    soal: '“Maria bought a new laptop last month, but **it** already has a broken key.” The word “it” refers to ...',
    langkah: ['“It” = tunggal, benda.', 'Yang punya tombol rusak: the ___.'],
    kosong: 'laptop', pilihan: ['laptop', 'month', 'Maria', 'key'],
  },
  latihan: [
    { p: P_KOMODO, t: 'According to the passage, Komodo dragons can grow up to ...', o: ['three meters long', 'seventy meters long', 'eighty centimeters long', 'one meter long', 'thirty meters long'], k: 0, d: 1, b: 'Kalimat kedua: “up to three meters long”.' },
    { p: P_KOMODO, t: 'The word “It” in the second sentence refers to ...', o: ['the Komodo dragon', 'the world', 'a meal', 'an island', 'the law'], k: 0, d: 1, b: '“It” menunjuk ke kata benda tunggal sebelumnya: the Komodo dragon.' },
    { p: P_KOMODO, t: 'The word “They” in the fourth sentence refers to ...', o: ['Komodo dragons', 'islands', 'Komodo and Rinca', 'kilograms', 'people in eastern Indonesia'], k: 0, d: 2, b: 'Yang “carnivores” (pemakan daging) adalah komodo.' },
    { p: P_KOMODO, t: 'Why are Komodo dragons protected by law?', o: ['Their population is small.', 'They are dangerous.', 'They eat too much.', 'They live on islands.', 'They are the largest lizards.'], k: 0, d: 2, b: '“Because their population is small, they are protected by law.”' },
  ],
  uji: [
    { p: P_WEEK, t: 'According to the passage, what happened to attendance?', o: ['It stayed the same.', 'It increased sharply.', 'It dropped.', 'It was not measured.', 'It doubled.'], k: 0, d: 2, b: '“attendance stayed the same”.' },
    { p: P_WEEK, t: 'The word “This” in the last sentence refers to ...', o: ['the results of the trial', 'the extra day', 'sports activities', 'two nearby towns', 'teacher training'], k: 0, d: 2, b: '“This” merujuk ke hasil uji coba di kalimat sebelumnya (kehadiran tetap, guru lebih tidak stres).' },
    { p: P_WEEK, t: 'Which statement is NOT mentioned in the passage?', o: ['Students’ test scores improved.', 'Teachers used the extra day for training.', 'Students could join volunteer activities.', 'Teachers felt less stressed.', 'The trial lasted one year.'], k: 0, d: 3, b: 'Teks tidak menyebut nilai ujian.' },
  ],
});

A('lbe4', 'lbe', 'Inference', 'Menyimpulkan hal yang tersirat.', ['lbe3'], {
  hook: 'Soal “It can be inferred that…” meminta kamu membaca ==yang tersirat==: tidak ditulis langsung, tetapi pasti benar berdasarkan teks.',
  jelas: {
    analogi: 'Inferensi itu seperti melihat payung basah di depan pintu: tidak ada yang bilang ‘di luar hujan’, tapi kamu bisa menyimpulkannya.\n\nNamun kamu **tidak bisa** menyimpulkan ‘hujan sepanjang hari’ — itu terlalu jauh dari bukti.',
    langkah: [
      'Cari bagian teks yang berkaitan dengan pilihan jawaban.',
      'Tanyakan: apakah pilihan ini PASTI benar jika teksnya benar?',
      'Coret pilihan yang hanya ‘mungkin’ benar, atau yang memakai kata dari teks dengan makna berbeda.',
      'Pilih inferensi dengan lompatan terkecil yang paling didukung bukti.',
    ],
    cerita: '“Since the new bus line opened, Dina no longer wakes up at 5 a.m.” Inferensi yang aman: **perjalanan Dina ke sekolah kini lebih singkat atau lebih mudah**. ‘Dina tidak suka bangun pagi’ tidak didukung bukti.',
    singkat: 'Inferensi = tersirat tetapi pasti benar menurut bukti. Pilih lompatan terkecil; tolak yang ‘mungkin’ atau ‘terlalu jauh’.',
  },
  contoh: {
    soal: '“The store had sold out of umbrellas by noon, and shoppers were waiting for raincoats to be restocked.” What can be inferred?',
    langkah: ['Payung habis, orang menunggu jas hujan.', 'Yang pasti: banyak orang butuh perlengkapan hujan hari itu.', 'Inferensi: **it was probably raining (or about to rain)**.'],
    jawab: 'Many people needed rain gear that day, likely because of rain.',
  },
  rumpang: {
    soal: '“Andi checked the clock again and again during the test.” It can be inferred that Andi was ...',
    langkah: ['Melihat jam berulang kali → memperhatikan waktu.', 'Inferensi terkecil: Andi was ___ about time.'],
    kosong: 'worried', pilihan: ['worried', 'asleep', 'bored with clocks', 'finished early'],
  },
  latihan: [
    { p: 'When the school canteen started selling fruit instead of fried snacks, many students complained at first. After two months, however, the canteen was selling more fruit than it had ever sold snacks.', t: 'What can be inferred from the passage?', o: ['Students gradually accepted the new menu.', 'Students never liked fruit.', 'The canteen closed after two months.', 'Fried snacks were cheaper than fruit.', 'Teachers forced students to eat fruit.'], k: 0, d: 2, b: 'Awalnya protes, tetapi penjualan buah kemudian melampaui camilan → siswa akhirnya menerima. Harga tidak disebut.' },
    { p: 'Rina left her house without her umbrella because the sky was clear. By the time she reached school, her uniform was soaking wet.', t: 'It can be inferred that ...', o: ['it rained on Rina’s way to school', 'Rina forgot her uniform', 'Rina’s school is next to her house', 'Rina likes rain', 'Rina was late for school'], k: 0, d: 2, b: 'Langit cerah saat berangkat, tetapi seragamnya basah kuyup saat tiba → hujan turun di perjalanan.' },
    { p: 'The library extended its opening hours until 10 p.m. during the exam period. Every evening, nearly all the seats were taken.', t: 'Which inference is best supported?', o: ['Many students needed a place to study in the evening during exams.', 'The library is crowded all year round.', 'Students prefer studying at home.', 'The library will stay open until 10 p.m. forever.', 'The exams were cancelled.'], k: 0, d: 3, b: 'Jam buka diperpanjang saat ujian dan kursi hampir selalu penuh. ‘Sepanjang tahun’ terlalu jauh dari bukti.' },
    { p: 'Although the phone was released only last month, the company has already announced a cheaper version with a smaller screen.', t: 'It can be inferred that the company ...', o: ['wants to reach buyers who find the first phone too expensive', 'has stopped selling the first phone completely', 'admits that the first phone had a serious mistake', 'only wants to sell expensive phones in the future', 'has never released a phone before this year'], k: 0, d: 3, b: 'Merilis versi lebih murah menyiratkan target pembeli yang merasa versi pertama terlalu mahal. Pilihan lain tidak didukung teks.' },
  ],
  uji: [
    { p: 'Every seat in the stadium was filled an hour before the match, and hundreds of fans without tickets gathered outside to watch on a large screen.', t: 'What can be inferred?', o: ['The match was very popular.', 'The stadium was too small for the players.', 'The tickets were free.', 'The match was cancelled.', 'The fans disliked the screen.'], k: 0, d: 2, b: 'Kursi penuh sejam sebelumnya dan ratusan orang menonton dari luar → pertandingan sangat diminati.' },
    { p: 'Mr. Hasan always arrives at the office before 7 a.m., but today his desk was still empty at 9.', t: 'It can be inferred that ...', o: ['something unusual happened to Mr. Hasan today', 'Mr. Hasan quit his job', 'Mr. Hasan never comes to work', 'the office opens at 9', 'Mr. Hasan is always late'], k: 0, d: 2, b: 'Biasanya datang sebelum jam 7, hari ini belum datang jam 9 → ada hal yang tidak biasa. Alasannya tidak diketahui.' },
    { p: 'The village’s population has fallen by half in ten years, and its primary school now has only one class for all grades.', t: 'Which inference is best supported?', o: ['There are fewer children in the village than before.', 'The school has excellent teachers.', 'The village will disappear next year.', 'Children prefer studying in the city.', 'The school was built ten years ago.'], k: 0, d: 3, b: 'Penduduk turun separuh dan sekolah hanya punya satu kelas → jumlah anak berkurang. ‘Desa hilang tahun depan’ terlalu jauh.' },
  ],
});

A('lbe5', 'lbe', 'Author’s purpose & tone', 'Mengenali tujuan dan nada penulis.', ['lbe4'], {
  hook: 'Soal “The author’s purpose is…” dan “The tone of the passage is…” menguji apakah kamu menangkap ==maksud dan nada penulis==, bukan hanya isinya.',
  jelas: {
    analogi: 'Tujuan penulis itu seperti alasan seseorang mengirim pesan: memberi kabar (**inform**), mengajak (**persuade**), menghibur (**entertain**), atau mengeluh (**criticize**). Nada adalah ekspresi wajahnya saat mengirim pesan: serius, gembira, khawatir, atau sinis.',
    langkah: [
      'Lihat jenis teks: berita/laporan (inform), iklan/opini (persuade), cerita (entertain), ulasan (evaluate/criticize).',
      'Tandai kata bernada: unfortunately, amazing, should, must, worryingly.',
      'Purpose: pilih kata kerja yang cocok — to inform, to persuade, to explain, to compare, to criticize.',
      'Tone: pilih sifat yang cocok — objective, optimistic, critical, concerned, admiring.',
    ],
    cerita: '“**Shockingly**, more than half of the city’s rivers are polluted. We **must act now** before it is too late.” Kata ‘Shockingly’ dan ‘We must act now’ → tujuannya **to persuade**, nadanya **urgent/concerned**.',
    singkat: 'Purpose = untuk apa (inform/persuade/explain/criticize/entertain). Tone = nada (objective/optimistic/critical/concerned). Buktinya: kata bernada dan ajakan.',
  },
  contoh: {
    soal: '“The museum is open daily from 9 a.m. to 5 p.m. Tickets cost $5 for adults and $2 for students.” What is the author’s purpose?',
    langkah: ['Isinya fakta: jam buka dan harga tiket.', 'Tidak ada ajakan atau penilaian.', 'Purpose: **to inform**.'],
    jawab: 'to inform',
  },
  rumpang: {
    soal: '“Unfortunately, the new park has already become a dumping ground for trash.” The tone of this sentence is ...',
    langkah: ['Kata “Unfortunately” dan “dumping ground” bernada negatif.', 'Tone: ___.'],
    kosong: 'disappointed', pilihan: ['disappointed', 'cheerful', 'neutral', 'humorous'],
  },
  latihan: [
    { p: 'Join our free coding class this Saturday! Learn to build your first website in just three hours. Seats are limited — register today!', t: 'The main purpose of the text is to ...', o: ['persuade readers to join a coding class', 'explain how websites work', 'report the results of a class', 'compare coding classes', 'describe a Saturday'], k: 0, d: 1, b: 'Ajakan “Join…” dan “register today!” → membujuk.' },
    { p: 'The report shows that the number of students who walk to school has fallen from 40% to 15% in ten years. The main reasons given are longer distances and concerns about traffic safety.', t: 'The tone of the passage is ...', o: ['objective', 'angry', 'humorous', 'excited', 'sarcastic'], k: 0, d: 2, b: 'Teks memaparkan data dan alasan tanpa kata bernada emosional.' },
    { p: 'Despite the heavy rain, volunteers worked through the night to rebuild the bridge. By morning, children could cross safely to school again. Their dedication is truly inspiring.', t: 'The author’s attitude toward the volunteers is ...', o: ['admiring', 'critical', 'indifferent', 'worried', 'doubtful'], k: 0, d: 2, b: '“Truly inspiring” dan “dedication” menunjukkan kekaguman.' },
    { p: 'The city spent millions on a new bus system, yet the buses still arrive late and the routes skip the busiest neighborhoods. Perhaps the planners have never actually ridden a bus.', t: 'The author’s purpose is mainly to ...', o: ['criticize the planning of the bus system', 'praise the city’s spending', 'inform readers of bus schedules', 'explain how buses are built', 'encourage people to ride buses'], k: 0, d: 3, b: '“Yet”, keluhan keterlambatan, dan sindiran di kalimat terakhir menunjukkan kritik.' },
  ],
  uji: [
    { p: 'Researchers have identified a new species of tree frog in a tropical forest. The frog is about the size of a fingernail and has bright orange spots.', t: 'The author’s purpose is to ...', o: ['inform readers about a discovery', 'persuade readers to visit the forest', 'criticize researchers', 'tell a funny story', 'compare different frogs'], k: 0, d: 2, b: 'Teks memberi informasi faktual tentang sebuah penemuan.' },
    { p: 'Our team lost the final match, but we played with heart and improved every game this season. Next year, we will be even stronger!', t: 'The tone of the passage is ...', o: ['optimistic', 'bitter', 'fearful', 'indifferent', 'sarcastic'], k: 0, d: 2, b: 'Meski kalah, penulis melihat kemajuan dan yakin tahun depan lebih kuat → optimis.' },
    { p: 'Social media can help students find study groups and share notes. However, endless scrolling can also eat up hours that should be spent sleeping or studying. Students need to decide which side wins.', t: 'The author’s attitude toward social media is best described as ...', o: ['balanced', 'strongly negative', 'strongly positive', 'uninterested', 'confused'], k: 0, d: 3, b: 'Penulis menyebut manfaat dan risiko, lalu menyerahkan keputusan kepada siswa → seimbang.' },
  ],
});

/* ===================== PM — Data, peluang & model ===================== */

const P_BERAS = 'Tabel. Produksi beras sebuah desa (ton)\n2021: 120 · 2022: 135 · 2023: 126 · 2024: 150';
const P_MUSEUM = 'Tabel. Jumlah pengunjung museum (orang)\nJanuari 1.200 · Februari 900 · Maret 1.500 · April 1.800';
A('pm1', 'pm', 'Membaca tabel & diagram', 'Mengambil angka yang tepat dari tabel dan grafik.', [], {
  hook: 'Soal PM hampir selalu dimulai dari ==tabel, grafik, atau diagram==. Satu salah baca angka = satu soal hilang, sepintar apa pun hitunganmu.',
  jelas: {
    analogi: 'Membaca diagram itu seperti membaca peta: sebelum mencari jalan, kamu cek dulu legenda dan skalanya.\n\nJudul, satuan, dan keterangan sumbu adalah **legenda** sebuah diagram.',
    langkah: [
      'Baca judul dan satuannya (ribu, juta, persen, kg, ton).',
      'Kenali jenisnya: batang (membandingkan), garis (perubahan dari waktu ke waktu), lingkaran (bagian dari keseluruhan).',
      'Temukan angka yang diminta soal — jangan menebak dari bentuk gambarnya saja.',
      'Hitung jika perlu, lalu cek apakah jawabanmu masuk akal.',
    ],
    cerita: 'Diagram lingkaran pengeluaran OSIS: konsumsi 40%, dekorasi 25%, hadiah 35%. Totalnya Rp2.000.000. Dana hadiah = 35% × 2.000.000 = **Rp700.000**. Diagram lingkaran memberi persen; kamu yang mengubahnya menjadi rupiah.',
    singkat: 'Judul & satuan → jenis diagram → angka yang diminta → hitung → cek masuk akal. Lingkaran = persen dari total.',
  },
  contoh: {
    soal: 'Diagram batang penjualan pulpen (lusin): Senin 12, Selasa 18, Rabu 9. Berapa total pulpen yang terjual dalam satuan buah?',
    langkah: ['Total lusin: 12 + 18 + 9 = 39 lusin.', '1 lusin = 12 buah.', '39 × 12 = **468 buah**.'],
    jawab: '468 buah',
  },
  rumpang: {
    soal: 'Diagram lingkaran: 30% dari 200 siswa memilih futsal. Berapa siswa yang memilih futsal?',
    langkah: ['30% × 200 = ___ siswa.'],
    kosong: '60', pilihan: ['60', '30', '70', '600'],
  },
  latihan: [
    { p: P_BERAS, t: 'Produksi beras tertinggi terjadi pada tahun ...', o: ['2024', '2022', '2023', '2021', '2022 dan 2024'], k: 0, d: 1, b: '150 ton pada 2024.' },
    { p: P_BERAS, t: 'Penurunan produksi terjadi dari tahun ...', o: ['2022 ke 2023', '2021 ke 2022', '2023 ke 2024', '2021 ke 2024', 'tidak pernah turun'], k: 0, d: 2, b: '135 → 126 (turun 9 ton).' },
    { p: P_BERAS, t: 'Rata-rata produksi beras per tahun selama 2021–2024 adalah ...', o: ['132,75 ton', '130 ton', '135 ton', '126 ton', '150 ton'], k: 0, d: 2, b: '(120 + 135 + 126 + 150) ÷ 4 = 531 ÷ 4 = 132,75 ton.' },
    { p: 'Diagram lingkaran. Pembagian waktu 24 jam Dimas: tidur 1/3, sekolah 1/4, belajar mandiri 1/8, sisanya kegiatan lain.', t: 'Berapa jam yang Dimas gunakan untuk kegiatan lain?', o: ['7 jam', '5 jam', '6 jam', '8 jam', '3 jam'], k: 0, d: 3, b: 'Tidur 8 jam, sekolah 6 jam, belajar 3 jam → 17 jam. Sisanya 24 − 17 = 7 jam.' },
  ],
  uji: [
    { p: P_MUSEUM, t: 'Persentase kenaikan pengunjung dari Maret ke April adalah ...', o: ['20%', '16,7%', '15%', '25%', '300%'], k: 0, d: 2, b: 'Naik 300 dari 1.500 → 300 ÷ 1.500 = 20%. Patokannya nilai awal (Maret), bukan 1.800 — membagi dengan 1.800 menghasilkan 16,7%.', x: { 1: 'pk5' } },
    { p: P_MUSEUM, t: 'Selisih jumlah pengunjung terbanyak dan tersedikit adalah ...', o: ['900 orang', '600 orang', '300 orang', '1.200 orang', '1.800 orang'], k: 0, d: 2, b: '1.800 − 900 = 900 orang.' },
    { p: P_MUSEUM, t: 'Jika harga tiket Rp15.000 per orang, pendapatan museum pada Februari adalah ...', o: ['Rp13.500.000', 'Rp1.350.000', 'Rp135.000.000', 'Rp9.000.000', 'Rp18.000.000'], k: 0, d: 3, b: '900 × 15.000 = 13.500.000.' },
  ],
});

A('pm2', 'pm', 'Rata-rata, median, modus', 'Ukuran pemusatan data dan kapan memakainya.', ['pm1'], {
  hook: 'Rata-rata, median, dan modus muncul di PM sebagai ==ringkasan data== — dan soal sering menguji kapan masing-masing paling cocok dipakai.',
  jelas: {
    analogi: 'Bayangkan 5 teman dengan uang jajan Rp10 ribu, 12 ribu, 12 ribu, 15 ribu, dan 100 ribu. Rata-ratanya Rp29,8 ribu — terdengar ‘kaya’, padahal 4 dari 5 orang di bawah Rp16 ribu.\n\n**Median** (nilai tengah) Rp12 ribu lebih menggambarkan ‘orang biasa’. **Modus** (paling sering) juga Rp12 ribu.',
    langkah: [
      'Rata-rata (mean) = jumlah semua data ÷ banyak data.',
      'Median = nilai tengah setelah data diurutkan; jika banyak data genap, rata-ratakan dua nilai tengah.',
      'Modus = nilai yang paling sering muncul.',
      'Ada nilai ekstrem (pencilan)? Median lebih mewakili daripada rata-rata.',
    ],
    cerita: 'Nilai tryout kelompokmu: 500, 520, 540, 540, 900. Rata-ratanya 600, tetapi itu karena satu orang mendapat 900. Median **540** lebih jujur menggambarkan kelompokmu.',
    singkat: 'Mean = jumlah ÷ n. Median = tengah setelah diurutkan. Modus = paling sering. Ada pencilan? Pakai median.',
  },
  contoh: {
    soal: 'Data: 7, 3, 9, 3, 8. Tentukan mediannya.',
    langkah: ['Urutkan: 3, 3, 7, 8, 9.', 'Ada 5 data → nilai ke-3 adalah nilai tengah.', 'Median = **7**.'],
    jawab: '7',
  },
  rumpang: {
    soal: 'Data: 4, 6, 8, 10. Berapa mediannya?',
    langkah: ['Banyak data genap → dua nilai tengah: 6 dan 8.', 'Median = (6 + 8) ÷ 2 = ___.'],
    kosong: '7', pilihan: ['7', '6', '8', '14'],
  },
  latihan: [
    { t: 'Rata-rata dari 4, 7, 8, 9, 12 adalah ...', o: ['8', '7', '9', '40', '10'], k: 0, d: 1, b: 'Jumlah 40 ÷ 5 = 8.' },
    { t: 'Modus dari data 2, 5, 5, 6, 7, 5, 8 adalah ...', o: ['5', '6', '7', '2', '8'], k: 0, d: 1, b: '5 muncul tiga kali — paling sering.' },
    { t: 'Rata-rata nilai 4 siswa adalah 75. Seorang siswa baru bergabung dengan nilai 90. Rata-rata baru kelima siswa adalah ...', o: ['78', '82,5', '80', '76', '85'], k: 0, d: 2, b: 'Jumlah awal 4 × 75 = 300. Ditambah 90 = 390. 390 ÷ 5 = 78. (82,5 muncul kalau keliru merata-ratakan 75 dan 90 saja.)' },
    { t: 'Gaji 5 karyawan (juta rupiah): 4, 4, 5, 6, 31. Ukuran yang paling mewakili gaji karyawan pada umumnya adalah ...', o: ['median, yaitu 5 juta', 'rata-rata, yaitu 10 juta', 'modus, yaitu 31 juta', 'rata-rata, yaitu 5 juta', 'jangkauan, yaitu 27 juta'], k: 0, d: 3, b: 'Pencilan 31 juta menarik rata-rata menjadi 10 juta. Median 5 juta lebih mewakili.' },
  ],
  uji: [
    { t: 'Median dari 12, 5, 9, 15, 7, 10 adalah ...', o: ['9,5', '9', '10', '7', '58'], k: 0, d: 2, b: 'Urutkan: 5, 7, 9, 10, 12, 15. Dua nilai tengah 9 dan 10 → (9 + 10) ÷ 2 = 9,5.' },
    { t: 'Rata-rata tinggi 5 siswa 160 cm. Jika satu siswa setinggi 168 cm keluar dari kelompok, rata-rata tinggi 4 siswa sisanya adalah ...', o: ['158 cm', '160 cm', '162 cm', '156 cm', '159 cm'], k: 0, d: 2, b: 'Jumlah 5 × 160 = 800. 800 − 168 = 632. 632 ÷ 4 = 158 cm.' },
    { t: 'Nilai ulangan: 70 (4 siswa), 80 (5 siswa), dan 90 (1 siswa). Rata-ratanya adalah ...', o: ['77', '80', '78', '75', '76'], k: 0, d: 3, b: '(4 × 70 + 5 × 80 + 1 × 90) ÷ 10 = 770 ÷ 10 = 77.' },
  ],
});

A('pm3', 'pm', 'Perbandingan & skala', 'Rasio, perbandingan senilai dan berbalik nilai, skala peta.', ['pm1'], {
  hook: 'Perbandingan ada di mana-mana: resep, peta, campuran, kecepatan. PM suka menguji ==perbandingan senilai, berbalik nilai, dan skala==.',
  jelas: {
    analogi: '**Senilai** itu seperti resep es teh: 2 sendok gula untuk 1 gelas, berarti 6 sendok untuk 3 gelas — keduanya naik bersama.\n\n**Berbalik nilai** seperti tugas kelompok: makin banyak orang, makin sedikit waktu — yang satu naik, yang lain turun.',
    langkah: [
      'Senilai: a₁/b₁ = a₂/b₂ (keduanya naik atau turun bersama).',
      'Berbalik nilai: a₁ × b₁ = a₂ × b₂ (satu naik, yang lain turun).',
      'Skala 1 : n artinya 1 cm di peta = n cm sebenarnya.',
      'Rasio a : b dari total T → bagian a = a/(a + b) × T.',
    ],
    cerita: 'Kamu dan temanmu patungan membeli kue: kamu Rp20.000, dia Rp30.000. Rasionya 2 : 3. Kalau kuenya 10 potong, bagianmu = 2/5 × 10 = **4 potong**.',
    singkat: 'Senilai: bagi sama. Berbalik nilai: kali sama. Skala 1 : n → kalikan n. Bagian dari rasio = a/(a + b) × total.',
  },
  contoh: {
    soal: '5 pekerja menyelesaikan pagar dalam 12 hari. Berapa hari jika dikerjakan 6 pekerja?',
    langkah: ['Lebih banyak pekerja → lebih cepat → berbalik nilai.', '5 × 12 = 6 × x → 60 = 6x.', 'x = **10 hari**.'],
    jawab: '10 hari',
  },
  rumpang: {
    soal: 'Skala peta 1 : 500.000. Jarak di peta 3 cm. Berapa jarak sebenarnya?',
    langkah: ['3 × 500.000 = 1.500.000 cm.', '1.500.000 cm = ___ km.'],
    kosong: '15', pilihan: ['15', '150', '1,5', '1.500'],
  },
  latihan: [
    { t: 'Perbandingan uang Ani dan Budi 3 : 5. Jika jumlah uang mereka Rp160.000, uang Ani adalah ...', o: ['Rp60.000', 'Rp100.000', 'Rp48.000', 'Rp96.000', 'Rp80.000'], k: 0, d: 1, b: 'Total bagian 3 + 5 = 8, jadi uang Ani 3/8 × 160.000 = 60.000. (Rp96.000 muncul kalau keliru memakai 3/5 — padahal 5 itu bagian Budi, bukan keseluruhan.)', x: { 3: 'pk1' } },
    { t: 'Sebuah mobil menghabiskan 8 liter bensin untuk 96 km. Untuk menempuh 150 km dibutuhkan ...', o: ['12,5 liter', '12 liter', '15 liter', '10 liter', '18 liter'], k: 0, d: 2, b: '96 ÷ 8 = 12 km per liter. 150 ÷ 12 = 12,5 liter.' },
    { t: 'Jarak dua kota sebenarnya 60 km. Pada peta jaraknya 4 cm. Skala peta tersebut adalah ...', o: ['1 : 1.500.000', '1 : 150.000', '1 : 15.000', '1 : 240.000', '1 : 2.400.000'], k: 0, d: 2, b: '60 km = 6.000.000 cm. 6.000.000 ÷ 4 = 1.500.000.' },
    { t: 'Persediaan makanan cukup untuk 40 ekor ayam selama 15 hari. Jika ayamnya bertambah 10 ekor, persediaan itu cukup untuk ...', o: ['12 hari', '18 hari', '10 hari', '20 hari', '13 hari'], k: 0, d: 3, b: 'Berbalik nilai: 40 × 15 = 50 × x → x = 600 ÷ 50 = 12 hari.', h: 'Lebih banyak ayam → makanan lebih cepat habis.' },
  ],
  uji: [
    { t: 'Untuk membuat 4 gelas jus diperlukan 6 buah jeruk. Untuk 10 gelas diperlukan ... buah jeruk.', o: ['15', '12', '20', '24', '16'], k: 0, d: 2, b: '6 ÷ 4 = 1,5 jeruk per gelas × 10 = 15.' },
    { t: 'Perbandingan siswa laki-laki dan perempuan 4 : 5. Jika siswa perempuan 45 orang, jumlah seluruh siswa adalah ...', o: ['81', '36', '90', '72', '99'], k: 0, d: 2, b: '45 ÷ 5 = 9 orang per bagian. Total 9 bagian × 9 = 81.' },
    { t: 'Sebuah pekerjaan dapat diselesaikan 12 orang dalam 20 hari. Setelah 5 hari bekerja, pekerjaan terhenti selama 5 hari. Agar tetap selesai tepat waktu, diperlukan tambahan pekerja sebanyak ...', o: ['6 orang', '4 orang', '3 orang', '5 orang', '8 orang'], k: 0, d: 3, b: 'Sisa pekerjaan = 12 × 15 = 180 orang-hari. Waktu tersisa 20 − 5 − 5 = 10 hari. Perlu 180 ÷ 10 = 18 orang → tambah 6.' },
  ],
});

A('pm4', 'pm', 'Peluang dasar', 'Peluang = banyak kejadian ÷ banyak kemungkinan.', ['pm3'], {
  hook: 'Peluang muncul di PM dalam bentuk dadu, kartu, bola dalam kantong, sampai undian. Rumus intinya ==hanya satu pecahan==.',
  jelas: {
    analogi: 'Peluang itu seperti mengambil satu permen dari toples tanpa melihat: kalau ada 3 permen jeruk dari 10 permen, kesempatanmu mendapat jeruk adalah **3 dari 10**. Makin banyak permen jeruk, makin besar peluangmu.',
    langkah: [
      'Hitung semua hasil yang mungkin: n(S).',
      'Hitung hasil yang diinginkan: n(A).',
      'Peluang P(A) = n(A) ÷ n(S); nilainya antara 0 dan 1.',
      'Peluang tidak terjadi = 1 − P(A).',
    ],
    cerita: 'Dalam undian kelas ada 30 nama, termasuk namamu. Peluangmu terpilih = 1/30. Kalau namamu ditulis 3 kali (curang!), peluangnya jadi **3/32** — karena jumlah kertas juga bertambah.',
    singkat: 'P(A) = n(A)/n(S). 0 ≤ P ≤ 1. P(bukan A) = 1 − P(A).',
  },
  contoh: {
    soal: 'Sebuah dadu dilempar sekali. Berapa peluang muncul angka lebih dari 4?',
    langkah: ['n(S) = 6 (angka 1–6).', 'Lebih dari 4: angka 5 dan 6 → n(A) = 2.', 'P = 2/6 = **1/3**.'],
    jawab: '1/3',
  },
  rumpang: {
    soal: 'Kantong berisi 4 bola merah dan 6 bola biru. Berapa peluang terambil bola merah?',
    langkah: ['n(S) = 10, n(merah) = 4.', 'P = 4/10 = ___.'],
    kosong: '2/5', pilihan: ['2/5', '3/5', '4/6', '1/4'],
  },
  latihan: [
    { t: 'Sebuah koin dilempar sekali. Peluang muncul gambar adalah ...', o: ['1/2', '1', '1/4', '2', '0'], k: 0, d: 1, b: 'Ada dua kemungkinan (angka atau gambar), satu yang diinginkan → 1/2.' },
    { t: 'Dari kartu bernomor 1–20, peluang terambil kartu kelipatan 5 adalah ...', o: ['1/5', '1/4', '1/10', '4/5', '1/2'], k: 0, d: 1, b: 'Kelipatan 5: 5, 10, 15, 20 → 4 kartu. 4/20 = 1/5.' },
    { t: 'Peluang besok hujan 0,3. Peluang besok tidak hujan adalah ...', o: ['0,7', '0,3', '1,3', '0', '0,03'], k: 0, d: 2, b: '1 − 0,3 = 0,7.' },
    { t: 'Dua dadu dilempar bersamaan. Peluang jumlah mata dadu 7 adalah ...', o: ['1/6', '7/36', '1/12', '1/36', '1/7'], k: 0, d: 3, b: 'n(S) = 36. Pasangan berjumlah 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) → 6. 6/36 = 1/6.', h: 'Daftar semua pasangan yang jumlahnya 7.' },
  ],
  uji: [
    { t: 'Sebuah kantong berisi 5 kelereng merah, 3 kuning, dan 2 hijau. Peluang terambil kelereng yang BUKAN merah adalah ...', o: ['1/2', '3/10', '1/5', '2/5', '3/5'], k: 0, d: 2, b: 'Bukan merah = 3 + 2 = 5 dari 10 → 1/2.' },
    { t: 'Dari 40 siswa, 25 suka matematika. Jika satu siswa dipilih secara acak, peluang terpilih siswa yang tidak suka matematika adalah ...', o: ['3/8', '5/8', '3/5', '1/40', '15/25'], k: 0, d: 2, b: 'Tidak suka = 15. 15/40 = 3/8.' },
    { t: 'Dua koin dilempar bersamaan. Peluang muncul paling sedikit satu gambar adalah ...', o: ['3/4', '1/2', '1/4', '1', '2/3'], k: 0, d: 3, b: 'Hasil: GG, GA, AG, AA. Paling sedikit satu gambar: 3 dari 4 → 3/4 (atau 1 − 1/4).' },
  ],
});

A('pm5', 'pm', 'Model matematika dari cerita', 'Menerjemahkan cerita menjadi persamaan.', ['pm3'], {
  hook: 'Soal cerita PM pada dasarnya meminta satu hal: ==ubah cerita menjadi persamaan==, lalu selesaikan. Begitu modelnya benar, hitungannya biasanya mudah.',
  jelas: {
    analogi: 'Membuat model matematika itu seperti menerjemahkan bahasa: ‘dua kali lipat’ → 2x, ‘lebih 5’ → + 5, ‘sisa’ → dikurangi.\n\nKalau kamu hafal **kamus terjemahannya**, soal cerita tinggal diterjemahkan kalimat demi kalimat.',
    langkah: [
      'Tentukan apa yang dicari dan beri simbol (misalnya x).',
      'Terjemahkan setiap kalimat menjadi persamaan.',
      'Selesaikan persamaannya.',
      'Cek jawaban dengan memasukkannya kembali ke cerita.',
    ],
    cerita: 'Harga 2 buku dan 1 pulpen Rp17.000; harga 1 buku dan 1 pulpen Rp11.000. Misal buku = b, pulpen = p: 2b + p = 17.000 dan b + p = 11.000. Kurangkan: **b = 6.000**, jadi p = 5.000.',
    singkat: 'Cerita → simbol → persamaan → selesaikan → cek. Kamus: ‘dua kali’ = 2x, ‘lebih’ = +, ‘kurang dari’ = −, ‘jumlah’ = +, ‘selisih’ = −.',
  },
  contoh: {
    soal: 'Umur kakak 3 tahun lebih dari dua kali umur adik. Jumlah umur mereka 27 tahun. Berapa umur adik?',
    langkah: ['Misal umur adik = x → umur kakak = 2x + 3.', 'x + (2x + 3) = 27 → 3x + 3 = 27.', '3x = 24 → x = **8 tahun**. Cek: kakak 19, jumlahnya 27 ✓.'],
    jawab: '8 tahun',
  },
  rumpang: {
    soal: 'Tiket dewasa Rp20.000 dan tiket anak Rp10.000. Sebuah keluarga membeli 2 tiket dewasa dan x tiket anak seharga total Rp70.000. Berapa nilai x?',
    langkah: ['2 × 20.000 + 10.000x = 70.000.', '10.000x = 30.000 → x = ___.'],
    kosong: '3', pilihan: ['3', '5', '7', '2'],
  },
  latihan: [
    { t: 'Sebuah bilangan dikalikan 3 lalu ditambah 7, hasilnya 34. Bilangan itu adalah ...', o: ['9', '11', '8', '27', '10'], k: 0, d: 1, b: '3x + 7 = 34 → 3x = 27 → x = 9.' },
    { t: 'Harga 3 pensil dan 2 penghapus Rp13.000. Harga 1 pensil dan 2 penghapus Rp7.000. Harga 1 pensil adalah ...', o: ['Rp3.000', 'Rp2.000', 'Rp4.000', 'Rp2.500', 'Rp3.500'], k: 0, d: 2, b: 'Kurangkan kedua persamaan: 2 pensil = Rp6.000 → 1 pensil = Rp3.000.' },
    { t: 'Keliling sebuah persegi panjang 50 cm. Panjangnya 5 cm lebih dari lebarnya. Lebarnya adalah ...', o: ['10 cm', '15 cm', '12,5 cm', '20 cm', '25 cm'], k: 0, d: 2, b: '2 × (l + 5 + l) = 50 → 4l + 10 = 50 → l = 10 cm (panjang 15 cm).' },
    { t: 'Sebuah layanan ojek daring menetapkan tarif Rp8.000 untuk 2 km pertama dan Rp2.500 untuk setiap km berikutnya. Jika Sinta membayar Rp20.500, jarak perjalanannya adalah ...', o: ['7 km', '5 km', '8 km', '6 km', '9 km'], k: 0, d: 3, b: '8.000 + 2.500 × (x − 2) = 20.500 → 2.500 × (x − 2) = 12.500 → x − 2 = 5 → x = 7 km. (5 km muncul kalau lupa menambah 2 km pertama.)' },
  ],
  uji: [
    { t: 'Jumlah dua bilangan 40 dan selisihnya 8. Bilangan yang lebih besar adalah ...', o: ['24', '16', '32', '20', '28'], k: 0, d: 2, b: 'x + y = 40 dan x − y = 8 → 2x = 48 → x = 24.' },
    { t: 'Kursi di sebuah aula disusun berbaris, 12 kursi per baris, ditambah 4 kursi tambahan di depan. Jika total kursi 160, banyak barisnya adalah ...', o: ['13', '12', '14', '15', '11'], k: 0, d: 2, b: '12x + 4 = 160 → 12x = 156 → x = 13.' },
    { t: 'Rina punya tabungan awal Rp200.000 dan menabung Rp50.000 setiap minggu. Dodi tidak punya tabungan awal, tetapi menabung Rp75.000 setiap minggu. Setelah berapa minggu tabungan mereka sama?', o: ['8 minggu', '4 minggu', '6 minggu', '10 minggu', '12 minggu'], k: 0, d: 3, b: '200.000 + 50.000x = 75.000x → 25.000x = 200.000 → x = 8 minggu.' },
  ],
});
