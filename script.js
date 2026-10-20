// ========================================================
// COUNTER-STRIKE 2 ADVANCED PORTFOLIO SCRIPT ENGINE v2.5
// Complete with Web Audio API, Smoke Canvas, Achievements,
// Buy Menu, Projects Filtering, Scoreboard [TAB] & Killfeed
// ========================================================

// --------------------------------------------------------
// 1. PROCEDURAL WEB AUDIO SYNTHESIZER (ZERO EXTERNAL FILES)
// --------------------------------------------------------
class CS2AudioSystem {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.volume = 0.35;
        this.init();
    }

    init() {
        const unlock = () => {
            if (!this.ctx) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (AudioContext) this.ctx = new AudioContext();
            } else if (this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        };

        window.addEventListener('click', unlock, { passive: true });
        window.addEventListener('keydown', unlock, { passive: true });

        const savedMute = localStorage.getItem('cs2_sound_muted');
        if (savedMute !== null) {
            this.enabled = savedMute !== 'true';
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('cs2_sound_muted', (!this.enabled).toString());
        if (this.enabled) this.playClick();
        return this.enabled;
    }

    playHover() {
        if (!this.ctx || !this.enabled) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(1600, now + 0.035);

        gain.gain.setValueAtTime(this.volume * 0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.035);
    }

    playClick() {
        if (!this.ctx || !this.enabled) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(750, now);
        osc.frequency.exponentialRampToValueAtTime(380, now + 0.07);

        gain.gain.setValueAtTime(this.volume * 0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.07);
    }

    playBuy() {
        if (!this.ctx || !this.enabled) return;
        const now = this.ctx.currentTime;
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'square';
        osc1.frequency.setValueAtTime(540, now);
        osc1.frequency.exponentialRampToValueAtTime(960, now + 0.06);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1080, now + 0.03);
        osc2.frequency.exponentialRampToValueAtTime(1600, now + 0.12);

        gain.gain.setValueAtTime(this.volume * 0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(now);
        osc1.stop(now + 0.06);
        osc2.start(now + 0.03);
        osc2.stop(now + 0.13);
    }

    playHeadshot() {
        if (!this.ctx || !this.enabled) return;
        const now = this.ctx.currentTime;

        const ding = this.ctx.createOscillator();
        const dingGain = this.ctx.createGain();
        ding.type = 'sine';
        ding.frequency.setValueAtTime(3400, now);
        ding.frequency.exponentialRampToValueAtTime(2600, now + 0.18);
        dingGain.gain.setValueAtTime(this.volume * 0.5, now);
        dingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        ding.connect(dingGain);
        dingGain.connect(this.ctx.destination);
        ding.start(now);
        ding.stop(now + 0.22);

        const thud = this.ctx.createOscillator();
        const thudGain = this.ctx.createGain();
        thud.type = 'triangle';
        thud.frequency.setValueAtTime(240, now);
        thud.frequency.exponentialRampToValueAtTime(60, now + 0.1);
        thudGain.gain.setValueAtTime(this.volume * 0.6, now);
        thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        thud.connect(thudGain);
        thudGain.connect(this.ctx.destination);
        thud.start(now);
        thud.stop(now + 0.1);
    }

    playBombBeep() {
        if (!this.ctx || !this.enabled) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1050, now);
        gain.gain.setValueAtTime(this.volume * 0.45, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
    }

    playScoreboard() {
        if (!this.ctx || !this.enabled) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(620, now + 0.1);
        gain.gain.setValueAtTime(this.volume * 0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
    }

    playGoldFanfare() {
        if (!this.ctx || !this.enabled) return;
        const now = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const start = now + (idx * 0.07);

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(this.volume * 0.35, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(start);
            osc.stop(start + 0.6);
        });
    }

    playCaseTick() {
        if (!this.ctx || !this.enabled) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1500, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.02);
        gain.gain.setValueAtTime(this.volume * 0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.02);
    }
}

const cs2Audio = new CS2AudioSystem();
window.cs2Audio = cs2Audio;

