'use strict';
/* =====================================================================
   Tangga — lembar bawah, notifikasi, aksi, dan penyalaan aplikasi
   ===================================================================== */

let SH = null;   // lembar bawah (sheet) yang sedang terbuka

function renderAll() { renderTop(); renderMain(); renderNav(); }
function renderSheet() {
  const el = $('#sheet');
  if (!SH) { el.hidden = true; el.innerHTML = ''; document.body.classList.remove('sh-open'); return; }
  const ta = $('#chat-ta'); const keep = ta ? { v: ta.value, f: document.activeElement === ta } : null;
  const panes = { atom: () => shAtom(SH.id), set: shSet, cekdiri: shCekDiri, tangga: shTanggaBaru, chat: shChat, salin: shSalin, pulih: shPulih };
  const labels = { atom: 'Detail anak tangga', set: 'Profil dan pengaturan', cekdiri: 'Cek diri mingguan', tangga: 'Buat tangga baru', chat: 'Kak Tangga', salin: 'Salin teks', pulih: 'Pulihkan cadangan' };
  const R = panes[SH.kind];
  el.hidden = false; document.body.classList.add('sh-open');
  el.innerHTML = `<div class="sh-bg" data-act="sheet-close"></div><div class="sh-panel${SH.kind === 'chat' ? ' chat' : ''}" role="dialog" aria-modal="true" aria-label="${labels[SH.kind] || ''}"><button class="icon-btn sh-x" data-act="sheet-close" aria-label="Tutup">${icon('x')}</button><div class="sh-c">${R ? R() : ''}</div></div>`;
  if (keep) { const t2 = $('#chat-ta'); if (t2) { t2.value = keep.v; if (keep.f) t2.focus(); } }
  if (SH.kind === 'chat') scrollChat();
}
function openSheet(kind, extra) { SH = Object.assign({ kind }, extra || {}); UI.resetArm = false; renderSheet(); }
function closeSheet(silent) {
  if (SH && SH.dec && SH.dec.ctl) { try { SH.dec.ctl.abort(); } catch (e) { /* abaikan */ } }
  SH = null; UI.resetArm = false; renderSheet();
  if (!silent) renderAll();
}
function shPulih() {
  const d = SH.data; const s = d.state || {}; const P = s.profil || {};
  const xp = (s.xp && s.xp.total) || 0; const st = (s.streak && s.streak.n) || 0;
  const n = Array.isArray(d.log) ? d.log.filter((e) => e && e.src !== 'kartu').length : 0;
  const tgl = d.tanggal && /^\d{4}-\d{2}-\d{2}$/.test(d.tanggal) ? tglPanjang(d.tanggal) : 'pada tanggal yang tidak diketahui';
  const ganti = S.onboarded && !S.demo;
  return `<div class="sh-head"><p class="eyebrow">${icon('upload')} Pulihkan cadangan</p><h2>Cadangan milik ${esc(P.nama || 'tanpa nama')}</h2><p class="mute">Dibuat ${tgl}${P.kelas ? ` · kelas ${esc(P.kelas)}` : ''}.</p></div>
    <ul class="end-stats"><li><b>${num(xp)}</b><span>XP</span></li><li><b>${num(st)}</b><span>hari streak</span></li><li><b>${num(n)}</b><span>jawaban</span></li></ul>
    ${ganti ? `<p class="note warn">${icon('x')}Progres yang sekarang ada di browser ini (${esc(S.profil.nama)}, ${num(S.xp.total)} XP) akan <b>diganti</b> dengan isi cadangan ini.</p>` : ''}
    <div class="sh-actions"><button class="btn primary big" data-act="pulih-ya">Pulihkan progres ini</button><button class="btn ghost" data-act="sheet-close">Batal</button></div>`;
}
function shSalin() { return `<div class="sh-head"><h2>Salin teks</h2><p class="mute">Menyalin otomatis tidak diizinkan di sini. Tekan lama teks di bawah, lalu salin.</p></div><textarea class="copy-ta" readonly rows="12" aria-label="Teks untuk disalin">${esc(SH.text)}</textarea>`; }

