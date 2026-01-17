// ==========================================
// 1. AYARLAR VƏ MƏLUMAT BAZASI
// ==========================================

// 🔴 BURAYA ÖZ DEPLOY LİNKİNİZİ YAPIŞDIRIN! (Dırnaqları silməyin)
const API_URL = "https://script.google.com/macros/s/AKfycbyu5hOghZRLt9_8mKHBh1PvtXKPR-3dQL_xqCqBjGIjPxcfYf8NM8UMOzyiPlTPC9XM7Q/exec";
// ==========================================
// 1. AYARLAR VƏ MƏLUMAT BAZASI
// ==========================================

// 🔴 DİQQƏT: BURAYA ÖZ GOOGLE APPS SCRIPT LİNKİNİZİ YAPIŞDIRIN!

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

// MƏHSULLAR (STRATEJİ QİYMƏTLƏRLƏ - .99)
// MƏHSULLAR (ALT-ALTA VƏ ŞIX DİZAYN)
const DEFAULT_PRODS = [
    // --- NETFLIX ---
    { id: 101, catId: 'netflix', name: 'Netflix 1 Aylıq', price: 5.99, desc: '📺 4K Ultra HD <br> 🔒 Şəxsi Profil (Şifrəli) <br> 🛡️ Tam Zəmanət' },
    { id: 102, catId: 'netflix', name: 'Netflix 3 Aylıq', price: 14.99, desc: '📺 4K Ultra HD <br> ⏳ 3 Ay Kəsintisiz <br> 🛡️ Tam Zəmanət' },

    // --- SPOTIFY ---
    { id: 201, catId: 'spotify', name: 'Spotify 1 Aylıq', price: 4.99, desc: '🎵 Yüksək Səs Keyfiyyəti <br> 🚫 Reklamsız Dinləmə <br> 👤 Fərdi Plan' },
    { id: 202, catId: 'spotify', name: 'Spotify 3 Aylıq', price: 11.99, desc: '🎵 3 Ay Premium <br> ⏭️ Mahnı Keçmə Haqqı <br> 🛡️ Tam Zəmanət' },

    // --- YOUTUBE ---
    { id: 301, catId: 'youtube', name: 'YouTube 1 Aylıq', price: 4.99, desc: '🚫 Reklamsız Video <br> 📱 Arxa Planda Oynatma <br> 🎁 YouTube Music Hədiyyə' },
    { id: 302, catId: 'youtube', name: 'YouTube 3 Aylıq', price: 11.99, desc: '⏳ 3 Ay Premium <br> ⬇️ Videoları Yüklə <br> 🛡️ Tam Zəmanət' },

    // --- GEMINI ---
    { id: 401, catId: 'gemini', name: 'Gemini Advanced 1 Ay', price: 4.99, desc: '🧠 Google AI 1.5 Pro <br> 🚀 Ən Son Model <br> 💻 Kodlama və Analiz' },

    // --- MINECRAFT ---
    { id: 501, catId: 'minecraft', name: 'Minecraft Premium', price: 19.99, desc: '🌍 Java & Bedrock <br> 🛡️ Ömürlük Zəmanət <br> 👕 Skin/Nick Dəyişmə' },

    // --- STEAM ---
    { id: 601, catId: 'steam', name: 'Steam - 3 Oyun', price: 8.99, desc: '🎮 İstənilən 3 Oyun <br> 📂 Offline (Kariyer/Hekayə) <br> ♾️ Ömürlük Giriş' },

    // --- VALORANT TR (TURKEY) ---
    { id: 701, catId: 'valorant', name: '[TR] 375 VP', price: 6.99, desc: '🇹🇷 Türkiyə Serveri <br> ⚡ 7/24 Anında Təslim <br> 💎 Rəsmi Riot Kodu' },
    { id: 702, catId: 'valorant', name: '[TR] 875 VP', price: 12.99, desc: '🇹🇷 Türkiyə Serveri <br> ⚡ 7/24 Anında Təslim <br> 💎 Rəsmi Riot Kodu' },
    { id: 703, catId: 'valorant', name: '[TR] Battle Pass', price: 16.49, desc: '🎟️ Sezon Bileti Üçün <br> ⚡ Anında Təslim <br> 💎 Rəsmi Kod' },
    { id: 704, catId: 'valorant', name: '[TR] 1700 VP', price: 20.99, desc: '🇹🇷 Türkiyə Serveri <br> ⚡ 7/24 Anında Təslim <br> 💎 Rəsmi Riot Kodu' },
    { id: 705, catId: 'valorant', name: '[TR] 2925 VP', price: 34.99, desc: '🇹🇷 Türkiyə Serveri <br> ⚡ 7/24 Anında Təslim <br> 💎 Rəsmi Riot Kodu' },
    { id: 706, catId: 'valorant', name: '[TR] 4325 VP', price: 49.99, desc: '🇹🇷 Türkiyə Serveri <br> ⚡ 7/24 Anında Təslim <br> 💎 Rəsmi Riot Kodu' },
    { id: 707, catId: 'valorant', name: '[TR] 8900 VP', price: 96.99, desc: '🇹🇷 Türkiyə Serveri <br> ⚡ 7/24 Anında Təslim <br> 💎 Rəsmi Riot Kodu' },

    // --- VALORANT EU (EUROPE) ---
    { id: 751, catId: 'valorant', name: '[EU] 475 VP', price: 10.99, desc: '🇪🇺 Avropa Serveri <br> ⚡ 7/24 Anında Təslim <br> 💎 Rəsmi Riot Kodu' },
    { id: 752, catId: 'valorant', name: '[EU] 1000 VP', price: 18.99, desc: '🇪🇺 Avropa Serveri <br> ⚡ 7/24 Anında Təslim <br> 💎 Rəsmi Riot Kodu' },
    { id: 753, catId: 'valorant', name: '[EU] 2050 VP', price: 68.99, desc: '🇪🇺 Avropa Serveri <br> ⚡ 7/24 Anında Təslim <br> 💎 Rəsmi Riot Kodu' },
    { id: 754, catId: 'valorant', name: '[EU] 5350 VP', price: 86.99, desc: '🇪🇺 Avropa Serveri <br> ⚡ 7/24 Anında Təslim <br> 💎 Rəsmi Riot Kodu' },

    // --- PUBG MOBILE (GLOBAL) ---
    { id: 801, catId: 'pubg', name: '60 UC', price: 2.99, desc: '🌍 Global E-pin <br> ✅ Ban Riski Yoxdur <br> 🚀 Avtomatik Təslim' },
    { id: 802, catId: 'pubg', name: '325 UC', price: 8.99, desc: '🌍 Global E-pin <br> 🎁 +Bonus Daxil <br> 🚀 Avtomatik Təslim' },
    { id: 803, catId: 'pubg', name: '660 UC', price: 17.99, desc: '🌍 Global E-pin <br> 🎁 +Bonus Daxil <br> 🚀 Avtomatik Təslim' },
    { id: 804, catId: 'pubg', name: '3850 UC', price: 79.99, desc: '🌍 Global E-pin <br> 🎁 +Bonus Daxil <br> 🚀 Avtomatik Təslim' },
    { id: 805, catId: 'pubg', name: '16200 UC', price: 311.99, desc: '🌍 Global E-pin <br> 🎁 +Bonus Daxil <br> 🚀 Avtomatik Təslim' },

    // --- EFOOTBALL (MOBILE) ---
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
    if (API_URL === "BURAYA_APPS_SCRIPT_URL_YAZIN" || API_URL === "") {
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
        showToast("İnternet bağlantısını yoxlayın!", "error");
        return { status: "error" };
    }
}
// ==========================================
// MƏLUMAT SƏHİFƏLƏRİ (FOOTER)
// ==========================================
function openInfoModal(type) {
    if (!document.getElementById('modal-overlay')) createModalHTML();

    let title = "";
    let content = "";

    // Mətnlər buradadır (İstədiyin vaxt dəyişə bilərsən)
    if (type === 'about') {
        title = "Biz Kimik?";
        content = `
            <p>Aurahub, rəqəmsal dünyada ən sərfəli qiymətə oyun kodları, abunəliklər və premium hesablar təklif edən etibarlı platformadır.</p>
            <p>Məqsədimiz müştərilərimizə sürətli, təhlükəsiz və keyfiyyətli xidmət göstərməkdir. 7/24 Dəstək xidmətimizlə hər zaman yanınızdayıq.</p>
        `;
    }
    else if (type === 'terms') {
        title = "İstifadə Qaydaları";
        content = `
            <div style="text-align:left; color:#cbd5e1;">
                <p><i class="fas fa-clock" style="color:#f59e0b;"></i> <b>Çatdırılma Müddəti:</b> Məhsulu aldıqdan sonra və ya balans artırdıqdan sonra sifarişiniz <b>maksimum 1 saat</b> ərzində "Sifarişlərim" bölməsinə və ya balansınıza yüklənir.</p>
                <hr style="border-color:#334155; margin:10px 0;">
                <p><i class="fas fa-headset" style="color:#6366f1;"></i> <b>Dəstək:</b> Əgər 1 saat keçdiyi halda məhsul gəlməyibsə və ya balans oturmayıbsa, dərhal aşağıdakı kanallardan bizimlə əlaqə saxlayın:</p>
                <ul style="margin-top:10px; list-style:none;">
                    <li><i class="fab fa-whatsapp"></i> Whatsapp Dəstək</li>
                    <li><i class="fab fa-instagram"></i> Instagram (@aurahub)</li>
                </ul>
            </div>
        `;
    }
    else if (type === 'privacy') {
        title = "Məxfilik Siyasəti";
        content = `
            <p>İstifadəçilərin şəxsi məlumatları (Gmail, şifrə və ödəniş çekləri) tamamilə məxfi saxlanılır.</p>
            <p>Aurahub, istifadəçi məlumatlarını heç bir üçüncü tərəflə paylaşmır. Daxil etdiyiniz məlumatlar yalnız sifarişin icrası üçün istifadə olunur.</p>
        `;
    }
    else if (type === 'refund') {
        title = "Geri Qaytarma Siyasəti";
        content = `
            <div style="text-align:left; color:#cbd5e1;">
                <p style="color:#ef4444; font-weight:bold;"><i class="fas fa-exclamation-circle"></i> Vacib Şərtlər:</p>
                <ul style="margin-left:20px; margin-top:10px;">
                    <li style="margin-bottom:10px;">Geri ödəniş və ya dəyişim <b>YALNIZ</b> biz tərəfdən verilən hesabın şifrəsi yanlış çıxarsa edilir.</li>
                    <li style="margin-bottom:10px;">Hesaba daxil olduqdan sonra ayarlarda (Profil adı, Şifrə, Plan, Dil və s.) hər hansı bir dəyişiklik edilərsə:
                        <br><span style="color:#ef4444;">- Zəmanət ləğv olunur.</span>
                        <br><span style="color:#ef4444;">- Geri ödəniş edilmir.</span>
                        <br><span style="color:#ef4444;">- İstifadəçi bloklanır.</span>
                    </li>
                </ul>
            </div>
        `;
    }

    // Modalı Aç
    const html = `<h2 style="color:white; margin-bottom:20px; border-bottom:1px solid #334155; padding-bottom:10px;">${title}</h2>
                  <div style="font-size:0.95rem; line-height:1.6; color:#94a3b8;">${content}</div>`;

    document.getElementById('modal-dynamic-content').innerHTML = html;
    document.getElementById('modal-overlay').style.display = 'flex';
}
// ==========================================
// 4. INIT (BAŞLATMA)
// ==========================================

