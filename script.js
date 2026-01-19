// ==========================================
// 1. AYARLAR VƏ MƏLUMAT BAZASI (FINAL)
// ==========================================

// 🔴 DİQQƏT: Yeni Deploy etdiyin linki bura qoy!
const API_URL = "https://script.google.com/macros/s/AKfycbxFTNIPqJ0IjtuqMSSzuP3LxRR3ERnTOtYKBmnhZ6nzM9JUmaMnwG7x0gJdohdUhHoU/exec";

// KATEQORİYALAR
const DEFAULT_CATS = [
    { id: 'netflix', name: 'Netflix', img: 'img/netflix.png', sub: 'Film & Serial' },
    { id: 'spotify', name: 'Spotify', img: 'img/spotify.png', sub: 'Musiqi & Podkast' },
    { id: 'youtube', name: 'YouTube', img: 'img/youtube.png', sub: 'Premium Video' },
    { id: 'gemini', name: 'Gemini AI', img: 'img/gemini.png', sub: 'Süni İntellekt' },
    { id: 'minecraft', name: 'Minecraft', img: 'img/minecraft.png', sub: 'Java & Bedrock' },
    { id: 'steam', name: 'Steam', img: 'img/steam.png', sub: 'Oyun Paketleri' },
    { id: 'valorant', name: 'Valorant', img: 'img/valorant.png', sub: 'VP (TR & EU)' },
    { id: 'pubg', name: 'PUBG Mobile', img: 'img/pubg.png', sub: 'Global UC' },
    { id: 'efootball', name: 'eFootball', img: 'img/efootball.png', sub: 'Mobile Coins' }
];

