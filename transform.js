const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Inject CSS
const cssToInject = `
    /* Presence Counter */
    .presence-panel {
        position: absolute;
        top: 24px;
        right: 24px;
        width: 280px;
        background: rgba(38,40,54,0.95);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 16px;
        padding: 16px;
        pointer-events: auto;
        z-index: 10;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        transition: transform 0.3s ease;
    }
    .presence-panel.collapsed {
        transform: translateX(320px);
    }
    .presence-toggle {
        position: absolute;
        top: 16px;
        left: -32px;
        width: 32px;
        height: 32px;
        background: rgba(38,40,54,0.95);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 8px 0 0 8px;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        font-weight: bold;
    }
    .presence-title {
        font-size: 15px;
        font-weight: 600;
        margin-bottom: 12px;
    }
    .presence-inputs {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
    }
    .presence-input {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        color: white;
        padding: 6px;
        border-radius: 6px;
        font-size: 12px;
        width: 100%;
        color-scheme: dark;
    }
    .presence-btn {
        width: 100%;
        padding: 8px;
        background: rgba(255,255,255,0.1);
        border: none;
        border-radius: 6px;
        color: white;
        font-size: 12px;
        cursor: pointer;
        margin-bottom: 12px;
    }
    .presence-btn:hover {
        background: rgba(255,255,255,0.15);
    }
    .presence-list {
        max-height: 100px;
        overflow-y: auto;
        margin-bottom: 12px;
        font-size: 12px;
        color: var(--text-secondary);
    }
    .presence-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
        background: rgba(255,255,255,0.03);
        padding: 4px 8px;
        border-radius: 4px;
    }
    .presence-item button {
        background: none;
        border: none;
        color: #f56b6b;
        cursor: pointer;
    }
    .presence-progress-bg {
        height: 6px;
        background: rgba(255,255,255,0.1);
        border-radius: 3px;
        margin-bottom: 8px;
        overflow: hidden;
    }
    .presence-progress-bar {
        height: 100%;
        background: #4dbd7a;
        width: 0%;
        transition: width 0.3s, background-color 0.3s;
    }
    .presence-stats {
        text-align: center;
    }
    .presence-days {
        font-size: 24px;
        font-weight: bold;
    }
    .presence-warning {
        font-size: 11px;
        color: #f56b6b;
        margin-top: 4px;
        display: none;
    }
    
    /* Interactive Timeline Slider replacing .timeline-bar */
    .timeline-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 64px;
        background: rgba(24,25,36,0.97);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-top: 1px solid rgba(255,255,255,0.07);
        z-index: 10;
        display: flex;
        align-items: center;
        padding: 0 40px;
        pointer-events: auto;
    }
    @media (max-width: 600px) {
        .timeline-bar { display: none; }
    }
    .timeline-container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .timeline-line {
        position: absolute;
        width: 100%;
        height: 2px;
        background: rgba(255,255,255,0.1);
        top: 50%;
        transform: translateY(-50%);
    }
    .timeline-years {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        justify-content: space-between;
        pointer-events: none;
    }
    .timeline-year {
        font-size: 10px;
        color: rgba(255,255,255,0.3);
        margin-top: 15px;
    }
    .timeline-event {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 12px;
        height: 12px;
        border-radius: 50%;
        cursor: pointer;
        background: var(--event-color);
        border: 2px solid rgba(24,25,36,1);
        box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        transition: transform 0.2s;
    }
    .timeline-event:hover {
        transform: translate(-50%, -50%) scale(1.5);
        z-index: 5;
    }
    .timeline-event-label {
        position: absolute;
        top: -35px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 11px;
        color: white;
        white-space: nowrap;
        background: rgba(38,40,54,0.95);
        padding: 4px 8px;
        border-radius: 6px;
        border: 1px solid rgba(255,255,255,0.1);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s;
    }
    .timeline-event:hover .timeline-event-label {
        opacity: 1;
    }
    
    /* Passport Compare Table */
    .passport-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
        font-size: 12px;
    }
    .passport-table th, .passport-table td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .passport-table th {
        background: rgba(91,138,245,0.2);
        color: white;
        font-weight: 600;
    }
    .passport-table tr:nth-child(even) {
        background: rgba(255,255,255,0.04);
    }
    .passport-table td.de-col {
        border-left: 2px solid #4dbd7a;
        background: rgba(77,189,122,0.05);
    }
    .passport-note {
        font-size: 11px;
        color: var(--text-secondary);
        margin-top: 8px;
        font-style: italic;
    }

    /* Calculator */
    .calc-row {
        margin-bottom: 12px;
    }
    .calc-row label {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: var(--text-secondary);
        margin-bottom: 4px;
    }
    .calc-slider {
        width: 100%;
        accent-color: #f56b6b;
    }
    .calc-outputs {
        background: rgba(255,255,255,0.03);
        padding: 12px;
        border-radius: 8px;
        margin-top: 16px;
    }
    .calc-stat {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        margin-bottom: 6px;
    }
    .calc-stat strong {
        color: white;
        font-size: 14px;
    }
    .calc-verdict {
        margin-top: 12px;
        font-weight: 600;
        font-size: 13px;
        line-height: 1.4;
    }
    .calc-compare {
        width: 100%;
        padding: 10px;
        margin-top: 12px;
        background: rgba(77,189,122,0.1);
        border: 1px solid rgba(77,189,122,0.3);
        border-radius: 8px;
        color: #4dbd7a;
        font-size: 12px;
        cursor: pointer;
    }
</style>
`;
html = html.replace('</style>', cssToInject);

