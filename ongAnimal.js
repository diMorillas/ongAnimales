window.onload = function () {
    let seleccionAnimal = null;
    let animales = [
        // Gatos
        { nombre: "Wiskas", edad: 7, tipo: "gato", estadoAdopcion: false, imagen: "./img/wiskas.jpeg" },
        { nombre: "Dave", edad: 1, tipo: "gato", estadoAdopcion: false, imagen: "./img/dave.jpeg" },
        { nombre: "Artorias", edad: 2, tipo: "gato", estadoAdopcion: false, imagen: "./img/artorias.jpeg" },
        { nombre: "Python", edad: 5, tipo: "gato", estadoAdopcion: false, imagen: "./img/python.webp" },

        // Perros
        { nombre: "Max", edad: 6, tipo: "perro", estadoAdopcion: false, imagen: "./img/max.jpeg" },
        { nombre: "Luna", edad: 1, tipo: "perro", estadoAdopcion: false, imagen: "./img/luna.webp" },
        { nombre: "Jie Li", edad: 20, tipo: "perro", estadoAdopcion: false, imagen: "./img/jieli.jpg" },
        { nombre: "Luca", edad: 13, tipo: "perro", estadoAdopcion: false, imagen: "./img/luca.webp" },

        // Pájaros
        { nombre: "Kiriki", edad: 3, tipo: "ave", estadoAdopcion: false, imagen: "./img/kiriki.jpg" },
        { nombre: "Chia", edad: 2, tipo: "ave", estadoAdopcion: false, imagen: "./img/chia.jpg" },
    ];

    // Personas
    let personas = [
        { nombre: "Juan", edad: 24, animalesAdoptados: [], imagen: "./img/juan.jpg" },
        { nombre: "Laura", edad: 37, animalesAdoptados: [], imagen: "./img/laura.jpg" },
        { nombre: "Luis", edad: 31, animalesAdoptados: [], imagen: "./img/luis.jpg" },
        { nombre: "Maria Teresa", edad: 18, animalesAdoptados: [], imagen: "./img/mariateresa.jpg" },
        { nombre: "David", edad: 22, animalesAdoptados: [], imagen: "./img/david.jpg" },
        { nombre: "Miguel", edad: 18, animalesAdoptados: [], imagen: "./img/miguel.jpg" },
        { nombre: "Pablo", edad: 40, animalesAdoptados: [], imagen: "./img/pablo.jpg" },
        { nombre: "Jordi", edad: 59, animalesAdoptados: [], imagen: "./img/jordi.jpg" },
        { nombre: "Pedro", edad: 37, animalesAdoptados: [], imagen: "./img/pedro.jpg" },
        { nombre: "Lucia", edad: 29, animalesAdoptados: [], imagen: "./img/lucia.jpg" },
    ];

    // Generar botones de personas
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


    const seleccionPersona = function (personaSeleccionada) {
        if (seleccionAnimal) {
            personaSeleccionada.animalesAdoptados.push(seleccionAnimal);
            console.log(personaSeleccionada);

            seleccionAnimal.estadoAdopcion = true;

            let botonAdoptar = document.getElementById("botonAdoptar-" + seleccionAnimal.nombre);
            if (botonAdoptar) {
                botonAdoptar.remove();
            }

            let animalImg = document.getElementById(seleccionAnimal.nombre);
            animalImg.classList.add("animalAdoptado");

            // Crear la imagen de la cruz
            let cruzImg = document.createElement('img');
            cruzImg.src = './img/cruz.png'; // Ruta a la imagen de la cruz
            cruzImg.classList.add('cruz'); // Añadir una clase para el estilo

            // Posicionar la cruz sobre el animal
            animalImg.parentNode.appendChild(cruzImg);

            document.getElementById('modalMessage').textContent = personaSeleccionada.nombre + " ha adoptado a " + seleccionAnimal.nombre + "!";


            seleccionAnimal = null;
        }
    };






    // Generar cartas de animales
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
        });
    };
    
    




    generaAnimales();
    generaPersonas();
    generaPersonasCarta();
};