/* ---------- notifikasi kecil (toast) ---------- */
const toastQ = []; let toastBusy = false;
function toast(msg, kind) { toastQ.push({ msg, kind }); if (!toastBusy) nextToast(); }
function nextToast() {
  const el = $('#toast'); const t = toastQ.shift();
  if (!t) { toastBusy = false; el.className = ''; return; }
  toastBusy = true;
  el.innerHTML = `${icon(t.kind === 'streak' ? 'flame' : t.kind === 'badge' ? 'star' : t.kind === 'info' ? 'snow' : t.kind === 'warn' ? 'x' : 'check')}<span>${esc(t.msg)}</span>`;
  el.className = 'show' + (t.kind ? ' t-' + t.kind : '');
  setTimeout(() => { el.className = ''; setTimeout(nextToast, 220); }, Math.max(2400, t.msg.length * 60)); // pesan panjang tampil lebih lama
}
function flushToasts() { const p = pendingToasts; pendingToasts = []; for (const t of p) toast(t.msg, t.kind); }
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); toast('Tersalin.'); }
  catch (e) { openSheet('salin', { text }); }
}

/* ---------- penilaian diri ---------- */
function setSelf(s, v) {
  const t = today(); let last = S.self[S.self.length - 1];
  if (!last || last.d !== t) { last = { d: t, r: Object.assign({}, last ? last.r : {}) }; S.self.push(last); }
  last.r[s] = v;
  if (S.self.length > 60) S.self.splice(0, S.self.length - 60);
  award('jujur'); snapSkor(); save();
  renderMain(); if (SH) renderSheet(); flushToasts();
}

/* ---------- ringkasan untuk orang tua/guru ---------- */
function ringkasan() {
  const P = S.profil; const pt = prediksiTotal(); const w = statsRange(nowMs() - 7 * 864e5, nowMs() + 1);
  return [
    `Ringkasan belajar UTBK — ${P.nama} (kelas ${P.kelas})`,
    `Tanggal: ${tglPanjang(today())}`,
    `Streak: ${S.streak.n} hari (rekor ${S.streak.best} hari)`,
    `Perkiraan skor rata-rata: ${pt.skor} ± ${pt.rentang} (target ${P.target})`,
    `Minggu ini: ${w.n} soal, akurasi ${pct(w.acc)}`,
    `Penguasaan materi: ${pct(masteryAll())}`,
    'Penilaian diri per subtes (1–5):',
    ...SUBTES.map((x) => `- ${x.nama}: ${selfOf(x.id) || '-'}`),
    '(Dibuat dengan Tangga — versi draf)',
  ].join('\n');
}

