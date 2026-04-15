/* ========================================
   AGRO 5 LAB HUB — Full Featured App
   Copy · Shortcuts · Typewriter · Ripple
   Themes · Tooltips · Autocomplete · Counter
   UI Translations (5 Languages)
   ======================================== */

const API_BASE = window.location.origin;

const LANG_MAP = {
    en: { label: 'English', flag: '🇬🇧', key: 'meaning_en' },
    uz: { label: "O'zbekcha", flag: '🇺🇿', key: 'meaning_uz' },
    kr: { label: 'Qoraqalpogʻcha', flag: '🇺🇿', key: 'meaning_kr' },
    jp: { label: '日本語', flag: '🇯🇵', key: 'meaning_jp' },
    ru: { label: 'Русский', flag: '🇷🇺', key: 'meaning_kr' } // Note: Assuming backend lacks RU column, so fallback or mapping is needed. If backend has it, use meaning_ru.
};

// UI Translations Dictionary
const UI_TRANSLATIONS = {
    uz: {
        title: "Agro 5 Lab Hub — Ko'p tilli agro terminologiya",
        lab: "laboratoriya markazi",
        subtitle: "Ko'p tilli qishloq xo'jaligi terminologiyasi",
        tab_translate: "Tarjima",
        tab_dict: "Lug'at",
        from_lang: "Qaysi tildan",
        to_lang: "Qaysi tilga",
        en: "🇬🇧 English", uz: "🇺🇿 O'zbekcha", kr: "🇺🇿 Qoraqalpogʻcha", jp: "🇯🇵 日本語", ru: "🇷🇺 Русский",
        placeholder_result: "Natija shu yerda",
        btn_clear: "Tozalash",
        btn_trans: "Tarjima qilish",
        recent_title: "So'nggi tarjimalar",
        recent_empty: "Hali tarjimalar yo'q",
        dict_title: "Terminlar lug'ati",
        dict_sub: "Barcha saqlangan terminlar",
        dict_ta: "ta",
        k_trans: "tarjima",
        k_clear: "tozalash",
        // Attributes
        themeToggle: "Mavzuni o'zgartirish",
        tt_translate: "Tarjima qilish",
        tt_clear: "Maydonni tozalash",
        tt_swap: "Tillarni almashtirish",
        tt_clear_btn: "Esc tugmasi bilan ham bo'ladi",
        tt_trans_btn: "Ctrl+Enter",
        placeholder_input: "So'z kiriting…",
        search_ph: "Bazadan qidirish…"
    },
    en: {
        title: "Agro 5 Lab Hub — Multilingual Agro Terminology",
        lab: "laboratory center",
        subtitle: "Multilingual agricultural terminology",
        tab_translate: "Translate",
        tab_dict: "Dictionary",
        from_lang: "Source language",
        to_lang: "Target language",
        en: "🇬🇧 English", uz: "🇺🇿 Uzbek", kr: "🇺🇿 Karakalpak", jp: "🇯🇵 Japanese", ru: "🇷🇺 Russian",
        placeholder_result: "Result goes here",
        btn_clear: "Clear",
        btn_trans: "Translate",
        recent_title: "Recent Translations",
        recent_empty: "No translations yet",
        dict_title: "Terms Dictionary",
        dict_sub: "All saved terms",
        dict_ta: "items",
        k_trans: "translate",
        k_clear: "clear",
        themeToggle: "Toggle Theme",
        tt_translate: "Translate",
        tt_clear: "Clear Field",
        tt_swap: "Swap Languages",
        tt_clear_btn: "Also works with Esc key",
        tt_trans_btn: "Ctrl+Enter",
        placeholder_input: "Enter word…",
        search_ph: "Search database…"
    },
    kr: {
        title: "Agro 5 Lab Hub — Kóp tilli agro terminologiya",
        lab: "laboratoriya orayı",
        subtitle: "Kóp tilli awıl xojalıǵı terminologiyası",
        tab_translate: "Awdarma",
        tab_dict: "Sózlik",
        from_lang: "Qaysı tilden",
        to_lang: "Qaysı tilge",
        en: "🇬🇧 English", uz: "🇺🇿 Ózbekshe", kr: "🇺🇿 Qaraqalpaqsha", jp: "🇯🇵 Yaponsha", ru: "🇷🇺 Orys",
        placeholder_result: "Nátije usı jerde",
        btn_clear: "Tazalaw",
        btn_trans: "Awdarıw",
        recent_title: "Sońǵı awdarmalar",
        recent_empty: "Házirshe awdarmalar joq",
        dict_title: "Terminler sózligi",
        dict_sub: "Barlıq saqlanǵan terminler",
        dict_ta: "dana",
        k_trans: "awdarıw",
        k_clear: "tazalaw",
        themeToggle: "Temanı ózgertiw",
        tt_translate: "Awdarıw",
        tt_clear: "Maydandı tazalaw",
        tt_swap: "Tillerdi almastırıw",
        tt_clear_btn: "Esc túymesi menen de boladı",
        tt_trans_btn: "Ctrl+Enter",
        placeholder_input: "Sóz kiritiń…",
        search_ph: "Bazadan izlew…"
    },
    ru: {
        title: "Agro 5 Lab Hub — Многоязычная агро терминология",
        lab: "лабораторный центр",
        subtitle: "Многоязычная сельскохозяйственная терминология",
        tab_translate: "Перевод",
        tab_dict: "Словарь",
        from_lang: "С какого языка",
        to_lang: "На какой язык",
        en: "🇬🇧 Английский", uz: "🇺🇿 Узбекский", kr: "🇺🇿 Каракалпакский", jp: "🇯🇵 Японский", ru: "🇷🇺 Русский",
        placeholder_result: "Результат будет здесь",
        btn_clear: "Очистить",
        btn_trans: "Перевести",
        recent_title: "Последние переводы",
        recent_empty: "Пока нет переводов",
        dict_title: "Словарь терминов",
        dict_sub: "Все сохраненные термины",
        dict_ta: "шт",
        k_trans: "перевод",
        k_clear: "очистить",
        themeToggle: "Сменить тему",
        tt_translate: "Перевести",
        tt_clear: "Очистить поле",
        tt_swap: "Поменять языки",
        tt_clear_btn: "Также работает с Esc",
        tt_trans_btn: "Ctrl+Enter",
        placeholder_input: "Введите слово…",
        search_ph: "Поиск по базе…"
    },
    jp: {
        title: "Agro 5 Lab Hub — 多言語農業用語",
        lab: "実験センター",
        subtitle: "多言語農業用語",
        tab_translate: "翻訳する",
        tab_dict: "辞書",
        from_lang: "翻訳元",
        to_lang: "翻訳先",
        en: "🇬🇧 英語", uz: "🇺🇿 ウズベク語", kr: "🇺🇿 カラカルパク語", jp: "🇯🇵 日本語", ru: "🇷🇺 ロシア語",
        placeholder_result: "結果はここに表示されます",
        btn_clear: "クリア",
        btn_trans: "翻訳",
        recent_title: "最近の翻訳",
        recent_empty: "まだ翻訳はありません",
        dict_title: "用語辞典",
        dict_sub: "保存されたすべての用語",
        dict_ta: "件",
        k_trans: "翻訳",
        k_clear: "クリア",
        themeToggle: "テーマ切り替え",
        tt_translate: "翻訳する",
        tt_clear: "フィールドをクリア",
        tt_swap: "言語を入れ替える",
        tt_clear_btn: "Escキーでも機能します",
        tt_trans_btn: "Ctrl+Enter",
        placeholder_input: "単語を入力してください…",
        search_ph: "データベース検索…"
    }
};

