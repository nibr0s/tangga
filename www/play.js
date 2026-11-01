'use strict';
/* =====================================================================
   Tangga — layar penuh: pengenalan, pelajaran 6 langkah, kuis, tryout,
   kartu, dan 7 permainan harian
   ===================================================================== */

let OV = null;           // state layar penuh
let TIMER = null;
const stopTimer = () => { if (TIMER) { clearInterval(TIMER); TIMER = null; } };
const pickOne = (a) => a[Math.floor(Math.random() * a.length)];
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;
const PUJI = ['Mantap!', 'Tepat!', 'Betul!', 'Keren!', 'Pas sekali!'];
const SEMANGAT = ['Belum tepat.', 'Hampir!', 'Belum kena.'];
const STEP_NAMES = ['Pemantik', 'Penjelasan', 'Contoh', 'Contoh rumpang', 'Latihan', 'Buktikan'];

/* ---------- soal pilihan ganda (lembar LJK) ---------- */
function prepQ(q) {
  const fixed = q.o.every((o) => /^\(\d\)$/.test(o));
  return { q, perm: fixed ? [0, 1, 2, 3, 4] : shuffle([0, 1, 2, 3, 4]) };
}
function qBlock(cur, st) {
  const q = cur.q;
  let h = q.p ? `<div class="passage">${fmt(q.p)}</div>` : '';
  h += `<p class="q-stem">${fmt(q.t)}</p><div class="opts" role="radiogroup" aria-label="Pilihan jawaban">`;
  h += cur.perm.map((orig, i) => {
    let cls = 'opt';
    if (st.sel === i) cls += ' sel';
    if (st.chk) { if (orig === q.k) cls += ' right'; else if (st.sel === i) cls += ' wrong'; else cls += ' dim'; }
    return `<button type="button" class="${cls}" role="radio" aria-checked="${st.sel === i}" data-act="${st.act || 'pilih'}" data-i="${i}"${st.chk ? ' disabled' : ''}><span class="bub">${LETTERS[i]}</span><span class="otx">${fmt(q.o[orig])}</span></button>`;
  }).join('');
  return h + '</div>';
}
function fbBlock(cur, sel, ft) {
  const q = cur.q; const orig = cur.perm[sel]; const y = orig === q.k;
  const dg = !y && q.x ? q.x[orig] : null;
  const diag = dg && ATOM[dg] ? `<p class="diag">${icon('down')} Sepertinya anak tangga <b>${esc(ATOM[dg].judul)}</b> belum kokoh.</p>` : '';
  return `<div class="fb ${y ? 'ok' : 'no'}" role="status"><p class="fb-t hand">${ft}</p>${y ? '' : `<p class="fb-k">Jawaban benar: <b>${LETTERS[cur.perm.indexOf(q.k)]}. ${fmt(q.o[q.k])}</b></p>`}<p class="fb-b">${fmt(q.b)}</p>${diag}${laporLink(q.id, 'Soal ini keliru?')}</div>`;
}
/* tautan kecil "laporkan" untuk soal, materi, atau bagian materi */
const laporLink = (ref, label) => `<button type="button" class="link lapor-l" data-act="lapor" data-jenis="konten" data-ref="${esc(ref)}">${icon('flag')} ${label || 'Laporkan kesalahan'}</button>`;
function hintOf(q) { if (q.h) return q.h; const L = q.a ? lessonOf(q.a) : null; return L ? L.jelas.singkat : 'Baca soalnya pelan-pelan, lalu coret pilihan yang jelas salah.'; }

/* ---------- kerangka layar penuh ---------- */
function ovShell(o) {
  const close = o.close === false ? '<span class="ov-sp"></span>' : `<button class="icon-btn" data-act="${o.closeAct || 'ov-close'}" aria-label="${o.closeLabel || 'Tutup'}">${icon(o.closeIcon || 'x')}</button>`;
  return `<div class="ov-in ${o.cls || ''}">
    <header class="ov-h">${close}<div class="ov-t">${o.title ? `<p class="ov-title">${o.title}</p>` : ''}${o.prog || ''}</div><span class="ov-sub">${o.sub || ''}</span></header>
    <div class="ov-body" id="ov-body"><div class="ov-c">${o.body}</div></div>
    ${o.foot ? `<footer class="ov-f"><div class="ov-c">${o.foot}</div></footer>` : ''}
  </div>`;
}
function renderOv(keep) {
  const el = $('#ov');
  if (!OV) { el.hidden = true; el.innerHTML = ''; document.body.classList.remove('ov-open'); return; }
  const prev = $('#ov-body'); const top = keep !== false && prev ? prev.scrollTop : 0;
  el.hidden = false; document.body.classList.add('ov-open');
  const R = { onb: rOnb, lesson: rLesson, quiz: rQuiz, tryout: rTryout, fc: rFC, game: rGame, materi: rMateri }[OV.kind];
  el.innerHTML = R ? R() : '';
  const b = $('#ov-body'); if (b) b.scrollTop = top;
  if (keep === false) { const f = el.querySelector('h1, .ov-title'); if (f) { f.setAttribute('tabindex', '-1'); f.focus({ preventScroll: true }); } }
}
function closeOv() {
  stopTimer(); ttsStop();
  if (OV && OV.gen && OV.gen.ctl) { try { OV.gen.ctl.abort(); } catch (e) { /* abaikan */ } }
  if (OV && OV.aiCtl) { try { OV.aiCtl.abort(); } catch (e) { /* abaikan */ } }
  OV = null; renderOv(); renderAll(); flushToasts();
}

