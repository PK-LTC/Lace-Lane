import products from './products.js';

// variable for the cart badge 
// let cartCount = 0;
// const productsContainer = document.querySelector('.products');



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

// export default updateCartNum;

//store a minimum of five products in your shop items and render the shop items dynamically to the DOM

// products.forEach((product, i) => {
//   const container = document.createElement('div');
//   container.classList = `product product-${i + 1}`;
//   container.innerHTML = `
//     ${i === 0 || i == 1 ? '<span class="new-tag">New</span>' : ''}
//     <img src=${product.image} alt="sneaker" />
//     <h4>${product.title}</h4>
//     <p class="color">${product.color}</p>
//     <p class="price">A$${product.price}</p>
//     <button>Add to Cart</button>
//   `;
//   productsContainer.appendChild(container);
// });

// // Add to cart button functionality
// const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
// const addToCartBtns = document.querySelectorAll('button');
// const cartContainer = document.getElementById('cart');
// const cartTextEl = document.getElementById('cart-text');
// let countAddItem = 0;

// for (let i = 0; i < addToCartBtns.length; i++) {
//   const btn = addToCartBtns[i];
//   btn.addEventListener('click', (event) => {
//     const parent = event.target.parentElement;
//     const title = parent.querySelector('h4').innerHTML;
//     const price = Number(parent.querySelector('.price').innerHTML.slice(2));
//     const image = parent.querySelector('img').src;
//     const color = parent.querySelector('.color').innerHTML;
//     const selectedProduct = { title, price, color, image };

//     if (cart.length === 0) {
//       cart.push(selectedProduct);
//       countAddItem++;
//       updateCartNum(countAddItem, cartContainer, cartTextEl);
//     } else {
//       //Not add same items twice
//       let result = cart.find((el) => el.title === selectedProduct.title);
//       if (result === undefined) {
//         cart.push(selectedProduct);
//         countAddItem++;
//         updateCartNum(countAddItem, cartContainer, cartTextEl);
//       }
//     }

//     localStorage.setItem('cart', JSON.stringify(cart));
//     localStorage.setItem('cartCount', countAddItem);
//   });
// }


const divProducts = document.querySelector('.products');

const createDivSize = (product) => {
    const divSize = document.createElement('div');
    divSize.className = 'size';

    const labelSize = document.createElement('label');
    labelSize.textContent = 'Select size  ';
    const inputSize = document.createElement('input');
    inputSize.setAttribute('type', 'number');
    inputSize.setAttribute('id', 'size_' + product.className);
    inputSize.setAttribute('name', 'size');
    inputSize.setAttribute('min', '36');
    inputSize.setAttribute('max', '45');
    inputSize.setAttribute('step', '0.5'); 
    inputSize.setAttribute('value', '42');

    divSize.appendChild(labelSize);
    divSize.appendChild(inputSize);
    // console.log(divSize);
    return divSize;
}

const createDivColor = (product) => {
    const divColor = document.createElement('div');
    divColor.className = 'color';

    const labelColor = document.createElement('label');
    labelColor.textContent = 'Select Color ';

    const select = document.createElement('select');
    select.setAttribute('id', 'color_' + product.className);
    select.setAttribute('name', 'color');

    product.color.forEach(color => {
        const opt = document.createElement('option');
        opt.value = color;
        opt.innerText = color;
        select.appendChild(opt);
    })

    divColor.appendChild(labelColor);
    divColor.appendChild(select);

    // console.log(divColor);

    return divColor;
}

const createDivQuantity = (product) => {
    const divQuantity = document.createElement('div');
    divQuantity.className = 'quantity';

    const labelQuantity = document.createElement('label');
    labelQuantity.textContent = 'Select quantity  ';
    const inputQuantity = document.createElement('input');
    inputQuantity.setAttribute('type', 'number');
    inputQuantity.setAttribute('id', 'quantity_' + product.className);
    inputQuantity.setAttribute('name', 'quantity');
    inputQuantity.setAttribute('min', '1');
    inputQuantity.setAttribute('max', '4');
    inputQuantity.setAttribute('step', '1'); 
    inputQuantity.setAttribute('value', '1');

    divQuantity.appendChild(labelQuantity);
    divQuantity.appendChild(inputQuantity);
    // console.log(divSize);
    return divQuantity;
}

const createProduct = (product) => {
    const div = document.createElement('div');
    div.classList.add('product');
    div.classList.add(product.className);

    const span = document.createElement('span');
    span.className = 'new-tag';
    span.textContent = product.tag;
    div.appendChild(span);

    const img = document.createElement('img');
    img.src = './resources/images/' + product.imgSrc;
    img.alt = 'sneaker'
    div.appendChild(img);

    const h4 = document.createElement('h4');
    h4.innerText = product.name;
    div.appendChild(h4);

    const p = document.createElement('p');
    p.className = 'price';
    p.innerText = 'A$' + product.price;
    div.appendChild(p);

    div.appendChild(createDivSize(product));

    div.appendChild(createDivColor(product));

    div.appendChild(createDivQuantity(product));

    const btn = document.createElement('button');
    btn.className = 'addToCart';
    btn.textContent = 'Add to Cart';
    div.appendChild(btn);

    return div;

}

products.forEach( element => divProducts.appendChild(createProduct(element)) )


// step 6 - Add to Cart function 

const addToCart = (e) => {

    let item = e.target.parentNode.childNodes;

    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    let cartCount = JSON.parse(localStorage.getItem('cartCount')) || 0;
    
    let id = cart.length;
    let imgSrc = item[1].src;
    let name = item[2].innerText;
    let price = item[3].innerText.replace('A$', '');
    let size = item[4].childNodes[1].value;
    let color = item[5].childNodes[1].value;
    let quantity = item[6].childNodes[1].value;

    let newItem = {
        id: id,
        imgSrc: imgSrc,
        name: name,
        price: price,
        size: size,
        color: color,
        quantity: quantity
    };

    
    cartCount += Number(quantity);
    updateCartNum(cartCount);

    cart.push(newItem);

    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    localStorage.setItem('cartCount', cartCount);

}

const addToCartBtns = document.querySelectorAll('.addToCart');
addToCartBtns.forEach( btn => {
    btn.addEventListener('click', addToCart);
})

let cartCount = JSON.parse(localStorage.getItem('cartCount')) || 0;
updateCartNum(cartCount);