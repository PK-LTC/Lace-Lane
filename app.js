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
    <p class="color">${product.color}</p>
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

// Add to cart button functionality

//Check if there are items inside cart
const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const addToCartBtns = document.querySelectorAll('button');

for (let i = 0; i < addToCartBtns.length; i++) {
  const btn = addToCartBtns[i];
  btn.addEventListener('click', (event) => {
    const parent = event.target.parentElement;
    const title = parent.querySelector('h4').innerHTML;
    const price = Number(parent.querySelector('.price').innerHTML.slice(2));
    const image = parent.querySelector('img').src;
    const color = parent.querySelector('.color').innerHTML;
    const selectedProduct = { title, price, color, image };

    if (cart.length === 0) {
      cart.push(selectedProduct);
    } else {
      //Not add same items twice
      let result = cart.find((el) => el.title === selectedProduct.title);
      if (result === undefined) {
        cart.push(selectedProduct);
      }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  });
}