/* ======================= PENGENALAN (onboarding) ======================= */
function startOnb() {
  OV = { kind: 'onb', step: 0, d: { nama: '', kelas: 12, ptn: '', prodi: '', target: 650, rate: {}, gaya: 'analogi', durasi: 10, targetXP: 40, mulai: null, tempat: true } };
  renderOv(false);
}
function heroArt() {
  return `<svg class="hero-svg" viewBox="0 0 320 170" aria-hidden="true">
    <rect class="hs-hl" x="248" y="5" width="60" height="21" rx="3"/>
    <path class="hs-rule" d="M0 166H320"/>
    <path class="hs-st" d="M8 160h50v-26h50v-26h50V82h50V56h50V30h52"/>
    <text class="hs-t" x="278" y="20.5" text-anchor="middle">UTBK</text>
    <circle class="hs-dot" cx="83" cy="126" r="6"/>
    <path class="hs-arr" d="M118 150c-12 4-24 0-30-14"/>
    <text class="hs-hand" x="122" y="156">kamu di sini</text>
  </svg>`;
}
function rOnb() {
  const o = OV; const d = o.d; const N = 6;
  const prog = o.step ? `<div class="dots-prog" role="img" aria-label="Langkah ${o.step} dari ${N}">${Array.from({ length: N }, (_, i) => `<i class="${i < o.step ? 'on' : ''}"></i>`).join('')}</div>` : '';
  let body = '', foot = '';
  if (o.step === 0) {
    body = `<div class="hero">${heroArt()}
      <p class="hero-wm">${LOGO}<span>tangga</span></p>
      <h1 class="hero-h">Apa pun bisa dipelajari — asal anak tangganya cukup kecil.</h1>
      <p class="hero-p">${AI.ok ? 'Belajar UTBK-SNBT bersama tutor AI.' : 'Belajar UTBK-SNBT, gratis dan tanpa akun.'} Mulai dari dasar, naik satu anak tangga setiap hari, dan lihat skormu bergerak.</p>
      <ul class="hero-list"><li>${icon('stairs')}<span>Materi dipecah menjadi anak tangga 2–5 menit</span></li>${AI.ok ? `<li>${icon('spark')}<span>Kak Tangga, tutor AI yang membimbing dengan pertanyaan</span></li>` : `<li>${icon('bulb')}<span>Tiap materi dijelaskan 4 cara: analogi, langkah, cerita, singkat</span></li>`}<li>${icon('flame')}<span>Streak & 7 permainan harian</span></li><li>${icon('chart')}<span>Perkiraan skor & pelacak subtes</span></li></ul></div>`;
    foot = `<button class="btn primary big" data-act="onb-next" data-primary>Mulai belajar</button><button class="btn ghost" data-act="demo">Lihat demo dengan data contoh</button>${Cloud.on ? '' : `<button class="btn ghost sm" data-act="pulihkan">${icon('upload')} Sudah pernah pakai? Pulihkan dari cadangan</button>`}`;
  } else if (o.step === 1) {
    body = `<p class="eyebrow hand">${AI.ok ? 'Halo! Aku Kak Tangga.' : 'Halo! Senang kamu di sini.'}</p><h1 class="onb-q">Siapa nama panggilanmu?</h1>
      <label class="sr" for="ob-nama">Nama panggilan</label><input id="ob-nama" class="big-in" maxlength="30" autocomplete="nickname" value="${esc(d.nama)}" placeholder="Nama panggilan">`;
    foot = `<button class="btn primary big" data-act="onb-next" data-primary>Lanjut</button>`;
  } else if (o.step === 2) {
    body = `<h1 class="onb-q">Kamu kelas berapa?</h1><p class="mute">Ini menentukan seberapa padat tangganya disusun.</p>
      <div class="opt-cards">
        <button class="ocard${d.kelas === 11 ? ' on' : ''}" data-act="ob-kelas" data-v="11" aria-pressed="${d.kelas === 11}"><b>Kelas 11</b><span>UTBK 2028. Waktumu panjang — kita bangun fondasi dulu, santai tapi rutin.</span></button>
        <button class="ocard${d.kelas === 12 ? ' on' : ''}" data-act="ob-kelas" data-v="12" aria-pressed="${d.kelas === 12}"><b>Kelas 12</b><span>UTBK 2027. Saatnya fokus — target harian lebih tinggi.</span></button>
      </div>`;
    foot = `<button class="btn primary big" data-act="onb-next" data-primary>Lanjut</button>`;
  } else if (o.step === 3) {
    body = `<h1 class="onb-q">Kampus & prodi impianmu?</h1><p class="mute">Boleh dikosongkan dulu. Target skor dipakai untuk menghitung jarak ke tujuanmu.</p>
      <div class="form">
        <label for="ob-ptn">PTN impian</label><input id="ob-ptn" value="${esc(d.ptn)}" placeholder="mis. Universitas Indonesia" maxlength="60">
        <label for="ob-prodi">Prodi impian</label><input id="ob-prodi" value="${esc(d.prodi)}" placeholder="mis. Teknik Biomedis" maxlength="60">
        <label for="ob-target">Target skor rata-rata: <b id="ob-target-v">${d.target}</b></label><input id="ob-target" type="range" min="400" max="850" step="10" value="${d.target}">
        <p class="small mute">Belum tahu angkanya? Biarkan di 650 — bisa diubah nanti.</p>
      </div>`;
    foot = `<button class="btn primary big" data-act="onb-next" data-primary>Lanjut</button>`;
  } else if (o.step === 4) {
    body = `<h1 class="onb-q">Seberapa siap kamu di tiap subtes?</h1><p class="mute">Jujur saja — ini hanya untukmu. <b>1</b> = belum paham sama sekali, <b>5</b> = siap UTBK. Ini menjadi awal <b>pelacak subtes</b>-mu.</p>
      <ul class="trk-list compact">${SUBTES.map((x) => `<li class="trk" style="--h:${x.hue}"><div class="trk-h">${subChip(x.id)}<span class="trk-n">${esc(x.nama)}</span></div><div class="trk-b">${rateButtons(x.id, d.rate[x.id] || 0, 'ob-rate')}</div></li>`).join('')}</ul>`;
    foot = `<button class="btn primary big" data-act="onb-next" data-primary>${Object.keys(d.rate).length ? 'Lanjut' : 'Lewati dulu'}</button>`;
  } else if (o.step === 5) {
    body = `<h1 class="onb-q">Bagaimana kamu suka dijelaskan?</h1><p class="mute">Bisa diganti kapan saja, bahkan di tengah pelajaran.</p>
      <div class="opt-cards g2">${Object.keys(GAYA).map((k) => `<button class="ocard${d.gaya === k ? ' on' : ''}" data-act="ob-gaya" data-v="${k}" aria-pressed="${d.gaya === k}"><b>${GAYA[k]}</b><span>${GAYA_KET[k]}</span></button>`).join('')}</div>
      <span class="lbl">Berapa lama satu sesi?</span><div class="seg">${[[5, '5 mnt'], [10, '10 mnt'], [20, '20 mnt'], [45, '45 mnt']].map(([v, l]) => `<button type="button" class="${d.durasi === v ? 'on' : ''}" aria-pressed="${d.durasi === v}" data-act="ob-durasi" data-v="${v}">${l}</button>`).join('')}</div>
      <span class="lbl">Target harian</span><div class="seg">${[[20, 'Santai'], [40, 'Normal'], [80, 'Serius']].map(([v, l]) => `<button type="button" class="${d.targetXP === v ? 'on' : ''}" aria-pressed="${d.targetXP === v}" data-act="ob-xp" data-v="${v}">${l} · ${v} XP</button>`).join('')}</div>`;
    foot = `<button class="btn primary big" data-act="onb-next" data-primary>Lanjut</button>`;
  } else if (o.step === 6) {
    const rated = SUBTES.filter((x) => d.rate[x.id]);
    const sug = rated.length ? rated.slice().sort((a, b) => d.rate[a.id] - d.rate[b.id])[0].id : 'pk';
    const sel = d.mulai || sug;
    const authored = TANGGA[sel].atoms.some((id) => ATOM[id].L);
    body = `<h1 class="onb-q">Mulai dari subtes mana?</h1><p class="mute">Pilih yang membuatmu nyaman — kamu bisa pindah kapan saja di Peta.</p>
      <div class="sub-grid">${SUBTES.map((x) => { const au = TANGGA[x.id].atoms.some((id) => ATOM[id].L); return `<button class="sub-card${sel === x.id ? ' on' : ''}" data-act="ob-mulai" data-v="${x.id}" style="--h:${x.hue}" aria-pressed="${sel === x.id}">${subChip(x.id)}<b>${esc(x.nama)}</b><span>${au ? 'Materi siap' : 'Disusun Kak Tangga (AI)'}${x.id === sug && rated.length ? ' · <em>disarankan</em>' : ''}</span></button>`; }).join('')}</div>
      ${authored ? `<label class="check"><input type="checkbox" id="ob-tempat" ${d.tempat ? 'checked' : ''}> Ikut tes penempatan singkat (maks. 6 soal) supaya tidak mengulang yang sudah bisa</label>` : `<p class="note">${icon('spark')} Anak tangga subtes ini disusun Kak Tangga saat kamu membukanya.</p>`}`;
    foot = `<button class="btn primary big" data-act="onb-selesai" data-primary>Ayo mulai!</button>`;
  }
  const head = o.step ? `<button class="icon-btn" data-act="onb-back" aria-label="Kembali">${icon('back')}</button>` : '';
  return `<div class="ov-in onb-wrap"><header class="ov-h">${head || '<span class="ov-sp"></span>'}<div class="ov-t">${prog}</div><span class="ov-sp"></span></header>
    <div class="ov-body" id="ov-body"><div class="ov-c onb onb-${o.step}">${body}</div></div><footer class="ov-f"><div class="ov-c">${foot}</div></footer></div>`;
}
function onbCollect() {
  const d = OV.d; const v = (id) => { const el = document.getElementById(id); return el ? el.value : null; };
  if (OV.step === 1 && v('ob-nama') != null) d.nama = v('ob-nama').trim();
  if (OV.step === 3) { d.ptn = (v('ob-ptn') || '').trim(); d.prodi = (v('ob-prodi') || '').trim(); d.target = Number(v('ob-target')) || 650; }
  if (OV.step === 6) { const c = document.getElementById('ob-tempat'); d.tempat = c ? c.checked : false; }
}
function finishOnb() {
  onbCollect();
  const d = OV.d; const s = fresh();
  s.onboarded = true;
  s.profil = { nama: d.nama || 'Pejuang', kelas: d.kelas, ptn: d.ptn, prodi: d.prodi, target: d.target, utbk: utbkDefault(d.kelas) };
  Object.assign(s.set, { gaya: d.gaya, durasi: d.durasi, targetXP: d.targetXP });
  const rated = SUBTES.filter((x) => d.rate[x.id]);
  s.fokus = d.mulai || (rated.length ? rated.slice().sort((a, b) => d.rate[a.id] - d.rate[b.id])[0].id : 'pk');
  if (rated.length) { s.self.push({ d: keyOf(new Date()), r: Object.assign({}, d.rate) }); s.lencana.jujur = keyOf(new Date()); }
  S = s; LOG = []; GEN = {};
  for (const k of Object.keys(AQ)) if (k && ATOM[k] && !ATOM[k].L) delete AQ[k];
  registerCustom(); snapSkor(); save('state', 'log', 'gen');
  UI.tab = 'beranda'; UI.peta = s.fokus; location.hash = 'beranda';
  const tempat = d.tempat && TANGGA[s.fokus].atoms.some((id) => ATOM[id].L);
  OV = null; renderOv(); renderAll(); askPersist(); serverTick();
  if (tempat) startTempat(s.fokus);
  else toast(`Selamat datang, ${firstName()}! Anak tangga pertamamu sudah siap.`);
}
function buildDemo() {
  const s = fresh(); const t = keyOf(new Date());
  s.onboarded = true; s.demo = true;
  s.profil = { nama: 'Rina', kelas: 12, ptn: 'Universitas Gadjah Mada', prodi: 'Kedokteran', target: 680, utbk: '2027-04-21' };
  s.fokus = 'pk';
  for (let i = 1; i <= 12; i++) s.streak.aktif.push(addDays(t, -i));
  for (let i = 15; i <= 29; i++) if (i % 4) s.streak.aktif.push(addDays(t, -i));
  s.streak.aktif.sort(); s.streak.beku = [addDays(t, -13)];
  Object.assign(s.streak, { n: 12, best: 15, last: addDays(t, -1), freeze: 1 });
  const set = (id, lv, lulusAgo, dueIn, rev) => { s.atom[id] = { lvl: lv, rev: rev || 0, due: dueIn == null ? null : addDays(t, dueIn), lulus: lulusAgo == null ? null : addDays(t, -lulusAgo) }; };
  set('pk1', 4, 13, 20, 2); set('pk2', 4, 11, 22, 2); set('pk3', 3, 8, 0, 1); set('pk4', 3, 2, 0, 0); set('pk5', 1);
  set('pu1', 3, 6, 1, 1); set('pu2', 2); set('pbm1', 3, 4, 3, 1);
  /* cukup data di semua subtes, supaya demo menampilkan perkiraan skor yang sudah terbuka */
  s.ability = { pk: { r: 1085, n: 44 }, pu: { r: 1010, n: 26 }, pbm: { r: 1040, n: 22 }, ppu: { r: 1000, n: 21 }, lbi: { r: 1020, n: 24 }, lbe: { r: 990, n: 20 }, pm: { r: 980, n: 23 } };
  s.self = [
    { d: addDays(t, -20), r: { pu: 2, ppu: 3, pbm: 3, pk: 2, lbi: 3, lbe: 4, pm: 2 } },
    { d: addDays(t, -13), r: { pu: 2, ppu: 3, pbm: 3, pk: 2, lbi: 3, lbe: 4, pm: 2 } },
    { d: addDays(t, -6), r: { pu: 3, ppu: 3, pbm: 3, pk: 3, lbi: 3, lbe: 4, pm: 2 } },
  ];
  for (let i = 20; i >= 1; i--) s.skor.push({ d: addDays(t, -i), v: Math.round(470 + (20 - i) * 2.4 + Math.sin(i * 1.7) * 5) });
  s.tryout = [{ d: addDays(t, -14), skor: 455, benar: 5, n: 10, dtk: 96, per: {} }, { d: addDays(t, -5), skor: 521, benar: 6, n: 10, dtk: 81, per: {} }];
  s.salah = [{ q: 'pk5-l1', n: 1, ok: 0, d: addDays(t, -3) }, { q: 'pu2-l2', n: 2, ok: 1, d: addDays(t, -2) }, { q: 'pk4-u2', n: 1, ok: 0, d: addDays(t, -1) }];
  DEK.inggris.kartu.slice(0, 14).forEach((c, i) => { s.kartu[c.id] = { e: 2.5, i: i % 3 ? 3 : 1, n: 2, due: addDays(t, i % 4 === 0 ? 0 : 2), l: 0, first: addDays(t, -10) }; });
  DEK.baku.kartu.slice(0, 6).forEach((c, i) => { s.kartu[c.id] = { e: 2.5, i: 1, n: 1, due: addDays(t, i % 2 ? 0 : 1), l: 0, first: addDays(t, -4) }; });
  for (let i = 1; i <= 12; i++) s.xp.hari[addDays(t, -i)] = 28 + ((i * 7) % 26);
  s.xp.total = 1240;
  s.games[addDays(t, -1)] = { kata: { g: ['RAGAM', 'NALAR'], done: true, win: true, xp: 1 }, pola: { i: 3, ans: [2, 0, 2], done: true, xp: 1 } };
  s.lencana = { langkah: addDays(t, -13), s7: addDays(t, -6), kata: addDays(t, -4), tryout: addDays(t, -14), jujur: addDays(t, -6) };
  const log = []; const qids = Object.keys(QB).filter((id) => ['pk', 'pu', 'pbm'].includes(QB[id].s)); const rnd = seeded(7);
  for (let i = 14; i >= 1; i--) {
    const base = parseKey(addDays(t, -i)).getTime() + 16 * 3600e3; const per = 4 + Math.floor(rnd() * 4);
    for (let j = 0; j < per; j++) { const q = QB[qids[Math.floor(rnd() * qids.length)]]; const acc = 0.55 + (14 - i) * 0.018; log.push({ t: base + j * 95e3, q: q.id, s: q.s, a: q.a, d: q.d, y: rnd() < acc ? 1 : 0, ms: Math.round((95 - (14 - i) * 2.2 + rnd() * 20) * 1000), src: 'latihan' }); }
    for (let j = 0; j < 3; j++) log.push({ t: base + 3600e3 + j * 20e3, q: 'en' + j, s: 'kartu', y: rnd() < 0.8 ? 1 : 0, src: 'kartu', baru: 0, g: 3 });
  }
  return { s, log };
}
function loadDemo() {
  const r = buildDemo(); S = r.s; LOG = r.log; GEN = {};
  snapSkor(); save('state', 'log', 'gen');
  OV = null; UI.tab = 'beranda'; UI.peta = 'pk'; renderOv(); renderAll();
  toast('Mode demo: data contoh dimuat. Coba semua fiturnya!');
}

