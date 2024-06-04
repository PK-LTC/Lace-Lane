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
}

// Remove items from cart using a remove button
const removeBtns = document.querySelectorAll('.remove');
console.log(removeBtns);

for (let i = 0; i < removeBtns.length; i++) {
  const btn = removeBtns[i];
  btn.addEventListener('click', (event) => {
    let cartItems = JSON.parse(localStorage.getItem('cart'));
    console.log(cartItems);
    // button's parent element is a div with class quantity
    const parent = event.target.parentElement;
    // parent element of the div with class quantity is a div with class item
    const parentItem = parent.parentElement;
    // title of the product needs to be removed
    const removedTitle = parentItem.querySelector('.title').innerHTML;
    cartItems = cartItems.filter((item) => item.title !== removedTitle);
    console.log(cartItems);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    window.location.reload();
  });
}
