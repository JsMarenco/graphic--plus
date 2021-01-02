// Botones
// al dar click ejecutará una función que agrega mas parametros
document.querySelector(".form__add").addEventListener("click", addParam);
// al dar click ejecutará una función que muestra el gráfico
document.querySelector(".form__show").addEventListener("click", showParam);
// al dar click se activa el modo oscuro
document.querySelector(".switch").addEventListener("click", darkMode)

// variables y arrays
let parametros = [];	// aqui se alamcena los parametros
let valores = [];	// aqui se almacena las frecuencia
let muestra = 0;	// aqui se alamcena la suma de todas las frecuencias
let background = "";
let color = "";
// aqui se incluiran los inputs agrgados por el usuario
let inputs = document.querySelector(".form__container__inputs"); 

function darkMode(){
	document.body.classList.toggle("dark");
	document.querySelector(".switch").classList.toggle("active");
}

function error(texto) {
	// crea una ventana con el mensaje error
	Swal.fire({
		icon: "error",	// icono de error
		// mensaje
		text: `${texto}`,
		// color de fondo
		background: "rgba(255, 255, 255, 0.7)",
		// desactiva el botón de "ok"
		showConfirmButton: false,
		// al mostrarse la ventana desaparece en 2 segundos
		timer: 2000
	})

	// vacia los arreglos evitando duplicar elementos
	parametros.splice(0)
	valores.splice(0)
}

function addParam() {
	// creá un input que será para los parametro
	let inputParam = document.createElement("input");
	// creá un input que será para la frecuencia
	let inputValor = document.createElement("input");
	// crea un div que almacenara los inputs
	let div = document.createElement("div")

	// se agregan sus clases
	div.setAttribute("class", "form__wrap")
	inputParam.setAttribute("class", "form__parametro form__input")
	inputValor.setAttribute("class", "form__valor form__input")

	// se agrega el atribut type=""
	inputParam.setAttribute("type", "text")
	inputValor.setAttribute("type", "number")

	// se agrega su placeholder=""
	inputParam.setAttribute("placeholder", "Parámetro")
	inputValor.setAttribute("placeholder", "Frecuencia")

	// se agrega como hijo a un elemento div
	div.appendChild(inputParam)
	div.appendChild(inputValor)

	// se agraga el elemento div dentro 
	inputs.appendChild(div)
}

function showParam() {
	// se accede a los inputs por medio de sus ckases
	let html__param = document.querySelectorAll(".form__parametro");
	let html__valor = document.querySelectorAll(".form__valor");

	// agrega los parametros a su arreglo correspondiente
	for (let i = 0; i < html__param.length; i++) {
		// se elemina los espacios y se convierten en mayúsculas
		parametros.push(html__param[i].value.trim().toUpperCase());
		// se convierten los números en tipo entero
		valores.push(parseInt(html__valor[i].value));

		// válida si el usuario lleno todos los elementos
		if (parametros[i] == "" || isNaN(valores[i]) ) {
			error("Ups! debes rellenar todos los campos");
			// evita que se siga ejecutando la función
			return false;
		}

		if(valores[i] < 0) {
			error("Ups no debes poner números negativo")
			return false;
		}
	}

	// suma todas las frecuencias
	for (let i = 0; i < valores.length; i++) {
		muestra = muestra + valores[i]
	}

	// aqui se modifica los colores y se agregan los parametros
	let data = [{
		x: parametros,	
		y: valores,
		// modifica los colores de cada una de las barras
		marker: {
			color: ["#ef70aa", "#ff8c94", "#f12761",
				"#00c6c7", "#96e5e2", "#00acas",
				"#006f60", "#005245", "#eeacad",
				"#fff2c3", "#ee84b3", "#740eac",
				"#e2038d", "#b57e79", "#9e1c5"
			],
		},
		// bar hace referencia a que el gráfico es de tipo barra
		type: "bar",
	}];

	let layout =  {
		title: `Graphic + <br> La muestra es de ${muestra} personas`,
		font: {
			family: 'Arial',
			size: 16,
			// color: `${color}`
		},
		// modifica el color de fondo del grafico
			paper_bgcolor: "rbga(48 48, 48, 1)",
			plot_bgcolor: "rbga(48 48, 48, 1)"
	}

	// crea un objeto que creará el grafico
	Plotly.newPlot("grafico", data, layout, {
		staticPlot: true
	});
}