'use strict';
/* =====================================================================
   Tangga — koneksi ke server Tangga (opsional, alamatnya di config.js).
   - Kak Tangga lewat server (Claude), dengan jatah harian per perangkat
   - Laporan soal keliru & masukan (disimpan dulu kalau sedang luring)
   - Hitungan pengguna harian yang anonim (sekali sehari)
   Tanpa server, semua fitur lain tetap jalan seperti biasa.
   ===================================================================== */

const CFG = window.TANGGA_CONFIG || {};
const API = String(CFG.api || '').trim().replace(/\/+$/, '');
const APP_V = String(CFG.versi || '');
const SRV = { on: !!API && !IN_CLAUDE, ai: false, imgs: false, left: null, limit: null };

/* ---------- identitas perangkat: acak, tidak terkait nama atau akun ---------- */
const DEV_KEY = 'tangga.dev.v1';
function deviceId() {
  let id = null;
  try { id = localStorage.getItem(DEV_KEY); } catch (e) { /* abaikan */ }
  if (!id || !/^[A-Za-z0-9_-]{8,64}$/.test(id)) {
    const r = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    id = r.replace(/[^A-Za-z0-9]/g, '').slice(0, 32);
    try { localStorage.setItem(DEV_KEY, id); } catch (e) { /* abaikan */ }
  }
  return id;
}
const platformOf = () => (typeof NATIVE !== 'undefined' && NATIVE ? 'android' : 'web');

/* POST memakai text/plain supaya tidak perlu permintaan "preflight" — lebih cepat di sinyal lemah */
async function srvFetch(path, opt, ms) {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), ms || 12000);
  try { return await fetch(API + path, Object.assign({ cache: 'no-store' }, opt || {}, { signal: ctl.signal })); }
  finally { clearTimeout(t); }
}
const postBody = (o) => ({ method: 'POST', headers: { 'Content-Type': 'text/plain;charset=UTF-8' }, body: JSON.stringify(o) });

async function srvStatus() {
  if (!SRV.on) return false;
  try {
    const r = await srvFetch('/v1/status?d=' + encodeURIComponent(deviceId()), {}, 8000);
    if (!r.ok) return false;
    const j = await r.json();
    SRV.ai = !!j.ai; SRV.imgs = !!j.images; SRV.left = j.left; SRV.limit = j.limit;
    return true;
  } catch (e) { return false; }
}

/* ---------- hitungan pengguna harian (anonim) ---------- */
const PING_KEY = 'tangga.ping.v1';
async function srvPing() {
  if (!SRV.on || !S.onboarded || S.demo) return;
  const t = keyOf(new Date());
  try { if (localStorage.getItem(PING_KEY) === t) return; } catch (e) { return; }
  try {
    const r = await srvFetch('/v1/ping', postBody({ d: deviceId(), v: APP_V, p: platformOf(), k: S.profil.kelas }), 8000);
    if (r.ok) localStorage.setItem(PING_KEY, t);
  } catch (e) { /* coba lagi lain kali */ }
}

