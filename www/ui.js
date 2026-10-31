'use strict';
/* =====================================================================
   Tangga — ikon, komponen, dan lima halaman utama
   ===================================================================== */

const IC = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10"/><path d="M10 20v-5h4v5"/>',
  stairs: '<path d="M3 20h4.5v-4.5H12V11h4.5V6.5H21"/>',
  pencil: '<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/>',
  cards: '<rect x="3.5" y="7" width="13" height="13" rx="2"/><path d="M7.5 4h11a2 2 0 0 1 2 2v11"/>',
  chart: '<path d="M4 4v16h16"/><path d="M7.5 15l4-4.5 3 3L20 7"/>',
  flame: '<path d="M12 3c.6 3.2 4.8 4.9 4.8 10a4.8 4.8 0 0 1-9.6 0c0-2.2.9-3.6 2-4.7.1 1.8.9 2.9 2.1 3.2-.5-3.4-.3-5.7.7-8.5z"/>',
  snow: '<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9"/><path d="M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5"/>',
  gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M5.5 18.5l1.8-1.8M16.7 7.3l1.8-1.8"/>',
  chat: '<path d="M4 5.5h16v11H10l-5 4v-4H4z"/>',
  camera: '<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8.5 7l1.5-2.5h4L15.5 7"/>',
  lock: '<rect x="5" y="11" width="14" height="9.5" rx="2"/><path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"/>',
  spark: '<path d="M11 3l1.7 4.8L17.5 9.5l-4.8 1.7L11 16l-1.7-4.8L4.5 9.5l4.8-1.7z"/><path d="M18.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  trophy: '<path d="M8 4h8v5.5a4 4 0 0 1-8 0z"/><path d="M8 6H5.5a2.5 2.5 0 0 0 2.6 4M16 6h2.5a2.5 2.5 0 0 1-2.6 4"/><path d="M12 13.5V17M8.5 20.5h7M9.5 17h5"/>',
  book: '<path d="M4 5h6a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4z"/><path d="M20 5h-6a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6z"/>',
  refresh: '<path d="M19.5 11A7.5 7.5 0 1 0 17.3 16.3"/><path d="M20 4.5V11h-6.5"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  bulb: '<path d="M9 17.5h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3z"/>',
  flag: '<path d="M5.5 21V4M5.5 4.5h11l-2 4 2 4h-11"/>',
  send: '<path d="M4 12l16-7.5-5.5 15-2.5-6z"/>',
  copy: '<rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2"/><path d="M15.5 8.5V5.5a1.5 1.5 0 0 0-1.5-1.5H5.5A1.5 1.5 0 0 0 4 5.5V14a1.5 1.5 0 0 0 1.5 1.5h3"/>',
  stop: '<rect x="6.5" y="6.5" width="11" height="11" rx="2"/>',
  shuffle: '<path d="M3 7h3.5l10 10H21M3 17h3.5l3-3M14 10l2.5-3H21"/><path d="M18.5 4.5 21 7l-2.5 2.5M18.5 14.5 21 17l-2.5 2.5"/>',
  down: '<path d="M12 4v16M6 14l6 6 6-6"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  trash: '<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>',
  download: '<path d="M12 4v11M7 10.5l5 5 5-5"/><path d="M4.5 16v3.5h15V16"/>',
  upload: '<path d="M12 15.5V4.5M7 9l5-5 5 5"/><path d="M4.5 16v3.5h15V16"/>',
  phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
};
const icon = (n, cls) => `<svg class="ic${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" aria-hidden="true">${IC[n] || ''}</svg>`;
const LOGO = '<svg class="logo" viewBox="0 0 32 32" aria-hidden="true"><path class="logo-hl" d="M18 6.5h10v6H18z"/><path class="logo-st" d="M3 28h7v-7h7v-7h7V7h5"/></svg>';
const GAYA = { analogi: 'Analogi', langkah: 'Langkah demi langkah', cerita: 'Cerita nyata', singkat: 'Singkat & langsung' };
const GAYA_KET = {
  analogi: 'Konsep dijelaskan lewat perumpamaan sehari-hari.',
  langkah: 'Urutan langkah bernomor, rapi seperti resep.',
  cerita: 'Contoh dari kehidupan siswa SMA.',
  singkat: 'Inti dan rumusnya saja, langsung latihan.',
};
const firstName = () => ((S.profil.nama || '').trim().split(/\s+/)[0] || 'kamu');
const pct = (x) => (x == null ? '—' : Math.round(x * 100) + '%');

const UI = { tab: 'beranda', peta: null, latSub: null, resetArm: false, salahOpen: null };