// 2. Inject HTML panels
const htmlToInject = `
    <!-- Presence Panel -->
    <div class="presence-panel" id="presencePanel">
        <div class="presence-toggle" id="presenceToggle">❮</div>
        <div class="presence-title">🇺🇸 Счётчик присутствия в США</div>
        <div class="presence-inputs">
            <input type="date" id="tripStart" class="presence-input" placeholder="Уехала в ЕС">
            <input type="date" id="tripEnd" class="presence-input" placeholder="Вернулась в США">
        </div>
        <button class="presence-btn" id="addTripBtn">+ Добавить поездку</button>
        <div class="presence-list" id="tripList"></div>
        <div class="presence-progress-bg">
            <div class="presence-progress-bar" id="tripProgressBar"></div>
        </div>
        <div class="presence-stats">
            <div class="presence-days" id="tripDaysRemaining">913 дней осталось</div>
            <div class="presence-warning" id="tripWarning">⚠️ Критически мало — риск провала натурализации</div>
        </div>
    </div>
`;
html = html.replace('<div class="minimap-container" id="minimapContainer">', htmlToInject + '\n    <div class="minimap-container" id="minimapContainer">');

const newTimeline = `
    <div class="timeline-bar" id="timelineBar">
        <div class="timeline-container" id="timelineContainer">
            <div class="timeline-line"></div>
            <div class="timeline-years" id="timelineYears"></div>
            <!-- Event dots injected via JS -->
        </div>
    </div>
`;
html = html.replace(/<div class="timeline-bar">[\s\S]*?<\/div>\s*<\/div>/, newTimeline + '\n</div>');

// 3. Inject JS Nodes and Edges
const jsNodesToInject = `
        { id: "passport-compare", title: "📊 Сравнение паспортов", subtitle: "США vs Германия vs Россия", text: "Сравнение ключевых характеристик.", type: "us" },
        { id: "cost-calc", title: "💸 Цена разлуки", subtitle: "Калькулятор реальных потерь", text: "Расчет финансовых и временных затрат на поддержание LDR.", type: "eu" },
`;
html = html.replace('const nodesData = [', 'const nodesData = [\n' + jsNodesToInject);

