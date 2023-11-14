import { formatCurrency } from '../scripts/utils/money.js'




const Product = {
  
	render: (product) => {
		return `
        <div class="product-container">
          <div class="product-image-container">
            <a class="product-image-link" href="/#/product/${product.id}">
              <img class="product-image" src="${product.image}">
            </a>
          </div>
  
          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>
  
          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="./images/images/ratings/rating-${
								product.rating.stars * 10
							}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>
  
          <div class="product-price  js-product-price">
            R${formatCurrency(product.priceCents)}
          </div>
  
          <div class="product-quantity-container">
            <select class="js-product-quantity">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
  
          <div class="product-spacer"></div>
  
          <div class="added-to-cart js-added-to-cart">
            <img src="./images/images/icons/checkmark.png">
            Added
          </div>
  
          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
						product.id
					}" >
          Add to Cart
          </button>
      </div>
        `
	},
}

export default Product