// MƏHSULLAR (PREMIUM AÇIQLAMALARLA)
const DEFAULT_PRODS = [
    { id: 101, catId: 'netflix', name: 'Netflix 1 Aylıq', price: 5.99, desc: '📺 4K Ultra HD <br> 🔒 Şəxsi Profil (Şifrəli) <br> 🛡️ Tam Zəmanət' },
    { id: 102, catId: 'netflix', name: 'Netflix 3 Aylıq', price: 14.99, desc: '📺 4K Ultra HD <br> ⏳ 3 Ay Kəsintisiz <br> 🛡️ Tam Zəmanət' },
    { id: 201, catId: 'spotify', name: 'Spotify 1 Aylıq', price: 4.99, desc: '🎵 Yüksək Səs Keyfiyyəti <br> 🚫 Reklamsız Dinləmə <br> 👤 Fərdi Plan' },
    { id: 202, catId: 'spotify', name: 'Spotify 3 Aylıq', price: 11.99, desc: '🎵 3 Ay Premium <br> ⏭️ Mahnı Keçmə Haqqı <br> 🛡️ Tam Zəmanət' },
    { id: 301, catId: 'youtube', name: 'YouTube 1 Aylıq', price: 4.99, desc: '🚫 Reklamsız Video <br> 📱 Arxa Planda Oynatma <br> 🎁 YouTube Music Hədiyyə' },
    { id: 302, catId: 'youtube', name: 'YouTube 3 Aylıq', price: 11.99, desc: '⏳ 3 Ay Premium <br> ⬇️ Videoları Yüklə <br> 🛡️ Tam Zəmanət' },
    { id: 401, catId: 'gemini', name: 'Gemini Advanced 1 Ay', price: 4.99, desc: '🧠 Google AI 1.5 Pro <br> 🚀 Ən Son Model <br> 💻 Kodlama və Analiz' },
    { id: 501, catId: 'minecraft', name: 'Minecraft Premium', price: 19.99, desc: '🌍 Java & Bedrock <br> 🛡️ Ömürlük Zəmanət <br> 👕 Skin/Nick Dəyişmə' },
    { id: 601, catId: 'steam', name: 'Steam - 3 Oyun', price: 8.99, desc: '🎮 İstənilən 3 Oyun <br> 📂 Offline (Kariyer/Hekayə) <br> ♾️ Ömürlük Giriş' },
    { id: 701, catId: 'valorant', name: '[TR] 375 VP', price: 6.99, desc: '🇹🇷 Türkiyə Serveri <br> ⚡ 7/24 Anında Təslim <br> 💎 Rəsmi Riot Kodu' },
    { id: 702, catId: 'valorant', name: '[TR] 875 VP', price: 12.99, desc: '🇹🇷 Türkiyə Serveri <br> ⚡ 7/24 Anında Təslim <br> 💎 Rəsmi Riot Kodu' },
    { id: 703, catId: 'valorant', name: '[TR] Battle Pass', price: 16.49, desc: '🎟️ Sezon Bileti Üçün <br> ⚡ Anında Təslim <br> 💎 Rəsmi Kod' },
    { id: 704, catId: 'valorant', name: '[TR] 1700 VP', price: 20.99, desc: '🇹🇷 Türkiyə Serveri <br> ⚡ 7/24 Anında Təslim <br> 💎 Rəsmi Riot Kodu' },
    { id: 705, catId: 'valorant', name: '[TR] 2925 VP', price: 34.99, desc: '🇹🇷 Türkiyə Serveri <br> ⚡ 7/24 Anında Təslim <br> 💎 Rəsmi Riot Kodu' },
    { id: 706, catId: 'valorant', name: '[TR] 4325 VP', price: 49.99, desc: '🇹🇷 Türkiyə Serveri <br> ⚡ 7/24 Anında Təslim <br> 💎 Rəsmi Riot Kodu' },
    { id: 707, catId: 'valorant', name: '[TR] 8900 VP', price: 96.99, desc: '🇹🇷 Türkiyə Serveri <br> ⚡ 7/24 Anında Təslim <br> 💎 Rəsmi Riot Kodu' },
    { id: 751, catId: 'valorant', name: '[EU] 475 VP', price: 10.99, desc: '🇪🇺 Avropa Serveri <br> ⚡ 7/24 Anında Təslim <br> 💎 Rəsmi Riot Kodu' },
    { id: 752, catId: 'valorant', name: '[EU] 1000 VP', price: 18.99, desc: '🇪🇺 Avropa Serveri <br> ⚡ 7/24 Anında Təslim <br> 💎 Rəsmi Riot Kodu' },
    { id: 753, catId: 'valorant', name: '[EU] 2050 VP', price: 68.99, desc: '🇪🇺 Avropa Serveri <br> ⚡ 7/24 Anında Təslim <br> 💎 Rəsmi Riot Kodu' },
    { id: 754, catId: 'valorant', name: '[EU] 5350 VP', price: 86.99, desc: '🇪🇺 Avropa Serveri <br> ⚡ 7/24 Anında Təslim <br> 💎 Rəsmi Riot Kodu' },
    { id: 801, catId: 'pubg', name: '60 UC', price: 2.99, desc: '🌍 Global E-pin <br> ✅ Ban Riski Yoxdur <br> 🚀 Avtomatik Təslim' },
    { id: 802, catId: 'pubg', name: '325 UC', price: 8.99, desc: '🌍 Global E-pin <br> 🎁 +Bonus Daxil <br> 🚀 Avtomatik Təslim' },
    { id: 803, catId: 'pubg', name: '660 UC', price: 17.99, desc: '🌍 Global E-pin <br> 🎁 +Bonus Daxil <br> 🚀 Avtomatik Təslim' },
    { id: 804, catId: 'pubg', name: '3850 UC', price: 79.99, desc: '🌍 Global E-pin <br> 🎁 +Bonus Daxil <br> 🚀 Avtomatik Təslim' },
    { id: 805, catId: 'pubg', name: '16200 UC', price: 311.99, desc: '🌍 Global E-pin <br> 🎁 +Bonus Daxil <br> 🚀 Avtomatik Təslim' },
    { id: 901, catId: 'efootball', name: '130 Coins', price: 2.99, desc: '🆔 Yalnız ID ilə <br> ⚡ Sürətli Yükləmə <br> ✅ Rəsmi Alış' },
    { id: 902, catId: 'efootball', name: '300 Coins', price: 6.99, desc: '🆔 Yalnız ID ilə <br> ⚡ Sürətli Yükləmə <br> ✅ Rəsmi Alış' },
    { id: 903, catId: 'efootball', name: '550 Coins', price: 9.99, desc: '🆔 Yalnız ID ilə <br> ⚡ Sürətli Yükləmə <br> ✅ Rəsmi Alış' },
    { id: 904, catId: 'efootball', name: '750 Coins', price: 12.99, desc: '🆔 Yalnız ID ilə <br> ⚡ Sürətli Yükləmə <br> ✅ Rəsmi Alış' },
    { id: 905, catId: 'efootball', name: '1040 Coins', price: 15.99, desc: '🆔 Yalnız ID ilə <br> ⚡ Sürətli Yükləmə <br> ✅ Rəsmi Alış' },
    { id: 906, catId: 'efootball', name: '2130 Coins', price: 29.99, desc: '🆔 Yalnız ID ilə <br> ⚡ Sürətli Yükləmə <br> ✅ Rəsmi Alış' },
    { id: 907, catId: 'efootball', name: '3250 Coins', price: 43.99, desc: '🆔 Yalnız ID ilə <br> ⚡ Sürətli Yükləmə <br> ✅ Rəsmi Alış' },
    { id: 908, catId: 'efootball', name: '5700 Coins', price: 69.99, desc: '🆔 Yalnız ID ilə <br> ⚡ Sürətli Yükləmə <br> ✅ Rəsmi Alış' },
    { id: 909, catId: 'efootball', name: '12800 Coins', price: 148.99, desc: '🆔 Yalnız ID ilə <br> ⚡ Sürətli Yükləmə <br> ✅ Rəsmi Alış' }
];

// Qlobal Dəyişənlər
let db = { products: DEFAULT_PRODS, categories: DEFAULT_CATS, orders: [], balance_requests: [], users: [] };
let currentUser = null;
let cart = [];

