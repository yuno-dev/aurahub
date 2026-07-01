import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDocs, collection, deleteDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCZrOBjlyl9opYDeu8uy5v01BQ-MvX_ZWc",
    authDomain: "aurahub-c97bd.firebaseapp.com",
    projectId: "aurahub-c97bd",
    storageBucket: "aurahub-c97bd.firebasestorage.app",
    messagingSenderId: "790387840160",
    appId: "1:790387840160:web:0d777a2c3ab35ebb13a5c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Qlobal dəyişənlər
let currentUser = null;
let ads = [];
let notifications = [];
let allUsers = [];

let filters = { type: 'all', stadium: 'all', position: 'all', skill: 'all' };
let currentPage = 1;
const adsPerPage = 6;
let map, mapMarkers = [], isMapVisible = false;
const stadiumCoords = {
    "Ruslan93 Stadionu": [40.4072, 49.9461],
    "Amasiya Stadionu": [40.4135, 49.8732],  
    "Binəqədi": [40.4650, 49.8270],
    "Nərimanov": [40.4026, 49.8717],
    "Nəsimi": [40.3850, 49.8350],
    "Yasamal Sportster": [40.3950, 49.7900], 
};

// Firebase-dən ilkin məlumatları yükləmək
async function loadInitialData() {
    try {
        const usersSnap = await getDocs(collection(db, "users"));
        allUsers = usersSnap.docs.map(doc => doc.data());

        const adsSnap = await getDocs(collection(db, "ads"));
        ads = adsSnap.docs.map(doc => doc.data()).sort((a, b) => b.id - a.id); // Yenilər üstdə

        const notifsSnap = await getDocs(collection(db, "notifications"));
        notifications = notifsSnap.docs.map(doc => doc.data());

        const savedUsername = localStorage.getItem('aurahub_logged_in_user');
        if (savedUsername) {
            currentUser = allUsers.find(u => u.username === savedUsername) || null;
        }
    } catch (error) {
        console.error("Məlumatlar yüklənərkən xəta baş verdi: ", error);
        showToast("Baza ilə əlaqə qurulmadı", "error");
    }
}

window.onload = async () => {
    if (localStorage.getItem('aurahub_theme') === 'light') {
        document.body.classList.add('light-mode');
        document.getElementById('theme-toggle').innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
    
    await loadInitialData();
    
    updateNav();
    renderTopPlayers();
    renderAds();
    updateNotificationBadge();
};

window.toggleTheme = function() {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('aurahub_theme', isLight ? 'light' : 'dark');
    document.getElementById('theme-toggle').innerHTML = isLight ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
};

window.showToast = function(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-circle-exclamation"></i>';
    toast.innerHTML = `${icon} ${message}`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.animation = 'fadeOut 0.3s forwards'; setTimeout(() => toast.remove(), 300); }, 3000);
};

window.updateNav = function() {
    const nav = document.getElementById('nav-actions');
    if (!nav) return;

    if (currentUser) {
        let adminBtn = '';
        if (currentUser.username.toLowerCase() === 'onur' || currentUser.username.toLowerCase() === 'resuleli') {
            adminBtn = `<button class="action-btn" style="background: var(--danger); color: white; margin-right: 10px; border:none; box-shadow: 0 4px 15px rgba(255, 68, 68, 0.4);" onclick="openAdminPanel()">
                            <i class="fa-solid fa-user-shield"></i> Admin
                        </button>`;
        }
        nav.innerHTML = `${adminBtn} <button class="action-btn" onclick="openProfile()"><i class="fa-solid fa-user"></i> ${currentUser.username}</button>`;
    } else {
        // DÜZƏLİŞ: loginModal əvəzinə authModal oldu
        nav.innerHTML = `<button class="action-btn" onclick="openModal('authModal')">Daxil Ol</button>`;
    }
};

window.requireAuth = function(actionCallback) {
    if (currentUser) actionCallback();
    else { 
        // DÜZƏLİŞ: authModal açılır
        openModal('authModal'); 
        showToast("Zəhmət olmasa əvvəlcə daxil olun.", "error"); 
    }
};

window.openModal = function(id) { document.getElementById(id).style.display = 'flex'; };
window.closeModal = function(id) { document.getElementById(id).style.display = 'none'; };
window.openCreateModal = function() { openModal('createModal'); };

window.renderTopPlayers = function() {
    const container = document.getElementById('top-players-container');
    container.innerHTML = '';
    
    if (allUsers.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted); font-size:13px; padding-left:10px;">Hələlik sistemdə oyunçu yoxdur.</p>';
        return;
    }

    let sortedUsers = [...allUsers].sort((a, b) => (b.stats?.attended || 0) - (a.stats?.attended || 0));

    sortedUsers.slice(0, 5).forEach(p => {
        container.innerHTML += `
            <div class="player-mini-card" onclick="viewPublicProfile('${p.username}')" title="Kartına bax">
                <img src="${p.avatar || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'}" alt="Avatar">
                <div class="player-info">
                    <h4>${p.username}</h4>
                    <p><i class="fa-solid fa-futbol"></i> ${p.stats?.attended || 0} oyun</p>
                </div>
            </div>
        `;
    });
};

window.syncUserToDB = async function() {
    if(!currentUser) return;
    
    const index = allUsers.findIndex(u => u.username === currentUser.username);
    if(index > -1) {
        allUsers[index] = currentUser; 
    } else {
        allUsers.push(currentUser); 
    }
    
    try {
        await setDoc(doc(db, "users", currentUser.username), currentUser);
    } catch (error) {
        console.error("İstifadəçi yadda saxlanılarkən xəta: ", error);
    }
};

// --- ŞİFRƏNİ KRİPTOQRAFİK HASH ETMƏK ---
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// --- AUTH MODAL TABLARINI DƏYİŞMƏK ---
window.switchAuthTab = function(tab) {
    document.getElementById('tab-login-btn').classList.toggle('active', tab === 'login');
    document.getElementById('tab-register-btn').classList.toggle('active', tab === 'register');
    document.getElementById('login-form').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('register-form').style.display = tab === 'register' ? 'block' : 'none';
};

