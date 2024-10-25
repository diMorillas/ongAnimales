/**
 * @author Pau Morillas
 * @author Dídac Morillas
 * @version 1.0.0
 * 
 * Vanilla JS 
 */




/**
 * La función onload es para esperar a que cargue toda la página antes de ejecutar JS
 */
window.onload = function () {
    //Variable a la que damos valor cuando se hace clic en un animal.
    let seleccionAnimal = null;
    //Arrays con objetos en los que guardamos los datos.

    let animales = [
        // Gatos
        { nombre: "Wiskas", edad: 7, tipo: "gato", estadoAdopcion: false, imagen: "./img/wiskas.png" },
        { nombre: "Dave", edad: 1, tipo: "gato", estadoAdopcion: false, imagen: "./img/dave.png" },
        { nombre: "Artorias", edad: 2, tipo: "gato", estadoAdopcion: false, imagen: "./img/artorias.png" },
        { nombre: "Python", edad: 5, tipo: "gato", estadoAdopcion: false, imagen: "./img/python.png" },

        // Perros
        { nombre: "Max", edad: 6, tipo: "perro", estadoAdopcion: false, imagen: "./img/max.png" },
        { nombre: "Luna", edad: 1, tipo: "perro", estadoAdopcion: false, imagen: "./img/luna.png" },
        { nombre: "Jie Li", edad: 20, tipo: "perro", estadoAdopcion: false, imagen: "./img/jieli.png" },
        { nombre: "Luca", edad: 13, tipo: "perro", estadoAdopcion: false, imagen: "./img/luca.png" },

        // Pájaros
        { nombre: "Kiriki", edad: 3, tipo: "ave", estadoAdopcion: false, imagen: "./img/kirikiri.png" },
        { nombre: "Chia", edad: 2, tipo: "ave", estadoAdopcion: false, imagen: "./img/chia.png" },
    ];

    // Personas
    let personas = [
        { nombre: "Juan", edad: 24, animalesAdoptados: [], imagen: "./img/juan.webp" },
        { nombre: "Laura", edad: 37, animalesAdoptados: [], imagen: "./img/laura.webp" },
        { nombre: "Luis", edad: 31, animalesAdoptados: [], imagen: "./img/luis.webp" },
        { nombre: "Maria Teresa", edad: 18, animalesAdoptados: [], imagen: "./img/mariateresa.webp" },
        { nombre: "David", edad: 22, animalesAdoptados: [], imagen: "./img/david.webp" },
        { nombre: "Miguel", edad: 18, animalesAdoptados: [], imagen: "./img/miguel.webp" },
        { nombre: "Pablo", edad: 40, animalesAdoptados: [], imagen: "./img/pablo.webp" },
        { nombre: "Jordi", edad: 59, animalesAdoptados: [], imagen: "./img/jordi.webp" },
        { nombre: "Pedro", edad: 37, animalesAdoptados: [], imagen: "./img/pedro.webp" },
        { nombre: "Lucia", edad: 29, animalesAdoptados: [], imagen: "./img/lucia.webp" },
    ];
    
    /**
     * Función que genera las perosnas como botones dentro de un div en el modal window (la generamos con JS y bootstrap)
     * está en este div:<div id="listaPersonas">
     * No toma parámetros. Solo usamos el id de lista personas para crear los elementos y añadirlos con appendChild()
     */
    const generaPersonas = function () {
        let listaPersona = document.getElementById('listaPersonas');

        personas.forEach(function (persona) {
            let nombrePersona = document.createElement('button');
            nombrePersona.textContent = persona.nombre;
            nombrePersona.classList.add('persona');

            nombrePersona.addEventListener('click', function () {
                seleccionPersona(persona);
            });

            listaPersona.appendChild(nombrePersona);
        });
    };

    /**
     * 
     * @param {object} personaSeleccionada es la persona sobre la que hemos hecho clic
     * Es una función para gestionar la adopción y la asignación de la persona.
     * Si se ha seleccionado un animal previamente se hace un push al array de animales adoptados del animal seleccionado en sleccionAnimal.
     * 
     */
    const seleccionPersona = function (personaSeleccionada) {
        if (seleccionAnimal) {
            personaSeleccionada.animalesAdoptados.push(seleccionAnimal);
            console.log(personaSeleccionada);

            seleccionAnimal.estadoAdopcion = true;
            //Creamos una variable para trabajar mejor con el botón. Este botón adoptar se crea como id para cada uno de los animales, así trabajamos de forma independiente y lo podemos ocultar.
            let botonAdoptar = document.getElementById("botonAdoptar-" + seleccionAnimal.nombre);
            if (botonAdoptar) {
                botonAdoptar.remove();
            }
            //selección del animal para añadir la clase de animal adoptado (y con esto cambiar la imagen).
            let animalImg = document.getElementById(seleccionAnimal.nombre);
            animalImg.classList.add("animalAdoptado");

            // Crear la imagen de la cruz
            let cruzImg = document.createElement('img');
            cruzImg.src = './img/cruz.png'; // Ruta a la imagen de la cruz
            cruzImg.classList.add('cruz'); // Añadir una clase para el estilo

            // Posicionar la cruz sobre el animal
            animalImg.parentNode.appendChild(cruzImg);

            // Actualizar la carta de la persona
            actualizaCartaPersona(personaSeleccionada);

            document.getElementById('modalMessage').textContent = personaSeleccionada.nombre + " ha adoptado a " + seleccionAnimal.nombre + "!";


            seleccionAnimal = null;
        }
    };

    /**
     * 
     * @param {object} personaSeleccionada
     * Función que actualiza la carta de la persona cuando adoptamo so desadoptamos un animal 
     */
    const actualizaCartaPersona = function (personaSeleccionada) {
        // Buscar la carta correspondiente
        const personaCards = document.querySelectorAll('.persona-card');

        personaCards.forEach(function (card) {
            // Comprobar si el nombre en la carta coincide con el nombre de la persona seleccionada
            if (card.querySelector('.card-title').textContent === personaSeleccionada.nombre) {
                let animalesAdoptadosList = card.querySelector('.animales-adoptados');
                //Si no existe se crea el contenedor
                if (!animalesAdoptadosList) {
                    // Crear un contenedor para los animales adoptados si no existe
                    animalesAdoptadosList = document.createElement('div');
                    animalesAdoptadosList.classList.add('animales-adoptados');
                    card.appendChild(animalesAdoptadosList);
                } else {
                    // Limpiar el contenido anterior si existe
                    animalesAdoptadosList.innerHTML = '';
                }

                // Añadir los animales adoptados a la carta
                personaSeleccionada.animalesAdoptados.forEach(animal => {
                    // Crear un contenedor para cada animal adoptado
                    let animalContainer = document.createElement('div');
                    animalContainer.classList.add('animal-adoptado');

                    // Texto que indica que el animal ha sido adoptado
                    let textoAdoptado = document.createElement('p');
                    textoAdoptado.textContent = "¡" + animal.nombre + " ha sido adoptado!";
                    textoAdoptado.classList.add('texto-adoptado');

                    // Añadir un event listener para revertir la adopción
                    textoAdoptado.addEventListener('dblclick', function () {  // Usamos el Double Click para evitar posibles errores al clickar haciendo scroll.
                        // Revertir el estado de adopción del animal
                        animal.estadoAdopcion = false;

                        // Eliminar al animal de la lista de adoptados
                        let indexArrayAnimal = personaSeleccionada.animalesAdoptados.indexOf(animal);
                        if (indexArrayAnimal !== -1) { // Se pone !== -1 para indicar que si no está en el array, se muestra -1 y por tanto no hay nada que eliminar
                            personaSeleccionada.animalesAdoptados.splice(indexArrayAnimal, 1);
                        }

                        // Cambiar el texto a un display:none; para que no se muestre nada.
                        textoAdoptado.style.display = 'none';

                        // Eliminar la clase de 'adoptado' al animal en la lista principal
                        let animalImg = document.getElementById(animal.nombre);
                        animalImg.classList.remove("animalAdoptado");

                        // Selecciona la imagen de la cruz dentro del contenedor del animal y la oculta
                        let cruzImg = animalImg.parentNode.querySelector('.cruz');
                        if (cruzImg) {
                            cruzImg.remove(); // Eliminamos la cruz del DOM
                        }

                        // Mostrar el botón de "Adoptar" nuevamente
                        let botonAdoptar = document.createElement('button');
                        botonAdoptar.textContent = "Adoptar";
                        botonAdoptar.classList.add('botonAdoptar');
                        botonAdoptar.id = "botonAdoptar-" + animal.nombre;

                        // Asignar el evento al nuevo botón de adoptar
                        botonAdoptar.addEventListener('click', function () {
                            seleccionAnimal = animal;
                            document.getElementById('modalMessage').textContent = "¡Has seleccionado a " + animal.nombre + "!";
                            const modal = new bootstrap.Modal(document.getElementById('animalModal'));
                            modal.show();
                        });

                        // Añadir el botón de adoptar al contenedor del animal
                        animalImg.parentNode.querySelector('.card-body').appendChild(botonAdoptar);


                        // Asignar el evento al nuevo botón de adoptar
                        botonAdoptar.addEventListener('click', function () {
                            seleccionAnimal = animal;
                            document.getElementById('modalMessage').textContent = "¡Has seleccionado a " + animal.nombre + "!";
                        });

                        // Añadir el botón de adoptar de nuevo al contenedor del animal
                        animalImg.parentNode.querySelector('.card-body').appendChild(botonAdoptar);

                        // Insertar el botón de nuevo en la carta del animal
                        cardBody.appendChild(adoptButton);

                        // Actualizar la carta de la persona para reflejar el cambio
                        actualizaCartaPersona(personaSeleccionada);
                    });

                    animalContainer.appendChild(textoAdoptado);

                    // Añadir el contenedor del animal al listado de animales adoptados
                    animalesAdoptadosList.appendChild(animalContainer);
                });
            }
        });
    };


    /**
     * Función de flecha que genera las cartas de los animales con los datos del array y clases de bootstrap con el div en html que tiene el id 'listaAnimal'
     */
    const generaAnimales = function () {
        let listaAnimal = document.getElementById('listaAnimal');

        animales.forEach(function (animal) {
            let card = document.createElement('div');
            card.classList.add('card');

            let imgAnimal = document.createElement('img');
            imgAnimal.src = animal.imagen;
            imgAnimal.id = animal.nombre;
            imgAnimal.classList.add('card-img-top');
            imgAnimal.alt = animal.nombre;

            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            let cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title', 'center');
            cardTitle.textContent = animal.nombre;

            let cardText = document.createElement('p');
            cardText.classList.add('card-text', 'infoCarta', 'center');

            if (animal.edad === 1) {
                cardText.textContent = "¡Hola soy un " + animal.tipo + " y tengo " + animal.edad + " año!";
            } else {
                cardText.textContent = "¡Hola soy un " + animal.tipo + " y tengo " + animal.edad + " años!";
            }

            cardBody.appendChild(cardTitle);

            if (!animal.estadoAdopcion && !seleccionAnimal) {
                let adoptButton = document.createElement('button');
                adoptButton.textContent = "Adoptar";
                adoptButton.classList.add('botonAdoptar');
                adoptButton.id = "botonAdoptar-" + animal.nombre;

                adoptButton.addEventListener('click', function (modalWindow) {
                    seleccionAnimal = animal;
                    document.getElementById('modalMessage').textContent = "¡Has seleccionado a " + animal.nombre + "!";
                    const modal = new bootstrap.Modal(document.getElementById('animalModal'));
                    modal.show();
                });

                cardBody.appendChild(cardText);
                cardBody.appendChild(adoptButton);
            }

            card.appendChild(imgAnimal);
            card.appendChild(cardBody);
            listaAnimal.appendChild(card);
        });
    };

    /**
     * Función que genera las cartas de las personas en la que se ven los animales adoptados 
     */
    const generaPersonasCarta = function () {
        let listaPersona = document.getElementById('listaPersonasCartas');
        listaPersona.innerHTML = ''; // Limpiar el contenido anterior

        personas.forEach(function (persona) {
            // Crear una carta para la persona
            let card = document.createElement('div');
            card.classList.add('card', 'persona-card', 'm-2');

            // Añadir la imagen de la persona
            let personaImg = document.createElement('img');
            personaImg.src = persona.imagen; // Asegúrate de que la imagen de la persona está correctamente enlazada
            personaImg.classList.add('card-img-top');
            personaImg.alt = persona.nombre;

            // Crear el nombre de la persona
            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            let cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title', 'text-center');
            cardTitle.textContent = persona.nombre;


            // Añadir el título a la carta
            cardBody.appendChild(cardTitle);
            card.appendChild(personaImg);
            card.appendChild(cardBody);
            listaPersona.appendChild(card);

            // Contenedor para animales adoptados
            const animalesAdoptadosList = document.createElement('div');
            animalesAdoptadosList.classList.add('animales-adoptados');
            cardBody.appendChild(animalesAdoptadosList);
        });
    };

    generaAnimales();
    generaPersonas();
    generaPersonasCarta();
};

