document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cardContainer");
  const pagination = document.getElementById("pagination");
  const filterBtns = document.querySelectorAll("[data-divisi]");

  let anggota = [];
  let currentPage = 1;
  const perPage = 8; // ubah sesuai selera
  let currentDivisi = "ALL";

  fetch("/data/anggota.json")
    .then(res => res.json())
    .then(data => {
      anggota = data;
      render();
    });

  function filteredData() {
    if (currentDivisi === "ALL") return anggota;
    return anggota.filter(a => a.divisi === currentDivisi);
  }

  function renderCards(data) {
    container.innerHTML = "";
    data.forEach(a => {
      container.innerHTML += `
        <div class="col-md-4 py-2 mb-4 d-flex justify-content-center">
          <div class="card text-center">
            <img src="${a.foto}" class="card-img-top">
            <div class="card-body">
              <h6 class="fw-bold">${a.nama}</h6>
              <p class="mb-1">${a.jabatan}</p>
              <span class="badge bg-primary">${a.divisi}</span>
            </div>
          </div>
        </div>
      `;
    });
  }

  function renderPagination(total) {
    pagination.innerHTML = "";
    const pages = Math.ceil(total / perPage);

    for (let i = 1; i <= pages; i++) {
      pagination.innerHTML += `
        <button class="page-btn ${i === currentPage ? "active" : ""}" data-page="${i}">
          ${i}
        </button>
      `;
    }

    document.querySelectorAll(".page-btn").forEach(btn => {
      btn.onclick = () => {
        currentPage = +btn.dataset.page;
        render();
      };
    });
  }

  function render() {
    const data = filteredData();
    const start = (currentPage - 1) * perPage;
    renderCards(data.slice(start, start + perPage));
    renderPagination(data.length);
  }

  filterBtns.forEach(btn => {
    btn.onclick = () => {
      currentDivisi = btn.dataset.divisi;
      currentPage = 1;
      render();
    };
  });
});
