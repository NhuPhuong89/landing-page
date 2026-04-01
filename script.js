/**
 * GOLFZON VINA - Responsive Interaction Script
 * Developed for High-End Golf Simulator Landing Page
 */

let currentLang = 'vi';
let chartInstance;

/**
 * Switch between Vietnamese and English content
 * @param {string} lang 
 */
function setLang(lang) {
    currentLang = lang;
    const elements = document.querySelectorAll('[data-vi]');
    
    elements.forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });

    // Update Language Buttons UI
    const btnVi = document.getElementById('lang-vi');
    const btnEn = document.getElementById('lang-en');

    if (lang === 'vi') {
        btnVi.classList.add('bg-white', 'text-navy', 'shadow-sm');
        btnEn.classList.remove('bg-white', 'text-navy', 'shadow-sm');
        btnEn.classList.add('text-slate-500');
    } else {
        btnEn.classList.add('bg-white', 'text-navy', 'shadow-sm');
        btnVi.classList.remove('bg-white', 'text-navy', 'shadow-sm');
        btnVi.classList.add('text-slate-500');
    }

    updateChart(lang);
}

/**
 * Initialize Financial Comparison Chart
 */
function initChart() {
    const ctx = document.getElementById('mainChart').getContext('2d');
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Giá Niêm Yết', 'Giá Refurbished'],
            datasets: [{
                data: [1280, 576],
                backgroundColor: ['#E2E8F0', '#C5A059'],
                borderRadius: 8,
                barThickness: 45
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    padding: 10,
                    titleFont: { size: 14, weight: 'bold' }
                }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: '#F1F5F9' } },
                x: { grid: { display: false } }
            }
        }
    });
}

/**
 * Update chart labels based on language
 * @param {string} lang 
 */
function updateChart(lang) {
    if (!chartInstance) return;
    const labels = lang === 'vi' ? ['Giá Niêm Yết', 'Giá Refurbished'] : ['Standard Price', 'Refurbished Price'];
    chartInstance.data.labels = labels;
    chartInstance.update();
}

/**
 * Handle Lead Generation Form Submission
 */
document.getElementById('leadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Simulate API Call
    this.classList.add('hidden');
    document.getElementById('successMessage').classList.remove('hidden');
});

// Start application logic
window.onload = function() {
    initChart();
};

function toggleChat() {
  const box = document.getElementById("chatbox")
  box.style.display = box.style.display === "none" ? "block" : "none"
}

async function send() {
  const input = document.getElementById("input")
  const msg = input.value

  document.getElementById("messages").innerHTML += "<p><b>Bạn:</b> " + msg + "</p>"

  const res = await fetch("https://your-backend.onrender.com/chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({message: msg})
  })

  const data = await res.json()

  document.getElementById("messages").innerHTML += "<p><b>AI:</b> " + data.reply + "</p>"

  input.value = ""
}