// --- YENİ QEYDİYYAT SİSTEMİ ---
window.submitRegister = async function() {
    const username = document.getElementById('reg-username').value.trim();
    const password = document.getElementById('reg-password').value;
    const age = document.getElementById('reg-age').value;
    const position = document.getElementById('reg-position').value;

    if (!username || !password || !age) return showToast("Bütün xanaları doldurun!", "error");
    
    // Şifrə Yoxlanışı: Min 8 simvol və ən azı 1 hərf
    if (password.length < 8 || !/[a-zA-Z]/.test(password)) {
        return showToast("Şifrə minimum 8 simvol olmalı və tərkibində hərf olmalıdır!", "error");
    }

    // Unikal Ad yoxlanışı (Bütün adları kiçik hərflə müqayisə edirik)
    const exists = allUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (exists) return showToast("Bu istifadəçi adı artıq tutulub! Fərqli ad seçin.", "error");

    const hashedPassword = await hashPassword(password);

    // Yeni İstifadəçi Obyekti (Firestore id-si lowercase olaraq yazılacaq)
    currentUser = { 
        username: username, // Original case (Məs: oNur) ekranda göstərmək üçündür
        password: hashedPassword,
        age: age, 
        position: position, 
        skill: "Orta", 
        teamName: "", 
        avatar: "https://cdn-icons-png.flaticon.com/512/847/847969.png", 
        stats: { accepted: 0, attended: 0 }, 
        isPro: false, 
        roster: [username] 
    };

    localStorage.setItem('aurahub_logged_in_user', currentUser.username);
    await syncUserToDB(); 
    
    closeModal('authModal'); 
    updateNav(); 
    renderTopPlayers(); 
    showToast(`Aramıza xoş gəldin, ${username}!`);
    
    // YENİ QEYDİYYAT OLDUĞU ÜÇÜN BƏLƏDÇİNİ (TUTORIAL) BAŞLADIRIQ
    setTimeout(startTutorial, 500); 
};

// --- DAXİL OL (LOGIN) SİSTEMİ ---
window.submitLogin = async function() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    if (!username || !password) return showToast("Məlumatları tam daxil edin!", "error");

    // Adı kiçik hərflərlə axtarırıq (istifadəçi ONUR da yazsa, onur da yazsa tapacaq)
    const existingUser = allUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
    
    if (!existingUser) return showToast("Belə bir istifadəçi tapılmadı!", "error");

    const hashedPassword = await hashPassword(password);
    if (existingUser.password !== hashedPassword) return showToast("Şifrə yalnışdır!", "error");

    currentUser = existingUser;
    localStorage.setItem('aurahub_logged_in_user', currentUser.username);
    
    closeModal('authModal'); 
    updateNav(); 
    renderTopPlayers(); 
    showToast(`Xoş gəldin, ${currentUser.username}!`);
};

// Köhnə openModal('loginModal') çağırışlarını 'authModal' olaraq yeniləyirik
window.requireAuth = function(actionCallback) {
    if (currentUser) actionCallback();
    else { openModal('authModal'); showToast("Zəhmət olmasa əvvəlcə daxil olun.", "error"); }
};

window.switchProfileTab = function(tabName, btnElement) {
    document.querySelectorAll('.profile-tab-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    document.getElementById('tab-card').style.display = tabName === 'card' ? 'block' : 'none';
    document.getElementById('tab-edit').style.display = tabName === 'edit' ? 'block' : 'none';
};

window.openProfile = function() {
    document.getElementById('edit-username').value = currentUser.username || '';
    document.getElementById('edit-team').value = currentUser.teamName || '';
    document.getElementById('edit-age').value = currentUser.age || '';
    document.getElementById('edit-position').value = currentUser.position || 'Hücumçu';
    document.getElementById('edit-skill').value = currentUser.skill || "Orta";
    document.getElementById('edit-phone').value = currentUser.phone || ''; 
    
    document.getElementById('card-name').innerText = currentUser.username;
    
    if(currentUser.teamName) {
        document.getElementById('card-team').style.display = 'block';
        document.getElementById('card-team-name').innerText = currentUser.teamName;
    } else {
        document.getElementById('card-team').style.display = 'none';
    }

    document.getElementById('card-pos').innerText = currentUser.position || 'Hücumçu';
    document.getElementById('card-age').innerText = currentUser.age || '';
    document.getElementById('card-skill').innerText = currentUser.skill || 'Orta';
    document.getElementById('card-avatar').src = currentUser.avatar || "https://cdn-icons-png.flaticon.com/512/847/847969.png";

    let accepted = currentUser.stats ? currentUser.stats.accepted : 0;
    let attended = currentUser.stats ? currentUser.stats.attended : 0;
    document.getElementById('card-accepted').innerText = accepted;
    document.getElementById('card-attended').innerText = attended;
    
    let trustPercent = accepted === 0 ? 0 : Math.round((attended / accepted) * 100);
    document.getElementById('card-trust-percent').innerText = trustPercent + '%';
    document.getElementById('card-trust-fill').style.width = trustPercent + '%';
    
    if(trustPercent > 70) document.getElementById('card-trust-fill').style.background = '#25D366'; 
    else if(trustPercent > 40) document.getElementById('card-trust-fill').style.background = '#FFA500'; 
    else if(accepted > 0) document.getElementById('card-trust-fill').style.background = '#ff4757'; 

    if(currentUser.isPro) {
        document.getElementById('pro-badge').style.display = 'flex';
        document.getElementById('premium-card-bg').classList.add('pro-glow');
    }

    // Əgər adminlərdən biridirsə, profilin içinə də qırmızı düymə əlavə edirik
    if (currentUser.username.toLowerCase() === 'onur' || currentUser.username.toLowerCase() === 'resuleli') {
        const modalContent = document.querySelector('#profileModal .modal-content');
        if (modalContent && !document.getElementById('admin-panel-btn-profile')) {
            modalContent.innerHTML += `
                <button id="admin-panel-btn-profile" class="action-btn" style="background: var(--danger); color: white; width: 100%; margin-top: 15px; border:none;" onclick="openAdminPanel()">
                    <i class="fa-solid fa-user-shield"></i> Admin Paneli
                </button>
            `;
        }
    }

    document.querySelector('.profile-tab-btn').click();
    openModal('profileModal');
};

window.verifyProStatus = function() {
    const text = `Salam Aurahub. Mən ${currentUser.username}. "Pro Oyunçu" etiketi almaq istəyirəm. Oynadığım klub: `;
    window.open(`https://wa.me/994550000000?text=${encodeURIComponent(text)}`, '_blank');
};

window.uploadAvatar = async function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async function(e) {
            document.getElementById('card-avatar').src = e.target.result;
            currentUser.avatar = e.target.result; 
            await syncUserToDB(); 
        }
        reader.readAsDataURL(file);
    }
};