// --------------------------------------------------------
// 2. VOLUMETRIC SMOKE & TACTICAL PARTICLES CANVAS
// --------------------------------------------------------
class CS2SmokeCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.puffs = [];
        this.sparks = [];
        this.mouse = { x: -1000, y: -1000, active: false };

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.mouse.active = true;
        });

        window.addEventListener('mouseleave', () => {
            this.mouse.active = false;
        });

        for (let i = 0; i < 16; i++) {
            this.puffs.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                r: 120 + Math.random() * 240,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.2,
                alpha: 0.02 + Math.random() * 0.04,
                hue: Math.random() > 0.55 ? 210 : 35,
                phase: Math.random() * Math.PI * 2
            });
        }

        for (let i = 0; i < 35; i++) {
            this.sparks.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                size: 1 + Math.random() * 2,
                vx: (Math.random() - 0.5) * 0.3,
                vy: -0.2 - Math.random() * 0.3,
                alpha: 0.15 + Math.random() * 0.35
            });
        }

        this.animate();
    }

    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Volumetric smoke puffs
        this.puffs.forEach(p => {
            p.phase += 0.007;
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < -p.r) p.x = this.width + p.r;
            if (p.x > this.width + p.r) p.x = -p.r;
            if (p.y < -p.r) p.y = this.height + p.r;
            if (p.y > this.height + p.r) p.y = -p.r;

            // Mouse displacement
            if (this.mouse.active) {
                const dx = p.x - this.mouse.x;
                const dy = p.y - this.mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 180) {
                    const force = (180 - dist) / 180;
                    p.x += (dx / dist) * force * 2.5;
                    p.y += (dy / dist) * force * 2.5;
                }
            }

            const currentR = p.r + Math.sin(p.phase) * 20;
            const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentR);
            grad.addColorStop(0, `hsla(${p.hue}, 25%, 25%, ${p.alpha * 1.5})`);
            grad.addColorStop(0.6, `hsla(${p.hue}, 20%, 15%, ${p.alpha})`);
            grad.addColorStop(1, 'rgba(11, 15, 21, 0)');

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, currentR, 0, Math.PI * 2);
            this.ctx.fillStyle = grad;
            this.ctx.fill();
        });

        // Sparks
        this.sparks.forEach(s => {
            s.x += s.vx;
            s.y += s.vy;
            if (s.y < 0) {
                s.y = this.height;
                s.x = Math.random() * this.width;
            }
            if (s.x < 0) s.x = this.width;
            if (s.x > this.width) s.x = 0;

            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 123, 0, ${s.alpha})`;
            this.ctx.shadowColor = '#ff7b00';
            this.ctx.shadowBlur = 4;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// --------------------------------------------------------
// 3. LIVE CS2 KILLFEED NOTIFICATION ENGINE
// --------------------------------------------------------
window.addCS2Killfeed = function(action, text, type = 'normal') {
    const container = document.getElementById('cs2-killfeed');
    if (!container) return;

    const item = document.createElement('div');
    item.className = 'killfeed-item';
    
    let actionColor = '#ff7b00';
    if (type === 'gold') actionColor = '#ffd700';
    if (type === 'green') actionColor = '#4ade80';

    item.innerHTML = `
        <span style="color: ${actionColor}; font-weight: bold;">⚡ ${action}</span>
        <span style="color: #64748b;">»</span>
        <span style="color: #ffffff;">${text}</span>
    `;

    container.appendChild(item);

    setTimeout(() => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(30px)';
        item.style.transition = 'all 0.4s ease';
        setTimeout(() => item.remove(), 400);
    }, 4500);
};

// --------------------------------------------------------
// 4. ACHIEVEMENTS & MATCH PHOTO UPLOAD SYSTEM
// --------------------------------------------------------
const DEFAULT_ACHIEVEMENTS = [
    {
        id: 'ach-1',
        title: 'Dust II Premier Domination - 64 Kills Solo Carry',
        map: 'Dust II',
        mode: 'Premier Rank Match',
        result: 'VICTORY',
        score: '13 - 1',
        kills: 64,
        deaths: 2,
        assists: 0,
        hsRate: 92,
        damage: 6055,
        rating: '23,825',
        ratingColor: '#d32ce6',
        award: 'The Most Valuable MVP',
        date: '2026-10-14',
        image: 'assets/dust2_64k_win.jpg',
        description: 'Dominasi mutlak di Dust II! Memimpin Counter-Terrorists memenangkan match 13-1 dengan 92% Headshot dan total 6055 Damage luar biasa.',
        tags: ['Premier', 'Solo Carry', '60+ Kills', 'MVP']
    },
    {
        id: 'ach-2',
        title: 'Anubis Premier Tactical Halftime 5-4 Lead',
        map: 'Anubis',
        mode: 'Premier Match',
        result: 'MATCH LEAD',
        score: '5 - 4',
        kills: 15,
        deaths: 7,
        assists: 1,
        hsRate: 66,
        damage: 1238,
        rating: '13,595',
        ratingColor: '#8847ff',
        award: 'Tactical Playmaker',
        date: '2026-10-10',
        image: 'assets/anubis_scoreboard.png',
        description: 'Pertandingan taktis di map Anubis. Eksekusi B-site dan kontrol A-main dengan retake disiplin dan komunikasi tim yang solid.',
        tags: ['Premier', 'Tactical', 'Headshot']
    },
    {
        id: 'ach-3',
        title: 'SAS Force Buy Strategy & Mid-Tier Mastery',
        map: 'Ancient',
        mode: 'Competitive Loadout',
        result: 'TACTICAL WIN',
        score: '13 - 8',
        kills: 24,
        deaths: 11,
        assists: 6,
        hsRate: 58,
        damage: 2840,
        rating: 'Master Guardian',
        ratingColor: '#ffd700',
        award: 'The Spender & Strategist',
        date: '2026-09-28',
        image: 'assets/cs2_buy_menu.png',
        description: 'Eksekusi setup buy menu CS2 dengan FAMAS and Kevlar Helmet untuk memaksimalkan force-buy di ronde penting saat ekonomi tim rendah.',
        tags: ['Buy Menu', 'Loadout', 'Strategy']
    }
];

class AchievementSystem {
    constructor() {
        this.storageKey = 'cs2_portfolio_achievements_v3';
        this.achievements = [];
        this.activeFilter = 'all';
        this.currentUploadedBase64 = null;
        this.init();
    }

    init() {
        this.load();
        this.setupForm();
        this.render();
    }

    load() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                this.achievements = JSON.parse(saved);
            } else {
                this.achievements = [...DEFAULT_ACHIEVEMENTS];
                this.save();
            }
        } catch (e) {
            this.achievements = [...DEFAULT_ACHIEVEMENTS];
        }
    }

    save() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.achievements));
        } catch (e) {
            alert('Storage penuh! Silakan gunakan gambar yang lebih kecil.');
        }
    }

    reset() {
        if (confirm('Kembalikan hasil pencapaian ke contoh default template?')) {
            this.achievements = [...DEFAULT_ACHIEVEMENTS];
            this.save();
            this.render();
            cs2Audio.playClick();
        }
    }

    setupForm() {
        const dropzone = document.getElementById('ach-dropzone');
        const fileInput = document.getElementById('ach-file');
        const form = document.getElementById('ach-form');

        if (dropzone && fileInput) {
            dropzone.addEventListener('click', () => fileInput.click());

            dropzone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropzone.classList.add('dragover');
            });

            dropzone.addEventListener('dragleave', () => {
                dropzone.classList.remove('dragover');
            });

            dropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropzone.classList.remove('dragover');
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    this.handleFile(e.dataTransfer.files[0]);
                }
            });

            fileInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files[0]) {
                    this.handleFile(e.target.files[0]);
                }
            });
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitForm();
            });
        }
    }

    handleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('File harus berupa gambar (JPG, PNG, WebP)!');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const originalDataUrl = event.target.result;
            // Compress image to avoid localstorage quota overflow
            const img = new Image();
            img.onload = () => {
                const maxW = 1200;
                let w = img.width;
                let h = img.height;
                if (w > maxW) {
                    h = Math.round((h * maxW) / w);
                    w = maxW;
                }
                const canvas = document.createElement('canvas');
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, w, h);
                const compressed = canvas.toDataURL('image/jpeg', 0.8);
                this.currentUploadedBase64 = compressed;

                const preview = document.getElementById('ach-preview-img');
                const previewWrap = document.getElementById('ach-preview-box');
                const promptBox = document.getElementById('ach-prompt-box');

                if (preview && previewWrap) {
                    preview.src = compressed;
                    previewWrap.style.display = 'block';
                    if (promptBox) promptBox.style.display = 'none';
                }
                cs2Audio.playBuy();
            };
            img.src = originalDataUrl;
        };
        reader.readAsDataURL(file);
    }

    submitForm() {
        const title = document.getElementById('ach-inp-title').value.trim();
        const map = document.getElementById('ach-inp-map').value;
        const mode = document.getElementById('ach-inp-mode').value.trim() || 'Premier Match';
        const result = document.getElementById('ach-inp-result').value;
        const score = document.getElementById('ach-inp-score').value.trim() || '13 - 4';
        const kills = parseInt(document.getElementById('ach-inp-kills').value) || 0;
        const deaths = parseInt(document.getElementById('ach-inp-deaths').value) || 0;
        const assists = parseInt(document.getElementById('ach-inp-assists').value) || 0;
        const hsRate = parseInt(document.getElementById('ach-inp-hs').value) || 50;
        const damage = parseInt(document.getElementById('ach-inp-damage').value) || 1200;
        const rating = document.getElementById('ach-inp-rating').value.trim() || '20,000';
        const award = document.getElementById('ach-inp-award').value.trim() || 'The Most Valuable MVP';
        const date = document.getElementById('ach-inp-date').value || new Date().toISOString().split('T')[0];
        const desc = document.getElementById('ach-inp-desc').value.trim() || 'Pertandingan CS2 yang intens dengan aksi clutch dan taktik tim solid.';

        let imageSrc = this.currentUploadedBase64 || document.getElementById('ach-inp-url').value.trim() || 'assets/dust2_64k_win.jpg';

        const newItem = {
            id: 'ach-' + Date.now(),
            title,
            map,
            mode,
            result,
            score,
            kills,
            deaths,
            assists,
            hsRate,
            damage,
            rating,
            ratingColor: parseInt(rating.replace(/[^0-9]/g, '')) >= 20000 ? '#ffd700' : '#d32ce6',
            award,
            date,
            image: imageSrc,
            description: desc,
            tags: [map, result, 'CS2 Match']
        };

        this.achievements.unshift(newItem);
        this.save();
        this.render();

        cs2Audio.playBuy();
        setTimeout(() => cs2Audio.playHeadshot(), 150);

        window.addCS2Killfeed('PENCAPAIAN MATCH BARU', `[${map}] ${title}`, 'gold');

        this.closeModal();
        document.getElementById('ach-form').reset();
        this.currentUploadedBase64 = null;
        document.getElementById('ach-preview-box').style.display = 'none';
        document.getElementById('ach-prompt-box').style.display = 'block';
    }

    openModal() {
        const modal = document.getElementById('ach-upload-modal');
        if (modal) {
            modal.classList.add('active');
            cs2Audio.playClick();
        }
    }

    closeModal() {
        const modal = document.getElementById('ach-upload-modal');
        if (modal) {
            modal.classList.remove('active');
            cs2Audio.playClick();
        }
    }

    inspect(id) {
        const item = this.achievements.find(a => a.id === id);
        if (!item) return;

        const modal = document.getElementById('ach-inspect-modal');
        if (!modal) return;

        document.getElementById('ach-insp-img').src = item.image;
        document.getElementById('ach-insp-title').textContent = item.title;
        document.getElementById('ach-insp-map').textContent = item.map;
        document.getElementById('ach-insp-mode').textContent = item.mode;
        document.getElementById('ach-insp-score').textContent = item.score;
        document.getElementById('ach-insp-result').textContent = item.result;
        document.getElementById('ach-insp-award').textContent = item.award;
        document.getElementById('ach-insp-date').textContent = item.date;
        document.getElementById('ach-insp-desc').textContent = item.description;

        document.getElementById('ach-insp-k').textContent = item.kills;
        document.getElementById('ach-insp-d').textContent = item.deaths;
        document.getElementById('ach-insp-a').textContent = item.assists;
        document.getElementById('ach-insp-hs').textContent = item.hsRate + '%';
        document.getElementById('ach-insp-dmg').textContent = item.damage;
        document.getElementById('ach-insp-rating').textContent = item.rating;

        modal.classList.add('active');
        cs2Audio.playScoreboard();
    }

    closeInspect() {
        const modal = document.getElementById('ach-inspect-modal');
        if (modal) {
            modal.classList.remove('active');
            cs2Audio.playClick();
        }
    }

    delete(id, e) {
        if (e) e.stopPropagation();
        if (confirm('Hapus foto pencapaian pertandingan ini?')) {
            this.achievements = this.achievements.filter(a => a.id !== id);
            this.save();
            this.render();
            cs2Audio.playClick();
        }
    }

    filter(criteria) {
        this.activeFilter = criteria;
        document.querySelectorAll('.ach-btn-filter').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === criteria);
        });
        this.render();
        cs2Audio.playHover();
    }

    render() {
        const grid = document.getElementById('achievements-grid');
        if (!grid) return;

        let filtered = this.achievements;
        if (this.activeFilter !== 'all') {
            filtered = filtered.filter(item => {
                if (this.activeFilter === 'victory') return item.result === 'VICTORY';
                return item.map.toLowerCase().includes(this.activeFilter.toLowerCase());
            });
        }

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: var(--bg-card); border: 1px dashed var(--border-color);">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🎯</div>
                    <div style="font-family: var(--font-mono); color: var(--text-muted);">Tidak ada foto pencapaian untuk filter ini.</div>
                </div>
            `;
            return;
        }

        grid.innerHTML = filtered.map(item => `
            <div class="item-card covert ach-card" onclick="achSystem.inspect('${item.id}')">
                <div class="item-rarity-tag" style="display: flex; justify-content: space-between; align-items: center;">
                    <span>★ ${item.map} // ${item.result} ${item.score}</span>
                    <span style="color: ${item.ratingColor}; font-weight: bold;">ELO ${item.rating}</span>
                </div>
                <div class="item-img" style="height: 180px; position: relative;">
                    <img src="${item.image}" alt="${item.title}">
                    <span class="ach-award-badge">${item.award}</span>
                </div>
                <div class="item-details">
                    <span class="item-type">${item.mode} • ${item.date}</span>
                    <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem; line-height: 1.3;">${item.title}</h4>
                    
                    <div class="ach-stats-row">
                        <div class="ach-stat-chip"><span>K</span><strong>${item.kills}</strong></div>
                        <div class="ach-stat-chip"><span>D</span><strong style="color: #eb4b4b;">${item.deaths}</strong></div>
                        <div class="ach-stat-chip"><span>HS</span><strong style="color: #ffb703;">${item.hsRate}%</strong></div>
                        <div class="ach-stat-chip"><span>DMG</span><strong style="color: #00e5ff;">${item.damage}</strong></div>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.8rem;">
                    <div class="inspect-hint" style="flex: 1; margin-top: 0; margin-right: 8px;">
                        <i class="fa-solid fa-magnifying-glass"></i> INSPECT MATCH
                    </div>
                    <button class="ach-delete-btn" title="Hapus Pencapaian" onclick="achSystem.delete('${item.id}', event)">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
}

const achSystem = new AchievementSystem();
window.achSystem = achSystem;

// --------------------------------------------------------
// 5. BUY MENU & LOADOUT EXPLORER
// --------------------------------------------------------
const BUY_DATA = {
    equipment: [
        { id: 'docker', name: 'Docker Containers', cost: 1000, icon: 'fa-brands fa-docker', mastery: 92, desc: 'Containerisasi deployment konsisten production & microservices.' },
        { id: 'git', name: 'Git & GitHub', cost: 640, icon: 'fa-brands fa-git-alt', mastery: 98, desc: 'Branching strategies, CI/CD Actions, code review rigor.' },
        { id: 'linux', name: 'Linux CLI & Bash', cost: 1250, icon: 'fa-solid fa-terminal', mastery: 90, desc: 'Server administration, cron jobs, log analytics, security hardening.' },
        { id: 'defuser', name: 'Defuser Kit (Production Hotfix)', cost: 200, icon: 'fa-solid fa-scissors', mastery: 100, desc: 'Menjinakkan bug kritis di server production sebelum downtime.' }
    ],
    pistols: [
        { id: 'html', name: 'HTML5 Semantic', cost: 400, icon: 'fa-brands fa-html5', mastery: 98, desc: 'Aksesibilitas ARIA, SEO optimal, semantik bersih.' },
        { id: 'css', name: 'CSS3 & Sass', cost: 500, icon: 'fa-brands fa-css3-alt', mastery: 95, desc: 'Grid, Flexbox, CS2 Panorama animations, responsive themes.' },
        { id: 'js', name: 'JavaScript (ES2024+)', cost: 600, icon: 'fa-brands fa-js', mastery: 95, desc: 'Async/await, DOM APIs, Canvas, Web Audio synthesizers.' },
        { id: 'ts', name: 'TypeScript Strict', cost: 650, icon: 'fa-solid fa-shield', mastery: 92, desc: 'Type safety enterprise, zero runtime undefined exceptions.' }
    ],
    midtier: [
        { id: 'react', name: 'React.js 18/19', cost: 1500, icon: 'fa-brands fa-react', mastery: 96, desc: 'Custom hooks, Context API, performant reactive dashboards.' },
        { id: 'nextjs', name: 'Next.js App Router', cost: 2350, icon: 'fa-solid fa-bolt', mastery: 92, desc: 'SSR, SSG, Server Actions, high-performance SEO.' },
        { id: 'vue', name: 'Vue.js 3 Pinia', cost: 1250, icon: 'fa-brands fa-vuejs', mastery: 88, desc: 'Reactivity composition API, lightweight component trees.' },
        { id: 'tailwind', name: 'Tailwind CSS', cost: 600, icon: 'fa-solid fa-wind', mastery: 96, desc: 'Utility-first rapid UI crafting dengan tema tactical CS2.' }
    ],
    rifles: [
        { id: 'node', name: 'Node.js & Express', cost: 3100, icon: 'fa-brands fa-node', mastery: 92, desc: 'High-throughput backend REST API, JWT auth, WebSockets.' },
        { id: 'python', name: 'Python & FastAPI', cost: 3500, icon: 'fa-brands fa-python', mastery: 90, desc: 'Asynchronous microservices, AI models, background jobs.' },
        { id: 'postgres', name: 'PostgreSQL & Prisma', cost: 2750, icon: 'fa-solid fa-database', mastery: 94, desc: 'ACID transactions, B-tree indexing, complex relational queries.' },
        { id: 'awp', name: 'System Architecture (The AWP)', cost: 4750, icon: 'fa-solid fa-crosshairs', mastery: 98, desc: 'One-shot scalable architecture, microservices, CDN caching.' }
    ],
    grenades: [
        { id: 'smoke', name: 'Smoke Grenade (Crisis Defense)', cost: 300, icon: 'fa-solid fa-smog', mastery: 95, desc: 'Komunikasi tenang dan terarah selama masa insiden produksi.' },
        { id: 'flash', name: 'Flashbang (Innovation Spark)', cost: 200, icon: 'fa-solid fa-sun', mastery: 92, desc: 'Ide prototipe radikal dan desain out-of-the-box.' },
        { id: 'he', name: 'HE Grenade (Legacy Refactor)', cost: 300, icon: 'fa-solid fa-bomb', mastery: 96, desc: 'Menghancurkan kode usang menjadi modul bersih berstandar tinggi.' }
    ]
};

class CS2BuyMenuApp {
    constructor() {
        this.money = 16000;
        this.selected = BUY_DATA.rifles[3]; // The AWP
        this.equipped = new Set(['docker', 'git', 'js', 'react', 'node', 'awp']);
        this.init();
    }

    init() {
        this.renderCols();
        this.renderInspect();

        const equipBtn = document.getElementById('buy-equip-btn');
        if (equipBtn) {
            equipBtn.addEventListener('click', () => this.equipSelected());
        }
    }

    renderCols() {
        const cats = ['equipment', 'pistols', 'midtier', 'rifles', 'grenades'];
        cats.forEach(c => {
            const container = document.getElementById(`buy-list-${c}`);
            if (!container) return;
            const items = BUY_DATA[c] || [];

            container.innerHTML = items.map(item => {
                const isSel = this.selected && this.selected.id === item.id;
                const isEq = this.equipped.has(item.id);
                return `
                    <div class="buy-slot ${isSel ? 'selected' : ''} ${isEq ? 'equipped' : ''}" onclick="cs2Buy.select('${item.id}', '${c}')">
                        <div class="buy-slot-left">
                            <i class="${item.icon}"></i>
                            <div>
                                <div class="buy-slot-name">${item.name}</div>
                                <div class="buy-slot-meta">${isEq ? '✓ EQUIPPED' : 'READY'}</div>
                            </div>
                        </div>
                        <div class="buy-slot-price">$${item.cost}</div>
                    </div>
                `;
            }).join('');
        });

        const moneyEl = document.getElementById('buy-money-display');
        if (moneyEl) moneyEl.textContent = `$${this.money.toLocaleString()}`;
    }

    select(id, cat) {
        const item = (BUY_DATA[cat] || []).find(x => x.id === id);
        if (item) {
            this.selected = item;
            this.renderInspect();
            this.renderCols();
            cs2Audio.playHover();
        }
    }

    renderInspect() {
        const w = this.selected;
        if (!w) return;

        const iconEl = document.getElementById('buy-insp-icon');
        const nameEl = document.getElementById('buy-insp-name');
        const costEl = document.getElementById('buy-insp-cost');
        const descEl = document.getElementById('buy-insp-desc');
        const barEl = document.getElementById('buy-insp-bar');
        const valEl = document.getElementById('buy-insp-val');
        const btn = document.getElementById('buy-equip-btn');

        if (iconEl) iconEl.className = `${w.icon} buy-big-icon`;
        if (nameEl) nameEl.textContent = w.name;
        if (costEl) costEl.textContent = `$${w.cost}`;
        if (descEl) descEl.textContent = w.desc;
        if (barEl) barEl.style.width = `${w.mastery}%`;
        if (valEl) valEl.textContent = `${w.mastery}%`;

        if (btn) {
            if (this.equipped.has(w.id)) {
                btn.innerHTML = `<i class="fa-solid fa-check"></i> EQUIPPED IN LOADOUT`;
                btn.style.backgroundColor = '#4ade80';
            } else {
                btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> EQUIP TO LOADOUT ($${w.cost})`;
                btn.style.backgroundColor = '';
            }
        }
    }

    equipSelected() {
        if (!this.selected) return;
        if (this.equipped.has(this.selected.id)) {
            cs2Audio.playClick();
            return;
        }

        if (this.money < this.selected.cost) {
            alert('Saldo ekonomi tidak mencukupi!');
            return;
        }

        this.money -= this.selected.cost;
        this.equipped.add(this.selected.id);
        cs2Audio.playBuy();

        window.addCS2Killfeed('EQUIPPED', this.selected.name, 'green');
        this.renderCols();
        this.renderInspect();
    }
}

