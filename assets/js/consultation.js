function combineCF(cf1, cf2) {
    return cf1 + cf2 * (1 - cf1);
}

const ageLabels = {
    u00: "1–11 tahun",
    u01: "12–19 tahun",
    u02: "20–29 tahun",
    u03: "30–39 tahun",
    u04: "40–59 tahun",
    u05: "60–100 tahun"
};

function tentukanKelompokUsia(usia) {
    if (usia <= 11) return "u00";
    if (usia <= 19) return "u01";
    if (usia <= 29) return "u02";
    if (usia <= 39) return "u03";
    if (usia <= 59) return "u04";
    return "u05";
}

// Rule usia menyesuaikan saran setelah kategori kulit dengan CF tertinggi ditemukan.
const rekomendasiUsia = {
    "Oily Acne Prone": {
        u01: {
            saran: "Gunakan gentle cleanser, moisturizer gel non-comedogenic, sunscreen, dan salicylic acid berkadar rendah secara bertahap.",
            hindari: "Hindari scrub kasar, memencet jerawat, produk terlalu berminyak, dan memakai banyak bahan aktif sekaligus."
        },
        u02: {
            saran: "Gunakan gentle cleanser, moisturizer gel, sunscreen non-comedogenic, serta salicylic acid atau niacinamide untuk membantu minyak dan jerawat.",
            hindari: "Hindari produk komedogenik, eksfoliasi berlebihan, dan mengganti terlalu banyak produk dalam waktu bersamaan."
        },
        u03: {
            saran: "Gunakan cleanser lembut, salicylic acid sesuai toleransi, moisturizer dengan ceramide, dan sunscreen untuk merawat jerawat sekaligus menjaga skin barrier.",
            hindari: "Hindari produk yang terlalu mengeringkan, scrub kasar, dan penggunaan beberapa bahan aktif kuat pada hari yang sama."
        },
        u04: {
            saran: "Gunakan cleanser lembut, moisturizer dengan ceramide, sunscreen, serta niacinamide atau bahan antijerawat secara bertahap agar kulit tidak terlalu kering.",
            hindari: "Hindari pembersih keras, alkohol tinggi, scrub kasar, dan bahan aktif kuat yang digunakan terlalu sering."
        }
    },
    "Dry & Brightening": {
        u01: {
            saran: "Gunakan gentle cleanser, moisturizer dengan ceramide atau hyaluronic acid, dan sunscreen. Fokus utama adalah menjaga kelembapan kulit.",
            hindari: "Hindari facial wash yang membuat kulit tertarik, scrub kasar, dan produk pencerah dengan konsentrasi tinggi."
        },
        u02: {
            saran: "Gunakan cleanser lembut, moisturizer dengan ceramide atau hyaluronic acid, sunscreen, serta niacinamide atau vitamin C ringan.",
            hindari: "Hindari eksfoliasi berlebihan, alkohol tinggi, dan penggunaan banyak produk pencerah secara bersamaan."
        },
        u03: {
            saran: "Gunakan cleanser lembut, hydrating serum, moisturizer dengan ceramide, sunscreen, serta antioksidan seperti vitamin C sesuai toleransi.",
            hindari: "Hindari produk yang terlalu mengeringkan dan menggabungkan bahan aktif kuat tanpa memberi waktu kulit beradaptasi."
        },
        u04: {
            saran: "Gunakan cleanser lembut, moisturizer yang lebih kaya dengan ceramide, hyaluronic acid atau peptide, dan sunscreen setiap pagi.",
            hindari: "Hindari sabun keras, eksfoliasi terlalu sering, air terlalu panas, dan produk yang membuat kulit semakin kering."
        }
    },
    "Sensitive Skin Care": {
        u01: {
            saran: "Gunakan rutinitas sederhana berupa gentle cleanser, moisturizer fragrance-free, dan sunscreen untuk kulit sensitif.",
            hindari: "Hindari parfum, scrub, alkohol tinggi, serta mencoba banyak bahan aktif secara bersamaan."
        },
        u02: {
            saran: "Gunakan cleanser lembut, moisturizer fragrance-free dengan ceramide, dan sunscreen. Tambahkan bahan aktif satu per satu jika diperlukan.",
            hindari: "Hindari parfum, scrub kasar, alkohol tinggi, dan penggunaan bahan aktif tanpa uji coba pada area kecil."
        },
        u03: {
            saran: "Fokus pada skin barrier dengan cleanser lembut, moisturizer ceramide, hydrating serum, dan sunscreen untuk kulit sensitif.",
            hindari: "Hindari menumpuk exfoliant, retinoid, dan vitamin C kuat dalam satu rutinitas jika kulit belum terbiasa."
        },
        u04: {
            saran: "Gunakan cleanser sangat lembut, moisturizer kaya ceramide, bahan hidrasi, dan sunscreen. Perkenalkan bahan aktif secara perlahan.",
            hindari: "Hindari sabun keras, parfum, scrub, air panas, serta bahan aktif kuat yang memicu kemerahan atau rasa perih."
        }
    },
    "Normal to Oily (Pore Care)": {
        u01: {
            saran: "Gunakan cleanser ringan, moisturizer gel non-comedogenic, sunscreen, dan niacinamide berkadar ringan untuk membantu minyak dan pori-pori.",
            hindari: "Hindari scrub kasar, produk terlalu berat, dan membersihkan wajah terlalu sering."
        },
        u02: {
            saran: "Gunakan cleanser ringan, moisturizer gel, sunscreen non-comedogenic, serta niacinamide atau salicylic acid sesuai kebutuhan.",
            hindari: "Hindari produk komedogenik, eksfoliasi berlebihan, dan melewatkan moisturizer karena kulit berminyak."
        },
        u03: {
            saran: "Gunakan cleanser lembut, niacinamide, moisturizer ringan dengan ceramide, dan sunscreen untuk merawat pori sekaligus menjaga hidrasi.",
            hindari: "Hindari produk terlalu mengeringkan, scrub kasar, dan penggunaan bahan aktif kuat secara berlapis."
        },
        u04: {
            saran: "Gunakan cleanser lembut, moisturizer ringan tetapi menghidrasi, niacinamide, dan sunscreen untuk menjaga pori serta elastisitas kulit.",
            hindari: "Hindari pembersih keras, produk terlalu berat, scrub kasar, dan rutinitas yang membuat kulit terasa kering."
        }
    }
};