// ==========================================
// 2. TOAST BİLDİRİŞ SİSTEMİ
// ==========================================
function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    toast.innerHTML = `<i class="fas ${icon}" style="margin-right:10px;"></i> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = "fadeOut 0.4s ease forwards";
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// ==========================================
// 3. FETCH (SERVER ƏLAQƏSİ)
// ==========================================
async function sendRequest(data) {
    if (API_URL.includes("BURAYA")) {
        showToast("API Linki təyin edilməyib!", "error");
        return { status: "error" };
    }
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("Fetch Xətası:", error);
        return { status: "error" };
    }
}

// ==========================================
// 4. INIT (SÜRƏTLİ AÇILIŞ)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Düymələri Aktiv Et
    const b1 = document.getElementById('btn-login'); if (b1) { b1.disabled = false; b1.innerText = "Giriş Et"; }
    const b2 = document.getElementById('btn-register'); if (b2) { b2.disabled = false; b2.innerText = "Qeydiyyatdan Keç"; }

    // 2. Yaddaşdan Oxu
    const session = localStorage.getItem('activeUser');
    if (session) {
        try {
            currentUser = JSON.parse(session);
            checkSession();
            updateUserUI();
        } catch (e) {
            localStorage.removeItem('activeUser');
        }
    }

    // 3. Ekranı Qur
    createModalHTML();
    renderUserHome();

    // 4. Loaderi Söndür (500ms sonra)
    setTimeout(() => { toggleLoading(false); }, 500);

    // 5. Arxa Plan (Public Data)
    sendRequest({ action: "getPublicData" }).catch(() => {});

    // 6. Arxa Plan (Login Check)
    if (currentUser && currentUser.username && currentUser.password) {
        sendRequest({
            action: "login",
            username: currentUser.username,
            password: currentUser.password
        }).then(res => {
            if (res.status === "success") {
                const savedPass = currentUser.password;
                currentUser = res.user;
                currentUser.password = savedPass;
                localStorage.setItem('activeUser', JSON.stringify(currentUser));
                updateUserUI();
            }
        }).catch(() => {});
    }
});

function toggleLoading(show) {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = show ? 'flex' : 'none';
}

// ==========================================
// 5. AUTH & SESSION
// ==========================================
function checkSession() {
    const userSec = document.getElementById('user-section');
    const adminSec = document.getElementById('admin-section');
    const authSec = document.getElementById('auth-section');
    const guestMenu = document.getElementById('guest-menu');
    const userMenu = document.getElementById('user-menu');

    if(authSec) authSec.classList.add('hidden');
// checkSession funksiyasının içində bu olmalıdır:
if (currentUser.role === 'admin') {
    if (userSec) userSec.classList.add('hidden');
    if (adminSec) adminSec.classList.remove('hidden'); // Admini açır
    fetchAdminData();
}
    if (currentUser) {
        if (currentUser.role === 'admin') {
            if (userSec) userSec.classList.add('hidden');
            if (adminSec) adminSec.classList.remove('hidden');
            fetchAdminData();
        } else {
            if (adminSec) adminSec.classList.add('hidden');
            if (userSec) userSec.classList.remove('hidden');
            if (guestMenu) guestMenu.classList.add('hidden');
            if (userMenu) userMenu.classList.remove('hidden');
            updateUserUI();
        }
    } else {
        if (adminSec) adminSec.classList.add('hidden');
        if (userSec) userSec.classList.remove('hidden');
        if (guestMenu) guestMenu.classList.remove('hidden');
        if (userMenu) userMenu.classList.add('hidden');
    }
}

function renderUserHomeFromAdmin() {
    document.getElementById('admin-section').classList.add('hidden');
    document.getElementById('user-section').classList.remove('hidden');
    renderUserHome();
}

function openAuth() { document.getElementById('auth-section').classList.remove('hidden'); }
function closeAuth() { document.getElementById('auth-section').classList.add('hidden'); }
function logout() { localStorage.clear(); location.reload(); }

function switchAuth(type) {
    const l = document.getElementById('login-form-container');
    const r = document.getElementById('register-form-container');
    if (type === 'register') { l.classList.add('hidden'); r.classList.remove('hidden'); }
    else { r.classList.add('hidden'); l.classList.remove('hidden'); }
}

async function handleAuth(e) {
    e.preventDefault();
    const u = document.getElementById('login-username').value.trim();
    const p = document.getElementById('login-password').value.trim();
    toggleLoading(true);
    const result = await sendRequest({ action: "login", username: u, password: p });
    toggleLoading(false);
    if (result.status === "success") {
        currentUser = result.user;
        currentUser.password = p; 
        localStorage.setItem('activeUser', JSON.stringify(currentUser));
        showToast(`Xoş gəldiniz, ${currentUser.username}!`, "success");
        checkSession();
    } else {
        showToast(result.message || "Giriş uğursuz.", "error");
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const u = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const p = document.getElementById('reg-password').value.trim();
    toggleLoading(true);
    const result = await sendRequest({ action: "register", username: u, password: p, email: email });
    toggleLoading(false);
    if (result.status === "success") {
        currentUser = result.user;
        currentUser.password = p;
        localStorage.setItem('activeUser', JSON.stringify(currentUser));
        showToast("Qeydiyyat uğurludur!", "success");
        checkSession();
        setTimeout(openProfileModal, 1000);
    } else {
        showToast(result.message, "error");
    }
}

function updateUserUI() {
    if (!currentUser) return;
    let safeBalance = currentUser.balance ? Number(currentUser.balance) : 0;
    
    const desktopBal = document.getElementById('user-balance-display');
    if (desktopBal) desktopBal.innerHTML = `${safeBalance.toFixed(2)} ₼`;

    const mobileBal = document.getElementById('mobile-balance-display');
    if (mobileBal) {
        mobileBal.innerHTML = `${safeBalance.toFixed(2)} ₼`;
        mobileBal.style.display = (window.innerWidth <= 768) ? 'flex' : 'none';
    }
    
    document.querySelectorAll('.badge').forEach(b => b.innerText = cart.length);
}

// ==========================================
// 6. MAĞAZA FUNKSİYALARI
// ==========================================
function renderUserHome() {
    const v = document.getElementById('user-view');
    
    // YENİ HERO ALANI (Çakışma Önleyici İsimlerle)
    let html = `
    <div class="ah-banner-area">
        <div class="ah-banner-wrapper">
            
            <div class="ah-anim-icons">
                <i class="fab fa-spotify ah-icon ah-i1"></i>
                <i class="fab fa-steam ah-icon ah-i2"></i>
                <i class="fab fa-playstation ah-icon ah-i3"></i>
                <i class="fab fa-xbox ah-icon ah-i4"></i>
                <i class="fas fa-gamepad ah-icon ah-i5"></i>
                <i class="fab fa-apple ah-icon ah-i6"></i>
            </div>

            <div class="ah-banner-content">
                <h1 class="ah-main-title">Aurahub</h1>
                <p class="ah-sub-text">Oyunlar, Abunəliklər və E-pinlər.<br>Sənin zövqünə və cibinə uyğun :)</p>
                <button class="ah-action-btn" onclick="document.querySelector('.grid-cols').scrollIntoView({behavior: 'smooth'})">
                    İndi Kəşf Et <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    </div>`;

    // Alt Kısım (Aynı kalıyor)
    html += `<div class="container"><h2 class="section-title">Kəşf Et</h2><div class="grid-cols">`;
    DEFAULT_CATS.forEach(c => {
        html += `
        <div class="pro-card" onclick="renderCategoryProducts('${c.id}')" style="cursor:pointer;">
            <div class="card-top"><div class="logo-box"><img src="${c.img}"></div></div>
            <div class="card-info"><h3>${c.name}</h3></div>
            <div class="card-price"><button class="buy-btn" style="width:100%">Daxil Ol</button></div>
        </div>`;
    });
    v.innerHTML = html + `</div></div>`;
}
function renderCategoryProducts(catId) {
    const v = document.getElementById('user-view');
    const prods = db.products.filter(p => String(p.catId) === String(catId));
    const cat = DEFAULT_CATS.find(c => String(c.id) === String(catId));

    let html = `
        <div class="container" style="padding-top:20px;">
            <button onclick="renderUserHome()" style="background:rgba(255,255,255,0.1); color:white; border:none; padding:10px 20px; border-radius:10px; margin-bottom:20px; cursor:pointer;">
                <i class="fas fa-arrow-left"></i> Geri
            </button>
            <h2 class="section-title">${cat ? cat.name : 'Məhsullar'} <span>Paketləri</span></h2>
            <div class="grid-cols">`;

    if (prods.length === 0) {
        html += `<p style="color:#94a3b8; grid-column: 1/-1; text-align:center;">Məhsul yoxdur.</p>`;
    } else {
        prods.forEach(p => {
            html += `
            <div class="pro-card" onclick="openDetail(${p.id})">
                <div class="card-top">
                    <div class="logo-box"><img src="${cat ? cat.img : ''}" onerror="this.style.display='none'"></div>
                </div>
                <div class="card-info">
                    <h3>${p.name}</h3>
                    ${p.desc ? `<h5 style="color:#94a3b8; font-size:0.8rem; margin-top:5px; line-height:1.5;">${p.desc}</h5>` : ''}
                </div>
                <div class="card-price">
                    <div class="price">${p.price} ₼</div>
                    <button class="buy-btn" onclick="event.stopPropagation(); addToCart(${p.id})">
                        <i class="fas fa-cart-plus"></i> Səbətə At
                    </button>
                </div>
            </div>`;
        });
    }
    v.innerHTML = html + `</div></div>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openDetail(id) {
    const p = db.products.find(x => String(x.id) === String(id));
    if (!p) return;
    const cat = DEFAULT_CATS.find(c => String(c.id) === String(p.catId));
    
    if (!document.getElementById('modal-overlay')) createModalHTML();

    const html = `
        <div class="modal-grid">
            <div class="modal-img-area">
                <img src="${cat ? cat.img : ''}" onerror="this.style.display='none'" style="width:100%; height:100%; border-radius:20px; object-fit:contain;">
            </div>
            <div class="modal-right">
                <h2 style="color:white; text-align:center;">${p.name}</h2>
                <h1 style="color:#10b981; text-align:center; margin:10px 0;">${p.price} ₼</h1>
                <div style="color:#cbd5e1; text-align:center; margin-bottom:20px; line-height:1.6;">${p.desc || 'Məlumat yoxdur.'}</div>
                <button class="full-btn" onclick="addToCart(${p.id})">Səbətə At</button>
            </div>
        </div>`;
    
    document.getElementById('modal-dynamic-content').innerHTML = html;
    document.getElementById('modal-overlay').style.display = 'flex';
}