/* ======================= PELAJARAN 6 LANGKAH ======================= */
function startLesson(id, gaya, opt) {
  const a = ATOM[id]; if (!a) return;
  closeSheet(true); stopTimer(); ttsStop();
  const L = lessonOf(id);
  if (!L) { OV = { kind: 'lesson', id, gen: { state: AI.ok ? 'busy' : 'off' } }; renderOv(false); if (AI.ok) genLesson(id); return; }
  const r = atomRec(id); if (r.lvl < 1) r.lvl = 1; r.seen = today();
  const key = tanggaOf(id); if (SUB[key]) S.fokus = key;
  save();
  const qs = qsOf(id);
  const g = gaya || S.set.gaya;
  OV = {
    kind: 'lesson', id, L, step: 0, gaya: g, tried: [g], ws: 0, t0: Date.now(), xp0: S.xp.total,
    rp: L.rumpang ? { order: shuffle(L.rumpang.pilihan.map((_, i) => i)), sel: null, done: false } : null,
    lat: { pool: qs.l.slice(), n: Math.min(S.set.tempo === 'santai' ? 3 : 4, qs.l.length), cur: null, sel: null, chk: false, res: [], t0: 0, hint: false, ft: '' },
    uji: { list: qs.u.slice(0, 3), i: 0, cur: null, sel: null, chk: false, res: [], t0: 0, ft: '' },
    sus: {}, aiExp: null,
  };
  if (opt && opt.skip) OV.step = 2;   // datang dari materi bergambar: langsung ke contoh soal
  renderOv(false);
}
function lsPickLat() {
  const t = OV.lat; const used = new Set(t.res.map((r) => r.id));
  const pool = t.pool.filter((q) => !used.has(q.id));
  const q = pickSweet(pool, ATOM[OV.id].s) || pool[0];
  t.cur = prepQ(q); t.sel = null; t.chk = false; t.hint = S.set.petunjuk === 'banyak'; t.t0 = performance.now();
}
function lsPickUji() { const u = OV.uji; u.cur = prepQ(u.list[u.i]); u.sel = null; u.chk = false; u.t0 = performance.now(); }
function lsNext() {
  const o = OV;
  if (o.step === 0) o.step = 1;
  else if (o.step === 1) o.step = 2;
  else if (o.step === 2) o.step = o.L.rumpang ? 3 : 4;
  else if (o.step === 3) o.step = 4;
  if (o.step === 4 && !o.lat.cur) {
    if (!o.lat.n) { o.step = 5; if (o.uji.list.length) lsPickUji(); else { finishLesson(); } }
    else lsPickLat();
  }
  renderOv(false);
}
function rLesson() {
  const o = OV; const a = ATOM[o.id]; const x = subOf(a.s);
  if (o.gen) return rGen();
  if (o.step === 6) return rLessonEnd();
  const L = o.L;
  const prog = `<div class="segs" role="img" aria-label="Langkah ${o.step + 1} dari 6: ${STEP_NAMES[o.step]}">${STEP_NAMES.map((n, i) => `<i class="${i < o.step ? 'done' : i === o.step ? 'now' : ''}"></i>`).join('')}</div>`;
  let body = '', foot = '';
  if (o.step === 0) {
    const key = tanggaOf(o.id); const tg = TANGGA[key]; const i = tg.atoms.indexOf(o.id);
    body = `<div class="ls-hook"><p class="eyebrow">${x.kode} · anak tangga ${i + 1} dari ${tg.atoms.length}</p><h1 class="ls-title">${esc(a.judul)}</h1>
      <p class="hook">${fmt(L.hook)}</p>
      ${a.pra.length ? `<p class="small mute">Dibangun di atas: ${a.pra.map((p) => `<b>${esc(ATOM[p].judul)}</b>`).join(', ')}</p>` : ''}
      ${!a.L ? `<p class="note">${icon('spark')} Disusun Kak Tangga (AI) dan belum diperiksa manusia — kalau ada yang aneh, laporkan.</p>` : ''}
      <ol class="ls-plan">${STEP_NAMES.map((n, j) => `<li><span>${j + 1}</span>${n}</li>`).join('')}</ol>
      ${laporLink(o.id, 'Ada yang keliru di materi ini?')}</div>`;
    foot = `<button class="btn primary big" data-act="ls-next" data-primary>Mulai</button>`;
  } else if (o.step === 1) {
    const g = o.gaya; const J = L.jelas;
    const content = g === 'langkah' ? `<ol class="steps-ol">${J.langkah.map((s) => `<li>${fmt(s)}</li>`).join('')}</ol>` : `<p>${fmt(J[g])}</p>`;
    body = `${materiOf(o.id) ? `<button class="card row-card mt-link" data-act="mt-dari-ls">${icon('book')}<span><b>Materi lengkap bergambar</b><small>${materiOf(o.id).pages.length} halaman, dari dasar sampai soal sulit${mtRead(o.id) ? ' · sudah dibaca' : ''}</small></span>${icon('arrow')}</button>` : ''}<div class="seg gaya-seg" role="tablist" aria-label="Gaya penjelasan">${Object.keys(GAYA).map((k) => `<button type="button" role="tab" aria-selected="${k === g}" class="${k === g ? 'on' : ''}" data-act="ls-gaya" data-g="${k}">${GAYA[k]}</button>`).join('')}</div>
      <article class="paper ruled">${content}</article>
      ${o.aiExp ? `<article class="paper ai-exp"><p class="eyebrow">${icon('spark')} Cara baru dari Kak Tangga</p><div id="ai-exp">${o.aiExp.text ? fmt(o.aiExp.text) : '<span class="typing">Kak Tangga sedang berpikir…</span>'}</div>${o.aiExp.err ? `<p class="warn-t small">${esc(o.aiExp.err)}</p>` : ''}</article>` : ''}
      <div class="row-btns"><button class="btn ghost sm" data-act="ls-lain">${icon('refresh')} Jelaskan dengan cara lain</button>${AI.ok ? `<button class="btn ghost sm" data-act="ls-ai"${o.aiExp && o.aiExp.busy ? ' disabled' : ''}>${icon('spark')} Minta cara baru (AI)</button>` : ''}${AI.ok ? `<button class="btn ghost sm" data-act="chat" data-ctx="${o.id}">${icon('chat')} Tanya</button>` : ''}</div>`;
    foot = `<button class="btn primary big" data-act="ls-next" data-primary>Aku paham, lanjut</button>`;
  } else if (o.step === 2) {
    const c = L.contoh; const n = c.langkah.length;
    body = `<article class="paper ruled"><p class="eyebrow">Contoh soal, dikerjakan bersama</p><p class="q-stem">${fmt(c.soal)}</p>
      <ol class="ws">${c.langkah.slice(0, o.ws).map((s) => `<li>${fmt(s)}</li>`).join('')}</ol>
      ${o.ws >= n ? `<p class="ans">Jawaban: <b>${fmt(c.jawab)}</b></p>` : ''}</article>`;
    foot = o.ws < n ? `<button class="btn ghost" data-act="ls-ws-all">Tampilkan semua</button><button class="btn primary big" data-act="ls-ws" data-primary>Langkah ${o.ws + 1} dari ${n}</button>`
      : `<button class="btn primary big" data-act="ls-next" data-primary>${L.rumpang ? 'Lanjut: isi yang kosong' : 'Lanjut ke latihan'}</button>`;
  } else if (o.step === 3) {
    const R = L.rumpang; const rp = o.rp; const opt = rp.sel != null ? R.pilihan[rp.sel] : null; const right = rp.done && opt === R.kosong;
    const blank = `<span class="blank${rp.done ? (right ? ' ok' : ' no') : rp.sel != null ? ' filled' : ''}">${opt != null ? esc(opt) : '&nbsp;'}</span>`;
    body = `<article class="paper ruled"><p class="eyebrow">Contoh rumpang — isi bagian yang kosong</p><p class="q-stem">${fmt(R.soal)}</p>
      <ol class="ws">${R.langkah.map((s) => `<li>${fmt(s).replace('___', () => blank)}</li>`).join('')}</ol></article>
      <div class="choices" role="radiogroup" aria-label="Pilihan isian">${rp.order.map((i) => `<button type="button" class="choice${rp.sel === i ? ' sel' : ''}${rp.done && R.pilihan[i] === R.kosong ? ' right' : ''}${rp.done && rp.sel === i && !right ? ' wrong' : ''}" role="radio" aria-checked="${rp.sel === i}" data-act="rp-pilih" data-i="${i}"${rp.done ? ' disabled' : ''}>${esc(R.pilihan[i])}</button>`).join('')}</div>`;
    foot = !rp.done ? `<button class="btn primary big" data-act="rp-cek" data-primary${rp.sel == null ? ' disabled' : ''}>Cek</button>`
      : `<div class="fb ${right ? 'ok' : 'no'}" role="status"><p class="fb-t hand">${right ? 'Tepat!' : 'Belum tepat.'}</p>${right ? '' : `<p class="fb-k">Yang benar: <b>${esc(R.kosong)}</b></p>`}</div><button class="btn primary big" data-act="ls-next" data-primary>Lanjut ke latihan</button>`;
  } else if (o.step === 4) {
    const t = o.lat; const idx = t.res.length + (t.chk ? 0 : 1);
    body = `<p class="q-count">Latihan · soal ${idx} dari ${t.n}${S.set.tempo === 'intens' ? ' · target ±75 detik' : ''}</p>${qBlock(t.cur, t)}${t.hint && !t.chk ? `<p class="hint">${icon('bulb')} ${fmt(hintOf(t.cur.q))}</p>` : ''}`;
    foot = !t.chk ? `${S.set.petunjuk !== 'tidak' && !t.hint ? `<button class="btn ghost" data-act="hint">${icon('bulb')} Petunjuk</button>` : ''}<button class="btn primary big" data-act="cek" data-primary${t.sel == null ? ' disabled' : ''}>Cek</button>`
      : `${fbBlock(t.cur, t.sel, t.ft)}<button class="btn primary big" data-act="lanjut" data-primary>${t.res.length >= t.n ? 'Lanjut: buktikan' : 'Lanjut'}</button>`;
  } else if (o.step === 5) {
    const u = o.uji;
    body = `<p class="q-count">Buktikan · soal ${u.i + 1} dari ${u.list.length} · tanpa petunjuk</p><p class="small mute">Lolos jika minimal ${Math.ceil((u.list.length * 2) / 3)} benar. Ini yang membuka anak tangga berikutnya.</p>${qBlock(u.cur, u)}`;
    foot = !u.chk ? `<button class="btn primary big" data-act="cek" data-primary${u.sel == null ? ' disabled' : ''}>Cek</button>`
      : `${fbBlock(u.cur, u.sel, u.ft)}<button class="btn primary big" data-act="lanjut" data-primary>${u.i + 1 >= u.list.length ? 'Lihat hasil' : 'Lanjut'}</button>`;
  }
  return ovShell({ title: `<span class="sub-dot" style="--h:${x.hue}"></span>${esc(a.judul)}`, sub: STEP_NAMES[o.step], prog, body, foot, cls: 'lesson' });
}
function finishLesson() {
  const o = OV; const r = atomRec(o.id); const t = today();
  const latOK = o.lat.res.filter((x) => x.y).length; const ujiOK = o.uji.res.filter((x) => x.y).length;
  const need = Math.ceil((o.uji.list.length * 2) / 3); const pass = ujiOK >= need; const wasBelow = r.lvl < 3;
  if (o.lat.n && latOK >= Math.ceil(o.lat.n * 0.75)) r.lvl = Math.max(r.lvl, 2);
  let unlocked = null;
  const key = tanggaOf(o.id);
  if (pass) {
    r.lvl = Math.max(r.lvl, 3);
    if (wasBelow) { r.lulus = t; r.rev = 0; r.due = addDays(t, 1); }
    addXP(20); award('langkah'); checkPuncak(key);
    unlocked = TANGGA[key].atoms.find((id) => lvl(id) < 3 && isOpen(id) && ATOM[id].pra.includes(o.id)) || nextAtom(key);
  } else { r.gagal = (r.gagal || 0) + 1; addXP(8); }
  const a = ATOM[o.id];
  const sus = Object.keys(o.sus).sort((p, q) => o.sus[q] - o.sus[p]).find((id) => ATOM[id] && id !== o.id)
    || (a.pra.length ? a.pra.slice().sort((p, q) => lvl(p) - lvl(q))[0] : null);
  const tagged = Object.keys(o.sus).length > 0;
  const streakUp = markActive(); snapSkor(); save('state', 'log');
  o.result = { pass, latOK, ujiOK, need, nUji: o.uji.list.length, unlocked, sus, tagged, mins: Math.max(1, Math.round((Date.now() - o.t0) / 60000)), streakUp, xp: S.xp.total - o.xp0 };
  o.step = 6;
}
function rLessonEnd() {
  const o = OV; const R = o.result; const a = ATOM[o.id];
  const stats = `<ul class="end-stats"><li><b>${R.latOK}/${o.lat.n}</b><span>latihan</span></li><li><b>${R.ujiOK}/${R.nUji}</b><span>buktikan</span></li><li><b>+${R.xp}</b><span>XP</span></li><li><b>${R.mins} mnt</b><span>waktu</span></li></ul>`;
  let body, foot;
  if (R.pass) {
    body = `<div class="end ok"><div class="stamp hand">Lulus!</div><h1>${esc(a.judul)}</h1><p>Level sekarang: <b>${LEVEL[lvl(o.id)]}</b>. Besok ada ulasan singkat — lolos lagi sehari dan seminggu kemudian untuk naik ke <b>Kuasai</b>.</p>${stats}
      ${R.unlocked ? `<p class="unlock">${icon('stairs')} Terbuka: <b>${esc(ATOM[R.unlocked].judul)}</b></p>` : '<p class="unlock">Kamu sampai di puncak tangga ini!</p>'}</div>`;
    foot = R.unlocked ? `<button class="btn ghost" data-act="ov-close">Selesai dulu</button><button class="btn primary big" data-act="belajar" data-id="${R.unlocked}" data-primary>Anak tangga berikutnya ${icon('arrow')}</button>`
      : `<button class="btn primary big" data-act="ov-close" data-primary>Selesai</button>`;
  } else {
    body = `<div class="end no"><div class="stamp hand">Belum lolos</div><h1>Itu wajar.</h1><p>Kalau belum bisa, artinya anak tangganya masih terlalu tinggi — bukan kamu yang lemah. Kita perkecil langkahnya.</p>${stats}
      ${R.sus ? `<div class="diag-card">${icon('down')}<p>${R.tagged ? 'Dari pola jawabanmu, yang paling mungkin goyah' : 'Coba kuatkan dulu anak tangga di bawahnya'}: <b>${esc(ATOM[R.sus].judul)}</b>.</p></div>` : ''}</div>`;
    foot = (R.sus ? `<button class="btn primary big" data-act="belajar" data-id="${R.sus}" data-primary>Turun ke “${esc(ATOM[R.sus].judul)}”</button>` : '')
      + `<button class="btn${R.sus ? '' : ' primary big'}" data-act="ls-ulang"${R.sus ? '' : ' data-primary'}>Ulangi dengan gaya lain</button><button class="btn ghost" data-act="ov-close">Nanti saja</button>`;
  }
  return ovShell({ title: esc(a.judul), body, foot, cls: 'lesson' });
}
function rGen() {
  const o = OV; const a = ATOM[o.id]; const g = o.gen;
  let body, foot;
  if (g.state === 'busy') {
    body = `<div class="gen">${loaderStairs()}<h2>Kak Tangga sedang menyusun anak tangga ini</h2><p class="mute">“${esc(a.judul)}” — 4 gaya penjelasan, contoh, dan 7 soal. Biasanya 20–60 detik.</p></div>`;
    foot = `<button class="btn ghost" data-act="gen-stop">${icon('stop')} Hentikan</button>`;
  } else if (g.state === 'err') {
    body = `<div class="gen"><h2>Belum berhasil</h2><p>${esc(g.msg || 'Coba lagi sebentar lagi.')}</p></div>`;
    foot = `<button class="btn ghost" data-act="ov-close">Tutup</button><button class="btn primary big" data-act="gen-ulang" data-primary>Coba lagi</button>`;
  } else {
    body = `<div class="gen"><h2>Anak tangga ini disusun Kak Tangga (AI)</h2><p>${AI.off ? 'Kak Tangga belum diizinkan di tampilan ini.' : SRV.on ? 'Kak Tangga sedang tidak bisa dihubungi. Cek internetmu, lalu coba lagi.' : 'Kak Tangga belum aktif di versi ini.'} Sementara itu, coba tangga lain yang materinya sudah siap.</p></div>`;
    foot = `<button class="btn primary big" data-act="ov-close" data-primary>Kembali</button>`;
  }
  return ovShell({ title: esc(a.judul), body, foot, cls: 'lesson' });
}

