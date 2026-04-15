# 🌾 Agro 5 Lang Hub

Ko‘p tilli (qoraqalpoq, o‘zbek, ingliz, yapon) qishloq xo‘jaligi terminologik bazasi.

## 🚀 Texnologiyalar
- **FastAPI** (Eng tez va zamonaviy backend)
- **PostgreSQL / SQLite** (Ma'lumotlar bazasi)
- **HTML + CSS + JavaScript** (Responsive frontend)

## 📁 Loyiha Strukturasi
```text
Agro-5-Lang-Hub/
│
├── backend/          # FastAPI server va biznes mantiq
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── models/    # DB Jadvallari (Term, Language)
│   │   ├── routes/    # API manzillari
│   │   ├── services/  # Qidiruv va tarjima xizmatlari
│   │   ├── database/  # DB ulanishi
│   │   └── utils/     # Gemini AI tarjimon
│   ├── requirements.txt
│   └── .env
│
├── frontend/         # Static interfeys
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── components/
│
├── database/         # Migratsiyalar va SQL fayllar
├── docs/             # Hujjatlar
├── assets/           # Media fayllar
└── docker/           # Konteynerizatsiya
```

## ⚙️ O‘rnatish

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows uchun
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 🎯 Asosiy Funksiyalar
- ✅ **Qidiruv tizimi**: terminlarni barcha tillarda tezkor qidirish.
- ✅ **Ko‘p tilli tarjima**: Gemini AI orqali avtomatik termin tarjimasi.
- ✅ **Kategoriyalar**: Qishloq xo'jaligi yo'nalishlari bo'yicha saralash.
- ✅ **Responsive dizayn**: Barcha qurilmalar (mobil, planshet, desktop) uchun qulay.

## 🔌 API Yo'nalishlari (Routes)
- `GET    /terms` - Barcha terminlar
- `POST   /terms` - Yangi termin qo'shish/tarjima qilish
- `GET    /search?q=` - Tezkor qidiruv
- `GET    /terms/{id}` - Alohida termin ma'lumotlari

## 🎨 Frontend Dasturchi Uchun Qo'llanma

Frontend-dasturchi loyihani vizual qismini yaratishda quyidagi ko'rsatmalarga amal qilishi kerak:

### 1. Dizayn va UI/UX talablari (Mockup asosida)
- **Mavzu (Theme)**: Dark Mode (To'q rangli mavzu).
- **Asosiy rang**: Yashil (#4CAF50 yoki shunga o'xshash agro-yashil).
- **Logotip va Sarlavha**: 
    - "Agro 5" (oq rangda), "laboratoriya markazi" (yashil rangda).
    - Pastida "Ko‘p tilli qishloq xo‘jaligi terminologiyasi bo‘yicha yordamchi" subtitri.
- **Interfeys elementlari**:
    - Markazlashgan boshqaruv paneli.
    - Til tanlash uchun 2 ta zamonaviy "Dropdown" menyu.
    - Markazda dumaloqroq shakldagi yashil **"Tarjima"** tugmasi.
    - Pastki qismda 2 ta katta blok: chapda "Tarjima qilish uchun so'z kiriting", o'ngda "Natija bu yerda ko'rsatiladi".
- **Effektlar**: Glassmorphism yoki yumshoq soya (soft shadow) effektlaridan foydalanish tavsiya etiladi.

### 2. API bilan ulanish (Endpoints)
Backend mahalliy ravishda `http://127.0.0.1:8000` manzilida ishlaydi.

- **Asosiy qidiruv**: `GET /search?q={so'z}`
  - So'rov yuborilganda bazadan o'xshash so'zlarni qaytaradi.
- **Tarjima va Saqlash**: `POST /terms`
  - Body: `{"word": "so'z", "source_lang": "en"}`
  - Agar so'z bazada bo'lmasa, AI orqali tarjima qilib saqlaydi va natijani qaytaradi.
- **Ro'yxatni olish**: `GET /terms`
  - Barcha saqlangan terminlar ro'yxati.

### 3. Ma'lumotlar strukturasi (Response)
API har bir termin uchun quyidagi formatda javob qaytaradi:
```json
{
  "id": 1,
  "word": "soil",
  "meaning_uz": "tuproq",
  "meaning_en": "soil",
  "meaning_kr": "topiraq",
  "meaning_jp": "土壌 (dojō)",
  "category": "general",
  "source": "database" 
}
```
*Izoh: `source` maydoni ma'lumot "database"dan yoki yangi "ai" orqali olinganini bildiradi.*

### 4. Ishga tushirish
Frontend qismi `frontend/` papkasida bo'lishi kerak. Static fayllarni backend orqali ko'rish uchun `http://127.0.0.1:8000/` manziliga kiring.

---
*Savollar bo'lsa, Backend Swagger xujjatlariga murojaat qiling: `http://127.0.0.1:8000/docs`*