const cs2Buy = new CS2BuyMenuApp();
window.cs2Buy = cs2Buy;

// --------------------------------------------------------
// 6. PROJECTS FILTERING & INSPECT
// --------------------------------------------------------
window.filterProjects = function(category) {
    cs2Audio.playHover();
    document.querySelectorAll('.proj-filter-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-cat') === category);
    });

    const cards = document.querySelectorAll('.inventory-grid .item-card');
    cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (category === 'all' || cat === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

window.openInspectModal = function(title, desc, techStack, imgSrc, liveUrl = '#', repoUrl = '#') {
    cs2Audio.playClick();
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDesc').textContent = desc;
    document.getElementById('modalImg').src = imgSrc;
    
    const tagsContainer = document.getElementById('modalTechTags');
    tagsContainer.innerHTML = '';
    techStack.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tech-tag';
        span.textContent = t;
        tagsContainer.appendChild(span);
    });

    const liveBtn = document.getElementById('modalLiveBtn');
    const repoBtn = document.getElementById('modalRepoBtn');
    if (liveBtn) liveBtn.href = liveUrl;
    if (repoBtn) repoBtn.href = repoUrl;

    document.getElementById('inspectModal').classList.add('active');
};

window.closeInspectModal = function() {
    cs2Audio.playClick();
    document.getElementById('inspectModal').classList.remove('active');
};

