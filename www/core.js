'use strict';
/* =====================================================================
   Tangga — inti: utilitas, waktu, penyimpanan, streak, model belajar
   ===================================================================== */

/* ---------- utilitas ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
/* **tebal**, ==stabilo==, baris baru */
const fmt = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/==(.+?)==/g, '<mark>$1</mark>').replace(/\n/g, '<br>');
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const LETTERS = 'ABCDE';
function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function seeded(seed) { let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function shuffle(arr, rnd = Math.random) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const num = (n, d = 0) => Number(n).toLocaleString('id-ID', { minimumFractionDigits: d, maximumFractionDigits: d });
const mean = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
function median(a) { if (!a.length) return 0; const s = a.slice().sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; }

/* ---------- mode: di dalam Claude (AI + akun) atau versi gratis mandiri ---------- */
const IN_CLAUDE = !!(window.claude && typeof window.claude.use === 'function');
/* Alat uji (lompat hari) hanya untuk draf di Claude atau bila URL memuat ?dev */
const DEV = IN_CLAUDE || /[?&]dev(=|&|$)/.test(location.search);

/* ---------- waktu (mendukung “lompat hari” untuk uji coba) ---------- */
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const HARI1 = ['M', 'S', 'S', 'R', 'K', 'J', 'S'];
const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const BLN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const nowMs = () => Date.now() + (S.demoOffset || 0) * 864e5;
const now = () => new Date(nowMs());
const keyOf = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const today = () => keyOf(now());
function parseKey(k) { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); }
function addDays(k, n) { const d = parseKey(k); d.setDate(d.getDate() + n); return keyOf(d); }
function diffDays(a, b) { const [y1, m1, d1] = a.split('-').map(Number); const [y2, m2, d2] = b.split('-').map(Number); return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 864e5); }
function tglPanjang(k) { const d = parseKey(k); return `${HARI[d.getDay()]}, ${d.getDate()} ${BULAN[d.getMonth()]}`; }
function tglPendek(k) { const d = parseKey(k); return `${d.getDate()} ${BLN[d.getMonth()]}`; }
function salam() { const h = now().getHours(); return h < 4 ? 'Selamat malam' : h < 11 ? 'Selamat pagi' : h < 15 ? 'Selamat siang' : h < 18 ? 'Selamat sore' : 'Selamat malam'; }

/* ---------- state ---------- */
function utbkDefault(kelas) { return kelas === 11 ? '2028-04-21' : '2027-04-21'; }
function fresh() {
  return {
    v: 1, savedAt: 0, onboarded: false, demo: false, demoOffset: 0,
    profil: { nama: '', kelas: 12, ptn: '', prodi: '', target: 650, utbk: '2027-04-21' },
    set: { gaya: 'analogi', durasi: 10, targetXP: 40, tempo: 'normal', petunjuk: 'sebagian', bahasa: 'id', ingat: 'off', ingatTanya: false },
    fokus: 'pk',
    xp: { total: 0, hari: {} },
    streak: { n: 0, best: 0, last: null, freeze: 0, aktif: [], beku: [], putus: null },
    atom: {},      // id → { lvl, rev, due, lulus, gagal, seen, tempat }
    ability: {},   // subtes → { r, n }  (rating ala Elo)
    itemAdj: {},   // id soal → penyesuaian tingkat kesulitan
    self: [],      // penilaian diri: [{ d, r: { pu: 1–5, ... } }]
    skor: [],      // riwayat perkiraan skor: [{ d, v }]
    tryout: [],    // [{ d, skor, benar, n, dtk, per }]
    salah: [],     // Buku Salah: [{ q, n, ok, d }]
    kartu: {},     // id kartu → { e, i, n, due, l, first }
    kartuku: [],   // kartu buatan sendiri
    games: {},     // tanggal → { kata, kelompok, ... }
    lencana: {},   // id → tanggal
    kustom: [],    // tangga buatan Kak Tangga
    flags: [],     // laporan konten keliru
    cadangan: null, // tanggal cadangan (file) terakhir
  };
}
function migrate(s) {
  const f = fresh();
  if (!s || typeof s !== 'object') return f;
  return Object.assign(f, s, {
    profil: Object.assign(f.profil, s.profil || {}),
    set: Object.assign(f.set, s.set || {}),
    xp: Object.assign(f.xp, s.xp || {}),
    streak: Object.assign(f.streak, s.streak || {}),
  });
}
let S = fresh();
let LOG = [];   // setiap jawaban dicatat: { t, q, s, a, d, y, ms, src, h, g }
let GEN = {};   // pelajaran yang disusun AI: id → { L, t }

