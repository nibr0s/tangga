# Tangga UTBK

Belajar UTBK-SNBT satu anak tangga kecil setiap hari. Tersedia sebagai **web app** dan **aplikasi Android**, gratis dan tanpa akun.

- 🌐 Web: https://nibr0s.github.io/tangga/
- 📱 Android (APK terbaru): https://github.com/nibr0s/tangga/releases/latest/download/tangga.apk

## Isi aplikasi

- **Belajar** — 38 materi bergambar untuk 7 subtes (PU, PK, PBM, PPU, LBI, LBE, PM), dimulai dari dasar. Setiap materi: halaman pendek bergambar, soal cek di tiap halaman, satu soal tantangan setara UTBK dengan langkah berpikir tutor, lalu ringkasan. Kata sulit bisa diketuk, halaman bisa dibacakan, dan ukuran huruf bisa diperbesar.
- **Latihan** — contoh soal, isian, latihan adaptif, dan 3 soal "Buktikan" untuk setiap anak tangga, ditambah tryout, kartu kosakata, dan permainan harian.
- **Kak Tangga** — tutor AI (Claude) yang membimbing dengan pertanyaan, bisa membaca foto soal. Aktif setelah server Tangga dipasang (lihat [docs/SETUP-AI.md](docs/SETUP-AI.md)); ada jatah harian per perangkat.
- **Laporkan kesalahan** di setiap soal, materi, dan jawaban AI, plus **Kirim masukan** di Kemajuan. Laporan masuk ke halaman admin server.
- **Perkiraan skor** baru muncul setelah 20 soal di tiap subtes, sebagai angka kasar (≈), bukan skor resmi UTBK.
- Semua berjalan **tanpa internet** setelah dibuka sekali (kecuali Kak Tangga); gambar dibuat langsung di HP sehingga ukurannya kecil.
- Privasi: [www/privasi.html](www/privasi.html).

## Cara pasang di Android (untuk teman-teman)

1. Buka link APK di atas dari HP Android, lalu unduh `tangga.apk`.
2. Buka file yang terunduh. Kalau HP bertanya, izinkan **Pasang aplikasi tidak dikenal** untuk browser/Files.
3. Buka Tangga. Versi baru: unduh lagi dari link yang sama lalu pasang di atasnya. Progres tidak hilang.

Kalau HP menolak APK atau meminta langkah rumit: buka link web di Chrome → menu ⋮ → **Tambahkan ke layar utama**. Isinya sama, dan tetap jalan tanpa sinyal. (Sejak 30 September 2026 Google mulai mewajibkan verifikasi pengembang untuk aplikasi Android di Indonesia; lihat bagian Google Play di bawah.)

Pengguna iPhone: buka link web di Safari → **Bagikan** → **Tambahkan ke Layar Utama**.

## How this repo works

| Folder | What it is |
|---|---|
| `www/` | The whole app (plain HTML/CSS/JS, no build step). This is also the website. Lessons live in `materi-*.js`; `figs.js` draws their diagrams as SVG on the device. |
| `www/config.js` | The one setting you edit: the Tangga server address (`api`). Empty = Kak Tangga off, everything else works. |
| `www/server.js` | Talks to the Tangga server: Kak Tangga, reports (kept offline until sent), anonymous daily-user ping. |
| `server/` | The Tangga server: one Cloudflare Worker + SQLite Durable Object. Proxies Kak Tangga to Claude with daily limits and safety rules, stores reports, counts daily users, serves `/admin`. |
| `docs/SETUP-AI.md` | How to turn on Kak Tangga, and what it costs. |
| `android/` | Capacitor 8 Android project that wraps `www/` (offline, daily reminder notifications, read-aloud, back button, backup via Share). |
| `assets/` | Source images for the app icon and splash screen. |
| `.github/workflows/android.yml` | Builds a signed APK + AAB on every change and publishes them under **Releases**. |
| `.github/workflows/pages.yml` | Publishes `www/` to GitHub Pages. |
| `.github/workflows/server.yml` | Deploys `server/` to Cloudflare Workers (needs 4 secrets, see `docs/SETUP-AI.md`). |

AI features (Kak Tangga chat, custom topics) appear when `www/config.js` points at a running Tangga server — or when the app is opened inside Claude. Otherwise they hide themselves.

### Updating the app

1. Change files in `www/`.
2. In `www/sw.js`, bump `VERSI` (e.g. `tangga-2026-11-02-1`) so browsers pick up the new version.
3. Push to `main`. GitHub rebuilds the website and the APK automatically (about 5 minutes).

Changing only `www/config.js` (the server address) doesn't need a `VERSI` bump — the app always fetches the newest `config.js` first.

### One-time setup (already done if the first build produced a release)

- **Settings → Pages → Build and deployment → Source: GitHub Actions.**
- **Settings → Secrets and variables → Actions**, two repository secrets:
  - `TANGGA_KEYSTORE_BASE64` — the signing key, base64-encoded
  - `TANGGA_KEYSTORE_PASSWORD` — its password

Without the secrets, the workflow still builds a test APK (as a downloadable artifact) but does not publish a release.

> ⚠️ Keep a private backup of the signing key (`tangga-upload.jks`) and its password. Updates only install over the old app when they are signed with the same key.

### Building locally (optional)

```bash
npm install
npm run sync          # copies www/ into the Android project
npx cap open android  # opens Android Studio → Build → Build APK(s)
```

`npm run assets` regenerates icons and splash screens from `assets/`.

### Google Play & Android developer verification

- Since 30 September 2026, Google requires apps installed on certified Android phones in Indonesia to come from a verified developer, starting with the big app stores; global enforcement is planned for 2027. Unverified apps are pushed into an "advanced flow" (developer options, restart, 24-hour wait) that most students won't do. Register in the **Android Developer Console** before relying on the APK, or point people to the web version.

- One-time US$25 developer account.
- New personal accounts must run a closed test with at least 12 testers for 14 days before going public.
- Upload `tangga.aab` from a release. Use Play App Signing; the key in the secrets is your **upload key**.
- App ID: `id.tangga.utbk` (cannot change after the first Play upload).

## License

Fonts: Plus Jakarta Sans and Kalam, SIL Open Font License 1.1 (see `www/fonts/LICENSE.txt`).
