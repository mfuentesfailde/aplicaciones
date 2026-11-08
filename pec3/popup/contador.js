
/**
 * CSS para ocultar toda la página excepto la imagen.
 */
const hidePage = `
  body > :not(.beastify-image) {
    display: none;
  }
`;

/**
 * Obtiene la URL de la imagen según la bestia seleccionada.
 */
function beastNameToURL(beastName) {
  switch (beastName) {
    case "Rana":
      return browser.runtime.getURL("beasts/frog.jpg");

    case "Serpiente":
      return browser.runtime.getURL("beasts/snake.jpg");

    case "Tortuga":
      return browser.runtime.getURL("beasts/turtle.jpg");

    default:
      throw new Error("Bestia desconocida: " + beastName);
  }
}

/**
 * Envía un mensaje al script de contenido.
 */
async function sendCommand(tabId, message) {
  await browser.tabs.sendMessage(tabId, message);
}

/**
 * Oculta la página e inserta la bestia.
 */
async function beastify(tabId, beastName) {
  const url = beastNameToURL(beastName);

  await browser.scripting.insertCSS({
    target: { tabId },
    css: hidePage
  });

  await sendCommand(tabId, {
    command: "beastify",
    beastURL: url
  });
}

/**
 * Restaura la página.
 */
async function reset(tabId) {
  await browser.tabs.sendMessage(tabId, {
    command: "reset"
  });

  await browser.scripting.removeCSS({
    target: { tabId },
    css: hidePage
  });
}

/**
 * Maneja los errores.
 */
function reportError(error) {
  console.error(
    `No se pudo ejecutar Beastify: ${error.message}`
  );
}

/**
 * Registra los eventos de los botones.
 */
function listenForClicks() {
  document.addEventListener("click", async (e) => {
    const button = e.target.closest("button");

    if (!button || !button.closest("#popup-content")) {
      return;
    }

    try {
      const tabs = await browser.tabs.query({
        active: true,
        currentWindow: true
      });

      if (!tabs.length) {
        throw new Error("No se encontró una pestaña activa");
      }

      const tabId = tabs[0].id;

      if (button.type === "reset") {
        await reset(tabId);
      } else {
        await beastify(tabId, button.textContent.trim());
      }

    } catch (error) {
      reportError(error);
    }
  });
}

/**
 * Muestra el mensaje de error en el popup.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");

  console.error(
    `Error al ejecutar el script de contenido Beastify: ${error.message}`
  );
}

/**
 * Al abrir el popup, inyecta el script de contenido.
 */
async function initialize() {
  try {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true
    });

    if (!tabs.length) {
      throw new Error("No se encontró una pestaña activa");
    }

    await browser.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content_scripts/beastify.js"]
    });

    listenForClicks();

  } catch (error) {
    reportExecuteScriptError(error);
  }
}

initialize();