window.updateProfile = async function() {
    const newUsername = document.getElementById('edit-username').value.trim();
    const oldUsername = currentUser.username;

    if (!newUsername) return showToast("İstifadəçi adı boş ola bilməz!", "error");

    // 1. ƏGƏR İSTİFADƏÇİ ADINI DƏYİŞİRSƏ
    if (newUsername !== oldUsername) {
        // Yoxlayaq bəlkə bu ad artıq kimdəsə var?
        const exists = allUsers.find(u => u.username === newUsername);
        if (exists) return showToast("Bu istifadəçi adı artıq məşğuldur!", "error");

        // Köhnə profili bazadan silirik
        try {
            await deleteDoc(doc(db, "users", oldUsername));
        } catch(e) { console.error("Köhnə profil silinərkən xəta:", e); }
        
        // Yerli massivdən (allUsers) köhnə hesabı silirik
        allUsers = allUsers.filter(u => u.username !== oldUsername);
        
        // Yeni adı təyin edirik
        currentUser.username = newUsername;
        localStorage.setItem('aurahub_logged_in_user', newUsername); // Yaddaşda da yeniləyirik
        
        // Əgər istifadəçinin aktiv elanları varsa, onlardakı köhnə adını da avtomatik yeniləyirik
        ads.forEach(async ad => {
            if(ad.author === oldUsername) {
                ad.author = newUsername;
                if (ad.teamName === oldUsername) ad.teamName = newUsername;
                await setDoc(doc(db, "ads", ad.id), ad);
            }
        });
    }

    // 2. QALAN MƏLUMATLARI YENİLƏYİRİK
    currentUser.teamName = document.getElementById('edit-team').value;
    currentUser.age = document.getElementById('edit-age').value;
    currentUser.position = document.getElementById('edit-position').value;
    currentUser.skill = document.getElementById('edit-skill').value;
    currentUser.phone = document.getElementById('edit-phone').value;
    
    await syncUserToDB(); 
    
    closeModal('profileModal'); 
    updateNav(); 
    window.renderTopPlayers(); 
    if (typeof renderAds === "function") window.renderAds(); // Elanlar da yeni adla görünsün
    showToast("Profil yeniləndi!");
};

window.logout = function() { 
    localStorage.removeItem('aurahub_logged_in_user'); 
    currentUser = null; 
    closeModal('profileModal'); 
    updateNav(); 
    showToast("Hesabdan çıxış edildi."); 
};

window.updateNotificationBadge = function() {
    if(!currentUser) return;
    const myNotifs = notifications.filter(n => n.to === currentUser.username && n.status === 'pending');
    const badge = document.getElementById('notif-badge');
    if(myNotifs.length > 0) { badge.style.display = 'flex'; badge.innerText = myNotifs.length; } else { badge.style.display = 'none'; }
};

window.applyToPlay = async function(adId, authorName) {
    if(authorName === currentUser.username) return showToast("Öz elanınıza müraciət edə bilməzsiniz!", "error");
    if(notifications.find(n => n.adId === adId && n.from === currentUser.username)) return showToast("Siz artıq bu oyuna müraciət etmisiniz.", "error");

    const newNotif = { 
        id: Date.now().toString(), 
        to: authorName, 
        from: currentUser.username, 
        fromPos: currentUser.position, 
        adId: adId, 
        status: 'pending', 
        date: new Date().toLocaleTimeString('az-AZ', {hour: '2-digit', minute:'2-digit'}) 
    };

    try {
        await setDoc(doc(db, "notifications", newNotif.id), newNotif);
        notifications.push(newNotif);
        showToast("Müraciətiniz göndərildi.");
    } catch (error) {
        showToast("Müraciət göndərilərkən xəta baş verdi.", "error");
    }
};

window.openNotifications = function() {
    const container = document.getElementById('notifications-list');
    const myNotifs = notifications.filter(n => n.to === currentUser.username && n.status === 'pending');
    container.innerHTML = '';
    if(myNotifs.length === 0) container.innerHTML = '<p style="color:var(--text-muted); text-align:center;">Yeni bildirişiniz yoxdur.</p>';
    else {
        myNotifs.forEach(n => {
            const ad = ads.find(a => a.id === n.adId);
            container.innerHTML += `
                <div class="notif-item" id="notif-${n.id}">
                    <div><strong>${n.from}</strong> (${n.fromPos}) sənin <em>${ad ? ad.stadium : 'oyununa'}</em> qatılmaq istəyir.</div>
                    <div class="notif-actions">
                        <button class="login-btn" style="padding:5px 10px; font-size:12px;" onclick="viewPlayerCard('${n.from}')">Kartına Bax</button>
                        <button class="action-btn" style="padding: 5px 10px; font-size:12px;" onclick="handleRequest('${n.id}', 'accept')">Qəbul Et</button>
                    </div>
                </div>`;
        });
    }
    openModal('notificationsModal');
};

window.viewPublicProfile = function(username) {
    const user = allUsers.find(u => u.username === username);
    
    if (!user) {
        return showToast("Bu istifadəçinin ətraflı məlumatı hələ bazada yoxdur.", "error");
    }
    
    document.getElementById('public-card-name').innerText = user.username;
    document.getElementById('public-card-avatar').src = user.avatar || "https://cdn-icons-png.flaticon.com/512/847/847969.png";
    
    if(user.teamName) {
        document.getElementById('public-card-team').style.display = 'block';
        document.getElementById('public-card-team-name').innerText = user.teamName;
    } else {
        document.getElementById('public-card-team').style.display = 'none';
    }

    document.getElementById('public-card-pos').innerText = user.position || 'Hücumçu';
    document.getElementById('public-card-age').innerText = user.age || '';
    document.getElementById('public-card-skill').innerText = user.skill || 'Orta';
    
    let accepted = user.stats ? user.stats.accepted : 0;
    let attended = user.stats ? user.stats.attended : 0;
    document.getElementById('public-card-accepted').innerText = accepted;
    document.getElementById('public-card-attended').innerText = attended;
    
    let trustPercent = accepted === 0 ? 0 : Math.round((attended / accepted) * 100);
    document.getElementById('public-card-trust-percent').innerText = trustPercent + '%';
    
    const trustFill = document.getElementById('public-card-trust-fill');
    trustFill.style.width = trustPercent + '%';
    if(trustPercent > 70) trustFill.style.background = '#25D366'; 
    else if(trustPercent > 40) trustFill.style.background = '#FFA500'; 
    else if(accepted > 0) trustFill.style.background = '#ff4757'; 
    else trustFill.style.background = '#25D366';

    const bgCard = document.getElementById('public-premium-card-bg');
    if(user.isPro) {
        document.getElementById('public-pro-badge').style.display = 'flex';
        bgCard.classList.add('pro-glow');
    } else {
        document.getElementById('public-pro-badge').style.display = 'none';
        bgCard.classList.remove('pro-glow');
    }

    const containerAds = document.getElementById('public-card-ads-container');
    const userAds = ads.filter(a => a.author === username);
    
    if(userAds.length > 0) {
        let adsHTML = `<h4 style="font-size:14px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:8px; margin-bottom:12px; color:var(--primary);"><i class="fa-solid fa-bullhorn"></i> Aktiv Elanları</h4>`;
        
        userAds.forEach(ad => {
            let badgeText = ad.type === 'match' ? 'Oyunçu Axtarır' : (ad.type === 'opponent' ? 'Rəqib Axtarır' : 'Oyun Axtarır');
            let color = ad.type === 'match' ? 'var(--primary)' : (ad.type === 'opponent' ? 'var(--danger)' : '#4dabf7');
            
            let actionBtn = '';
            if(!currentUser || currentUser.username !== username) {
                if(ad.type === 'match') actionBtn = `<button onclick="requireAuth(() => { applyToPlay('${ad.id}', '${ad.author}'); closeModal('publicCardModal'); })" style="background:${color}; color:#000; border:none; padding:4px 10px; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">Qatıl</button>`;
                else actionBtn = `<button onclick="requireAuth(() => { showContactInfo('${ad.author}', '${ad.phone}'); closeModal('publicCardModal'); })" style="background:${color}; color:#fff; border:none; padding:4px 10px; border-radius:4px; cursor:pointer; font-size:11px; font-weight:bold;">Əlaqə</button>`;
            }

            adsHTML += `
                <div class="mini-ad-box">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                        <strong style="color:${color};">${badgeText}</strong>
                        ${actionBtn}
                    </div>
                    ${ad.stadium ? `<div style="color:#ccc;"><i class="fa-solid fa-location-dot" style="font-size:10px;"></i> ${ad.stadium}</div>` : ''}
                    <div style="color:var(--text-muted); font-size:11px; margin-top:3px;"><i class="fa-solid fa-clock"></i> ${ad.time ? new Date(ad.time).toLocaleString('az-AZ') : ad.dateAdded}</div>
                </div>
            `;
        });
        containerAds.innerHTML = adsHTML;
    } else {
        containerAds.innerHTML = `<div style="text-align:center; color:var(--text-muted); font-size:12px; padding:10px; background:rgba(0,0,0,0.2); border-radius:8px;">Bu istifadəçinin aktiv elanı yoxdur.</div>`;
    }
    openModal('publicCardModal');
};
window.viewPlayerCard = window.viewPublicProfile;

