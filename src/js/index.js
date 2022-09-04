let cart = [];

const init = () => {
  loadCart();
  renderProducts(items);
  renderDynamicFilters();
  setupFilterHandlers();
  setupDetailModalHandlers();
  setupCartHandlers();
  setupProductHandlers();
  setupFilterBlock();
};

const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const loadCart = () => {
  const c = localStorage.getItem('cart');
  try {
    cart = Array.isArray(JSON.parse(c)) ? JSON.parse(c) : [];
    renderCart();
  } catch (e) {
    console.error('Load cart exception:', e.message);
  }
};

const setupProductHandlers = () => {
  const products = document.getElementById('js-products');
  products.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    const product = items.find((p) => p.id === +card.dataset.id);
    if (!e.target.classList.contains('js-no-dialog')) renderDetailModal(product);
    if (e.target.classList.contains('add-to-cart')) addToCart(product);
  });
};

const setupDetailModalHandlers = () => {
  const modalContainer = document.getElementById('js-modal-container');
  modalContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('overlay')) {
      closeDetailModal(modalContainer);
    }
  });
};

const setupCartHandlers = () => {
  const cartBtn = document.getElementById('js-cart-toggle');
  const cartContent = document.getElementById('js-cart');
  cartBtn.addEventListener('click', () => {
    if (cartBtn.classList.contains('empty')) return;
    cartContent.classList.toggle('cart-opened');
  });
  cartContent.addEventListener('click', (e) => {
    const i = e.target.closest('.product-buy')?.dataset?.index;
    if (e.target.classList.contains('delete')) {
      cart.splice(i, 1);
      renderCart();
      saveCart();
    }
    if (e.target.classList.contains('counter-button')) {
      if (e.target.classList.contains('decrement')) {
        if (cart[i].num > 1) cart[i].num--;
      } else {
        if (cart[i].num < 4) cart[i].num++;
      }
      renderCart();
      saveCart();
    }
  });
};

const addToCart = (p) => {
  const inCart = cart.find((ci) => ci.product.id === p.id);
  if (inCart) {
    if(inCart.num >= 4) return;
    inCart.num++;
  } else {
    cart.push({
      product: p,
      num: 1,
    });
  }
  renderCart();
  saveCart();
};

const calculateCartTotals = () => {
  return cart.reduce((res, { product, num }) => {
    res.items += num;
    res.price += num * product.price;
    return res;
  }, {items: 0, price: 0});
};

const renderCart = () => {
  const cartToggle = document.getElementById('js-cart-toggle');
  const cartCount = cartToggle.querySelector('#js-cart-count');
  const cartBlock = document.getElementById('js-cart');
  const cartContent = cartBlock.querySelector('#js-cart-content');
  const totals = calculateCartTotals();
  cartToggle.classList.toggle('empty', !totals.items);
  cartCount.innerText = totals.items;
  if (!totals.items) cartBlock.classList.remove('cart-opened');
  cartContent.innerHTML = `
   ${cart.map(({ product, num }, i) => `
      <div class="product-buy" data-index="${i}">
         <div class="product-photo">
             <img src="images/${product.imgUrl}" alt="Photo product">
         </div>
         <div class="info">
             <div class="product-name">${product.name}</div>
             <div class="price">$${product.price}</div>
         </div>
         <batton class="decrement counter-button" ${num <= 1 ? 'disabled' : ''}><</batton>
         <input type="text" class="product-counter " value="${num}">
         <batton class="increment counter-button" ${num >= 4 ? 'disabled' : ''}>></batton>
         <div class="delete">x</div>
       </div>
   `).join('')}
   <div class="total-price">
       <div class="amount">
           <span>Total amount: </span>${totals.items} ptc.
       </div>
       <div class="price">
           <span>Total price: </span>${totals.price}$
       </div>
   </div>
  `
};

const setupFilterBlock = () => {
  const filterContainer = document.getElementById('js-filter');
  filterContainer.addEventListener('click', (e) => {
    const filterBlock = e.target.closest('.filter-block');
    if (filterBlock) {
      filterBlock.classList.toggle('open');
      const icl = filterBlock.querySelector('.i').classList;
      icl.toggle('icon-arrow_left');
      icl.toggle('icon-arrow_down');
    }
  });
};

