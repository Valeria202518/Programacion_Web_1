function togglePago() {
  const metodo = document.getElementById('metodoPago').value;
  document.getElementById('tipoTarjeta').style.display = metodo === 'tarjeta' ? 'block' : 'none';
}

function actualizarTiempo() {
  const filas = document.querySelectorAll('#carrito tbody tr');
  let totalCantidad = 0;
  filas.forEach(fila => {
    totalCantidad += parseInt(fila.children[1].innerText);
  });
  const tiempo = 10 + (totalCantidad * 2);
  document.getElementById('tiempoEstimado').innerText = `Tiempo estimado: ${tiempo} minutos`;
}

document.getElementById('formSushi').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('¡Orden enviada!');
});

let carrito = [];

function agregarAlCarrito() {
  const platillo = document.getElementById('platillo').value;
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const especifico = document.getElementById('Especifico').value;
  const costoUnitario = parseFloat(document.getElementById('costo').value);

  if (!especifico || isNaN(cantidad) || isNaN(costoUnitario)) {
    alert("Por favor llena todos los campos del platillo.");
    return;
  }

  const costoTotal = cantidad * costoUnitario;

  const item = {
    platillo,
    especifico,
    cantidad,
    costoUnitario,
    costoTotal
  };

  carrito.push(item);
  actualizarTabla();
}

function actualizarTabla() {
  const tbody = document.querySelector('#carrito tbody');
  tbody.innerHTML = '';

  let total = 0;

  carrito.forEach((item, index) => {
    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td>${item.platillo}</td>
      <td>${item.especifico}</td>
      <td>${item.cantidad}</td>
      <td>$${item.costoTotal.toFixed(2)}</td>
      <td><button type="button" onclick="eliminarDelCarrito(${index})">Eliminar</button></td>
    `;

    tbody.appendChild(fila);
    total += item.costoTotal;
  });

  document.getElementById('totalPedido').textContent = `Total: $${total.toFixed(2)}`;
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarTabla();
}

function toggleEntrega(tipo) {
  const domicilio = document.getElementById('domicilioDatos');
  const sucursal = document.getElementById('sucursalDatos');

  domicilio.style.display = tipo === 'domicilio' ? 'block' : 'none';
  sucursal.style.display = tipo === 'recoger' ? 'block' : 'none';
}

function togglePago() {
  const metodo = document.getElementById('metodoPago').value;
  const tarjeta = document.getElementById('tipoTarjeta');
  tarjeta.style.display = metodo === 'tarjeta' ? 'block' : 'none';
}
