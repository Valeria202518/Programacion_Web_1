function metodoPagof() {
  let metodo = document.getElementById("metodoPago").value;
  let tarjeta = document.getElementById("metodoPagoTarjeta");
  if (metodo === "tarjeta") {
    tarjeta.style.display = "block";
  } else {
    tarjeta.style.display = "none";
  }
}

function depo() {
    let numPersonas = document.getElementById("numero").value; 
    numPersonas = parseFloat(numPersonas);

    let depositoElement = document.getElementById("deposito");

    if ( numPersonas >= 2 && numPersonas <= 15) {
        let monto = numPersonas * 50; 
        depositoElement.textContent = monto + " MXN"; 
    } else {
        depositoElement.textContent = "0 MXN"; 
    }
}

function Enviar() {

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

  let fecha = document.getElementById("fecha").value;
  let nombre = document.getElementById("nombre").value;
  let hora = document.getElementById("hora").value;
  let telefono = document.getElementById("telefono").value;
  let metodoPago = document.getElementById("metodoPago").value;
  let deposito = document.getElementById("deposito").textContent;

  if (!fecha || !nombre || !hora || !telefono || deposito==="") {
    alert("Por favor, completa todos los campos obligatorios y asegúrate de tener al menos 2 personas.");
    return; 
  }

  agregarTexto(`Fecha: ${fecha}`);
  agregarTexto(`Nombre: ${nombre}`);
  agregarTexto(`Hora: ${hora}`);
  agregarTexto(`Teléfono: ${telefono}`);
  agregarTexto(`Depósito: ${deposito}`);
  agregarTexto(`Método de pago: ${metodoPago}`);

  if (metodoPago === "tarjeta") {
    agregarTexto("-- Datos de tarjeta --");
    y++;
    let tipoTarjeta = document.getElementById("TipoTarjeta").value;
    let numTarjeta = document.getElementById("numTarjeta").value;
    agregarTexto(`Tipo de tarjeta: ${tipoTarjeta}`);
    agregarTexto(`Número de tarjeta: ${numTarjeta}`);
    agregarTexto("CVV: ***");
  }

  let comentarios = document.getElementById("comentarios").value;

  agregarTexto(`Comentarios ${comentarios}`);
  agregarTexto("--- Reservación :) ---");

  doc.save('reservacion.pdf');
}
