import { getCartItems, getQtyFromCartItems } from "../api/localStorage.js"

const Header = {
  after_render: () => {
     const numItems = getQtyFromCartItems() 
     document.querySelector('.js-cart-quantity').innerHTML = numItems

     document.querySelector('.js-search-bar').addEventListener('input', (e) => {
       const searchValue = e.target.value
       console.log(searchValue)
     })
  },

  /**
   * 
   * @returns 
   */
	render: () => {
    const numItems = getQtyFromCartItems() 
    
		return `
        <div class="amazon-header">
          <div class="amazon-header-left-section">
            <a href="/#/" class="header-link">
              <img class="amazon-logo" src="images/images/amazon-logo-white.png">
              <img class="amazon-mobile-logo" src="images/images/amazon-mobile-logo-white.png">
            </a>
          </div>

          <div class="amazon-header-middle-section">
            <input class="search-bar js-search-bar" type="text" placeholder="Search">
            <button class="search-button ">
              <img class="search-icon" src="./images/images/icons/search-icon.png">
            </button>
          </div>

          <div class="amazon-header-right-section">
            <a class="orders-link header-link" href="/#/orders">
              <span class="returns-text">Returns</span>
              <span class="orders-text">& Orders</span>
            </a>

            <a class="cart-link header-link" href="/#/checkout">
              <img class="cart-icon" src="./images/images/icons/cart-icon.png">
              <div class="cart-quantity js-cart-quantity">${numItems}</div>
              <div class="cart-text">Cart</div>
            </a>
          </div>
      </div>
    `
	},
}

export default Header