window.handleRequest = async function(notifId, action) {
    const notifIndex = notifications.findIndex(n => n.id === notifId);
    if(notifIndex > -1) {
        notifications[notifIndex].status = action;
        
        try {
            await setDoc(doc(db, "notifications", notifId), notifications[notifIndex]);
            document.getElementById(`notif-${notifId}`).style.display = 'none'; 
            updateNotificationBadge();
            if(action === 'accept') showToast("Oyunçu qəbul edildi!");
            else showToast("Oyunçu rədd edildi.", "error");
        } catch (error) {
            showToast("Əməliyyat xətası baş verdi.", "error");
        }
    }
};

window.toggleAdInputs = function() {
    const type = document.querySelector('input[name="adType"]:checked').value;
    document.getElementById('match-inputs').style.display = (type === 'match' || type === 'opponent') ? 'block' : 'none';
    document.getElementById('player-inputs').style.display = type === 'player' ? 'block' : 'none';
    document.getElementById('player-count-wrapper').style.display = type === 'opponent' ? 'none' : 'block';
};

window.setMainFilter = function(type) {
    filters.type = type;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-${type}`).classList.add('active');
    
    document.getElementById('match-filters').style.display = (type === 'match' || type === 'opponent') ? 'flex' : 'none';
    document.getElementById('player-filters').style.display = type === 'player' ? 'flex' : 'none';
    window.applyFilters();
};

window.applyFilters = function() {
    filters.stadium = document.getElementById('filter-stadium').value;
    filters.position = document.getElementById('filter-pos').value;
    filters.skill = document.getElementById('filter-skill').value;
    currentPage = 1; window.renderAds();
};

window.checkCustomStadium = function() { document.getElementById('custom-stadium-wrapper').style.display = document.getElementById('stadium-select').value === 'Digər' ? 'block' : 'none'; };

window.generatePositionInputs = function() {
    let count = parseInt(document.getElementById('player-count').value) || 0;
    if (count > 11) count = 11; 
    const container = document.getElementById('dynamic-positions'); container.innerHTML = '';
    for(let i = 0; i < count; i++) container.innerHTML += `<div class="input-wrapper animate-fade"><i class="fa-solid fa-shirt"></i><select class="needed-pos-select"><option value="Fərq etməz">Mövqe seç (${i+1}-ci oyunçu)</option><option value="Hücumçu">Hücumçu</option><option value="Yarımmüdafiəçi">Yarımmüdafiəçi</option><option value="Müdafiəçi">Müdafiəçi</option><option value="Qapıçı">Qapıçı</option></select></div>`;
};

window.submitAd = async function() {
    const type = document.querySelector('input[name="adType"]:checked').value;
    
    if(type === 'opponent' && (!currentUser.teamName || currentUser.teamName.trim() === '')) {
        return showToast("Rəqib axtarmaq üçün profilinizdən əvvəlcə 'Komanda Adı' yazmalısınız!", "error");
    }

    let newAd = { 
        id: Date.now().toString(), 
        type: type, 
        author: currentUser.username, 
        teamName: currentUser.teamName, 
        authorPos: currentUser.position, 
        authorSkill: currentUser.skill, 
        isPro: currentUser.isPro, 
        phone: currentUser.phone || "Qeyd olunmayıb", 
        dateAdded: new Date().toLocaleDateString('az-AZ') 
    };

    if (type === 'match' || type === 'opponent') {
        let st = document.getElementById('stadium-select').value;
        if (st === 'Digər') st = document.getElementById('custom-stadium').value;
        if(!st) return showToast("Stadion adını yazın!", "error");
        newAd.stadium = st; newAd.time = document.getElementById('time').value; newAd.price = document.getElementById('price').value;
        
        if(type === 'match') {
            let pos = []; document.querySelectorAll('.needed-pos-select').forEach(sel => { if(sel.value !== 'Mövqe seç') pos.push(sel.value); });
            newAd.neededPlayersCount = document.getElementById('player-count').value || 1; newAd.neededPositions = pos;
        }
        if(!newAd.time) return showToast("Vaxtı qeyd edin!", "error");
    } else {
        newAd.note = document.getElementById('note').value;
        if(!newAd.note) return showToast("Qeyd boş olmamalıdır!", "error");
    }

    try {
        await setDoc(doc(db, "ads", newAd.id), newAd);
        ads.unshift(newAd); 
        closeModal('createModal');
        currentPage = 1; 
        window.renderAds(); 
        showToast("Elan paylaşıldı!");
    } catch (error) {
        showToast("Elan paylaşılarkən xəta baş verdi", "error");
    }
};

window.deleteAd = async function(id) { 
    if(confirm("Bu elanı silmək istədiyinizə əminsiniz?")) { 
        try {
            await deleteDoc(doc(db, "ads", id.toString()));
            ads = ads.filter(ad => ad.id !== id.toString()); 
            currentPage = 1; 
            window.renderAds(); 
            showToast("Elan silindi!", "success"); 
        } catch (error) {
            showToast("Elan silinərkən xəta baş verdi", "error");
        }
    } 
};

window.shareAdAsImage = function(id) {
    const ad = ads.find(a => a.id === id.toString() || a.id === id); 
    if(!ad) return;

    showToast("Poster hazırlanır, zəhmət olmasa gözləyin...", "success");

    document.getElementById('poster-title').innerText = ad.type === 'player' ? ad.author : ad.stadium;
    document.getElementById('poster-badge').innerText = ad.type === 'match' ? 'OYUNÇU AXTARILIR' : (ad.type === 'opponent' ? 'RƏQİB AXTARILIR' : 'OYUN AXTARILIR');
    
    let desc = '';
    if(ad.type === 'match') {
        document.getElementById('poster-time').innerHTML = `Vaxt: ${new Date(ad.time).toLocaleString('az-AZ')}`;
        desc = `Axtarılır: <strong style="color:#caff04;">${ad.neededPlayersCount} nəfər</strong><br>Təşkilatçı: ${ad.author}`;
    } else if(ad.type === 'opponent') {
        document.getElementById('poster-time').innerHTML = `Vaxt: ${new Date(ad.time).toLocaleString('az-AZ')}`;
        desc = `Komanda: <strong style="color:#caff04;">${ad.teamName || ad.author}</strong><br>Format: Yoldaşlıq Oyunu`;
    } else {
        document.getElementById('poster-time').innerHTML = `Mövqe: ${ad.authorPos}`;
        desc = `Səviyyə: <strong style="color:#caff04;">${ad.authorSkill}</strong><br>Qeyd: ${ad.note}`;
    }
    document.getElementById('poster-desc').innerHTML = desc;

    const posterDiv = document.getElementById('share-poster-template');
    
    html2canvas(posterDiv, { backgroundColor: '#141414', scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg', 0.9);
        
        fetch(imgData).then(res => res.blob()).then(blob => {
            const file = new File([blob], `aurahub_elan_${id}.jpg`, { type: "image/jpeg" });
            const shareData = { title: 'Aurahub Elanı', text: 'Qoşulmaq üçün sayta daxil ol!', files: [file] };
            
            if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                navigator.share(shareData).catch(e => console.log('Paylaşım ləğv edildi və ya xəta:', e));
            } else {
                const link = document.createElement('a');
                link.download = `Aurahub_Elan_${id}.jpg`;
                link.href = imgData;
                link.click();
                showToast("Poster telefonunuza/kompyuterinizə yükləndi!");
            }
        });
    });
};

window.showContactInfo = function(authorName, phone) {
    const cleanPhone = phone ? phone.replace(/[^0-9]/g, '') : '';
    document.getElementById('info-modal-body').innerHTML = `<div style="text-align:center; padding: 20px;"><h3>${authorName}</h3><p style="color: var(--text-muted); margin: 10px 0;">Əlaqə nömrəsi: <br><strong style="color:var(--text-main); font-size:18px;">${phone || 'Yoxdur'}</strong></p><a href="https://wa.me/${cleanPhone}" target="_blank" class="action-btn" style="text-decoration:none; width:100%; margin-top:15px; display:inline-block;"><i class="fa-brands fa-whatsapp"></i> WhatsApp ilə Yaz</a><a href="tel:${phone}" class="login-btn action-btn" style="text-decoration:none; width:100%; margin-top:10px; display:inline-block;"><i class="fa-solid fa-phone"></i> Adi Zəng Et</a></div>`;
    openModal('infoModal');
};

window.toggleMap = function() {
    isMapVisible = !isMapVisible;
    document.getElementById('map').style.display = isMapVisible ? 'block' : 'none';
    document.getElementById('map-toggle-btn').innerHTML = isMapVisible ? '<i class="fa-solid fa-list"></i> Siyahını Göstər' : '<i class="fa-solid fa-map-location-dot"></i> Xəritəni Göstər';
    if(isMapVisible) { if(!map) initMap(); else map.invalidateSize(); updateMapMarkers(); }
};

function initMap() { map = L.map('map').setView([40.4093, 49.8671], 11); L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map); }

function updateMapMarkers(fAds) {
    if(!map) return; mapMarkers.forEach(m => map.removeLayer(m)); mapMarkers = [];
    (fAds || ads).filter(a => a.type === 'match' || a.type === 'opponent').forEach(ad => {
        let coords = stadiumCoords[ad.stadium] || [40.4093 + (Math.random() - 0.5) * 0.1, 49.8671 + (Math.random() - 0.5) * 0.1];
        const m = L.marker(coords).addTo(map).bindPopup(`<b>${ad.stadium}</b><br>Vaxt: ${new Date(ad.time).toLocaleString('az-AZ')}<br>${ad.type === 'opponent' ? 'Komanda: ' + ad.teamName : 'Axtarılır: ' + ad.neededPlayersCount}`);
        mapMarkers.push(m);
    });
}

window.loadMoreAds = function() { currentPage++; window.renderAds(true); };

window.renderAds = function(append = false) {
    const container = document.getElementById('ads-container');
    if(!append) container.innerHTML = '';

    let fAds = ads.filter(ad => {
        if(filters.type !== 'all' && ad.type !== filters.type) return false;
        if(filters.type === 'match' || filters.type === 'opponent' || filters.type === 'all') if(filters.stadium !== 'all' && (ad.type === 'match' || ad.type === 'opponent') && ad.stadium !== filters.stadium) return false;
        if(filters.type === 'player' || filters.type === 'all') { if(filters.position !== 'all' && ad.type === 'player' && ad.authorPos !== filters.position) return false; if(filters.skill !== 'all' && ad.type === 'player' && ad.authorSkill !== filters.skill) return false; }
        return true;
    });
    
    if(isMapVisible) updateMapMarkers(fAds); 
    
    const endIndex = currentPage * adsPerPage;
    if (fAds.length === 0) { 
        container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">Axtarışınıza uyğun elan tapılmadı.</div>`; 
        document.getElementById('load-more-btn').style.display = 'none'; 
        return; 
    }

    const pAds = fAds.slice(append ? (currentPage - 1) * adsPerPage : 0, endIndex);
    pAds.forEach(ad => {
        const div = document.createElement('div'); 
        div.className = ad.isPro ? 'ad-card pro-ad-card' : 'ad-card';
        
        const isMyAd = currentUser && currentUser.username === ad.author;
        const delBtn = isMyAd ? `<button class="delete-ad-btn" onclick="deleteAd('${ad.id}')"><i class="fa-solid fa-trash"></i></button>` : '';
        const proBadge = ad.isPro ? `<span style="color:#FFD700; font-size:12px; margin-left:5px;" title="Pro Oyunçu"><i class="fa-solid fa-circle-check"></i></span>` : '';

        if (ad.type === 'match') {
            const actionBtnHTML = isMyAd ? `<button class="action-btn contact-btn" style="flex: 1;" disabled>Sizin Elanınız</button>` : `<button class="action-btn contact-btn" style="flex: 1; background: var(--primary); color: #000;" onclick="requireAuth(() => applyToPlay('${ad.id}', '${ad.author}'))"><i class="fa-solid fa-hand-pointer"></i> Oyuna Qatıl</button>`;
            div.innerHTML = `
                <div class="ad-header"><span class="ad-badge badge-match"><i class="fa-solid fa-users"></i> Oyunçu Axtarılır</span><div style="display:flex; gap:10px; align-items:center;"><span style="color:var(--text-muted); font-size:12px;">${ad.dateAdded}</span>${delBtn}</div></div>
                <h3>${ad.stadium}</h3>
                <div class="ad-detail"><i class="fa-solid fa-user-tie"></i> Təşkilatçı: <strong class="clickable-name" onclick="viewPublicProfile('${ad.author}')" title="Kartına bax">${ad.author}</strong> ${proBadge}</div>
                <div class="ad-detail"><i class="fa-solid fa-clock"></i> Vaxt: <strong>${new Date(ad.time).toLocaleString('az-AZ')}</strong></div>
                <div class="ad-detail"><i class="fa-solid fa-shirt"></i> Axtarılır: <strong>${ad.neededPlayersCount || 1} nəfər</strong></div>
                <div class="card-actions">${actionBtnHTML}<button class="share-btn" onclick="shareAdAsImage('${ad.id}')" title="Poster Kimi Paylaş"><i class="fa-solid fa-camera"></i></button></div>
            `;
        } else if (ad.type === 'opponent') {
            const actionBtnHTML = isMyAd ? `<button class="action-btn contact-btn" style="flex: 1;" disabled>Sizin Elanınız</button>` : `<button class="action-btn contact-btn" style="flex: 1; background: var(--danger); color: #fff; border:none;" onclick="requireAuth(() => showContactInfo('${ad.author}', '${ad.phone}'))"><i class="fa-solid fa-handshake-angle"></i> Rəqib Ol</button>`;
            div.innerHTML = `
                <div class="ad-header"><span class="ad-badge badge-opponent"><i class="fa-solid fa-shield-halved"></i> Rəqib Axtarılır</span><div style="display:flex; gap:10px; align-items:center;"><span style="color:var(--text-muted); font-size:12px;">${ad.dateAdded}</span>${delBtn}</div></div>
                <h3>${ad.stadium}</h3>
                <div class="ad-detail"><i class="fa-solid fa-shield-halved"></i> Komanda: <strong class="clickable-name" style="color:var(--primary);" onclick="viewPublicProfile('${ad.author}')" title="Kapitanın kartına bax">${ad.teamName || ad.author}</strong> ${proBadge}</div>
                <div class="ad-detail"><i class="fa-solid fa-clock"></i> Vaxt: <strong>${new Date(ad.time).toLocaleString('az-AZ')}</strong></div>
                <div class="ad-detail"><i class="fa-solid fa-manat-sign"></i> Qiymət: <strong>${ad.price || '0'} AZN (Bölünəcək)</strong></div>
                <div class="card-actions">${actionBtnHTML}<button class="share-btn" onclick="shareAdAsImage('${ad.id}')" title="Poster Kimi Paylaş"><i class="fa-solid fa-camera"></i></button></div>
            `;
        } else {
            const actionBtnHTML = isMyAd ? `<button class="action-btn contact-btn" style="flex: 1;" disabled>Sizin Elanınız</button>` : `<button class="action-btn contact-btn" style="flex: 1;" onclick="requireAuth(() => showContactInfo('${ad.author}', '${ad.phone}'))">Komandaya Dəvət Et</button>`;
            div.innerHTML = `
                <div class="ad-header"><span class="ad-badge badge-player"><i class="fa-solid fa-person-running"></i> Oyun Axtarır</span><div style="display:flex; gap:10px; align-items:center;"><span style="color:var(--text-muted); font-size:12px;">${ad.dateAdded}</span>${delBtn}</div></div>
                <h3 class="clickable-name" onclick="viewPublicProfile('${ad.author}')" title="Kartına bax" style="display:inline-block;">${ad.author} ${proBadge}</h3>
                <div class="ad-detail"><i class="fa-solid fa-shoe-prints"></i> Mövqe: <strong>${ad.authorPos}</strong></div>
                <div class="ad-detail"><i class="fa-solid fa-star"></i> Səviyyə: <strong>${ad.authorSkill || 'Orta'}</strong></div>
                <div class="ad-detail"><i class="fa-solid fa-comment-dots"></i> Qeyd: <strong>${ad.note}</strong></div>
                <div class="card-actions">${actionBtnHTML}<button class="share-btn" onclick="shareAdAsImage('${ad.id}')" title="Poster Kimi Paylaş"><i class="fa-solid fa-camera"></i></button></div>
            `;
        }
        container.appendChild(div);
    });

    document.getElementById('load-more-btn').style.display = fAds.length > endIndex ? 'inline-block' : 'none';
};

