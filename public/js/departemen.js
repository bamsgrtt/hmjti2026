// departemen.js
const buttons = document.querySelectorAll(".btn-nav");
const cards = document.querySelectorAll("[data-divisi]:not(.btn-nav)");

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault(); 

        const filterValue = button.dataset.divisi.toLowerCase(); // Ambil dari tombol

        buttons.forEach(btn => btn.classList.remove("active-nav"));
        button.classList.add("active-nav");

        cards.forEach(card => {
            const cardValue = card.dataset.divisi.toLowerCase(); // Ambil dari database (EJS) [cite: 7]
            
            if (filterValue === "semua" || cardValue === filterValue) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});