// --------------------------------------------------------
// 7. CS2 SCOREBOARD OVERLAY [TAB]
// --------------------------------------------------------
window.toggleScoreboard = function() {
    const sb = document.getElementById('cs2ScoreboardOverlay');
    if (!sb) return;
    const isActive = sb.classList.contains('active');
    if (isActive) {
        sb.classList.remove('active');
        cs2Audio.playClick();
    } else {
        sb.classList.add('active');
        cs2Audio.playScoreboard();
    }
};

// --------------------------------------------------------
// 8. SECTION SWITCHER & KEYBOARD SHORTCUTS
// --------------------------------------------------------
window.switchSection = function(targetId) {
    cs2Audio.playClick();

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active-section'));

    const btn = document.querySelector(`.nav-btn[data-target="${targetId}"]`);
    if (btn) btn.classList.add('active');

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active-section');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// Attach listeners
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        window.switchSection(target);
    });
    btn.addEventListener('mouseenter', () => cs2Audio.playHover());
});

// Keyboard Listeners (TAB for Scoreboard, ESC for Modals)
window.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        window.toggleScoreboard();
    } else if (e.key === 'Escape') {
        window.closeInspectModal();
        achSystem.closeModal();
        achSystem.closeInspect();
        const sb = document.getElementById('cs2ScoreboardOverlay');
        if (sb) sb.classList.remove('active');
    }
});

