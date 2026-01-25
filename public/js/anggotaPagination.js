document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cardContainer");
  const pagination = document.getElementById("pagination");

  let anggota = [];
  let currentPage = 1;
  const perPage = 8;

  const currentDivisi = window.location.pathname
    .split("/")
    .filter(Boolean)
    .pop();

  fetch("/data/anggota.json")
    .then((res) => res.json())
    .then((data) => {
      anggota = data;
      render();
    });

  function filteredData() {
    return anggota.filter(
      (a) => a.divisi.toLowerCase() === currentDivisi.toLowerCase(),
    );
  }

  function renderCards(data) {
    container.innerHTML = "";
    data.forEach((a) => {
      container.innerHTML += `

         <div class="col-md-3">
            <div class=" accent accent-2 rounded-4 shadow-sm mb-4 overflow-hidden">
              <!-- Kontainer Gambar dengan Overlay -->
              <div class="img-gradient-container">
                <img src="/image/ketua.png" alt="Pengurus 1">
              </div>

              <div class="p-3 text-left">
                <h5 class="fw-bold mb-1">${a.nama}</h5>
                <p class="text-primary fw-bold mb-0">${a.jabatan}</p>
                <i class="text-secondary">"${a.quote}"</i>
              </div>
            </div>
          </div>

      `;
    });
  }

  function renderPagination(total) {
    pagination.innerHTML = "";
    if (total <= perPage) return;

    const pages = Math.ceil(total / perPage);

    // Gunakan struktur <ul> agar gaya Bootstrap otomatis teraplikasi
    let paginationHTML = `<ul class="pagination pagination-md shadow-sm">`;

    // Tombol Previous
    paginationHTML += `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <button class="page-link prev" aria-label="Previous">&laquo;</button>
    </li>`;

    // Tombol Angka
    for (let i = 1; i <= pages; i++) {
      paginationHTML += `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <button class="page-link" data-page="${i}">${i}</button>
      </li>`;
    }

    // Tombol Next
    paginationHTML += `
    <li class="page-item ${currentPage === pages ? "disabled" : ""}">
      <button class="page-link next" aria-label="Next">&raquo;</button>
    </li>`;

    paginationHTML += `</ul>`;
    pagination.innerHTML = paginationHTML;

    // Event Listener (Selector diubah ke .page-link)
    pagination.querySelectorAll(".page-link[data-page]").forEach((btn) => {
      btn.onclick = () => {
        currentPage = +btn.dataset.page;
        render();
        window.scrollTo(0, 0); // Opsional: scroll ke atas setelah ganti halaman
      };
    });

    const prevBtn = pagination.querySelector(".prev");
    if (prevBtn)
      prevBtn.onclick = () => {
        if (currentPage > 1) {
          currentPage--;
          render();
        }
      };

    const nextBtn = pagination.querySelector(".next");
    if (nextBtn)
      nextBtn.onclick = () => {
        if (currentPage < pages) {
          currentPage++;
          render();
        }
      };
  }

  function render() {
    const data = filteredData();
    const start = (currentPage - 1) * perPage;
    renderCards(data.slice(start, start + perPage));
    renderPagination(data.length);
  }
});
