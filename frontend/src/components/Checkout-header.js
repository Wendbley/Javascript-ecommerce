import { getQtyFromCartItems } from "../api/localStorage.js"



const CheckoutHeader = {
    after_render: async() => {
        
    },
	render: () => {
    
    const numItems = getQtyFromCartItems()
    
    
		return `<div class="checkout-header">
        <div class="header-content">
          <div class="checkout-header-left-section">
            <a href="/#/">
              <img class="amazon-logo" src="images/images/amazon-logo.png">
              <img class="amazon-mobile-logo" src="images/images/amazon-mobile-logo.png">
            </a>
          </div>
  
          <div class="checkout-header-middle-section">
            Checkout (<a class="return-to-home-link"
              href="/#/">${ numItems } items</a>)
          </div>
  
          <div class="checkout-header-right-section">
            <img src="images/images/icons/checkout-lock-icon.png">
          </div>
        </div>
      </div>`
	},
}

export default CheckoutHeader