/* ======================= KUIS (latihan, ulasan, comeback, dll.) ======================= */
function startQuiz(cfg) {
  OV = Object.assign({ kind: 'quiz', res: [], cur: null, sel: null, chk: false, ft: '', hint: false, used: new Set(), xp0: S.xp.total, done: false }, cfg);
  quizNext();
}
function quizNext() {
  const o = OV; const q = o.next(o);
  if (!q) { o.end(o); o.done = true; save('state', 'log'); renderOv(false); flushToasts(); renderAll(); return; }
  o.cur = prepQ(q); o.sel = null; o.chk = false; o.hint = !!o.allowHint && S.set.petunjuk === 'banyak'; o.t0 = performance.now(); o.used.add(q.id);
  renderOv(false);
}
function quizSummary(o, extra, minimal) {
  const ok = o.res.filter((r) => r.y).length; const n = o.res.length; const avg = n ? mean(o.res.map((r) => r.ms)) / 1000 : 0;
  const wrong = o.res.filter((r) => !r.y).map((r) => QB[r.id]).filter(Boolean);
  return `<div class="end${n && ok / n >= 0.7 ? ' ok' : ''}"><p class="eyebrow">${esc(o.title)}</p><div class="end-score"><b>${ok}</b><span>/${n} benar</span></div>
    ${minimal ? '' : `<ul class="end-stats"><li><b>${n ? Math.round((ok / n) * 100) : 0}%</b><span>akurasi</span></li><li><b>${Math.round(avg)} dtk</b><span>per soal</span></li><li><b>+${S.xp.total - o.xp0}</b><span>XP</span></li></ul>`}
    ${extra || ''}
    ${wrong.length ? `<details class="review"><summary>Pembahasan ${wrong.length} soal yang salah</summary>${wrong.map((q) => `<div class="rv"><p>${fmt(q.t)}</p><p>Jawaban: <b>${fmt(q.o[q.k])}</b></p><p class="mute">${fmt(q.b)}</p>${laporLink(q.id, 'Soal ini keliru?')}</div>`).join('')}</details>` : ''}</div>`;
}
function rQuiz() {
  const o = OV;
  if (o.done) {
    return ovShell({ title: esc(o.title), body: o.summary, foot: `${o.mode === 'drill' ? `<button class="btn ghost" data-act="drill" data-s="${o.s}">Latihan lagi</button>` : ''}<button class="btn primary big" data-act="ov-close" data-primary>Selesai</button>` });
  }
  const prog = `<div class="bar-prog" aria-hidden="true"><span style="width:${(o.res.length / o.n) * 100}%"></span></div>`;
  const idx = o.res.length + (o.chk ? 0 : 1);
  const body = `<p class="q-count">${subChip(o.cur.q.s)} Soal ${idx}${o.mode === 'tempat' ? ` (maks. ${o.n})${o.confirm ? ' · soal konfirmasi' : ''}` : ` dari ${o.n}`}</p>${qBlock(o.cur, o)}${o.hint && !o.chk ? `<p class="hint">${icon('bulb')} ${fmt(hintOf(o.cur.q))}</p>` : ''}`;
  const foot = !o.chk ? `${o.allowHint && S.set.petunjuk !== 'tidak' && !o.hint ? `<button class="btn ghost" data-act="hint">${icon('bulb')} Petunjuk</button>` : ''}<button class="btn primary big" data-act="cek" data-primary${o.sel == null ? ' disabled' : ''}>Cek</button>`
    : `${fbBlock(o.cur, o.sel, o.ft)}<button class="btn primary big" data-act="lanjut" data-primary>Lanjut</button>`;
  return ovShell({ title: esc(o.title), prog, body, foot });
}
function doCheck() {
  const o = OV; if (!o) return;
  let t = null, src = '';
  if (o.kind === 'lesson' && (o.step === 4 || o.step === 5)) { t = o.step === 4 ? o.lat : o.uji; src = o.step === 4 ? 'latihan' : 'uji'; }
  else if (o.kind === 'quiz' && !o.done) { t = o; src = o.src; }
  if (!t || t.sel == null || t.chk) return;
  const q = t.cur.q; const orig = t.cur.perm[t.sel]; const y = orig === q.k; const ms = performance.now() - t.t0;
  record(q, y, ms, src, { h: t.hint, g: o.gaya });
  t.res.push({ id: q.id, y, ms });
  if (o.kind === 'lesson' && !y && q.x && q.x[orig]) o.sus[q.x[orig]] = (o.sus[q.x[orig]] || 0) + 1;
  if (o.kind === 'quiz' && o.onAnswer) o.onAnswer(o, q, y);
  t.chk = true; t.ft = y ? pickOne(PUJI) : pickOne(SEMANGAT);
  save('state', 'log'); renderOv();
}
function doLanjut() {
  const o = OV; if (!o) return;
  if (o.kind === 'lesson') {
    if (o.step === 4) { if (o.lat.res.length >= o.lat.n) { o.step = 5; lsPickUji(); } else lsPickLat(); renderOv(false); }
    else if (o.step === 5) { o.uji.i += 1; if (o.uji.i >= o.uji.list.length) finishLesson(); else lsPickUji(); renderOv(false); flushToasts(); }
    return;
  }
  if (o.kind === 'quiz') quizNext();
}
function startDrill(s) {
  const all = qsOfSub(s);
  const opened = all.filter((q) => !q.a || !ATOM[q.a] || lvl(q.a) >= 1 || isOpen(q.a));
  const pool = opened.length >= 4 ? opened : all;
  if (!pool.length) { toast('Belum ada soal untuk subtes ini. Buka anak tangganya di Peta dulu.'); return; }
  const n = Math.min(drillN(), pool.length); const before = bulat10(prediksi(s).skor); const wasReady = skorSiap(s);
  closeSheet(true);
  startQuiz({
    mode: 'drill', title: 'Latihan adaptif · ' + subOf(s).kode, s, n, allowHint: true, src: 'latihan',
    next: (o) => (o.res.length >= o.n ? null : pickSweet(pool.filter((q) => !o.used.has(q.id)), s)),
    end: (o) => {
      markActive(); snapSkor(); const after = bulat10(prediksi(s).skor); const kd = subOf(s).kode;
      const line = wasReady ? `Perkiraan kasar skor ${kd}: <b>≈${before} → ≈${after}</b>${after > before ? ' ▲' : after < before ? ' ▼' : ''}`
        : skorSiap(s) ? `Perkiraan skor ${kd} sekarang terbuka: <b>≈${after}</b>`
          : `Perkiraan skor ${kd} terbuka setelah ${SKOR_MIN} soal — sekarang <b>${nJawab(s)}/${SKOR_MIN}</b>.`;
      o.summary = quizSummary(o, `<p class="delta">${line}</p>`);
    },
  });
}
function startUlasan(only) {
  const ids = (only ? [only] : dueList()).slice(0, 5);
  if (!ids.length) { toast('Tidak ada ulasan hari ini.'); return; }
  const items = [];
  for (const id of ids) { const qs = qsOf(id); shuffle(qs.l.concat(qs.u)).slice(0, 3).forEach((q) => items.push(q)); }
  const list = shuffle(items);
  closeSheet(true);
  startQuiz({
    mode: 'ulasan', title: 'Ulasan', n: list.length, allowHint: false, src: 'ulasan', list, ids,
    next: (o) => o.list[o.res.length] || null,
    end: (o) => {
      const t = today(); const lines = [];
      for (const id of o.ids) {
        const rs = o.res.filter((r) => QB[r.id] && QB[r.id].a === id); if (!rs.length) continue;
        const ok = rs.filter((r) => r.y).length; const r = atomRec(id);
        if (ok >= Math.ceil((rs.length * 2) / 3)) {
          r.rev = (r.rev || 0) + 1; r.goyah = false;
          if (r.rev >= 2) { if (r.lvl < 4) award('kuasai'); r.lvl = 4; }
          r.due = addDays(t, [1, 7, 30, 60][Math.min(r.rev, 3)]);
          lines.push(`<li class="ok">${icon('check')}<span><b>${esc(ATOM[id].judul)}</b> — ${LEVEL[r.lvl]}. Ulasan lagi ${tglPendek(r.due)}.</span></li>`);
        } else {
          r.rev = Math.max(0, (r.rev || 0) - 1); r.goyah = true; r.lvl = Math.min(r.lvl, 3); r.due = addDays(t, 1);
          lines.push(`<li class="no">${icon('refresh')}<span><b>${esc(ATOM[id].judul)}</b> — perlu dikuatkan. Ulasan lagi besok.</span></li>`);
        }
      }
      addXP(10); markActive(); snapSkor();
      o.summary = quizSummary(o, `<ul class="rev-list">${lines.join('')}</ul>`);
    },
  });
}
function startComeback() {
  const list = shuffle(Object.values(QB).filter((q) => (q.d || 2) >= 2 && !q.ai)).slice(0, 5);
  startQuiz({
    mode: 'comeback', title: 'Tantangan Comeback', n: list.length, allowHint: false, src: 'comeback', list,
    next: (o) => o.list[o.res.length] || null,
    end: (o) => {
      const ok = o.res.filter((r) => r.y).length; let msg;
      if (ok >= 4 && repairStreak()) { markActive(); msg = `<p class="big-ok hand">Streak pulih: ${S.streak.n} hari!</p>`; }
      else { if (S.streak.putus) S.streak.putus.coba = true; markActive(); msg = `<p>${ok}/5 benar. Streak lama belum bisa dipulihkan, tapi streak baru sudah dimulai hari ini.</p>`; }
      snapSkor(); o.summary = quizSummary(o, msg);
    },
  });
}
function startSalah() {
  const list = S.salah.slice().reverse().slice(0, 8).map((e) => QB[e.q]).filter(Boolean);
  if (!list.length) return;
  startQuiz({
    mode: 'salah', title: 'Uji ulang Buku Salah', n: list.length, allowHint: true, src: 'salah', list,
    next: (o) => o.list[o.res.length] || null,
    onAnswer: (o, q, y) => { const e = S.salah.find((x) => x.q === q.id); if (!e) return; if (y) { e.ok += 1; if (e.ok >= 2) S.salah = S.salah.filter((x) => x !== e); } else { e.ok = 0; e.n += 1; } },
    end: (o) => { markActive(); snapSkor(); const out = o.res.filter((r) => r.y && !S.salah.some((x) => x.q === r.id)).length; o.summary = quizSummary(o, `<p>${out} soal keluar dari Buku Salah. Sisanya muncul lagi di uji ulang berikutnya.</p>`); },
  });
}
function startLompat(id) {
  const qs = qsOf(id).u; if (qs.length < 2) return;
  closeSheet(true);
  startQuiz({
    mode: 'lompat', title: 'Uji lompat · ' + ATOM[id].judul, n: qs.length, allowHint: false, src: 'uji', list: qs,
    next: (o) => o.list[o.res.length] || null,
    end: (o) => {
      const ok = o.res.filter((r) => r.y).length; const need = Math.ceil((o.n * 2) / 3); let msg;
      if (ok >= need) { const r = atomRec(id); r.lvl = Math.max(r.lvl, 3); r.lulus = today(); r.rev = 0; r.due = addDays(today(), 1); r.tempat = true; msg = `<p class="big-ok hand">Lolos! “${esc(ATOM[id].judul)}” sekarang Cakap.</p><p class="small mute">Anak tangga di bawahnya tetap bisa kamu pelajari kapan saja.</p>`; }
      else msg = `<p>${ok}/${o.n} benar. Belum bisa melompat — naik dari anak tangga di bawahnya dulu, ya.</p>`;
      markActive(); snapSkor(); o.summary = quizSummary(o, msg);
    },
  });
}
function startTempat(key) {
  const ids = TANGGA[key].atoms.filter((id) => qsOf(id).u.length);
  if (!ids.length) return;
  closeSheet(true);
  startQuiz({
    mode: 'tempat', title: 'Tes penempatan · ' + subOf(key).kode, n: 6, allowHint: false, src: 'tempat', ids, idx: ids.length - 1, floor: -1, confirm: false,
    /* Mulai dari anak tangga teratas. Benar → satu soal konfirmasi di anak tangga yang sama
       (dua benar berturut-turut = “lantai”). Salah → turun dua anak tangga. Maks. 6 soal. */
    next: (o) => {
      let q = null;
      if (!o.res.length) q = qsOf(o.ids[o.idx]).u[0];
      else {
        const last = o.res[o.res.length - 1];
        if (o.confirm) { o.confirm = false; if (last.y) { o.floor = o.idx; return null; } o.idx -= 1; }
        else if (last.y) { const u = qsOf(o.ids[o.idx]).u; if (u.length < 2) { o.floor = o.idx; return null; } o.confirm = true; q = u[1]; }
        else o.idx -= 2;
        if (!q) { if (o.idx < 0) return null; q = qsOf(o.ids[o.idx]).u[0]; }
      }
      if (o.res.length >= 6) return null;
      return q;
    },
    end: (o) => {
      const t = today(); let msg;
      if (o.floor >= 0) {
        const all = TANGGA[key].atoms; const fi = all.indexOf(o.ids[o.floor]);
        for (let i = 0; i <= fi; i++) { const r = atomRec(all[i]); if (r.lvl < 3) Object.assign(r, { lvl: 3, tempat: true, lulus: t, rev: 1, due: addDays(t, 7) }); }
        const nx = nextAtom(key);
        msg = `<p class="big-ok hand">Lantaimu: anak tangga ${fi + 1}.</p><p>${fi + 1} anak tangga ditandai <b>Cakap</b> dan akan diulas minggu depan. ${nx ? `Kamu mulai dari <b>${esc(ATOM[nx].judul)}</b>.` : 'Seluruh tangga ini sudah kamu kuasai!'}</p>`;
      } else msg = '<p>Kita mulai dari anak tangga pertama. Fondasi yang kokoh membuat anak tangga berikutnya lebih cepat.</p>';
      markActive(); snapSkor(); o.summary = quizSummary(o, msg, true);
    },
  });
}