function tampilkanRekomendasiUsiaKhusus(usia, kelompokUsia) {
    const saranUsiaKhusus = kelompokUsia === "u00"
        ? "Sebaiknya konsultasikan kebutuhan kulit secara langsung kepada dokter atau tenaga ahli. Gunakan produk yang memiliki label sesuai usia anak dan berada di bawah pengawasan orang tua."
        : "Sebaiknya konsultasikan kondisi kulit secara langsung kepada dokter atau tenaga ahli agar mendapatkan perawatan yang sesuai dengan kondisi kulit dan kesehatan secara menyeluruh.";

    const hasilContainer = document.getElementById("hasilContainer");
    hasilContainer.innerHTML = `
        <h2>Rekomendasi Berdasarkan Usia</h2>
        <div class="hasil-item">
            <strong>Usia:</strong>
            <p>${usia} tahun (${ageLabels[kelompokUsia]})</p>
        </div>
        <div class="age-guidance">
            <strong>Saran Utama:</strong>
            <p>${saranUsiaKhusus}</p>
        </div>
        <p class="result-note">Sistem tidak memberikan rekomendasi bahan aktif khusus untuk kelompok usia ini demi menjaga keamanan penggunaan skincare.</p>
    `;
    hasilContainer.dataset.ageOnly = "true";
    document.getElementById("emptyState").style.display = "none";
    hasilContainer.classList.add("active");
}

function aturFormBerdasarkanUsia() {
    const nilaiUsia = document.getElementById("age").value.trim();
    const usia = Number(nilaiUsia);
    const usiaValid = nilaiUsia !== "" && Number.isInteger(usia) && usia >= 1 && usia <= 100;
    const kelompokUsia = usiaValid ? tentukanKelompokUsia(usia) : "";
    const usiaKhusus = kelompokUsia === "u00" || kelompokUsia === "u05";
    const checkboxes = document.querySelectorAll('.gejala-box input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
        checkbox.disabled = usiaKhusus;
        if (usiaKhusus) checkbox.checked = false;
    });

    document.getElementById("analyzeButton").disabled = usiaKhusus;

    if (usiaKhusus) {
        tampilkanRekomendasiUsiaKhusus(usia, kelompokUsia);
        return;
    }

    const hasilContainer = document.getElementById("hasilContainer");
    if (hasilContainer.dataset.ageOnly === "true") {
        hasilContainer.classList.remove("active");
        hasilContainer.dataset.ageOnly = "false";
        document.getElementById("emptyState").style.display = "grid";
    }
}

