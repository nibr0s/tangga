'use strict';
/* =====================================================================
   Tangga — Kak Tangga (AI): obrolan tutor, penyusun anak tangga,
   pemecah topik, dan “jelaskan dengan cara baru”.
   Memakai kemampuan `sample` (Claude) dari halaman artefak.
   ===================================================================== */

const AI = { s: null, ok: false, imgs: false, types: [], off: false, server: false };

async function initAI() {
  const C = window.claude;
  if (C && typeof C.use === 'function') {
    let s = null;
    try { s = await C.use('sample'); } catch (e) { s = null; }
    if (!s) return;
    AI.s = s; AI.ok = true;
    try { const lim = await s.limits(); AI.imgs = !!(lim && lim.images); AI.types = (lim && lim.images && lim.images.mediaTypes) || []; } catch (e) { AI.imgs = false; }
    renderAll(); if (SH) renderSheet(); if (OV) renderOv();
    return;
  }
  /* versi web & Android: Kak Tangga lewat server Tangga (kalau alamatnya diisi di config.js) */
  if (!SRV.on || AI.ok) return;
  if (!(await srvStatus())) { window.addEventListener('online', () => { if (!AI.ok) initAI(); }, { once: true }); return; }
  if (!SRV.ai) return;
  AI.s = srvSampler(); AI.ok = true; AI.server = true; AI.imgs = SRV.imgs; AI.types = ['image/jpeg', 'image/png', 'image/webp'];
  renderAll(); if (SH) renderSheet(); if (OV) renderOv();
}
/* Pemakaian pertama Kak Tangga lewat server: tampilkan dulu siapa Kak Tangga, aturan aman, dan izin orang tua. */
function perluSetuju(act, d) {
  if (!AI.server || S.set.aiSetuju) return false;
  openSheet('aisetuju', { umur: null, izin: false, next: { act, d: Object.assign({}, d || {}) } });
  return true;
}
function aiMsg(e) {
  const c = e && e.code;
  if (['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled', 'capability_removed'].includes(c)) { AI.ok = false; AI.off = true; return 'Kak Tangga belum diizinkan di tampilan ini.'; }
  if (c === 'cancelled') return '';
  if (c === 'quota_device') return `Jatah Kak Tangga-mu hari ini sudah habis${SRV.limit ? ` (${SRV.limit} pesan)` : ''}. Besok bisa lagi, ya!`;
  if (c === 'quota_global' || c === 'paused') return 'Kak Tangga sedang istirahat karena hari ini banyak yang bertanya. Coba lagi besok.';
  if (c === 'quota_ip') return 'Terlalu banyak permintaan dari jaringan ini hari ini. Coba lagi besok.';
  if (c === 'offline') return 'Kak Tangga butuh internet. Coba lagi saat ada sinyal.';
  if (c === 'origin_not_allowed') return 'Kak Tangga belum diizinkan di alamat ini.';
  if (c === 'images_unavailable') { AI.imgs = false; return 'Foto belum bisa dikirim di tampilan ini.'; }
  if (c === 'image_rejected') return 'Fotonya tidak bisa dibaca. Coba foto lain (JPG atau PNG).';
  if (c === 'rate_limited') return 'Kak Tangga sedang sibuk atau batas pemakaianmu tercapai. Coba lagi nanti.';
  if (c === 'session_expired') return 'Sesimu berakhir. Masuk lagi ke Claude, lalu coba lagi.';
  if (c === 'refused') return 'Kak Tangga tidak bisa membantu permintaan itu. Coba ubah pertanyaannya.';
  if (c === 'invalid_json') return 'Susunan dari Kak Tangga tidak terbaca. Coba lagi.';
  if (c === 'prompt_too_large') return 'Pesannya terlalu panjang. Persingkat sedikit.';
  if (c === 'empty_completion') return 'Kak Tangga tidak menjawab. Coba tanyakan dengan cara lain.';
  return 'Koneksi ke Kak Tangga terputus. Coba lagi.';
}
const fmtAI = (s) => fmt(s).replace(/(^|<br>)#{1,4} /g, '$1').replace(/(^|<br>)[-•*] /g, '$1• ');

function tutorRules(ctxId) {
  const P = S.profil;
  let ctx = '';
  if (ctxId && ATOM[ctxId]) {
    const a = ATOM[ctxId]; const L = lessonOf(ctxId);
    ctx = `\n\nKonteks: murid sedang belajar anak tangga “${a.judul}” (subtes ${subOf(a.s).nama}). Ringkasan: ${a.ringkas}`
      + (L ? `\nInti materi: ${L.jelas.singkat}\nContoh: ${L.contoh.soal} → ${L.contoh.jawab}` : '')
      + (a.pra.length ? `\nPrasyarat: ${a.pra.map((p) => `${ATOM[p].judul} (${LEVEL[lvl(p)]})`).join(', ')}` : '');
  }
  const recent = LOG.filter((e) => e.src !== 'kartu' && !e.y && QB[e.q]).slice(-3).map((e) => QB[e.q].t.slice(0, 120));
  const weak = recent.length ? `\nSoal yang baru-baru ini dijawab salah oleh murid: ${recent.map((t) => `“${t}”`).join('; ')}` : '';
  /* lewat server, nama murid tidak dikirim (data seminimal mungkin) */
  return `Kamu adalah “Kak Tangga”, tutor AI di aplikasi belajar UTBK-SNBT bernama Tangga. Muridmu siswa SMA kelas ${P.kelas} di Indonesia${AI.server ? '' : ` bernama ${firstName()}`}.
Cara mengajar (Metode Tangga):
- Apa pun bisa dipelajari asal langkahnya cukup kecil. Jika murid bingung, turun satu anak tangga: cari konsep prasyarat yang belum kokoh dan jelaskan itu dulu.
- Gaya penjelasan favorit murid: ${GAYA[S.set.gaya]}.
- Sokratik: ajukan satu pertanyaan penuntun sebelum memberi jawaban akhir, kecuali murid jelas meminta jawaban langsung.
- Singkat: sekitar 120 kata atau kurang per balasan, kalimat pendek, bahasa Indonesia santai dan sopan (aku–kamu)${S.set.bahasa === 'campur' ? ', boleh diselingi istilah bahasa Inggris' : ''}.
- Desimal pakai koma (0,8). Tanpa LaTeX; tulis rumus dengan simbol biasa (×, ÷, ≤, ⇒).
- Jika tidak yakin, katakan terus terang. Jangan mengarang jadwal, aturan, atau nilai resmi SNPMB.
- Format: teks biasa; boleh **tebal** untuk istilah penting dan daftar bernomor.${ctx}${weak}`;
}
const PHOTO_TASK = 'Murid melampirkan foto sebuah soal. Tugasmu: (1) tulis ulang soalnya secara singkat, (2) sebutkan 2–4 anak tangga (konsep) yang dibutuhkan, urut dari yang paling dasar, (3) ajukan SATU pertanyaan penuntun untuk langkah pertama. Jangan beri jawaban akhir dulu.';

/* ---------- obrolan ---------- */
const CHAT = { turns: [], busy: false, ctl: null, ctx: null };
function openChat(ctx, foto) {
  if (ctx !== undefined && ctx !== '') CHAT.ctx = ctx;
  SH = { kind: 'chat' }; renderSheet();
  if (foto && AI.imgs) { const f = $('#chat-file'); if (f) f.click(); }
  else { const ta = $('#chat-ta'); if (ta && matchMedia('(pointer:fine)').matches) ta.focus(); }
}
function chatChips() {
  if (CHAT.ctx && ATOM[CHAT.ctx]) return ['Jelaskan pakai analogi lain', 'Kasih aku satu contoh soal', 'Aku salah di bagian mana?', 'Langsung jawabannya saja'];
  return ['Apa itu modus tollens?', 'Cara cepat menghitung persen', 'Bedanya sinonim dan antonim?', 'Strategi waktu saat UTBK'];
}
function shChat() {
  const ctx = CHAT.ctx && ATOM[CHAT.ctx];
  let h = `<div class="sh-head chat-head"><p class="eyebrow">${icon('spark')} Tutor AI</p><h2>Kak Tangga</h2>${ctx ? `<p class="ctx-chip">Sedang membahas: <b>${esc(ctx.judul)}</b> <button class="link" data-act="chat-ctx-clear">lepas</button></p>` : ''}</div>`;
  if (!AI.ok) {
    return h + `<div class="chat-off"><p>${AI.off ? 'Kak Tangga belum diizinkan di tampilan ini. Izinkan saat diminta, lalu coba lagi.' : SRV.on ? 'Kak Tangga sedang tidak bisa dihubungi. Cek internetmu, lalu coba lagi.' : 'Kak Tangga belum aktif di versi ini.'}</p></div>`;
  }
  h += `<p class="ai-note">${icon('spark')}<span><b>Kak Tangga adalah AI, bukan manusia.</b> Jawabannya bisa keliru — cek lagi kalau ragu.${AI.server && SRV.left != null ? ` Sisa jatah hari ini: <b>${SRV.left}</b> pesan.` : ''}</span></p>`;
  h += `<div class="chat-log" id="chat-log">${chatLogHTML()}</div>`;
  h += `<div class="chat-chips">${chatChips().map((c) => `<button type="button" class="tchip" data-act="chat-chip" data-t="${esc(c)}"${CHAT.busy ? ' disabled' : ''}>${esc(c)}</button>`).join('')}</div>`;
  const types = (AI.types.length ? AI.types : ['image/jpeg', 'image/png', 'image/webp']).join(',');
  h += `<form class="chat-in" onsubmit="return false"><label class="sr" for="chat-ta">Pesan untuk Kak Tangga</label><textarea id="chat-ta" rows="1" maxlength="1500" placeholder="Tanya apa saja…"></textarea>`
    + (AI.imgs ? `<input type="file" id="chat-file" accept="${esc(types)}" hidden><button type="button" class="icon-btn" data-act="chat-foto" aria-label="Kirim foto soal"${CHAT.busy ? ' disabled' : ''}>${icon('camera')}</button>` : '')
    + (CHAT.busy ? `<button type="button" class="icon-btn send stop" data-act="chat-stop" aria-label="Hentikan jawaban">${icon('stop')}</button>` : `<button type="button" class="icon-btn send" data-act="chat-kirim" aria-label="Kirim">${icon('send')}</button>`)
    + '</form>';
  return h;
}
function chatLogHTML() {
  const hello = `<div class="bubble bot"><p>Hai ${esc(firstName())}! Aku Kak Tangga. Tanyakan materi apa saja — kita naik satu anak tangga demi satu anak tangga.${AI.imgs ? ' Kamu juga bisa memotret soal.' : ''}</p></div>`;
  return hello + CHAT.turns.map((t, i) => {
    if (t.role === 'user') return `<div class="bubble me" data-i="${i}">${t.img ? `<span class="img-tag">${icon('camera')} foto soal</span>` : ''}<p>${esc(t.content)}</p></div>`;
    const inner = t.pending && !t.content ? '<p class="typing">Kak Tangga sedang berpikir…</p>' : `<div class="md">${fmtAI(t.content)}</div>`;
    const lapor = !t.pending && t.content && !CHAT.busy ? `<button type="button" class="link lapor-l" data-act="chat-lapor" data-i="${i}">${icon('flag')} Laporkan jawaban ini</button>` : '';
    return `<div class="bubble bot" data-i="${i}">${inner}${t.err ? `<p class="warn-t small">${esc(t.err)}</p>` : ''}${lapor}</div>`;
  }).join('');
}
function scrollChat() { const l = $('#chat-log'); if (l) l.scrollTop = l.scrollHeight; }
function updBubble(i) {
  const el = document.querySelector(`#chat-log .bubble[data-i="${i}"]`); const t = CHAT.turns[i];
  if (el && t) { el.innerHTML = `<div class="md">${fmtAI(t.content)}</div>`; scrollChat(); }
}
async function chatSend(text, images) {
  if (!AI.ok || CHAT.busy) return;
  text = String(text || '').trim();
  if (!text && !images) return;
  const u = { role: 'user', content: text || 'Tolong bantu aku mengerjakan soal di foto ini.', img: !!images };
  CHAT.turns.push(u);
  const b = { role: 'assistant', content: '', pending: true };
  CHAT.turns.push(b); const bi = CHAT.turns.length - 1;
  CHAT.busy = true; renderSheet(); scrollChat();
  const ctl = new AbortController(); CHAT.ctl = ctl;
  const hist = CHAT.turns.slice(0, -1).filter((t) => t.content && !t.err).slice(-12)
    .map((t) => ({ role: t.role, content: t.role === 'user' && t.img ? t.content + '\n[Murid melampirkan foto soal.]' : t.content }));
  /* lewat server, aturan tutor dikirim sebagai `system`; di Claude, sebagai pesan pertama */
  const rules = tutorRules(CHAT.ctx);
  const input = AI.server ? hist.slice() : [{ role: 'user', content: rules }].concat(hist);
  if (images) input[input.length - 1] = { role: 'user', content: input[input.length - 1].content + '\n\n' + PHOTO_TASK };
  const opts = { cache: false, signal: ctl.signal, onText: ({ text: tx }) => { b.content = tx; b.pending = false; updBubble(bi); } };
  if (AI.server) opts.system = rules;
  if (images) opts.images = images;
  try {
    const res = await AI.s(input, opts);
    b.content = res.text;
    if (res.truncated) b.err = 'Jawabannya terpotong. Minta Kak Tangga melanjutkan.';
  } catch (e) {
    b.content = e && e.code === 'refused' ? '' : (e && e.text) || b.content || '';
    b.err = aiMsg(e) || (b.content ? '' : 'Dihentikan.');
  } finally {
    b.pending = false; CHAT.busy = false; CHAT.ctl = null;
    if (SH && SH.kind === 'chat') { renderSheet(); scrollChat(); }
  }
}

/* ---------- penyusun anak tangga (pelajaran 6 langkah) ---------- */
function lessonPrompt(id) {
  const a = ATOM[id]; const key = tanggaOf(id); const tg = TANGGA[key]; const x = subOf(a.s);
  const idx = tg.atoms.indexOf(id);
  const below = tg.atoms.slice(0, idx).map((i) => `${i}: ${ATOM[i].judul}`).join('; ') || '(tidak ada — ini anak tangga dasar)';
  const en = a.s === 'lbe';
  return `Kamu menyusun satu "anak tangga" (unit belajar kecil) untuk aplikasi belajar UTBK-SNBT bernama Tangga, memakai Metode Tangga: satu ide kecil yang bisa dipelajari dalam 2–5 menit.

Subtes: ${x.nama}. Tangga: ${tg.judul}.
Anak tangga ini: "${a.judul}" — ${a.ringkas}
Anak tangga di bawahnya (sudah dipelajari murid), format id: judul: ${below}
Murid: siswa SMA kelas ${S.profil.kelas} di Indonesia.

Aturan:
- Fokus pada SATU ide sesuai judul. Jangan melompat ke materi yang lebih tinggi.
- Bahasa Indonesia yang ramah (aku–kamu)${en ? '; bacaan, soal, dan pilihan jawaban dalam bahasa Inggris, sedangkan penjelasan dan pembahasan dalam bahasa Indonesia' : ''}.
- Desimal memakai koma (0,8). Tanpa LaTeX; pakai simbol biasa (×, ÷, ≤, ⇒). Boleh **tebal** untuk istilah penting.
- Soal bergaya UTBK-SNBT: 5 pilihan, tepat SATU jawaban benar, pengecoh masuk akal dan mencerminkan kesalahan umum. Hitung ulang setiap jawaban sebelum menuliskannya.
- Urutan pilihan akan diacak di aplikasi. Di pembahasan "b", sebut ISI pilihan yang dimaksud, jangan hurufnya (A–E).
- Untuk arti kata, ikuti KBBI (mis. "acuh" = peduli; "tak acuh" = tidak peduli).
- Jika soal butuh bacaan, taruh bacaan pendek (≤ 90 kata) di field "p".
- "x" memetakan indeks pilihan yang SALAH ke id anak tangga prasyarat yang kemungkinan belum kokoh jika murid memilihnya. Pakai hanya id dari daftar di atas; boleh {}.

Balas HANYA dengan satu objek JSON berbentuk persis:
{"hook": "1–2 kalimat kenapa ini penting di UTBK",
 "jelas": {"analogi": "penjelasan lewat perumpamaan sehari-hari (≤ 90 kata)", "langkah": ["3–5 langkah"], "cerita": "contoh dari kehidupan siswa SMA (≤ 80 kata)", "singkat": "inti atau rumus dalam 1–2 kalimat"},
 "contoh": {"soal": "...", "langkah": ["2–4 langkah penyelesaian"], "jawab": "..."},
 "rumpang": {"soal": "...", "langkah": ["2–4 langkah; tepat satu langkah memuat ___"], "kosong": "isi yang benar untuk ___", "pilihan": ["4 pilihan pendek, salah satunya sama persis dengan kosong"]},
 "latihan": [4 soal, tingkat naik bertahap],
 "uji": [3 soal untuk membuktikan penguasaan]}
Bentuk setiap soal: {"t": "teks soal", "p": "bacaan (opsional)", "o": ["A","B","C","D","E"], "k": indeks jawaban benar 0–4, "b": "pembahasan singkat", "d": 1|2|3, "h": "petunjuk singkat", "x": {}}`;
}
function cleanLesson(r, id) {
  if (!r || typeof r !== 'object') return null;
  const str = (v) => (typeof v === 'string' ? v.trim() : typeof v === 'number' ? String(v) : '');
  const arr = (v) => (Array.isArray(v) ? v.map(str).filter(Boolean) : []);
  const key = tanggaOf(id); const below = new Set(TANGGA[key].atoms.slice(0, TANGGA[key].atoms.indexOf(id)));
  const Q = (v) => {
    if (!v || typeof v !== 'object') return null;
    const o = Array.isArray(v.o) ? v.o.map(str) : []; const k = Number(v.k);
    if (o.length !== 5 || o.some((x) => !x) || new Set(o).size !== 5 || !Number.isInteger(k) || k < 0 || k > 4 || !str(v.t)) return null;
    const xm = {};
    if (v.x && typeof v.x === 'object') for (const [kk, vv] of Object.entries(v.x)) { const ki = Number(kk); if (Number.isInteger(ki) && ki >= 0 && ki <= 4 && ki !== k && below.has(vv)) xm[ki] = vv; }
    const d = [1, 2, 3].includes(Number(v.d)) ? Number(v.d) : 2;
    const q = { t: str(v.t), o, k, b: str(v.b) || 'Lihat lagi penjelasan di anak tangga ini.', d, x: xm };
    if (str(v.h)) q.h = str(v.h); if (str(v.p)) q.p = str(v.p);
    return q;
  };
  const j = r.jelas || {}; const c = r.contoh || {}; const rp = r.rumpang || {};
  const L = {
    hook: str(r.hook),
    jelas: { analogi: str(j.analogi), langkah: arr(j.langkah), cerita: str(j.cerita), singkat: str(j.singkat) },
    contoh: { soal: str(c.soal), langkah: arr(c.langkah), jawab: str(c.jawab) },
    latihan: (Array.isArray(r.latihan) ? r.latihan : []).map(Q).filter(Boolean).slice(0, 5),
    uji: (Array.isArray(r.uji) ? r.uji : []).map(Q).filter(Boolean).slice(0, 3),
    rumpang: null,
  };
  if (!L.hook || !L.jelas.analogi || !L.jelas.singkat || !L.contoh.soal || !L.contoh.langkah.length || L.latihan.length < 2 || L.uji.length < 2) return null;
  if (!L.jelas.langkah.length) L.jelas.langkah = [L.jelas.singkat];
  if (!L.jelas.cerita) L.jelas.cerita = L.jelas.analogi;
  if (!L.contoh.jawab) L.contoh.jawab = '—';
  const kos = str(rp.kosong); let pil = arr(rp.pilihan).slice(0, 4); const lang = arr(rp.langkah);
  if (kos && !pil.includes(kos)) pil = pil.slice(0, 3).concat([kos]);
  pil = Array.from(new Set(pil));
  if (kos && pil.length >= 2 && lang.filter((s) => s.includes('___')).length === 1) L.rumpang = { soal: str(rp.soal) || L.contoh.soal, langkah: lang, kosong: kos, pilihan: pil };
  return L;
}
async function genLesson(id) {
  if (!AI.ok) { if (OV && OV.kind === 'lesson' && OV.id === id) { OV.gen = { state: 'off' }; renderOv(false); } return; }
  const ctl = new AbortController();
  if (OV && OV.kind === 'lesson' && OV.id === id) { OV.gen = { state: 'busy', ctl }; renderOv(false); }
  try {
    const raw = await AI.s.json(lessonPrompt(id), { signal: ctl.signal });
    const L = cleanLesson(raw, id);
    if (!L) throw { code: 'invalid_json' };
    GEN[id] = { L, t: Date.now() }; regAtom(id, L, true); save('gen');
    if (OV && OV.kind === 'lesson' && OV.id === id) startLesson(id);
  } catch (e) {
    if (!(OV && OV.kind === 'lesson' && OV.id === id)) return;
    if (e && e.code === 'cancelled') { closeOv(); return; }
    OV.gen = { state: 'err', msg: aiMsg(e) || 'Coba lagi.' }; renderOv(false);
  }
}

/* ---------- “jelaskan dengan cara baru” ---------- */
async function aiJelaskan() {
  const o = OV; if (!o || o.kind !== 'lesson' || !AI.ok || (o.aiExp && o.aiExp.busy)) return;
  const a = ATOM[o.id]; const L = o.L;
  const ctl = new AbortController(); o.aiCtl = ctl;
  o.aiExp = { text: '', busy: true }; renderOv();
  const prompt = `${tutorRules(o.id)}

Tugas: murid belum paham anak tangga “${a.judul}”. Gaya penjelasan yang sudah dicoba: ${o.tried.map((g) => GAYA[g]).join(', ')}.
Penjelasan singkat yang sudah ada: ${L.jelas.singkat}

Jelaskan ulang dengan cara BARU yang berbeda dari yang sudah dicoba (misalnya analogi lain dari kehidupan remaja Indonesia, atau langkah kecil dengan angka sederhana). Maksimal 140 kata. Akhiri dengan satu pertanyaan cek pemahaman yang singkat.`;
  try {
    const res = await AI.s(prompt, { cache: false, signal: ctl.signal, onText: ({ text }) => { if (OV === o) { o.aiExp.text = text; const el = $('#ai-exp'); if (el) el.innerHTML = fmtAI(text); } } });
    o.aiExp.text = res.text;
  } catch (e) {
    o.aiExp.err = aiMsg(e);
    o.aiExp.text = e && e.code !== 'refused' ? (e.text || o.aiExp.text) : '';
  } finally {
    o.aiExp.busy = false; o.aiCtl = null;
    if (OV === o) renderOv();
  }
}

/* ---------- pemecah topik → tangga baru ---------- */
function planPrompt(topik) {
  return `Kamu ahli kurikulum yang memakai Metode Tangga: memecah topik apa pun menjadi anak tangga kecil, dari yang paling dasar sampai topik itu sendiri.
Topik dari murid: "${topik.slice(0, 160)}"
Konteks: persiapan UTBK-SNBT, murid SMA kelas ${S.profil.kelas} di Indonesia.
Aturan setiap anak tangga: satu ide saja; bisa dipelajari dalam 2–5 menit; bisa diuji dengan satu soal; prasyaratnya jelas.
Buat 4–8 anak tangga. Anak tangga pertama tidak butuh prasyarat. Anak tangga terakhir adalah keterampilan topik itu sendiri dalam bentuk soal UTBK.
Pilih subtes UTBK yang paling cocok: "pu", "ppu", "pbm", "pk", "lbi", "lbe", "pm", atau "lain" jika tidak cocok.
Balas HANYA JSON: {"judul": "judul tangga singkat (≤ 5 kata)", "subtes": "...", "ringkasan": "1 kalimat", "atoms": [{"judul": "≤ 6 kata", "ringkas": "1 kalimat", "pra": [indeks anak tangga sebelumnya yang dibutuhkan, mulai dari 0]}]}`;
}
function cleanPlan(r) {
  if (!r || typeof r !== 'object' || !Array.isArray(r.atoms)) return null;
  const raw = r.atoms.slice(0, 8);
  if (raw.length < 3 || raw.some((a) => !a || !String(a.judul || '').trim())) return null;
  const atoms = raw.map((a, i) => ({
    judul: String(a.judul).trim().slice(0, 60),
    ringkas: String(a.ringkas || '').trim().slice(0, 160),
    pra: Array.isArray(a.pra) ? Array.from(new Set(a.pra.map(Number).filter((j) => Number.isInteger(j) && j >= 0 && j < i))) : [],
  }));
  atoms.forEach((a, i) => { if (i > 0 && !a.pra.length) a.pra = [i - 1]; });
  const sk = String(r.subtes || '').toLowerCase();
  return { judul: String(r.judul || 'Tangga baru').trim().slice(0, 40), s: SUB[sk] ? sk : 'lain', ringkasan: String(r.ringkasan || '').trim().slice(0, 200), atoms };
}
async function pecahTopik() {
  if (!AI.ok || !SH || SH.kind !== 'tangga') return;
  const ta = $('#tb-topik'); const topik = ta ? ta.value.trim() : '';
  if (!topik) { toast('Tulis topiknya dulu.'); return; }
  SH.topik = topik;
  const ctl = new AbortController(); SH.dec = { state: 'busy', ctl }; renderSheet();
  try {
    const raw = await AI.s.json(planPrompt(topik), { signal: ctl.signal });
    const plan = cleanPlan(raw); if (!plan) throw { code: 'invalid_json' };
    if (SH && SH.kind === 'tangga') { SH.dec = { state: 'done', plan }; renderSheet(); }
  } catch (e) {
    if (SH && SH.kind === 'tangga') { SH.dec = e && e.code === 'cancelled' ? {} : { state: 'err', msg: aiMsg(e) }; renderSheet(); }
  }
}
function simpanTangga() {
  const p = SH && SH.dec && SH.dec.plan; if (!p) return;
  const id = 'k' + Date.now().toString(36);
  const atoms = p.atoms.map((a, i) => ({ id: `${id}-${i}`, judul: a.judul, ringkas: a.ringkas, pra: a.pra.map((j) => `${id}-${j}`) }));
  S.kustom.push({ id, judul: p.judul, s: p.s, ringkasan: p.ringkasan, atoms });
  registerCustom(); award('arsitek'); save();
  closeSheet(true); UI.tab = 'peta'; UI.peta = id; location.hash = 'peta';
  renderAll(); flushToasts();
  toast('Tangga baru tersimpan. Mulai dari anak tangga paling bawah!');
}
