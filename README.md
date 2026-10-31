# Tangga UTBK

Belajar UTBK-SNBT satu anak tangga kecil setiap hari. Tersedia sebagai **web app** dan **aplikasi Android**, gratis dan tanpa akun.

- 🌐 Web: https://OWNER.github.io/tangga/
- 📱 Android (APK terbaru): https://github.com/OWNER/tangga/releases/latest/download/tangga.apk

## Cara pasang di Android (untuk teman-teman)

1. Buka link APK di atas dari HP Android, lalu unduh `tangga.apk`.
2. Buka file yang terunduh. Kalau HP bertanya, izinkan **Pasang aplikasi tidak dikenal** untuk browser/Files.
3. Buka Tangga. Versi baru: unduh lagi dari link yang sama lalu pasang di atasnya. Progres tidak hilang.

Pengguna iPhone: buka link web di Safari → **Bagikan** → **Tambahkan ke Layar Utama**.

## How this repo works

| Folder | What it is |
|---|---|
| `www/` | The whole app (plain HTML/CSS/JS, no build step). This is also the website. |
| `android/` | Capacitor 8 Android project that wraps `www/` (offline, daily reminder notifications, back button, backup via Share). |
| `assets/` | Source images for the app icon and splash screen. |
| `.github/workflows/android.yml` | Builds a signed APK + AAB on every change and publishes them under **Releases**. |
| `.github/workflows/pages.yml` | Publishes `www/` to GitHub Pages. |

AI features (Kak Tangga chat, custom topics) only appear when the app is opened inside Claude; they hide themselves everywhere else.

### Updating the app

1. Change files in `www/`.
2. In `www/sw.js`, bump `VERSI` (e.g. `tangga-2026-11-02-1`) so browsers pick up the new version.
3. Push to `main`. GitHub rebuilds the website and the APK automatically (about 5 minutes).

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

### Google Play (later)

- One-time US$25 developer account.
- New personal accounts must run a closed test with at least 12 testers for 14 days before going public.
- Upload `tangga.aab` from a release. Use Play App Signing; the key in the secrets is your **upload key**.
- App ID: `id.tangga.utbk` (cannot change after the first Play upload).

## License

Fonts: Plus Jakarta Sans and Kalam, SIL Open Font License 1.1 (see `www/fonts/LICENSE.txt`).
