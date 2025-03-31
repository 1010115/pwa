const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration =
        await navigator.serviceWorker.register("service-worker.js");
      if (registration.installing) {
        console.log("Installing service worker");
      } else if (registration.waiting) {
        console.log("Waiting for service worker to activate");
      } else if (registration.active) {
        console.log("Service worker is active");
      }
    } catch (error) {
      console.error(`Error registering service worker: ${error.message}`);
    }
  }
};

registerServiceWorker();
