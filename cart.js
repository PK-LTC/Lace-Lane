
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



function getCart() {
  return JSON.parse(localStorage.getItem('shoppingCart')) || [];
}

function getCartCount() {
  return JSON.parse(localStorage.getItem('cartCount')) || 0;
}

// create the div for display quantity
const createDivQuantity = (item) => {
  const divQuantity = document.createElement('div');
  divQuantity.className = 'quantity';

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

  divQuantity.appendChild(inputQuantity);
  divQuantity.appendChild(btn);
  // console.log(divSize);
  return divQuantity;
}

// create each item in the cart
const createCartItem = (item) => {

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

// display the total price dynamically
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

// Render any items in the cart dynamically to the DOM
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

// eventlistener function when increase or decrease the quantity
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

// eventlistener function when remove item from cart
const removeItem = (e) => {
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