function handleSearch(e) {
    const term = e.target.value.toLowerCase().trim();
    if(term.length === 0) { renderUserHome(); return; }
    if(term.length < 2) return; 

    const v = document.getElementById('user-view');
    let html = `<div class="container"><h2 class="section-title">Axtarış: <span>"${e.target.value}"</span></h2><div class="grid-cols">`;
    let foundAny = false;

    // 1. Kategoriyalar
    db.categories.filter(c => c.name.toLowerCase().includes(term)).forEach(c => {
        foundAny = true;
        html += `
        <div class="pro-card" onclick="renderCategoryProducts('${c.id}')" style="cursor:pointer; border: 1px solid #6366f1;">
            <div class="card-top"><div class="logo-box"><img src="${c.img}"></div></div>
            <div class="card-info"><h3 style="color:#a5b4fc;">KATEQORİYA</h3><h3>${c.name}</h3></div>
            <div class="card-price"><button class="buy-btn" style="width:100%">Paketlərə Bax</button></div>
        </div>`;
    });

    // 2. Məhsullar
    db.products.filter(p => {
        const cat = db.categories.find(c => c.id === p.catId);
        const catName = cat ? cat.name.toLowerCase() : '';
        return p.name.toLowerCase().includes(term) || (p.desc && p.desc.toLowerCase().includes(term)) || catName.includes(term);
    }).forEach(p => {
        foundAny = true;
        const cat = db.categories.find(c => c.id === p.catId);
        html += `
        <div class="pro-card" onclick="openDetail(${p.id})">
            <div class="card-top"><div class="logo-box"><img src="${cat ? cat.img : ''}"></div></div>
            <div class="card-info"><h3>${p.name}</h3></div>
            <div class="card-price">
                <div class="price">${p.price} ₼</div>
                <button class="buy-btn" onclick="event.stopPropagation(); addToCart(${p.id})"><i class="fas fa-cart-plus"></i></button>
            </div>
        </div>`;
    });

    if(!foundAny) html += `<p style="color:#94a3b8; grid-column: 1/-1; text-align:center;">Heç nə tapılmadı.</p>`;
    v.innerHTML = html + `</div></div>`;
}