const setupFilterHandlers = () => {
  const filterBtn = document.getElementById('js-filter-toggle');
  const content = document.getElementById('js-content');
  const filter = document.getElementById('js-filter');
  filterBtn.addEventListener('click', () => {
    content.classList.toggle('filter-opened');
  });

  const onPriceChange = (e) => {
    if(+e.target.value <= +e.target.min) e.target.value = e.target.min;
    if(+e.target.value >= +e.target.max) e.target.value = e.target.max;
    setTimeout(calculateFilter);
  };

  const from = filter.querySelector('#js-min-price');
  from.addEventListener('change', onPriceChange);

  const to = filter.querySelector('#js-max-price');
  to.addEventListener('change', onPriceChange);

  filter.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT' && e.target.closest('label')) {
      setTimeout(calculateFilter);
    }
  });
};

const getCheckedValues = (checkboxes) => [...checkboxes].map((input) => input.value);

const calculateFilter = () => {
  const filter = document.getElementById('js-filter');
  const from = +filter.querySelector('#js-min-price').value;
  const to = +filter.querySelector('#js-max-price').value;
  const colors = getCheckedValues(filter.querySelectorAll('#js-colors input:checked'));
  const memories = getCheckedValues(filter.querySelectorAll('#js-memory input:checked'));
  const os = getCheckedValues(filter.querySelectorAll('#js-os input:checked'));
  const display = getCheckedValues(filter.querySelectorAll('#js-display input:checked')).map((d) => {
    const range = d.split('-');
    return [+range[0], +range[1] || Infinity];
  });

  const filtered = items.filter((p) => {
    const isColor = colors.length ? colors.some((color) => p.color.includes(color)) : true;
    const isMemory = memories.length ? memories.includes(p.storage?.toString()) : true;
    const isOS = os.length ? os.includes(p.os) : true;
    const isDisplay = display.length ? display.some(([min, max]) => p.display >= min && p.display <= max) : true;
    return from <= p.price && to >= p.price && isColor && isMemory && isOS && isDisplay;
  });
  renderProducts(filtered);
};

