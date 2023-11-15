import { Products, getCartItems } from '../api/localStorage.js'
import Cart from '../components/Cart.js'
import { parseRequestUrl } from '../utils/index.js'

// Cart Screen
const CartScreen = {
	// Renders the component onclick event
	after_render: async () => {
		const request = parseRequestUrl()
	},

	// Renders the element when loading
	render: async () => {
	

		// get cart items
		const cartItems = getCartItems()
		
		if (!cartItems)
			return `<div class='empty-cart-message'><p>Your Cart is empty.</p></div> 
    <a class='button-primary view-products-link' href="/#/">View Products</a>`

		return `
        ${
					cartItems.length > 0
						? cartItems
								.map((cart) => {
									const productId = cart.id

									const matchingProduct = Products.find(
										(prod) => prod._id === productId
									)

									return Cart.render({id: matchingProduct._id, ...matchingProduct}, cart )
								})
								.join('\n')
						: `<div class='empty-cart-message'><p>Your Cart is empty.</p>
          <a class='button-primary view-products-link' href="/#/">View Products</a></div> `
				}  `
	},
}

export default CartScreen