const jsEdgesToInject = `
        { source: "passport-compare", target: "eu_barrier" },
        { source: "passport-compare", target: "us_path" },
        { source: "passport-compare", target: "m_pass" },
        { source: "cost-calc", target: "eu_barrier" },
        { source: "cost-calc", target: "rel-main" },
`;
html = html.replace('const edgesData = [', 'const edgesData = [\n' + jsEdgesToInject);

const jsLayoutToInject = `
        "passport-compare": { x: 0, y: -700 },
        "cost-calc": { x: -400, y: -700 },
`;
html = html.replace('const layout = {', 'const layout = {\n' + jsLayoutToInject);

// 4. State pan target
html = html.replace('currentFilter: "all",', 'currentFilter: "all",\n        panTarget: null,');

// 5. Drawing Loop (Risk Badges & Probabilities)
const renderAdditions = `
            // Feature 6: Probability Rings
            const probabilities = {
                "us_opt": { p: 0.25, c: "#4dbd7a" },
                "us_real": { p: 0.45, c: "#f5a742" },
                "us_pess": { p: 0.30, c: "#f56b6b" },
                "life-opt": { p: 0.40, c: "#4dbd7a" },
                "life-real": { p: 0.45, c: "#f5a742" },
                "life-pess": { p: 0.15, c: "#f56b6b" },
                "break-a": { p: 0.15, c: "#4dbd7a" },
                "break-b": { p: 0.25, c: "#f5a742" },
                "break-c": { p: 0.60, c: "#4dbd7a" }
            };
            if (!isExport && state.transform.scale > 0.5 && probabilities[n.id]) {
                const prob = probabilities[n.id];
                const r = n.radius * scale + 16;
                
                ctx.beginPath();
                ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(255,255,255,0.06)";
                ctx.lineWidth = 3;
                ctx.stroke();
                
                ctx.beginPath();
                ctx.arc(n.x, n.y, r, -Math.PI / 2, -Math.PI / 2 + prob.p * Math.PI * 2);
                ctx.strokeStyle = prob.c;
                ctx.lineWidth = 3;
                ctx.stroke();
                
                ctx.fillStyle = prob.c;
                ctx.font = "11px sans-serif";
                ctx.textAlign = "left";
                ctx.fillText(Math.round(prob.p * 100) + "%", n.x + r + 4, n.y - r - 4);
                ctx.textAlign = "center";
            }

            // Feature 2: Risk Badge
            const riskLevels = {
                "root": "green", "engaged": "green", "m_dec": "green", "m_permit": "green", "m_pr": "green", "m_pass": "green", "k_career": "green", "k_freelance": "green", "p_business": "green", "life-opt": "green", "after-opt": "green", "break-c": "green",
                "us_path": "amber", "us_opt": "amber", "us_real": "amber", "p_fretster": "amber", "p_job": "amber", "life-real": "amber", "after-real": "amber", "break-b": "amber", "tax-good": "amber", "denat-cant-lose": "amber", "eu_barrier": "amber",
                "us_pess": "red", "tax-main": "red", "tax-fbar": "red", "tax-bank": "red", "tax-exit": "red", "denat-main": "red", "denat-triggers": "red", "rel-main": "red", "rel-stats": "red", "rel-social": "red", "rel-cns": "red", "life-pess": "red", "after-main": "red", "after-pess": "red", "break-a": "red", "breakup-main": "red"
            };
            const riskColors = {
                "green": "rgba(77,189,122,0.8)",
                "amber": "rgba(245,167,66,0.8)",
                "red": "rgba(245,107,107,0.8)"
            };
            if (!isExport && state.transform.scale > 0.45) {
                const risk = riskLevels[n.id];
                if (risk) {
                    const bx = n.x + n.radius * scale;
                    const by = n.y - n.radius * scale;
                    ctx.beginPath();
                    ctx.arc(bx, by, 9, 0, Math.PI * 2);
                    ctx.fillStyle = riskColors[risk];
                    ctx.fill();
                    ctx.lineWidth = 1.5;
                    ctx.strokeStyle = "#ffffff";
                    ctx.stroke();
                }
            }
`;
html = html.replace('// Draw Tooltips', renderAdditions + '\n        // Draw Tooltips');

