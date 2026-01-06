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
        <div class="col-12 col-sm-6 col-md-6 col-lg-4 py-3 mb-4 d-flex justify-content-center">
          <div class="card text-center">
            <div class="card-img-wrapper">
              <img src="${a.foto}" class="card-img-top" alt="${a.nama}">
            </div>
            <div class="card-body">
              <h6 class="fw-bold">${a.nama}</h6>
              <p class="mb-1" style="font-size: 14px;">${a.jabatan}</p>
            </div>
            <div class="card-icon">
              <a href="${a.linkedin}" target="_blank"><i class="bi bi-linkedin"></i></a>
              <a href="${a.instagram}" target="_blank"><i class="bi bi-instagram"></i></a>
              <a href="${a.github}" target="_blank"><i class="bi bi-github"></i></a>
            </div>
            
              <span class="btn text-dark fw-bold p-2 mb-4 m-2 border" style="border-radius: 15px; background: #ffffff;">${a.divisi}</span>
          </div>
        </div>
      `;
    });
  }

  function renderPagination(total) {
    pagination.innerHTML = "";

    if (total <= perPage) return;
    const pages = Math.ceil(total / perPage);

    // Prev Button
    pagination.innerHTML += `
      <button class="page-btn page-link prev${currentPage === 1 ? "disabled" : ""}">
      &laquo; Prev
      </button>
    `;

  

    for (let i = 1; i <= pages; i++) {
      pagination.innerHTML += `
        <button class="page-btn page-link ${i === currentPage ? "active" : ""}" data-page="${i}">
          ${i}
        </button>
      `;
    }

     // Next Button
    pagination.innerHTML += `
      <button class="page-btn page-link next${currentPage === pages ? "disabled" : ""}">
      Next &raquo;
      </button>
    `;


    document.querySelectorAll(".page-btn").forEach(btn => {
      btn.onclick = () => {
        currentPage = +btn.dataset.page;
        render();
      };
    });

     // Prev Event 
  const prevBtn = pagination.querySelector(".prev");
  if (prevBtn) {
    prevBtn.onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        render();
      }
    };
  }

  // Next Envent 
  const nextBtn = pagination.querySelector(".next");
  if (nextBtn) {
    nextBtn.onclick = () => {
      if (currentPage < pages) {
        currentPage++;
        render();
      }
    };
  }
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
