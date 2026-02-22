document.addEventListener("DOMContentLoaded", init);

function init() {
  const state = {
    anggota: [],
    currentPage: 1,
    perPage: 8,
    currentDivisi: "Semua",
  };

  
  const elements = {
    cardContainer: document.getElementById("cardContainer"),
    pagination: document.getElementById("pagination"),
    divisiButtons: document.getElementById("divisiButtons"),
  };

  fetch("/data/anggota.json")
    .then(res => res.json())
    .then(data => {
      state.anggota = data;
      generateDivisiButtons(state, elements);
      render(state, elements);
    })
    .catch(err => {
      console.error("Gagal load data:", err);
    });

      elements.pagination.addEventListener("click", (e) => {
    if (!e.target.classList.contains("page-link")) return;
    
    const pages = Math.ceil(getFilteredData(state).length / state.perPage);
      if (e.target.classList.contains("prev") && state.currentPage > 1) {
        state.currentPage--;
      }

      if (e.target.classList.contains("next") && state.currentPage < pages) {
        state.currentPage++;
      }

      if (e.target.dataset.page) {
        state.currentPage = Number(e.target.dataset.page);
      }

      render(state, elements);
      window.scrollTo(0, 0);
    });

}

function generateDivisiButtons(state, elements) {
  const divisiUnik = [...new Set(state.anggota.map(a => a.divisi))];

  let html = `
    <button class="btn btn-nav active" data-divisi="Semua">
      Semua
    </button>
  `;

  divisiUnik.forEach(div => {
    html += `
      <button class="btn btn-nav" data-divisi="${div}">
        ${div}
      </button>
    `;
  });

  elements.divisiButtons.innerHTML = html;

  elements.divisiButtons.addEventListener("click", (e) => {
    if (!e.target.matches("button")) return;

    const selected = e.target.dataset.divisi;

    state.currentDivisi = selected;
    state.currentPage = 1;

    elements.divisiButtons
      .querySelectorAll("button")
      .forEach(btn => btn.classList.remove("active"));

    e.target.classList.add("active");

    render(state, elements);
  });
}

function getFilteredData(state) {
  if (state.currentDivisi === "Semua") return state.anggota;
  return state.anggota.filter(a => a.divisi === state.currentDivisi);
}

function render(state, elements) {
  const data = getFilteredData(state);
  const start = (state.currentPage - 1) * state.perPage;
  const paginatedData = data.slice(start, start + state.perPage);

  renderCards(paginatedData, elements);
  renderPagination(data.length, state, elements);
}

function renderCards(data, elements) {
  elements.cardContainer.innerHTML = data.map(a => `
          <div class="col-md-3 col-sm-6" data-aos="fade-up">
            <div class=" accent accent-2 rounded-4 shadow-sm mb-4 overflow-hidden">
              <!-- Kontainer Gambar dengan Overlay -->
              <div class="img-gradient-container">
                <img src="${a.foto}" alt="${a.nama}">
              </div>
              <div class="p-3 text-left">
                <h5 class="fw-bold mb-1">${a.nama}</h5>
                <p class="text-primary fw-bold mb-0">${a.jabatan}</p>
               ${a.quote ? `<i class="text-secondary">"${a.quote}"</i>` : ""}
              </div>
            </div>
          </div>
  `).join("");
   AOS.refresh();
}



