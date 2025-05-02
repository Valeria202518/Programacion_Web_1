

function toggleMenu() {
    var menu = document.getElementById("menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

const input = document.getElementById('numero');

input.addEventListener('mouseenter', function() {
    alert("Máximo 15 personas");
});

const horaInput = document.getElementById('hora');

horaInput.addEventListener('change', function () {
  const valor = this.value;
  if (valor < "10:00" || valor > "18:00") {
    alert("Por favor selecciona una hora entre las 10:00 y las 18:00");
    this.value = "10:00"; // Restablece a valor permitido si es inválido
  }
});