/* ---------- daftar aksi (data-act) ---------- */
const curT = () => (OV && OV.kind === 'lesson' ? (OV.step === 4 ? OV.lat : OV.step === 5 ? OV.uji : null) : OV && OV.kind === 'quiz' ? OV : null);
const ACT = {
  noop() {},
  tab(d) { if (!TABS.some((t) => t[0] === d.tab)) return; UI.tab = d.tab; closeSheet(true); if (location.hash !== '#' + d.tab) location.hash = d.tab; renderAll(); $('#main').scrollTop = 0; },
  peta(d) { UI.peta = d.k; UI.tab = 'peta'; closeSheet(true); if (location.hash !== '#peta') location.hash = 'peta'; renderAll(); $('#main').scrollTop = 0; },
  atom(d) { openSheet('atom', { id: d.id }); },
  belajar(d) { startLesson(d.id); },
  ulasan(d) { startUlasan(d.id || null); },
  drill(d) { startDrill(d.s); },
  'lat-sub'(d) { UI.latSub = d.s; renderMain(); },
  tryout() { startTryout(); },
  'to-pilih'(d) { OV.ans[OV.i] = Number(d.i); OV.arm = false; renderOv(); },
  'to-go'(d) { toGo(Number(d.i)); },
  'to-kumpul'() { if (!OV.arm) { OV.arm = true; renderOv(); } else submitTryout(); },
  'to-keluar'() { if (OV.done) { closeOv(); return; } if (!OV.quitArm) { OV.quitArm = true; toast('Ketuk × sekali lagi untuk keluar. Jawaban tryout tidak disimpan.'); setTimeout(() => { if (OV) OV.quitArm = false; }, 3500); } else closeOv(); },
  'uji-salah'() { startSalah(); },
  'salah-buka'(d) { UI.salahOpen = UI.salahOpen === d.q ? null : d.q; renderMain(); },
  comeback() { startComeback(); },
  tempat(d) { startTempat(d.k); },
  lompat(d) { startLompat(d.id); },
  game(d) { startGame(d.g); },
  'game-tutup'() { stopTimer(); closeOv(); },
  'kata-key'(d) { kataKey(d.k); },
  'kata-salin'() { copyText(kataShare()); },
  'kata-kartu'() {
    const K = kataHariIni(); const id = 'ku-' + K.w.toLowerCase();
    if (S.kartuku.some((c) => c.id === id)) { toast('Kata ini sudah ada di Kartuku.'); return; }
    S.kartuku.push({ id, depan: K.w.toLowerCase(), belakang: K.arti, contoh: K.contoh }); save(); toast('Tersimpan ke Kartuku.');
  },
  'kel-pilih'(d) { const w = d.w; const i = OV.sel.indexOf(w); if (i >= 0) OV.sel.splice(i, 1); else if (OV.sel.length < 4) OV.sel.push(w); OV.msg = ''; OV.shake = false; renderOv(); },
  'kel-acak'() { const st = gs('kelompok'); st.order = shuffle(st.order); save(); renderOv(); },
  'kel-hapus'() { OV.sel = []; renderOv(); },
  'kel-kirim'() { kelKirim(); },
  'pola-pilih'(d) { const st = gs('pola'); if (st.ans.length > st.i) return; st.ans.push(Number(d.i)); save(); renderOv(); },
  'pola-lanjut'() { const st = gs('pola'); st.i += 1; if (st.i >= 3) gameFinish('pola', 10); else save(); renderOv(false); },
  'sp-mulai'() { sprintStart(); },
  'sp-jawab'(d) { sprintAns(d.v === '1'); },
  'rusak-pilih'(d) { const st = gs('rusak'); if (st.pick != null) return; st.pick = Number(d.i); const it = rusakHariIni()[st.i]; if (st.pick === (it.flip ? 1 : 0)) st.benar += 1; save(); renderOv(); },
  'rusak-lanjut'() { const st = gs('rusak'); st.i += 1; st.pick = null; if (st.i >= 5) gameFinish('rusak', 10); else save(); renderOv(false); },
  'ag-tebak'() { angkaTebak(false); },
  'ag-lanjut'() {
    const st = gs('angka'); st.i += 1; st.last = null;
    if (st.i >= 5) { gameFinish('angka', 10); renderOv(false); return; }
    save(); OV.t0 = Date.now(); renderOv(false); angkaTimer(); const inp = $('#ag-in'); if (inp) inp.focus();
  },
  'boss-pilih'(d) { if (gs('boss').done) return; OV.sel = Number(d.i); renderOv(); },
  'boss-cek'() { bossCek(); },
  pilih(d) { const t = curT(); if (!t || t.chk) return; t.sel = Number(d.i); renderOv(); },
  cek() { doCheck(); },
  lanjut() { doLanjut(); },
  hint() { const t = curT(); if (!t) return; t.hint = true; renderOv(); },
  'ls-next'() { lsNext(); },
  'ls-gaya'(d) { OV.gaya = d.g; if (!OV.tried.includes(d.g)) OV.tried.push(d.g); renderOv(); },
  'ls-lain'() {
    const ks = Object.keys(GAYA); const nx = ks.find((g) => !OV.tried.includes(g));
    if (nx) { OV.gaya = nx; OV.tried.push(nx); renderOv(); return; }
    if (AI.ok) { aiJelaskan(); return; }
    OV.gaya = ks[(ks.indexOf(OV.gaya) + 1) % ks.length]; renderOv();
  },
  'ls-ai'() { aiJelaskan(); },
  'ls-ws'() { OV.ws += 1; renderOv(); },
  'ls-ws-all'() { OV.ws = OV.L.contoh.langkah.length; renderOv(); },
  'rp-pilih'(d) { if (OV.rp.done) return; OV.rp.sel = Number(d.i); renderOv(); },
  'rp-cek'() { if (OV.rp.sel == null) return; OV.rp.done = true; renderOv(); },
  'ls-ulang'() { const id = OV.id; const tried = OV.tried.slice(); const nx = Object.keys(GAYA).find((g) => !tried.includes(g)) || Object.keys(GAYA)[(Object.keys(GAYA).indexOf(OV.gaya) + 1) % 4]; startLesson(id, nx); if (OV && OV.kind === 'lesson' && !OV.gen) { OV.tried = Array.from(new Set(tried.concat([nx]))); OV.step = 1; renderOv(false); } },
  lapor() { S.flags.push({ a: OV && OV.id, d: today() }); save(); toast('Terima kasih! Laporan disimpan untuk ditinjau guru.'); },
  'gen-stop'() { if (OV && OV.gen && OV.gen.ctl) OV.gen.ctl.abort(); else closeOv(); },
  'gen-ulang'() { if (OV) genLesson(OV.id); },
  'ov-close'() { closeOv(); },
  'onb-next'() {
    onbCollect();
    if (OV.step === 1 && !OV.d.nama) { const i = $('#ob-nama'); if (i) { i.focus(); i.classList.add('shake'); } toast('Tulis nama panggilanmu dulu, ya.'); return; }
    OV.step += 1; renderOv(false); if (OV.step === 1) { const i = $('#ob-nama'); if (i) i.focus(); }
  },
  'onb-back'() { onbCollect(); OV.step = Math.max(0, OV.step - 1); renderOv(false); },
  'ob-kelas'(d) { OV.d.kelas = Number(d.v); OV.d.targetXP = OV.d.kelas === 11 ? 20 : 40; renderOv(); },
  'ob-rate'(d) { OV.d.rate[d.s] = Number(d.v); renderOv(); },
  'ob-gaya'(d) { OV.d.gaya = d.v; renderOv(); },
  'ob-durasi'(d) { OV.d.durasi = Number(d.v); renderOv(); },
  'ob-xp'(d) { OV.d.targetXP = Number(d.v); renderOv(); },
  'ob-mulai'(d) { onbCollect(); OV.d.mulai = d.v; renderOv(); },
  'onb-selesai'() { finishOnb(); },
  demo() { loadDemo(); },
  'keluar-demo'() { startOnb(); },
  rate(d) { setSelf(d.s, Number(d.v)); },
  cekdiri() { openSheet('cekdiri'); },
  set() { openSheet('set'); },
  setopt(d) { const v = Number(d.v); S.set[d.k] = Number.isNaN(v) ? d.v : v; save(); renderSheet(); renderTop(); renderMain(); },
  'set-kelas'(d) { const k = Number(d.v); const old = S.profil.kelas; S.profil.kelas = k; if (S.profil.utbk === utbkDefault(old)) S.profil.utbk = utbkDefault(k); save(); renderSheet(); renderAll(); },
  'lompat-hari'() { S.demoOffset = (S.demoOffset || 0) + 1; lastDay = today(); onDayChange(); renderAll(); renderSheet(); flushToasts(); toast('Sekarang: ' + tglPanjang(today())); },
  'kembali-hari'() { S.demoOffset = 0; lastDay = today(); onDayChange(); renderAll(); renderSheet(); toast('Kembali ke hari ini.'); },
  reset() {
    if (!UI.resetArm) { UI.resetArm = true; renderSheet(); return; }
    UI.resetArm = false; S = fresh(); LOG = []; GEN = {}; S.savedAt = Date.now();
    lsDel('state'); lsDel('log'); lsDel('gen'); save('state', 'log', 'gen');
    closeSheet(true); renderAll(); startOnb();
  },
  'salin-ringkasan'() { copyText(ringkasan()); },
  'salin-json'() { copyText(JSON.stringify({ state: S, log: LOG.slice(-300) }, null, 1)); },
  'kartu-mulai'(d) { startFC(d.dek || null); },
  'kartu-simpan'() {
    const a = $('#kb-depan'), b = $('#kb-belakang'); const dp = a ? a.value.trim() : '', bl = b ? b.value.trim() : '';
    if (!dp || !bl) { toast('Isi depan dan belakang kartu dulu.'); return; }
    S.kartuku.push({ id: 'ku-' + Date.now().toString(36), depan: dp, belakang: bl }); save(); renderMain(); toast('Kartu tersimpan di Kartuku.');
  },
  'fc-flip'() { OV.flip = true; renderOv(); },
  'fc-rate'(d) { fcRate(Number(d.g)); },
  chat(d) { openChat(d.ctx, d.foto === '1'); },
  'chat-kirim'() { const ta = $('#chat-ta'); if (!ta) return; const v = ta.value; if (!v.trim()) return; ta.value = ''; chatSend(v); },
  'chat-stop'() { if (CHAT.ctl) CHAT.ctl.abort(); },
  'chat-chip'(d) { chatSend(d.t); },
  'chat-foto'() { const f = $('#chat-file'); if (f) f.click(); },
  'chat-ctx-clear'() { CHAT.ctx = null; renderSheet(); },
  'tangga-baru'() { openSheet('tangga', { dec: {} }); },
  'tb-contoh'(d) { const t = $('#tb-topik'); if (t) t.value = d.t; },
  pecah() { pecahTopik(); },
  'pecah-stop'() { if (SH && SH.dec && SH.dec.ctl) SH.dec.ctl.abort(); },
  'simpan-tangga'() { simpanTangga(); },
  'hapus-tangga'(d) {
    if (UI.hapusArm !== d.k) { UI.hapusArm = d.k; renderMain(); return; }
    const k = S.kustom.find((x) => x.id === d.k); UI.hapusArm = null;
    if (k) { for (const a of k.atoms) { delete S.atom[a.id]; delete GEN[a.id]; delete ATOM[a.id]; delete AQ[a.id]; } }
    S.kustom = S.kustom.filter((x) => x.id !== d.k); delete TANGGA[d.k];
    for (const id of Object.keys(QB)) if (id.startsWith(d.k + '-')) delete QB[id];
    UI.peta = S.fokus; save('state', 'gen'); renderAll(); toast('Tangga dihapus.');
  },
  'sheet-close'() { closeSheet(); },
  cadangkan() { downloadBackup(); },
  ingat(d) { setPengingat(d.v); },
  'ingat-nanti'() { S.set.ingatTanya = true; save(); renderMain(); },
  pulihkan() { const f = $('#restore-file'); if (f) f.click(); },
  'pulih-ya'() {
    if (!SH || !SH.data) return;
    const d = SH.data; applyBackup(d);
    closeSheet(true);
    afterLoad(); lastDay = today(); onDayChange(); renderAll(); askPersist();
    toast(`Progres ${firstName()} dipulihkan. Selamat datang kembali!`); flushToasts();
  },
  async pasang() {
    const ev = INSTALL.evt; if (!ev) return;
    INSTALL.evt = null;
    try { ev.prompt(); const r = await ev.userChoice; if (r && r.outcome === 'accepted') INSTALL.done = true; } catch (e) { /* abaikan */ }
    renderMain();
  },
};