// 6. Pan logic inside animate
const panLogic = `
        if (state.panTarget) {
            state.transform.x += (state.panTarget.x - state.transform.x) * 0.07;
            state.transform.y += (state.panTarget.y - state.transform.y) * 0.07;
            const dx = state.panTarget.x - state.transform.x;
            const dy = state.panTarget.y - state.transform.y;
            if (dx*dx + dy*dy < 1) {
                state.panTarget = null;
            }
        }
`;
html = html.replace('// 2. Search & Filter', panLogic + '\n        // 2. Search & Filter');

// 7. Sidebar dynamic content hook
const customSidebar = `
        if (node.id === 'passport-compare') {
            sidebarContent.innerHTML = \`
                <h2 style="color: \${node.color}">\${node.title}</h2>
                <div class="subtitle">\${node.subtitle}</div>
                <table class="passport-table">
                    <tr><th>Параметр</th><th>🇺🇸 США</th><th class="de-col">🇩🇪 Германия</th><th>🇷🇺 Россия</th></tr>
                    <tr><td>Безвизовых стран</td><td>186</td><td class="de-col">191</td><td>57</td></tr>
                    <tr><td>Рейтинг Henley</td><td>#7</td><td class="de-col">#3</td><td>#51</td></tr>
                    <tr><td>Двойное гражд.</td><td>Да</td><td class="de-col">Да*</td><td>Да</td></tr>
                    <tr><td>Налоги за рубежом</td><td>Да(CBT)</td><td class="de-col">Нет</td><td>Нет</td></tr>
                    <tr><td>Военная служба</td><td>Нет</td><td class="de-col">Нет</td><td>Да</td></tr>
                    <tr><td>Виза в США</td><td>—</td><td class="de-col">Не нужна</td><td>Нужна</td></tr>
                    <tr><td>Виза в ЕС</td><td>Не нужна</td><td class="de-col">—</td><td>Нужна</td></tr>
                    <tr><td>Стоимость отказа</td><td>$2 350</td><td class="de-col">—</td><td>—</td></tr>
                </table>
                <div class="passport-note">* Германия разрешает двойное гражданство с 2024 года (реформа StAG)</div>
            \`;
            sidebar.style.borderLeftColor = node.color;
            sidebar.classList.add('open');
            minimapContainer.style.opacity = '0';
            minimapContainer.style.pointerEvents = 'none';
            return;
        } else if (node.id === 'cost-calc') {
            sidebarContent.innerHTML = \`
                <h2 style="color: \${node.color}">\${node.title}</h2>
                <div class="subtitle">\${node.subtitle}</div>
                <div class="calc-row">
                    <label>Лет ожидания: <span id="valYears">5</span></label>
                    <input type="range" id="slYears" class="calc-slider" min="1" max="10" value="5">
                </div>
                <div class="calc-row">
                    <label>Перелётов в год: <span id="valFlights">3</span></label>
                    <input type="range" id="slFlights" class="calc-slider" min="1" max="5" value="3">
                </div>
                <div class="calc-row">
                    <label>Цена билета (€): <span id="valPrice">1100</span></label>
                    <input type="range" id="slPrice" class="calc-slider" min="500" max="2000" step="50" value="1100">
                </div>
                <div class="calc-row">
                    <label>Совместных дней/год: <span id="valDays">80</span></label>
                    <input type="range" id="slDays" class="calc-slider" min="0" max="365" value="80">
                </div>
                <div class="calc-outputs">
                    <div class="calc-stat">Авиабилеты итого: <strong id="outCost">€16 500</strong></div>
                    <div class="calc-stat">Дней вместе за весь период: <strong id="outTogether">400 дн</strong></div>
                    <div class="calc-stat">Дней врозь за весь период: <strong id="outApart">1425 дн</strong></div>
                    <div class="calc-stat">Пропущенных лет: <strong id="outYears">3.9 лет</strong></div>
                    <div class="calc-verdict" id="outVerdict" style="color: #f5a742">За 5 лет вы потратите €16 500 на перелёты и проведёте вместе только 22% времени</div>
                </div>
                <button class="calc-compare" id="btnCompare">vs Мюнхенский путь →</button>
                <div id="compareText" style="display:none; margin-top: 12px; font-size: 12px; color: #a1a1aa">При мюнхенском сценарии: €0 на перелёты, 100% времени вместе с декабря 2026</div>
            \`;
            
            sidebar.style.borderLeftColor = node.color;
            sidebar.classList.add('open');
            minimapContainer.style.opacity = '0';
            minimapContainer.style.pointerEvents = 'none';

            const slYears = document.getElementById('slYears');
            const slFlights = document.getElementById('slFlights');
            const slPrice = document.getElementById('slPrice');
            const slDays = document.getElementById('slDays');
            
            const updateCalc = () => {
                const y = parseInt(slYears.value);
                const f = parseInt(slFlights.value);
                const p = parseInt(slPrice.value);
                const d = parseInt(slDays.value);
                
                document.getElementById('valYears').innerText = y;
                document.getElementById('valFlights').innerText = f;
                document.getElementById('valPrice').innerText = p;
                document.getElementById('valDays').innerText = d;
                
                const cost = y * f * p;
                const together = y * d;
                const apart = y * 365 - together;
                const missed = (apart / 365).toFixed(1);
                const pct = Math.round((together / (y * 365)) * 100);
                
                document.getElementById('outCost').innerText = '€' + cost.toLocaleString('ru-RU');
                document.getElementById('outTogether').innerText = together + ' дн';
                document.getElementById('outApart').innerText = apart + ' дн';
                document.getElementById('outYears').innerText = missed + ' лет';
                
                const verd = document.getElementById('outVerdict');
                verd.innerText = \`За \${y} лет вы потратите €\${cost.toLocaleString('ru-RU')} на перелёты и проведёте вместе только \${pct}% времени\`;
                verd.style.color = (cost > 20000 || pct < 20) ? '#f56b6b' : '#f5a742';
            };
            
            slYears.addEventListener('input', updateCalc);
            slFlights.addEventListener('input', updateCalc);
            slPrice.addEventListener('input', updateCalc);
            slDays.addEventListener('input', updateCalc);
            
            document.getElementById('btnCompare').addEventListener('click', (e) => {
                document.getElementById('compareText').style.display = 'block';
                e.target.style.display = 'none';
            });
            updateCalc();
            return;
        }
`;
html = html.replace("sidebarContent.innerHTML = `", customSidebar + "\n        sidebarContent.innerHTML = `");

