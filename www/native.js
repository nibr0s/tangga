'use strict';
/* =====================================================================
   Tangga — jembatan aplikasi Android (Capacitor).
   File ini aman dimuat di web biasa: semua fitur hanya aktif bila
   aplikasi berjalan sebagai aplikasi Android (NATIVE = true).
   - Pengingat harian (notifikasi lokal, tanpa server)
   - Tombol kembali Android
   - Cadangan progres lewat lembar Bagikan
   ===================================================================== */

const NATIVE = !!(window.Capacitor && typeof window.Capacitor.isNativePlatform === 'function' && window.Capacitor.isNativePlatform());
const NP = {};   // plugin bawaan Capacitor (diisi saat NATIVE)
if (NATIVE && typeof window.Capacitor.registerPlugin === 'function') {
  for (const n of ['App', 'LocalNotifications', 'Filesystem', 'Share']) {
    try { NP[n] = window.Capacitor.registerPlugin(n); } catch (e) { /* plugin tidak ada */ }
  }
}

/* ---------- pengingat harian ---------- */
const INGAT_JAM = [['off', 'Mati'], ['07:00', '07.00'], ['16:00', '16.00'], ['19:00', '19.00'], ['21:00', '21.00']];
const INGAT_ID0 = 7100;   // id notifikasi 7100–7106 = 7 hari ke depan
const INGAT_KANAL = 'pengingat';
const INGAT_PESAN = [
  ['Satu anak tangga hari ini?', 'Lima menit cukup. Besok kamu sudah lebih tinggi dari hari ini.'],
  ['Kata Hari Ini sudah menunggu', 'Tebak kata, jawab satu soal, dan streak-mu aman.'],
  ['Waktunya naik satu anak tangga', 'Mulai dari yang kecil: satu sesi singkat sebelum tidur.'],
  ['Skor UTBK naik pelan-pelan', 'Yang penting tiap hari. Buka Tangga sebentar, yuk.'],
  ['Ada ulasan yang jatuh tempo', 'Mengulang tepat waktu bikin materi nempel lebih lama.'],
  ['Tantangan harian baru', 'Teka-teki hari ini sama untuk semua pejuang UTBK. Coba sekarang!'],
  ['Jangan biarkan tangganya berdebu', 'Satu sesi pendek hari ini menjaga semangatmu tetap menyala.'],
];
let ingatBusy = null;

function ingatAktif() { return NATIVE && !!NP.LocalNotifications && S.set.ingat && S.set.ingat !== 'off'; }

/* Jadwalkan ulang 7 hari ke depan. Hari ini dilewati kalau streak hari ini sudah aman. */
function jadwalkanPengingat() {
  if (!NATIVE || !NP.LocalNotifications) return Promise.resolve();
  const run = async () => {
    const LN = NP.LocalNotifications;
    try {
      await LN.cancel({ notifications: Array.from({ length: 7 }, (_, i) => ({ id: INGAT_ID0 + i })) });
      if (!S.onboarded || S.demo || !ingatAktif()) return;
      const perm = await LN.checkPermissions();
      if (!perm || perm.display !== 'granted') return;
      const [hh, mm] = String(S.set.ingat).split(':').map(Number);
      const t = today(); const st = S.streak; const sudah = st.last === t;
      const nid = nextAtom(TANGGA[S.fokus] ? S.fokus : 'pk');
      const list = [];
      for (let i = 0; i < 7; i++) {
        if (i === 0 && sudah) continue;
        const d = parseKey(addDays(t, i)); d.setHours(hh, mm || 0, 0, 0);
        const at = new Date(d.getTime() - (S.demoOffset || 0) * 864e5);   // waktu nyata, bukan waktu uji “lompat hari”
        if (at.getTime() < Date.now() + 60000) continue;
        let [title, body] = INGAT_PESAN[(parseKey(addDays(t, i)).getDate()) % INGAT_PESAN.length];
        if (i === 0 && st.n > 0) { title = `Streak ${st.n} hari menunggumu`; body = nid ? `Satu sesi singkat menjaganya. Berikutnya: ${ATOM[nid].judul}.` : 'Satu sesi singkat hari ini menjaganya tetap menyala.'; }
        else if (i === 1 && st.n > 0 && sudah) { title = `Pertahankan streak ${st.n + 1} hari`; }
        list.push({ id: INGAT_ID0 + i, title, body, channelId: INGAT_KANAL, smallIcon: 'ic_stat_tangga', iconColor: '#2142D3', schedule: { at, allowWhileIdle: true } });
      }
      if (list.length) await LN.schedule({ notifications: list });
    } catch (e) { /* notifikasi gagal dijadwalkan; aplikasi tetap jalan */ }
  };
  ingatBusy = (ingatBusy || Promise.resolve()).then(run, run);
  return ingatBusy;
}

