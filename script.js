// ===== НАВИГАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burgerMenu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (burger && navMenu) {
        burger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (burger) burger.classList.remove('active');
        });
    });
});

// ===== МОДАЛЬНОЕ ОКНО ПОМОЩИ =====
document.addEventListener('DOMContentLoaded', function() {
    const helpBtn = document.getElementById('helpBtn');
    const helpModal = document.getElementById('helpModal');
    const helpClose = document.getElementById('helpClose');
    
    if (!helpBtn || !helpModal) return;
    
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    helpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(helpModal);
    });
    
    if (helpClose) {
        helpClose.addEventListener('click', () => closeModal(helpModal));
    }
    
    helpModal.addEventListener('click', (e) => {
        if (e.target === helpModal) closeModal(helpModal);
    });
});

// ===== УПРАВЛЕНИЕ IP-АДРЕСОМ =====
document.addEventListener('DOMContentLoaded', function() {
    const ipHidden = document.getElementById('ip-hidden');
    const ipVisible = document.getElementById('ip-visible');
    const copyBtn = document.getElementById('copyBtn');
    
    if (!ipHidden || !ipVisible) return;
    
    let isIPRevealed = false;
    let timeoutId = null;
    
    function copyIP() {
        if (!isIPRevealed) revealIP();
        
        navigator.clipboard.writeText('play.surgoodcraft.ru').then(() => {
            if (copyBtn) {
                copyBtn.textContent = '✅ Скопировано!';
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    if (isIPRevealed && copyBtn) {
                        copyBtn.textContent = '📋 Копировать';
                        copyBtn.classList.remove('copied');
                    }
                }, 2000);
            }
        }).catch(() => alert('Не удалось скопировать IP. Попробуйте вручную.'));
    }
    
    function revealIP() {
        if (timeoutId) clearTimeout(timeoutId);
        ipHidden.style.display = 'none';
        ipVisible.style.display = 'inline-block';
        isIPRevealed = true;
        timeoutId = setTimeout(hideIP, 5000);
    }
    
    function hideIP() {
        ipHidden.style.display = 'inline-block';
        ipVisible.style.display = 'none';
        isIPRevealed = false;
        if (copyBtn) {
            copyBtn.textContent = '📋 Копировать';
            copyBtn.classList.remove('copied');
        }
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    }
    
    ipHidden.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isIPRevealed) revealIP();
    });
    
    if (copyBtn) {
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            copyIP();
        });
    }
    
    document.addEventListener('click', (e) => {
        const detailItem = document.querySelector('.detail-item');
        if (detailItem && !detailItem.contains(e.target) && isIPRevealed) {
            hideIP();
        }
    });
});
// ===== ЭФФЕКТ ПРИ ЗАГРУЗКЕ =====
window.addEventListener('load', function() {
    const block = document.querySelector('.center-block');
    if (block) {
        block.style.animation = 'none';
        block.offsetHeight;
        block.style.animation = 'fadeInUp 0.8s ease';
    }
});

// ===== ПОИСК ПО МОДАМ =====
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('modSearch');
    const cards = document.querySelectorAll('.mod-card');
    const modCount = document.getElementById('modCount');
    
    if (!searchInput) return;
    
    function updateModCount() {
        const visible = document.querySelectorAll('.mod-card:not(.hidden)').length;
        if (modCount) modCount.textContent = visible;
    }
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        cards.forEach(card => {
            const name = (card.dataset.name || '').toLowerCase();
            const desc = (card.dataset.desc || '').toLowerCase();
            card.classList.toggle('hidden', !(name.includes(query) || desc.includes(query)));
        });
        updateModCount();
    });
    
    updateModCount();
});