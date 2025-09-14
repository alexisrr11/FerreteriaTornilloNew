import { saludos, despedida } from "./saludos.js";
import { martillo, taladro, cajaHerramientas, cintaMetrica, nivelBurbuja, llaveInglesa } from "./nombresPosibles.js";

//Funcion para filtrar tildes o comas
function quitarTildes(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

//chatBot
let contexto = null;

export function responder(msg) {
    if (saludos.some(s => msg.toLowerCase().includes(s))) {
        contexto = "";
        return "¡Hola, espero que te encuentres muy bien!Hay algo en lo que pueda ayudarte?";
    }

    if (despedida.some(d => msg.toLowerCase().includes(d))){
        return "¡Que tenga un buen día, hasta luego!"
    }

    if (martillo.some(m => msg.toLowerCase().includes(m)) ) {
        contexto = "martillo";
        return "Tenemos martillos desde $3.200.";
    }

    if (msg.toLowerCase().includes("marca")){
        if (contexto === "martillo") {
            return "Tenemos martillos de Truper, Stanley y Black & Decker";
        } else {
            return "¿De qué producto querés saber las marcas?";
        }
    }

    if (taladro.some(t => msg.toLowerCase().includes(t)) ) {
        contexto = "taladro";
        return "Tenemos taladros desde $18.500.";
    }

    if (cajaHerramientas.some(ch => msg.toLowerCase().includes(ch)) ) {
        contexto = "Caja de Herramientas";
        return "Tenemos cajas de Herramientas desde $8.900.";
    }

    if(llaveInglesa.some(lli => msg.toLowerCase().includes(lli))) {
        contexto = "llaveInglesa";
        return "Tenemos llaves inglesas desde $2.600."
    }

    if(nivelBurbuja.some(nb => msg.toLowerCase().includes(nb))) {
        contexto = "nivel de burbuja";
        return "Tenemos niveles de burbuja desde $2.300."
    }

    const msgNormalizado = quitarTildes(msg.toLowerCase());
        if (cintaMetrica.some(cm => msgNormalizado.includes(cm))) {
            return "Tenemos cinta métrica desde $1.200.";
        }
    if (msg.toLowerCase().includes("precio")) return "¿Qué producto querés consultar?";
    return "Disculpame, no comprendo lo que me indicas, ¿podrías hacerme una pregunta sobre la ferreteria u otra prengunta?";
}
