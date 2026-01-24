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