/* ---------- penyimpanan: perangkat + akun (db) ---------- */
const LS_KEYS = { state: 'tangga.state.v1', log: 'tangga.log.v1', gen: 'tangga.gen.v1' };
function lsGet(k) { try { const r = localStorage.getItem(LS_KEYS[k]); return r ? JSON.parse(r) : null; } catch (e) { return null; } }
function lsSet(k, v) { try { localStorage.setItem(LS_KEYS[k], JSON.stringify(v)); } catch (e) { /* penyimpanan perangkat tidak tersedia */ } }
function lsDel(k) { try { localStorage.removeItem(LS_KEYS[k]); } catch (e) { /* abaikan */ } }

const Cloud = { db: null, uid: null, on: false, t: {}, busy: {}, dirty: {}, pend: new Set(), err: null };
const payloadOf = (k) => (k === 'state' ? S : k === 'log' ? LOG : GEN);
function save(...keys) {
  if (!keys.length) keys = ['state'];
  S.savedAt = Date.now();
  if (!keys.includes('state')) keys.push('state');
  for (const k of keys) { lsSet(k, payloadOf(k)); if (!S.demo) queueCloud(k); }
}
function queueCloud(k) {
  if (!Cloud.on) return;
  Cloud.pend.add(k);
  clearTimeout(Cloud.t[k]);
  Cloud.t[k] = setTimeout(() => flushCloud(k), 1200);
}
function bodyFor(k) {
  if (k === 'log' && LOG.length > 1500) LOG.splice(0, LOG.length - 1500);
  let json = JSON.stringify(payloadOf(k));
  if (k === 'gen') {
    const ids = Object.keys(GEN).sort((a, b) => (GEN[a].t || 0) - (GEN[b].t || 0));
    while (json.length > 230000 && ids.length) { delete GEN[ids.shift()]; json = JSON.stringify(GEN); }
  }
  if (k === 'log') { while (json.length > 230000 && LOG.length > 100) { LOG.splice(0, 200); json = JSON.stringify(LOG); } }
  return { v: 1, savedAt: Date.now(), json };
}
async function flushCloud(k) {
  if (!Cloud.on) return;
  if (Cloud.busy[k]) { Cloud.dirty[k] = true; return; }
  Cloud.busy[k] = true; Cloud.pend.delete(k);
  try {
    await Cloud.db.collection('data/users/' + Cloud.uid).doc(k).set(bodyFor(k));
    Cloud.err = null;
  } catch (e) {
    Cloud.err = (e && e.code) || 'unavailable';
    if (['invalid_argument', 'revoked', 'not_granted', 'capability_disabled', 'capability_removed', 'quota_exceeded'].includes(Cloud.err)) { Cloud.on = false; if (typeof renderAll === 'function') renderAll(); }
  } finally {
    Cloud.busy[k] = false;
    if (Cloud.dirty[k]) { Cloud.dirty[k] = false; flushCloud(k); }
  }
}
function flushPending() { for (const k of Array.from(Cloud.pend)) { clearTimeout(Cloud.t[k]); flushCloud(k); } }
const parseDoc = (d) => { try { return d && typeof d.json === 'string' ? JSON.parse(d.json) : null; } catch (e) { return null; } };