/* ---------- laporan & masukan: kirim sekarang, atau simpan dulu ---------- */
const OUTBOX_KEY = 'tangga.outbox.v1';
function outbox() { try { const a = JSON.parse(localStorage.getItem(OUTBOX_KEY) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
function setOutbox(a) { try { localStorage.setItem(OUTBOX_KEY, JSON.stringify(a.slice(-50))); } catch (e) { /* penuh */ } }
async function postLapor(item) {
  try {
    const r = await srvFetch('/v1/lapor', postBody(item), 10000);
    return r.ok || r.status === 400;   // 400 = isinya ditolak; jangan dicoba terus-menerus
  } catch (e) { return false; }
}
/* hasil: 'terkirim' | 'antre' (server ada, sedang luring) | 'simpan' (server belum dipasang) */
async function kirimLaporan(row) {
  const item = Object.assign({ d: deviceId(), v: APP_V, p: platformOf(), t: Date.now() }, row);
  if (SRV.on && await postLapor(item)) return 'terkirim';
  setOutbox(outbox().concat([item]));
  return SRV.on ? 'antre' : 'simpan';
}
let outboxBusy = false;
async function flushOutbox() {
  if (!SRV.on || outboxBusy) return;
  const box = outbox(); if (!box.length) return;
  outboxBusy = true;
  try {
    const rest = [];
    for (const it of box) { if (!(await postLapor(it))) rest.push(it); }
    setOutbox(rest.concat(outbox().slice(box.length)));
  } finally { outboxBusy = false; }
}

/* ---------- Kak Tangga lewat server: meniru antarmuka `sample` milik Claude ---------- */
function parseJSONLoose(t) {
  const s = String(t || '').replace(/```(?:json)?/gi, '');
  const a = s.indexOf('{'); const b = s.lastIndexOf('}');
  if (a < 0 || b <= a) return null;
  try { return JSON.parse(s.slice(a, b + 1)); } catch (e) { return null; }
}
/* foto soal diperkecil dulu (maks. 1280 px, JPEG) supaya hemat kuota data dan biaya */
async function fotoKecil(file) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => rej(new Error('gambar')); im.src = url; });
    const sc = Math.min(1, 1280 / Math.max(img.naturalWidth, img.naturalHeight));
    const w = Math.max(1, Math.round(img.naturalWidth * sc)); const h = Math.max(1, Math.round(img.naturalHeight * sc));
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    c.getContext('2d').drawImage(img, 0, 0, w, h);
    let q = 0.8; let data = c.toDataURL('image/jpeg', q);
    while (data.length > 680000 && q > 0.35) { q -= 0.15; data = c.toDataURL('image/jpeg', q); }
    return { type: 'image/jpeg', data: data.split(',')[1] };
  } catch (e) { throw { code: 'image_rejected' }; }
  finally { URL.revokeObjectURL(url); }
}
function srvSampler() {
  async function call(payload, opts) {
    let res;
    try {
      res = await fetch(API + '/v1/ai', Object.assign(postBody(payload), { signal: opts && opts.signal, cache: 'no-store' }));
    } catch (e) {
      if (e && e.name === 'AbortError') throw { code: 'cancelled' };
      throw { code: navigator.onLine === false ? 'offline' : 'unavailable' };
    }
    if (!res.ok) {
      let j = null; try { j = await res.json(); } catch (e) { /* bukan JSON */ }
      if (j && typeof j.left === 'number') SRV.left = j.left;
      throw { code: (j && j.error && j.error.code) || 'unavailable' };
    }
    return res;
  }
  async function readStream(res, onText, signal) {
    const rd = res.body.getReader(); const dec = new TextDecoder();
    let buf = ''; let text = ''; let end = null; let err = null;
    for (;;) {
      let part;
      try { part = await rd.read(); } catch (e) { throw { code: signal && signal.aborted ? 'cancelled' : 'unavailable', text }; }
      if (part.done) break;
      buf += dec.decode(part.value, { stream: true });
      let i;
      while ((i = buf.indexOf('\n\n')) >= 0) {
        const line = buf.slice(0, i); buf = buf.slice(i + 2);
        if (!line.startsWith('data: ')) continue;
        let ev; try { ev = JSON.parse(line.slice(6)); } catch (e) { continue; }
        if (typeof ev.d === 'string') { text += ev.d; if (onText) onText({ text }); }
        else if (ev.end) end = ev;
        else if (ev.err) err = ev.err;
      }
    }
    if (end && typeof end.left === 'number') SRV.left = end.left;
    if (err) throw { code: err, text };
    if (end && end.stop === 'refusal' && !text) throw { code: 'refused' };
    if (!text) throw { code: 'empty_completion' };
    return { text, truncated: !!(end && end.stop === 'max_tokens') };
  }
  const s = async (input, opts) => {
    opts = opts || {};
    const messages = typeof input === 'string' ? [{ role: 'user', content: input }] : input.map((m) => ({ role: m.role, content: String(m.content || '') }));
    const payload = { d: deviceId(), mode: 'text', stream: true, system: opts.system || '', messages };
    if (opts.images && opts.images[0]) payload.image = await fotoKecil(opts.images[0]);
    const res = await call(payload, opts);
    return readStream(res, opts.onText, opts.signal);
  };
  s.json = async (prompt, opts) => {
    const res = await call({ d: deviceId(), mode: 'json', messages: [{ role: 'user', content: prompt }] }, opts || {});
    const j = await res.json();
    if (typeof j.left === 'number') SRV.left = j.left;
    const obj = parseJSONLoose(j.text);
    if (!obj) throw { code: 'invalid_json' };
    return obj;
  };
  s.limits = async () => ({ images: SRV.imgs ? { mediaTypes: ['image/jpeg', 'image/png', 'image/webp'] } : null });
  return s;
}

/* dipanggil saat aplikasi menyala dan setiap kali kembali dibuka */
function serverTick() {
  if (!SRV.on) return;
  flushOutbox(); srvPing();
}