let recentTerms = JSON.parse(localStorage.getItem('agro5_recent') || '[]');
let isTranslating = false;
let searchTimeout = null;
let acTimeout = null;

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initUILang();
    initEvents();
    initRipple();
    renderRecent();
});

// ========== THEME TOGGLE ==========
function initTheme() {
    const saved = localStorage.getItem('agro5_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('agro5_theme', next);
    toast(next === 'dark' ? '🌙' : '☀️', getThemeToastMsg(next));
}

function getThemeToastMsg(theme) {
    const lang = localStorage.getItem('agro5_ui_lang') || 'uz';
    if(lang==='ru') return theme==='dark'?'Темная тема':'Светлая тема';
    if(lang==='en') return theme==='dark'?'Dark mode':'Light mode';
    if(lang==='kr') return theme==='dark'?'Qarańģı tema':'Jarıq tema';
    if(lang==='jp') return theme==='dark'?'ダークモード':'ライトモード';
    return theme === 'dark' ? 'Qorong\'u mavzu' : 'Yorug\' mavzu';
}

// ========== UI LANGUAGE ==========
function initUILang() {
    const savedLang = localStorage.getItem('agro5_ui_lang') || 'uz';
    const select = document.getElementById('ui-lang');
    if (select) select.value = savedLang;
    applyUILang(savedLang);
}

function changeUILang() {
    const lang = document.getElementById('ui-lang').value;
    localStorage.setItem('agro5_ui_lang', lang);
    applyUILang(lang);
}

function applyUILang(lang) {
    const dict = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.uz;
    
    // Text elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.innerHTML = dict[key];
    });

    // Option tags might be using texts too
    document.querySelectorAll('option[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
    });

    // Titles / Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) el.setAttribute('placeholder', dict[key]);
    });

    // Tooltips
    document.querySelectorAll('[data-i18n-tooltip]').forEach(el => {
        const key = el.getAttribute('data-tooltip'); // actual key is inside data-tooltip for these
        if (dict[key]) el.setAttribute('data-tooltip', dict[key]);
    });
    
    document.documentElement.lang = lang;
}

