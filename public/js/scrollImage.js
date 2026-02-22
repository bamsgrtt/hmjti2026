
        // JavaScript untuk mendeteksi scroll
        const img = document.getElementById("scroll/image");

        window.addEventListener("scroll", () => {
          if (window.scrollY > 50) {
            // Jika sudah di-scroll lebih dari 50px
            img.classList.add("scrolled"); // Tambahkan kelas
          } else {
            img.classList.remove("scrolled"); // Hapus kelas
          }
        });