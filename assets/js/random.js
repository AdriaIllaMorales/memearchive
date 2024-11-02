const scoreDisplay = document.getElementById("score");
const scoreImage = document.getElementById("scoreImage");
let score = 0;
const images = [];
let isArtActive = false; // Inicialmente, el net art está desactivado

// Genera imágenes aleatorias que rebotan en la pantalla
function createRandomImage() {
    if (!isArtActive) return; // Si el net art no está activo, no crear imágenes

    const img = document.createElement("img");
    img.src = "./media/trollface.png"; // Ruta local de la imagen que rebota
    img.className = "image";

    // Tamaño aleatorio
    const size = Math.floor(Math.random() * 200) + 40;
    img.style.width = `${size}px`;
    img.style.height = `${size}px`;

    // Posición aleatoria dentro de la ventana
    img.style.left = `${Math.random() * (window.innerWidth - size-40)}px`;
    img.style.top = `${Math.random() * (window.innerHeight - size)}px`;

    // Velocidad de rebote aleatoria
    let dx = (Math.random() * 0.7 + 1) * (Math.random() < 0.5 ? -1 : 1);
    let dy = (Math.random() * 0.7 + 1) * (Math.random() < 0.5 ? -1 : 1);

    // Animación de rebote
    function animate() {
        let x = parseFloat(img.style.left);
        let y = parseFloat(img.style.top);

        if (x + dx < 0 || x + dx + size > window.innerWidth-20) {
            dx *= -1;
        }
        if (y + dy < 0 || y + dy + size > window.innerHeight*6) {
            dy *= -1;
        }

        img.style.left = `${x + dx}px`;
        img.style.top = `${y + dy}px`;

        requestAnimationFrame(animate);
    }
    animate();

    // Eliminar imagen al hacer clic
    img.addEventListener("click", () => {
        score++;
        scoreDisplay.textContent = score; // Actualiza el contador
        document.body.removeChild(img);
        images.splice(images.indexOf(img), 1);
    });

    images.push(img);
    document.body.appendChild(img);
}

// Crear una nueva imagen en un intervalo aleatorio entre 5 y 20 segundos
function startImageCreation() {
    if (!isArtActive) return; // Si el net art no está activo, no crear imágenes

    createRandomImage(); // Crear una imagen inmediatamente

    // Función para crear una imagen después de un intervalo aleatorio
    function createImageWithRandomInterval() {
        if (!isArtActive) return; // Si el net art no está activo, no crear más imágenes

        const randomDelay = Math.floor(Math.random() * 15000) + 5000; // Aleatorio entre 5000ms (5s) y 20000ms (20s)
        setTimeout(() => {
            createRandomImage();
            createImageWithRandomInterval(); // Llamar de nuevo para crear otra imagen
        }, randomDelay);
    }

    createImageWithRandomInterval(); // Iniciar el ciclo de creación
}

// Ajustar posiciones de las imágenes al redimensionar la ventana
function adjustImagesOnResize() {
    images.forEach(img => {
        const size = parseFloat(img.style.width);
        const x = parseFloat(img.style.left);
        const y = parseFloat(img.style.top);
        
        // Limitar las posiciones a los límites de la ventana
        img.style.left = `${Math.max(0, Math.min(x, window.innerWidth - size))}px`;
        img.style.top = `${Math.max(0, Math.min(y, window.innerHeight - size))}px`;
    });
}

// Verificar el tamaño de la pantalla y activar/desactivar el net art
function checkScreenSize() {
    if (window.innerWidth < 600) {
        isArtActive = false; // Desactivar el net art
        document.querySelectorAll('.image').forEach(img => document.body.removeChild(img)); // Eliminar imágenes existentes
    } else {
        isArtActive = true; // Activar el net art
        startImageCreation(); // Iniciar creación de imágenes si no está activo
    }
}

// Iniciar la verificación de tamaño de pantalla al cargar la página
checkScreenSize();

// Escuchar el evento de resize
window.addEventListener("resize", checkScreenSize); // Verificar el tamaño de pantalla al redimensionar

