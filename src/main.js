const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js",
        { scope: "/" },
      );
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
let productField = document.querySelector("ul.product-list");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchAllProjects() {
  const allProjects = [];
  let page = 1;
  let keepGoing = true;

  while (keepGoing) {
    try {
      const res = await fetch(`https://cmgt.hr.nl/api/projects/?page=${page}`);
      const data = await res.json();
      if (data.length === 0) {
        keepGoing = false;
      } else {
        allProjects.push(...data.data);
        page++;
        await sleep(1000);
      }
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
      keepGoing = false;
    }
  }
  console.log(allProjects);
  return allProjects;
}

fetchAllProjects();

function createProject(project) {
  let product = document.createElement("li");
  let heroContainer = document.createElement("div");
  let picture = document.createElement("picture");
  let img = document.createElement("img");
  let centerText = document.createElement("div");
  let title = document.createElement("h3");
  let ctaWrapper = document.createElement("div");
  let learn = document.createElement("a");
  let buy = document.createElement("a");

  product.classList.add("product");
  heroContainer.classList.add("hero-container");
  img.classList.add("product-image");
  centerText.classList.add("center-text");
  ctaWrapper.classList.add("cta-wrapper");
  learn.classList.add("learn");
  buy.classList.add("buy");

  product.appendChild(heroContainer);
  product.appendChild(centerText);
  heroContainer.appendChild(picture);
  picture.appendChild(img);
  centerText.appendChild(title);
  centerText.appendChild(ctaWrapper);
  ctaWrapper.appendChild(learn);
  ctaWrapper.appendChild(buy);

  img.src = project.header_image;
  img.alt = project.title;
  title.textContent = project.title;
  learn.textContent = project.author;
}

// <li class="product">
//     <div class="hero-container">
//         <picture>
//             <img
//                 class="product-image"
//                 src="/public/assets/products/hero.webp"
//                 alt="Hero Image"
//             />
//         </picture>
//     </div>
//     <div class="center-text">
//         <h3>Product Title</h3>
//         <span class="cta-wrapper">
//             <a class="learn">Learn more</a>
//             <a class="buy">Buy </a>
//         </span>
//     </div>
