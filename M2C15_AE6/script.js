$(document).ready(function () {

  let favoritos = [];


  $('[data-toggle="tooltip"]').tooltip();

  $(document).on("click", ".btn-fav", function () {

    let card = $(this).closest(".producto");
    let id = card.data("id");
    let nombre = card.data("nombre");
    let boton = $(this);

    if (favoritos.includes(id)) {
      favoritos = favoritos.filter(f => f !== id);
      card.removeClass("fav");
      boton
        .removeClass("btn-danger")
        .addClass("btn-outline-danger")
        .text("♡ Favorito");
    } else {
      favoritos.push(id);
      card.addClass("fav");
      boton
        .removeClass("btn-outline-danger")
        .addClass("btn-danger")
        .text("♥ Favorito");
    }

    renderFavoritos();
  });

  // Renderiza 
  function renderFavoritos() {
    let lista = $("#listaFavoritos");
    lista.empty();

    // Contador
    $("#contadorFav").text(favoritos.length);

    if (favoritos.length === 0) {
      $("#sinFav").show();
      return;
    }

    $("#sinFav").hide();

    favoritos.forEach(id => {
      let card = $(`.producto[data-id='${id}']`);
      let nombre = card.data("nombre");

      let item = $(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>${nombre}</span>
          <button class="btn btn-sm btn-outline-light btn-quitar">Quitar</button>
        </li>
      `);

      // Evento quitar
      item.find(".btn-quitar").on("click", function () {
        favoritos = favoritos.filter(f => f !== id);

        // Restaurar 
        card.removeClass("fav");
        card.find(".btn-fav")
          .removeClass("btn-danger")
          .addClass("btn-outline-danger")
          .text("♡ Favorito");

        renderFavoritos();
      });

      lista.append(item);
    });
  }

});