// ==========================================
// 7. SƏBƏT, SİFARİŞ, BALANS
// ==========================================
function addToCart(id) {
    if (!currentUser) { showToast("Giriş edin!", "error"); openAuth(); return; }
    const p = db.products.find(x => String(x.id) === String(id));
    if (p) { cart.push(p); updateUserUI(); closeModal(); showToast("Səbətə atıldı!", "success"); }
}

function openCart() {
    if (!document.getElementById('modal-overlay')) createModalHTML();
    let html = `<h2 style="color:white; margin-bottom:15px;">Səbət</h2>`;
    if (cart.length === 0) {
        html += `<p style="color:#94a3b8; text-align:center;">Boşdur.</p>`;
    } else {
        let total = 0;
        cart.forEach((i, idx) => {
            total += Number(i.price);
            html += `<div style="display:flex; justify-content:space-between; color:white; padding:10px; border-bottom:1px solid #333; align-items:center;">
                        <span>${i.name}</span>
                        <div style="display:flex; gap:10px; align-items:center;">
                            <b>${i.price} ₼</b>
                            <span onclick="removeFromCart(${idx})" style="color:red; cursor:pointer;"><i class="fas fa-trash"></i></span>
                        </div>
                     </div>`;
        });
        html += `<h3 style="color:white; text-align:right; margin-top:20px;">Cəmi: ${total.toFixed(2)} ₼</h3><button class="full-btn" onclick="checkout()" style="margin-top:15px;">Təsdiqlə</button>`;
    }
    document.getElementById('modal-dynamic-content').innerHTML = html;
    document.getElementById('modal-overlay').style.display = 'flex';
}

function removeFromCart(idx) { cart.splice(idx, 1); openCart(); updateUserUI(); }

async function checkout() {
    if (!currentUser) return openAuth();
    if (!currentUser.isVerified) { closeModal(); showToast("Hesabı təsdiqləyin!", "error"); return openProfileModal(); }
    if (cart.length === 0) return;

    const total = cart.reduce((a, b) => a + Number(b.price), 0);
    if (currentUser.balance < total) return showToast("Balans çatmır!", "error");

    if (confirm(`${total.toFixed(2)} ₼ ödənilsin?`)) {
        const btn = document.querySelector('#modal-dynamic-content .full-btn');
        btn.innerText = "Gözləyin..."; btn.disabled = true;

        const res = await sendRequest({
            action: "saveOrder",
            userId: currentUser.id,
            newBalance: currentUser.balance - total,
            orders: cart.map(i => ({ id: Date.now() + Math.random(), userId: currentUser.id, prodName: i.name, price: i.price, date: new Date().toLocaleString(), status: 'Gözləyir', deliveryData: '' }))
        });

        if (res.status === 'success') {
            currentUser.balance -= total;
            localStorage.setItem('activeUser', JSON.stringify(currentUser));
            cart = [];
            updateUserUI();
            closeModal();
            showToast("Sifariş alındı!", "success");
        } else {
            showToast("Xəta baş verdi.", "error");
            btn.innerText = "Təsdiqlə"; btn.disabled = false;
        }
    }
}

