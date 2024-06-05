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

//Calculate dynamice cart total price
const subtotalEl = document.querySelector('.subtotal');
const totalEl = document.querySelector('.total');
let total = 0;

for (let i = 0; i < cartProducts.length; i++) {
  const product = cartProducts[i];

  const container = document.createElement('div');
  container.classList = `item item-${i + 1}`;
  container.innerHTML = `
        <img src=${product.image} alt="sneaker" />
        <div class="description">
          <h4 class="title">${product.title}</h4>
          <p>${product.color}</p>
          <p class="price">A$${product.price}</p>
        </div>
        <div class="quantity">
          <input type="number" name="pcs" min="1" max="4" placeholder="1" />
          <button class="remove">Remove</button>
        </div>
  `;
  productsContainer.appendChild(container);

  total += product.price;
  subtotalEl.innerHTML = `$${total}`;
  totalEl.innerHTML = `$${total}`;
}

// Remove items from cart using a remove button and update number displayed on cart icon
const removeBtns = document.querySelectorAll('.remove');
let count = localStorage.getItem('cartCount');

for (let i = 0; i < removeBtns.length; i++) {
  const btn = removeBtns[i];
  btn.addEventListener('click', (event) => {
    let cartItems = JSON.parse(localStorage.getItem('cart'));

    // button's parent element is a div with class quantity
    const parent = event.target.parentElement;
    // parent element of the div with class quantity is a div with class item
    const parentItem = parent.parentElement;
    // title of the product needs to be removed
    const removedTitle = parentItem.querySelector('.title').innerHTML;
    cartItems = cartItems.filter((item) => item.title !== removedTitle);

    localStorage.setItem('cart', JSON.stringify(cartItems));

    count--;
    localStorage.setItem('cartCount', count);
    window.location.reload();
  });
}

const cartContainer = document.getElementById('cart');
const cartTextEl = document.getElementById('cart-text');

function updateCartNum(count, container, referenceEl) {
  if (document.querySelector('.badge')) {
    document.querySelector('.badge').innerHTML = count;
  } else {
    if (Number(count) !== 0) {
      const cartNumEl = document.createElement('span');
      cartNumEl.id = 'cart-count';
      cartNumEl.classList = 'badge';
      cartNumEl.innerHTML = count;
      container.insertBefore(cartNumEl, referenceEl);
    }
  }
}

updateCartNum(count, cartContainer, cartTextEl);

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
    const infoHTML = `Built by ${data.info.students[0]}, ${data.info.students[15]}, ${data.info.students[17]}.A group project of ${data.info.Name} program, Cohort ${data.info.cohort}.`;
    info.innerHTML = infoHTML;
  })
  .catch((error) => console.error(error.message));
