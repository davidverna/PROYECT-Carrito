// Variables

const carrito = document.querySelector('#carrito'); // Lo que está oculto
const contenedorCarrito = document.querySelector('#lista-carrito tbody'); // El cuerpo de lo que está oculto
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); // El botón para vaciar el carrito
const listaCursos = document.querySelector('#lista-cursos'); // La lista de los cursos
let articulosCarrito = [];

cargarEventListener();

function cargarEventListener () {
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Muestra los cursos de localStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    });

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // Vacía el carrito

        limpiarHTML();
    });
};

function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
    };
};

// Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
};

// lee el contenido del .html al que le damos click y extrae la información del curso

function leerDatosCurso(curso) {

    // Crea un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    };

    // Revisa si un elmento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe) {
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado
            } else {
                return curso; // Retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    };

    // Agrega elementos al arreglo del carrito
    // articulosCarrito = [...articulosCarrito, infoCurso];

    carritoHTML();
};

// Muestra el carrito de compras en el .html
function carritoHTML() {

    // Limpiar el .html
    limpiarHTML();


    // Recorre el carrito y genera el .html
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        // Agrega el HTML del carrido en el tbody
        contenedorCarrito.appendChild(row);
    });

    // Agregar carrito de compras a localStorage
    sincronizarStorage();
};


function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
};

// Elimina los cursos del tbody
function limpiarHTML() {
    //Forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
};