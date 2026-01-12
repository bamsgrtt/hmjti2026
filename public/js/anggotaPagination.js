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
    .then(res => res.json())
    .then(data => {
      anggota = data;
      render();
    });

  function filteredData() {
    return anggota.filter(
      a => a.divisi.toLowerCase() === currentDivisi.toLowerCase()
    );
  }

  function renderCards(data) {
    container.innerHTML = "";
    data.forEach(a => {
      container.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-4 mb-4 d-flex justify-content-center">
          <div class="card text-center">
            <div class="card-img-wrapper">
              <img src="${a.foto}" class="card-img-top">
            </div>
            <div class="card-body">
              <h6>${a.nama}</h6>
              <p>${a.jabatan}</p>
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

    pagination.innerHTML += `<button class="page-btn prev">&laquo;</button>`;

    for (let i = 1; i <= pages; i++) {
      pagination.innerHTML += `
        <button class="page-btn ${i === currentPage ? "active" : ""}" data-page="${i}">
          ${i}
        </button>
      `;
    }

    pagination.innerHTML += `<button class="page-btn next">&raquo;</button>`;

    pagination.querySelectorAll("[data-page]").forEach(btn => {
      btn.onclick = () => {
        currentPage = +btn.dataset.page;
        render();
      };
    });

    pagination.querySelector(".prev").onclick = () => {
      if (currentPage > 1) currentPage--, render();
    };

    pagination.querySelector(".next").onclick = () => {
      if (currentPage < pages) currentPage++, render();
    };
  }

  function render() {
    const data = filteredData();
    const start = (currentPage - 1) * perPage;
    renderCards(data.slice(start, start + perPage));
    renderPagination(data.length);
  }
});
