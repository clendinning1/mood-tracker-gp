const modal = document.getElementById("menu");
const button = document.getElementById("toggleBtn")
function menuToggle() {
    console.log("Test!")
    modal.classList.toggle("display-toggle")
}
button.addEventListener("click", menuToggle)