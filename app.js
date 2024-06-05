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

// Update number on the cart icon
function updateCartNum(count, container) {
  if (document.querySelector('.badge')) {
    document.querySelector('.badge').innerHTML = count;
  } else {
    const cartNumEl = document.createElement('span');
    cartNumEl.innerHTML = `
    <span class="badge badge-warning" id="lblCartCount">${count}</span>
  `;
    container.appendChild(cartNumEl);
  }
}

// Add to cart button functionality
const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const addToCartBtns = document.querySelectorAll('button');
const cartContainer = document.getElementById('cart');
let countAddItem = 0;

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
      countAddItem++;
      updateCartNum(countAddItem, cartContainer);
    } else {
      //Not add same items twice
      let result = cart.find((el) => el.title === selectedProduct.title);
      if (result === undefined) {
        cart.push(selectedProduct);
        countAddItem++;
        updateCartNum(countAddItem, cartContainer);
      }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  });
}

// fetch and display data
const info = document.querySelector('.info');

fetch('https://onlineprojectsgit.github.io/API/WDEndpoint.json')
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Request failed!');
  })
  .then((data) => {
    console.log(data);
    const infoHTML = `Built by ${data.info.students[0]}, ${data.info.students[15]}, ${data.info.students[17]}.A group project of ${data.info.Name} program, Cohort ${data.info.cohort}.`;
    info.innerHTML = infoHTML;
  })
  .catch((error) => console.error(error.message));

//Update number show on cart icon