window.showHome = function() { hideAllSections(); document.getElementById('home-section').style.display = 'block'; document.getElementById('nav-home').classList.add('active'); };
window.showChampionship = function() { hideAllSections(); document.getElementById('championship-section').style.display = 'block'; document.getElementById('nav-champ').classList.add('active'); };
window.showTransferMarket = function() { hideAllSections(); document.getElementById('transfer-section').style.display = 'block'; document.getElementById('nav-transfer').classList.add('active'); window.renderTransferMarket(); };

window.showMyTeam = async function() { 
    if(!currentUser) { showToast("Bunun üçün əvvəlcə daxil olmalısınız!", "error"); return openModal('loginModal'); }
    hideAllSections(); document.getElementById('team-section').style.display = 'block'; document.getElementById('nav-team').classList.add('active');
    
    if(!currentUser.roster || currentUser.roster.length === 0) {
        currentUser.roster = [currentUser.username];
        await syncUserToDB();
    }
    document.getElementById('team-page-name').innerText = currentUser.teamName || 'Mənim Komandam';
    window.populateAddPlayerSelect();
    window.renderPitch();
};

function hideAllSections() {
    ['home-section', 'championship-section', 'transfer-section', 'team-section'].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.style.display = 'none';
    });
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
}

window.renderTransferMarket = function() {
    const container = document.getElementById('transfer-grid');
    if(!container) return;
    container.innerHTML = '';
    const posFilter = document.getElementById('transfer-pos-filter') ? document.getElementById('transfer-pos-filter').value : 'all';
    
    let users = [...allUsers];
    if(posFilter !== 'all') {
        users = users.filter(u => u.position === posFilter);
    }
    
    if(users.length === 0) {
        container.innerHTML = `<div style="grid-column:1/-1; text-align:center; color:var(--text-muted); padding:40px;">Uyğun oyunçu tapılmadı.</div>`;
        return;
    }

    users.forEach(u => {
        const proBadge = u.isPro ? `<div style="position:absolute; top:10px; right:10px; color:#FFD700; font-size:16px;" title="Pro Oyunçu"><i class="fa-solid fa-circle-check"></i></div>` : '';
        container.innerHTML += `
            <div class="scout-card" onclick="viewPublicProfile('${u.username}')">
                ${proBadge}
                <img class="scout-avatar" src="${u.avatar || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'}" alt="Avatar">
                <div class="scout-pos">${u.position || 'Fərq etməz'}</div>
                <h3 style="font-size:16px; margin-bottom:5px;">${u.username}</h3>
                <div style="font-size:12px; color:var(--text-muted);"><i class="fa-solid fa-futbol"></i> ${u.stats?.attended || 0} oyun · <i class="fa-solid fa-star"></i> ${u.skill || 'Orta'}</div>
            </div>
        `;
    });
};