/* ======================= TRYOUT MINI ======================= */
function startTryout() {
  const per = {}; for (const x of SUBTES) per[x.id] = shuffle(Object.values(QB).filter((q) => q.s === x.id));
  const picked = [];
  for (let round = 0; picked.length < 10 && round < 6; round++) for (const x of SUBTES) { if (picked.length >= 10) break; const q = per[x.id][round]; if (q) picked.push(q); }
  picked.sort((a, b) => SUBTES.findIndex((x) => x.id === a.s) - SUBTES.findIndex((x) => x.id === b.s));
  const n = picked.length;
  OV = { kind: 'tryout', items: picked.map(prepQ), ans: Array(n).fill(null), i: 0, limit: n * 75, t0: Date.now(), times: Array(n).fill(0), qs: performance.now(), done: false, xp0: S.xp.total, arm: false };
  startToTimer(); renderOv(false);
}
const toLeft = () => Math.max(0, OV.limit - Math.floor((Date.now() - OV.t0) / 1000));
function startToTimer() {
  stopTimer();
  TIMER = setInterval(() => {
    if (!OV || OV.kind !== 'tryout' || OV.done) { stopTimer(); return; }
    const left = toLeft(); const el = $('#to-timer');
    if (el) { el.textContent = mmss(left); el.classList.toggle('low', left <= 60); }
    if (left <= 0) submitTryout();
  }, 500);
}
function toGo(i) { const o = OV; o.times[o.i] += performance.now() - o.qs; o.qs = performance.now(); o.i = clamp(i, 0, o.items.length - 1); o.arm = false; renderOv(false); }
function submitTryout() {
  const o = OV; if (!o || o.done) return;
  stopTimer(); o.times[o.i] += performance.now() - o.qs;
  let ws = 0, wok = 0, ok = 0; const per = {};
  o.items.forEach((cur, i) => {
    const q = cur.q; const a = o.ans[i]; const y = a != null && cur.perm[a] === q.k; const w = q.d || 2;
    ws += w; if (y) { wok += w; ok += 1; }
    per[q.s] = per[q.s] || { ok: 0, n: 0 }; per[q.s].n += 1; if (y) per[q.s].ok += 1;
    record(q, y, o.times[i], 'tryout');
  });
  const skor = Math.round(200 + 700 * (wok / ws)); const dtk = (Date.now() - o.t0) / 1000 / o.items.length;
  S.tryout.push({ d: today(), skor, benar: ok, n: o.items.length, dtk, per }); if (S.tryout.length > 60) S.tryout.shift();
  award('tryout'); addXP(15); markActive(); snapSkor(); save('state', 'log');
  o.done = true; o.result = { skor, ok, per, dtk };
  renderOv(false); flushToasts();
}
function rTryout() {
  const o = OV; const n = o.items.length;
  if (o.done) {
    const R = o.result;
    const body = `<div class="end ok"><p class="eyebrow">Hasil tryout mini</p><div class="end-score"><b>${R.ok}</b><span>/${n} benar</span></div>
      <ul class="end-stats"><li><b>${Math.round((R.ok / n) * 100)}%</b><span>akurasi</span></li><li><b>${Math.round(R.dtk)} dtk</b><span>per soal</span></li><li><b>+${S.xp.total - o.xp0}</b><span>XP</span></li></ul>
      <table class="to-tab"><thead><tr><th scope="col">Subtes</th><th scope="col">Benar</th></tr></thead><tbody>${SUBTES.filter((x) => R.per[x.id]).map((x) => `<tr><td>${subChip(x.id)} ${esc(x.nama)}</td><td>${R.per[x.id].ok}/${R.per[x.id].n}</td></tr>`).join('')}</tbody></table>
      <p class="small mute">Tryout mini mengukur latihanmu, bukan skor UTBK. 10 soal terlalu sedikit untuk menebak skor resmi.</p>
      <details class="review"><summary>Pembahasan semua soal</summary>${o.items.map((c, i) => { const q = c.q; const a = o.ans[i]; const y = a != null && c.perm[a] === q.k; return `<div class="rv ${y ? 'ok' : 'no'}"><p><b>${i + 1}.</b> ${fmt(q.t)}</p><p>Jawabanmu: ${a == null ? '<i>kosong</i>' : `<b>${fmt(q.o[c.perm[a]])}</b>`} ${y ? icon('check') : icon('x')}</p>${y ? '' : `<p>Jawaban benar: <b>${fmt(q.o[q.k])}</b></p>`}<p class="mute">${fmt(q.b)}</p>${laporLink(q.id, 'Soal ini keliru?')}</div>`; }).join('')}</details></div>`;
    return ovShell({ title: 'Tryout mini', body, foot: `<button class="btn primary big" data-act="ov-close" data-primary>Selesai</button>` });
  }
  const cur = o.items[o.i]; const q = cur.q; const x = subOf(q.s); const left = toLeft(); const filled = o.ans.filter((a) => a != null).length;
  const body = `<p class="q-count">${subChip(q.s)} ${esc(x.nama)} · soal ${o.i + 1} dari ${n}</p>${qBlock(cur, { sel: o.ans[o.i], chk: false, act: 'to-pilih' })}
    <div class="ljk-wrap"><p class="eyebrow">Lembar jawaban · ${filled}/${n} terisi</p><div class="ljk">${o.items.map((c, i) => `<button type="button" class="ljk-b${o.ans[i] != null ? ' isi' : ''}${i === o.i ? ' now' : ''}" data-act="to-go" data-i="${i}" aria-label="Soal ${i + 1}${o.ans[i] != null ? ', dijawab ' + LETTERS[o.ans[i]] : ', kosong'}"><span>${i + 1}</span><b>${o.ans[i] != null ? LETTERS[o.ans[i]] : ''}</b></button>`).join('')}</div></div>`;
  const foot = `<button class="btn ghost" data-act="to-go" data-i="${o.i - 1}"${o.i === 0 ? ' disabled' : ''}>${icon('back')} Sebelumnya</button>`
    + (o.i < n - 1 ? `<button class="btn primary" data-act="to-go" data-i="${o.i + 1}" data-primary>Berikutnya ${icon('arrow')}</button>` : '')
    + `<button class="btn${o.i === n - 1 ? ' primary' : ''}" data-act="to-kumpul"${o.i === n - 1 ? ' data-primary' : ''}>${o.arm ? `Yakin? ${n - filled ? (n - filled) + ' kosong. ' : ''}Kumpulkan` : 'Kumpulkan'}</button>`;
  return ovShell({ title: 'Tryout mini', sub: `<span id="to-timer" class="timer${left <= 60 ? ' low' : ''}">${mmss(left)}</span>`, closeAct: 'to-keluar', closeLabel: 'Keluar dari tryout', body, foot, cls: 'tryout' });
}