async function openUserOrders() {
    if (!currentUser) return openAuth();
    if (!document.getElementById('modal-overlay')) createModalHTML();

    const res = await sendRequest({ action: "getUserOrders", userId: currentUser.id });
    const ords = res.orders ? res.orders.reverse() : [];
    let html = `<h2 style="color:white; margin-bottom:15px;">Sifarişlərim</h2><div style="max-height:400px;overflow-y:auto">`;
    
    if (ords.length === 0) html += `<p style="color:#94a3b8; text-align:center;">Sifariş yoxdur.</p>`;
    else {
        ords.forEach(o => {
            const status = o.deliveryData
                ? `<div style="margin-top:5px; background:rgba(16, 185, 129, 0.2); color:#10b981; padding:5px; border-radius:5px; font-size:0.9rem;">Kod: <b>${o.deliveryData}</b></div>`
                : `<div style="margin-top:5px; color:#f59e0b; font-size:0.9rem;">Gözləyir...</div>`;

            html += `<div style="background:#1e293b; margin-bottom:10px; padding:15px; border-radius:10px;">
                        <div style="display:flex; justify-content:space-between; color:white; font-weight:bold;">
                            <span>${o.prodName}</span><span>${o.price} ₼</span>
                        </div>
                        <div style="font-size:0.8rem; color:#94a3b8;">${o.date.split(' ')[0]}</div>
                        ${status}
                     </div>`;
        });
    }
    document.getElementById('modal-dynamic-content').innerHTML = html + `</div>`;
    document.getElementById('modal-overlay').style.display = 'flex';
}

// ==========================================
// 8. PROFİL & BALANS
// ==========================================
function openBalanceModal() {
    if (!currentUser) return openAuth();
    if (!currentUser.isVerified) { showToast("Hesabı təsdiqləyin!", "error"); return openProfileModal(); }
    document.getElementById('balance-modal').style.display = 'flex';
}

async function submitBalanceRequest() {
    const a = document.getElementById('bal-amount').value;
    const l = document.getElementById('bal-proof-link').value;
    if (!a || !l) return showToast("Xanaları doldurun!", "error");

    const btn = document.querySelector('#balance-modal .full-btn');
    btn.innerText = "Göndərilir..."; btn.disabled = true;

    const res = await sendRequest({ action: "requestBalance", userId: currentUser.id, username: currentUser.username, amount: a, proof: l });
    if (res.status === 'success') {
        showToast("Sorğu göndərildi!", "success");
        closeModal('balance-modal');
        btn.innerText = "Sorğu Göndər"; btn.disabled = false;
        document.getElementById('bal-amount').value = '';
        document.getElementById('bal-proof-link').value = '';
    } else {
        showToast("Xəta!", "error");
        btn.innerText = "Sorğu Göndər"; btn.disabled = false;
    }
}

function openProfileModal() {
    if (!currentUser) return openAuth();
    const currentEmail = currentUser.email || "Yoxdur";
    document.getElementById('profile-email').value = currentEmail;
    const badge = document.getElementById('verify-badge');
    const btnVerify = document.getElementById('btn-verify-current');
    document.getElementById('verify-section').classList.add('hidden');
    document.getElementById('change-email-section').classList.add('hidden');

    if (currentUser.isVerified) {
        badge.innerHTML = `<i class="fas fa-check-circle"></i> Təsdiqlənib`;
        badge.style.background = "#10b981";
        btnVerify.style.display = 'none';
    } else {
        badge.innerHTML = `<i class="fas fa-times-circle"></i> Təsdiqlənməyib`;
        badge.style.background = "#ef4444";
        btnVerify.style.display = (currentEmail.includes('@')) ? 'block' : 'none';
        btnVerify.innerText = "Kod Göndər";
        btnVerify.disabled = false;
    }
    document.getElementById('profile-modal').style.display = 'flex';
}

function toggleChangeEmail() { document.getElementById('change-email-section').classList.toggle('hidden'); }

async function verifyCurrentEmail() {
    const btn = document.getElementById('btn-verify-current');
    btn.innerText = "Göndərilir..."; btn.disabled = true;
    const res = await sendRequest({ action: "updateEmailRequest", userId: currentUser.id, newEmail: currentUser.email });
    if (res.status === "success") {
        showToast("Kod göndərildi!", "success");
        document.getElementById('verify-section').classList.remove('hidden');
        btn.innerText = "Kod Göndərildi ✔";
    } else {
        showToast(res.message, "error");
        btn.innerText = "Kod Göndər"; btn.disabled = false;
    }
}

