import { GetAllProducts } from '../api/api.js'
import { getCartItems } from '../api/localStorage.js'
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
		// get All products
		const products = await GetAllProducts()
		if (!products) return '<div>Error fetching data</div>'

		// get cart items
		const cartItems = getCartItems()
		console.log(cartItems)
		if (!cartItems)
			return `<div class='empty-cart-message'><p>Your Cart is empty.</p></div> 
    <a class='button-primary view-products-link' href="/#/">View Products</a>`

		return `
        ${
					cartItems.length > 0
						? cartItems
								.map((cart) => {
									const productId = cart.id

									const matchingProduct = products.find(
										(prod) => prod.id === productId
									)

									return Cart.render(matchingProduct, cart)
								})
								.join('\n')
						: `<div class='empty-cart-message'><p>Your Cart is empty.</p>
          <a class='button-primary view-products-link' href="/#/">View Products</a></div> `
				}  `
	},
}

export default CartScreen
