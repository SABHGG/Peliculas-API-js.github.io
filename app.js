let pagina = 1; //pagina defaul
let modo = "popular"
let titulo = "Peliculas Populares"
const btnAnterior = document.getElementById('btnAnterior'); // obtenemos el id de los botones
const btnSiguiente = document.getElementById('btnSiguiente'); // // obtenemos el id de los botones
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-list');

const btnUp = document.getElementById('btnUp')

const idBusqueda = document.getElementById('popular')
const idBusqueda1 = document.getElementById('top-rated')
const idBusqueda2 = document.getElementById('now-playing')

const add_btn = () =>{
    if (window.scrollY > 200) {
        btnUp.classList.add("btnUp-on")
    }else {
        btnUp.classList.remove("btnUp-on")
    }
}

btnUp.addEventListener('click', () =>{
    document.documentElement.scrollTop=0;
})

idBusqueda.addEventListener('click', () =>{
    modo = "popular";
    titulo = "Peliculas Populares";
    pagina = 1;
    console.log(modo);
    cargarPeliculas();
    navMenu.classList.toggle("nav-list_visible")
})

idBusqueda1.addEventListener('click', () =>{
    modo = "top_rated";
    titulo = "Películas mejor calificadas";
    pagina = 1;
    console.log(modo);
    cargarPeliculas();
    navMenu.classList.toggle("nav-list_visible")
})

idBusqueda2.addEventListener('click', () =>{
    modo = "now_playing";
    titulo = "Películas en cartelera"
    pagina = 1;
    console.log(modo);
    cargarPeliculas();
    navMenu.classList.toggle("nav-list_visible")
})

btnSiguiente.addEventListener('click', () => {
    if(pagina < 1000){
        pagina += 1;
        cargarPeliculas();
    }
    document.documentElement.scrollTop=0;
}); // le damos funcion a los botones creados

btnAnterior.addEventListener('click', () => { // agregamos evento de click
    if(pagina > 1){
        pagina -= 1;
        cargarPeliculas();
    }
    document.documentElement.scrollTop=0;
}); // le damos funcion a los botones creados

const cargarPeliculas = async() => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${modo}?api_key=c00f382998383a79b298de3f48d0d5cf&language=es-MX&page=${pagina}`);
	
		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();

			let peliculas = '';
			datos.results.forEach(pelicula => {
				peliculas += `
					<div class="pelicula">
                        <div class="descripcion">
                            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                            <div class="descripcion-link">
                                <h2 class="descripcion-name">${pelicula.title}</h2>
                                <p class="descripcion-name">${pelicula.release_date}</p> 
                                <p class="descripcion-name">${pelicula.overview}</p>
                            </div>
                        </div>           
					</div>
				`;
			});
            document.getElementById('contenedor').innerHTML = peliculas;
            document.getElementById('titulo').innerHTML = titulo;

		} else if(respuesta.status === 401){
			console.log("Pusiste la llave mal");
            alert('Pusiste la llave mal')
		} else if(respuesta.status === 404){
			console.log("La pelicula que buscas no existe");
            alert('La pelicula que buscas no existe')
		} else {
			console.log('Hubo un error y no sabemos que paso');
            alert('Hubo un error')
		}

	} catch(error){
		console.log(error);
	}

}

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle("nav-list_visible")
})

window.onscroll = () =>{
    add_btn()
}

cargarPeliculas() // ejecutamos la funcion para mostrarlas en el navegador
//detallesPliculas()