/* ---------- komponen kecil ---------- */
const subChip = (s) => { const x = subOf(s); return `<span class="sub-chip" style="--h:${x.hue}">${x.kode}</span>`; };
const meterHTML = (L) => `<span class="meter" aria-hidden="true">${[1, 2, 3, 4].map((i) => `<i class="${L >= i ? 'on' : ''}"></i>`).join('')}</span>`;
const dotsView = (v) => `<span class="dots" role="img" aria-label="${v} dari 5">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= v ? 'on' : ''}"></i>`).join('')}</span>`;
function rateButtons(s, v, act) {
  return `<span class="rate" role="radiogroup" aria-label="Penilaian diri ${esc(subOf(s).nama)}">${[1, 2, 3, 4, 5].map((i) => `<button type="button" role="radio" aria-checked="${v === i}" class="rd${i <= v ? ' on' : ''}" data-act="${act || 'rate'}" data-s="${s}" data-v="${i}">${i}</button>`).join('')}</span>`;
}
function sparkSelf(s) {
  const vals = S.self.map((e) => e.r[s]).filter(Boolean).slice(-6);
  if (vals.length < 2) return '';
  const W = 46, H = 18; const X = (i) => 2 + (i / (vals.length - 1)) * (W - 4); const Y = (v) => H - 2 - ((v - 1) / 4) * (H - 4);
  const d = vals.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join('');
  return `<svg class="spark" viewBox="0 0 ${W} ${H}" aria-hidden="true"><path d="${d}"/><circle cx="${X(vals.length - 1).toFixed(1)}" cy="${Y(vals[vals.length - 1]).toFixed(1)}" r="2"/></svg>`;
}

/* ---------- permainan harian: metadata ---------- */
const GAMES = [
  { id: 'kata', nama: 'Kata Hari Ini', ket: 'Tebak kata 5 huruf', s: 'ppu' },
  { id: 'kelompok', nama: 'Kelompok', ket: '16 kata, 4 kelompok', s: 'ppu' },
  { id: 'pola', nama: 'Pola', ket: 'Lanjutkan deretnya', s: 'pu' },
  { id: 'sprint', nama: 'Sprint Logika', ket: '60 detik benar/salah', s: 'pu' },
  { id: 'rusak', nama: 'Benar atau Rusak?', ket: 'Kata baku & kalimat', s: 'pbm' },
  { id: 'angka', nama: 'Tebak Angka', ket: 'Estimasi kilat', s: 'pk' },
  { id: 'boss', nama: 'Boss Soal', ket: 'Satu soal sulit', s: 'pm' },
];
function gs(id) { const t = today(); if (!S.games[t]) S.games[t] = {}; return S.games[t][id] || null; }
function gsSet(id, v) { const t = today(); if (!S.games[t]) S.games[t] = {}; S.games[t][id] = v; }
const gameDone = (id) => !!(S.games[today()] && S.games[today()][id] && S.games[today()][id].done);
function gameGlyph(id) {
  if (id === 'kata') return '<span class="gg kata" aria-hidden="true"><i class="g"></i><i></i><i class="y"></i><i class="g"></i><i></i></span>';
  if (id === 'kelompok') return '<span class="gg kel" aria-hidden="true"><i></i><i></i><i></i><i></i></span>';
  const t = { pola: '2·6·12·?', sprint: '60″', rusak: '✓ ✗', angka: '≈', boss: '★' }[id];
  return `<span class="gg txt" aria-hidden="true">${t}</span>`;
}
function gameTile(g) {
  const done = gameDone(g.id);
  return `<button class="game-tile${done ? ' done' : ''}" data-act="game" data-g="${g.id}" style="--h:${subOf(g.s).hue}">${gameGlyph(g.id)}<span class="gt-n">${g.nama}</span><span class="gt-k">${done ? 'Selesai hari ini' : g.ket}</span>${done ? `<span class="gt-ok">${icon('check')}</span>` : ''}</button>`;
}

/* ---------- bilah atas & navigasi ---------- */
const TABS = [['beranda', 'Beranda', 'home'], ['peta', 'Peta', 'stairs'], ['latihan', 'Latihan', 'pencil'], ['kartu', 'Kartu', 'cards'], ['kemajuan', 'Kemajuan', 'chart']];
function renderTop() {
  const el = $('#top');
  if (!S.onboarded) { el.innerHTML = ''; return; }
  const st = S.streak; const done = st.last === today();
  const xp = xpToday(); const goal = S.set.targetXP; const p = clamp(xp / goal, 0, 1);
  const R = 14, C = 2 * Math.PI * R;
  el.innerHTML = `
    <button class="brand" data-act="tab" data-tab="beranda" aria-label="Tangga — ke Beranda">${LOGO}<span class="wm">tangga</span>${S.demo ? '<span class="demo-tag">demo</span>' : ''}</button>
    <div class="top-r">
      <span class="tpill${done ? ' lit' : ''}" title="Streak ${st.n} hari">${icon('flame')}<b>${st.n}</b></span>
      <span class="ring${p >= 1 ? ' full' : ''}" role="img" aria-label="XP hari ini ${xp} dari ${goal}" title="Target harian: ${xp}/${goal} XP"><svg viewBox="0 0 34 34" aria-hidden="true"><circle cx="17" cy="17" r="${R}" class="ring-bg"/><circle cx="17" cy="17" r="${R}" class="ring-fg" stroke-dasharray="${(C * p).toFixed(1)} ${C.toFixed(1)}"/></svg><b>${xp}</b></span>
      ${AI.ok ? `<button class="kt-btn" data-act="chat" aria-label="Tanya Kak Tangga" title="Tanya Kak Tangga">${icon('spark')}<span>Tanya</span></button>` : ''}
    </div>`;
}
function renderNav() {
  const el = $('#nav');
  if (!S.onboarded) { el.innerHTML = ''; return; }
  const cq = cardQueue(); const nk = cq.due.length;
  el.innerHTML = TABS.map(([id, nm, ic]) => `<button class="nav-b${UI.tab === id ? ' on' : ''}" data-act="tab" data-tab="${id}" aria-current="${UI.tab === id ? 'page' : 'false'}">${icon(ic)}<span>${nm}</span>${id === 'kartu' && nk ? `<em class="nb">${nk}</em>` : ''}${id === 'latihan' && dueList().length ? '<em class="nb dot"></em>' : ''}</button>`).join('');
}
function renderMain() {
  const el = $('#main');
  if (!S.onboarded) { el.innerHTML = ''; return; }
  const v = { beranda: vBeranda, peta: vPeta, latihan: vLatihan, kartu: vKartu, kemajuan: vKemajuan }[UI.tab] || vBeranda;
  el.innerHTML = `<div class="page page-${UI.tab}">${v()}</div>`;
}

/* ======================= BERANDA ======================= */
function vBeranda() {
  const t = today(); const st = S.streak; const P = S.profil;
  const pt = prediksiTotal(); const gap = P.target - pt.skor; const dl = diffDays(t, P.utbk);
  const focus = TANGGA[S.fokus] ? S.fokus : 'pk';
  const nid = nextAtom(focus); const due = dueList(); const cq = cardQueue();
  const gdone = GAMES.filter((g) => gameDone(g.id)).length;
  let h = `<section class="hello"><p class="eyebrow">${tglPanjang(t)}</p><h1>${salam()}, ${esc(firstName())}.</h1></section>`;
  if (S.demo) h += `<div class="banner">${icon('eye')}<p>Kamu sedang melihat <b>mode demo</b> dengan data contoh “Rina”.</p><button class="btn sm" data-act="keluar-demo">Mulai sebagai diriku</button></div>`;
  if (st.putus && st.putus.hari === t) {
    h += `<section class="card repair"><p class="eyebrow">${icon('flame')} Streak putus kemarin</p><h3>Pulihkan streak ${st.putus.n} hari</h3><p>Ambil <b>Tantangan Comeback</b>: 5 soal, minimal 4 benar. Hanya berlaku hari ini.</p><button class="btn primary" data-act="comeback">Ambil tantangan</button></section>`;
  }
  h += streakCard();
  h += nextCard(focus, nid);
  h += pengingatCard();
  if (due.length) h += `<button class="card row-card" data-act="ulasan">${icon('refresh')}<span><b>Ulasan hari ini</b><small>${due.length} anak tangga perlu dicek ulang supaya naik ke level Kuasai</small></span>${icon('arrow')}</button>`;
  h += scoreCard(pt, gap, dl);
  h += focusCard();
  h += `<section class="sec"><div class="sec-h"><h2>Tantangan harian</h2><span class="mute">${gdone}/${GAMES.length} selesai</span></div><div class="games">${GAMES.map(gameTile).join('')}</div><p class="small mute">Satu permainan cukup untuk menjaga streak. Teka-tekinya sama untuk semua orang dan berganti tiap hari.</p></section>`;
  h += `<button class="card row-card" data-act="tab" data-tab="kartu">${icon('cards')}<span><b>Kartu</b><small>${cq.due.length} perlu diulang · ${cq.fresh.length} kartu baru tersedia</small></span>${icon('arrow')}</button>`;
  if (backupStale()) h += `<button class="card row-card" data-act="cadangkan">${icon('download')}<span><b>Cadangkan progresmu</b><small>${S.cadangan ? `Cadangan terakhir ${tglPendek(S.cadangan)}` : 'Belum pernah dicadangkan'} — progres hanya tersimpan di browser ini</small></span>${icon('arrow')}</button>`;
  h += installCard();
  return h;
}
function streakCard() {
  const t = today(), st = S.streak; const d = parseKey(t); const dow = (d.getDay() + 6) % 7; const mon = addDays(t, -dow);
  const nm = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const cells = nm.map((n, i) => {
    const k = addDays(mon, i);
    const cls = st.aktif.includes(k) ? 'on' : st.beku.includes(k) ? 'beku' : k === t ? 'today' : k > t ? 'next' : 'off';
    return `<li class="${cls}"><span>${n}</span><i>${cls === 'on' ? icon('check') : cls === 'beku' ? icon('snow') : ''}</i></li>`;
  }).join('');
  const done = st.last === t;
  return `<section class="card streak-card${done ? ' done' : ''}">
    <div class="sk-main">
      <span class="flame-big" aria-hidden="true">${icon('flame')}</span>
      <div class="sk-num"><span class="big-num">${st.n}</span><span class="lbl">hari beruntun</span></div>
      <div class="sk-side"><span class="pill" title="Pembeku streak menyelamatkan satu hari yang terlewat">${icon('snow')} ${st.freeze}/2 pembeku</span><span class="small mute">Rekor ${st.best} hari</span></div>
    </div>
    <ol class="week" aria-label="Minggu ini">${cells}</ol>
    <p class="sk-msg">${done ? '<span class="hand">Streak hari ini aman!</span> Pembeku baru didapat setiap 7 hari beruntun.' : 'Selesaikan <b>satu sesi apa pun</b> hari ini — anak tangga, permainan, latihan, ulasan, atau 10 kartu.'}</p>
  </section>`;
}
function miniStairs(key, cur) {
  const ids = TANGGA[key].atoms; const n = ids.length;
  return `<span class="mini-st" aria-hidden="true">${ids.map((id, i) => `<i class="lv${lvl(id)}${id === cur ? ' cur' : ''}" style="height:${(7 + i * (26 / Math.max(1, n - 1))).toFixed(1)}px"></i>`).join('')}</span>`;
}
function nextCard(key, nid) {
  const tg = TANGGA[key]; const x = subOf(tg.kustom ? tg.s : key);
  if (!nid) {
    const allDone = tg.atoms.every((id) => lvl(id) >= 3);
    return `<section class="card next-card" style="--h:${x.hue}"><div class="nc-top"><p class="eyebrow">${x.kode} · ${esc(tg.judul)}</p>${miniStairs(key, null)}</div>
      <h2>${allDone ? 'Tangga ini sudah kamu daki sampai puncak.' : 'Anak tangga berikutnya masih terkunci.'}</h2>
      <p class="mute">${allDone ? 'Teruskan ulasan agar semuanya naik ke Kuasai, atau pilih tangga lain.' : 'Buka Peta untuk melihat anak tangga mana yang perlu dikuatkan.'}</p>
      <button class="btn primary big" data-act="tab" data-tab="peta">Buka Peta ${icon('arrow')}</button></section>`;
  }
  const i = tg.atoms.indexOf(nid); const a = ATOM[nid]; const needAI = !lessonOf(nid);
  return `<section class="card next-card" style="--h:${x.hue}">
    <div class="nc-top"><p class="eyebrow">Lanjut belajar · ${x.kode}</p>${miniStairs(key, nid)}</div>
    <h2>${esc(a.judul)}</h2>
    <p class="mute">Anak tangga ${i + 1} dari ${tg.atoms.length} · ${esc(tg.judul)}${needAI ? ' · disusun Kak Tangga' : ''}</p>
    <button class="btn primary big" data-act="belajar" data-id="${nid}">${lvl(nid) ? 'Lanjutkan' : 'Mulai'} anak tangga ${i + 1} ${icon('arrow')}</button>
  </section>`;
}
function scoreCard(pt, gap, dl) {
  const P = S.profil; const lo = 200, hi = 900; const pos = (v) => clamp(((v - lo) / (hi - lo)) * 100, 0, 100);
  const yr = parseKey(P.utbk).getFullYear(); const tgt = [P.prodi, P.ptn].filter(Boolean).join(' · ');
  return `<section class="card score-card">
    <div class="sc-row">
      <div><p class="eyebrow">Perkiraan skor rata-rata</p><p class="big-num">${pt.skor}<small> ±${pt.rentang}</small></p></div>
      <div class="sc-gap"><p class="eyebrow">Target ${P.target}</p><p class="${gap > 0 ? 'neg' : 'pos'}">${gap > 0 ? 'kurang ' + gap : 'di atas target'}</p></div>
    </div>
    <div class="track" aria-hidden="true"><span class="band" style="left:${pos(pt.skor - pt.rentang).toFixed(1)}%;width:${(pos(pt.skor + pt.rentang) - pos(pt.skor - pt.rentang)).toFixed(1)}%"></span><span class="dot" style="left:${pos(pt.skor).toFixed(1)}%"></span><span class="tgt" style="left:${pos(P.target).toFixed(1)}%"></span></div>
    <div class="track-l small mute" aria-hidden="true"><span>200</span><span>900</span></div>
    <p class="small mute">${dl > 0 ? `<b>D-${dl}</b> menuju UTBK ${yr} (perkiraan ${tglPendek(P.utbk)}). ` : ''}${tgt ? `Target: ${esc(tgt)}. ` : ''}Rentang menyempit seiring makin banyak soal yang kamu kerjakan.</p>
  </section>`;
}
function focusCard() {
  const rated = SUBTES.filter((x) => selfOf(x.id));
  const last = S.self[S.self.length - 1]; const stale = !last || diffDays(last.d, today()) >= 7;
  if (!rated.length) return `<section class="card focus-card"><h3>Pelacak subtes</h3><p>Nilai dirimu di 7 subtes supaya tahu mana yang perlu ditingkatkan.</p><button class="btn" data-act="cekdiri">Nilai diriku</button></section>`;
  const low = rated.slice().sort((a, b) => selfOf(a.id) - selfOf(b.id) || prediksi(a.id).skor - prediksi(b.id).skor).slice(0, 2);
  return `<section class="card focus-card">
    <div class="sec-h"><h3>Pelacak subtes</h3><button class="link" data-act="tab" data-tab="kemajuan">Lihat semua</button></div>
    <p class="small mute">Menurut penilaianmu sendiri, yang paling perlu ditingkatkan:</p>
    <div class="focus-list">${low.map((x) => `<button class="focus-item" data-act="peta" data-k="${x.id}" style="--h:${x.hue}">${subChip(x.id)}<span class="fi-n">${esc(x.nama)}</span>${dotsView(selfOf(x.id))}</button>`).join('')}</div>
    ${stale ? `<button class="btn ghost sm" data-act="cekdiri">${icon('calendar')} Cek diri mingguan</button>` : `<p class="small mute">Terakhir dinilai ${tglPendek(last.d)}. Nilai ulang seminggu sekali.</p>`}
  </section>`;
}

/* ======================= PETA (tangga) ======================= */
function vPeta() {
  const key = UI.peta && TANGGA[UI.peta] ? UI.peta : TANGGA[S.fokus] ? S.fokus : 'pk';
  UI.peta = key;
  const tg = TANGGA[key]; const isSub = !!SUB[key]; const x = subOf(tg.kustom ? tg.s : key);
  const chips = SUBTES.map((s) => `<button class="tchip${s.id === key ? ' on' : ''}" data-act="peta" data-k="${s.id}" style="--h:${s.hue}" aria-pressed="${s.id === key}">${s.kode}</button>`).join('')
    + S.kustom.map((k) => `<button class="tchip${k.id === key ? ' on' : ''}" data-act="peta" data-k="${k.id}" style="--h:${subOf(k.s).hue}" aria-pressed="${k.id === key}">${icon('spark')}${esc(k.judul.length > 18 ? k.judul.slice(0, 17) + '…' : k.judul)}</button>`).join('')
    + (AI.ok ? `<button class="tchip add" data-act="tangga-baru">${icon('plus')} Tangga baru</button>` : '');
  const ids = tg.atoms; const n = ids.length; const nid = nextAtom(key);
  const m = mastery(key); const pr = isSub ? prediksi(key) : null; const sr = isSub ? selfOf(key) : 0;
  const authored = ids.some((id) => ATOM[id].L);
  const started = ids.some((id) => lvl(id) > 0);
  const dx = n > 1 ? 30 / (n - 1) : 0;
  const steps = ids.map((id, i) => stepHTML(id, i, dx, nid)).reverse().join('');
  const hasQ = ids.some((id) => qsOf(id).l.length || qsOf(id).u.length);
  let h = `<div class="tchips" role="toolbar" aria-label="Pilih tangga">${chips}</div>
  <section class="peta-h" style="--h:${x.hue}">
    <p class="eyebrow">${tg.kustom ? 'Tangga buatan Kak Tangga' : `${x.komponen} · ${x.soal} soal · ${String(x.menit).replace('.', ',')} menit di UTBK`}</p>
    <h1>${esc(tg.kustom ? tg.judul : x.nama)}</h1>
    <p class="mute">${esc(tg.kustom ? subOf(tg.s).nama : tg.judul)}</p>
    <div class="ph-stats">
      <div><b>${Math.round(m * 100)}%</b><span>penguasaan</span></div>
      ${pr ? `<div><b>${pr.skor}</b><span>perkiraan skor</span></div>` : ''}
      ${isSub ? `<div>${sr ? dotsView(sr) : '<b>—</b>'}<span>penilaian diri</span></div>` : ''}
    </div>
  </section>
  <div class="stairs-wrap">
    <p class="summit">${icon('flag')} Puncak</p>
    <ol class="stairs">${steps}</ol>
    <p class="floor">Lantai — mulai dari sini</p>
  </div>
  <div class="peta-act">`;
  if (authored && !started) h += `<button class="card row-card" data-act="tempat" data-k="${key}">${icon('target')}<span><b>Sudah paham sebagian?</b><small>Tes penempatan (maks. 6 soal) mencari “lantai”-mu, supaya tidak mengulang yang sudah bisa.</small></span>${icon('arrow')}</button>`;
  if (hasQ) h += `<button class="card row-card" data-act="drill" data-s="${tg.kustom ? tg.s : key}">${icon('pencil')}<span><b>Latihan campuran</b><small>Soal dari anak tangga yang sudah kamu buka, dicampur acak.</small></span>${icon('arrow')}</button>`;
  if (!authored) h += `<p class="note">${icon('spark')} Materi tangga ini disusun <b>Kak Tangga (AI)</b> saat anak tangganya kamu buka, lalu disimpan. Materi AI belum diverifikasi guru — laporkan jika ada yang keliru.</p>`;
  if (tg.kustom) h += `<button class="btn ghost sm danger" data-act="hapus-tangga" data-k="${key}">${icon('trash')} ${UI.hapusArm === key ? 'Ketuk lagi untuk menghapus' : 'Hapus tangga ini'}</button>`;
  h += `<p class="small mute legend"><b>Level:</b> Belajar → Kenal (3 dari 4 latihan benar) → <b>Cakap</b> (lolos “Buktikan”, membuka anak tangga berikutnya) → Kuasai (lolos ulasan sehari dan seminggu kemudian).</p></div>`;
  return h;
}
function stepHTML(id, i, dx, nid) {
  const a = ATOM[id]; const L = lvl(id); const open = isOpen(id); const r = S.atom[id];
  const due = r && r.lvl >= 3 && r.due && r.due <= today(); const cur = id === nid;
  return `<li class="step lv${L}${open ? '' : ' locked'}${cur ? ' cur' : ''}" style="margin-left:${(i * dx).toFixed(2)}%">
    <button class="step-b" data-act="atom" data-id="${id}">
      <span class="st-n">${i + 1}</span>
      <span class="st-body"><span class="st-t">${esc(a.judul)}</span><span class="st-l">${open ? LEVEL[L] : 'Terkunci'}${due ? ' · ulasan hari ini' : ''}${!a.L ? ' · AI' : ''}</span></span>
      ${open ? meterHTML(L) : icon('lock')}
    </button>
    ${cur ? '<span class="here" aria-hidden="true">kamu di sini</span>' : ''}
  </li>`;
}
function shAtom(id) {
  const a = ATOM[id]; const L = lvl(id); const open = isOpen(id); const r = S.atom[id] || {};
  const x = subOf(a.s); const key = tanggaOf(id); const i = TANGGA[key].atoms.indexOf(id);
  const due = r.lvl >= 3 && r.due && r.due <= today();
  const pra = a.pra.map((p) => `<li><span>${esc(ATOM[p].judul)}</span><span class="lvl-pill lv${lvl(p)}">${LEVEL[lvl(p)]}</span></li>`).join('');
  const canLompat = !!(lessonOf(id) && qsOf(id).u.length >= 2);
  let act = '';
  if (!open) {
    act = `<p class="note">${icon('lock')} Terkunci. Capai level <b>Cakap</b> di anak tangga di bawahnya dulu — anak tangga ini dibangun di atasnya.</p>`;
    if (canLompat) act += `<button class="btn" data-act="lompat" data-id="${id}">Sudah bisa? Uji lompat (3 soal)</button>`;
  } else {
    act = `<button class="btn primary big" data-act="belajar" data-id="${id}">${L >= 3 ? 'Belajar ulang' : L > 0 ? 'Lanjutkan belajar' : 'Mulai belajar'} ${icon('arrow')}</button>`;
    if (due) act += `<button class="btn" data-act="ulasan" data-id="${id}">${icon('refresh')} Ulasan sekarang</button>`;
  }
  if (AI.ok) act += `<button class="btn ghost" data-act="chat" data-ctx="${id}">${icon('spark')} Tanya Kak Tangga tentang ini</button>`;
  return `<div class="sh-head"><p class="eyebrow">${x.kode} · anak tangga ${i + 1} dari ${TANGGA[key].atoms.length}</p><h2>${esc(a.judul)}</h2><p class="mute">${esc(a.ringkas)}</p></div>
    <ol class="lvl-row" aria-label="Level saat ini: ${LEVEL[L]}">${[1, 2, 3, 4].map((k) => `<li class="${L >= k ? 'on' : ''}${L === k ? ' me' : ''}">${LEVEL[k]}</li>`).join('')}</ol>
    ${r.lvl >= 3 ? `<p class="small mute">${r.tempat ? 'Lolos tes penempatan. ' : ''}${r.due ? 'Ulasan berikutnya: ' + tglPendek(r.due) + '.' : ''}</p>` : ''}
    ${a.pra.length ? `<h4>Dibangun di atas</h4><ul class="pra">${pra}</ul>` : '<p class="small mute">Anak tangga dasar — tidak butuh prasyarat.</p>'}
    ${!a.L ? `<p class="note">${icon('spark')} Materi ini ${GEN[id] ? 'sudah' : 'akan'} disusun Kak Tangga (AI) dan belum diverifikasi guru.</p>` : ''}
    <div class="sh-actions">${act}</div>`;
}

/* ======================= LATIHAN ======================= */
function vLatihan() {
  const due = dueList();
  const subs = SUBTES.filter((x) => qsOfSub(x.id).length);
  const sel = UI.latSub && subs.some((x) => x.id === UI.latSub) ? UI.latSub : (subs.find((x) => x.id === S.fokus) || subs[0]).id;
  UI.latSub = sel;
  const nDrill = drillN();
  const last = S.tryout.slice(-3).reverse();
  const salah = S.salah.slice().reverse();
  let h = `<section class="hello"><h1>Latihan</h1><p class="mute">Soal dipilih otomatis di zona “pas”: peluang benarmu sekitar 70–85%. Terlalu mudah tidak melatih, terlalu sulit bikin menyerah.</p></section>`;
  h += `<section class="card"><h3>${icon('pencil')} Latihan adaptif</h3>
    <div class="tchips small-chips">${subs.map((x) => `<button class="tchip${x.id === sel ? ' on' : ''}" data-act="lat-sub" data-s="${x.id}" style="--h:${x.hue}" aria-pressed="${x.id === sel}">${x.kode} <small>${qsOfSub(x.id).length}</small></button>`).join('')}</div>
    <p class="small mute">${nDrill} soal per sesi (sesuai durasi sesimu) · ${esc(subOf(sel).nama)}: ${qsOfSub(sel).length} soal tersedia.</p>
    <button class="btn primary" data-act="drill" data-s="${sel}">Mulai latihan ${icon('arrow')}</button></section>`;
  h += `<section class="card tryout-card"><div class="sec-h"><h3>${icon('clock')} Tryout mini</h3><span class="mute small">mode ujian</span></div>
    <p>10 soal campuran dari 7 subtes, 12,5 menit — sekitar 75 detik per soal, seperti tempo UTBK. Tanpa petunjuk; pembahasan muncul di akhir.</p>
    ${last.length ? `<ul class="to-hist">${last.map((r) => `<li><span>${tglPendek(r.d)}</span><b>${r.skor}</b><span class="mute">${r.benar}/${r.n} benar · ${Math.round(r.dtk)} dtk/soal</span></li>`).join('')}</ul>` : ''}
    <button class="btn primary" data-act="tryout">Mulai tryout mini</button></section>`;
  if (due.length) h += `<button class="card row-card" data-act="ulasan">${icon('refresh')}<span><b>Ulasan jatuh tempo</b><small>${due.map((id) => esc(ATOM[id].judul)).slice(0, 3).join(', ')}${due.length > 3 ? ', …' : ''}</small></span>${icon('arrow')}</button>`;
  h += `<section class="card salah-card"><div class="sec-h"><h3>${icon('book')} Buku Salah</h3><span class="mute small">${salah.length} soal</span></div>
    <p class="small mute">Setiap jawaban salah masuk ke sini otomatis. Soal keluar dari buku setelah kamu jawab benar 2 kali berturut-turut.</p>
    ${salah.length ? `<button class="btn" data-act="uji-salah">Uji ulang ${Math.min(salah.length, 8)} soal</button>
    <ul class="salah-list">${salah.slice(0, 8).map((e) => { const q = QB[e.q]; if (!q) return ''; const open = UI.salahOpen === e.q; return `<li><button class="sl-b" data-act="salah-buka" data-q="${e.q}" aria-expanded="${open}">${subChip(q.s)}<span>${esc(q.t.length > 90 ? q.t.slice(0, 88) + '…' : q.t)}</span><em>${e.n}× salah · ${e.ok}/2</em></button>${open ? `<div class="sl-x"><p>Jawaban: <b>${fmt(q.o[q.k])}</b></p><p>${fmt(q.b)}</p></div>` : ''}</li>`; }).join('')}</ul>` : '<p class="empty">Belum ada. Salah itu bagian dari belajar — nanti muncul di sini.</p>'}
  </section>`;
  if (AI.ok) h += `<section class="card kt-card"><h3>${icon('spark')} Kak Tangga</h3><p>Tanya apa saja tentang materi UTBK. Kak Tangga membimbing dengan pertanyaan, bukan langsung memberi jawaban.</p>
    <div class="row-btns"><button class="btn" data-act="chat">${icon('chat')} Mulai ngobrol</button>${AI.imgs ? `<button class="btn ghost" data-act="chat" data-foto="1">${icon('camera')} Foto soal</button>` : ''}</div>
    </section>`;
  return h;
}
const drillN = () => ({ 5: 5, 10: 8, 20: 15, 45: 25 }[S.set.durasi] || 8);

/* ======================= KARTU ======================= */
function vKartu() {
  const decks = Object.entries(DEK).map(([k, d]) => ({ k, nama: d.nama, s: d.s })).concat([{ k: 'kartuku', nama: 'Kartuku', s: null }]);
  const all = cardQueue();
  let h = `<section class="hello"><h1>Kartu</h1><p class="mute">Pengulangan berjarak: kartu muncul lagi tepat sebelum kamu lupa. Maksimal ${NEW_PER_DAY} kartu baru per dek per hari.</p></section>`;
  h += `<button class="card row-card hero-row" data-act="kartu-mulai" data-dek="" ${all.due.length + all.fresh.length ? '' : 'disabled'}>${icon('cards')}<span><b>Belajar semua dek</b><small>${all.due.length} perlu diulang · ${all.fresh.length} baru</small></span>${icon('arrow')}</button>`;
  h += '<div class="decks">' + decks.map((d) => {
    const q = cardQueue(d.k); const n = q.due.length + q.fresh.length;
    return `<section class="card deck" ${d.s ? `style="--h:${subOf(d.s).hue}"` : ''}>
      <div class="dk-h">${d.s ? subChip(d.s) : `<span class="sub-chip mine">MILIKKU</span>`}<h3>${esc(d.nama)}</h3></div>
      <div class="dk-bar" aria-hidden="true"><span style="width:${q.total ? Math.round((q.learned / q.total) * 100) : 0}%"></span></div>
      <p class="small mute">${q.learned}/${q.total} dipelajari · ${q.due.length} perlu diulang · ${q.fresh.length} baru</p>
      <button class="btn sm${n ? ' primary' : ''}" data-act="kartu-mulai" data-dek="${d.k}" ${n ? '' : 'disabled'}>${n ? `Belajar ${n} kartu` : q.total ? 'Beres untuk hari ini' : 'Belum ada kartu'}</button>
    </section>`;
  }).join('') + '</div>';
  h += `<section class="card"><h3>${icon('plus')} Buat kartu sendiri</h3>
    <form class="form" data-form="kartu-baru" onsubmit="return false">
      <label for="kb-depan">Depan (pertanyaan/kata)</label><input id="kb-depan" maxlength="120" placeholder="mis. meticulous">
      <label for="kb-belakang">Belakang (jawaban/arti)</label><input id="kb-belakang" maxlength="200" placeholder="mis. sangat teliti">
      <button type="button" class="btn" data-act="kartu-simpan">Simpan ke Kartuku</button>
    </form>
    <p class="small mute">Kata dari permainan Kata Hari Ini juga bisa disimpan ke sini.</p></section>`;
  return h;
}

/* ======================= KEMAJUAN ======================= */
function vKemajuan() {
  const P = S.profil; const pt = prediksiTotal();
  const s30 = statsRange(nowMs() - 30 * 864e5, nowMs() + 1); const ret = retensi();
  const answered = LOG.filter((e) => e.src !== 'kartu').length;
  let h = `<section class="prof-h">
    <div><p class="eyebrow">Kelas ${P.kelas}${P.prodi || P.ptn ? ' · ' + esc([P.prodi, P.ptn].filter(Boolean).join(' · ')) : ''}</p><h1>${esc(P.nama || 'Profilku')}</h1></div>
    <button class="icon-btn" data-act="set" aria-label="Profil dan pengaturan">${icon('gear')}</button>
  </section>`;
  h += `<section class="card"><div class="sec-h"><h3>Perkiraan skor</h3><span class="big-num sm">${pt.skor}<small> ±${pt.rentang}</small></span></div>${chartSkor()}
    <p class="small mute">Garis putus-putus = target ${P.target}. Titik = hasil tryout mini. Perkiraan memakai penilaian dirimu sebagai titik awal, lalu makin bersandar pada data latihan.</p></section>`;
  h += `<section class="card tracker"><div class="sec-h"><h3>Pelacak subtes</h3><button class="link" data-act="cekdiri">Cek diri</button></div>
    <p class="small mute">Penilaian dirimu: <b>1</b> = belum paham sama sekali, <b>5</b> = siap UTBK. Ketuk angka untuk memperbarui. Data latihan ditampilkan di sampingnya sebagai pembanding.</p>
    <ul class="trk-list">${trackerRows()}</ul></section>`;
  const tiles = [
    ['Penguasaan', pct(masteryAll()), 'rata-rata 7 tangga'],
    ['Akurasi sedang–sulit', pct(s30.accHard), '30 hari terakhir'],
    ['Kecepatan', s30.dtk == null ? '—' : Math.round(s30.dtk) + ' dtk', 'per soal · target 60–90'],
    ['Retensi kartu', pct(ret), 'kartu lama yang masih ingat'],
    ['Konsistensi', aktif7() + '/7', 'hari aktif minggu ini'],
    ['Jawaban tercatat', num(answered), 'bahan model belajarmu'],
  ];
  h += `<section class="sec"><div class="sec-h"><h2>Angka-angkamu</h2></div><div class="tiles">${tiles.map(([a, b, c]) => `<div class="tile"><span class="t-l">${a}</span><b>${b}</b><span class="t-k">${c}</span></div>`).join('')}</div></section>`;
  h += laporanCard();
  h += `<section class="card"><div class="sec-h"><h3>Kalender streak</h3><span class="small mute">5 minggu terakhir</span></div>${kalender()}</section>`;
  const lenc = LENCANA.filter((b) => AI.ok || b.id !== 'arsitek' || S.lencana[b.id]);
  h += `<section class="sec"><div class="sec-h"><h2>Lencana</h2><span class="mute">${lenc.filter((b) => S.lencana[b.id]).length}/${lenc.length}</span></div><div class="badges">${lenc.map((b) => { const got = S.lencana[b.id]; return `<div class="badge${got ? ' got' : ''}">${icon(got ? 'star' : 'lock')}<b>${b.nama}</b><span>${got ? tglPendek(got) : b.ket}</span></div>`; }).join('')}</div></section>`;
  if (IN_CLAUDE) h += `<section class="card plus-card"><p class="eyebrow">Rencana model bisnis (draf)</p><h3>Tangga Plus</h3>
    <div class="plus-cols"><div><h4>Gratis</h4><ul><li>Semua tangga & anak tangga</li><li>Streak & 7 permainan harian</li><li>Kartu & Buku Salah</li><li>Kak Tangga dengan kuota harian</li></ul></div>
    <div><h4>Plus</h4><ul><li>Kak Tangga tanpa batas & foto soal</li><li>Tryout lengkap 160 soal</li><li>Laporan mingguan untuk orang tua/guru</li><li>Tangga kustom tanpa batas</li></ul></div></div>
    <p class="small mute">Harga belum ditentukan. Draf ini belum punya pembayaran.</p></section>`;
  h += `<section class="card" id="data-card"><h3>Data & penyimpanan</h3><p>${Cloud.on ? `${icon('check')} Progres tersimpan di akun Claude-mu, jadi ikut terbawa ke perangkat lain.` : (NATIVE ? 'Progres tersimpan di HP ini saja — tanpa akun, tanpa dikirim ke mana pun.' : 'Progres tersimpan di browser perangkat ini saja — tanpa akun, tanpa dikirim ke mana pun.')}${Cloud.err && Cloud.on ? ' <span class="warn-t">Penyimpanan terakhir gagal; akan dicoba lagi.</span>' : ''}</p>
    ${Cloud.on || IN_CLAUDE ? '' : `<p class="small ${backupStale() ? 'warn-t' : 'mute'}">${S.cadangan ? `Cadangan terakhir: ${tglPendek(S.cadangan)}.` : 'Belum pernah dicadangkan.'} ${NATIVE ? 'Simpan cadangan sesekali (mis. ke Google Drive) supaya progresmu aman saat ganti HP.' : 'Unduh cadangan sesekali supaya progresmu aman saat ganti HP atau data browser terhapus.'}</p>`}
    <div class="row-btns">${backupBtns()}<button class="btn sm ghost" data-act="salin-ringkasan">${icon('copy')} Salin ringkasan untuk orang tua/guru</button><button class="btn sm ghost" data-act="set">${icon('gear')} Pengaturan</button></div></section>`;
  return h;
}
function trackerRows() {
  const rows = SUBTES.map((x) => ({ x, v: selfOf(x.id), pv: prevSelfOf(x.id), da: subAcc(x.id), pr: prediksi(x.id) }));
  const rated = rows.filter((r) => r.v); const minV = rated.length ? Math.min(...rated.map((r) => r.v)) : 0;
  return rows.map((r) => {
    const weak = r.v && r.v === minV;
    const ch = r.v && r.pv ? (r.v > r.pv ? '<span class="up" title="naik">▲</span>' : r.v < r.pv ? '<span class="dn" title="turun">▼</span>' : '') : '';
    let cal = '';
    if (r.v && r.da && r.da.n >= 10) { const g = (r.v - 1) / 4 - r.da.acc; if (g > 0.35) cal = ' · <span class="warn-t">mungkin terlalu percaya diri</span>'; else if (g < -0.35) cal = ' · <span class="good-t">kamu lebih jago dari yang kamu kira</span>'; }
    return `<li class="trk${weak ? ' weak' : ''}" style="--h:${r.x.hue}">
      <div class="trk-h">${subChip(r.x.id)}<span class="trk-n">${esc(r.x.nama)}</span>${weak ? '<span class="pill warn">perlu ditingkatkan</span>' : ''}</div>
      <div class="trk-b">${rateButtons(r.x.id, r.v)}${ch}${sparkSelf(r.x.id)}</div>
      <p class="small mute">${r.da ? `Data latihan: ${Math.round(r.da.acc * 100)}% benar dari ${r.da.n} soal` : 'Belum ada data latihan'} · perkiraan skor ${r.pr.skor}${cal}</p>
    </li>`;
  }).join('');
}
function chartSkor() {
  const pts = S.skor.slice(-30);
  if (pts.length < 2) return '<p class="empty">Grafik muncul setelah 2 hari data.</p>';
  const W = 340, H = 160, pl = 34, pr = 12, ptp = 14, pb = 24;
  const from = pts[0].d;
  const tos = S.tryout.filter((r) => r.d >= from);
  const vals = pts.map((p) => p.v).concat([S.profil.target], tos.map((r) => r.skor));
  const lo = Math.floor((Math.min(...vals) - 15) / 50) * 50; const hi = Math.ceil((Math.max(...vals) + 15) / 50) * 50;
  const span = Math.max(1, diffDays(from, pts[pts.length - 1].d));
  const X = (d) => pl + (diffDays(from, d) / span) * (W - pl - pr); const Y = (v) => ptp + (1 - (v - lo) / (hi - lo)) * (H - ptp - pb);
  const step = hi - lo > 250 ? 100 : 50; let grid = '';
  for (let v = lo; v <= hi; v += step) grid += `<line x1="${pl}" x2="${W - pr}" y1="${Y(v).toFixed(1)}" y2="${Y(v).toFixed(1)}" class="g"/><text x="${pl - 6}" y="${(Y(v) + 3.5).toFixed(1)}" class="yl">${v}</text>`;
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${X(p.d).toFixed(1)} ${Y(p.v).toFixed(1)}`).join('');
  const area = `${line}L${X(pts[pts.length - 1].d).toFixed(1)} ${Y(lo).toFixed(1)}L${X(pts[0].d).toFixed(1)} ${Y(lo).toFixed(1)}Z`;
  const last = pts[pts.length - 1];
  const tg = S.profil.target;
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Perkiraan skor dari ${pts[0].v} menjadi ${last.v} dalam ${span} hari; target ${tg}">
    ${grid}
    <line x1="${pl}" x2="${W - pr}" y1="${Y(tg).toFixed(1)}" y2="${Y(tg).toFixed(1)}" class="tl"/><text x="${W - pr}" y="${(Y(tg) - 5).toFixed(1)}" class="tlt">target</text>
    <path d="${area}" class="ar"/><path d="${line}" class="ln"/>
    ${tos.map((r) => `<circle cx="${X(r.d).toFixed(1)}" cy="${Y(r.skor).toFixed(1)}" r="3.5" class="to"/>`).join('')}
    <circle cx="${X(last.d).toFixed(1)}" cy="${Y(last.v).toFixed(1)}" r="4.5" class="end"/>
    <text x="${pl}" y="${H - 6}" class="xl">${tglPendek(pts[0].d)}</text><text x="${W - pr}" y="${H - 6}" class="xl r">${tglPendek(last.d)}</text>
  </svg>`;
}
function laporanCard() {
  const n = nowMs(); const w1 = statsRange(n - 7 * 864e5, n + 1); const w0 = statsRange(n - 14 * 864e5, n - 7 * 864e5);
  const t = today(); const from = addDays(t, -6);
  const lulus = Object.entries(S.atom).filter(([id, r]) => r.lulus && r.lulus >= from && ATOM[id]).map(([id]) => ATOM[id].judul);
  const sk = S.skor; const sNow = sk.length ? sk[sk.length - 1].v : null; const sOld = sk.length ? (sk.find((p) => p.d >= addDays(t, -7)) || sk[0]).v : null;
  const byAtom = {}; for (const e of S.salah) { const q = QB[e.q]; if (q && q.a) byAtom[q.a] = (byAtom[q.a] || 0) + e.n; }
  const weakId = Object.keys(byAtom).sort((a, b) => byAtom[b] - byAtom[a])[0];
  const items = [];
  items.push(`Kamu menjawab <b>${w1.n} soal</b> minggu ini${w0.n ? ` (minggu lalu ${w0.n})` : ''}.`);
  if (w1.acc != null) items.push(`Akurasi <b>${pct(w1.acc)}</b>${w0.acc != null ? ` (${w1.acc >= w0.acc ? 'naik' : 'turun'} dari ${pct(w0.acc)})` : ''}.`);
  if (w1.dtk != null) items.push(`Rata-rata <b>${Math.round(w1.dtk)} detik</b> per soal${w0.dtk != null ? `, ${w1.dtk <= w0.dtk ? 'lebih cepat' : 'lebih lambat'} ${Math.abs(Math.round(w0.dtk - w1.dtk))} detik dari minggu lalu` : ''}.`);
  if (sNow != null && sOld != null) items.push(`Perkiraan skor <b>${sOld} → ${sNow}</b>.`);
  items.push(lulus.length ? `Anak tangga baru yang Cakap: ${lulus.map((j) => `<b>${esc(j)}</b>`).join(', ')}.` : 'Belum ada anak tangga baru yang lulus minggu ini.');
  if (weakId && ATOM[weakId]) items.push(`Paling sering salah di: <b>${esc(ATOM[weakId].judul)}</b>. Ulangi anak tangga itu atau buka Buku Salah.`);
  return `<section class="card report"><div class="sec-h"><h3>Laporan minggu ini</h3><span class="small mute">${tglPendek(from)}–${tglPendek(t)}</span></div><ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul></section>`;
}
function kalender() {
  const t = today(); const d = parseKey(t); const dow = (d.getDay() + 6) % 7; const start = addDays(t, -dow - 28);
  let cells = '';
  for (let i = 0; i < 35; i++) {
    const k = addDays(start, i); const xp = S.xp.hari[k] || 0;
    const cls = k > t ? 'next' : S.streak.aktif.includes(k) ? (xp >= S.set.targetXP ? 'on full' : 'on') : S.streak.beku.includes(k) ? 'beku' : 'off';
    cells += `<i class="${cls}${k === t ? ' today' : ''}" title="${tglPendek(k)}${xp ? ' · ' + xp + ' XP' : ''}"></i>`;
  }
  return `<div class="cal"><div class="cal-h">${['S', 'S', 'R', 'K', 'J', 'S', 'M'].map((x) => `<span>${x}</span>`).join('')}</div><div class="cal-g">${cells}</div></div>
    <p class="small mute cal-l"><i class="on"></i> aktif <i class="on full"></i> target XP tercapai <i class="beku"></i> diselamatkan pembeku</p>`;
}

/* ---------- cadangan & pasang aplikasi (versi gratis) ---------- */
function backupBtns() {
  /* Di dalam Claude, unduhan dari halaman diblokir — hanya pemulihan (pilih file) yang bisa. */
  return (IN_CLAUDE ? '' : `<button type="button" class="btn sm" data-act="cadangkan">${icon('download')} ${NATIVE ? 'Simpan cadangan' : 'Unduh cadangan'}</button>`)
    + `<button type="button" class="btn sm ghost" data-act="pulihkan">${icon('upload')} Pulihkan dari cadangan</button>`;
}
const INSTALL = { evt: null, done: false };
const isStandalone = () => (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
/* Di GitHub Pages (pemilik.github.io/tangga/), APK terbaru ada di halaman Releases repo yang sama. */
function apkUrl() {
  if (!/\.github\.io$/i.test(location.hostname)) return null;
  const owner = location.hostname.split('.')[0]; const repo = location.pathname.split('/').filter(Boolean)[0] || 'tangga';
  return `https://github.com/${owner}/${repo}/releases/latest/download/tangga.apk`;
}
const isAndroid = () => /android/i.test(navigator.userAgent);
function installCard() {
  if (IN_CLAUDE || NATIVE || isStandalone() || INSTALL.done) return '';
  const apk = apkUrl();
  if (apk && isAndroid()) return `<section class="card install-card"><h3>${icon('phone')} Pasang aplikasi Android</h3><p class="small">Dengan pengingat harian dan tetap jalan tanpa sinyal. Unduh, lalu buka file-nya untuk memasang. Progres di browser bisa dipindah lewat <b>Unduh cadangan</b> di Kemajuan.</p><div class="row-btns"><a class="btn primary sm" href="${apk}" rel="noopener">${icon('download')} Unduh APK</a>${INSTALL.evt ? '<button class="btn sm ghost" data-act="pasang">Pasang versi web</button>' : ''}</div></section>`;
  if (INSTALL.evt) return `<section class="card install-card"><h3>${icon('phone')} Pasang Tangga di HP</h3><p class="small">Buka langsung dari layar utama seperti aplikasi biasa, tetap jalan walau sinyal hilang.</p><button class="btn primary sm" data-act="pasang">${icon('download')} Pasang aplikasi</button></section>`;
  if (isIOS()) return `<section class="card install-card"><h3>${icon('phone')} Pasang Tangga di iPhone</h3><p class="small">Di Safari, ketuk tombol <b>Bagikan</b> lalu pilih <b>Tambahkan ke Layar Utama</b>. Tangga akan terbuka seperti aplikasi dan progresmu lebih awet tersimpan.</p></section>`;
  return '';
}