async function verifyCode() {
    const code = document.getElementById('verify-code').value.trim();
    const res = await sendRequest({ action: "verifyEmailCode", userId: currentUser.id, code: code });
    if (res.status === "success") {
        showToast("Təsdiqləndi!", "success");
        currentUser.isVerified = true;
        if (currentUser.tempEmail) { currentUser.email = currentUser.tempEmail; delete currentUser.tempEmail; }
        localStorage.setItem('activeUser', JSON.stringify(currentUser));
        openProfileModal();
    } else { showToast(res.message, "error"); }
}
function updateEmailRequest(d) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const sheet = SS.getSheetByName('Users');
  const data = sheet.getDataRange().getValues();
  
  for(let i=0; i<data.length; i++) {
    if(String(data[i][0]) === String(d.userId)) {
      // Kodu bazaya yazaq
      sheet.getRange(i+1, 8).setValue(d.newEmail); 
      sheet.getRange(i+1, 9).setValue(code);
      
      try {
        // Emaili göndərməyə çalışırıq
        GmailApp.sendEmail(
          d.newEmail, 
          "Təsdiq Kodu - Aurahub", 
          "Sizin təsdiq kodunuz: " + code, 
          { name: "Aurahub Security" }
        );
        // Əgər bura qədər gəldisə, deməli uğurludur
        return { status: 'success' };
      } catch(e) {
        // 🛑 XƏTA VARSA, BİZƏ DE!
        return { status: 'error', message: "Email Xətası: " + e.toString() };
      }
    }
  }
  return { status: 'error', message: "İstifadəçi tapılmadı" };
}
async function updateEmail() {
    const newEmail = document.getElementById('new-email').value.trim();
    const btn = document.querySelector('#change-email-section button');
    btn.innerText = "..."; btn.disabled = true;
    const res = await sendRequest({ action: "updateEmailRequest", userId: currentUser.id, newEmail: newEmail });
    if (res.status === "success") {
        showToast("Kod göndərildi!", "success");
        document.getElementById('verify-section').classList.remove('hidden');
        currentUser.tempEmail = newEmail;
        btn.innerText = "Kod Göndərildi";
    } else {
        showToast(res.message, "error");
        btn.innerText = "Kod Al"; btn.disabled = false;
    }
}

// ==========================================
// 9. INFO MODALS & ADMIN
// ==========================================
function openInfoModal(type) {
    if (!document.getElementById('modal-overlay')) createModalHTML();
    let title = "", content = "";
    if (type === 'about') { title = "Biz Kimik?"; content = `<p>Aurahubs, rəqəmsal dünyada ən sərfəli xidmətdir.</p>`; }
    else if (type === 'terms') { title = "Qaydalar"; content = `<p>Məhsullar 1 saat ərzində çatdırılır.</p>`; }
    else if (type === 'privacy') { title = "Məxfilik"; content = `<p>Məlumatlarınız gizli saxlanılır.</p>`; }
    else if (type === 'refund') { title = "Geri Qaytarma"; content = `<p>Yanlış hesab verilərsə dəyişdirilir.</p>`; }

    const html = `<h2 style="color:white; margin-bottom:20px; border-bottom:1px solid #334155;">${title}</h2><div style="color:#94a3b8;">${content}</div>`;
    document.getElementById('modal-dynamic-content').innerHTML = html;
    document.getElementById('modal-overlay').style.display = 'flex';
}

async function fetchAdminData() {
    if (!currentUser || currentUser.role !== 'admin') return;
    const result = await sendRequest({ action: "getAdminData", role: currentUser.role });
    if (result.status !== 'error') {
        db.users = result.users || [];
        db.orders = result.orders || [];
        db.balance_requests = result.balance_requests || [];
        renderAdminDashboard();
    }
}

function renderAdminDashboard() {
    document.getElementById('admin-view').innerHTML = `
        <h2 style="color:white; margin-bottom:20px;">Admin Panel</h2>
        <div class="dashboard-grid">
            <div class="dash-card"><span class="dash-title">Users</span><span class="dash-value" style="color:cyan">${db.users.length}</span></div>
            <div class="dash-card"><span class="dash-title">Orders</span><span class="dash-value" style="color:lime">${db.orders.length}</span></div>
            <div class="dash-card"><span class="dash-title">Requests</span><span class="dash-value" style="color:orange">${db.balance_requests.filter(r => r.status === 'pending').length}</span></div>
        </div>
        <button onclick="renderUserHomeFromAdmin()" style="margin-top:20px; padding:10px; background:#6366f1; border:none; color:white; cursor:pointer;">Mağazaya Qayıt</button>
    `;
}
function renderAdminBalance() {
    const reqs = db.balance_requests.filter(r => r.status === 'pending');
    let html = `<h2 style="color:white;">Balans Sorğuları</h2><table><thead><tr><th>User</th><th>Məbləğ</th><th>Link</th><th>Hərəkət</th></tr></thead><tbody>`;
    if (reqs.length === 0) html += `<tr><td colspan="4" style="text-align:center;">Yoxdur</td></tr>`;
    reqs.forEach(r => {
        html += `<tr><td>${r.username}</td><td>${r.amount} ₼</td><td><a href="${r.proof}" target="_blank" style="color:cyan">Çek</a></td><td><button onclick="approveBal('${r.id}')">✔</button> <button onclick="rejectBal('${r.id}')">✘</button></td></tr>`;
    });
    document.getElementById('admin-view').innerHTML = html + `</tbody></table>`;
}
async function approveBal(id) { await sendRequest({ action: 'approveBalance', reqId: id, role: 'admin' }); fetchAdminData(); }
async function rejectBal(id) { await sendRequest({ action: 'rejectBalance', reqId: id, role: 'admin' }); fetchAdminData(); }
function renderAdminOrders() {
    let html = `<h2 style="color:white;">Sifarişlər</h2><table><thead><tr><th>Məhsul</th><th>User</th><th>Kod</th></tr></thead><tbody>`;
    db.orders.slice().reverse().forEach(o => {
        const btn = o.deliveryData ? `<span style="color:green">Verilib</span>` : `<button onclick="openDelModal('${o.id}')">Kod Ver</button>`;
        html += `<tr><td>${o.prodName}</td><td>${o.userId}</td><td>${btn}</td></tr>`;
    });
    document.getElementById('admin-view').innerHTML = html + `</tbody></table>`;
}
function openDelModal(id) { document.getElementById('del-order-id').value = id; document.getElementById('delivery-modal').style.display = 'flex'; }
async function submitDelivery() { const id = document.getElementById('del-order-id').value; const code = document.getElementById('del-text').value; await sendRequest({ action: 'deliverOrder', orderId: id, code: code }); closeModal('delivery-modal'); fetchAdminData(); }
function renderAdminProducts() { let html = `<h2 style="color:white;">Məhsullar</h2><table><thead><tr><th>Ad</th><th>Qiymət</th></tr></thead><tbody>`; db.products.forEach(p => { html += `<tr><td>${p.name}</td><td>${p.price} ₼</td></tr>`; }); document.getElementById('admin-view').innerHTML = html + `</tbody></table>`; }
function renderAdminUsers() { let html = `<h2 style="color:white;">İstifadəçilər</h2><table><thead><tr><th>Ad</th><th>Rol</th><th>Balans</th></tr></thead><tbody>`; db.users.forEach(u => { html += `<tr><td>${u.username}</td><td>${u.role}</td><td>${u.balance} ₼</td></tr>`; }); document.getElementById('admin-view').innerHTML = html + `</tbody></table>`; }

