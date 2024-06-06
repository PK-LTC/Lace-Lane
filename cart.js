//let cartCount;

// Display the date and time
function updateDateTime() {
  let currentDate = new Date().toDateString();
  let currentTime = new Date().toLocaleTimeString();
  document.getElementById('watch').innerHTML = `${currentDate}-${currentTime}`;
}

setInterval(updateDateTime, 1000);


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


// Update number on the cart icon
const updateCartNum = (count) => {

  const cartContainer = document.getElementById('cart');
  const cartTextEl = document.getElementById('cart-text');

  if (document.querySelector('.badge')) {
    document.querySelector('.badge').innerHTML = count;
  } else {
    const cartNumEl = document.createElement('span');
    cartNumEl.innerHTML = `
      <span class="badge" id="cart-count">${count}</span>
    `;
    cartContainer.insertBefore(cartNumEl, cartTextEl);
  }
}

// Render any items in the cart dynamically to the DOM

// const cartProducts = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

// const productsContainer = document.querySelector('.shopping-cart');

// //Calculate dynamice cart total price
// const subtotalEl = document.querySelector('.subtotal');
// const totalEl = document.querySelector('.total');
// let total = 0;

// for (let i = 0; i < cartProducts.length; i++) {
//   const product = cartProducts[i];

//   const container = document.createElement('div');
//   container.classList = `item item-${i + 1}`;
//   container.innerHTML = `
//         <img src=${product.image} alt="sneaker" />
//         <div class="description">
//           <h4 class="title">${product.title}</h4>
//           <p>${product.color}</p>
//           <p class="price">A$${product.price}</p>
//         </div>
//         <div class="quantity">
//           <input type="number" name="pcs" min="1" max="4" placeholder="1" />
//           <button class="remove">Remove</button>
//         </div>
//   `;
//   productsContainer.appendChild(container);

//   total += product.price;
//   subtotalEl.innerHTML = `$${total}`;
//   totalEl.innerHTML = `$${total}`;
// }

// // Remove items from cart using a remove button and update number displayed on cart icon
// const removeBtns = document.querySelectorAll('.remove');
// let count = localStorage.getItem('cartCount');

// for (let i = 0; i < removeBtns.length; i++) {
//   const btn = removeBtns[i];
//   btn.addEventListener('click', (event) => {
//     let cartItems = JSON.parse(localStorage.getItem('cart'));

//     // button's parent element is a div with class quantity
//     const parent = event.target.parentElement;
//     // parent element of the div with class quantity is a div with class item
//     const parentItem = parent.parentElement;
//     // title of the product needs to be removed
//     const removedTitle = parentItem.querySelector('.title').innerHTML;
//     cartItems = cartItems.filter((item) => item.title !== removedTitle);

//     localStorage.setItem('cart', JSON.stringify(cartItems));

//     count--;
//     localStorage.setItem('cartCount', count);
//     window.location.reload();
//   });
// }

// const cartContainer = document.getElementById('cart');
// const cartTextEl = document.getElementById('cart-text');

// function updateCartNum(count, container, referenceEl) {
//   if (document.querySelector('.badge')) {
//     document.querySelector('.badge').innerHTML = count;
//   } else {
//     if (Number(count) !== 0) {
//       const cartNumEl = document.createElement('span');
//       cartNumEl.id = 'cart-count';
//       cartNumEl.classList = 'badge';
//       cartNumEl.innerHTML = count;
//       container.insertBefore(cartNumEl, referenceEl);
//     }
//   }
// }

// updateCartNum(count, cartContainer, cartTextEl);


function getCart() {
  return JSON.parse(localStorage.getItem('shoppingCart')) || [];
}

function getCartCount() {
  return JSON.parse(localStorage.getItem('cartCount')) || 0;
}