document.addEventListener('DOMContentLoaded', async () => {
    // Düymələri aktiv et
    const b1 = document.getElementById('btn-login'); if (b1) { b1.disabled = false; b1.innerText = "Giriş Et"; }
    const b2 = document.getElementById('btn-register'); if (b2) { b2.disabled = false; b2.innerText = "Qeydiyyatdan Keç"; }

    toggleLoading(true);

    // 1. Yaddaşdan oxu (İlk açılış sürəti üçün)
    const session = localStorage.getItem('activeUser');
    if (session) {
        currentUser = JSON.parse(session);
        checkSession();
        updateUserUI(); // Yaddaşdakı balansı göstər (Məsələn 0 ola bilər)

        // 2. SERVERDƏN ƏN SON BALANSI YÜKLƏ (VACİB HİSSƏ)
        if (currentUser.username && currentUser.password) {
            try {
                // Login sorğusu əslində məlumatları təzələmək üçündür
                const res = await sendRequest({
                    action: "login",
                    username: currentUser.username,
                    password: currentUser.password
                });

                if (res.status === "success") {
                    // Serverdən gələn təzə balansı yazırıq
                    const savedPass = currentUser.password; // Şifrəni qoruyuruq
                    currentUser = res.user;
                    currentUser.password = savedPass;

                    // Təzə məlumatı yaddaşa yaz
                    localStorage.setItem('activeUser', JSON.stringify(currentUser));

                    // VƏ EKRANI YENİLƏ (Burada 0.00 dəyişib real rəqəm olmalıdır)
                    updateUserUI();
                    showToast("Məlumatlar yeniləndi", "success");
                }
            } catch (e) {
                console.log("Serverlə əlaqə yoxdur, köhnə balans qaldı.");
            }
        }
    }

    try { const res = await sendRequest({ action: "getPublicData" }); } catch (e) { }

    toggleLoading(false);
    createModalHTML();
    checkSession();
    renderUserHome();
});
function toggleLoading(show) {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = show ? 'flex' : 'none';
}