function analisisSkincare() {
    const nilaiUsia = document.getElementById("age").value.trim();
    const usia = Number(nilaiUsia);
    const usiaValid = nilaiUsia !== "" && Number.isInteger(usia) && usia >= 1 && usia <= 100;
    const kelompokUsia = usiaValid ? tentukanKelompokUsia(usia) : "";
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

    if (!usiaValid) {
        document.getElementById("hasilContainer").innerHTML = `
            <h2>Hasil Analisis Skincare</h2>
            <p class="warning">Silakan masukkan usia yang valid antara 1 sampai 100 tahun.</p>
        `;
        document.getElementById("emptyState").style.display = "none";
        document.getElementById("hasilContainer").classList.add("active");
        return;
    }

    if (kelompokUsia === "u00" || kelompokUsia === "u05") {
        tampilkanRekomendasiUsiaKhusus(usia, kelompokUsia);
        return;
    }

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
            cf: r01
        };
    }

    if (g02 && g04) {
        let cf1 = 1.0 * g02;
        let cf2 = 0.7 * g04;

        let r02 = combineCF(cf1, cf2);

        hasil["Dry & Brightening"] = {
            cf: r02
        };
    }

    if (g05 && g03) {
        let cf1 = 1.0 * g05;
        let cf2 = 0.7 * g03;

        let r03 = combineCF(cf1, cf2);

        hasil["Sensitive Skin Care"] = {
            cf: r03
        };
    }

    if (g01 && g06) {
        let cf1 = 0.8 * g01;
        let cf2 = 0.9 * g06;

        let r04 = combineCF(cf1, cf2);

        hasil["Normal to Oily (Pore Care)"] = {
            cf: r04
        };
    }

    if (Object.keys(hasil).length === 0) {
        document.getElementById("hasilContainer").innerHTML = `
            <h2>Hasil Analisis Skincare</h2>
            <div class="hasil-item">
                <strong>Usia:</strong>
                <p>${usia} tahun (${ageLabels[kelompokUsia]})</p>
            </div>
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

    const terbaik = Object.keys(hasil).reduce((a, b) => hasil[a].cf >= hasil[b].cf ? a : b);
    const persen = (hasil[terbaik].cf * 100).toFixed(2);
    const rekomendasi = rekomendasiUsia[terbaik][kelompokUsia];

    let htmlHasil = `
        <h2>Hasil Analisis Skincare</h2>

        <div class="hasil-item">
            <strong>Usia:</strong>
            <p>${usia} tahun (${ageLabels[kelompokUsia]})</p>
        </div>

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
            <p>${rekomendasi.saran}</p>
        </div>

        <div class="hasil-item">
            <strong>Hindari:</strong>
            <p>${rekomendasi.hindari}</p>
        </div>

        <p class="result-note">Rekomendasi ini merupakan panduan awal. Hentikan penggunaan jika muncul iritasi dan konsultasikan dengan tenaga profesional jika keluhan berlanjut.</p>
    `;

    document.getElementById("hasilContainer").innerHTML = htmlHasil;
    document.querySelector(".progress-fill").style.width = `${persen}%`;
    document.getElementById("emptyState").style.display = "none";
    document.getElementById("hasilContainer").classList.add("active");
}

function resetForm() {
    document.getElementById("consultationForm").reset();
    aturFormBerdasarkanUsia();
    document.getElementById("emptyState").style.display = "grid";
    document.getElementById("hasilContainer").classList.remove("active");
}

document.addEventListener("DOMContentLoaded", () => {
    const ageInput = document.getElementById("age");
    let ageInputTimer;

    ageInput.addEventListener("input", () => {
        clearTimeout(ageInputTimer);
        ageInputTimer = setTimeout(aturFormBerdasarkanUsia, 700);
    });

    ageInput.addEventListener("change", () => {
        clearTimeout(ageInputTimer);
        aturFormBerdasarkanUsia();
    });

    document.getElementById("analyzeButton").addEventListener("click", analisisSkincare);
    document.getElementById("resetButton").addEventListener("click", (event) => {
        event.preventDefault();
        resetForm();
    });
});
