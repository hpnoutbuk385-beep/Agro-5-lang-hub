/* app.js - Final Production Version v5 */

const API_BASE = window.location.origin;

const UI_TRANSLATIONS = {
    uz: { title: "Agro 5 Lab Hub", lab: "laboratoriya markazi", subtitle: "Ko'p tilli qishloq xo'jaligi terminologiyasi", placeholder: "Termin kiriting...", btn_trans: "Tarjima qilish", btn_clear: "Tozalash", search_placeholder: "Bazadan qidirish...", recent_title: "So'nggi tarjimalar", recent_empty: "Hali tarjimalar yo'q", translating: "Tarjima qilinmoqda...", error: "Xatolik yuz berdi", tab_translate: "Tarjima", tab_dict: "Lug'at" },
    en: { title: "Agro 5 Lab Hub", lab: "Laboratory Center", subtitle: "Multi-lingual Agro Terminology", placeholder: "Enter term...", btn_trans: "Translate", btn_clear: "Clear", search_placeholder: "Search database...", recent_title: "Recent Translations", recent_empty: "No translations yet", translating: "Translating...", error: "An error occurred", tab_translate: "Translate", tab_dict: "Dictionary" },
    ru: { title: "Agro 5 Lab Hub", lab: "Лабораторный центр", subtitle: "Мультимовна агро термінологія", placeholder: "Введите термин...", btn_trans: "Перевести", btn_clear: "Очистить", search_placeholder: "Поиск в базе...", recent_title: "Последние переводы", recent_empty: "Переводов пока нет", translating: "Переводится...", error: "Произошла ошибка", tab_translate: "Перевод", tab_dict: "Словарь" },
    jp: { title: "Agro 5 Lab Hub", lab: "ラボラトリーセンター", subtitle: "多言語農業用語集", placeholder: "用語を入力...", btn_trans: "翻訳", btn_clear: "クリア", search_placeholder: "データベースを検索...", recent_title: "最近の翻訳", recent_empty: "翻訳はまだありません", translating: "翻訳中...", error: "エラーが発生しました", tab_translate: "翻訳", tab_dict: "辞書" },
    kr: { title: "Agro 5 Lab Hub", lab: "laboratoriya orayi", subtitle: "Ko'p tilli agro terminologiya", placeholder: "Termin kiritiń...", btn_trans: "Aw darmalaw", btn_clear: "Tazalaw", search_placeholder: "Bazadan izlew...", recent_title: "Sońǵı aw darmalar", recent_empty: "Hali aw darmalar joq", translating: "Aw darmalanbaqta...", error: "Xatolar júz berdi", tab_translate: "Aw darmalaw", tab_dict: "Sózlik" }
};

const LANG_MAP = {
    uz: { name: "O'zbekcha", flag: "🇺🇿", key: "meaning_uz" },
    en: { name: "English", flag: "🇬🇧", key: "meaning_en" },
    ru: { name: "Русский", flag: "🇷🇺", key: "meaning_ru" },
    kr: { name: "Qaraqalpaqsha", flag: "🇺🇿", key: "meaning_kr" },
    jp: { name: "日本語", flag: "🇯🇵", key: "meaning_jp" }
};

let recentTerms = JSON.parse(localStorage.getItem('agro5_recent') || '[]');

const esc = (s) => (s ? String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') : "");

function toast(emoji, msg) {
    const t = document.getElementById('toast');
    const te = document.getElementById('toast-emoji');
    const tm = document.getElementById('toast-msg');
    if (t && te && tm) {
        te.textContent = emoji;
        tm.textContent = msg;
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 3000);
    }
}

/** 
 * UI ACTIONS
 */
window.switchLangs = () => {
    const s1 = document.getElementById('source-lang');
    const s2 = document.getElementById('target-lang');
    if (s1 && s2) { [s1.value, s2.value] = [s2.value, s1.value]; }
};

window.clearAll = () => {
    const input = document.getElementById('input-word');
    const res = document.getElementById('result-area');
    const tag = document.getElementById('source-tag');
    if (input) { input.value = ''; input.focus(); }
    if (res) { res.innerHTML = ''; res.classList.add('hidden'); }
    if (tag) tag.classList.add('hidden');
};