// ==========================================
// 5. AUTH & SESSION
// ==========================================

function checkSession() {
    // 1. Əvvəlcə hər şeyi gizlət və təmizlə
    const userSec = document.getElementById('user-section');
    const adminSec = document.getElementById('admin-section');
    const authSec = document.getElementById('auth-section');
    const guestMenu = document.getElementById('guest-menu');
    const userMenu = document.getElementById('user-menu');

    authSec.classList.add('hidden'); // Giriş ekranını bağla

    if (currentUser) {
        // --- İSTİFADƏÇİ VAR ---

        if (currentUser.role === 'admin') {
            // A) ƏGƏR ADMİNDİRSƏ -> Mağazanı tamamilə gizlət, Admini aç
            if (userSec) userSec.classList.add('hidden');
            if (adminSec) adminSec.classList.remove('hidden');

            // Admin datasını yüklə
            fetchAdminData();
        } else {
            // B) ƏGƏR ADİ USERDİRSƏ -> Admini gizlət, Mağazanı aç
            if (adminSec) adminSec.classList.add('hidden');
            if (userSec) userSec.classList.remove('hidden');

            // Menyu ayarları
            if (guestMenu) guestMenu.classList.add('hidden');
            if (userMenu) userMenu.classList.remove('hidden');

            updateUserUI();
        }
    } else {
        // --- QONAQDIRSA (GİRİŞ YOXDUR) ---
        if (adminSec) adminSec.classList.add('hidden'); // Admini gizlət
        if (userSec) userSec.classList.remove('hidden'); // Mağazanı aç

        if (guestMenu) guestMenu.classList.remove('hidden');
        if (userMenu) userMenu.classList.add('hidden');
    }
}
// Admin paneldən mağazaya keçid
function renderUserHomeFromAdmin() {
    document.getElementById('admin-section').classList.add('hidden');
    document.getElementById('user-section').classList.remove('hidden');
    renderUserHome();
}

