'use strict';
/* =====================================================================
   Tangga — Materi bergambar (bagian "Belajar").
   Setiap anak tangga punya pelajaran mendalam: halaman-halaman pendek
   bergambar → soal tantangan setara UTBK dengan cara berpikir tutor →
   kunci (ringkasan). Isi materinya ada di materi-*.js.
   ===================================================================== */

const MATERI = {};
function M(id, o) { MATERI[id] = o; }
const materiOf = (id) => MATERI[id] || null;
const mtPages = (m) => m.pages.length + (m.tantangan ? 1 : 0) + 1;
const mtRead = (id) => !!(S.atom[id] && S.atom[id].baca);
const mtMenit = (m) => m.menit || Math.max(3, Math.round(m.pages.length * 1.4 + 2));

/* teks materi: **tebal**, ==stabilo==, {{kata|arti}} = kata sulit yang bisa diketuk */
const fmtM = (s) => fmt(s).replace(/\{\{(.+?)\|(.+?)\}\}/g, (_, a, b) => `<button type="button" class="term" data-act="term">${a}</button><span class="term-d">${b}</span>`);
const plainM = (s) => String(s || '')
  .replace(/\{\{(.+?)\|(.+?)\}\}/g, '$1, artinya $2,').replace(/\*\*|==/g, '')
  .replace(/Rp\s?([\d.]+)/g, '$1 rupiah').replace(/(\d+)\/(\d+)/g, '$1 per $2').replace(/(\d),(\d)/g, '$1 koma $2')
  .replace(/×/g, ' kali ').replace(/÷/g, ' dibagi ').replace(/ = /g, ' sama dengan ').replace(/%/g, ' persen').replace(/→|⇒/g, ', maka ').replace(/[“”"]/g, '');

/* ---------- membuka & berpindah halaman ---------- */
function openMateri(id, opt = {}) {
  const m = materiOf(id); if (!m) { startLesson(id); return; }
  closeSheet(true); ttsStop();
  OV = { kind: 'materi', id, m, pg: opt.pg || 0, cek: {}, tan: { sel: null, chk: false, shown: 0 }, ret: opt.ret || null, t0: Date.now() };
  const r = atomRec(id); if (r.lvl < 1) { r.lvl = 1; } r.seen = today(); const key = tanggaOf(id); if (SUB[key]) S.fokus = key; save();
  renderOv(false);
}
function mtGo(d) {
  const o = OV; if (!o || o.kind !== 'materi') return;
  const N = mtPages(o.m); ttsStop();
  o.pg = clamp(o.pg + d, 0, N - 1);
  if (o.pg === N - 1) mtDone();
  renderOv(false);
}
function mtDone() {
  const o = OV; const r = atomRec(o.id); const first = !r.baca;
  r.baca = today();
  if (first) { addXP(10); toast('+10 XP · materi selesai dibaca'); }
  markActive(); save(); flushToasts();
}

/* ---------- tampilan ---------- */
function rMateri() {
  const o = OV; const m = o.m; const a = ATOM[o.id]; const P = m.pages.length; const N = mtPages(m); const pg = o.pg;
  const prog = `<div class="mt-prog" role="img" aria-label="Halaman ${pg + 1} dari ${N}"><i style="width:${(((pg + 1) / N) * 100).toFixed(1)}%"></i></div>`;
  const tools = `<span class="mt-tools">${ttsOk() ? `<button class="icon-btn" data-act="mt-baca" aria-label="${TTS.on ? 'Berhenti membacakan' : 'Bacakan halaman ini'}" title="Bacakan">${icon(TTS.on ? 'stop' : 'sound')}</button>` : ''}<button class="icon-btn" data-act="mt-huruf" aria-label="Ubah ukuran huruf" title="Ukuran huruf">${icon('text')}</button></span>`;
  const back = pg > 0 ? `<button class="btn ghost" data-act="mt-prev">${icon('back')} Kembali</button>` : '';
  let body, foot;
  if (pg < P) {
    body = mtPage(m.pages[pg], pg);
    const ck = m.pages[pg].cek && OV.cek[pg] == null;
    foot = ck ? back + `<button class="btn ghost" data-act="mt-next">Lewati</button><button class="btn primary big" data-act="mt-ke-cek" data-primary>${icon('down')} Jawab soal cek dulu</button>`
      : back + `<button class="btn primary big" data-act="mt-next" data-primary>${pg === P - 1 && m.tantangan ? 'Lanjut: soal tantangan' : 'Lanjut'} ${icon('arrow')}</button>`;
  } else if (pg === P && m.tantangan) {
    const T = m.tantangan; const t = o.tan; const n = T.langkah.length;
    body = mtTan(T);
    if (!t.chk) foot = back + `<button class="btn ghost" data-act="mt-tan-lihat">Langsung lihat cara tutor</button><button class="btn primary big" data-act="mt-tan-cek" data-primary${t.sel == null ? ' disabled' : ''}>Cek jawabanku</button>`;
    else if (t.shown < n) foot = `<button class="btn ghost" data-act="mt-tan-all">Tampilkan semua</button><button class="btn primary big" data-act="mt-tan-step" data-primary>${t.shown ? `Langkah ${t.shown + 1} dari ${n}` : 'Lihat cara tutor'} ${icon('arrow')}</button>`;
    else foot = back + `<button class="btn primary big" data-act="mt-next" data-primary>Lanjut: kunci materi ${icon('arrow')}</button>`;
  } else {
    body = mtEnd(m);
    foot = `<button class="btn primary big" data-act="mt-latihan" data-primary>${icon('pencil')} Latihan anak tangga ini</button><button class="btn ghost" data-act="mt-awal">${icon('refresh')} Baca dari awal</button><button class="btn ghost" data-act="mt-close">Tutup</button>`;
  }
  return ovShell({ title: esc(a.judul), prog, sub: tools, body: `<div class="mt fs${S.set.huruf || 0}">${body}</div>`, foot, cls: 'materi', closeAct: 'mt-close' });
}
function mtPage(p, i) {
  const x = subOf(ATOM[OV.id].s); const box = (cls, ic, t, s) => `<div class="mt-box ${cls}">${icon(ic)}<div><span class="mt-bt">${t}</span><p>${fmtM(s)}</p></div></div>`;
  return `<article class="mt-page">
    <p class="eyebrow">${x.kode} · halaman ${i + 1} dari ${OV.m.pages.length}</p>
    <h2 class="mt-h">${fmtM(p.j)}</h2>
    ${p.fig ? figure(p.fig) : ''}
    ${(p.p || []).map((t) => `<p>${fmtM(t)}</p>`).join('')}
    ${p.fig2 ? figure(p.fig2) : ''}
    ${p.ingat ? box('ingat', 'bulb', 'Ingat', p.ingat) : ''}
    ${p.awas ? box('awas', 'warn', 'Awas jebakan', p.awas) : ''}
    ${p.cek ? mtCek(p.cek, i) : ''}
  </article>`;
}
function mtCek(c, i) {
  const st = OV.cek[i];
  const en = c.en ? ' lang="en"' : '';
  return `<div class="mt-cek"><p class="eyebrow">${icon('check')} Cek pemahaman</p><p class="q-stem"${en}>${fmtM(c.t)}</p>
    <div class="choices col" role="radiogroup" aria-label="Pilihan jawaban"${en}>${c.o.map((t, j) => {
      let cls = 'choice'; if (st != null) { if (j === c.k) cls += ' right'; else if (j === st) cls += ' wrong'; }
      return `<button type="button" class="${cls}" role="radio" aria-checked="${st === j}" data-act="mt-cek" data-i="${j}"${st != null ? ' disabled' : ''}>${fmtM(t)}</button>`;
    }).join('')}</div>
    ${st != null ? `<div class="fb ${st === c.k ? 'ok' : 'no'}" role="status"><p class="fb-t hand">${st === c.k ? 'Betul!' : 'Belum tepat — lihat penjelasannya.'}</p><p class="fb-b">${fmtM(c.b)}</p>${laporLink(`${OV.id}/hal${i + 1}`, 'Soal ini keliru?')}</div>` : ''}</div>`;
}
function mtTan(T) {
  const t = OV.tan; const n = T.langkah.length; const right = t.sel === T.k;
  const opts = T.o.map((op, j) => {
    let cls = 'opt';
    if (t.sel === j) cls += ' sel';
    if (t.chk) { if (j === T.k) cls += ' right'; else if (t.sel === j) cls += ' wrong'; else cls += ' dim'; }
    return `<button type="button" class="${cls}" role="radio" aria-checked="${t.sel === j}" data-act="mt-tan" data-i="${j}"${t.chk ? ' disabled' : ''}><span class="bub">${LETTERS[j]}</span><span class="otx">${fmtM(op)}</span></button>`;
  }).join('');
  return `<article class="mt-page tan"${T.en ? ' lang="en"' : ''}>
    <p class="eyebrow">${icon('trophy')} Soal tantangan · setara UTBK</p>
    <h2 class="mt-h">Coba sendiri dulu, lalu lihat cara tutor</h2>
    ${T.p ? `<div class="passage">${fmt(T.p)}</div>` : ''}
    <p class="q-stem">${fmtM(T.t)}</p>
    <div class="opts" role="radiogroup" aria-label="Pilihan jawaban">${opts}</div>
    ${t.chk && t.sel != null ? `<div class="fb ${right ? 'ok' : 'no'}" role="status"><p class="fb-t hand">${right ? 'Hebat, benar!' : 'Belum tepat — tidak apa-apa, ini soal sulit.'}</p><p class="fb-k">Jawaban: <b>${LETTERS[T.k]}. ${fmtM(T.o[T.k])}</b></p></div>` : ''}
    ${t.shown ? `<div class="tutor"><p class="eyebrow">${icon('bulb')} Cara berpikir tutor</p>${T.pikir ? `<p class="pikir">${fmtM(T.pikir)}</p>` : ''}
      <ol class="ws">${T.langkah.slice(0, t.shown).map((s) => `<li>${fmtM(s)}</li>`).join('')}</ol>
      ${t.shown >= n ? `${T.fig ? figure(T.fig) : ''}${t.sel == null ? `<p class="ans">Jawaban: <b>${LETTERS[T.k]}. ${fmtM(T.o[T.k])}</b></p>` : ''}${T.jebak ? `<div class="mt-box awas">${icon('warn')}<div><span class="mt-bt">Kenapa banyak yang terjebak</span><p>${fmtM(T.jebak)}</p></div></div>` : ''}${laporLink(`${OV.id}/tantangan`, 'Soal tantangan ini keliru?')}` : ''}
    </div>` : ''}
  </article>`;
}
function mtEnd(m) {
  const a = ATOM[OV.id]; const L = lvl(OV.id);
  return `<article class="mt-page end">
    <div class="stamp hand">Selesai dibaca!</div>
    <h2 class="mt-h">Kunci: ${esc(a.judul)}</h2>
    <ul class="kunci">${m.kunci.map((k) => `<li>${icon('check')}<span>${fmtM(k)}</span></li>`).join('')}</ul>
    <p class="mute">${L >= 3 ? 'Kamu sudah lolos anak tangga ini. Latihan lagi akan menjaganya tetap kuat.' : 'Sekarang buktikan: contoh soal, isian, lalu latihan dan 3 soal “Buktikan”.'}</p>
    ${laporLink(`${OV.id}/materi`, 'Ada yang keliru di materi ini?')}
  </article>`;
}

/* ---------- membacakan (suara) ---------- */
const TTS = { on: false, id: 0, ok: 0, bad: 0 };
function ttsOk() {
  if (typeof NATIVE !== 'undefined' && NATIVE) return !!(NP && NP.TextToSpeech);
  return typeof window.speechSynthesis !== 'undefined' && typeof window.SpeechSynthesisUtterance === 'function';
}
function ttsChunks() {
  const o = OV; const m = o.m; const P = m.pages.length; const L = (t, en) => ({ t: plainM(t), en: !!en });
  if (o.pg < P) {
    const p = m.pages[o.pg]; const c = [L(p.j)];
    (p.p || []).forEach((t) => c.push(L(t)));
    if (p.ingat) c.push(L('Ingat. ' + p.ingat)); if (p.awas) c.push(L('Awas jebakan. ' + p.awas));
    if (p.cek) { c.push(L('Cek pemahaman. ' + p.cek.t, p.cek.en)); p.cek.o.forEach((x, i) => c.push(L(`${LETTERS[i]}. ${x}`, p.cek.en))); }
    return c;
  }
  if (o.pg === P && m.tantangan) {
    const T = m.tantangan; const c = [L('Soal tantangan.')];
    if (T.p) c.push(L(T.p, T.en)); c.push(L(T.t, T.en)); T.o.forEach((x, i) => c.push(L(`${LETTERS[i]}. ${x}`, T.en)));
    if (o.tan.shown) { if (T.pikir) c.push(L(T.pikir)); T.langkah.slice(0, o.tan.shown).forEach((s) => c.push(L(s))); }
    return c;
  }
  return [L('Kunci materi.'), ...m.kunci.map((k) => L(k))];
}
let ttsVoices = null;
function ttsVoice(lang) {
  try { if (!ttsVoices || !ttsVoices.length) ttsVoices = speechSynthesis.getVoices(); } catch (e) { return null; }
  const pre = lang.slice(0, 2); return (ttsVoices || []).find((v) => v.lang && v.lang.toLowerCase().replace('_', '-').startsWith(pre)) || null;
}
function ttsSay(text, lang) {
  if (!text) return Promise.resolve();
  if (typeof NATIVE !== 'undefined' && NATIVE && NP.TextToSpeech) return NP.TextToSpeech.speak({ text, lang, rate: 0.95, pitch: 1.0, volume: 1.0, category: 'ambient' }).then(() => { TTS.ok++; }, () => { TTS.bad++; });
  return new Promise((res) => {
    try {
      const u = new SpeechSynthesisUtterance(text); u.lang = lang; u.rate = 0.95; const v = ttsVoice(lang); if (v) u.voice = v;
      u.onend = () => { TTS.ok++; res(); }; u.onerror = (e) => { if (!e || !/interrupted|canceled/.test(e.error || '')) TTS.bad++; res(); };
      speechSynthesis.speak(u);
    } catch (e) { TTS.bad++; res(); }
  });
}
async function ttsPlay() {
  const chunks = ttsChunks(); TTS.on = true; TTS.ok = 0; TTS.bad = 0; const my = ++TTS.id; renderOv();
  for (const c of chunks) { if (!TTS.on || TTS.id !== my) return; await ttsSay(c.t, c.en ? 'en-US' : 'id-ID'); }
  if (TTS.id === my) {
    TTS.on = false; if (OV && OV.kind === 'materi') renderOv();
    /* tidak ada satu kalimat pun yang terbaca: mesin suara HP belum ada */
    if (TTS.bad && !TTS.ok) toast('Suara belum tersedia di HP ini. Pasang “Speech Services by Google” dari Play Store, lalu coba lagi.', 'warn');
  }
}
function ttsStop() {
  if (!TTS.on) return; TTS.on = false; TTS.id++;
  try { if (typeof NATIVE !== 'undefined' && NATIVE && NP.TextToSpeech) NP.TextToSpeech.stop().catch(() => {}); else if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) { /* abaikan */ }
}

/* ---------- aksi (digabung ke ACT oleh app.js) ---------- */
const ACT_MT = {
  materi(d) { openMateri(d.id); },
  'materi-lanjut'(d) { openMateri(d.id); },
  'mt-next'() { mtGo(1); },
  'mt-prev'() { mtGo(-1); },
  'mt-ke-cek'() { const c = $('#ov .mt-cek'); if (c) c.scrollIntoView({ behavior: 'smooth', block: 'center' }); },
  'mt-awal'() { ttsStop(); OV.pg = 0; OV.cek = {}; OV.tan = { sel: null, chk: false, shown: 0 }; renderOv(false); },
  'mt-cek'(d) { const i = OV.pg; if (OV.cek[i] != null) return; OV.cek[i] = Number(d.i); const c = OV.m.pages[i].cek; if (OV.cek[i] === c.k) addXP(1); save(); renderOv(); },
  'mt-tan'(d) { if (OV.tan.chk) return; OV.tan.sel = Number(d.i); renderOv(); },
  'mt-tan-cek'() {
    const t = OV.tan; const T = OV.m.tantangan; if (t.sel == null) return; t.chk = true;
    const r = atomRec(OV.id);
    if (t.sel === T.k && !r.tan) { r.tan = today(); addXP(10); toast('+10 XP · soal tantangan terpecahkan'); }
    t.shown = Math.max(t.shown, 1); save(); renderOv(); flushToasts();
  },
  'mt-tan-lihat'() { const t = OV.tan; t.chk = true; t.sel = null; t.shown = Math.max(1, t.shown); ttsStop(); renderOv(); },
  'mt-tan-step'() { const t = OV.tan; t.shown = Math.min(OV.m.tantangan.langkah.length, t.shown + 1); ttsStop(); renderOv(); const b = $('#ov-body'); if (b) b.scrollTop = b.scrollHeight; },
  'mt-tan-all'() { OV.tan.shown = OV.m.tantangan.langkah.length; ttsStop(); renderOv(); const b = $('#ov-body'); if (b) b.scrollTop = b.scrollHeight; },
  'mt-latihan'() { const id = OV.id; ttsStop(); OV = null; startLesson(id, null, { skip: true }); },
  'mt-close'() { ttsStop(); const r = OV && OV.ret; if (r) { OV = r; renderOv(false); } else closeOv(); },
  'mt-baca'() { if (TTS.on) { ttsStop(); renderOv(); } else ttsPlay(); },
  'mt-huruf'() { S.set.huruf = ((S.set.huruf || 0) + 1) % 3; save(); renderOv(); toast(['Ukuran huruf: normal', 'Ukuran huruf: besar', 'Ukuran huruf: sangat besar'][S.set.huruf]); },
  term(d, el) { el.classList.toggle('open'); },
};