window.translateWord = async () => {
    const wordInput = document.getElementById('input-word');
    const btn = document.getElementById('translate-btn');
    const btnText = btn?.querySelector('.btn-t-text');
    
    if (!wordInput || !wordInput.value.trim()) return;

    const word = wordInput.value.trim();
    const source = document.getElementById('source-lang').value;
    const target = document.getElementById('target-lang').value;
    const curUILang = localStorage.getItem('agro5_ui_lang') || 'uz';
    const dict = UI_TRANSLATIONS[curUILang] || UI_TRANSLATIONS.uz;

    if (btn) btn.classList.add('loading');
    if (btnText) btnText.innerHTML = dict.translating;

    try {
        const res = await fetch(`${API_BASE}/terms/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ word, source_lang: source })
        });

        if (!res.ok) {
            const e = await res.json().catch(() => ({}));
            if (res.status === 429) throw new Error(curUILang === 'uz' ? "AI limiti tugadi. 1 daqiqa kuting." : "AI Quota limit. Wait 1 min.");
            throw new Error(e.detail || dict.error);
        }

        const data = await res.json();
        showResult(data, target);
        addRecent(data);
    } catch (err) {
        toast('❌', err.message);
    } finally {
        if (btn) btn.classList.remove('loading');
        if (btnText) btnText.innerHTML = dict.btn_trans;
    }
};

function showResult(term, target) {
    const container = document.getElementById('result-area');
    const tag = document.getElementById('source-tag');
    if (!container) return;

    const info = LANG_MAP[target] || LANG_MAP.uz;
    const value = term[info.key] || "—";

    container.innerHTML = `
        <div class="result-header">
            <span class="res-flag">${info.flag}</span>
            <span class="res-lang-name">${info.name}</span>
        </div>
        <div class="result-body">${esc(value)}</div>
    `;
    container.classList.remove('hidden');

    if (tag) {
        tag.textContent = term.id ? "DB" : "AI";
        tag.className = `source-tag ${term.id ? 'db' : 'ai'}`;
        tag.classList.remove('hidden');
    }
}

function addRecent(term) {
    const target = document.getElementById('target-lang')?.value || 'en';
    recentTerms = recentTerms.filter(t => t.word.toLowerCase() !== term.word.toLowerCase());
    recentTerms.unshift({ ...term, last_target: target });
    if (recentTerms.length > 12) recentTerms = recentTerms.slice(0, 12);
    localStorage.setItem('agro5_recent', JSON.stringify(recentTerms));
    renderRecent();
}

function renderRecent() {
    const list = document.getElementById('recent-list');
    if (!list) return;
    const currentTarget = document.getElementById('target-lang')?.value || 'en';

    if (!recentTerms.length) { 
        const curUILang = localStorage.getItem('agro5_ui_lang') || 'uz';
        list.innerHTML = `<p class="empty">${(UI_TRANSLATIONS[curUILang] || UI_TRANSLATIONS.uz).recent_empty}</p>`; 
        return; 
    }
    
    list.innerHTML = recentTerms.map(t => {
        const target = t.last_target || currentTarget;
        const info = LANG_MAP[target] || LANG_MAP.uz;
        return `
            <div class="rc" onclick="pickRecent('${esc(t.word).replace(/'/g, "\\'")}')">
                <div class="rc-word">${esc(t.word)}</div>
                <div class="rc-langs">
                    <div class="rc-row"><span class="rc-l">${info.flag}</span><span class="rc-v">${esc(t[info.key] || '—')}</span></div>
                </div>
            </div>`;
    }).join('');
}

window.pickRecent = (w) => {
    const input = document.getElementById('input-word');
    if (input) { input.value = w; translateWord(); }
};

/**
 * TABS & NAVIGATION
 */
window.switchTab = (tabId) => {
    document.querySelectorAll('.tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
    document.getElementById('view-translate')?.classList.toggle('hidden', tabId !== 'translate');
    document.getElementById('view-dictionary')?.classList.toggle('hidden', tabId !== 'dictionary');
    if (tabId === 'dictionary') loadDictionary();
};

async function loadDictionary() {
    const grid = document.getElementById('dict-grid');
    if (!grid) return;
    grid.innerHTML = '<div class="loader"></div>';
    try {
        const res = await fetch(`${API_BASE}/terms/`);
        const data = await res.json();
        if (!data.length) { grid.innerHTML = '<p class="empty">Hali terminlar yo\'q</p>'; return; }
        grid.innerHTML = data.map(t => `
            <div class="dict-card" onclick="pickRecent('${esc(t.word).replace(/'/g, "\\'")}')">
                <h3>${esc(t.word)}</h3>
                <div class="dc-grid">
                    <div><span>🇬🇧</span> ${esc(t.meaning_en)}</div>
                    <div><span>🇷🇺</span> ${esc(t.meaning_ru)}</div>
                </div>
            </div>`).join('');
    } catch {
        grid.innerHTML = '<p class="empty">Xatolik yuz berdi</p>';
    }
}

/**
 * THEME & LANGUAGE SELECT
 */
window.toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('agro5_theme', next);
};

window.changeUILang = () => {
    const lang = document.getElementById('ui-lang')?.value;
    if (lang) updateUILanguage(lang);
};

function updateUILanguage(lang) {
    localStorage.setItem('agro5_ui_lang', lang);
    const dict = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.uz;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.innerHTML = dict[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) el.placeholder = dict[key];
    });
    renderRecent();
}

/**
 * INITIALIZATION
 */
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('agro5_ui_lang') || 'uz';
    const sel = document.getElementById('ui-lang');
    if (sel) { sel.value = savedLang; updateUILanguage(savedLang); }

    const theme = localStorage.getItem('agro5_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);

    renderRecent();

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') translateWord();
        if (e.key === 'Escape') clearAll();
    });
});
