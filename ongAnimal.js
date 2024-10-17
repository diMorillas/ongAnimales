window.onload = () => {
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


    //Personas

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
    const generaPersonas = () => {
        let listaPersona = document.getElementById('listaPersonas');

        personas.forEach(persona => {
            let nombrePersona = document.createElement('button');
            nombrePersona.textContent = persona.nombre;
            nombrePersona.classList.add('persona');

            // Asignar eventListener al botón de la persona
            nombrePersona.addEventListener('click', () => seleccionPersona(persona));

            listaPersona.appendChild(nombrePersona);
        });
    }

    const seleccionPersona = (personaSeleccionada) => {
        // Verificar si hay un animal seleccionado
        if (seleccionAnimal) {
            // Agregar el animal seleccionado a la lista de animales adoptados por la persona
            personaSeleccionada.animalesAdoptados.push(seleccionAnimal);
            console.log(personaSeleccionada);
            seleccionAnimal.estadoAdopcion = true;
            
            // Marcar el animal como adoptado
            let animalImg = document.getElementById(seleccionAnimal);
            animalImg.classList.add("animalAdoptado");
            let botonAdopcion = document.getElementsByClassName('botonAdoptar');
            botonAdopcion.classList.add('botonOculto');

            // Actualizar el mensaje del modal
            document.getElementById('modalMessage').textContent = `¡${personaSeleccionada.nombre} ha adoptado a ${seleccionAnimal}!`;

        }
    }

    // Generar cartas de animales
    const generaAnimales = () => {
        let listaAnimal = document.getElementById('listaAnimal');

        animales.forEach(animal => {
            let card = document.createElement('div');
            card.classList.add('card');

            let imgAnimal = document.createElement('img');
            imgAnimal.src = animal.imagen; 
            imgAnimal.id = animal.nombre; // Usamos el nombre del animal como id para seleccionarlo más tarde
            imgAnimal.classList.add('card-img-top');
            imgAnimal.alt = animal.nombre;

            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            let cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title', 'center');
            cardTitle.textContent = animal.nombre;

            let cardText = document.createElement('p');
            cardText.classList.add('card-text', 'infoCarta', 'center');
            if (animal.edad <= 1){
                cardText.textContent = `¡Hola soy un ${animal.tipo} y tengo ${animal.edad} año!`; 
            } else {
                cardText.textContent = `¡Hola soy un ${animal.tipo} y tengo ${animal.edad} años!`;
            }

            let adoptButton = document.createElement('button');
            adoptButton.classList.add('botonAdoptar');
            adoptButton.textContent = "Adoptar";

            adoptButton.addEventListener('click', (modalWindow) => {
                modalWindow.preventDefault(); 
                seleccionAnimal = animal.nombre; // Guardamos el nombre del animal seleccionado
                document.getElementById('modalMessage').textContent = `¡Has seleccionado a ${seleccionAnimal}!`; 
                const modal = new bootstrap.Modal(document.getElementById('animalModal'));
                modal.show(); 
            });

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            cardBody.appendChild(adoptButton);
            card.appendChild(imgAnimal);
            card.appendChild(cardBody);
            listaAnimal.appendChild(card);
        });
    }


    generaAnimales();
    generaPersonas();
}
