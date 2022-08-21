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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const renderProducts = (products) => {
  const productsContainer = document.getElementById('js-products');
  productsContainer.innerHTML = products.map((p) => {
    return `
      <div class="card">
        <div class="user-liked">
          <span class="icon icon-like_empty"></span>
          <!--                            <span class="icon icon-like_filled"></span>-->
        </div>
        <div class="item-info">
          <a class="product-photo" href="#">
            <img src="images/${p.imgUrl}" alt="Photo product">
          </a>
          <div class="product-description">
            <a class="link-product-name" href="#">
                <h2 class="product-name">${p.name}</h2>
            </a>
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
              <button class="add-to-cart" ${p.orderInfo.inStock ? '' : 'disabled'}>Add to cart</button>
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

renderProducts(items);