// Sound Toggle Button
const soundBtn = document.getElementById('sound-toggle-btn');
if (soundBtn) {
    soundBtn.addEventListener('click', () => {
        const enabled = cs2Audio.toggle();
        soundBtn.innerHTML = enabled 
            ? '<i class="fa-solid fa-volume-high"></i> SFX: ON'
            : '<i class="fa-solid fa-volume-xmark"></i> SFX: OFF';
    });
}

// Radio Contact Form Submit
window.handleRadioSubmit = function(event) {
    event.preventDefault();
    cs2Audio.playBombBeep();

    const btn = event.target.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> TRANSMITTING...';
    btn.disabled = true;

    setTimeout(() => {
        cs2Audio.playBuy();
        btn.innerHTML = '<i class="fa-solid fa-check"></i> ROGER THAT! TRANSMISSION CONFIRMED';
        btn.style.backgroundColor = '#4ade80';

        window.addCS2Killfeed('RADIO TRANSMISSION', 'Pesan transmisi diterima oleh Tactical HQ.', 'green');

        setTimeout(() => {
            event.target.reset();
            btn.innerHTML = orig;
            btn.style.backgroundColor = '';
            btn.disabled = false;
        }, 3000);
    }, 1200);
};

// Initialize canvas smoke on load
window.addEventListener('DOMContentLoaded', () => {
    new CS2SmokeCanvas('cs2-smoke-canvas');

    // Periodic dynamic killfeed
    setTimeout(() => {
        window.addCS2Killfeed('CONNECTED', 'Counter-Strike 2 Sub-Tick Portfolio Loaded. Press [TAB] for Scoreboard.', 'gold');
    }, 1200);

    setInterval(() => {
        const msgs = [
            { k: 'Operative [DEV]', w: 'AWP', v: 'Legacy Monolith', hs: true },
            { k: 'CT Team', w: 'Defuse Kit', v: 'Production Crash', hs: false },
            { k: 'Operative [DEV]', w: 'AK-47', v: 'High Latency Bug', hs: true }
        ];
        const m = msgs[Math.floor(Math.random() * msgs.length)];
        window.addCS2Killfeed(m.k, `[${m.w}] ${m.hs ? '🎯 HS' : ''} ${m.v}`);
    }, 15000);
});