const getReviewsText = (reviews) => {
  if (reviews <= 25) {
    return 'Low';
  } else if (reviews <= 50) {
    return 'Below average';
  } else if (reviews <= 75) {
    return 'Above average';
  } else {
    return 'Hight';
  }
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const closeDetailModal = (container) => {
  container.innerHTML = '';
};

const getFilterOptions= () => {
  const filters = items.reduce((res, product) => {
    res.min = Math.min(res.min, product.price);
    res.max = Math.max(res.max, product.price);
    if (product.storage) res.memories[product.storage] = 1;
    if (product.os) res.software[product.os] = 1;
    product.color.forEach((color) => res.colors[color] = 1);
    return res;
  }, {
    min: Infinity,
    max: 0,
    colors: {},
    memories: {},
    software: {},
  });
  return {
    min: filters.min,
    max: filters.max,
    colors: Object.keys(filters.colors),
    memories: Object.keys(filters.memories),
    software: Object.keys(filters.software),
  }
};

const renderFiltersBlock = (label, items, id) => {
  return `
    <div class="filter-block" id="${id}">
        <div class="filter-container">
          <span>${label}</span>
          <span class="i icon-arrow_left"></span>
        </div>
        <div class="filter-value">
            <div class="filter-collapse">
                ${items.map((item) => `
                  <div class="custom-checkbox">
                      <label class="custom-control-label">
                          <input type="checkbox" class="custom-checkbox-input" name="color" value="${item}">
                          <span class="icon icon-check"></span>
                          ${item}
                      </label>
                  </div>
                `).join('')}
            </div>
        </div>
      </div>
  `;
};

const renderDynamicFilters = () => {
  const filters = getFilterOptions();
  const minPrice = document.getElementById('js-min-price');
  minPrice.value = filters.min;
  minPrice.setAttribute('min', filters.min);
  minPrice.setAttribute('max', filters.max);
  const maxPrice = document.getElementById('js-max-price');
  maxPrice.value = filters.max;
  maxPrice.setAttribute('min', filters.min);
  maxPrice.setAttribute('max', filters.max);
  const filterContainer = document.getElementById('js-dynamic-filter');
  filterContainer.innerHTML = `
    ${renderFiltersBlock('Colors', filters.colors, 'js-colors')}
    ${renderFiltersBlock('Memory', filters.memories,'js-memory')}
    ${renderFiltersBlock('OS', filters.software, 'js-os')}
  `;
};

const renderDetailModal = (product) => {
  const container = document.getElementById('js-modal-container');
  container.innerHTML = `
    <div class="overlay"></div>
    <div class="modal-content">
        <div class="product-detail">
          <div class="product-block">
            <div class="product-img">
                  <img src="images/${product.imgUrl}" alt="Photo product">
             </div>
          </div>
          <div class="product-info product-block">
              <h2 class="product-name">${product.name}</h2>
              <div class="footer-card">
                  <div class="col general-liked">
                      <div class="quantity-liked">
                          <span class="icon icon-like_filled"></span>
                          <span class="count-liked">${product.orderInfo.reviews}%</span>
                          Positive reviews
                      </div>
                      <div class="rating">${getReviewsText(product.orderInfo.reviews)}</div>
                  </div>
                  <div class="col number-orders">
                      <div class="count-orders">${getRandomInt(300, 1000)}</div>
                      orders
                  </div>
              </div>
              <div class="product-description">
                  Color:
                  <span class="description-value">${product.color.join(', ')}</span>
              </div>
              ${product.os ? `
                <div class="product-description">
                  Operating System:
                  <span class="description-value">${product.os}</span>
                 </div>
              ` : ''}
              <div class="product-description">
                  Chip:
                  <span class="description-value">${product.chip.name}</span>
              </div>
              <div class="product-description">
                  Height:
                  <span class="description-value">${product.size.height}</span>
              </div>
              <div class="product-description">
                  Width:
                  <span class="description-value">${product.size.width}</span>
              </div>
              <div class="product-description">
                  Depth:
                  <span class="description-value">${product.size.depth}</span>
              </div>
              <div class="product-description">
                  Weight:
                  <span class="description-value">${product.size.weight}</span>
              </div>
          </div>
          <div class="product-block product-price">
             <div class="price">
                  <span class="currency">$</span>
                  <span class="count-price">${product.price}</span>
                </div>  
                <div class="stock">
                  <span>Stock:</span>
                  <span class="stock-value">${product.orderInfo.inStock}</span> 
                  psc.
                </div>
                <button class="add-to-cart js-no-dialog" ${product.orderInfo.inStock ? '' : 'disabled'}>Add to cart</button>
          </div>
      </div>
     </div>
  `;
};

const renderProducts = (products) => {
  const productsContainer = document.getElementById('js-products');
  productsContainer.innerHTML = products.map((p) => {
    return `
      <div class="card" data-id="${p.id}">
        <div class="user-liked">
          <span class="icon icon-like_empty js-no-dialog"></span>
          <!--                            <span class="icon icon-like_filled"></span>-->
        </div>
        <div class="item-info">
          <div class="product-photo">
            <img src="images/${p.imgUrl}" alt="Photo product">
          </div>
          <div class="product-description">
            <h2 class="product-name">${p.name}</h2>
            <div class="quantity-product">
              <div class="amount-items">
                <span class="icon icon-${p.orderInfo.inStock ? 'check' : 'close'}"></span>
                <span class="count-quantity">${p.orderInfo.inStock}</span>
                left in stock
              </div>
              <div class="price">
                <span>Price:</span>
                <span class="count-price">${p.price}</span>
                <span class="currency">$</span>
              </div>
              <button class="add-to-cart js-no-dialog" ${p.orderInfo.inStock ? '' : 'disabled'}>Add to cart</button>
            </div>
          </div>
        </div>
        <div class="footer-card">
          <div class="col general-liked">
            <div class="quantity-liked">
              <span class="icon icon-like_filled"></span>
              <span class="count-liked">${p.orderInfo.reviews}%</span>
              Positive reviews
            </div>
            <div class="rating">${getReviewsText(p.orderInfo.reviews)}</div>
          </div>
          <div class="col number-orders">
            <div class="count-orders">${getRandomInt(300, 1000)}</div>
            orders
          </div>
        </div>
      </div>
    `;
  }).join('');
};

window.addEventListener('load', init);
