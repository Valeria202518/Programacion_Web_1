const preguntas = [
  {
    pregunta: "¿Cuál es el tipo de dato para números enteros en C?",
    opciones: ["float", "int", "char", "double"],
    respuesta: "int"
  },
  {
    pregunta: "¿Qué función se usa para imprimir en pantalla?",
    opciones: ["scanf", "cout", "print", "printf"],
    respuesta: "printf"
  },
  {
    pregunta: "¿Qué símbolo se utiliza para comentarios de una línea?",
    opciones: ["//", "/*", "#", "<!--"],
    respuesta: "//"
  },
  {
    pregunta: "¿Cuál es el operador de asignación?",
    opciones: ["==", "=", "+=", ":"],
    respuesta: "="
  },
  {
    pregunta: "¿Qué instrucción se usa para leer datos?",
    opciones: ["get", "scanf", "cin", "input"],
    respuesta: "scanf"
  },
  {
    pregunta: "¿Qué tipo de dato almacena un solo carácter?",
    opciones: ["char", "string", "int", "byte"],
    respuesta: "char"
  },
  {
    pregunta: "¿Cuál es la función principal de todo programa en C?",
    opciones: ["start()", "main()", "inicio()", "begin()"],
    respuesta: "main()"
  },
  {
    pregunta: "¿Qué extensión tienen los archivos fuente en C?",
    opciones: [".cpp", ".py", ".c", ".java"],
    respuesta: ".c"
  },
  {
    pregunta: "¿Qué palabra clave se usa para declarar constantes?",
    opciones: ["static", "const", "final", "define"],
    respuesta: "const"
  },
  {
    pregunta: "¿Qué operador se usa para incrementar?",
    opciones: ["+", "++", "+=", "--"],
    respuesta: "++"
  }
];

let calificaciones = [];

document.addEventListener("DOMContentLoaded", () => {
  const questionsContainer = document.getElementById("questions");

  preguntas.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `<p><b>${index + 1}. ${q.pregunta}</b></p>` +
      q.opciones.map(opt =>
        `<label><input type="radio" name="q${index}" value="${opt}"> ${opt}</label><br>`
      ).join("");
    questionsContainer.appendChild(div);
  });
});

function calificar() {
  let score = 0;
  calificaciones = [];

  preguntas.forEach((q, i) => {
    const seleccion = document.querySelector(`input[name="q${i}"]:checked`);
    if (seleccion && seleccion.value === q.respuesta) {
      score++;
      calificaciones.push(1);
    } else {
      calificaciones.push(0);
    }
  });

  document.getElementById("score").textContent = `Obtuviste ${score} de 10 puntos.`;
  generarGrafico();
}

function generarGrafico() {
  const ctx = document.getElementById('resultChart').getContext('2d');
  if (window.myChart) window.myChart.destroy();

  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: preguntas.map((_, i) => `P${i + 1}`),
      datasets: [{
        label: 'Puntaje por pregunta',
        data: calificaciones,
        backgroundColor: calificaciones.map(p => p === 1 ? '#1be1d8' : '#1be1d8')
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true, max: 1 }
      }
    }
  });
}

function descargar() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Resultado del diagnóstico - Lenguaje C", 10, 10);
  let y = 20;

  preguntas.forEach((q, i) => {
    doc.setFontSize(10);
    doc.text(`${i + 1}. ${q.pregunta}`, 10, y);
    doc.text(`Puntaje: ${calificaciones[i]}`, 180, y);
    y += 6;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.setFontSize(14);
  doc.text(`Puntaje Total: ${calificaciones.reduce((a, b) => a + b)} / 15`, 10, y + 10);
  doc.save("resultado_diagnostico_C.pdf");
}
