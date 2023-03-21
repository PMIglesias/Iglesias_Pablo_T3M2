const arrayDatos = data.events;
const contenedorTarjetas = document.querySelector("#containercards");

function generateCards(arrayDatos) {
    let tarjetasGeneradas = ""
    for (const evento of arrayDatos) {
        tarjetasGeneradas += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-xxl-3 mb-5">
            <div class="card">
                <img src=${evento.image} class="card-img-top shadow" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${evento.name}</h5>
                    <p class="card-text">${evento.description}</p>
                    <div class="row d-flex align-items-center p-1">
                        <h6 class="btn btn-white btn-simple col">Price $${evento.price}</h6>
                        <a href="#" class="btn btn-primary shadow col me-1">Ver mas...</a>
                    </div>
                </div>
            </div>
        </div>`
    }
    
    contenedorTarjetas.innerHTML = tarjetasGeneradas;

}

generateCards(arrayDatos)

function searchEvents() {
    const searchbox = document.getElementById("searchbox");
    const query = searchbox.value.toLowerCase().trim();
    if (query.length > 0) {
        filteredEvents = arrayDatos.filter(evento =>
            evento.name.toLowerCase().includes(query) ||
            evento.description.toLowerCase().includes(query)
        );
    } else {
        filteredEvents = arrayDatos;
    }
    contenedorTarjetas.innerHTML = "";
    generateCards(filteredEvents);
}

/* ----------------------------------------------------- */




function generateCheckboxes(arrayDatos) {
    let categorias = [];
    arrayDatos.forEach((evento) => {
      if (!categorias.includes(evento.category)) {
        categorias.push(evento.category);
      }
    });
    const contenedorFiltro = document.getElementById("checkboxes-container");
    let checkboxesGenerados = "";
    categorias.forEach((categoria) => {
      checkboxesGenerados += `
        <div class="form-check-inline col-12 col-md-5 col-lg-3 col-xl-2 mb-2 ms-2">
          <input class="form-check-input" type="checkbox" value="${categoria}" id="${categoria}">
          <label class="form-check-label" for="${categoria}">
            ${categoria}
          </label>
        </div>
      `;
    });
    contenedorFiltro.innerHTML = checkboxesGenerados;
  }

generateCheckboxes(arrayDatos);  

function filterEvents() {
    const checkboxes = document.querySelectorAll("#checkboxes-container input[type=checkbox]");
    const selectedCategories = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);
    if (selectedCategories.length > 0) {
      filteredEvents = arrayDatos.filter(
        (evento) => selectedCategories.includes(evento.category)
      );
    } else {
      filteredEvents = arrayDatos;
    }
    contenedorTarjetas.innerHTML = "";
    generateCards(filteredEvents);
  }
  
  const checkboxes = document.querySelectorAll("#checkboxes-container input[type=checkbox]");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", filterEvents);
  });