async function initCloud() {
  const C = window.claude;
  if (!C || typeof C.use !== 'function') return;
  let db = null, user = null;
  try { [db, user] = await Promise.all([C.use('db'), C.use('user')]); } catch (e) { return; }
  if (!db || !user) return;
  let uid = null;
  try { uid = await user.id(); } catch (e) { uid = null; }
  if (!uid) return;
  Cloud.db = db; Cloud.uid = uid;
  try {
    const col = db.collection('data/users/' + uid);
    const [a, b, c] = await Promise.all(['state', 'log', 'gen'].map((k) => col.doc(k).get()));
    const rs = a.exists ? parseDoc(a.data()) : null;
    const remoteNewer = !!rs && ((rs.savedAt || 0) >= (S.savedAt || 0) || S.demo || !S.onboarded);
    if (remoteNewer) {
      S = migrate(rs);
      const rl = b.exists ? parseDoc(b.data()) : null; if (Array.isArray(rl)) LOG = rl;
      const rg = c.exists ? parseDoc(c.data()) : null; if (rg && typeof rg === 'object') GEN = rg;
      lsSet('state', S); lsSet('log', LOG); lsSet('gen', GEN);
      if (typeof afterLoad === 'function') afterLoad();
    }
    Cloud.on = true;
    if (!remoteNewer && S.onboarded && !S.demo) ['state', 'log', 'gen'].forEach(queueCloud);
    if (typeof renderAll === 'function') { onDayChange(); renderAll(); }
  } catch (e) {
    Cloud.err = (e && e.code) || 'unavailable';
  }
}

/* ---------- cadangan ke file (versi gratis menyimpan di browser saja) ---------- */
const BACKUP_APP = 'tangga-utbk';
function backupBlob() {
  const data = { app: BACKUP_APP, v: 1, dibuat: new Date().toISOString(), tanggal: today(), state: S, log: LOG, gen: GEN };
  return new Blob([JSON.stringify(data)], { type: 'application/json' });
}
function backupName() {
  const nama = String(S.profil.nama || 'saya').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 20) || 'saya';
  return `tangga-cadangan-${nama}-${today()}.json`;
}
/* Mengembalikan { ok, data, alasan } tanpa mengubah apa pun. */
function parseBackup(text) {
  let d = null;
  try { d = JSON.parse(text); } catch (e) { return { ok: false, alasan: 'File ini bukan cadangan Tangga (format tidak terbaca).' }; }
  if (!d || typeof d !== 'object' || d.app !== BACKUP_APP || !d.state || typeof d.state !== 'object') return { ok: false, alasan: 'File ini bukan cadangan Tangga.' };
  if (!d.state.profil || typeof d.state.profil !== 'object') return { ok: false, alasan: 'Cadangan ini rusak atau tidak lengkap.' };
  return { ok: true, data: d };
}
function applyBackup(d) {
  S = migrate(d.state);
  if (d.tanggal && /^\d{4}-\d{2}-\d{2}$/.test(d.tanggal)) S.cadangan = d.tanggal;
  LOG = Array.isArray(d.log) ? d.log : [];
  GEN = d.gen && typeof d.gen === 'object' ? d.gen : {};
  save('state', 'log', 'gen');
}
function backupStale() {
  if (IN_CLAUDE || Cloud.on || !S.onboarded || S.demo) return false;
  const n = LOG.filter((e) => e.src !== 'kartu').length;
  if (n < 30) return false;
  return !S.cadangan || diffDays(S.cadangan, today()) >= 14;
}

/* ---------- subtes & tangga ---------- */
const SUB = Object.fromEntries(SUBTES.map((x) => [x.id, x]));
const LAIN = { id: 'lain', kode: 'LAIN', nama: 'Topik lain', komponen: '—', soal: 0, menit: 0, hue: 200 };
const subOf = (s) => SUB[s] || LAIN;
const tanggaOf = (id) => (ATOM[id] && (ATOM[id].tangga || ATOM[id].s)) || null;
function registerCustom() {
  for (const k of S.kustom) {
    TANGGA[k.id] = { judul: k.judul, atoms: k.atoms.map((a) => a.id), kustom: true, s: k.s };
    for (const a of k.atoms) ATOM[a.id] = { id: a.id, s: SUB[k.s] ? k.s : 'lain', judul: a.judul, ringkas: a.ringkas, pra: a.pra || [], L: null, tangga: k.id };
  }
}