// ========== EVENTS ==========
function initEvents() {
    const input = document.getElementById('input-word');
    const count = document.getElementById('char-count');

    // Character count
    input.addEventListener('input', () => {
        count.textContent = `${input.value.length}/100`;
        // Autocomplete
        clearTimeout(acTimeout);
        const val = input.value.trim();
        if (val.length >= 2) {
            acTimeout = setTimeout(() => fetchAutocomplete(val), 250);
        } else {
            hideAutocomplete();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            translateWord();
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            clearInput();
            hideAutocomplete();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
            e.preventDefault();
            translateWord();
        }
    });

    // Search with debounce
    const search = document.getElementById('search-input');
    search.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        const q = search.value.trim();
        if (q.length < 2) { hideSearch(); return; }
        searchTimeout = setTimeout(() => doSearch(q), 300);
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.io-input')) hideAutocomplete();
    });
}

// ========== RIPPLE EFFECT ==========
function initRipple() {
    document.querySelectorAll('.ripple').forEach(el => {
        el.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            const wave = document.createElement('span');
            wave.className = 'ripple-wave';
            wave.style.width = wave.style.height = `${size}px`;
            wave.style.left = `${x}px`;
            wave.style.top = `${y}px`;

            this.appendChild(wave);
            setTimeout(() => wave.remove(), 600);
        });
    });
}