Object.assign(ACT, ACT_MT, { 'mt-dari-ls'() { const cur = OV; openMateri(cur.id, { ret: cur }); } });

/* ---------- cadangan ke file ---------- */
async function downloadBackup() {
  const blob = backupBlob(); const name = backupName();
  const done = (msg) => { S.cadangan = today(); save(); renderAll(); if (SH) renderSheet(); toast(msg); };
  if (NATIVE) {
    try { if (await nativeShareBackup(blob, name)) done('Cadangan siap. Simpan di tempat yang aman.'); }
    catch (e) { toast('Cadangan gagal dibuat. Coba lagi.', 'warn'); }
    return;
  }
  /* Di aplikasi terpasang (terutama iPhone), unduhan file sering diblokir — pakai lembar Bagikan. */
  if (isStandalone() && navigator.canShare && typeof File === 'function') {
    try {
      const file = new File([blob], name, { type: 'application/json' });
      if (navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: 'Cadangan Tangga' }); done('Cadangan siap. Simpan di tempat yang aman.'); return; }
    } catch (e) { if (e && e.name === 'AbortError') return; }
  }
  try {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = name; a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    done('Cadangan diunduh: ' + name);
  } catch (e) { toast('Cadangan tidak bisa diunduh di tampilan ini.', 'warn'); }
}
function readBackupFile(f) {
  if (f.size > 8e6) { toast('File ini terlalu besar untuk cadangan Tangga.', 'warn'); return; }
  const r = new FileReader();
  r.onload = () => { const res = parseBackup(String(r.result || '')); if (!res.ok) { toast(res.alasan, 'warn'); return; } openSheet('pulih', { data: res.data }); };
  r.onerror = () => toast('File tidak bisa dibaca.', 'warn');
  r.readAsText(f);
}