// 8. Replace Timeline and Add Presence Script at the bottom
// Replace the old timeline logic
const bottomScript = `
    // Replace old timeline
    function panToNode(nodeId) {
        const node = state.nodes.find(n => n.id === nodeId);
        if (!node) return;
        state.panTarget = {
            x: window.innerWidth / 2 - node.targetX * state.transform.scale,
            y: window.innerHeight / 2 - node.targetY * state.transform.scale
        };
    }

    const newTimelineEvents = [
        { year: 2024.2, label: "Green Card получена", color: "#5b8af5", target: "us_path" },
        { year: 2026.5, label: "Помолвка 💍", color: "rgb(232,200,74)", target: "engaged" },
        { year: 2026.9, label: "Катя прилетает", color: "#4dbd7a", target: "m_dec" },
        { year: 2027.1, label: "Роспись", color: "#4dbd7a", target: "m_marry" },
        { year: 2027.5, label: "Квартира + ВНЖ", color: "#4dbd7a", target: "m_permit" },
        { year: 2028.9, label: "Подача N-400", color: "#5b8af5", target: "us_path" },
        { year: 2029.3, label: "Паспорт США (опт.)", color: "#4dbd7a", target: "us_opt" },
        { year: 2029.9, label: "Паспорт США (реал.)", color: "rgb(232,200,74)", target: "us_real" },
        { year: 2029.5, label: "ПМЖ Германии", color: "#4dbd7a", target: "m_pr" },
        { year: 2033.1, label: "Паспорт США (песс.)", color: "#f56b6b", target: "us_pess" },
        { year: 2032.0, label: "Паспорт DE", color: "#4dbd7a", target: "m_pass" }
    ];

    const tlContainer = document.getElementById('timelineContainer');
    const tlYears = document.getElementById('timelineYears');
    for (let y = 2024; y <= 2033; y++) {
        const d = document.createElement('div');
        d.className = 'timeline-year';
        d.innerText = y;
        tlYears.appendChild(d);
    }
    
    newTimelineEvents.forEach(ev => {
        const pct = ((ev.year - 2024) / 9) * 100;
        const dot = document.createElement('div');
        dot.className = 'timeline-event';
        dot.style.left = \`\${pct}%\`;
        dot.style.setProperty('--event-color', ev.color);
        
        const label = document.createElement('div');
        label.className = 'timeline-event-label';
        label.innerText = ev.label;
        dot.appendChild(label);
        
        dot.addEventListener('click', () => {
            panToNode(ev.target);
        });
        tlContainer.appendChild(dot);
    });

    // Feature 1: Presence Counter Logic
    let trips = [];
    const TOTAL_BUDGET = 913;
    
    document.getElementById('presenceToggle').addEventListener('click', () => {
        const p = document.getElementById('presencePanel');
        p.classList.toggle('collapsed');
        document.getElementById('presenceToggle').innerText = p.classList.contains('collapsed') ? '❮' : '❯';
    });
    
    function updatePresence() {
        let used = 0;
        const list = document.getElementById('tripList');
        list.innerHTML = '';
        trips.forEach((t, i) => {
            const days = Math.round((t.end - t.start)/(1000*60*60*24));
            used += days;
            const div = document.createElement('div');
            div.className = 'presence-item';
            div.innerHTML = \`\${t.start.toLocaleDateString()} - \${t.end.toLocaleDateString()} (\${days} дн) <button onclick="deleteTrip(\${i})">×</button>\`;
            list.appendChild(div);
        });
        
        const rem = TOTAL_BUDGET - used;
        document.getElementById('tripDaysRemaining').innerText = rem + " дней осталось";
        
        const bar = document.getElementById('tripProgressBar');
        const pct = Math.min(100, (used / TOTAL_BUDGET) * 100);
        bar.style.width = pct + '%';
        
        if (used < 600) bar.style.backgroundColor = '#4dbd7a';
        else if (used < 800) bar.style.backgroundColor = '#f5a742';
        else bar.style.backgroundColor = '#f56b6b';
        
        document.getElementById('tripWarning').style.display = rem < 113 ? 'block' : 'none';
    }
    
    window.deleteTrip = (i) => {
        trips.splice(i, 1);
        updatePresence();
    };
    
    document.getElementById('addTripBtn').addEventListener('click', () => {
        const s = document.getElementById('tripStart').value;
        const e = document.getElementById('tripEnd').value;
        if (s && e) {
            trips.push({ start: new Date(s), end: new Date(e) });
            updatePresence();
        }
    });
    updatePresence();
`;

// Remove the old timeline setup from index.html
html = html.replace(/\/\/ Timeline setup[\s\S]*?track\.appendChild\(dot\);\n    }\);/m, bottomScript);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Transform complete.');