/* ======================= KARTU ======================= */
function startFC(dek) {
  const q = cardQueue(dek || null); const queue = shuffle(q.due).concat(q.fresh);
  if (!queue.length) { toast('Kartu untuk hari ini sudah beres.'); return; }
  OV = { kind: 'fc', dek, queue, i: 0, flip: false, done: 0, ok: 0, xp0: S.xp.total, counted: false };
  renderOv(false);
}
function rFC() {
  const o = OV;
  const prog = `<div class="bar-prog" aria-hidden="true"><span style="width:${(o.i / o.queue.length) * 100}%"></span></div>`;
  if (o.i >= o.queue.length) {
    const body = `<div class="end ok"><p class="eyebrow">Sesi kartu</p><div class="end-score"><b>${o.done}</b><span>kartu diulang</span></div><ul class="end-stats"><li><b>${o.done ? Math.round((o.ok / o.done) * 100) : 0}%</b><span>ingat</span></li><li><b>+${S.xp.total - o.xp0}</b><span>XP</span></li></ul><p class="mute">Kartu yang kamu jawab “Lupa” akan muncul lagi lebih cepat.${o.done >= 10 ? '' : ' Ulang minimal 10 kartu dalam satu sesi untuk menjaga streak.'}</p></div>`;
    return ovShell({ title: 'Kartu', prog, body, foot: `<button class="btn primary big" data-act="ov-close" data-primary>Selesai</button>` });
  }
  const c = o.queue[o.i]; const dk = c.dek === 'kartuku' ? 'Kartuku' : DEK[c.dek].nama; const isNew = !S.kartu[c.id];
  const body = `<p class="q-count">${esc(dk)}${isNew ? ' · <span class="pill">baru</span>' : ''} · ${o.i + 1}/${o.queue.length}</p>
    <div class="flash${o.flip ? ' flip' : ''}"><p class="fl-w">${esc(c.depan)}</p>${o.flip ? `<div class="fl-back"><p class="fl-a">${esc(c.belakang)}</p>${c.contoh ? `<p class="fl-c">“${esc(c.contoh)}”</p>` : ''}</div>` : '<p class="fl-hint small mute">Ingat-ingat dulu jawabannya, baru buka.</p>'}</div>`;
  const foot = !o.flip ? `<button class="btn primary big" data-act="fc-flip" data-primary>Lihat jawaban</button>`
    : `<div class="rate4">${[[1, 'Lupa'], [2, 'Sulit'], [3, 'Bisa'], [4, 'Mudah']].map(([g, l]) => { const iv = nextInterval(c, g); return `<button type="button" class="r4 g${g}" data-act="fc-rate" data-g="${g}"><b>${l}</b><span>${iv === 0 ? 'lagi nanti' : iv + ' hari'}</span></button>`; }).join('')}</div>`;
  return ovShell({ title: 'Kartu', prog, body, foot, cls: 'fc' });
}
function fcRate(g) {
  const o = OV; const c = o.queue[o.i];
  rateCard(c, g); o.done += 1; if (g >= 3) o.ok += 1;
  if (g === 1 && !c.again) o.queue.splice(Math.min(o.queue.length, o.i + 4), 0, Object.assign({}, c, { again: true }));
  o.i += 1; o.flip = false;
  if (o.done >= 10 && !o.counted) { o.counted = true; markActive(); }
  save('state', 'log'); renderOv(false);
  if (o.i >= o.queue.length) flushToasts();
}