function openAuth() { document.getElementById('auth-section').classList.remove('hidden'); }
function closeAuth() { document.getElementById('auth-section').classList.add('hidden'); }

async function handleAuth(e) {
    e.preventDefault();
    const u = document.getElementById('login-username').value.trim();
    const p = document.getElementById('login-password').value.trim();

    toggleLoading(true);
    const result = await sendRequest({ action: "login", username: u, password: p });
    toggleLoading(false);

    if (result.status === "success") {
        currentUser = result.user;
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
        localStorage.setItem('activeUser', JSON.stringify(currentUser));
        showToast("Qeydiyyat uğurludur!", "success");
        checkSession();
        setTimeout(openProfileModal, 1000);
    } else {
        showToast(result.message, "error");
    }
}

function logout() { localStorage.clear(); location.reload(); }
function switchAuth(type) {
    const l = document.getElementById('login-form-container');
    const r = document.getElementById('register-form-container');
    if (type === 'register') { l.classList.add('hidden'); r.classList.remove('hidden'); }
    else { r.classList.add('hidden'); l.classList.remove('hidden'); }
}
function updateUserUI() {
    if (!currentUser) return;

    // Balansı yoxlayırıq (Əgər null və ya undefined gələrsə 0 götürsün)
    let safeBalance = 0;
    if (currentUser.balance !== undefined && currentUser.balance !== null) {
        safeBalance = Number(currentUser.balance);
    }

    // 1. Masaüstü Balansı Tap və Yenilə
    const desktopBal = document.getElementById('user-balance-display');
    if (desktopBal) {
        desktopBal.innerHTML = `${safeBalance.toFixed(2)} ₼`;
    }

    // 2. Mobil Balansı Tap və Yenilə (Xüsusi Yoxlama)
    const mobileBal = document.getElementById('mobile-balance-display');
    if (mobileBal) {
        mobileBal.innerHTML = `${safeBalance.toFixed(2)} ₼`;
        // Görünmürsə məcbur göstər (CSS problemi varsa)
        mobileBal.style.display = (window.innerWidth <= 768) ? 'block' : 'none';
    } else {
        console.warn("XƏTA: 'mobile-balance-display' ID-li element tapılmadı! HTML-i yoxlayın.");
    }

    // 3. Səbət Sayğacı
    document.querySelectorAll('.badge').forEach(b => b.innerText = cart.length);
}

