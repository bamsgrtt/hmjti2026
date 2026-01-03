
      const backToTopButton = document.getElementById("backToTop");

      // Menampilkan atau menyembunyikan tombol berdasarkan posisi scroll
      window.addEventListener("scroll", () => {
        if (window.scrollY > 200) { // Jika pengguna menggulir lebih dari 200px
          backToTopButton.classList.add("show");
          backToTopButton.classList.remove("hide");
        } else {
          backToTopButton.classList.add("hide");
          backToTopButton.classList.remove("show");
        }
      });

      // Fungsi untuk kembali ke atas
      backToTopButton.addEventListener("click", () => {
        window.scrollTo({
          top: 0,           // Gulir ke posisi paling atas
          behavior: "smooth" // Gulir dengan animasi halus
        });
      });
