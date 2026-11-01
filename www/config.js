/* =====================================================================
   Tangga — pengaturan server (satu-satunya file yang perlu diubah).
   `api` = alamat server Tangga (Cloudflare Worker), mis.
           'https://tangga-api.namamu.workers.dev'
   Kosong = Kak Tangga nonaktif; aplikasi tetap jalan normal, dan laporan
   disimpan dulu di perangkat lalu terkirim otomatis begitu server aktif.
   Cara memasang server: docs/SETUP-AI.md
   ===================================================================== */
window.TANGGA_CONFIG = {
  api: '',
  versi: '0.3.0',
};
