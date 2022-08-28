const init = () => {
  renderProducts(items);
  renderDynamicFilters();
  setupFilterHandlers();
  setupDetailModalHandlers();
};

const setupDetailModalHandlers = () => {
  const openProduct = document.getElementById('js-products');
  const modalContainer= document.getElementById('js-modal-container');
  openProduct.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!e.target.classList.contains('js-no-dialog') && card) {
      console.log(card.dataset.id);
      const product = items.find((p) => p.id === +card.dataset.id);
      renderDetailModal(modalContainer, product);
    }
  });
  modalContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('overlay')) {
      closeDetailModal(modalContainer);
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

const renderDetailModal = (container, product) => {
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