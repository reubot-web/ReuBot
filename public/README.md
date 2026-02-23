# 🔗 ReuBot — Real-Time Anonymous Chat
Botolan National High School Batch 2023-2024

---

## 📁 Files
```
reubot/
├── server.js          ← Backend (Node.js + Socket.io)
├── package.json       ← Dependencies
├── railway.json       ← Deploy config
└── public/
    └── index.html     ← Frontend (lahat ng screens dito)
```

---

## 🚀 HOW TO DEPLOY (FREE) sa Railway

### Step 1 — I-install ang Node.js sa PC mo
- Pumunta sa: https://nodejs.org
- I-download yung **LTS** version
- I-install, tapos i-restart PC

### Step 2 — Gumawa ng GitHub account
- Pumunta sa: https://github.com
- Mag sign up (libre)

### Step 3 — I-upload ang code sa GitHub
1. Pumunta sa https://github.com/new
2. Repository name: `reubot`
3. Piliin **Public**, tapos click **Create repository**
4. I-upload lahat ng files (drag and drop ang folder contents)

### Step 4 — I-deploy sa Railway
1. Pumunta sa: https://railway.app
2. Sign in gamit ang GitHub account mo
3. Click **New Project** → **Deploy from GitHub repo**
4. Piliin ang `reubot` repo mo
5. Railway will auto-detect Node.js at i-deploy!
6. Pagkatapos, click **Settings** → **Domains** → **Generate Domain**
7. Makakakuha ka ng link like: `reubot-production.up.railway.app`

### Step 5 — I-share ang link sa batch mates!
- Yung link na nakuha mo, i-share sa group chat ng batch
- Kapag dalawa o higit pa ang nag-open at nag-verify, mag-co-connect sila randomly!

---

## 🧪 I-test locally (sa PC mo muna)

```bash
# Sa terminal/command prompt:
cd reubot
npm install
node server.js

# Tapos buksan sa browser:
# http://localhost:3000
```

Para ma-test ang matching, buksan ng **dalawang tabs** ng browser at mag-verify ng dalawang students.

---

## ✅ Features
- ✅ Batch verification (name + adviser dapat tama pareho)
- ✅ Real-time matching (parang Omegle/Telegram)
- ✅ Anonymous chat
- ✅ Typing indicator (nakikita mo kung nag-type yung kabilang)
- ✅ Partner left notification
- ✅ Auto-complete sa name field

---

## ❓ Need help?
Kung may problema sa deployment, screenshot mo ang error at i-send!