const formationsCoords = {
    "2-2-1": [ { bottom: '8%', left: '50%' }, { bottom: '30%', left: '30%' }, { bottom: '30%', left: '70%' }, { bottom: '60%', left: '30%' }, { bottom: '60%', left: '70%' }, { bottom: '85%', left: '50%' } ],
    "2-1-2": [ { bottom: '8%', left: '50%' }, { bottom: '30%', left: '30%' }, { bottom: '30%', left: '70%' }, { bottom: '55%', left: '50%' }, { bottom: '80%', left: '30%' }, { bottom: '80%', left: '70%' } ],
    "3-1-1": [ { bottom: '8%', left: '50%' }, { bottom: '30%', left: '20%' }, { bottom: '25%', left: '50%' }, { bottom: '30%', left: '80%' }, { bottom: '55%', left: '50%' }, { bottom: '85%', left: '50%' } ],
    "1-3-1": [ { bottom: '8%', left: '50%' }, { bottom: '25%', left: '50%' }, { bottom: '55%', left: '20%' }, { bottom: '50%', left: '50%' }, { bottom: '55%', left: '80%' }, { bottom: '85%', left: '50%' } ]
};

window.renderPitch = function() {
    const formationSelect = document.getElementById('formation-select');
    if(!formationSelect) return;
    const formation = formationSelect.value;
    const coords = formationsCoords[formation];
    const pitchContainer = document.getElementById('pitch-players-container');
    const rosterList = document.getElementById('roster-list');
    
    pitchContainer.innerHTML = '';
    rosterList.innerHTML = '';

    const preferredSlots = {
        "Qapıçı": [0, 1, 2, 3, 4, 5],
        "Müdafiəçi": [1, 2, 3, 4, 0, 5],
        "Yarımmüdafiəçi": [3, 4, 1, 2, 5, 0],
        "Hücumçu": [5, 4, 3, 2, 1, 0] 
    };

    let placedPlayers = new Array(6).fill(null);
    let teamMembersToPlace = (currentUser.roster || []).map(username => allUsers.find(u => u.username === username) || { username: username, avatar: "https://cdn-icons-png.flaticon.com/512/847/847969.png", position: "Hücumçu" });

    teamMembersToPlace.forEach(player => {
        let prefs = preferredSlots[player.position] || preferredSlots["Hücumçu"];
        for(let slot of prefs) {
            if(placedPlayers[slot] === null) {
                placedPlayers[slot] = player;
                break;
            }
        }
    });

    for(let i = 0; i < 6; i++) {
        const player = placedPlayers[i];
        const coord = coords[i];

        if (player) {
            pitchContainer.innerHTML += `
                <div class="pitch-slot" style="bottom: ${coord.bottom}; left: ${coord.left};">
                    <img src="${player.avatar}" class="pitch-player-avatar">
                    <div class="pitch-player-name">${player.username}</div>
                </div>
            `;
        } else {
            pitchContainer.innerHTML += `
                <div class="pitch-slot" style="bottom: ${coord.bottom}; left: ${coord.left};">
                    <div class="pitch-player-avatar"><i class="fa-solid fa-plus"></i></div>
                    <div class="pitch-player-name" style="color:var(--text-muted);">Boş Yer</div>
                </div>
            `;
        }
    }

    teamMembersToPlace.forEach(player => {
        const removeBtn = player.username !== currentUser.username ? `<button style="background:transparent; border:none; color:var(--danger); cursor:pointer;" onclick="removePlayerFromRoster('${player.username}')"><i class="fa-solid fa-user-minus"></i></button>` : `<span style="font-size:10px; color:var(--primary);">KAPİTAN</span>`;
        rosterList.innerHTML += `
            <div class="roster-item">
                <div style="display:flex; align-items:center; gap:10px;">
                    <img src="${player.avatar}" style="width:30px; height:30px; border-radius:50%;">
                    <div><strong style="font-size:13px;">${player.username}</strong><br><span style="font-size:10px; color:var(--text-muted);">${player.position}</span></div>
                </div>
                ${removeBtn}
            </div>
        `;
    });
};

