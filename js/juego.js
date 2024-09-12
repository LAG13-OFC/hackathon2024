// juego.js

const palabras = ["casa", "perro", "gato", "juego", "amor", "familia", "amigo", "sol", "luna", "estrella"];
let nivelActual = 0;
let puntaje = 0;

// Función para mostrar el abecedario en el tutorial
function mostrarAbecedario() {
    const abecedarioDiv = document.getElementById('abecedario');
    const letras = 'abcdefghijklmnopqrstuvwxyz'.split('');

    letras.forEach(letra => {
        const img = document.createElement('img');
        img.src = `images/tuto/${letra}.jpg`; // Asegúrate de tener las imágenes del abecedario
        img.alt = letra;
        img.classList.add('seña-img');
        abecedarioDiv.appendChild(img);
    });
}

// Función para iniciar el juego
function iniciarJuego() {
    document.getElementById('tutorial').style.display = 'none';
    document.getElementById('juego').style.display = 'block';
    cargarNivel();
}

// Función para cargar el nivel actual
function cargarNivel() {
    const imagenesDiv = document.getElementById('imagenes');
    imagenesDiv.innerHTML = '';
    document.getElementById('nivel-info').textContent = `Nivel: ${nivelActual + 1}`;
    
    // Escoger una palabra aleatoria del arreglo
    const palabra = palabras[Math.floor(Math.random() * palabras.length)];
    
    // Mostrar las imágenes correspondientes a la palabra
    for (let i = 0; i < palabra.length; i++) {
        const letra = palabra[i];
        const img = document.createElement('img');
        img.src = `images/${letra}.png`;
        img.alt = letra;
        img.classList.add('seña-img');
        imagenesDiv.appendChild(img);
    }
    
    // Almacenar la palabra actual para verificar
    imagenesDiv.setAttribute('data-palabra', palabra);
}

// Función para comprobar la respuesta del jugador
function comprobarRespuesta() {
    const respuesta = document.getElementById('respuesta').value.toLowerCase();
    const palabra = document.getElementById('imagenes').getAttribute('data-palabra');
    const resultadoDiv = document.getElementById('resultado');
    
    if (respuesta === palabra) {
        resultadoDiv.textContent = '¡Correcto!';
        puntaje += 50;
        nivelActual++;
        
        // Aumentar la dificultad: palabras más largas o tiempo más corto
        if (nivelActual >= 10) {
            resultadoDiv.textContent = '¡Felicidades! Has completado el juego.';
            document.getElementById('comprobar').disabled = true;
            // Mostrar la tabla de evaluación
            mostrarTablaPuntuaciones();
        } else {
            cargarNivel();
            document.getElementById('respuesta').value = '';
        }
    } else {
        resultadoDiv.textContent = 'Incorrecto, intenta de nuevo.';
        puntaje -= 10; // Penalización por error
    }
    
    // Actualizar el puntaje
    document.getElementById('puntaje-valor').textContent = puntaje;
}

// Función para mostrar la tabla de evaluación
function mostrarTablaPuntuaciones() {
    const scoreTable = document.getElementById('scoreTable');
    const puntuacionBody = document.getElementById('puntuacionBody');
    
    // Limpiar la tabla actual
    puntuacionBody.innerHTML = '';
    
    // Aquí deberías almacenar y mostrar las calificaciones de los jugadores
    // Añade una puntuación simulada para el jugador
    const exampleScores = [
        { name: 'Jugador 1', points: puntaje }
        // Puedes añadir más evaluación si es necesario
    ];
    
    exampleScores.forEach(function(score, index) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${score.name}</td>
            <td>${score.points}</td>
        `;
        puntuacionBody.appendChild(fila);
    });
    
    // Mostrar la tabla de evaluación
    scoreTable.classList.remove('hidden');
}

// Función para cerrar la tabla de evaluación
function cerrarTablaPuntuaciones() {
    document.getElementById('scoreTable').classList.add('hidden');
}

// Cargar el abecedario al inicio
window.onload = function () {
    mostrarAbecedario();
    document.getElementById('iniciar-juego').addEventListener('click', iniciarJuego);
    document.getElementById('comprobar').addEventListener('click', comprobarRespuesta);
    document.getElementById('closeScores').addEventListener('click', cerrarTablaPuntuaciones);
};


