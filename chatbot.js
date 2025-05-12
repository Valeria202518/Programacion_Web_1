function toggleChatbot() {
  var chatbot = document.getElementById("chatbot");
  chatbot.style.display = (chatbot.style.display === "none") ? "flex" : "none";
}

function appendMessage(sender, text) {
  const chatlog = document.getElementById("chatlog");
  const message = document.createElement("div");
  message.textContent = sender + ": " + text;
  chatlog.appendChild(message);
  chatlog.scrollTop = chatlog.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  appendMessage("Tú", text);
  input.value = "";

  setTimeout(() => {
    const response = getBotResponse(text.toLowerCase());
    appendMessage("Bot", response);
  }, 500);
}

function getBotResponse(input) {
  if (input.includes("horario")) {
    return "Abrimos todos los días de 12:00 p.m. a 10:00 p.m.";
  } else if (input.includes("menú") || input.includes("carta")) {
    return "Puedes consultar el menú en la sección 'Menú' o pedir sugerencias.";
  } else if (input.includes("recomendación") || input.includes("sugerencia")) {
    return "Te recomendamos probar nuestro rollo 'Dragón Especial' 🍣";
  } else if (input.includes("ubicación") || input.includes("dónde están")) {
    return "Tenemos sucursales en CDMX, Querétaro, Aguascalientes, y más.";
  } else if (input.includes("promoción") || input.includes("descuento")) {
    return "Hoy tenemos 2x1 en rollos seleccionados de 2 a 6 p.m. ¡No te lo pierdas!";
  } else {
    return "Lo siento, ¿puedes repetirlo de otra forma?";
  }
}

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}