window.renderPlayerSearchResults = function(searchQuery = '') {
    const container = document.getElementById('player-search-results');
    if(!container) return;
    container.innerHTML = '';
    
    const q = searchQuery.toLowerCase().trim();
    if (q === '') {
        container.innerHTML = '<div style="color:var(--text-muted); font-size:12px; text-align:center; padding:10px;">Axtarış üçün ad yazın...</div>';
        return;
    }

    let count = 0;
    allUsers.forEach(u => {
        if(!currentUser.roster.includes(u.username) && u.username !== currentUser.username) {
            if (u.username.toLowerCase().includes(q)) {
                container.innerHTML += `
                    <div class="search-result-item">
                        <div style="display:flex; align-items:center; gap:8px;">
                            <img src="${u.avatar || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'}" style="width:30px; height:30px; border-radius:50%; object-fit:cover;">
                            <div>
                                <strong style="font-size:13px;">${u.username}</strong>
                                <div style="font-size:11px; color:var(--text-muted);">${u.position}</div>
                            </div>
                        </div>
                        <button class="invite-btn-small" onclick="sendTeamInvite('${u.username}')"><i class="fa-solid fa-plus"></i> Dəvət Et</button>
                    </div>
                `;
                count++;
            }
        }
    });
    
    if(count === 0) {
        container.innerHTML = '<div style="color:var(--text-muted); font-size:12px; text-align:center; padding:10px;">Oyunçu tapılmadı.</div>';
    }
};

window.filterTeamSearch = function() {
    const q = document.getElementById('team-player-search').value;
    window.renderPlayerSearchResults(q);
};

window.sendTeamInvite = function(username) {
    if(currentUser.roster.length >= 6) return showToast("Komanda artıq tam doludur (6 nəfər)!", "error");
    
    showToast(`${username} adlı oyunçuya dəvət göndərildi!`, "success");
    
    setTimeout(async () => {
        if(!currentUser.roster.includes(username) && currentUser.roster.length < 6) {
            currentUser.roster.push(username);
            await syncUserToDB(); 
            window.renderPitch(); 
            window.filterTeamSearch(); 
            showToast(`${username} dəvəti qəbul etdi və kadroya qatıldı!`, "success");
        }
    }, 1500);
};