// ========== TABS ==========
function switchTab(name) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.tab[data-tab="${name}"]`).classList.add('active');
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(`view-${name}`).classList.add('active');
    if (name === 'dictionary') loadDict();
}

// ========== SWAP ==========
function swapLanguages() {
    const s = document.getElementById('source-lang');
    const t = document.getElementById('target-lang');
    const tmp = s.value;
    s.value = t.value;
    t.value = tmp;
}

// ========== TRANSLATE ==========
async function translateWord() {
    if (isTranslating) return;
    const word = document.getElementById('input-word').value.trim();
    if (!word) { 
        toast('⚠️', getToastErrUi('empty')); 
        return; 
    }

    const btn = document.getElementById('translate-btn');
    const spinner = document.getElementById('btn-spinner');
    isTranslating = true;
    btn.classList.add('loading');
    spinner.classList.remove('hidden');
    hideAutocomplete();

    try {
        const res = await fetch(`${API_BASE}/terms`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ word, source_lang: document.getElementById('source-lang').value }),
        });
        if (!res.ok) {
            const e = await res.json().catch(() => ({}));
            throw new Error(e.detail || `Xatolik: ${res.status}`);
        }
        const data = await res.json();
        showResult(data);
        addRecent(data);
        toast('✅', data.source === 'ai' ? getToastAiInfo() : getToastDbInfo());
    } catch (err) {
        toast('❌', err.message || getToastErrUi('error'));
    } finally {
        isTranslating = false;
        btn.classList.remove('loading');
        spinner.classList.add('hidden');
    }
}

function getToastErrUi(errType) {
    const lang = localStorage.getItem('agro5_ui_lang') || 'uz';
    if(lang==='ru') return errType==='empty'?'Введите слово':'Ошибка перевода';
    if(lang==='en') return errType==='empty'?'Enter a word':'Translation error';
    if(lang==='kr') return errType==='empty'?'Sóz kiritiń':'Awdarma qáteligi';
    if(lang==='jp') return errType==='empty'?'単語を入力してください':'翻訳エラー';
    return errType==='empty'?'Iltimos, so\'z kiriting':'Tarjima xatoligi';
}
function getToastAiInfo() {
    const lang = localStorage.getItem('agro5_ui_lang') || 'uz';
    if(lang==='ru') return 'Переведено через AI';
    if(lang==='en') return 'Translated by AI';
    if(lang==='kr') return 'AI arqalı awdarıldı';
    if(lang==='jp') return 'AIで翻訳されました';
    return 'AI orqali tarjima qilindi';
}
function getToastDbInfo() {
    const lang = localStorage.getItem('agro5_ui_lang') || 'uz';
    if(lang==='ru') return 'Найдено в базе';
    if(lang==='en') return 'Found in database';
    if(lang==='kr') return 'Bazadan tabıldı';
    if(lang==='jp') return 'データベースで見つかりました';
    return 'Bazadan topildi';
}

// ========== DISPLAY RESULT (with typewriter) ==========
function showResult(data) {
    document.getElementById('placeholder-text').classList.add('hidden');
    const list = document.getElementById('result-list');
    list.classList.remove('hidden');

    const tag = document.getElementById('source-tag');
    tag.classList.remove('hidden', 'ai', 'db');
    tag.classList.add(data.source === 'ai' ? 'ai' : 'db');
    tag.textContent = data.source === 'ai' ? '✨ AI' : '📚 DB';

    const target = document.getElementById('target-lang').value;
    const allLangs = ['uz', 'en', 'kr', 'jp']; // Backend only returns 4 fields initially
    const order = [target, ...allLangs.filter(l => l !== target && l !== 'ru')];

    list.innerHTML = order.map((lang, i) => {
        const info = LANG_MAP[lang];
        if(!info) return '';
        const value = data[info.key] || '—';
        return `<div class="r-item">
            <span class="r-lang">${info.flag} ${lang}</span>
            <span class="r-val" id="rval-${i}" data-full="${esc(value)}"></span>
            <button class="copy-btn" onclick="copyText('${esc(value).replace(/'/g, "\\'")}', this)" data-tooltip="${getCopyTooltip()}" data-i18n-tooltip>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
        </div>`;
    }).join('');

    // Typewriter effect for each result
    order.forEach((lang, i) => {
        if(!LANG_MAP[lang]) return;
        const value = data[LANG_MAP[lang].key] || '—';
        typewrite(`rval-${i}`, value, 30 + i * 80);
    });
}

function getCopyTooltip() {
    const lang = localStorage.getItem('agro5_ui_lang') || 'uz';
    if(lang==='ru') return 'Копировать';
    if(lang==='en') return 'Copy';
    if(lang==='kr') return 'Kóshirip alıw';
    if(lang==='jp') return 'コピー';
    return 'Nusxa olish';
}

// ========== TYPEWRITER EFFECT ==========
function typewrite(elementId, text, delay) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.textContent = '';
    el.classList.add('typing');
    let idx = 0;

    setTimeout(() => {
        const interval = setInterval(() => {
            el.textContent += text[idx];
            idx++;
            if (idx >= text.length) {
                clearInterval(interval);
                el.classList.remove('typing');
            }
        }, 25);
    }, delay);
}

// ========== COPY TO CLIPBOARD ==========
async function copyText(text, btn) {
    try {
        await navigator.clipboard.writeText(text);
        btn.classList.add('copied');
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>';
        
        const lang = localStorage.getItem('agro5_ui_lang') || 'uz';
        let msg = 'Nusxa olindi!';
        if (lang === 'ru') msg = 'Скопировано!';
        else if (lang === 'en') msg = 'Copied!';
        else if (lang === 'kr') msg = 'Kóshirildi!';
        else if (lang === 'jp') msg = 'コピーしました!';
        
        toast('📋', msg);
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
        }, 2000);
    } catch {
        toast('❌', 'Xatolik');
    }
}

// ========== AUTOCOMPLETE (auto-suggestions) ==========
async function fetchAutocomplete(query) {
    try {
        const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) return;
        const data = await res.json();
        showAutocomplete(data);
    } catch { /* silent */ }
}

function showAutocomplete(results) {
    const ac = document.getElementById('autocomplete');
    if (!results || !results.length) {
        hideAutocomplete();
        return;
    }

    const items = results.slice(0, 5);
    ac.innerHTML = items.map(t => {
        const langs = [t.meaning_uz, t.meaning_en].filter(Boolean).join(' · ');
        return `<div class="ac-item" onclick="pickAutocomplete('${esc(t.word).replace(/'/g, "\\'")}')">
            <span>${esc(t.word)}</span>
            <span class="ac-item-lang">${esc(langs)}</span>
        </div>`;
    }).join('');

    ac.classList.remove('hidden');
}

function hideAutocomplete() {
    document.getElementById('autocomplete').classList.add('hidden');
}

function pickAutocomplete(word) {
    document.getElementById('input-word').value = word;
    document.getElementById('char-count').textContent = `${word.length}/100`;
    hideAutocomplete();
    translateWord();
}

// ========== SEARCH ==========
async function doSearch(q) {
    try {
        const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(q)}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        showSearch(data);
    } catch { /* silent */ }
}

function showSearch(results) {
    const c = document.getElementById('search-results');
    if (!results.length) {
        c.innerHTML = `<p class="empty">${getEmptySearch()}</p>`;
        c.classList.remove('hidden');
        return;
    }
    c.innerHTML = results.map((t, i) => `
        <div class="sr-item" style="animation-delay:${i * 0.04}s" onclick="pickSearch('${esc(t.word).replace(/'/g, "\\'")}')">
            <span class="sr-word">${esc(t.word)}</span>
            <div class="sr-trans">
                <span><span class="sr-l">UZ</span>${esc(t.meaning_uz || '—')}</span>
                <span><span class="sr-l">EN</span>${esc(t.meaning_en || '—')}</span>
                <span><span class="sr-l">KR</span>${esc(t.meaning_kr || '—')}</span>
                <span><span class="sr-l">JP</span>${esc(t.meaning_jp || '—')}</span>
            </div>
        </div>`).join('');
    c.classList.remove('hidden');
}

function getEmptySearch() {
    const lang = localStorage.getItem('agro5_ui_lang') || 'uz';
    if(lang==='ru') return 'Ничего не найдено';
    if(lang==='en') return 'Not found';
    if(lang==='kr') return 'Tabılmadı';
    if(lang==='jp') return '見つかりませんでした';
    return 'Topilmadi';
}

function hideSearch() {
    const c = document.getElementById('search-results');
    c.classList.add('hidden');
    c.innerHTML = '';
}

function pickSearch(word) {
    document.getElementById('input-word').value = word;
    document.getElementById('char-count').textContent = `${word.length}/100`;
    document.getElementById('search-input').value = '';
    hideSearch();
    translateWord();
}

// ========== RECENT ==========
function addRecent(term) {
    recentTerms = recentTerms.filter(t => t.id !== term.id);
    recentTerms.unshift(term);
    if (recentTerms.length > 12) recentTerms = recentTerms.slice(0, 12);
    localStorage.setItem('agro5_recent', JSON.stringify(recentTerms));
    renderRecent();
}

function renderRecent() {
    const list = document.getElementById('recent-list');
    if (!recentTerms.length) {
        list.innerHTML = `<p class="empty" data-i18n="recent_empty">${UI_TRANSLATIONS[localStorage.getItem('agro5_ui_lang') || 'uz'].recent_empty}</p>`;
        return;
    }
    list.innerHTML = recentTerms.map((t, i) => {
        const bc = t.source === 'ai' ? 'ai' : 'db';
        const bt = t.source === 'ai' ? '✨AI' : '📚DB';
        return `<div class="rc" style="animation-delay:${i * 0.04}s">
            <div class="rc-word">${esc(t.word)} <span class="source-tag ${bc}" style="font-size:0.5rem;padding:1px 5px">${bt}</span></div>
            <div class="rc-langs">
                <div class="rc-row"><span class="rc-l">UZ</span><span class="rc-v">${esc(t.meaning_uz || '—')}</span></div>
                <div class="rc-row"><span class="rc-l">EN</span><span class="rc-v">${esc(t.meaning_en || '—')}</span></div>
                <div class="rc-row"><span class="rc-l">KR</span><span class="rc-v">${esc(t.meaning_kr || '—')}</span></div>
                <div class="rc-row"><span class="rc-l">JP</span><span class="rc-v">${esc(t.meaning_jp || '—')}</span></div>
            </div>
        </div>`;
    }).join('');
}

// ========== DICTIONARY (with animated counter) ==========
async function loadDict() {
    const grid = document.getElementById('dict-grid');
    const statEl = document.getElementById('stat-total');

    try {
        const res = await fetch(`${API_BASE}/terms`);
        if (!res.ok) throw new Error();
        const data = await res.json();

        // Animated counter
        animateCounter(statEl, data.length);

        if (!data.length) {
            grid.innerHTML = `<p class="empty">${getEmptySearch()}</p>`;
            return;
        }

        grid.innerHTML = data.map((t, i) => `
            <div class="dc" style="animation-delay:${Math.min(i * 0.03, 0.5)}s">
                <div class="dc-word">${esc(t.word)}</div>
                <div class="dc-cat">${esc(t.category || 'general')}</div>
                <div class="dc-langs">
                    <div class="dc-r"><span class="dc-flag">🇺🇿</span><span class="dc-t">${esc(t.meaning_uz || '—')}</span></div>
                    <div class="dc-r"><span class="dc-flag">🇬🇧</span><span class="dc-t">${esc(t.meaning_en || '—')}</span></div>
                    <div class="dc-r"><span class="dc-flag">🇺🇿</span><span class="dc-t">${esc(t.meaning_kr || '—')}</span></div>
                    <div class="dc-r"><span class="dc-flag">🇯🇵</span><span class="dc-t">${esc(t.meaning_jp || '—')}</span></div>
                </div>
            </div>`).join('');
    } catch {
        grid.innerHTML = '<p class="empty">Error</p>';
    }
}

// ========== ANIMATED COUNTER ==========
function animateCounter(el, target) {
    const duration = 800;
    const start = parseInt(el.textContent) || 0;
    const diff = target - start;
    if (diff === 0) return;

    const startTime = performance.now();

    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(start + diff * eased);

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            el.textContent = target;
        }
    }

    requestAnimationFrame(step);
}

// ========== CLEAR ==========
function clearInput() {
    document.getElementById('input-word').value = '';
    document.getElementById('char-count').textContent = '0/100';
    document.getElementById('placeholder-text').classList.remove('hidden');
    document.getElementById('result-list').classList.add('hidden');
    document.getElementById('source-tag').classList.add('hidden');
    hideAutocomplete();
    document.getElementById('input-word').focus();
}

// ========== TOAST ==========
function toast(icon, msg) {
    const el = document.getElementById('toast');
    document.getElementById('toast-icon').textContent = icon;
    document.getElementById('toast-msg').textContent = msg;
    el.classList.remove('hidden');
    void el.offsetWidth;
    el.classList.add('show');
    setTimeout(() => {
        el.classList.remove('show');
        setTimeout(() => el.classList.add('hidden'), 350);
    }, 2500);
}

// ========== UTIL ==========
function esc(s) {
    if (!s) return '';
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
}
