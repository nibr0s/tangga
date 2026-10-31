'use strict';
/* =====================================================================
   Tangga — mesin gambar materi.
   Setiap gambar dibuat dari data kecil menjadi SVG langsung di HP:
   tidak perlu internet, ukurannya hampir nol, tajam di layar apa pun,
   dan ikut berganti warna di mode gelap.
   Pakai: figure({ t: 'pie', items: [{ n: 4, k: 1, t: '1/4' }], cap: '...' })
   ===================================================================== */

const FG = {};
const fx = (n) => Math.round(n * 10) / 10;
const fT = (x, y, s, cls = 'fg-t', anchor = 'middle') => `<text x="${fx(x)}" y="${fx(y)}" class="${cls}" text-anchor="${anchor}">${fRich(s)}</text>`;
/* teks dalam gambar: ==kata== → disorot stabilo, **kata** → tebal */
function fRich(s) {
  return esc(s).replace(/==(.+?)==/g, '<tspan class="fg-hl">$1</tspan>').replace(/\*\*(.+?)\*\*/g, '<tspan class="fg-b">$1</tspan>');
}
function fWrap(s, max) {
  const words = String(s).split(/\s+/); const out = []; let cur = '';
  for (const w of words) {
    const plain = (cur ? cur + ' ' : '') + w;
    if (plain.replace(/==|\*\*/g, '').length > max && cur) { out.push(cur); cur = w; } else cur = plain;
  }
  if (cur) out.push(cur);
  return out;
}
/* tutup penanda ==/** yang terpotong di antara baris */
function fFix(lines) {
  const st = { '==': false, '**': false };
  return lines.map((l) => {
    let x = l;
    for (const m of ['==', '**']) {
      if (st[m]) x = m + x;
      const n = x.split(m).length - 1;
      if (n % 2) { x += m; st[m] = true; } else st[m] = false;
    }
    return x;
  });
}
const fTW = (x, y, s, max, lh = 16, cls = 'fg-t', anchor = 'middle') => fFix(fWrap(s, max)).map((l, i) => fT(x, y + i * lh, l, cls, anchor)).join('');
const fLines = (s, max) => fWrap(s, max).length;
const fSvg = (w, h, body, label) => `<svg viewBox="0 0 ${fx(w)} ${fx(h)}" role="img" aria-label="${esc(label || '')}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
const fRect = (x, y, w, h, cls = 'fg-off', r = 0) => `<rect x="${fx(x)}" y="${fx(y)}" width="${fx(w)}" height="${fx(h)}" rx="${r}" class="${cls}"/>`;
const fLine = (x1, y1, x2, y2, cls = 'fg-line') => `<line x1="${fx(x1)}" y1="${fx(y1)}" x2="${fx(x2)}" y2="${fx(y2)}" class="${cls}"/>`;
const fArrow = (x1, y1, x2, y2, cls = 'fg-line') => {
  const a = Math.atan2(y2 - y1, x2 - x1), L = 8;
  const p1 = [x2 - L * Math.cos(a - 0.45), y2 - L * Math.sin(a - 0.45)], p2 = [x2 - L * Math.cos(a + 0.45), y2 - L * Math.sin(a + 0.45)];
  return `<path d="M${fx(x1)} ${fx(y1)}L${fx(x2)} ${fx(y2)}M${fx(p1[0])} ${fx(p1[1])}L${fx(x2)} ${fx(y2)}L${fx(p2[0])} ${fx(p2[1])}" class="${cls}"/>`;
};
const CW = 7.3;   // perkiraan lebar satu huruf (13px)
const CWB = 8.2;  // huruf tebal 14px
/* lebar teks: diukur sungguhan dengan kanvas kalau hurufnya sudah termuat, kalau belum diperkirakan */
const FW_SPEC = { 'fg-t': '600 13px', 'fg-tm': '600 13px', 'fg-tb': '800 14px', 'fg-ts': '600 11.5px', 'fg-tw': '800 13px', 'fg-h': '700 16px' };
const fWC = {}; let fCx = null;
const fW = (t, cls = 'fg-t') => {
  const s = String(t).replace(/==|\*\*/g, '');
  const font = (FW_SPEC[cls] || FW_SPEC['fg-t']) + (cls === 'fg-h' ? ' Kalam' : ' "Plus Jakarta Sans"'); const key = font + '|' + s;
  if (fWC[key] != null) return fWC[key];
  try {
    if (typeof document !== 'undefined' && document.fonts && document.fonts.check(font)) {
      fCx = fCx || document.createElement('canvas').getContext('2d'); fCx.font = font;
      return (fWC[key] = fCx.measureText(s).width);
    }
  } catch (e) { /* pakai perkiraan */ }
  return s.length * (cls === 'fg-tb' ? CWB : cls === 'fg-ts' ? 6.4 : cls === 'fg-h' ? 7.6 : CW);
};
/* teks di dalam kotak sempit: kecilkan dulu, kalau masih tidak muat jangan ditulis */
const fFit = (x, y, t, w, cls = 'fg-t') => (fW(t, cls) <= w - 6 ? fT(x, y, t, cls) : fW(t, 'fg-ts') <= w - 4 ? fT(x, y - 1, t, 'fg-ts') : '');
const fCls = (c) => ({ on: 'fg-on', mark: 'fg-on2', ok: 'fg-ok', no: 'fg-no', off: 'fg-off', box: 'fg-box', pen: 'fg-pen' }[c] || c || 'fg-off');

/* ---------- ikon kecil untuk gambar (kotak 24×24) ---------- */
const FIC = {
  rain: '<path d="M7 14a4.5 4.5 0 1 1 1.6-8.7A5.5 5.5 0 0 1 19 8.5a3.5 3.5 0 0 1-1 6.9H7z"/><path d="M8 18l-1 3M12.5 18l-1 3M17 18l-1 3"/>',
  road: '<path d="M8 3 4 21M16 3l4 18M12 4v3M12 10v3M12 16v3"/>',
  umbrella: '<path d="M3 12a9 9 0 0 1 18 0z"/><path d="M12 12v6.5a2 2 0 0 1-4 0"/>',
  search: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5.5 5.5"/>',
  news: '<rect x="3.5" y="4.5" width="17" height="15" rx="1.5"/><path d="M7 8.5h10M7 12h10M7 15.5h6"/>',
  mega: '<path d="M4 10v4h3l7 4V6L7 10z"/><path d="M17.5 9.5a3.5 3.5 0 0 1 0 5"/>',
  smile: '<circle cx="12" cy="12" r="8.5"/><path d="M8.5 14a4 4 0 0 0 7 0M9 9.5h.01M15 9.5h.01"/>',
  frown: '<circle cx="12" cy="12" r="8.5"/><path d="M8.5 16a4 4 0 0 1 7 0M9 9.5h.01M15 9.5h.01"/>',
  meh: '<circle cx="12" cy="12" r="8.5"/><path d="M8.5 15h7M9 9.5h.01M15 9.5h.01"/>',
  film: '<rect x="3.5" y="5" width="17" height="14" rx="1.5"/><path d="M7.5 5v14M16.5 5v14M3.5 9.5h4M3.5 14.5h4M16.5 9.5h4M16.5 14.5h4"/>',
  key: '<circle cx="8" cy="12" r="4"/><path d="M12 12h9M18 12v3M21 12v2"/>',
  door: '<path d="M6 21V3.5h12V21M4 21h16"/><path d="M14.5 12.5h.01"/>',
  cake: '<path d="M4 11h16v9H4z"/><path d="M4 15c2 1.5 4 1.5 6 0s4-1.5 6 0 3 1 4 0"/><path d="M12 11V7M12 5.5v-1"/>',
  coin: '<circle cx="12" cy="12" r="8.5"/><path d="M14.5 9.2c-.5-.9-1.5-1.2-2.5-1.2-1.6 0-2.7.8-2.7 2s1.3 1.7 2.7 2c1.5.3 2.8.8 2.8 2.1s-1.2 2.1-2.8 2.1c-1.2 0-2.2-.5-2.6-1.3M12 6.5v1.5M12 16v1.5"/>',
  person: '<circle cx="12" cy="7" r="3.5"/><path d="M5 21v-1.5a7 7 0 0 1 14 0V21"/>',
  house: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10"/><path d="M10 20v-5h4v5"/>',
  bulb: '<path d="M9 17.5h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3z"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  book: '<path d="M4 5h6a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4z"/><path d="M20 5h-6a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6z"/>',
  chart: '<path d="M4 4v16h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  dice: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.5 8.5h.01M15.5 8.5h.01M12 12h.01M8.5 15.5h.01M15.5 15.5h.01"/>',
  map: '<path d="M3.5 6.5 9 4l6 2.5 5.5-2.5v13.5L15 20l-6-2.5-5.5 2.5z"/><path d="M9 4v13.5M15 6.5V20"/>',
  scale: '<path d="M12 4v16M7 20h10M5 8h14"/><path d="M5 8l-2.5 6a2.5 2.5 0 0 0 5 0zM19 8l-2.5 6a2.5 2.5 0 0 0 5 0z"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
  warn: '<path d="M12 3.5 21.5 20h-19z"/><path d="M12 10v4.5M12 17.5h.01"/>',
  pen: '<path d="M4 20l1-4L16 5l3 3L8 19z"/><path d="M14 7l3 3"/>',
  q: '<circle cx="12" cy="12" r="8.5"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 16.5h.01"/>',
  plant: '<path d="M12 21v-9"/><path d="M12 12c0-4 3-6.5 7-6.5 0 4-3 6.5-7 6.5zM12 15c0-3-2.5-5-6-5 0 3 2.5 5 6 5z"/><path d="M7 21h10"/>',
  water: '<path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5z"/>',
  phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  bus: '<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M4 11h16M7.5 20v-3M16.5 20v-3M7.5 14h.01M16.5 14h.01"/>',
  fish: '<path d="M3 12c3-4.5 9-6 14 0-5 6-11 4.5-14 0z"/><path d="M17 12l4-3v6zM8 11h.01"/>',
  line: '<path d="M4 4v16h16"/><path d="M7 15l4-5 3 3 5-6"/>',
  pie: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5V12h8.5"/>',
};
const fIcon = (n, x, y, s = 1, cls = 'fg-ic') => `<g transform="translate(${fx(x)} ${fx(y)}) scale(${s})" class="${cls}">${FIC[n] || FIC.q}</g>`;

/* ---------- 1. kue/lingkaran pecahan ---------- */
FG.pie = (o) => {
  const items = o.items || [o]; const r = o.r || 46; const cell = r * 2 + 34;
  const W = Math.max(items.length * cell, 220); const H = r * 2 + (items.some((i) => i.t) ? 40 : 14); const x0 = (W - items.length * cell) / 2;
  let b = '';
  items.forEach((it, j) => {
    const cx = x0 + j * cell + cell / 2, cy = r + 7; const n = Math.max(1, it.n);
    const on = (i) => (Array.isArray(it.on) ? it.on.includes(i) : i < (it.k || 0));
    if (n === 1) b += `<circle cx="${fx(cx)}" cy="${fx(cy)}" r="${r}" class="${on(0) ? fCls(it.c || 'on') : 'fg-off'}"/>`;
    else for (let i = 0; i < n; i++) {
      const a0 = -Math.PI / 2 + (i * 2 * Math.PI) / n, a1 = a0 + (2 * Math.PI) / n;
      const p0 = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)], p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)];
      b += `<path d="M${fx(cx)} ${fx(cy)}L${fx(p0[0])} ${fx(p0[1])}A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${fx(p1[0])} ${fx(p1[1])}Z" class="${on(i) ? fCls(it.c || 'on') : 'fg-off'}"/>`;
    }
    if (it.t) b += fT(cx, cy + r + 25, it.t, 'fg-tb');
  });
  return fSvg(W, H, b, o.alt);
};

/* ---------- 2. pita pecahan (bertumpuk, untuk pecahan senilai) ---------- */
FG.strips = (o) => {
  const rows = o.rows; const W = 340; const lw = rows.some((r) => r.t) ? 62 : 6; const bw = W - lw - 8; const rh = o.h || 30, gap = 10;
  let b = ''; rows.forEach((r, j) => {
    const y = 6 + j * (rh + gap); const cw = (bw * (r.span || 1)) / r.n;
    if (r.t) b += fT(lw - 10, y + rh / 2 + 5, r.t, 'fg-tb', 'end');
    for (let i = 0; i < r.n; i++) {
      const on = Array.isArray(r.on) ? r.on.includes(i) : i < (r.k || 0);
      b += fRect(lw + i * cw, y, cw, rh, on ? fCls(r.c || 'on') : 'fg-off');
      if (r.lab) b += fFit(lw + i * cw + cw / 2, y + rh / 2 + 5, Array.isArray(r.lab) ? (r.lab[i] || '') : r.lab, cw, 'fg-t');
    }
  });
  return fSvg(W, rows.length * (rh + gap) + 4, b, o.alt);
};

/* ---------- 3. garis bilangan ---------- */
FG.numline = (o) => {
  const W = 340, pad = 26; const min = o.min, max = o.max; const X = (v) => pad + ((v - min) / (max - min)) * (W - 2 * pad);
  const hasTop = (o.marks || []).some((m) => m.t); const y = hasTop ? 58 : 30; const H = y + 40 + (o.under ? 18 : 0);
  let b = fLine(pad - 10, y, W - pad + 10, y) + fArrow(W - pad, y, W - pad + 14, y);
  const n = Math.round((max - min) / o.step);
  for (let i = 0; i <= n; i++) {
    const v = min + i * o.step; const x = X(v);
    b += fLine(x, y - 7, x, y + 7);
    const lab = o.tl ? o.tl[i] : (o.labels === false ? '' : String(Math.round(v * 1000) / 1000).replace('.', ','));
    if (lab !== '' && lab != null) b += fT(x, y + 24, lab, 'fg-t');
  }
  (o.marks || []).forEach((m, j) => {
    const x = X(m.v);
    b += `<circle cx="${fx(x)}" cy="${y}" r="6.5" class="${m.hi ? 'fg-on2' : 'fg-pen'}"/>`;
    if (m.t) b += fT(x, y - 16 - ((o.stagger && j % 2) ? 16 : 0), m.t, 'fg-h');
  });
  (o.spans || []).forEach((s) => { const x1 = X(s.a), x2 = X(s.b); b += `<path d="M${fx(x1)} ${y - 4}Q${fx((x1 + x2) / 2)} ${y - 34} ${fx(x2)} ${y - 4}" class="fg-pline"/>` + fArrow(x2 - 6, y - 12, x2, y - 4, 'fg-pline') + (s.t ? fT((x1 + x2) / 2, y - 30, s.t, 'fg-h') : ''); });
  if (o.under) b += fT(W / 2, H - 4, o.under, 'fg-ts');
  return fSvg(W, H, b, o.alt);
};

/* ---------- 4. kotak seratus (persen) ---------- */
FG.grid = (o) => {
  const rows = o.rows || 10, cols = o.cols || 10; const s = o.s || (rows === 1 ? 30 : 18); const W = Math.max(cols * s + 4, 200); const x0 = (W - cols * s) / 2;
  let b = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const i = r * cols + c; const cls = i < (o.k || 0) ? fCls(o.c || 'on') : (i < (o.k || 0) + (o.k2 || 0) ? 'fg-on2' : 'fg-off');
    b += fRect(x0 + c * s, 2 + r * s, s, s, cls);
  }
  return fSvg(W, rows * s + 4, b, o.alt);
};

/* ---------- 5. model batang (ala Singapura) ---------- */
FG.barmodel = (o) => {
  const W = 340; const bars = o.bars; const lw = bars.some((b) => b.l) ? 86 : 6; const bw = W - lw - 8; const rh = 34;
  const tot = (b) => b.segs.reduce((s, x) => s + x.w, 0); const M = o.same === false ? null : Math.max(...bars.map(tot));
  let y = 4; let b = '';
  bars.forEach((bar) => {
    const T = M || tot(bar);
    if (bar.tot) { y += 22; }
    let x = lw;
    if (bar.l) b += fTW(lw - 8, y + rh / 2 + 5 - (fLines(bar.l, 10) - 1) * 7, bar.l, 10, 14, 'fg-tb', 'end');
    const x0 = x;
    bar.segs.forEach((s) => {
      const w = (s.w / T) * bw;
      b += fRect(x, y, w, rh, s.q ? 'fg-q' : fCls(s.c || (s.hi ? 'on' : 'off')));
      if (s.t || s.q) b += s.q ? fT(x + w / 2, y + rh / 2 + 5, s.t || '?', fW(s.t || '?', 'fg-h') <= w - 6 ? 'fg-h' : 'fg-ts') : fFit(x + w / 2, y + rh / 2 + 5, s.t, w, 'fg-t');
      x += w;
    });
    if (bar.tot) {
      const x1 = x0, x2 = x; const yy = y - 6;
      b += `<path d="M${fx(x1)} ${yy + 4}V${yy}H${fx(x2)}V${yy + 4}" class="fg-line"/>` + fT((x1 + x2) / 2, yy - 6, bar.tot, 'fg-h');
    }
    if (bar.under) { b += fT(lw + bw / 2, y + rh + 17, bar.under, 'fg-ts'); y += 14; }
    y += rh + 12;
  });
  return fSvg(W, y, b, o.alt);
};

/* ---------- 6. mesin (masuk → proses → keluar) ---------- */
FG.machine = (o) => {
  /* maksimal 3 nilai per baris: nilai → proses → nilai → proses → nilai */
  const st = o.steps; const nv = Math.ceil(st.length / 2); const W = 340; const ow = nv > 2 ? 64 : 92; const bw = Math.min(96, (W - (nv - 1) * ow) / nv); const bh = 40; const y = 22;
  const x0 = (W - (nv * bw + (nv - 1) * ow)) / 2; let x = x0; let b = '';
  st.forEach((s, i) => {
    if (i % 2 === 0) { b += fRect(x, y, bw, bh, (o.hi || []).includes(i) ? 'fg-on2' : 'fg-box', 10) + fT(x + bw / 2, y + bh / 2 + 5, s, 'fg-tb'); x += bw; }
    else { const pw = Math.max(40, fW(s, 'fg-tb') + 16); b += fArrow(x + 4, y + bh / 2, x + ow - 4, y + bh / 2) + `<rect x="${fx(x + ow / 2 - pw / 2)}" y="${y - 20}" width="${fx(pw)}" height="20" rx="10" class="fg-pill"/>` + fT(x + ow / 2, y - 6, s, 'fg-tb'); x += ow; }
  });
  if (o.under) b += fT(W / 2, y + bh + 22, o.under, 'fg-ts');
  return fSvg(W, y + bh + (o.under ? 30 : 6), b, o.alt);
};

/* ---------- 7. tabel ---------- */
FG.table = (o) => {
  const W = 340; const cols = (o.head || o.rows[0]).length; const ws = o.w || Array(cols).fill(1 / cols);
  const cw = ws.map((f) => f * (W - 4)); const lh = 15; let y = 2; let b = '';
  const cell = (v) => (v && typeof v === 'object' ? v : { t: v == null ? '' : String(v) });
  const drawRow = (row, head, ri) => {
    const cells = row.map(cell); const maxC = cw.map((w) => Math.max(4, Math.floor((w - 12) / CW)));
    const nl = Math.max(...cells.map((c, i) => fLines(c.t, maxC[i] - (c.ok || c.no ? 3 : 0)) || 1));
    const h = nl * lh + 14; let x = 2;
    cells.forEach((c, i) => {
      const hi = c.hi || (o.hi || []).some(([r, cc]) => r === ri && cc === i) || (o.hiRow || []).includes(ri);
      b += fRect(x, y, cw[i], h, head ? 'fg-head' : hi ? 'fg-on2' : c.ok ? 'fg-ok' : c.no ? 'fg-no' : 'fg-off');
      const al = o.align && o.align[i] === 'l'; const tx = al ? x + 8 : x + cw[i] / 2; let t0 = y + 18 + (h - 14 - fLines(c.t, maxC[i]) * lh) / 2 - 2;
      if (c.ok || c.no) { b += fIcon(c.ok ? 'check' : 'x', x + 6, y + h / 2 - 8, 0.68, c.ok ? 'fg-ic-ok' : 'fg-ic-no'); }
      b += fTW(c.ok || c.no ? tx + (al ? 18 : 8) : tx, t0, c.t, maxC[i] - (c.ok || c.no ? 3 : 0), lh, head ? 'fg-tb' : (c.b ? 'fg-tb' : 'fg-t'), al ? 'start' : 'middle');
      x += cw[i];
    });
    y += h;
  };
  if (o.head) drawRow(o.head, true, -1);
  o.rows.forEach((r, i) => drawRow(r, false, i));
  return fSvg(W, y + 2, b, o.alt);
};

/* ---------- 8. diagram Venn ---------- */
FG.venn = (o) => {
  const W = 340, H = o.h || 170; let b = ''; const m = o.mode || 'overlap'; const cy = H / 2 + 4;
  let A, B;
  if (m === 'sub') { B = { x: 170, y: cy, r: 74 }; A = { x: 150, y: cy + 14, r: 38 }; }
  else if (m === 'subapart') {
    const Bx = { x: 112, y: cy, r: 74 }, Ax = { x: 100, y: cy + 16, r: 36 }, Cx = { x: 272, y: cy, r: 52 };
    let s2 = `<circle cx="${Bx.x}" cy="${Bx.y}" r="${Bx.r}" class="fg-v"/><circle cx="${Ax.x}" cy="${Ax.y}" r="${Ax.r}" class="fg-on2"/><circle cx="${Cx.x}" cy="${Cx.y}" r="${Cx.r}" class="fg-on"/>`;
    s2 += fT(Bx.x, Bx.y - Bx.r + 24, o.b, 'fg-tb') + fT(Ax.x, Ax.y + 5, o.a, 'fg-tb') + fT(Cx.x, Cx.y + 5, o.c, 'fg-tb');
    return fSvg(W, H, s2, o.alt);
  }
  else if (m === 'apart') { A = { x: 100, y: cy, r: 54 }; B = { x: 240, y: cy, r: 54 }; }
  else if (m === 'one') { A = { x: 170, y: cy, r: 66 }; }
  else { A = { x: 132, y: cy, r: 60 }; B = { x: 208, y: cy, r: 60 }; }
  const sh = o.shade || '';
  if (m === 'sub') { b += `<circle cx="${B.x}" cy="${B.y}" r="${B.r}" class="${sh.includes('b') ? 'fg-on' : 'fg-v'}"/><circle cx="${A.x}" cy="${A.y}" r="${A.r}" class="${sh.includes('a') ? 'fg-on2' : 'fg-v2'}"/>`; }
  else {
    b += `<defs><clipPath id="vA${o.id || ''}"><circle cx="${A.x}" cy="${A.y}" r="${A.r}"/></clipPath></defs>`;
    b += `<circle cx="${A.x}" cy="${A.y}" r="${A.r}" class="${sh.includes('a') ? 'fg-on' : 'fg-v'}"/>`;
    if (B) b += `<circle cx="${B.x}" cy="${B.y}" r="${B.r}" class="${sh.includes('b') ? 'fg-on' : 'fg-v'}" style="fill-opacity:${sh.includes('b') ? 1 : 0.0001}"/>`;
    if (B && sh.includes('x')) b += `<circle cx="${B.x}" cy="${B.y}" r="${B.r}" clip-path="url(#vA${o.id || ''})" class="fg-on2"/>`;
    b += `<circle cx="${A.x}" cy="${A.y}" r="${A.r}" class="fg-vline"/>` + (B ? `<circle cx="${B.x}" cy="${B.y}" r="${B.r}" class="fg-vline"/>` : '');
  }
  const lab = (C, t, dx = 0, dy = 0) => fTW(C.x + dx, C.y - C.r - 10 + dy, t, 18, 14, 'fg-tb');
  if (m === 'sub') { b += fT(B.x, B.y - B.r + 24, o.b, 'fg-tb'); b += fT(A.x, A.y - 8, o.a, 'fg-tb'); }
  else { b += lab(A, o.a, m === 'overlap' ? -18 : 0); if (B) b += lab(B, o.b, m === 'overlap' ? 18 : 0); }
  (o.dots || []).forEach((d) => {
    let x = 0, y = cy;
    if (d.at === 'ab') x = B ? (A.x + B.x) / 2 : A.x;
    else if (d.at === 'a') { x = m === 'sub' ? A.x - 10 : A.x - (B ? 24 : 0); if (m === 'sub') y = A.y + 14; }
    else if (d.at === 'b') x = m === 'sub' ? B.x + 44 : B.x + 24;
    else if (d.at === 'out') { x = 24; y = cy + 50; }
    b += `<circle cx="${fx(x)}" cy="${fx(y + (d.dy || 0))}" r="6" class="fg-pen"/>` + (d.t ? fT(x + 11, y + (d.dy || 0) + 5, d.t, 'fg-h', 'start') : '');
  });
  return fSvg(W, H, b, o.alt);
};

/* ---------- 9. keputusan ya/tidak ---------- */
FG.decision = (o) => {
  const W = 340; const ql = fLines(o.q, 36); const qh = ql * 16 + 20; let b = '';
  b += fRect(30, 4, 280, qh, 'fg-box', 12) + fTW(170, 4 + 22, o.q, 36, 16, 'fg-tb');
  const y1 = 4 + qh; const yl = fLines(o.yes, 18), nl = fLines(o.no, 18); const bh = Math.max(yl, nl) * 16 + 22; const by = y1 + 46;
  b += fArrow(140, y1, 86, by - 2) + fArrow(200, y1, 254, by - 2);
  b += fT(96, y1 + 20, o.ya || 'Ya', 'fg-h', 'end') + fT(246, y1 + 20, o.tidak || 'Tidak', 'fg-h', 'start');
  b += fRect(8, by, 156, bh, o.yesC ? fCls(o.yesC) : 'fg-ok', 12) + fTW(86, by + 21, o.yes, 18, 16, 'fg-t');
  b += fRect(176, by, 156, bh, o.noC ? fCls(o.noC) : 'fg-on2', 12) + fTW(254, by + 21, o.no, 18, 16, 'fg-t');
  return fSvg(W, by + bh + 4, b, o.alt);
};

/* ---------- 10. langkah berurutan (atas ke bawah) ---------- */
FG.steps = (o) => {
  const W = 340; let y = 4; let b = '';
  o.items.forEach((it, i) => {
    const s = typeof it === 'string' ? { t: it } : it; const nl = fLines(s.t, 34); const h = nl * 16 + 18;
    b += fRect(44, y, 292, h, s.hi ? 'fg-on2' : 'fg-box', 10) + `<circle cx="20" cy="${fx(y + h / 2)}" r="14" class="fg-pen"/>` + fT(20, y + h / 2 + 5, s.n || String(i + 1), 'fg-tw');
    b += fTW(54, y + 21, s.t, 34, 16, 'fg-t', 'start');
    y += h;
    if (i < o.items.length - 1) { b += fArrow(20, y - h / 2 + 15, 20, y + 12); y += 14; }
  });
  return fSvg(W, y + 4, b, o.alt);
};

/* ---------- 11. kartu berikon (opsional dengan panah) ---------- */
FG.cards = (o) => {
  const n = o.items.length; const W = 340; const gap = o.arrow ? 24 : 10; const cw = (W - gap * (n - 1)) / n;
  /* judul kartu tebal; kalau ada kata yang tidak muat, pakai huruf yang lebih kecil */
  const longest = (cls) => Math.max(...o.items.map((it) => Math.max(...String(it.t).split(/\s+/).map((w) => fW(w, cls)))));
  const tc = longest('fg-tb') <= cw - 10 ? 'fg-tb' : longest('fg-t') <= cw - 8 ? 'fg-t' : 'fg-ts';
  const maxC = Math.max(5, Math.floor((cw - 10) / (tc === 'fg-tb' ? CWB : tc === 'fg-t' ? CW : 6.4))); const maxS = Math.max(6, Math.floor((cw - 10) / 6.4)); const tl = Math.max(...o.items.map((it) => fLines(it.t, maxC) + (it.s ? fLines(it.s, maxS) : 0)));
  const ch = 54 + tl * 15 + 8; let b = '';
  o.items.forEach((it, i) => {
    const x = i * (cw + gap);
    b += fRect(x, 2, cw, ch, fCls(it.c || 'box'), 12) + (it.i ? fIcon(it.i, x + cw / 2 - 15, 10, 1.25, it.ic || 'fg-ic') : '');
    b += fTW(x + cw / 2, 60, it.t, maxC, 15, tc);
    if (it.s) b += fTW(x + cw / 2, 60 + fLines(it.t, maxC) * 15, it.s, maxS, 14, 'fg-ts');
    if (o.arrow && i < n - 1) b += fArrow(x + cw + 3, ch / 2 + 2, x + cw + gap - 3, ch / 2 + 2);
  });
  return fSvg(W, ch + 4, b, o.alt);
};

/* ---------- 12. kalimat berkotak (label S-P-O-K, coret, sorot, panah rujukan) ---------- */
FG.sentence = (o) => {
  const W = 340; const parts = o.parts.map((p) => (typeof p === 'string' ? { t: p } : p)); const hasTag = parts.some((p) => p.tag); const arr = o.arrows || [];
  const top = arr.length ? 34 : 4; const lh = 34 + (hasTag ? 16 : 0) + (arr.length ? 30 : 6); let x = 2, y = top; const pos = [];
  parts.forEach((p) => {
    const w = Math.max(24, fW(p.t, p.x ? 'fg-tm' : 'fg-t') + 16);
    if (x + w > W - 2 && x > 2) { x = 2; y += lh; }
    pos.push({ x, y, w }); x += w + 6;
  });
  let b = '';
  parts.forEach((p, i) => {
    const { x: px, y: py, w } = pos[i];
    const cls = p.x ? 'fg-no' : p.hi ? 'fg-on2' : p.tag ? 'fg-on' : p.c ? fCls(p.c) : 'fg-box';
    b += fRect(px, py, w, 28, cls, 7) + fT(px + w / 2, py + 19, p.t, p.x ? 'fg-tm' : 'fg-t');
    if (p.x) b += fLine(px + 4, py + 14, px + w - 4, py + 14, 'fg-xline');
    if (p.tag) b += fT(px + w / 2, py + 44, p.tag, 'fg-h');
  });
  arr.forEach(([a, c, t]) => {
    const A = pos[a], C = pos[c]; if (!A || !C) return;
    if (A.y !== C.y) b += '<desc>peringatan: panah lintas baris</desc>';
    const x1 = A.x + A.w / 2, x2 = C.x + C.w / 2, y1 = A.y - 2, y2 = C.y - 2; const ym = Math.min(y1, y2) - 26;
    b += `<path d="M${fx(x1)} ${fx(y1)}C${fx(x1)} ${fx(ym)} ${fx(x2)} ${fx(ym)} ${fx(x2)} ${fx(y2 - 2)}" class="fg-pline"/>` + fArrow(x2 + (x2 > x1 ? -3 : 3), y2 - 10, x2, y2 - 2, 'fg-pline');
    if (t) b += fT((x1 + x2) / 2, ym + 4, t, 'fg-h');
  });
  return fSvg(W, y + 28 + (hasTag ? 22 : 6), b, o.alt);
};

/* ---------- 13. grafik batang / garis / lingkaran ---------- */
FG.chart = (o) => {
  const W = 340, H = o.h || 190; const d = o.data; const k = o.kind || 'bar'; let b = '';
  if (k === 'pie') {
    const tot = d.reduce((s, x) => s + x[1], 0); const cx = 92, cy = H / 2, r = 72; let a = -Math.PI / 2; const cls = ['fg-on', 'fg-on2', 'fg-ok', 'fg-no', 'fg-off'];
    d.forEach(([lab, v], i) => {
      const a1 = a + (v / tot) * 2 * Math.PI; const p0 = [cx + r * Math.cos(a), cy + r * Math.sin(a)], p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)];
      b += `<path d="M${cx} ${cy}L${fx(p0[0])} ${fx(p0[1])}A${r} ${r} 0 ${a1 - a > Math.PI ? 1 : 0} 1 ${fx(p1[0])} ${fx(p1[1])}Z" class="${cls[i % 5]}"/>`;
      const ly = 26 + i * 30; b += fRect(186, ly - 13, 16, 16, cls[i % 5], 3) + fT(210, ly, `${lab} (${o.pct ? v + '%' : v})`, 'fg-t', 'start');
      a = a1;
    });
    return fSvg(W, H, b, o.alt);
  }
  const max = o.max || Math.max(...d.map((x) => x[1])) * 1.15; const x0 = 40, y0 = H - 34, ph = y0 - 14; const pw = W - x0 - 8; const sw = pw / d.length;
  b += fLine(x0, 8, x0, y0) + fLine(x0, y0, W - 4, y0);
  const Y = (v) => y0 - (v / max) * ph;
  (o.ticks || []).forEach((t) => { b += fLine(x0 - 4, Y(t), W - 4, Y(t), 'fg-grid') + fT(x0 - 7, Y(t) + 4, String(t), 'fg-ts', 'end'); });
  if (k === 'bar') d.forEach(([lab, v], i) => {
    const bw2 = sw * 0.62; const x = x0 + i * sw + (sw - bw2) / 2; const hi = (o.hi || []).includes(i);
    b += fRect(x, Y(v), bw2, y0 - Y(v), hi ? 'fg-on2' : 'fg-on', 3) + fT(x + bw2 / 2, Y(v) - 6, String(v).replace('.', ','), 'fg-tb') + fT(x + bw2 / 2, y0 + 17, lab, 'fg-ts');
  });
  else {
    const pts = d.map(([, v], i) => [x0 + i * sw + sw / 2, Y(v)]);
    b += `<polyline points="${pts.map((p) => p.map(fx).join(',')).join(' ')}" class="fg-pline2"/>`;
    d.forEach(([lab, v], i) => { const hi = (o.hi || []).includes(i); b += `<circle cx="${fx(pts[i][0])}" cy="${fx(pts[i][1])}" r="5" class="${hi ? 'fg-on2' : 'fg-pen'}"/>` + fT(pts[i][0], pts[i][1] - 10, String(v).replace('.', ','), 'fg-tb') + fT(pts[i][0], y0 + 17, lab, 'fg-ts'); });
  }
  if (o.unit) b += fT(x0 + 6, 10, o.unit, 'fg-ts', 'start');
  return fSvg(W, H, b, o.alt);
};

/* ---------- 14. deret angka (urut, median, modus, rata-rata) ---------- */
FG.dots = (o) => {
  const vals = o.sort === false ? o.vals.slice() : o.vals.slice().sort((a, b) => a - b); const n = vals.length; const W = 340; const s = Math.min(46, (W - 8) / n - 6); const x0 = (W - n * (s + 6) + 6) / 2;
  let hi = new Set(); const mid = (n - 1) / 2;
  if (o.hi === 'median') { hi.add(Math.floor(mid)); hi.add(Math.ceil(mid)); }
  else if (o.hi === 'mode') { const c = {}; vals.forEach((v) => (c[v] = (c[v] || 0) + 1)); const m = Math.max(...Object.values(c)); vals.forEach((v, i) => { if (c[v] === m) hi.add(i); }); }
  else if (Array.isArray(o.hi)) hi = new Set(o.hi);
  let b = ''; const y = 30;
  vals.forEach((v, i) => { b += fRect(x0 + i * (s + 6), y, s, s, hi.has(i) ? 'fg-on2' : (o.out || []).includes(i) ? 'fg-no' : 'fg-box', 8) + fT(x0 + i * (s + 6) + s / 2, y + s / 2 + 5, String(v).replace('.', ','), 'fg-tb'); });
  if (o.top) b += fT(W / 2, 18, o.top, 'fg-h');
  if (o.bottom) b += fT(W / 2, y + s + 24, o.bottom, 'fg-ts');
  return fSvg(W, y + s + (o.bottom ? 32 : 8), b, o.alt);
};

/* ---------- 15. timbangan (persamaan) ---------- */
FG.balance = (o) => {
  const W = 340, H = 168; const t = o.tilt || 0; const cx = 170, cy = 40; const dy = t * 14; let b = '';
  b += `<path d="M${cx} ${cy}L${cx - 20} ${H - 14}H${cx + 20}Z" class="fg-box"/>` + fLine(cx - 64, H - 14, cx + 64, H - 14);
  b += fLine(cx - 118, cy - dy, cx + 118, cy + dy) + `<circle cx="${cx}" cy="${cy}" r="5" class="fg-pen"/>`;
  const pan = (x, y, items) => {
    const rim = y + 92; let s = fLine(x, y, x - 52, rim, 'fg-thin') + fLine(x, y, x + 52, rim, 'fg-thin') + `<path d="M${x - 60} ${rim}H${x + 60}Q${x} ${rim + 30} ${x - 60} ${rim}Z" class="fg-box"/>`;
    const ws = items.map((it) => Math.max(28, fW(it, 'fg-tb') + 14)); const tw = ws.reduce((a, c) => a + c, 0) + 4 * (items.length - 1); let ix = x - tw / 2;
    items.forEach((it, i) => { s += fRect(ix, rim - 28, ws[i], 26, 'fg-on2', 6) + fT(ix + ws[i] / 2, rim - 10, it, 'fg-tb'); ix += ws[i] + 4; });
    return s;
  };
  b += pan(cx - 118, cy - dy, o.l || []) + pan(cx + 118, cy + dy, o.r || []);
  if (o.mid) b += fT(cx, cy - 16, o.mid, 'fg-h');
  return fSvg(W, H, b, o.alt);
};

/* ---------- 16. kelereng dalam kantong ---------- */
FG.marbles = (o) => {
  const W = 340; const all = []; o.groups.forEach((g) => { for (let i = 0; i < g.n; i++) all.push(g.c); });
  const per = Math.min(8, Math.ceil(Math.sqrt(all.length * 2))); const rows = Math.ceil(all.length / per); const r = 11; const bw = per * 26 + 36; const bh = rows * 26 + 44; const bx = 20;
  let b = `<path d="M${bx + 14} 18Q${bx} 18 ${bx + 4} ${bh}Q${bx + bw / 2} ${bh + 18} ${bx + bw - 4} ${bh}Q${bx + bw} 18 ${bx + bw - 14} 18Z" class="fg-box"/><path d="M${bx + 8} 14H${bx + bw - 8}" class="fg-line"/>`;
  all.forEach((c, i) => { const cx = bx + 30 + (i % per) * 26, cy = 40 + Math.floor(i / per) * 26; b += `<circle cx="${cx}" cy="${cy}" r="${r}" class="${fCls(c)}"/>`; });
  let ly = 26; o.groups.forEach((g) => { b += `<circle cx="${bx + bw + 30}" cy="${ly}" r="9" class="${fCls(g.c)}"/>` + fT(bx + bw + 46, ly + 5, `${g.n} ${g.t}`, 'fg-t', 'start'); ly += 26; });
  return fSvg(W, Math.max(bh + 22, ly), b, o.alt);
};

/* ---------- 17. tabel dua dadu (36 kemungkinan) ---------- */
FG.dicegrid = (o) => {
  const s = 26, x0 = 64, y0 = 40; let b = fT(x0 + 3 * s, 12, 'Dadu kedua', 'fg-ts') + `<text x="20" y="${y0 + 3 * s}" class="fg-ts" text-anchor="middle" transform="rotate(-90 20 ${y0 + 3 * s})">Dadu pertama</text>`;
  for (let i = 1; i <= 6; i++) { b += fT(x0 + (i - 0.5) * s, y0 - 7, String(i), 'fg-tb') + fT(x0 - 12, y0 + (i - 0.5) * s + 5, String(i), 'fg-tb'); }
  for (let a = 1; a <= 6; a++) for (let c = 1; c <= 6; c++) {
    const hi = o.sum ? a + c === o.sum : (o.hi || []).some(([p, q]) => p === a && q === c);
    b += fRect(x0 + (c - 1) * s, y0 + (a - 1) * s, s, s, hi ? 'fg-on2' : 'fg-off') + fT(x0 + (c - 0.5) * s, y0 + (a - 0.5) * s + 4, o.show === 'sum' ? String(a + c) : '', 'fg-ts');
  }
  if (o.side) b += fTW(x0 + 6 * s + 66, y0 + 60, o.side, 14, 16, 'fg-h');
  return fSvg(340, y0 + 6 * s + 6, b, o.alt);
};

/* ---------- 18. meteran (skala makna / nada / peluang) ---------- */
FG.meter = (o) => {
  const W = 340, x1 = 20, x2 = 320, y = 60; let b = `<defs><linearGradient id="mg${o.id || ''}" x1="0" x2="1"><stop offset="0" class="fg-g0"/><stop offset="1" class="fg-g1"/></linearGradient></defs>`;
  b += `<rect x="${x1}" y="${y - 9}" width="${x2 - x1}" height="18" rx="9" fill="url(#mg${o.id || ''})" class="fg-mbar"/>`;
  (o.ticks || []).forEach((t, i) => { const x = x1 + t.v * (x2 - x1); b += fLine(x, y - 13, x, y + 13); b += fTW(x, (i % 2 && o.zig) ? y + 32 : y - 22, t.t, 12, 14, t.hi ? 'fg-h' : 'fg-t'); });
  if (o.val != null) { const x = x1 + o.val * (x2 - x1); b += `<path d="M${fx(x)} ${y + 12}l-9 16h18z" class="fg-pen"/>`; }
  if (o.left) b += fT(x1, y + 44, o.left, 'fg-ts', 'start');
  if (o.right) b += fT(x2, y + 44, o.right, 'fg-ts', 'end');
  return fSvg(W, y + (o.left || o.right ? 52 : o.zig || o.val != null ? 42 : 22), b, o.alt);
};

/* ---------- 19. payung (ide pokok & penjelas) ---------- */
FG.umbrella = (o) => {
  const W = 340; let b = `<path d="M24 100Q170 -36 316 100Q298 86 280 100Q262 86 243 100Q225 86 207 100Q188 86 170 100Q152 86 133 100Q115 86 97 100Q79 86 60 100Q42 86 24 100Z" class="fg-on"/>`;
  const nl = fLines(o.top, 22); b += fTW(170, nl > 1 ? 62 : 74, o.top, 22, 16, 'fg-tb');
  const n = o.ribs.length; const bw = (W - 10 * (n - 1)) / n; const maxC = Math.floor((bw - 10) / CW); const h = Math.max(...o.ribs.map((r) => fLines(r, maxC))) * 15 + 18;
  o.ribs.forEach((r, i) => { const x = i * (bw + 10); const cx = x + bw / 2; b += fLine(cx, 100, cx, 136, 'fg-thin') + fRect(x, 136, bw, h, 'fg-box', 10) + fTW(cx, 156, r, maxC, 15, 'fg-t'); });
  b += `<path d="M170 100V128" class="fg-line"/>`;
  return fSvg(W, 136 + h + 4, b, o.alt);
};

/* ---------- 20. rumah (atap = gagasan utama, tiang = pendukung) ---------- */
FG.house = (o) => {
  const W = 340; const n = o.pillars.length; const big = fLines(o.roof, 19) <= 2; const rw = big ? 19 : 25; const rl = fLines(o.roof, rw);
  let b = `<path d="M10 86L170 6L330 86Z" class="fg-on"/>` + fTW(170, rl > 1 ? 60 : 68, o.roof, rw, 15, big ? 'fg-tb' : 'fg-t');
  const pw = (300 - 12 * (n - 1)) / n; const maxC = Math.max(6, Math.floor((pw - 8) / 6.6)); const ph = Math.max(...o.pillars.map((p) => fLines(p, maxC))) * 15 + 26;
  o.pillars.forEach((p, i) => { const x = 20 + i * (pw + 12); b += fRect(x, 90, pw, ph, 'fg-box', 4) + fTW(x + pw / 2, 110, p, maxC, 15, 'fg-t'); });
  b += fRect(4, 92 + ph, 332, 10, 'fg-on2', 3);
  return fSvg(W, 106 + ph, b, o.alt);
};

/* ---------- 21. kereta (paragraf & kata penghubung) ---------- */
FG.train = (o) => {
  const n = o.cars.length; const W = 340; const lw = 54; const cw = (W - lw * (n - 1)) / n; const maxC = Math.floor((cw - 12) / CW); const h = Math.max(...o.cars.map((c) => fLines(c, maxC))) * 15 + 22;
  let b = '';
  o.cars.forEach((c, i) => {
    const x = i * (cw + lw); b += fRect(x, 4, cw, h, i === o.hi ? 'fg-on2' : 'fg-box', 8) + fTW(x + cw / 2, 24, c, maxC, 15, 'fg-t');
    b += `<circle cx="${fx(x + 16)}" cy="${h + 10}" r="7" class="fg-off"/><circle cx="${fx(x + cw - 16)}" cy="${h + 10}" r="7" class="fg-off"/>`;
    if (i < n - 1) { const lx = x + cw; b += fLine(lx, h / 2 + 4, lx + lw, h / 2 + 4) + `<rect x="${fx(lx + 3)}" y="${fx(h / 2 - 8)}" width="${lw - 6}" height="22" rx="11" class="fg-pill"/>` + fT(lx + lw / 2, h / 2 + 7, o.links[i] || '', 'fg-ts'); }
  });
  return fSvg(W, h + 22, b, o.alt);
};

/* ---------- 22. jungkat-jungkit (antonim) ---------- */
FG.seesaw = (o) => {
  const W = 340; let b = `<path d="M170 98l-18 30h36z" class="fg-box"/>` + fLine(30, 80, 310, 112) + fLine(110, 128, 230, 128);
  const box = (x, y, t, c) => { const w = Math.max(64, fW(t, 'fg-tb') + 22); return fRect(x - w / 2, y - 36, w, 30, c, 8) + fT(x, y - 16, t, 'fg-tb'); };
  b += box(68, 84, o.a, 'fg-on') + box(272, 110, o.b, 'fg-on2');
  if (o.mid) b += fT(170, 18, o.mid, 'fg-h');
  return fSvg(W, 134, b, o.alt);
};

/* ---------- 23. pohon kata (satu kata, banyak makna) ---------- */
FG.wordtree = (o) => {
  const W = 340; const n = o.br.length; const bw = (W - 10 * (n - 1)) / n; const maxC = Math.floor((bw - 12) / CWB);
  const h = Math.max(...o.br.map((x) => fLines(x.m, maxC) + fLines(x.ctx || '', Math.floor((bw - 12) / 6.4)))) * 15 + 22; const ww = Math.max(80, o.w.length * 9 + 30);
  let b = fRect(170 - ww / 2, 4, ww, 34, 'fg-on2', 17) + fT(170, 26, o.w, 'fg-tb');
  o.br.forEach((x, i) => { const bx = i * (bw + 10); b += fLine(170, 38, bx + bw / 2, 70, 'fg-thin') + fRect(bx, 70, bw, h, 'fg-box', 10) + fTW(bx + bw / 2, 90, x.m, maxC, 15, 'fg-tb'); if (x.ctx) b += fTW(bx + bw / 2, 90 + fLines(x.m, maxC) * 15 + 2, x.ctx, Math.floor((bw - 12) / 6.4), 14, 'fg-ts'); });
  return fSvg(W, 74 + h, b, o.alt);
};

/* ---------- 24. sekelompok orang ---------- */
FG.people = (o) => {
  const n = o.n; const W = 340; const s = Math.min(40, (W - 10) / n); const x0 = (W - n * s) / 2; let b = '';
  for (let i = 0; i < n; i++) {
    const odd = (o.odd || []).includes(i); const cls = odd ? (o.oddC || 'fg-ic-no') : 'fg-ic';
    b += fIcon('person', x0 + i * s + (s - 30) / 2, 6, 1.25, cls);
    if (o.labels && o.labels[i]) b += fT(x0 + i * s + s / 2, 50, o.labels[i], 'fg-ts');
  }
  return fSvg(W, o.labels ? 58 : 44, b, o.alt);
};

/* ---------- 25. domino (rantai sebab-akibat) ---------- */
FG.domino = (o) => {
  const n = o.items.length; const W = 340; const gap = (W - 20) / n; let b = '';
  o.items.forEach((t, i) => {
    const x = 18 + i * gap;
    b += fRect(x, 20, 30, 76, i === 0 ? 'fg-on2' : 'fg-on', 4) + fTW(x + 15, 118, t, 12, 14, 'fg-t');
    if (i < n - 1) b += fArrow(x + 36, 58, x + gap - 6, 58, 'fg-pline');
  });
  return fSvg(W, 134 + 14, b, o.alt);
};

/* ---------- 26. penggaris skala peta ---------- */
FG.ruler = (o) => {
  const W = 340; const n = o.cm || 5; const x0 = 20, w = 300, cw = w / n; let b = fRect(x0, 40, w, 30, 'fg-on2', 4);
  for (let i = 0; i <= n; i++) { const x = x0 + i * cw; b += fLine(x, 40, x, 58) + fT(x, 88, `${i} cm`, 'fg-ts'); if (i < n) b += fLine(x + cw / 2, 40, x + cw / 2, 50, 'fg-thin'); }
  if (o.real) b += fT(170, 26, o.real, 'fg-h');
  if (o.under) b += fT(170, 108, o.under, 'fg-t');
  return fSvg(W, o.under ? 116 : 96, b, o.alt);
};

/* ---------- 27. memindai teks (kata kunci disorot) ---------- */
FG.scan = (o) => {
  const W = 340; let b = fRect(2, 2, 336, o.lines.length * 22 + 20, 'fg-box', 10); const key = o.key ? new RegExp('(' + o.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi') : null;
  o.lines.forEach((l, i) => { const s = key ? l.replace(key, '==$1==') : l; b += fT(14, 26 + i * 22, s, i === o.dim ? 'fg-ts' : 'fg-t', 'start'); });
  b += fIcon('search', 296, (o.lines.length * 22) / 2 - 8, 1.5, 'fg-ic-pen');
  return fSvg(W, o.lines.length * 22 + 24, b, o.alt);
};

/* ---------- 28. bentuk paragraf (deduktif / induktif) ---------- */
FG.para = (o) => {
  const modes = o.modes || [o.mode || 'deduktif']; const W = 340; const cw = (W - 20 * (modes.length - 1)) / modes.length; let b = '';
  modes.forEach((m, j) => {
    const x = j * (cw + 20); const lines = 5; const ide = m === 'deduktif' ? 0 : m === 'induktif' ? lines - 1 : -1;
    b += fT(x + cw / 2, 16, m === 'deduktif' ? 'Deduktif' : m === 'induktif' ? 'Induktif' : 'Tersebar', 'fg-tb');
    for (let i = 0; i < lines; i++) { const w = i === lines - 1 ? cw * 0.7 : cw - 10; b += fRect(x + 4, 28 + i * 18, w, 11, i === ide ? 'fg-on2' : 'fg-on', 5); }
    b += fT(x + cw / 2, 28 + lines * 18 + 16, m === 'deduktif' ? 'ide pokok di awal' : m === 'induktif' ? 'ide pokok di akhir' : 'ide pokok dirangkum', 'fg-h');
  });
  return fSvg(W, 28 + 5 * 18 + 26, b, o.alt);
};

/* ---------- pembungkus ---------- */
function figure(f) {
  if (!f) return '';
  const list = Array.isArray(f) ? f : [f]; let out = '';
  for (const g of list) {
    const fn = FG[g.t]; if (!fn) continue;
    let svg = ''; try { svg = fn(g); } catch (e) { svg = ''; }
    out += `<figure class="fig${g.wide ? ' wide' : ''}">${svg}${g.cap ? `<figcaption>${fmt(g.cap)}</figcaption>` : ''}</figure>`;
  }
  return out;
}
