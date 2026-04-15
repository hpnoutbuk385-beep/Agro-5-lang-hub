# 🌾 Agro 5 Lang Hub — Ko'p tilli Agro Terminologiya

Ushbu loyiha qishloq xo'jaligi va laboratoriya terminlarini 5 ta tilda (O'zbek, Ingliz, Rus, Qoraqalpoq, Yapon) qidirish va AI yordamida tarjima qilish uchun ishlab chiqilgan.

## 🔥 Yangilangan imkoniyatlar (V2)

- 🤖 **AI Model**: Eng so'nggi va tezkor **Gemini 2.0 Flash** modeliga o'tkazildi.
- 📉 **Quota Handling**: AI limiti tugagan bo'lsa, foydalanuvchiga bu haqda tushunarli xabar beriladi (429 xatosi).
- 💾 **Til Xotirasi**: So'nggi qidirilgan terminlar aynan qaysi tilga tarjima qilingan bo'lsa, o'sha til bilan birga eslab qolinadi.
- 🎨 **Premium UI**: 
  - To'q va yorug' (Dark/Light) rejimlar.
  - Dinamik "Translating..." animatsiyasi.
  - Hover effektli to'q yashil tugmalar.
  - Mobil qurilmalarga to'liq moslashgan (Responsive) dizayn.
- ⚡ **Tezkor qidiruv**: Bazadan terminlarni qidirishda auto-suggestion (avtomatik takliflar) tizimi.

## 🛠️ Texnologiyalar
- **Backend**: FastAPI (Python)
- **Database**: SQLite (SQLAlchemy)
- **AI**: Google Gemini AI API
- **Frontend**: Vanilla JS, Modern CSS3, HTML5

## 📁 Loyiha Strukturasi
```text
agro 5 lab hub/
├── backend/
│   ├── app/
│   │   ├── main.py        # Asosiy ishga tushirish fayli
│   │   ├── routes/        # API yo'nalishlari
│   │   ├── services/      # Biznes mantiq
│   │   └── utils/         # Gemini AI tarjimon
│   └── .env               # API kalit va sozlamalar
├── frontend/
│   ├── index.html         # Interfeys
│   ├── css/style.css      # Premium dizayn
│   └── js/app.js          # Dinamik logika
└── README.md              # Qo'llanma
```

## 🚀 Ishga tushirish (Run)

### 1. Backendni yoqish:
```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload --port 8080
```

### 2. Saytga kirish:
Brauzeringizda quyidagi manzilni oching:
`http://127.0.0.1:8080`

---
*Loyiha "Agro 5 Lab Hub" jamoasi uchun maxsus tayyorlandi.*
