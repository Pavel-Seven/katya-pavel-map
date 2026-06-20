const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Move features 6 and 2 inside the nodes.forEach loop
const extractedCode = `
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

// Remove the extracted code from its wrong location
html = html.replace(extractedCode, '');

// Insert it right before the end of the node loop
html = html.replace('ctx.fillText(n.subtitle, n.x, n.y + n.radius * scale + 28);\n        });', 
    'ctx.fillText(n.subtitle, n.x, n.y + n.radius * scale + 28);\n\n' + extractedCode + '\n        });');

// 2. Add favicon to head
if (!html.includes('<link rel="icon" href="data:,">')) {
    html = html.replace('</head>', '    <link rel="icon" href="data:,">\n</head>');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Scope fix complete.');