// ==========================================
// 10. UTILS & HELPERS
// ==========================================
function createModalHTML() {
    if (!document.getElementById('modal-overlay')) {
        const d = document.createElement('div'); d.id = 'modal-overlay'; d.className = 'modal-overlay';
        d.innerHTML = `<div class="modal-box"><span class="close-modal" onclick="closeModal()">&times;</span><div id="modal-dynamic-content"></div></div>`;
        document.body.appendChild(d);
        d.onclick = (e) => { if (e.target === d) closeModal(); }
    }
}
function closeModal(id) {
    if (id) document.getElementById(id).style.display = 'none';
    else document.querySelectorAll('.modal-overlay').forEach(o => o.style.display = 'none');
}
function handleMobileAction(action) {
    if (!currentUser) { showToast("Giriş edin!", "info"); openAuth(); return; }
    if (action === 'orders') openUserOrders();
    if (action === 'balance') openBalanceModal();
    if (action === 'profile') openProfileModal();
}

// ==========================================
// AXTARIŞ DÜYMƏSİ FIX (Universal)
// ==========================================
window.handleMobileSearchFocus = function() {
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.classList.toggle('mobile-active');
        if(searchBox.classList.contains('mobile-active')) {
            const input = searchBox.querySelector('input');
            if(input) setTimeout(() => input.focus(), 100);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
};

// ==========================================
// EVENTS (Axtarış Düyməsini Tutan Kod)
// ==========================================
document.addEventListener('click', function(e) {
    if (e.target.closest('.nav-item') && e.target.innerText.includes("Axtar")) {
        window.handleMobileSearchFocus();
    }
});
// ==========================================
// CANLI SATIŞ BİLDİRİMİ SİSTEMİ (FİNAL)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Elementi Seç
    const toast = document.getElementById('live-notification');
    const userEl = document.getElementById('live-user');
    const prodEl = document.getElementById('live-product');

    // Eğer HTML'de yoksa dur (Hata vermesin)
    if (!toast || !userEl || !prodEl) {
        console.log("Bildirim kutusu bulunamadı!");
        return;
    }

    // 2. Veri Listesi
    const fakeUsers = ["Ali M.", "Vusal K.", "Ayse T.", "Orkhan B.", "Kenan P.", "Nigar S.", "Elvin Z.", "Murat D."];
    const fakeProds = ["60 UC", "325 UC", "Valorant 115 VP", "Netflix 1 Aylıq", "Spotify Premium", "eFootball 130 Coins", "Pubg 60 UC"];

    // 3. Gösterme Fonksiyonu
    function showNotification() {
        // Rastgele seçim yap
        const rUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
        const rProd = fakeProds[Math.floor(Math.random() * fakeProds.length)];

        // İçeriği güncelle
        userEl.innerText = rUser;
        prodEl.innerText = rProd;

        // Kutuyu Göster (CSS Class ekle)
        toast.classList.add('active');

        // 4 saniye sonra gizle
        setTimeout(() => {
            toast.classList.remove('active');
        }, 4000);

        // Bir sonraki bildirim için rastgele bekle (15 ile 30 saniye arası)
        const nextTime = Math.floor(Math.random() * (30000 - 15000 + 1)) + 15000;
        setTimeout(showNotification, nextTime);
    }

    // Sayfa açıldıktan 5 saniye sonra ilki çalışsın
    setTimeout(showNotification, 5000);
});