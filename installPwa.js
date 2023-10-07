let deferredPrompt;

// Escucha el evento beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
  // Evita que Chrome muestre el mini-infobar
  e.preventDefault();
  // Guarda el evento para usarlo más tarde
  deferredPrompt = e;
  // Muestra el botón de instalación
  document.getElementById('installPWA').style.display = 'block';
});

// Función para manejar la instalación
function installApp() {
  if (deferredPrompt) {
    // Muestra el modal de instalación
    deferredPrompt.prompt();
    // Espera a que el usuario responda
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('El usuario aceptó la instalación');
      } else {
        console.log('El usuario rechazó la instalación');
      }
      deferredPrompt = null;
    });
  }
}

// Asigna la función al botón
document.getElementById('installPWA').addEventListener('click', installApp);