window.removePlayerFromRoster = async function(username) {
    currentUser.roster = currentUser.roster.filter(name => name !== username);
    await syncUserToDB();
    window.renderPitch();
    window.filterTeamSearch(); 
    showToast("Oyunçu çıxarıldı.", "error");
};

window.populateAddPlayerSelect = function() {}; 

window.applyToChampionshipWithScreenshot = function() {
    if(currentUser.roster.length < 6) {
        if(!confirm("Kadrda boş yerlər var. Yenə də belə müraciət etmək istəyirsiniz?")) return;
    }

    showToast("Taktika şəkli hazırlanır... Zəhmət olmasa gözləyin.", "success");
    
    const pitchArea = document.getElementById('pitch-capture-area');
    
    html2canvas(pitchArea, { backgroundColor: '#141414', scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg', 0.9);
        
        const link = document.createElement('a');
        link.download = `Aurahub_Kadro_${currentUser.teamName || currentUser.username}.jpg`;
        link.href = imgData;
        link.click();
        
        setTimeout(() => {
            const teamName = currentUser.teamName ? `"${currentUser.teamName}" komandası` : "komandam";
            const formation = document.getElementById('formation-select').value;
            const text = `Salam Onur! Mən ${currentUser.username}. Aurahub Çempionatına ${teamName} ilə qatılmaq istəyirəm. (Taktika dizilişimiz: ${formation}).\n\n📌 *Diziliş şəklimiz cihaza yükləndi, indi bura göndərəcəm!*`;
            
            window.open(`https://wa.me/994513450705?text=${encodeURIComponent(text)}`, '_blank');
        }, 1500);
    });
};

window.openAdminPanel = function() {
    closeModal('publicCardModal'); 
    closeModal('profileModal');
    openModal('adminModal');
    window.loadAdminAds();
};

window.loadAdminAds = function() {
    document.getElementById('admin-tab-ads').classList.add('active');
    document.getElementById('admin-tab-users').classList.remove('active');
    const container = document.getElementById('admin-content-area');
    container.innerHTML = '';

    if (ads.length === 0) return container.innerHTML = '<p style="text-align:center; color:var(--text-muted);">Heç bir elan yoxdur.</p>';

    ads.forEach(ad => {
        container.innerHTML += `
            <div class="mini-ad-box" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <div>
                    <strong style="color:var(--primary);">${ad.author}</strong> - ${ad.type}
                    <div style="font-size:11px; color:var(--text-muted);">${ad.stadium || 'Məkan yoxdur'}</div>
                </div>
                <button onclick="deleteAdAsAdmin('${ad.id}')" style="background:var(--danger); color:#fff; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">
                    <i class="fa-solid fa-trash"></i> Sil
                </button>
            </div>
        `;
    });
};

window.loadAdminUsers = function() {
    document.getElementById('admin-tab-users').classList.add('active');
    document.getElementById('admin-tab-ads').classList.remove('active');
    const container = document.getElementById('admin-content-area');
    container.innerHTML = '';

    allUsers.forEach(u => {
        container.innerHTML += `
            <div class="mini-ad-box" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <div style="display:flex; align-items:center; gap:10px;">
                    <img src="${u.avatar}" style="width:30px; height:30px; border-radius:50%;">
                    <div><strong>${u.username}</strong><br><span style="font-size:10px; color:var(--text-muted);">${u.position}</span></div>
                </div>
                ${u.username.toLowerCase() !== 'onur' ? 
                `<button onclick="deleteUserAsAdmin('${u.username}')" style="background:var(--danger); color:#fff; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">Ban</button>` 
                : '<span style="font-size:10px; color:var(--primary);">Qurucu</span>'}
            </div>
        `;
    });
};

window.deleteAdAsAdmin = async function(adId) {
    if (confirm("Bu elanı silmək istədiyinizə əminsiniz?")) {
        await deleteDoc(doc(db, "ads", adId.toString()));
        ads = ads.filter(a => a.id !== adId);
        showToast("Elan bazadan silindi!", "success");
        window.loadAdminAds();
        window.renderAds(); 
    }
};

window.deleteUserAsAdmin = async function(username) {
    if (confirm(`DİQQƏT: ${username} adlı istifadəçini həmişəlik silmək istəyirsiniz?`)) {
        await deleteDoc(doc(db, "users", username));
        allUsers = allUsers.filter(u => u.username !== username);
        showToast("İstifadəçi bloklandı və silindi!", "success");
        window.loadAdminUsers();
    }
};
// --- TUTORIAL (BƏLƏDÇİ) MƏNTİQİ ---
let tutorialStep = 0;
let currentHighlightedEl = null;

const tutorialSteps = [
    { targetId: 'nav-home', text: 'TİP 1: Bura sənin ana səhifəndir. Elanları və oyunçuları burdan tapa bilərsən.' },
    { targetId: 'nav-champ', text: 'TİP 2: Çempionatlar! Bu ay aktiv turnir olub-olmadığını burdan yoxlaya bilərsən.' },
    { targetId: null, text: 'TİP 3: Mükəmməlsən! İndi sağ yuxarıdan profilinə gir və özünə "cool" bir profil şəkli yüklə. Uğurlar! 🚀' }
];

window.startTutorial = function() {
    tutorialStep = 0;
    document.getElementById('tutorial-overlay').style.display = 'block';
    renderTutorialStep();
};

window.nextTutorialStep = function() {
    tutorialStep++;
    if (tutorialStep >= tutorialSteps.length) {
        skipTutorial();
    } else {
        renderTutorialStep();
    }
};

window.skipTutorial = function() {
    document.getElementById('tutorial-overlay').style.display = 'none';
    if(currentHighlightedEl) currentHighlightedEl.classList.remove('tutorial-highlight');
    tutorialStep = 0;
};

function renderTutorialStep() {
    if(currentHighlightedEl) currentHighlightedEl.classList.remove('tutorial-highlight');
    
    const step = tutorialSteps[tutorialStep];
    document.getElementById('tutorial-step-badge').innerText = `TİP ${tutorialStep + 1} / ${tutorialSteps.length}`;
    document.getElementById('tutorial-text').innerText = step.text;
    
    const tooltip = document.getElementById('tutorial-tooltip');

    if (step.targetId) {
        const el = document.getElementById(step.targetId);
        if(el) {
            el.classList.add('tutorial-highlight');
            currentHighlightedEl = el;
            
            // Elementin koordinatlarını tapıb tooltipi yanına qoyuruq
            const rect = el.getBoundingClientRect();
            tooltip.style.top = (rect.top - 120) + 'px'; 
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            
            // Əgər element yuxarıdadırsa, tooltipi onun altına salırıq
            if (rect.top < 150) {
                tooltip.style.top = (rect.bottom + 20) + 'px';
            }
        }
    } else {
        // Son addımda (targetId: null) tooltipi ekranın tam ortasına qoyuruq
        tooltip.style.top = '50%';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translate(-50%, -50%)';
    }
}