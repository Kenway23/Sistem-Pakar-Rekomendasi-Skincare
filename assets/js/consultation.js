function combineCF(cf1, cf2) {
    return cf1 + cf2 * (1 - cf1);
}

function analisisSkincare() {
    const g01 = document.getElementById("g01").checked ? 1 : 0;
    const g02 = document.getElementById("g02").checked ? 1 : 0;
    const g03 = document.getElementById("g03").checked ? 1 : 0;
    const g04 = document.getElementById("g04").checked ? 1 : 0;
    const g05 = document.getElementById("g05").checked ? 1 : 0;
    const g06 = document.getElementById("g06").checked ? 1 : 0;

    let hasil = {};
    let gejalaDipilih = [];

    if (g01) gejalaDipilih.push("Kulit Berminyak");
    if (g02) gejalaDipilih.push("Kulit Kering");
    if (g03) gejalaDipilih.push("Banyak Jerawat");
    if (g04) gejalaDipilih.push("Kulit Kusam");
    if (g05) gejalaDipilih.push("Kulit Sensitif");
    if (g06) gejalaDipilih.push("Pori-pori Besar");

    if (gejalaDipilih.length === 0) {
        document.getElementById("hasilContainer").innerHTML = `
            <h2>Hasil Analisis Skincare</h2>
            <p class="warning">Silakan pilih minimal satu gejala terlebih dahulu.</p>
        `;
        document.getElementById("emptyState").style.display = "none";
        document.getElementById("hasilContainer").classList.add("active");
        return;
    }

    if (g01 && g03 && g06) {
        let cf1 = 0.9 * g01;
        let cf2 = 1.0 * g03;
        let cf3 = 0.8 * g06;

        let r01 = combineCF(cf1, cf2);
        r01 = combineCF(r01, cf3);

        hasil["Oily Acne Prone"] = {
            cf: r01,
            saran: "Gunakan facial wash gentle, moisturizer gel, sunscreen non-comedogenic, dan produk dengan kandungan salicylic acid.",
            hindari: "Hindari skincare yang terlalu berminyak dan jangan terlalu sering memakai scrub."
        };
    }

    if (g02 && g04) {
        let cf1 = 1.0 * g02;
        let cf2 = 0.7 * g04;

        let r02 = combineCF(cf1, cf2);

        hasil["Dry & Brightening"] = {
            cf: r02,
            saran: "Gunakan facial wash yang lembut, moisturizer cream, sunscreen, dan kandungan hyaluronic acid atau ceramide. Untuk kulit kusam, gunakan niacinamide atau vitamin C ringan.",
            hindari: "Hindari facial wash yang membuat kulit terasa tertarik, eksfoliasi berlebihan, dan produk dengan alkohol tinggi."
        };
    }

    if (g05 && g03) {
        let cf1 = 1.0 * g05;
        let cf2 = 0.7 * g03;

        let r03 = combineCF(cf1, cf2);

        hasil["Sensitive Skin Care"] = {
            cf: r03,
            saran: "Gunakan skincare yang gentle, fragrance-free, dan alcohol-free.",
            hindari: "Hindari scrub kasar, alkohol tinggi, parfum, atau bahan aktif yang terlalu kuat."
        };
    }

    if (g01 && g06) {
        let cf1 = 0.8 * g01;
        let cf2 = 0.9 * g06;

        let r04 = combineCF(cf1, cf2);

        hasil["Normal to Oily (Pore Care)"] = {
            cf: r04,
            saran: "Gunakan facial wash ringan, moisturizer gel, sunscreen non-comedogenic, dan produk yang membantu merawat pori-pori seperti niacinamide.",
            hindari: "Hindari produk yang terlalu berat, komedogenik, dan penggunaan scrub kasar pada area pori-pori."
        };
    }

    if (Object.keys(hasil).length === 0) {
        document.getElementById("hasilContainer").innerHTML = `
            <h2>Hasil Analisis Skincare</h2>
            <div class="hasil-item">
                <strong>Gejala yang Dipilih:</strong>
                <ul>
                    ${gejalaDipilih.map(g => `<li>${g}</li>`).join("")}
                </ul>
            </div>
            <div class="hasil-item">
                <strong>Rekomendasi:</strong>
                <p>Belum ditemukan rekomendasi yang sesuai.</p>
            </div>
            <div class="hasil-item">
                <strong>Keterangan:</strong>
                <p>Kombinasi gejala yang dipilih belum cocok dengan aturan sistem.</p>
            </div>
        `;
        document.getElementById("emptyState").style.display = "none";
        document.getElementById("hasilContainer").classList.add("active");
        return;
    }

    const terbaik = Object.keys(hasil).reduce((a, b) => hasil[a].cf > hasil[b].cf ? a : b);
    const persen = (hasil[terbaik].cf * 100).toFixed(2);
    const hindariHasil = hasil[terbaik].hindari ? `
        <div class="hasil-item">
            <strong>Hindari:</strong>
            <p>${hasil[terbaik].hindari}</p>
        </div>
    ` : "";

    let htmlHasil = `
        <h2>Hasil Analisis Skincare</h2>

        <div class="hasil-item">
            <strong>Gejala yang Dipilih:</strong>
            <ul>
                ${gejalaDipilih.map(g => `<li>${g}</li>`).join("")}
            </ul>
        </div>

        <div class="hasil-item">
            <strong>Rekomendasi:</strong>
            <p><span class="badge">${terbaik}</span></p>
        </div>

        <div class="hasil-item">
            <strong>Tingkat Keyakinan (CF):</strong>
            <div class="confidence">
                <div class="progress"><span class="progress-fill"></span></div>
                <p>${persen}%</p>
            </div>
        </div>

        <div class="hasil-item">
            <strong>Saran Skincare:</strong>
            <p>${hasil[terbaik].saran}</p>
        </div>

        ${hindariHasil}
    `;

    document.getElementById("hasilContainer").innerHTML = htmlHasil;
    document.querySelector(".progress-fill").style.width = `${persen}%`;
    document.getElementById("emptyState").style.display = "none";
    document.getElementById("hasilContainer").classList.add("active");
}

function resetForm() {
    document.getElementById("consultationForm").reset();
    document.getElementById("emptyState").style.display = "grid";
    document.getElementById("hasilContainer").classList.remove("active");
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("analyzeButton").addEventListener("click", analisisSkincare);
    document.getElementById("resetButton").addEventListener("click", (event) => {
        event.preventDefault();
        resetForm();
    });
});