/* ---------- bank soal ---------- */
const QB = {};            // id soal → soal
const AQ = {};            // id anak tangga → { l: [...], u: [...] }
function regAtom(id, L, ai) {
  const a = ATOM[id]; if (!a || !L) return;
  const tag = ai ? 'ai' : '';
  const mk = (q, kind, i) => Object.assign({}, q, { id: `${id}-${tag}${kind}${i}`, s: a.s, a: id, ai: !!ai });
  const l = (L.latihan || []).map((q, i) => mk(q, 'l', i));
  const u = (L.uji || []).map((q, i) => mk(q, 'u', i));
  AQ[id] = { l, u };
  for (const q of l.concat(u)) QB[q.id] = q;
}
function initBank() {
  for (const id in ATOM) if (ATOM[id].L) regAtom(id, ATOM[id].L, false);
  for (const q of BANK_EXTRA) { QB[q.id] = q; }
}
function registerGen() { for (const id in GEN) if (ATOM[id] && !ATOM[id].L && GEN[id] && GEN[id].L) regAtom(id, GEN[id].L, true); }
const lessonOf = (id) => (ATOM[id] && ATOM[id].L) || (GEN[id] && GEN[id].L) || null;
function qsOf(id) { return AQ[id] || { l: BANK_EXTRA.filter((q) => q.a === id), u: [] }; }
function qsOfSub(s) { return Object.values(QB).filter((q) => q.s === s); }

/* ---------- tingkat penguasaan per anak tangga ---------- */
const LEVEL = ['Belum mulai', 'Belajar', 'Kenal', 'Cakap', 'Kuasai'];
const LW = [0, 0.15, 0.4, 0.75, 1];
const lvl = (id) => (S.atom[id] && S.atom[id].lvl) || 0;
const atomRec = (id) => S.atom[id] || (S.atom[id] = { lvl: 0, rev: 0, due: null });
const isOpen = (id) => !!ATOM[id] && ATOM[id].pra.every((p) => lvl(p) >= 3);
function nextAtom(key) { const t = TANGGA[key]; if (!t) return null; return t.atoms.find((id) => lvl(id) < 3 && isOpen(id)) || null; }
function dueList() { const t = today(); return Object.keys(S.atom).filter((id) => ATOM[id] && S.atom[id].lvl >= 3 && S.atom[id].due && S.atom[id].due <= t && (lessonOf(id) || qsOf(id).l.length)); }
function mastery(key) { const t = TANGGA[key]; if (!t || !t.atoms.length) return 0; return t.atoms.reduce((a, id) => a + LW[lvl(id)], 0) / t.atoms.length; }

/* ---------- model belajar (rating ala Elo → perkiraan skor) ---------- */
const ability = (s) => S.ability[s] || (S.ability[s] = { r: 1000, n: 0 });
const itemR = (q) => [0, 850, 1000, 1150][q.d || 2] + (S.itemAdj[q.id] || 0);
const pCorrect = (r, d) => 1 / (1 + Math.pow(10, (d - r) / 400));
/* Pilih soal dengan peluang benar paling dekat 77,5% (zona 70–85%). */
function pickSweet(qs, s) {
  const r = ability(s).r; let best = null, bd = 9;
  for (const q of qs) { const dd = Math.abs(pCorrect(r, itemR(q)) - 0.775) + Math.random() * 0.05; if (dd < bd) { bd = dd; best = q; } }
  return best;
}
function record(q, y, ms, src, extra) {
  extra = extra || {};
  const ab = ability(q.s);
  const p = pCorrect(ab.r, itemR(q));
  const K = ab.n < 30 ? 40 : 22;
  ab.r = Math.round(ab.r + K * ((y ? 1 : 0) - p));
  ab.n += 1;
  S.itemAdj[q.id] = Math.round((S.itemAdj[q.id] || 0) + 10 * (p - (y ? 1 : 0)));
  LOG.push({ t: nowMs(), q: q.id, s: q.s, a: q.a, d: q.d || 2, y: y ? 1 : 0, ms: Math.round(ms || 0), src, h: extra.h ? 1 : 0, g: extra.g || undefined });
  if (LOG.length > 1500) LOG.splice(0, LOG.length - 1500);
  if (y) addXP(2);
  if (!y && src !== 'salah' && src !== 'tempat') addSalah(q.id);
  if (LOG.filter((e) => e.src !== 'kartu').length >= 100) award('soal100');
}
function selfOf(s) { for (let i = S.self.length - 1; i >= 0; i--) { const v = S.self[i].r[s]; if (v) return v; } return 0; }
function prevSelfOf(s) { let seen = false; for (let i = S.self.length - 1; i >= 0; i--) { const v = S.self[i].r[s]; if (v) { if (seen) return v; seen = true; } } return 0; }
/* Perkiraan kasar (model draf): penilaian diri sebagai titik awal, lalu makin
   bergeser ke data latihan (rating + penguasaan) seiring bertambahnya jawaban. */
