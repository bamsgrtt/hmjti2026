// Card anggota saja
const cards = document.querySelectorAll(".pengurus [data-divisi]");

// Tombol filter
const buttons = document.querySelectorAll(".btn-nav");


// Fungsi filter
function filterDivisi(divisiDipilih){

    cards.forEach(card => {

        const divisiCard = card.getAttribute("data-divisi");

        if(divisiDipilih === "Semua" || divisiCard === divisiDipilih){

            card.style.display = "block";

        }else{

            card.style.display = "none";

        }

    });


    // Active tombol
    buttons.forEach(btn => {

        btn.classList.remove("active-nav");

        if(btn.dataset.divisi === divisiDipilih){

            btn.classList.add("active-nav");

        }

    });

}



// =====================
// Klik tombol manual
// =====================

buttons.forEach(btn => {

    btn.addEventListener("click", function(e){

        e.preventDefault();

        const divisi = this.dataset.divisi;

        filterDivisi(divisi);

    });

});



// =====================
// Dari URL
// =====================

const urlParams = new URLSearchParams(window.location.search);

const divisiURL = urlParams.get("divisi");

if(divisiURL){

    filterDivisi(divisiURL);

}