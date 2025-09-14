import { responder } from "./chatBot/funcionesChatbot.js";

const botonChat = document.getElementById("botonChat");
const chatBox = document.getElementById("chatBox");
const input = document.getElementById("inputMensaje");
const mensajes = document.getElementById("mensajes");
const productosTodos = document.getElementById("productos");
const btnMenu = document.getElementById("btnMenu");
const menuNav = document.getElementById("menuNav");
const formulario = document.querySelector('#form');
const buttonMailto = document.querySelector('#mailto');

//Llamar API local
try {
  fetch("https://raw.githubusercontent.com/alexisrr11/APIferre/refs/heads/main/productos.json")
    .then(respuesta => respuesta.json())
    .then(productos => {
      renderProductos(productos);
      window.productos = productos;
    })
} catch {
  error => console.error("Error al cargar los productos", error);
}

function renderProductos(array) {
  productosTodos.innerHTML = "";
  array.forEach(e => {
    const nuevoElemento = document.createElement("div");
    nuevoElemento.classList.add("p-4", "border", "rounded", "mb-4", "bg-white", "shadow");

    nuevoElemento.innerHTML = `
      <img src="${e.img}" alt="${e.nombre}" class="w-full rounded mb-4">
      <h3 class="text-xl font-semibold">${e.nombre}</h3>
      <p class="text-sm mb-2">${e.descripcion}</p>
      <p class="font-bold">$${e.precio}</p>
    `;

    productosTodos.appendChild(nuevoElemento);
  });
}

//Renderizado del chatBot

botonChat.addEventListener("click", () => {
  chatBox.classList.toggle("hidden");
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && input.value.trim()) {
    const userMsg = input.value;
    setTimeout(() => {
      mensajes.innerHTML += `<div><strong>Vos:</strong> ${userMsg}</div>`;
      mensajes.innerHTML += `<div><strong>Bot:</strong> ${responder(userMsg)}</div>`;
    }, 600)
    input.value = "";
    mensajes.scrollTop = mensajes.scrollHeight;
  }
});

//Envio de mails

formulario.addEventListener('submit', handleSubtmit)

function handleSubtmit(event) {
  event.preventDefault()
  const form = new FormData(this)
  buttonMailto.setAttribute('href', `mailto:alexis.r4995@gmail.com?subject=${form.get('name')}${form.get('email')}&body=${form.get('mensaje')}`)
  buttonMailto.click()
}

//Menu

btnMenu.addEventListener("click", () => {
  menuNav.classList.toggle("hidden");
});

//Deslizamiento suave Href"";
function activarDeslizamiento() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}
activarDeslizamiento();

//Modales y ofertas
const modal = document.getElementById("ofertasModal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");

const slider = document.getElementById("slider");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let index = 0;

openModal.addEventListener("click", () => modal.classList.remove("hidden"));
closeModal.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("hidden"); });

nextBtn.addEventListener("click", () => {
  if (index < 2) index++;
  else index = 0;
  slider.style.transform = `translateX(-${index * 100}%)`;
});

prevBtn.addEventListener("click", () => {
  if (index > 0) index--;
  else index = 2;
  slider.style.transform = `translateX(-${index * 100}%)`;
});

//Ver ofertas
window.onload = function () {
  const modal = document.getElementById("modal-ofertas");
  const listaOfertas = document.getElementById("lista-ofertas");
  const contenedor = document.getElementById("contenedor-ofertas");
  const titulo = document.getElementById("titulo-ofertas");
  const btnConsultaWp = document.getElementById("botonConsultaWhatsapp");

  // Array de ofertas por día
  const ofertasPorDia = {
    1: ["👖 Lunes: 20% OFF en Pantalones", "👕 Descuento en Remeras y Buzos con Visa"],
    2: ["🧥 Martes: 2x1 en Camperas", " Mercado pago 15% de Descuento"],
    3: ["👗 Miércoles: 25% OFF Vestidos elegantes", "Santander Río 10% sin interes"],
    4: ["👔 Jueves: Camisas caballeros al 30% efectivo", "Tarjetas Visa 15% descuento sin interes"],
    5: ["👙 Viernes: Mayas y Biquinis descuentos 2x1", "Caballeros 20% ropa verano promo exclusiva"],
    6: ["🩴 Sábado: Accesorios de playa 10% Efectivo", "🕶️ Accesorios Descuento con Debito Visa 5% sin recargo"]
    // Domingo sin ofertas
  };

  // Obtener el día actual
  const diaHoy = new Date().getDay();

  //  Llenar el MODAL
  if (listaOfertas) {
    if (ofertasPorDia[diaHoy]) {
      ofertasPorDia[diaHoy].forEach(oferta => {
        const li = document.createElement("li");
        li.textContent = oferta;
        listaOfertas.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.textContent = "No tenemos ofertas especiales para hoy, vuelva mañana. Lo esperamos😊";
      listaOfertas.appendChild(li);
      btnConsultaWp.classList.add("hidden");
    }

    // Mostrar modal automáticamente
    modal.classList.remove("hidden");
  }

  // Llenar la SECCIÓN DE OFERTAS
  if (contenedor && titulo) {
    contenedor.innerHTML = "";

    if (ofertasPorDia[diaHoy]) {
      const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
      titulo.textContent = `Ofertas del ${diasSemana[diaHoy]}`;

      ofertasPorDia[diaHoy].forEach((oferta) => {
        const card = document.createElement("div");
        card.className = "relative bg-cover rounded-xl shadow-lg p-6 text-center text-white";

        // Overlay negro
        const overlay = document.createElement("div");
        overlay.className = "absolute inset-0 bg-green-50 rounded-xl my-1";
        card.appendChild(overlay);

        // Texto oferta
        const content = document.createElement("div");
        content.className = "relative z-10 text-black";
        const p = document.createElement("p");
        p.textContent = oferta;
        content.appendChild(p);

        card.appendChild(content);
        contenedor.appendChild(card);
      });
    } else {
      titulo.textContent = "No tenemos ofertas especiales para hoy";
      const msg = document.createElement("p");
      msg.className = "text-center text-gray-600 col-span-3";
      msg.textContent = "Vuelve mañana para ver nuestras promociones 😊";
      contenedor.appendChild(msg);
    }
  }
};