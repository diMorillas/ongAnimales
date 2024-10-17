window.onload = function() {
    let seleccionAnimal; // Variable para almacenar el nombre del animal seleccionado
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
        { nombre: "Juan", edad: 24, animalesAdoptados: [], imagen: "juan.jpg" },
        { nombre: "Laura", edad: 37, animalesAdoptados: [], imagen: "laura.jpg" },
        { nombre: "Luis", edad: 31, animalesAdoptados: [], imagen: "luis.jpg" },
        { nombre: "Maria Teresa", edad: 18, animalesAdoptados: [], imagen: "mariateresa.jpg" },
        { nombre: "David", edad: 22, animalesAdoptados: [], imagen: "david.jpg" },
        { nombre: "Miguel", edad: 54, animalesAdoptados: [], imagen: "miguel.jpg" },
        { nombre: "Pablo", edad: 40, animalesAdoptados: [], imagen: "pablo.jpg" },
        { nombre: "Jordi", edad: 19, animalesAdoptados: [], imagen: "jordi.jpg" },
        { nombre: "Pedro", edad: 67, animalesAdoptados: [], imagen: "pedro.jpg" },
        { nombre: "Lucia", edad: 59, animalesAdoptados: [], imagen: "lucia.jpg" },
    ];

    // Generar botones de personas
    const generaPersonas = function() {
        let listaPersona = document.getElementById('listaPersonas');

        personas.forEach(function(persona) {
            let nombrePersona = document.createElement('button');
            nombrePersona.textContent = persona.nombre;
            nombrePersona.classList.add('persona');

            // Asignar eventListener al botón de la persona
            nombrePersona.addEventListener('click', function() {
                seleccionPersona(persona);
            });

            listaPersona.appendChild(nombrePersona);
        });
    };

    const seleccionPersona = function(personaSeleccionada) {
        // Verificar si hay un animal seleccionado
        if (seleccionAnimal) {
            // Agregar el animal seleccionado a la lista de animales adoptados por la persona
            personaSeleccionada.animalesAdoptados.push(seleccionAnimal);
            console.log(personaSeleccionada);
            
            // Marcar el animal como adoptado
            seleccionAnimal.estadoAdopcion = true;

            // Remover el botón de adopción
            let botonAdoptar = document.getElementById("botonAdoptar-" + seleccionAnimal.nombre);
            if (botonAdoptar) {
                botonAdoptar.remove(); // Elimina el botón de adopción
            }

            // Cambiar el estado del animal en la tarjeta
            let animalImg = document.getElementById(seleccionAnimal.nombre);
            animalImg.classList.add("animalAdoptado");

            // Actualizar el mensaje del modal
            document.getElementById('modalMessage').textContent = personaSeleccionada.nombre + " ha adoptado a " + seleccionAnimal.nombre + "!";
        }
    };

    // Generar cartas de animales
    const generaAnimales = function() {
        let listaAnimal = document.getElementById('listaAnimal');
        listaAnimal.innerHTML = ''; // Limpiar el contenido previo

        animales.forEach(function(animal) {
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
            cardText.textContent = animal.edad <= 1 ? 
                "¡Hola soy un " + animal.tipo + " y tengo " + animal.edad + " año!" : 
                "¡Hola soy un " + animal.tipo + " y tengo " + animal.edad + " años!";

            // Crear el botón solo si el estado de adopción es false
            if (!animal.estadoAdopcion) {
                let adoptButton = document.createElement('button');
                adoptButton.textContent = "Adoptar";
                adoptButton.classList.add('botonAdoptar'); // Cambiar a 'botonAdoptar'
                adoptButton.id = "botonAdoptar-" + animal.nombre; // Cambiar ID para que contenga 'botonAdoptar'

                adoptButton.addEventListener('click', function(modalWindow) {
                    modalWindow.preventDefault();
                    seleccionAnimal = animal; // Guardamos el objeto del animal seleccionado
                    document.getElementById('modalMessage').textContent = "¡Has seleccionado a " + animal.nombre + "!";
                    const modal = new bootstrap.Modal(document.getElementById('animalModal'));
                    modal.show();
                });

                // Añadir el botón debajo del texto
                cardBody.appendChild(cardText);
                cardBody.appendChild(adoptButton);
            } else {
                // Si el animal ya está adoptado, no mostrar el botón
                cardText.textContent += " (¡Adoptado!)";
            }

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            card.appendChild(imgAnimal);
            card.appendChild(cardBody);
            listaAnimal.appendChild(card);
        });
    };

    generaAnimales();
    generaPersonas();
};