function prediksi(s) {
  const ab = S.ability[s] || { r: 1000, n: 0 };
  const c = TANGGA[s] ? mastery(s) : 0;
  const model = 500 + (ab.r - 1000) * 0.6 + 90 * c;
  const prior = 380 + 45 * (selfOf(s) || 3);
  const mastered = TANGGA[s] ? TANGGA[s].atoms.filter((id) => lvl(id) >= 3).length : 0;
  const n = ab.n + mastered * 3;
  const w = n / (n + 20);
  return { skor: Math.round(clamp(prior * (1 - w) + model * w, 200, 950)), rentang: Math.round(18 + 110 / Math.sqrt(n + 1)), n };
}
function prediksiTotal() {
  const ps = SUBTES.map((x) => prediksi(x.id));
  return {
    skor: Math.round(mean(ps.map((p) => p.skor))),
    rentang: Math.round(mean(ps.map((p) => p.rentang)) / Math.sqrt(2)),
    per: Object.fromEntries(SUBTES.map((x, i) => [x.id, ps[i].skor])),
  };
}
function snapSkor() {
  if (!S.onboarded) return;
  const t = today(); const v = prediksiTotal().skor; const last = S.skor[S.skor.length - 1];
  if (last && last.d === t) last.v = v; else S.skor.push({ d: t, v });
  if (S.skor.length > 400) S.skor.splice(0, S.skor.length - 400);
}

/* ---------- XP, lencana, Buku Salah ---------- */
function addXP(n) { const t = today(); S.xp.total += n; S.xp.hari[t] = (S.xp.hari[t] || 0) + n; }
const xpToday = () => S.xp.hari[today()] || 0;
let pendingToasts = [];
function award(id) {
  if (S.lencana[id]) return;
  S.lencana[id] = today();
  const L = LENCANA.find((x) => x.id === id);
  if (L) pendingToasts.push({ msg: `Lencana baru: ${L.nama}`, kind: 'badge' });
}
function addSalah(qid) {
  const e = S.salah.find((x) => x.q === qid);
  if (e) { e.n += 1; e.ok = 0; e.d = today(); } else S.salah.push({ q: qid, n: 1, ok: 0, d: today() });
  if (S.salah.length > 200) S.salah.shift();
}
function checkPuncak(key) { const t = TANGGA[key]; if (t && t.atoms.every((id) => lvl(id) >= 3)) award('puncak'); }

/* ---------- streak ---------- */
function onDayChange() {
  const t = today(); const st = S.streak;
  if (st.last && st.n > 0) {
    const gap = diffDays(st.last, t) - 1;
    if (gap > 0) {
      if (st.freeze >= gap) {
        for (let i = 1; i <= gap; i++) st.beku.push(addDays(st.last, i));
        st.freeze -= gap; st.last = addDays(t, -1);
        pendingToasts.push({ msg: `Pembeku streak terpakai (${gap}×). Streak-mu aman.`, kind: 'info' });
      } else {
        if (gap === 1) st.putus = { n: st.n, hari: t };
        st.n = 0;
      }
    }
  }
  if (st.putus && st.putus.hari !== t) st.putus = null;
  if (st.beku.length > 120) st.beku = st.beku.slice(-120);
  const ks = Object.keys(S.xp.hari).sort();
  if (ks.length > 120) for (const k of ks.slice(0, ks.length - 120)) delete S.xp.hari[k];
  const gs = Object.keys(S.games).sort();
  if (gs.length > 30) for (const k of gs.slice(0, gs.length - 30)) delete S.games[k];
  snapSkor();
  if (S.onboarded) save();
}
/* Satu sesi selesai (pelajaran, permainan harian, latihan, ulasan, tryout, 10 kartu) = streak +1. */
function markActive() {
  const t = today(); const st = S.streak;
  if (st.last === t || (st.last && st.last > t)) return false;
  st.n = st.last && diffDays(st.last, t) === 1 ? st.n + 1 : 1;
  st.last = t;
  if (!st.aktif.includes(t)) st.aktif.push(t);
  if (st.aktif.length > 400) st.aktif = st.aktif.slice(-400);
  st.best = Math.max(st.best, st.n);
  if (st.n % 7 === 0) st.freeze = Math.min(2, st.freeze + 1);
  if (st.n >= 7) award('s7');
  if (st.n >= 30) award('s30');
  if (st.n >= 100) award('s100');
  pendingToasts.push({ msg: st.n === 1 ? 'Streak dimulai! Hari 1.' : `Streak ${st.n} hari!`, kind: 'streak' });
  return true;
}
function repairStreak() {
  const st = S.streak; const t = today();
  if (!st.putus || st.putus.hari !== t) return false;
  const base = st.putus.n;
  st.beku.push(addDays(t, -1));
  if (st.last === t) st.n = base + 1; else { st.n = base; st.last = addDays(t, -1); }
  st.best = Math.max(st.best, st.n);
  st.putus = null;
  return true;
}

