
const baseUrl = "https://platzi-avo.vercel.app";
const appNode = document.querySelector("#app");

const formatPrice = (price) => {

    //API de Internalizacion, sirve para monedas y otras cosas.
    const newPrice = new Intl.NumberFormat("en-EN", {
        style: "currency",
        currency: "USD",
    }).format(price);

    return newPrice;
};

const fetchAvocados = async (url) => {
    const response = await fetch(url);
    const { data } = await response.json();

    const allItems = [];

    data.forEach(item => {

        // Creamos imagen
        const imagen = document.createElement("img");
        imagen.src = `${baseUrl}${item.image}`;
        // Agregamos clases segun los estilos definidos en CSS
        // en este caso segun Tailwind
        imagen.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";

        // Crear titulo
        const title = document.createElement("h2");
        title.textContent = item.name;
        title.className = "text-lg";

        // Crear precio
        const price = document.createElement("div");
        price.textContent = formatPrice(item.price);
        price.className = "text-gray-600";

        // Precio y titulo
        const precioTitulo = document.createElement("div");
        precioTitulo.className = "text-center md:text-left";
        precioTitulo.append(title, price);

        const card = document.createElement("div");
        card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
        card.append(imagen, precioTitulo);

        allItems.push(card);
    });

    appNode.append(...allItems);
};

fetchAvocados(`${baseUrl}/api/avo`);