/* Dipanggil saat murid memilih jam pengingat (atau “Mati”). */
async function setPengingat(v) {
  if (!NATIVE || !NP.LocalNotifications) return;
  const LN = NP.LocalNotifications;
  S.set.ingatTanya = true;
  if (v === 'off') { S.set.ingat = 'off'; save(); jadwalkanPengingat(); renderAll(); if (SH) renderSheet(); return; }
  let ok = false;
  try {
    let p = await LN.checkPermissions();
    if (!p || p.display !== 'granted') p = await LN.requestPermissions();
    ok = !!p && p.display === 'granted';
  } catch (e) { ok = false; }
  if (!ok) {
    S.set.ingat = 'off'; save(); renderAll(); if (SH) renderSheet();
    toast('Izin notifikasi belum diberikan. Nyalakan di Pengaturan HP → Aplikasi → Tangga → Notifikasi.', 'warn');
    return;
  }
  S.set.ingat = v; save();
  await jadwalkanPengingat();
  renderAll(); if (SH) renderSheet();
  toast(`Pengingat harian jam ${v.replace(':', '.')} menyala.`);
}

/* Kartu di Beranda: ajakan menyalakan pengingat (sekali, sampai dijawab). */
function pengingatCard() {
  if (!NATIVE || !NP.LocalNotifications || S.demo || S.set.ingatTanya || ingatAktif()) return '';
  return `<section class="card ingat-card"><h3>${icon('clock')} Mau diingatkan setiap hari?</h3><p class="small">Satu notifikasi kecil di jam pilihanmu, hanya kalau streak hari itu belum aman.</p>
    <div class="row-btns">${INGAT_JAM.slice(1).map(([v, l]) => `<button class="btn sm${v === '19:00' ? ' primary' : ''}" data-act="ingat" data-v="${v}">${l}</button>`).join('')}<button class="btn sm ghost" data-act="ingat-nanti">Tidak usah</button></div></section>`;
}

/* ---------- cadangan lewat lembar Bagikan ---------- */
async function nativeShareBackup(blob, name) {
  if (!NP.Filesystem || !NP.Share) throw new Error('unavailable');
  const text = await blob.text();
  const w = await NP.Filesystem.writeFile({ path: name, data: text, directory: 'CACHE', encoding: 'utf8' });
  try {
    await NP.Share.share({ title: 'Cadangan Tangga', text: 'Cadangan progres Tangga — simpan di Drive atau kirim ke dirimu sendiri.', files: [w.uri], dialogTitle: 'Simpan cadangan ke…' });
    return true;
  } catch (e) {
    const m = String((e && e.message) || e || '').toLowerCase();
    if (m.includes('cancel')) return false;
    throw e;
  }
}

/* ---------- tombol kembali Android ---------- */
function onBackButton() {
  if (SH) { closeSheet(); return; }
  if (OV) {
    if (OV.kind === 'onb') { if (OV.step > 0) ACT['onb-back']({}); else if (NP.App) NP.App.minimizeApp().catch(() => {}); return; }
    const b = document.querySelector('#ov .ov-h .icon-btn[data-act]');
    if (b) b.click(); else closeOv();
    return;
  }
  if (UI.tab !== 'beranda') { location.hash = 'beranda'; return; }
  if (NP.App) NP.App.minimizeApp().catch(() => NP.App.exitApp());
}

/* ---------- penyalaan ---------- */
/* Begitu streak hari ini aman, batalkan pengingat hari ini. */
if (NATIVE) {
  const markActive0 = markActive;
  markActive = function (...args) { const r = markActive0.apply(this, args); if (r) jadwalkanPengingat(); return r; };
}

function nativeInit() {
  if (!NATIVE) return;
  document.documentElement.classList.add('native');
  const rf = $('#restore-file'); if (rf) rf.removeAttribute('accept');   // pemilih file Android sering salah membaca tipe .json
  if (S.set.ingat == null) S.set.ingat = 'off';
  if (NP.App) {
    NP.App.addListener('backButton', onBackButton);
    NP.App.addListener('appStateChange', (st) => {
      if (st && st.isActive) { checkDay(); jadwalkanPengingat(); }
      else { flushPending(); jadwalkanPengingat(); }
    });
  }
  if (NP.LocalNotifications) {
    NP.LocalNotifications.createChannel({ id: INGAT_KANAL, name: 'Pengingat harian', description: 'Pengingat untuk menjaga streak belajar UTBK', importance: 4, visibility: 1, vibration: true }).catch(() => {});
    NP.LocalNotifications.addListener('localNotificationActionPerformed', () => { if (S.onboarded && !OV && !SH) { location.hash = 'beranda'; renderAll(); } });
  }
  jadwalkanPengingat();
}