/* ---------- peristiwa ---------- */
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el || el.disabled) return;
  const fn = ACT[el.dataset.act]; if (!fn) return;
  e.preventDefault();
  fn(el.dataset, el, e);
});
document.addEventListener('change', (e) => {
  const el = e.target;
  if (el.id === 'restore-file') { const f = el.files && el.files[0]; el.value = ''; if (f) readBackupFile(f); return; }
  if (el.id === 'chat-file' && el.files && el.files[0]) { const f = el.files[0]; const ta = $('#chat-ta'); const v = ta ? ta.value : ''; if (ta) ta.value = ''; chatSend(v, [f]); el.value = ''; return; }
  if (el.id === 'ob-tempat' && OV && OV.d) { OV.d.tempat = el.checked; return; }
  const b = el.dataset.bind; if (!b) return;
  const [o, k] = b.split('.');
  let v = el.type === 'range' ? Number(el.value) : el.value;
  if (k === 'nama') { v = String(v).trim().slice(0, 30); if (!v) return; }
  if (k === 'utbk' && !/^\d{4}-\d{2}-\d{2}$/.test(v)) return;
  S[o][k] = v; save(); renderTop(); renderMain();
});
document.addEventListener('input', (e) => {
  const el = e.target;
  if (el.id === 'f-target') { const o = $('#f-target-v'); if (o) o.textContent = el.value; }
  if (el.id === 'ob-target') { const o = $('#ob-target-v'); if (o) o.textContent = el.value; if (OV && OV.d) OV.d.target = Number(el.value); }
  if (el.id === 'chat-ta') { el.style.height = 'auto'; el.style.height = Math.min(140, el.scrollHeight) + 'px'; }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { if (SH) { closeSheet(); e.preventDefault(); } return; }
  if (SH && SH.kind === 'chat' && e.target.id === 'chat-ta' && e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ACT['chat-kirim']({}); return; }
  if (!OV || SH) return;
  const tag = (e.target.tagName || '').toLowerCase(); const typing = tag === 'input' || tag === 'textarea';
  if (OV.kind === 'game' && OV.g === 'kata' && !typing) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Enter') { e.preventDefault(); kataKey('ENTER'); }
    else if (e.key === 'Backspace') { e.preventDefault(); kataKey('DEL'); }
    else if (/^[a-zA-Z]$/.test(e.key)) kataKey(e.key.toUpperCase());
    return;
  }
  if (OV.kind === 'game' && OV.g === 'sprint' && OV.run && !OV.run.end) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); sprintAns(false); }
    if (e.key === 'ArrowRight') { e.preventDefault(); sprintAns(true); }
    return;
  }
  if (!typing && /^[1-5]$/.test(e.key)) { const b = document.querySelector(`#ov .opts [data-i="${Number(e.key) - 1}"]:not([disabled])`); if (b) { e.preventDefault(); b.click(); } return; }
  if (e.key === 'Enter' && !e.shiftKey && tag !== 'button' && tag !== 'textarea') { const p = document.querySelector('#ov [data-primary]:not([disabled])'); if (p) { e.preventDefault(); p.click(); } }
});
function fromHash() { const h = location.hash.replace('#', ''); if (TABS.some((t) => t[0] === h)) UI.tab = h; }
window.addEventListener('hashchange', () => { const before = UI.tab; fromHash(); if (UI.tab !== before) renderAll(); });