/* ---------- kartu (pengulangan berjarak, SM-2 sederhana) ---------- */
function allCards() {
  const out = [];
  for (const [k, dk] of Object.entries(DEK)) for (const c of dk.kartu) out.push(Object.assign({ dek: k }, c));
  for (const c of S.kartuku) out.push(Object.assign({ dek: 'kartuku' }, c));
  return out;
}
const NEW_PER_DAY = 10;
function cardQueue(dek) {
  const t = today();
  const cs = allCards().filter((c) => !dek || c.dek === dek);
  const due = cs.filter((c) => S.kartu[c.id] && S.kartu[c.id].due <= t);
  const newToday = Object.entries(S.kartu).filter(([id, r]) => r.first === t && (!dek || cs.some((c) => c.id === id))).length;
  const fresh = cs.filter((c) => !S.kartu[c.id]).slice(0, Math.max(0, NEW_PER_DAY - newToday));
  const learned = cs.filter((c) => S.kartu[c.id] && S.kartu[c.id].n > 0).length;
  return { due, fresh, total: cs.length, learned };
}
function nextInterval(c, g) {
  const r = S.kartu[c.id] || { e: 2.5, i: 0, n: 0 };
  if (g === 1) return 0;
  if (g === 2) return Math.max(1, Math.round((r.i || 1) * 1.2));
  if (g === 3) return r.n === 0 ? 1 : r.n === 1 ? 3 : Math.round(r.i * r.e);
  return r.n === 0 ? 3 : Math.round(Math.max(r.i, 1) * r.e * 1.3);
}
function rateCard(c, g) {
  const t = today(); const isNew = !S.kartu[c.id];
  const r = S.kartu[c.id] || (S.kartu[c.id] = { e: 2.5, i: 0, n: 0, due: t, l: 0, first: t });
  const iv = nextInterval(c, g);
  if (g === 1) { r.n = 0; r.i = 0; r.l += 1; r.e = Math.max(1.3, r.e - 0.2); r.due = t; }
  else { if (g === 2) r.e = Math.max(1.3, r.e - 0.15); if (g === 4) r.e += 0.15; r.i = iv; r.n += 1; r.due = addDays(t, iv); }
  LOG.push({ t: nowMs(), q: c.id, s: 'kartu', y: g >= 3 ? 1 : 0, src: 'kartu', baru: isNew ? 1 : 0, g });
  addXP(1);
}

/* ---------- statistik untuk halaman Kemajuan ---------- */
function statsRange(fromMs, toMs) {
  const L = LOG.filter((e) => e.t >= fromMs && e.t < toMs && e.src !== 'kartu');
  const hard = L.filter((e) => (e.d || 2) >= 2);
  const times = L.filter((e) => e.ms > 0).map((e) => e.ms / 1000);
  return { n: L.length, acc: L.length ? mean(L.map((e) => e.y)) : null, accHard: hard.length ? mean(hard.map((e) => e.y)) : null, dtk: times.length ? median(times) : null };
}
function retensi() {
  const from = nowMs() - 30 * 864e5;
  const L = LOG.filter((e) => e.src === 'kartu' && !e.baru && e.t >= from);
  return L.length ? mean(L.map((e) => e.y)) : null;
}
function aktif7() { const t = today(); let c = 0; for (let i = 0; i < 7; i++) if (S.streak.aktif.includes(addDays(t, -i))) c += 1; return c; }
function masteryAll() { return mean(SUBTES.map((x) => mastery(x.id))); }
function subAcc(s) { const L = LOG.filter((e) => e.s === s && e.src !== 'kartu'); return L.length >= 5 ? { acc: mean(L.map((e) => e.y)), n: L.length } : null; }
