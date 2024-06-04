// Display the date and time
function updateDateTime() {
  let currentDate = new Date().toDateString();
  let currentTime = new Date().toLocaleTimeString();
  document.getElementById('watch').innerHTML = `${currentDate}-${currentTime}`;
}

setInterval(updateDateTime, 1000);

// Render any items in the cart dynamically to the DOM
const cartProducts = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

const productsContainer = document.querySelector('.shopping-cart');

for (let i = 0; i < cartProducts.length; i++) {
  const product = cartProducts[i];

  const container = document.createElement('div');
  container.classList = 'items';
  container.innerHTML = `
        <img src=${product.image} alt="sneaker" />
        <div class="description">
          <h4>${product.title}</h4>
          <p>${product.color}</p>
          <p class="price">A$${product.price}</p>
        </div>
        <div class="quantity">
          <input type="number" name="pcs" min="1" max="4" placeholder="1" />
          <button>Remove</button>
        </div>
  `;
  productsContainer.appendChild(container);
}