// Mobil Menyu
function handleMobileAction(action) {
    if (!currentUser) { showToast("Giriş edin!", "info"); openAuth(); return; }
    if (action === 'orders') openUserOrders();
    if (action === 'balance') openBalanceModal();
    if (action === 'profile') openProfileModal();
}
// Mobil Axtarış Düyməsi
function handleMobileSearchFocus() {
    const searchBox = document.querySelector('.search-box');
    if(searchBox) {
        // Toggle (Aç/Bağla)
        if(searchBox.style.display === 'flex') {
            searchBox.style.display = 'none';
        } else {
            searchBox.style.display = 'flex';
            searchBox.querySelector('input').focus();
        }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
// Export
window.handleMobileSearchFocus = handleMobileSearchFocus;
// ==========================================
// 6. PROFİL VƏ DOĞRULAMA
// ==========================================
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
        startCountdown(btn, 60);
    } else {
        showToast(res.message, "error");
        btn.innerText = "Kod Göndər";
        btn.disabled = false;
    }
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
        startCountdown(btn, 60);
    } else {
        showToast(res.message, "error");
        btn.innerText = "Kod Al";
        btn.disabled = false;
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

function startCountdown(btn, seconds) {
    let counter = seconds;
    const originalText = btn.innerText;
    btn.disabled = true;
    const interval = setInterval(() => {
        btn.innerText = `Gözləyin (${counter})`;
        counter--;
        if (counter < 0) {
            clearInterval(interval);
            btn.innerText = originalText;
            btn.disabled = false;
        }
    }, 1000);
}

// ==========================================
// 7. USER UI (MAĞAZA)
// ==========================================
function renderUserHome() {
    const v = document.getElementById('user-view');
    let html = `<div class="hero-section"><div class="hero-wrapper"><div class="hero-slide active" style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);"><div class="hero-content"><div class="hero-title">AURAHUB</div><div class="hero-desc">Sənin zövqünə və cibinə uyğun:)</div></div></div></div></div>`;

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
                    <div class="logo-box">
                        <img src="${cat ? cat.img : ''}" onerror="this.style.display='none'">
                    </div>
                </div>
                <div class="card-info">
                    <h3>${p.name}</h3>
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

async function handleAuth(e) {
    e.preventDefault();
    const u = document.getElementById('login-username').value.trim();
    const p = document.getElementById('login-password').value.trim();

    toggleLoading(true);
    const result = await sendRequest({ action: "login", username: u, password: p });
    toggleLoading(false);

    if (result.status === "success") {
        currentUser = result.user;
        // KRİTİK NOKTA: Şifreyi de objeye ekleyip kaydediyoruz
        currentUser.password = p;
        localStorage.setItem('activeUser', JSON.stringify(currentUser));

        showToast(`Xoş gəldiniz, ${currentUser.username}!`, "success");
        checkSession();
    } else {
        showToast(result.message || "Giriş uğursuz.", "error");
    }
}

function openDetail(id) {
    const p = db.products.find(x => String(x.id) === String(id));
    if (!p) return;
    const cat = DEFAULT_CATS.find(c => String(c.id) === String(p.catId));

    const modal = document.getElementById('dynamic-modal');
    const content = document.getElementById('dynamic-content');
    if (modal && content) {
        content.innerHTML = `
            <div class="modal-grid">
                <div class="modal-img-area">
                    <img src="${cat ? cat.img : ''}" onerror="this.style.display='none'" style="width:120px; height:120px; border-radius:20px; object-fit:cover;">
                </div>
                <div class="modal-right">
                    <h2 style="color:white; text-align:center;">${p.name}</h2>
                    <h1 style="color:#10b981; text-align:center; margin:10px 0;">${p.price} ₼</h1>
                    <div style="color:#cbd5e1; text-align:center; margin-bottom:20px;">${p.desc || 'Məlumat yoxdur.'}</div>
                    <button class="full-btn" onclick="addToCart(${p.id})">Səbətə At</button>
                </div>
            </div>`;
        modal.style.display = 'flex';
    }
}

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
function removeFromCart(idx) {
    cart.splice(idx, 1);
    openCart();
    updateUserUI();
}
async function checkout() {
    if (!currentUser) return openAuth();
    if (!currentUser.isVerified) { closeModal(); showToast("Hesabı təsdiqləyin!", "error"); return openProfileModal(); }
    if (cart.length === 0) return;

    const total = cart.reduce((a, b) => a + Number(b.price), 0);
    if (currentUser.balance < total) return showToast("Balans çatmır!", "error");

    if (confirm(`${total} ₼ ödənilsin?`)) {
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
                            <span>${o.prodName}</span>
                            <span>${o.price} ₼</span>
                        </div>
                        <div style="font-size:0.8rem; color:#94a3b8;">${o.date.split(' ')[0]}</div>
                        ${status}
                     </div>`;
        });
    }
    document.getElementById('modal-dynamic-content').innerHTML = html + `</div>`;
    document.getElementById('modal-overlay').style.display = 'flex';
}

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

// ==========================================
// 8. ADMIN PANEL (TAM FUNKSİYALAR)
// ==========================================

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

function renderAdminProducts() {
    let html = `<h2 style="color:white;">Məhsullar</h2><table><thead><tr><th>Ad</th><th>Qiymət</th></tr></thead><tbody>`;
    db.products.forEach(p => { html += `<tr><td>${p.name}</td><td>${p.price} ₼</td></tr>`; });
    document.getElementById('admin-view').innerHTML = html + `</tbody></table>`;
} function handleSearch(e) {
    const term = e.target.value.toLowerCase().trim();
    
    // Axtarış qutusu boşdursa, ana səhifəni qaytar
    if(term.length === 0) { renderUserHome(); return; }
    // 2 hərfdən azdırsa heç nə etmə
    if(term.length < 2) return; 

    const v = document.getElementById('user-view');
    let html = `<div class="container"><h2 class="section-title">Axtarış: <span>"${e.target.value}"</span></h2><div class="grid-cols">`;
    
    let foundAny = false;

    // 1. KATEQORİYALARI AXTAR (İstədiyin kimi, kateqoriya kartı da görünsün)
    const matchingCats = db.categories.filter(c => c.name.toLowerCase().includes(term));
    
    matchingCats.forEach(c => {
        foundAny = true;
        html += `
        <div class="pro-card" onclick="renderCategoryProducts('${c.id}')" style="cursor:pointer; border: 1px solid #6366f1;">
            <div class="card-top">
                <div class="logo-box"><img src="${c.img}"></div>
            </div>
            <div class="card-info">
                <h3 style="color:#a5b4fc;">KATEQORİYA</h3>
                <h3 style="margin-top:5px;">${c.name}</h3>
            </div>
            <div class="card-price">
                <button class="buy-btn" style="width:100%; background:rgba(99, 102, 241, 0.2); color:#a5b4fc;">Paketlərə Bax</button>
            </div>
        </div>`;
    });

    // 2. MƏHSULLARI AXTAR (Həm adına, həm də aid olduğu kateqoriyanın adına görə)
    const matchingProds = db.products.filter(p => {
        // Məhsulun kateqoriyasını tapırıq
        const cat = db.categories.find(c => c.id === p.catId);
        const catName = cat ? cat.name.toLowerCase() : '';
        
        // ŞƏRT: Ya məhsulun adında, ya açıqlamasında, ya da KATEQORİYA adında axtarılan söz olsun
        return p.name.toLowerCase().includes(term) || 
               (p.desc && p.desc.toLowerCase().includes(term)) || 
               catName.includes(term);
    });

    matchingProds.forEach(p => {
        foundAny = true;
        const cat = db.categories.find(c => c.id === p.catId);
        html += `
        <div class="pro-card" onclick="openDetail(${p.id})">
            <div class="card-top">
                <div class="logo-box"><img src="${cat ? cat.img : ''}" onerror="this.style.display='none'"></div>
            </div>
            <div class="card-info"><h3>${p.name}</h3></div>
            <div class="card-price">
                <div class="price">${p.price} ₼</div>
                <button class="buy-btn" onclick="event.stopPropagation(); addToCart(${p.id})">
                    <i class="fas fa-cart-plus"></i> Səbətə At
                </button>
            </div>
        </div>`;
    });

    if(!foundAny) {
        html += `<p style="color:#94a3b8; grid-column: 1/-1; text-align:center;">Heç nə tapılmadı.</p>`;
    }

    v.innerHTML = html + `</div></div>`;
}
function renderAdminBalance() {
    const reqs = db.balance_requests.filter(r => r.status === 'pending');
    let html = `<h2 style="color:white;">Balans Sorğuları</h2><table><thead><tr><th>User</th><th>Məbləğ</th><th>Link</th><th>Hərəkət</th></tr></thead><tbody>`;
    if (reqs.length === 0) html += `<tr><td colspan="4" style="text-align:center;">Yoxdur</td></tr>`;
    reqs.forEach(r => {
        html += `<tr>
            <td>${r.username}</td><td>${r.amount} ₼</td>
            <td><a href="${r.proof}" target="_blank" style="color:cyan">Çek</a></td>
            <td><button onclick="approveBal('${r.id}')">✔</button> <button onclick="rejectBal('${r.id}')">✘</button></td>
        </tr>`;
    });
    document.getElementById('admin-view').innerHTML = html + `</tbody></table>`;
}

async function approveBal(id) {
    if (!confirm('Təsdiqləyirsən?')) return;
    await sendRequest({ action: 'approveBalance', reqId: id, role: 'admin' });
    fetchAdminData();
}

async function rejectBal(id) {
    if (!confirm('Ləğv edirsən?')) return;
    await sendRequest({ action: 'rejectBalance', reqId: id, role: 'admin' });
    fetchAdminData();
}

function renderAdminOrders() {
    let html = `<h2 style="color:white;">Sifarişlər</h2><table><thead><tr><th>Məhsul</th><th>User</th><th>Kod</th></tr></thead><tbody>`;
    db.orders.slice().reverse().forEach(o => {
        const btn = o.deliveryData ? `<span style="color:green">Verilib</span>` : `<button onclick="openDelModal('${o.id}')">Kod Ver</button>`;
        html += `<tr><td>${o.prodName}</td><td>${o.userId}</td><td>${btn}</td></tr>`;
    });
    document.getElementById('admin-view').innerHTML = html + `</tbody></table>`;
}

function openDelModal(id) {
    document.getElementById('del-order-id').value = id;
    document.getElementById('delivery-modal').style.display = 'flex';
}

async function submitDelivery() {
    const id = document.getElementById('del-order-id').value;
    const code = document.getElementById('del-text').value;
    await sendRequest({ action: 'deliverOrder', orderId: id, code: code });
    closeModal('delivery-modal');
    fetchAdminData();
}

function renderAdminUsers() {
    let html = `<h2 style="color:white;">İstifadəçilər</h2><table><thead><tr><th>Ad</th><th>Rol</th><th>Balans</th></tr></thead><tbody>`;
    db.users.forEach(u => { html += `<tr><td>${u.username}</td><td>${u.role}</td><td>${u.balance} ₼</td></tr>`; });
    document.getElementById('admin-view').innerHTML = html + `</tbody></table>`;
}

// ==========================================
// UTILS
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

// ==========================================
// EXPORTS (HTML ÜÇÜN ÇOX VACİBDİR)
// ==========================================
window.handleAuth = handleAuth;
window.handleRegister = handleRegister;
window.switchAuth = switchAuth;
window.openAuth = openAuth;
window.closeAuth = closeAuth;
window.logout = logout;
window.renderUserHome = renderUserHome;
window.renderCategoryProducts = renderCategoryProducts;
window.handleSearch = handleSearch;
window.openDetail = openDetail;
window.addToCart = addToCart;
window.openCart = openCart;
window.removeFromCart = removeFromCart;
window.checkout = checkout;
window.openUserOrders = openUserOrders;
window.openBalanceModal = openBalanceModal;
window.submitBalanceRequest = submitBalanceRequest;
window.openProfileModal = openProfileModal;
window.verifyCurrentEmail = verifyCurrentEmail;
window.updateEmail = updateEmail;
window.verifyCode = verifyCode;
window.toggleChangeEmail = toggleChangeEmail;
window.handleMobileAction = handleMobileAction;
window.closeModal = closeModal;
window.fetchAdminData = fetchAdminData;
window.renderAdminDashboard = renderAdminDashboard;
window.renderAdminProducts = renderAdminProducts;
window.renderAdminBalance = renderAdminBalance;
window.approveBal = approveBal;
window.rejectBal = rejectBal;
window.renderAdminOrders = renderAdminOrders;
window.openDelModal = openDelModal;
window.submitDelivery = submitDelivery;
window.renderAdminUsers = renderAdminUsers;
window.renderUserHomeFromAdmin = renderUserHomeFromAdmin;
window.openInfoModal = openInfoModal;