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

    const generaAnimales = () => {
        let listaAnimal = document.getElementById('listaAnimal');

        animales.forEach(animal => {
            let card = document.createElement('div');
            card.classList.add('card');

            let imgAnimal = document.createElement('img');
            imgAnimal.src = animal.imagen; 
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

            let adoptButton = document.createElement('a');
            adoptButton.href = "#";
            adoptButton.classList.add('botonAdoptar');
            adoptButton.textContent = "Adoptar";

            adoptButton.addEventListener('click', (modalWindow) => {
                modalWindow.preventDefault(); 
                seleccionAnimal = animal.nombre; 
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
}
