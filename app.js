import products from './products.js';

const productsContainer = document.querySelector('.products');

/*store a minimum of five products in your shop items and 
render the shop items dynamically to the DOM */
products.forEach((product, i) => {
  const container = document.createElement('div');
  container.classList = `product product-${i + 1}`;
  container.innerHTML = `
    ${i === 0 || i == 1 ? '<span class="new-tag">New</span>' : ''}
    <img src=${product.image} alt="sneaker" />
    <h4>${product.title}</h4>
    <p class="price">A$${product.price}</p>
    <button>Add to Cart</button>
  `;
  productsContainer.appendChild(container);
});

// Display the date and time
function updateDateTime() {
  let currentDate = new Date().toDateString();
  let currentTime = new Date().toLocaleTimeString();
  document.getElementById('watch').innerHTML = `${currentDate}-${currentTime}`;
}

setInterval(updateDateTime, 1000);