/* ======================= LEMBAR BAWAH (sheet) ======================= */
function shSet() {
  const P = S.profil, T = S.set;
  const seg = (k, opts) => `<div class="seg" role="group">${opts.map(([v, l]) => `<button type="button" class="${String(T[k]) === String(v) ? 'on' : ''}" aria-pressed="${String(T[k]) === String(v)}" data-act="setopt" data-k="${k}" data-v="${v}">${l}</button>`).join('')}</div>`;
  return `<div class="sh-head"><h2>Profil & pengaturan</h2></div>
  <form class="form" onsubmit="return false">
    <h4>Profil</h4>
    <label for="f-nama">Nama panggilan</label><input id="f-nama" data-bind="profil.nama" value="${esc(P.nama)}" maxlength="30" autocomplete="nickname">
    <span class="lbl">Kelas</span><div class="seg" role="group">${[11, 12].map((k) => `<button type="button" class="${P.kelas === k ? 'on' : ''}" aria-pressed="${P.kelas === k}" data-act="set-kelas" data-v="${k}">Kelas ${k}</button>`).join('')}</div>
    <label for="f-ptn">PTN impian</label><input id="f-ptn" data-bind="profil.ptn" value="${esc(P.ptn)}" placeholder="mis. Universitas Indonesia">
    <label for="f-prodi">Prodi impian</label><input id="f-prodi" data-bind="profil.prodi" value="${esc(P.prodi)}" placeholder="mis. Teknik Biomedis">
    <label for="f-target">Target skor rata-rata: <b id="f-target-v">${P.target}</b></label><input id="f-target" type="range" min="400" max="850" step="10" data-bind="profil.target" value="${P.target}">
    <label for="f-utbk">Perkiraan tanggal UTBK</label><input id="f-utbk" type="date" data-bind="profil.utbk" value="${esc(P.utbk)}">
    <h4>Cara belajar</h4>
    <span class="lbl">Gaya penjelasan awal</span>${seg('gaya', Object.entries(GAYA))}
    <span class="lbl">Durasi sesi</span>${seg('durasi', [[5, '5 mnt'], [10, '10 mnt'], [20, '20 mnt'], [45, '45 mnt']])}
    <span class="lbl">Target harian</span>${seg('targetXP', [[20, 'Santai 20 XP'], [40, 'Normal 40'], [80, 'Serius 80']])}
    <span class="lbl">Tempo</span>${seg('tempo', [['santai', 'Santai'], ['normal', 'Normal'], ['intens', 'Intens']])}
    <span class="lbl">Petunjuk</span>${seg('petunjuk', [['banyak', 'Banyak'], ['sebagian', 'Sebagian'], ['tidak', 'Tanpa']])}
    ${NATIVE ? `<span class="lbl">Pengingat harian</span><div class="seg" role="group">${INGAT_JAM.map(([v, l]) => `<button type="button" class="${String(S.set.ingat || 'off') === v ? 'on' : ''}" aria-pressed="${String(S.set.ingat || 'off') === v}" data-act="ingat" data-v="${v}">${l}</button>`).join('')}</div><p class="small mute">Notifikasi hanya muncul kalau streak hari itu belum aman.</p>` : ''}
    ${AI.ok ? `<span class="lbl">Bahasa Kak Tangga</span>${seg('bahasa', [['id', 'Indonesia'], ['campur', 'Campur Inggris']])}` : ''}
    ${DEV || S.demoOffset ? `<h4>Alat uji draf</h4>
    <p class="small mute">Untuk mencoba streak dan ulasan tanpa menunggu besok.</p>
    <div class="row-btns"><button type="button" class="btn sm" data-act="lompat-hari">${icon('calendar')} Lompat ke besok</button>${S.demoOffset ? `<button type="button" class="btn sm ghost" data-act="kembali-hari">Kembali ke hari ini (+${S.demoOffset} hari)</button>` : ''}</div>` : ''}
    <h4>Data</h4>
    ${Cloud.on ? '' : `<p class="small mute">Progres tersimpan di ${NATIVE ? 'HP' : 'browser'} ini.${IN_CLAUDE ? '' : ` ${S.cadangan ? `Cadangan terakhir: ${tglPendek(S.cadangan)}.` : 'Belum pernah dicadangkan.'}`}</p><div class="row-btns">${backupBtns()}</div>`}
    <div class="row-btns"><button type="button" class="btn sm ghost" data-act="salin-json">Salin data mentah (JSON)</button></div>
    <button type="button" class="btn sm danger" data-act="reset">${icon('trash')} ${UI.resetArm ? 'Yakin? Ketuk sekali lagi untuk menghapus semua' : 'Hapus semua data & mulai dari awal'}</button>
  </form>`;
}
function shCekDiri() {
  return `<div class="sh-head"><p class="eyebrow">Cek diri mingguan</p><h2>Seberapa siap kamu di tiap subtes?</h2><p class="mute">Jujur saja — ini hanya untukmu. 1 = belum paham sama sekali, 5 = siap UTBK.${S.self.length ? ` Terakhir dinilai ${tglPendek(S.self[S.self.length - 1].d)}.` : ''}</p></div>
    <ul class="trk-list compact">${SUBTES.map((x) => `<li class="trk" style="--h:${x.hue}"><div class="trk-h">${subChip(x.id)}<span class="trk-n">${esc(x.nama)}</span></div><div class="trk-b">${rateButtons(x.id, selfOf(x.id), 'rate')}</div></li>`).join('')}</ul>
    <div class="sh-actions"><button class="btn primary big" data-act="sheet-close">Selesai</button></div>`;
}
function shTanggaBaru() {
  const d = SH.dec || {};
  let h = `<div class="sh-head"><p class="eyebrow">${icon('spark')} Metode Tangga untuk topik apa pun</p><h2>Buat tangga baru</h2><p class="mute">Ketik topik apa saja. Kak Tangga akan memecahnya menjadi 4–8 anak tangga kecil, dari yang paling dasar sampai topik itu sendiri.</p></div>`;
  if (!AI.ok) return h + `<p class="note">${icon('spark')} ${AI.off ? 'Kak Tangga belum diizinkan di tampilan ini.' : 'Fitur ini butuh Kak Tangga, yang aktif saat aplikasi dibuka di Claude.'}</p>`;
  h += `<form class="form" onsubmit="return false"><label for="tb-topik">Topik</label><textarea id="tb-topik" rows="2" maxlength="160" placeholder="mis. peluang dua kejadian, teks eksposisi, present perfect tense">${esc(SH.topik || '')}</textarea>
    <div class="chips-row">${['Peluang dua kejadian', 'Teks argumentasi', 'Fungsi kuadrat', 'Conditional sentences'].map((t) => `<button type="button" class="tchip" data-act="tb-contoh" data-t="${esc(t)}">${t}</button>`).join('')}</div>
    <button type="button" class="btn primary" data-act="pecah" ${d.state === 'busy' ? 'disabled' : ''}>${d.state === 'busy' ? 'Kak Tangga sedang memecah topik…' : 'Pecah jadi anak tangga'}</button></form>`;
  if (d.state === 'busy') h += `<div class="thinking">${loaderStairs()}<p>Mencari konsep paling dasar, lalu menyusunnya ke atas…</p><button class="btn sm ghost" data-act="pecah-stop">${icon('stop')} Hentikan</button></div>`;
  if (d.state === 'err') h += `<p class="note warn">${esc(d.msg)}</p>`;
  if (d.state === 'done' && d.plan) {
    const p = d.plan;
    h += `<div class="plan"><p class="eyebrow">${subOf(p.s).kode} · ${esc(subOf(p.s).nama)}</p><h3>${esc(p.judul)}</h3>${p.ringkasan ? `<p class="mute">${esc(p.ringkasan)}</p>` : ''}
      <ol class="plan-steps">${p.atoms.map((a, i) => `<li><b>${i + 1}. ${esc(a.judul)}</b><span>${esc(a.ringkas)}</span>${a.pra.length ? `<em>butuh: ${a.pra.map((j) => j + 1).join(', ')}</em>` : '<em>dasar</em>'}</li>`).join('')}</ol>
      <div class="sh-actions"><button class="btn primary big" data-act="simpan-tangga">Simpan tangga ini</button></div></div>`;
  }
  return h;
}
const loaderStairs = () => '<span class="ld-st" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>';
