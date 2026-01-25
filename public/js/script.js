    const toggleBtn = document.getElementById("themeToggle");

    function setTheme(theme) {
      document.body.classList.toggle("light-mode", theme === "light");

      toggleBtn.innerHTML =
        theme === "light"
          ? `<i class="bi bi-moon"></i>`
          : `<i class="bi bi-sun"></i>`;

      localStorage.setItem("theme", theme);
    }

    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);

    toggleBtn.addEventListener("click", () => {
      const isLight = document.body.classList.contains("light-mode");
      setTheme(isLight ? "dark" : "light");
    });

  document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.btn-nav');
    const contentItems = document.querySelectorAll('.content-item');

    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();

        // 1. Ambil target ID dari atribut data-target
        const targetId = this.getAttribute('data-target');

        // 2. Hapus class 'active-nav' dari semua tombol
        navLinks.forEach(nav => nav.classList.remove('active-nav'));
        
        // 3. Tambahkan class 'active-nav' ke tombol yang diklik
        this.classList.add('active-nav');

        // 4. Sembunyikan semua konten dan tampilkan yang sesuai target
        contentItems.forEach(item => {
          if (item.id === targetId) {
            item.classList.remove('d-none'); // Tampilkan
          } else {
            item.classList.add('d-none');    // Sembunyikan
          }
        });
      });
    });
  });
