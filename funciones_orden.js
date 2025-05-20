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
function guardar() {
  const domicilio = document.getElementById('domicilioDatos');
  const sucursal = document.getElementById('sucursalDatos');

  let bandera = 0;
  let doc = new jsPDF();
  doc.setFontSize(9);
  let y = 20;

  const lineHeight = 10;
  const margin = 20;
  const pageHeight = doc.internal.pageSize.height;

  function agregarTexto(texto) {
    if (y + lineHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(margin, y, texto);
    y += lineHeight;
  }

  agregarTexto("=== Datos del cliente ===");

  const nom = document.forms["formSushi"].elements[0].value;
  const tel = document.forms["formSushi"].elements[1].value;
  const email = document.forms["formSushi"].elements[2].value;
  const fecha = document.forms["formSushi"].elements[3].value;

  agregarTexto(`Nombre: ${nom}`);
  agregarTexto(`Teléfono: ${tel}`);
  agregarTexto(`Email: ${email}`);
  agregarTexto(`Fecha entrega: ${fecha}`);
  agregarTexto("");
  agregarTexto("=== Información de entrega ===");

  if (domicilio.style.display === 'block') {
    bandera = 1;
    const paisSelect = document.getElementById("pais").value;
    const casa = document.getElementById("numero-casa").value;
    const calle = document.getElementById("calle").value;
    const colonia = document.getElementById("colonia").value;
    const CURP = document.getElementById("CURP").value;
    const cp = document.getElementById("cp").value;

    agregarTexto(`Método de envío: A domicilio`);
    agregarTexto(`Estado: ${paisSelect}`);
    agregarTexto(`Número de casa: ${casa}`);
    agregarTexto(`Calle: ${calle}`);
    agregarTexto(`Colonia: ${colonia}`);
    agregarTexto(`CURP: ${CURP}`);
    agregarTexto(`Código postal: ${cp}`);
    agregarTexto("");
  } else if (sucursal.style.display === 'block') {
    bandera = 1;
    const sucursalSeleccionada = document.querySelector('select[name="sucursal"]').value;
    agregarTexto(`Método de envío: A sucursal`);
    agregarTexto(`Sucursal para recoger: ${sucursalSeleccionada}`);
    agregarTexto("");
  } else {
    alert("No has seleccionado un método de entrega :( ");
    return;
  }

  agregarTexto("=== Pedido ===");

  const filas = document.querySelectorAll("#carrito tbody tr");
  let total = 0;
  filas.forEach(fila => {
    const platillo = fila.cells[0].textContent;
    const nombrePlatillo = fila.cells[1].textContent;
    const cantidad = parseInt(fila.cells[2].textContent, 10);
    const costo = parseFloat(fila.cells[3].textContent.replace('$', ''));

    agregarTexto(`Platillo: ${platillo}`);
    agregarTexto(`Nombre: ${nombrePlatillo}`);
    agregarTexto(`Cantidad: ${cantidad}`);
    agregarTexto(`Costo: $${costo.toFixed(2)}`);
    agregarTexto("");

    total += costo * cantidad;
  });

  agregarTexto(`Total del pedido: $${total.toFixed(2)}`);
  agregarTexto("");

  agregarTexto("=== Método de pago ===");

  const metodoPago = document.querySelector('select[name="metodoPago"]').value;
  const tiempo = document.getElementById("tiempoEstimado").value;

  agregarTexto(`Método de pago: ${metodoPago}`);

  if (metodoPago === "tarjeta") {
    const tipTarjeta = document.querySelector('select[name="tipoTarjeta"]').value;
    const numTarjeta = document.getElementById("num_tarjeta").value;
    const cvv = document.getElementById("pass").value;

    agregarTexto(`Tipo de tarjeta: ${tipTarjeta}`);
    agregarTexto(`Número de tarjeta: ${numTarjeta}`);
    agregarTexto(`CVV: ${cvv}`);
    agregarTexto(`Tiempo estimado: 10 min`);
  } else if (metodoPago === "efectivo") {
    agregarTexto(`Tiempo estimado: 10 min`);
  } else {
    alert('Selecciona un método de pago');
    bandera = 0;
  }

  if (bandera !== 0) {
    doc.save("orden.pdf");
  } else {
    alert("No se puede generar la orden. Vuelve a intentar :)");
  }
}
