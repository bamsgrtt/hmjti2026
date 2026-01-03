let slider = document.querySelector(".slider .list");
let items = document.querySelectorAll(".slider .list .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let dots = document.querySelectorAll(".slider .dots li");

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function () {
  active = active + 1 <= lengthItems ? active + 1 : 0;
  reloadSlider();
};
prev.onclick = function () {
  active = active - 1 >= 0 ? active - 1 : lengthItems;
  reloadSlider();
};
let refreshInterval = setInterval(() => {
  next.click();
}, 3000);
function reloadSlider() {
  slider.style.left = -items[active].offsetLeft + "px";
  //
  let last_active_dot = document.querySelector(".slider .dots li.active");
  last_active_dot.classList.remove("active");
  dots[active].classList.add("active");

  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    next.click();
  }, 3000);
}

dots.forEach((li, key) => {
  li.addEventListener("click", () => {
    active = key;
    reloadSlider();
  });
});
window.onresize = function (event) {
  reloadSlider();
};


        const animatedElements = document.querySelectorAll(".animate");

        const handleScroll = () => {
          animatedElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
              el.classList.add("visible");
            }
          });
        };

        window.addEventListener("scroll", handleScroll);

        // Trigger scroll event on load to check visibility
        handleScroll();

        // Fungsi untuk mendeteksi elemen di viewport
        function handleScrollAnimations() {
          const animatedElements = document.querySelectorAll(".scroll-animation");
          animatedElements.forEach((element) => {
            const elementPosition = element.getBoundingClientRect();
            const isVisible = elementPosition.top < window.innerHeight && elementPosition.bottom >= 0;

            if (isVisible) {
              element.classList.add("visible");
            }
          });
        }

        // Event listener untuk scroll
        window.addEventListener("scroll", handleScrollAnimations);

        // Jalankan fungsi saat pertama kali laman dimuat
        document.addEventListener("DOMContentLoaded", handleScrollAnimations);