let lastDay = null;
function checkDay() { if (!S.onboarded) return; const t = today(); if (t !== lastDay) { lastDay = t; onDayChange(); renderAll(); flushToasts(); } }
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flushPending(); else checkDay(); });
window.addEventListener('pagehide', flushPending);
setInterval(checkDay, 60000);

/* ---------- versi gratis: bisa dipasang & jalan luring ---------- */
function initPWA() {
  if (IN_CLAUDE || NATIVE) return;
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); INSTALL.evt = e; if (S.onboarded && UI.tab === 'beranda') renderMain(); });
  window.addEventListener('appinstalled', () => { INSTALL.done = true; INSTALL.evt = null; if (S.onboarded) renderMain(); });
  const aman = location.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(location.hostname);
  if ('serviceWorker' in navigator && aman) window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => { /* tetap jalan tanpa mode luring */ }); });
}
/* Minta browser tidak menghapus data Tangga saat memori penuh. */
function askPersist() {
  if (IN_CLAUDE || NATIVE || !S.onboarded || S.demo) return;
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persisted().then((p) => p || navigator.storage.persist()).catch(() => {}); } catch (e) { /* abaikan */ }
}

/* ---------- penyalaan ---------- */
function afterLoad() {
  registerCustom(); registerGen();
  if (S.onboarded && OV && OV.kind === 'onb') { OV = null; renderOv(); }
}
function boot(hot) {
  initBank();
  const ls = lsGet('state'); if (ls) S = migrate(ls);
  const ll = lsGet('log'); if (Array.isArray(ll)) LOG = ll;
  const lg = lsGet('gen'); if (lg && typeof lg === 'object') GEN = lg;
  afterLoad();
  fromHash(); if (hot && hot.tab && TABS.some((t) => t[0] === hot.tab)) UI.tab = hot.tab;
  if (S.onboarded) { lastDay = today(); onDayChange(); }
  initPWA(); askPersist();
  renderAll();
  nativeInit();
  if (!S.onboarded) startOnb();
  flushToasts();
  initAI(); initCloud();
  const H = window.claude && window.claude.hot;
  if (H && typeof H.snapshot === 'function') H.snapshot(() => ({ tab: UI.tab }));
}
(function start() {
  const H = window.claude && window.claude.hot;
  if (H && typeof H.ready === 'function') H.ready(boot);
  else boot((H && H.data) || {});
})();
