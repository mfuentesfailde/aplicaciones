
(function () {
  /**
   * Evita registrar varias veces el listener.
   */
  if (window.hasRun) {
    return;
  }

  window.hasRun = true;

  /**
   * Inserta la imagen de la bestia seleccionada.
   */
  function insertBeast(beastURL) {
    removeExistingBeasts();

    const beastImage = document.createElement("img");

    beastImage.setAttribute("src", beastURL);
    beastImage.style.height = "100vh";
    beastImage.className = "beastify-image";

    document.body.appendChild(beastImage);
  }

  /**
   * Elimina las imágenes insertadas anteriormente.
   */
  function removeExistingBeasts() {
    const existingBeasts =
      document.querySelectorAll(".beastify-image");

    for (const beast of existingBeasts) {
      beast.remove();
    }
  }

  /**
   * Escucha los mensajes procedentes del popup.
   */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "beastify") {
      insertBeast(message.beastURL);
    } else if (message.command === "reset") {
      removeExistingBeasts();
    }
  });
})();