const createDivQuantity = (item) => {
  const divQuantity = document.createElement('div');
  divQuantity.className = 'quantity';

  // const labelQuantity = document.createElement('label');
  // labelQuantity.textContent = 'Select quantity  ';
  const inputQuantity = document.createElement('input');
  inputQuantity.setAttribute('type', 'number');
  inputQuantity.setAttribute('id', item.id);
  inputQuantity.setAttribute('name', 'pcs');
  inputQuantity.setAttribute('min', '1');
  inputQuantity.setAttribute('max', '4');
  inputQuantity.setAttribute('step', '1'); 
  inputQuantity.setAttribute('value', item.quantity);

  const btn = document.createElement('button');
  btn.id = 'remove' + item.id;
  btn.className = 'removeBtn';
  btn.textContent = 'Remove';
  // btn.addEventListener('click', removeItem());

  // divQuantity.appendChild(labelQuantity);
  divQuantity.appendChild(inputQuantity);
  divQuantity.appendChild(btn);
  // console.log(divSize);
  return divQuantity;
}

const createCartItem = (item) => {
  // console.log(item);
  const div = document.createElement('div');
  div.classList.add('items');
  div.classList.add('item-'+ (item.id +1));
  
  const img = document.createElement('img');
  img.src = item.imgSrc;
  img.alt = item.name;
  div.appendChild(img);

  const divDescription = document.createElement('div');
  divDescription.className = 'description';

  const h4 = document.createElement('h4');
  h4.textContent = item.name;

  const pColor = document.createElement('p');
  pColor.textContent = item.color;

  const span = document.createElement('span');
  span.textContent='Size: ' + item.size;

  const pPrice = document.createElement('p');
  pPrice.textContent = 'A$' + item.price;
  pPrice.className = 'price';

  divDescription.appendChild(h4);
  divDescription.appendChild(pColor);
  divDescription.appendChild(span);
  divDescription.appendChild(pPrice);

  div.appendChild(divDescription);

  div.appendChild(createDivQuantity(item));

  return div;

}

const displayTotalPrice = () => {

  let tdPriceSubtotal = document.getElementById('priceSubtotal');
  let tdPriceTotal = document.getElementById('priceTotal')
  
  let totalPrice = 0;
  let cart = getCart();

  if(cart) {
      cart.forEach ( item => {
          totalPrice += Number(item.price) * Number(item.quantity);
      }
      )
  }

  tdPriceSubtotal.textContent= 'A$' + totalPrice;
  tdPriceTotal.textContent = 'A$' + totalPrice;
}

const displayShoppingCart = () => {

  let divShoppingCart = document.querySelector('div.shopping-cart');
  let cart = getCart();
  let cartCount = getCartCount();
  // console.log(cart);
  if(cart) {
      cart.forEach(item => {
          divShoppingCart.appendChild(createCartItem(item));
      });

      document.querySelectorAll('.removeBtn').forEach( btn => {
          btn.addEventListener('click', removeItem);
      })

      document.querySelectorAll('input').forEach( input => {
          if ( input.name === 'pcs' ) {
              input.addEventListener('change', onQuantityChange)
          }
      })
  }

  updateCartNum(cartCount);

  displayTotalPrice();

}

const onQuantityChange = (e) => {
  let input = e.target;

  let cart = getCart();

  cart[input.id].quantity = input.value;

  let cartCount = 0;
  cart.forEach( item => {
    cartCount += Number(item.quantity);
  })

  localStorage.setItem('shoppingCart', JSON.stringify(cart));
  localStorage.setItem('cartCount', cartCount);

  displayTotalPrice();
  updateCartNum(cartCount);
}


const removeItem = (e) => {
  // console.log('event listener added');
  let cartCount = 0;
  let btn = e.target;
  let btnIndex = btn.id.replace('remove','');
  
  let cart = getCart();
  cart.splice(btnIndex, 1)

  cart.forEach( (item, index) => {
      item.id = index;
      cartCount += Number(item.quantity);
  })


  localStorage.setItem('shoppingCart', JSON.stringify(cart));
  localStorage.setItem('cartCount', cartCount);
  
  document.querySelectorAll('.removeBtn').forEach( btn => {
      btn.removeEventListener('click', removeItem);
  })

  document.querySelectorAll('input').forEach( input => {
      if ( input.name === 'pcs' ) {
          input.removeEventListener('change', onQuantityChange)
      }
  })

  let divShoppingCart = document.querySelector('div.shopping-cart');
  divShoppingCart.innerHTML = '<h3>Shopping Cart</h3>'
  
  displayShoppingCart();
}


window.addEventListener("load", displayShoppingCart());
