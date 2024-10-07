// Variables globales para almacenar las películas
let movies = [];

// Función para cargar las películas al cargar la página
async function cargarPeliculas() {
  try {
    const response = await fetch('https://japceibal.github.io/japflix_api/movies-data.json');
    movies = await response.json();
  } catch (error) {
    console.error('Error al cargar las películas:', error);
  }
}

// Función para filtrar las películas según la búsqueda del usuario
function buscarPeliculas() {
  const inputBuscar = document.getElementById('inputBuscar').value.toLowerCase();
  const lista = document.getElementById('lista');
  lista.innerHTML = '';

  if (inputBuscar) {
    const peliculasFiltradas = movies.filter(pelicula =>
      pelicula.title.toLowerCase().includes(inputBuscar) ||
      pelicula.genres.join(', ').toLowerCase().includes(inputBuscar) ||
      (pelicula.tagline && pelicula.tagline.toLowerCase().includes(inputBuscar)) ||
      pelicula.overview.toLowerCase().includes(inputBuscar)
    );

    // Mostrar las películas filtradas
    peliculasFiltradas.forEach(pelicula => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.innerHTML = `
        <h5>${pelicula.title}</h5>
        <p>${pelicula.tagline}</p>
        <p>${'★'.repeat(Math.round(pelicula.vote_average))}</p>
        <button class="btn btn-secondary" onclick="mostrarDetalles(${pelicula.id})">Ver más</button>
      `;
      lista.appendChild(li);
    });
  }
}

// Función para mostrar detalles de una película seleccionada
function mostrarDetalles(id) {
  const pelicula = movies.find(p => p.id === id);
  const detallesContainer = document.createElement('div');
  detallesContainer.className = 'bg-light p-4';

  detallesContainer.innerHTML = `
    <h2>${pelicula.title}</h2>
    <p>${pelicula.overview}</p>
    <p><strong>Géneros:</strong> ${pelicula.genres.join(', ')}</p>
    <button class="btn btn-info" onclick="toggleDetallesAdicionales(this)">Más detalles</button>
    <div class="detalles-adicionales" style="display:none;">
      <p><strong>Año de lanzamiento:</strong> ${pelicula.release_date.split('-')[0]}</p>
      <p><strong>Duración:</strong> ${pelicula.runtime} minutos</p>
      <p><strong>Presupuesto:</strong> $${pelicula.budget}</p>
      <p><strong>Ganancias:</strong> $${pelicula.revenue}</p>
    </div>
  `;
  
  document.body.prepend(detallesContainer);
}

// Función para mostrar/ocultar detalles adicionales
function toggleDetallesAdicionales(button) {
  const detalles = button.nextElementSibling;
  detalles.style.display = detalles.style.display === 'none' ? 'block' : 'none';
}

// Inicializar el sistema cuando la página cargue
window.onload = function() {
  cargarPeliculas();

  // Asignar la función de búsqueda al botón
  document.getElementById('btnBuscar').onclick = buscarPeliculas;
};
