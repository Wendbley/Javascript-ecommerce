import { GetAllProducts } from '../api/api.js'
import { getCartItems, setCartItems } from '../api/localStorage.js'
import Header from '../components/Header.js'
import Product from '../components/Product.js'

/**
 * Stoes the cart items in local storage (id, quantity)
 * @param {*} item
 * @param {*} forceUpdate
 */
function addToCart(item, forceUpdate = false) {
	let cartItems = getCartItems()
	const existItem = cartItems.find((prod) => item.id === prod.id)

	if (existItem) {
		existItem.qty += item.qty
	} else {
		cartItems = [...cartItems, item]
	}
	setCartItems(cartItems)
	if (forceUpdate) {
		Header.after_render()
	}
}
/**
 * Home Screen
 */
const HomeScreen = {
	after_render: async () => {
		document.querySelectorAll('.js-add-to-cart').forEach((btn, index) => {
			btn.addEventListener('click', () => {
				const qty = document.querySelectorAll('.js-product-quantity')[index]
					.selectedIndex
				addToCart(
					{
						id: btn.dataset.productId,
						qty: parseInt(
							document.getElementsByTagName('option')[qty].value
						),
					},
					true
				)

				const added = document.querySelectorAll('.js-added-to-cart')[index]
				setTimeout(() => {
					added.style.opacity = 1
					setTimeout(() => {
						added.style.opacity = 0
					}, 1000)
				}, 0)
			})
		})
	},
	render: async () => {
		const products = await GetAllProducts()

		if (!products) return `<div>Error fetching data</div>`

		return `<div class="products-grid js-products-grid">
		${products
			.map((product) => {
				return Product.render(product)
			})
			.join('\n')}
		</div>
		`
	},
}

export default HomeScreen