/* ======================= PERMAINAN HARIAN ======================= */
const kataHariIni = () => KATA[hash('kata|' + today()) % KATA.length];
const kelHariIni = () => KELOMPOK[hash('kel|' + today()) % KELOMPOK.length];
function polaHariIni() { const rnd = seeded(hash('pola|' + today())); return [1, 2, 3].map((d) => { const a = POLA.filter((p) => p.d === d); return a[Math.floor(rnd() * a.length)]; }); }
function rusakHariIni() { const rnd = seeded(hash('rusak|' + today())); return shuffle(RUSAK, rnd).slice(0, 5).map((it) => Object.assign({ flip: rnd() < 0.5 }, it)); }
function angkaHariIni() { const rnd = seeded(hash('angka|' + today())); return shuffle(ANGKA, rnd).slice(0, 5); }
function bossQ() { const pool = Object.values(QB).filter((q) => q.d === 3 && !q.ai).sort((a, b) => (a.id < b.id ? -1 : 1)); return pool[hash('boss|' + today()) % pool.length]; }
function evalGuess(g, a) {
  const res = Array(5).fill('x'); const cnt = {};
  for (let i = 0; i < 5; i++) { if (g[i] === a[i]) res[i] = 'g'; else cnt[a[i]] = (cnt[a[i]] || 0) + 1; }
  for (let i = 0; i < 5; i++) { if (res[i] === 'g') continue; if (cnt[g[i]] > 0) { res[i] = 'y'; cnt[g[i]] -= 1; } }
  return res;
}
function startGame(g) {
  stopTimer();
  OV = { kind: 'game', g, xp0: S.xp.total, msg: '' };
  if (g === 'kata') { OV.buf = ''; if (!gs('kata')) gsSet('kata', { g: [], done: false, win: false }); }
  if (g === 'kelompok') { if (!gs('kelompok')) gsSet('kelompok', { found: [], salah: 0, done: false, win: false, order: shuffle(kelHariIni().flatMap((x) => x.kata)) }); OV.sel = []; }
  if (g === 'pola' && !gs('pola')) gsSet('pola', { i: 0, ans: [], done: false });
  if (g === 'rusak' && !gs('rusak')) gsSet('rusak', { i: 0, benar: 0, pick: null, done: false });
  if (g === 'angka') { if (!gs('angka')) gsSet('angka', { i: 0, poin: [], last: null, done: false }); OV.t0 = Date.now(); }
  if (g === 'boss') { if (!gs('boss')) gsSet('boss', { done: false }); OV.cur = prepQ(bossQ()); OV.sel = null; OV.t0 = performance.now(); }
  if (g === 'sprint') OV.run = null;
  renderOv(false);
  if (g === 'angka' && !gs('angka').done && !gs('angka').last) angkaTimer();
}
function gameFinish(id, xp) {
  const st = gs(id); if (!st) return;
  st.done = true;
  if (!st.xp) { st.xp = 1; addXP(xp || 10); markActive(); }
  save('state', 'log'); flushToasts();
}
function rGame() {
  const o = OV; const meta = GAMES.find((x) => x.id === o.g);
  const R = { kata: rKata, kelompok: rKel, pola: rPola, sprint: rSprint, rusak: rRusak, angka: rAngka, boss: rBoss }[o.g];
  const r = R();
  return ovShell({ title: meta.nama, sub: tglPendek(today()), body: r.body, foot: r.foot, cls: 'game game-' + o.g, closeAct: 'game-tutup' });
}
/* --- Kata Hari Ini --- */
function rKata() {
  const o = OV; const st = gs('kata'); const K = kataHariIni(); const ans = K.w;
  const rank = { g: 3, y: 2, x: 1 }; const ks = {};
  st.g.forEach((g) => { const ev = evalGuess(g, ans); g.split('').forEach((ch, i) => { if (!ks[ch] || rank[ev[i]] > rank[ks[ch]]) ks[ch] = ev[i]; }); });
  let rows = '';
  for (let r = 0; r < 6; r++) {
    let cells;
    if (r < st.g.length) { const g = st.g[r]; const ev = evalGuess(g, ans); cells = g.split('').map((ch, i) => `<i class="t ${ev[i]}">${ch}</i>`).join(''); }
    else if (r === st.g.length && !st.done) cells = Array.from({ length: 5 }, (_, i) => `<i class="t${o.buf[i] ? ' typed' : ''}">${o.buf[i] || ''}</i>`).join('');
    else cells = '<i class="t"></i>'.repeat(5);
    rows += `<div class="wrow${r === st.g.length && o.shake ? ' shake' : ''}" role="row">${cells}</div>`;
  }
  const kb = [['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']];
  const keys = kb.map((row) => `<div class="krow">${row.map((k) => `<button type="button" class="key${k.length > 1 ? ' wide' : ''} ${ks[k] || ''}" data-act="kata-key" data-k="${k}" aria-label="${k === 'DEL' ? 'Hapus' : k === 'ENTER' ? 'Kirim' : k}">${k === 'DEL' ? '⌫' : k === 'ENTER' ? 'Kirim' : k}</button>`).join('')}</div>`).join('');
  let body = `<p class="g-how">Tebak kata bahasa Indonesia 5 huruf dalam 6 kali. <span class="lg g">hijau</span> = huruf & posisi tepat, <span class="lg y">kuning</span> = ada di kata tapi posisi lain.</p><div class="wgrid" role="grid" aria-label="Papan tebakan">${rows}</div>${o.msg ? `<p class="g-msg" role="status">${esc(o.msg)}</p>` : ''}`;
  let foot = '';
  if (st.done) {
    body += `<div class="g-result"><p class="hand big-ok">${st.win ? `Tertebak dalam ${st.g.length} kali!` : 'Belum tertebak hari ini.'}</p><p class="wd">${K.w}</p><p><b>Arti:</b> ${esc(K.arti)}</p><p class="mute">“${esc(K.contoh)}”</p></div>`;
    foot = `<button class="btn ghost" data-act="kata-salin">${icon('copy')} Salin hasil</button><button class="btn" data-act="kata-kartu">${icon('plus')} Simpan ke Kartuku</button><button class="btn primary" data-act="game-tutup" data-primary>Selesai</button>`;
  } else foot = `<div class="kbd">${keys}</div>`;
  return { body, foot };
}
function kataKey(k) {
  const o = OV; const st = gs('kata'); if (!st || st.done) return;
  o.shake = false; o.msg = '';
  if (k === 'ENTER') {
    if (o.buf.length < 5) { o.msg = 'Hurufnya kurang.'; o.shake = true; renderOv(); return; }
    const guess = o.buf; st.g.push(guess); o.buf = '';
    if (guess === kataHariIni().w) { st.win = true; award('kata'); gameFinish('kata', 15); }
    else if (st.g.length >= 6) gameFinish('kata', 5);
    else save();
  } else if (k === 'DEL') o.buf = o.buf.slice(0, -1);
  else if (/^[A-Z]$/.test(k) && o.buf.length < 5) o.buf += k;
  renderOv();
}
function kataShare() {
  const st = gs('kata'); const ans = kataHariIni().w;
  const grid = st.g.map((g) => evalGuess(g, ans).map((e) => (e === 'g' ? '🟩' : e === 'y' ? '🟨' : '⬜')).join('')).join('\n');
  return `Kata Hari Ini · Tangga ${tglPendek(today())}\n${st.win ? st.g.length : 'X'}/6\n${grid}`;
}
/* --- Kelompok --- */
const KEL_C = ['k1', 'k2', 'k3', 'k4'];
function rKel() {
  const o = OV; const st = gs('kelompok'); const P = kelHariIni();
  const foundWords = new Set(st.found.flatMap((gi) => P[gi].kata));
  const left = st.order.filter((w) => !foundWords.has(w));
  const rows = st.found.map((gi, j) => `<div class="kel-row ${KEL_C[j]}"><b>${esc(P[gi].nama)}</b><span>${P[gi].kata.join(' · ')}</span></div>`).join('');
  let body = `<p class="g-how">Kelompokkan 16 kata menjadi 4 kelompok berisi 4 kata yang punya kesamaan. Maksimal 4 kesalahan.</p>${rows}`;
  if (!st.done) body += `<div class="kel-grid${o.shake ? ' shake' : ''}">${left.map((w) => `<button type="button" class="kel-t${o.sel.includes(w) ? ' sel' : ''}${w.length > 10 ? ' long' : ''}" data-act="kel-pilih" data-w="${esc(w)}" aria-pressed="${o.sel.includes(w)}">${esc(w)}</button>`).join('')}</div>`;
  body += `<p class="kel-mis">Kesalahan: ${[0, 1, 2, 3].map((i) => `<i class="${i < st.salah ? 'on' : ''}"></i>`).join('')}</p>${o.msg ? `<p class="g-msg" role="status">${esc(o.msg)}</p>` : ''}`;
  if (st.done) body += `<div class="g-result"><p class="hand big-ok">${st.win ? 'Semua kelompok ketemu!' : 'Ini jawabannya. Coba lagi besok!'}</p></div>`;
  const foot = st.done ? `<button class="btn primary big" data-act="game-tutup" data-primary>Selesai</button>`
    : `<button class="btn ghost sm" data-act="kel-acak">${icon('shuffle')} Acak</button><button class="btn ghost sm" data-act="kel-hapus"${o.sel.length ? '' : ' disabled'}>Hapus pilihan</button><button class="btn primary" data-act="kel-kirim" data-primary${o.sel.length === 4 ? '' : ' disabled'}>Kirim</button>`;
  return { body, foot };
}
function kelKirim() {
  const o = OV; const st = gs('kelompok'); const P = kelHariIni(); if (o.sel.length !== 4) return;
  o.shake = false;
  const gi = P.findIndex((g) => !st.found.includes(g) && o.sel.every((w) => g.kata.includes(w)));
  if (gi >= 0) {
    st.found.push(gi); o.sel = []; o.msg = 'Benar: ' + P[gi].nama + '.';
    if (st.found.length === 4) { st.win = true; gameFinish('kelompok', 15); } else save();
  } else {
    const max = Math.max(...P.map((g, i) => (st.found.includes(i) ? 0 : o.sel.filter((w) => g.kata.includes(w)).length)));
    st.salah += 1; o.shake = true; o.msg = max === 3 ? 'Satu lagi! Tiga katamu sudah sekelompok.' : 'Belum tepat.';
    if (st.salah >= 4) { P.forEach((g, i) => { if (!st.found.includes(i)) st.found.push(i); }); o.sel = []; gameFinish('kelompok', 5); } else save();
  }
  renderOv();
}
/* --- Pola --- */
function rPola() {
  const st = gs('pola'); const list = polaHariIni();
  if (st.done) {
    const ok = st.ans.filter((a, i) => a === list[i].k).length;
    return { body: `<p class="g-how">Tiga deret: mudah, sedang, sulit.</p><div class="g-result"><p class="hand big-ok">${ok}/3 deret terpecahkan</p></div>${list.map((p, i) => `<div class="pola-rv ${st.ans[i] === p.k ? 'ok' : 'no'}"><p class="seq">${esc(p.seq.replace('...', p.o[p.k]))}</p><p class="small mute">${esc(p.b)}</p></div>`).join('')}`, foot: `<button class="btn primary big" data-act="game-tutup" data-primary>Selesai</button>` };
  }
  const p = list[st.i]; const answered = st.ans.length > st.i; const a = st.ans[st.i];
  const body = `<p class="g-how">Temukan polanya, lalu pilih bilangan/huruf berikutnya. Deret ${st.i + 1} dari 3 · ${['mudah', 'sedang', 'sulit'][st.i]}.</p>
    <p class="seq big">${esc(p.seq.replace('...', '?'))}</p>
    <div class="choices">${p.o.map((v, i) => `<button type="button" class="choice${answered && i === p.k ? ' right' : ''}${answered && i === a && a !== p.k ? ' wrong' : ''}" data-act="pola-pilih" data-i="${i}"${answered ? ' disabled' : ''}>${esc(v)}</button>`).join('')}</div>
    ${answered ? `<div class="fb ${a === p.k ? 'ok' : 'no'}"><p class="fb-t hand">${a === p.k ? 'Tepat!' : 'Belum tepat.'}</p><p class="fb-b">${esc(p.b)}</p></div>` : ''}`;
  return { body, foot: answered ? `<button class="btn primary big" data-act="pola-lanjut" data-primary>${st.i >= 2 ? 'Lihat hasil' : 'Deret berikutnya'}</button>` : '' };
}
/* --- Sprint Logika --- */
function rSprint() {
  const o = OV; const st = gs('sprint'); const r = o.run;
  if (!r) {
    return { body: `<div class="sp-intro"><p class="g-how">Kamu punya <b>60 detik</b>. Tiap kartu berisi pernyataan atau premis + kesimpulan. Jawab <b>Benar</b> jika pernyataannya benar / kesimpulannya sah menurut premis, <b>Salah</b> jika tidak.</p><p class="small mute">Ingat: logika menilai apakah kesimpulan <i>mengikuti</i> premis, bukan apakah itu fakta di dunia nyata.</p>${st ? `<p>Skor hari ini: <b>${st.skor}</b> · terbaik: <b>${st.best}</b></p>` : ''}</div>`,
      foot: `<button class="btn primary big" data-act="sp-mulai" data-primary>${st ? 'Main lagi (latihan)' : 'Mulai 60 detik'}</button>` };
  }
  if (r.end) {
    return { body: `<div class="g-result"><p class="hand big-ok">${r.ok} benar · ${r.no} salah</p><p class="mute">Terbaik hari ini: ${st ? st.best : r.ok}</p></div>${r.miss.length ? `<h4>Yang terlewat</h4>${r.miss.slice(0, 6).map((it) => `<div class="sp-rv"><p>${fmt(it.p)}</p><p class="small"><b>${it.k ? 'Benar' : 'Salah'}.</b> ${esc(it.b)}</p></div>`).join('')}` : '<p>Sempurna! Tidak ada yang salah.</p>'}`,
      foot: `<button class="btn ghost" data-act="sp-mulai">Main lagi</button><button class="btn primary big" data-act="game-tutup" data-primary>Selesai</button>` };
  }
  const it = r.items[r.i % r.items.length]; const left = Math.max(0, 60 - (Date.now() - r.t0) / 1000);
  return { body: `<div class="sp-bar"><span id="sp-bar" style="width:${(left / 60) * 100}%"></span></div><p class="sp-score"><span>${r.ok} benar</span><b id="sp-left">${Math.ceil(left)}</b><span>${r.no} salah</span></p>
    <div class="sp-card ${r.flash || ''}">${fmt(it.p)}</div>`,
  foot: `<div class="sp-btns"><button type="button" class="btn sp-no" data-act="sp-jawab" data-v="0">${icon('x')} Salah</button><button type="button" class="btn sp-yes" data-act="sp-jawab" data-v="1">${icon('check')} Benar</button></div>` };
}
function sprintStart() {
  OV.round = (OV.round || 0) + 1;
  const rnd = seeded(hash('sprint|' + today()) + OV.round);
  OV.run = { t0: Date.now(), items: shuffle(SPRINT, rnd), i: 0, ok: 0, no: 0, miss: [], flash: null, end: false };
  stopTimer();
  TIMER = setInterval(() => {
    const r = OV && OV.run; if (!r || r.end) { stopTimer(); return; }
    const left = 60 - (Date.now() - r.t0) / 1000;
    const b = $('#sp-bar'); if (b) b.style.width = Math.max(0, (left / 60) * 100) + '%';
    const tt = $('#sp-left'); if (tt) tt.textContent = Math.max(0, Math.ceil(left));
    if (left <= 0) sprintEnd();
  }, 100);
  renderOv(false);
}
function sprintAns(v) {
  const r = OV.run; if (!r || r.end) return;
  const it = r.items[r.i % r.items.length];
  if (v === it.k) { r.ok += 1; r.flash = 'ok'; } else { r.no += 1; r.flash = 'no'; r.miss.push(it); }
  r.i += 1; renderOv();
}
function sprintEnd() {
  stopTimer(); const r = OV.run; r.end = true;
  let st = gs('sprint');
  if (!st) { st = { done: false, skor: r.ok, best: r.ok }; gsSet('sprint', st); }
  st.best = Math.max(st.best || 0, r.ok);
  gameFinish('sprint', 10); renderOv(false);
}
/* --- Benar atau Rusak? --- */
function rRusak() {
  const st = gs('rusak'); const list = rusakHariIni();
  if (st.done) return { body: `<div class="g-result"><p class="hand big-ok">${st.benar}/5 tepat</p><p class="mute">Kata baku dan kalimat efektif adalah poin cepat di subtes PBM.</p></div>`, foot: `<button class="btn primary big" data-act="game-tutup" data-primary>Selesai</button>` };
  const it = list[st.i]; const opts = it.flip ? [it.r, it.a] : [it.a, it.r]; const correct = it.flip ? 1 : 0; const answered = st.pick != null;
  const body = `<p class="g-how">Mana yang benar? Ronde ${st.i + 1} dari 5.</p>
    <div class="rusak">${opts.map((t, i) => `<button type="button" class="rk${answered && i === correct ? ' right' : ''}${answered && i === st.pick && i !== correct ? ' wrong' : ''}" data-act="rusak-pilih" data-i="${i}"${answered ? ' disabled' : ''}>${esc(t)}</button>`).join('')}</div>
    ${answered ? `<div class="fb ${st.pick === correct ? 'ok' : 'no'}"><p class="fb-t hand">${st.pick === correct ? 'Tepat!' : 'Itu yang rusak.'}</p><p class="fb-b">${esc(it.b)}</p></div>` : ''}`;
  return { body, foot: answered ? `<button class="btn primary big" data-act="rusak-lanjut" data-primary>${st.i >= 4 ? 'Lihat hasil' : 'Ronde berikutnya'}</button>` : '' };
}
/* --- Tebak Angka --- */
const AG_SEC = 20;
function parseNum(s) {
  s = String(s || '').trim().replace(/\s/g, '').replace(/^rp/i, '');
  if (!s) return NaN;
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
  return Number(s);
}
function rAngka() {
  const o = OV; const st = gs('angka'); const list = angkaHariIni();
  if (st.done) {
    const tot = st.poin.reduce((a, b) => a + b, 0);
    return { body: `<div class="g-result"><p class="hand big-ok">${tot} poin</p><p class="mute">dari 500 · ${st.poin.map((p) => p).join(' · ')}</p></div>${list.map((it) => `<div class="pola-rv"><p><b>${esc(it.q)}</b> = ${num(it.v, it.v % 1 ? 2 : 0)}</p><p class="small mute">${esc(it.trik)}</p></div>`).join('')}`, foot: `<button class="btn primary big" data-act="game-tutup" data-primary>Selesai</button>` };
  }
  const it = list[st.i];
  if (st.last) {
    const L = st.last;
    return { body: `<p class="g-how">Ronde ${st.i + 1} dari 5</p><p class="ag-q">${esc(it.q)}</p><div class="fb ${L.p >= 70 ? 'ok' : 'no'}"><p class="fb-t hand">${L.p} poin</p><p>Tebakanmu: <b>${isNaN(L.v) ? '—' : num(L.v, L.v % 1 ? 2 : 0)}</b> · tepatnya <b>${num(it.v, it.v % 1 ? 2 : 0)}</b></p><p class="fb-b">${esc(it.trik)}</p></div>`,
      foot: `<button class="btn primary big" data-act="ag-lanjut" data-primary>${st.i >= 4 ? 'Lihat hasil' : 'Ronde berikutnya'}</button>` };
  }
  const left = Math.max(0, AG_SEC - Math.floor((Date.now() - (o.t0 || Date.now())) / 1000));
  return { body: `<p class="g-how">Tebak secepat mungkin, tidak harus tepat. Selisih 1% = 96 poin, selisih 25% = 0. Ronde ${st.i + 1} dari 5.</p>
    <div class="sp-bar"><span id="ag-bar" style="width:${(left / AG_SEC) * 100}%"></span></div>
    <p class="ag-q">${esc(it.q)}</p><label class="sr" for="ag-in">Tebakanmu</label><input id="ag-in" class="big-in" inputmode="decimal" autocomplete="off" placeholder="Tebakanmu">`,
  foot: `<button class="btn primary big" data-act="ag-tebak" data-primary>Tebak</button>` };
}
function angkaTimer() {
  stopTimer();
  TIMER = setInterval(() => {
    if (!OV || OV.kind !== 'game' || OV.g !== 'angka') { stopTimer(); return; }
    const st = gs('angka'); if (!st || st.done || st.last) { stopTimer(); return; }
    const left = AG_SEC - (Date.now() - OV.t0) / 1000;
    const b = $('#ag-bar'); if (b) b.style.width = Math.max(0, (left / AG_SEC) * 100) + '%';
    if (left <= 0) angkaTebak(true);
  }, 100);
}
function angkaTebak(timeout) {
  const st = gs('angka'); if (!st || st.done || st.last) return;
  stopTimer();
  const it = angkaHariIni()[st.i]; const el = $('#ag-in'); const v = parseNum(el ? el.value : '');
  const p = isNaN(v) ? 0 : Math.round(clamp(100 - (400 * Math.abs(v - it.v)) / Math.abs(it.v), 0, 100));
  st.poin.push(p); st.last = { v, p, timeout: !!timeout }; save(); renderOv(false);
}
/* --- Boss Soal --- */
function rBoss() {
  const o = OV; const st = gs('boss'); const cur = o.cur; const q = cur.q;
  if (st.done) {
    const sel = st.sel != null ? cur.perm.indexOf(st.sel) : null;
    return { body: `<p class="g-how">${subChip(q.s)} Satu soal tingkat sulit setiap hari.</p>${qBlock(cur, { sel, chk: true, act: 'noop' })}<div class="fb ${st.y ? 'ok' : 'no'}"><p class="fb-t hand">${st.y ? 'Boss dikalahkan!' : 'Boss menang hari ini.'}</p><p class="fb-b">${fmt(q.b)}</p></div>`, foot: `<button class="btn primary big" data-act="game-tutup" data-primary>Selesai</button>` };
  }
  return { body: `<p class="g-how">${subChip(q.s)} Satu soal tingkat sulit. Tanpa petunjuk, satu kesempatan. Menang = +20 XP.</p>${qBlock(cur, { sel: o.sel, chk: false, act: 'boss-pilih' })}`,
    foot: `<button class="btn primary big" data-act="boss-cek" data-primary${o.sel == null ? ' disabled' : ''}>Kunci jawaban</button>` };
}
function bossCek() {
  const o = OV; const st = gs('boss'); if (st.done || o.sel == null) return;
  const q = o.cur.q; const orig = o.cur.perm[o.sel]; const y = orig === q.k;
  record(q, y, performance.now() - o.t0, 'game');
  st.y = y; st.sel = orig;
  gameFinish('boss', y ? 20 : 8); renderOv();
}
