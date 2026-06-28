let currentUser = JSON.parse(localStorage.getItem('aurahub_user'));
let ads = JSON.parse(localStorage.getItem('aurahub_ads')) || [];
let currentFilter = 'all';

window.onload = () => {
    updateNav();
    renderAds();
};

// --- YENİ TOAST (Bildiriş) SİSTEMİ (Alert əvəzinə) ---
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-circle-exclamation"></i>';
    toast.innerHTML = `${icon} ${message}`;

    container.appendChild(toast);

    // 3 saniyə sonra silinmə animasiyası
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- NAVİQASİYA VƏ AUTH ---
function updateNav() {
    const nav = document.getElementById('nav-actions');
    if (currentUser) {
        nav.innerHTML = `<button class="action-btn login-btn" onclick="openProfile()"><i class="fa-solid fa-user-astronaut"></i> ${currentUser.username}</button>`;
    } else {
        nav.innerHTML = `<button class="action-btn login-btn" onclick="openModal('loginModal')">Daxil Ol</button>`;
    }
}

function requireAuth(actionCallback) {
    if (currentUser) {
        actionCallback();
    } else {
        openModal('loginModal');
        showToast("Zəhmət olmasa əvvəlcə daxil olun.", "error");
    }
}

// --- MODAL İDARƏETMƏSİ ---
function openModal(id) { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

function openCreateModal() { openModal('createModal'); }

function toggleAdInputs() {
    const isMatch = document.getElementById('type-match').checked;
    document.getElementById('match-inputs').style.display = isMatch ? 'block' : 'none';
    document.getElementById('player-inputs').style.display = isMatch ? 'none' : 'block';
}

// --- PROFİL SİSTEMİ ---
function login() {
    const username = document.getElementById('username').value;
    const age = document.getElementById('age').value;
    const position = document.getElementById('position').value;

    if (!username || !age) {
        return showToast("Bütün xanaları doldurun!", "error");
    }

    currentUser = { username, age, position, skill: "Orta" };
    localStorage.setItem('aurahub_user', JSON.stringify(currentUser));

    closeModal('loginModal');
    updateNav();
    showToast(`Xoş gəldin, ${username}!`);
}

function openProfile() {
    document.getElementById('edit-username').value = currentUser.username || '';
    document.getElementById('edit-age').value = currentUser.age || '';
    document.getElementById('edit-position').value = currentUser.position || 'Hücumçu';
    document.getElementById('edit-skill').value = currentUser.skill || "Orta";
    document.getElementById('edit-phone').value = currentUser.phone || ''; 
    openModal('profileModal');
}

function updateProfile() {
    currentUser.username = document.getElementById('edit-username').value;
    currentUser.age = document.getElementById('edit-age').value;
    currentUser.position = document.getElementById('edit-position').value;
    currentUser.skill = document.getElementById('edit-skill').value;
    currentUser.phone = document.getElementById('edit-phone').value; // Nömrəni artıq yadda saxlayır
    
    localStorage.setItem('aurahub_user', JSON.stringify(currentUser));
    closeModal('profileModal');
    updateNav();
    showToast("Profil uğurla yeniləndi!");
}

function logout() {
    localStorage.removeItem('aurahub_user');
    currentUser = null;
    closeModal('profileModal');
    updateNav();
    showToast("Hesabdan çıxış edildi.");
}

// --- ELAN YARATMA ---
function submitAd() {
    const type = document.getElementById('type-match').checked ? 'match' : 'player';
    
    let newAd = {
        id: Date.now(),
        type: type,
        author: currentUser.username,
        authorPos: currentUser.position,
        phone: currentUser.phone || "Qeyd olunmayıb", // Nömrəni elana bağlayır
        dateAdded: new Date().toLocaleDateString('az-AZ')
    };

    if (type === 'match') {
        newAd.stadium = document.getElementById('stadium').value;
        newAd.time = document.getElementById('time').value;
        newAd.price = document.getElementById('price').value;
        if(!newAd.stadium || !newAd.time) return showToast("Stadion və vaxtı qeyd edin!", "error");
    } else {
        newAd.note = document.getElementById('note').value;
        if(!newAd.note) return showToast("Qeyd hissəsini boş saxlamayın!", "error");
    }

    ads.unshift(newAd);
    localStorage.setItem('aurahub_ads', JSON.stringify(ads));
    closeModal('createModal');
    
    document.getElementById('stadium').value = '';
    document.getElementById('time').value = '';
    document.getElementById('price').value = '';
    document.getElementById('note').value = '';

    renderAds();
    showToast("Elan uğurla paylaşıldı!");
}

// --- FİLTR VƏ ELANLARI GÖSTƏRMƏ ---
function filterAds(type) {
    currentFilter = type;
    
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    renderAds();
}

function renderAds() {
    const container = document.getElementById('ads-container');
    container.innerHTML = '';

    const filteredAds = currentFilter === 'all' ? ads : ads.filter(ad => ad.type === currentFilter);

    if (filteredAds.length === 0) {
        container.innerHTML = '<p style="color:#888; text-align:center; width: 100%; padding: 20px;">Hələ ki, bu kateqoriyada elan yoxdur.</p>';
        return;
    }

    filteredAds.forEach(ad => {
        const div = document.createElement('div');
        div.className = 'ad-card';
        
        const adPhone = ad.phone || 'Qeyd olunmayıb';

        if (ad.type === 'match') {
            div.innerHTML = `
                <div class="ad-header">
                    <span class="ad-badge badge-match"><i class="fa-solid fa-users"></i> Oyunçu Axtarılır</span>
                    <span style="color:#666; font-size:12px;">${ad.dateAdded}</span>
                </div>
                <h3>${ad.stadium}</h3>
                <div class="ad-detail"><i class="fa-solid fa-user-tie"></i> Təşkilatçı: <strong>${ad.author}</strong></div>
                <div class="ad-detail"><i class="fa-solid fa-clock"></i> Vaxt: <strong>${new Date(ad.time).toLocaleString('az-AZ')}</strong></div>
                <div class="ad-detail"><i class="fa-solid fa-manat-sign"></i> Qiymət: <strong>${ad.price || '0'} AZN</strong></div>
                <button class="action-btn contact-btn" onclick="requireAuth(() => showContactInfo('${ad.author}', '${adPhone}'))">Əlaqəyə Keç</button>
            `;
        } else {
            div.innerHTML = `
                <div class="ad-header">
                    <span class="ad-badge badge-player"><i class="fa-solid fa-person-running"></i> Oyun Axtarır</span>
                    <span style="color:#666; font-size:12px;">${ad.dateAdded}</span>
                </div>
                <h3>${ad.author}</h3>
                <div class="ad-detail"><i class="fa-solid fa-shoe-prints"></i> Mövqe: <strong>${ad.authorPos}</strong></div>
                <div class="ad-detail"><i class="fa-solid fa-comment-dots"></i> Qeyd: <strong>${ad.note}</strong></div>
                <button class="action-btn contact-btn" onclick="requireAuth(() => showContactInfo('${ad.author}', '${adPhone}'))">Komandaya Dəvət Et</button>
            `;
        }
        container.appendChild(div);
    });
}

function showContactInfo(authorName, phone) {
    const body = document.getElementById('info-modal-body');
    const cleanPhone = phone ? phone.replace(/[^0-9]/g, '') : '';
    
    body.innerHTML = `
        <div style="text-align:center; padding: 20px;">
            <h3>${authorName}</h3>
            <p style="color: var(--text-muted); margin: 10px 0;">Əlaqə nömrəsi: <br><strong style="color:#fff; font-size:18px;">${phone || 'Yoxdur'}</strong></p>
            
            <a href="https://wa.me/${cleanPhone}" target="_blank" class="action-btn" style="text-decoration:none; width:100%; margin-top:15px; display:inline-block;">
                <i class="fa-brands fa-whatsapp"></i> WhatsApp ilə Yaz
            </a>
            <a href="tel:${phone}" class="login-btn action-btn" style="text-decoration:none; width:100%; margin-top:10px; display:inline-block;">
                <i class="fa-solid fa-phone"></i> Adi Zəng Et
            </a>
        </div>
    `;
    
    openModal('infoModal');
}