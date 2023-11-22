import {
	Products,
	getAllProductsFromDatabase,
	getCartItems,
	getQtyFromCartItems,
	setCartItems,
} from '../api/localStorage.js'
import CheckoutHeader from '../components/Checkout-header.js'
import PaymentSummary from '../components/Payment-Summary.js'
import { formatCurrency } from '../scripts/utils/money.js'
import { loadStyles, rerender, updateView } from '../utils/index.js'
import CartScreen from './CartScreen.js'

loadStyles([
    '../styles/shared/general.css',
    '../styles/pages/checkout/checkout-header.css',
    '../styles/pages/checkout/checkout.css'
])


/**
 * Calculates the summary of the cart
 * @returns object
 */
const updateSummary = async () => {
	
	const cartItems = getCartItems()

	let price = 0
	let ship = 0

	if (Array.isArray(cartItems)) {
		cartItems.forEach((cart) => {
			const product = Products.find((prod) => prod._id === cart.id)
			if (product) {
				price += product.priceCents * cart.qty
				ship += cart.shipping || 0
			}
		})
	} else {
		const product = Products.find((prod) => prod._id === cartItems.id)
		price = product.priceCents
	}

	const Shipping = ship
	const subtotal = price + Shipping
	const tax = subtotal * 0.1
	const total = subtotal + tax

	return { price, subtotal, Shipping, tax, total }
}

/**
 * Calculates the summary of the cart
 */
const calculateUpdateSummary = async () => {
	const { price, subtotal, Shipping, tax, total } = await updateSummary()

	document.querySelector('.js-shipping').innerHTML = `R${formatCurrency(
		Shipping
	)}`
	document.querySelector('.js-subtotal').innerHTML = `R${formatCurrency(
		subtotal
	)}`
	document.querySelector('.js-total').innerHTML = `R${formatCurrency(total)}`
	document.querySelector('.js-tax').innerHTML = `R${formatCurrency(tax)}`
	document.querySelector('.js-price').innerHTML = `R${formatCurrency(price)}`
	document.querySelector(
		'.js-summary-qty'
	).innerHTML = `Items (${getQtyFromCartItems()})`
}

// Removing product from Cart
const removeFromCart = (id) => {
	setCartItems(getCartItems().filter((prod) => prod.id !== id))
	// rerender(CartScreen)
}

const CheckoutScreen = {
	/**
	 *
	 */
	after_render: async () => {
		document.querySelectorAll('.delivery-option-input').forEach((radio) => {
			radio.addEventListener('change', async (event) => {
				if (event.target.checked) {
					const value = event.target.value
					const id = event.target.name.substring(16)

					const item = getCartItems().map((i) => {
						if (i.id == id)
							return {
								...i,
								shipping: value == '1' ? 0 : value == '2' ? 499 : 999,
							}
						return i
					})
					setCartItems(item)

					calculateUpdateSummary()
				}
				//document.location.hash = '/checkout'
				//rerender(CheckoutScreen)
			})
		})

		/**
		 * Delete link
		 */
		document.querySelectorAll('.js-delete-link').forEach((link) => {
			link.addEventListener('click', (event) => {
				const id = event.target.dataset.productId
				removeFromCart(id)
				document.querySelector(`.js-cart-item-container-${id}`).remove()
				const { price, subtotal, Shipping, tax, total } = updateSummary()
				PaymentSummary.render({
					price,
					subtotal,
					Shipping,
					tax,
					total,
				})
				// document.location.hash = '/checkout'
				rerender(CheckoutScreen)
				updateView(CheckoutHeader, 'header')
			})
		})

		/**
		 * Update link
		 */
		document.querySelectorAll('.js-update-link').forEach((link, index) => {
			link.addEventListener('click', (event) => {
				const id = event.target.dataset.productId

				if (link.textContent.trim() == 'Update') {
					const label = document.querySelectorAll('.quantity-label')[index]
					const qty = label.textContent

					const save = `<input type='number'  id='qty-${id}' class='update-qty' value=${parseInt(
						qty
					)} maxlength='4'/>`
					label.innerHTML = save
					link.innerHTML = 'Save'
				} else {
					const label = document.getElementById(`qty-${id}`)
					const qty = label.value
					const update = `${parseInt(qty)}`
					link.innerHTML = 'Update'
					document.querySelector('.quantity-label').innerHTML = update
					
					const item = getCartItems().map((i) => {
						if (i.id == id)
							return {
								...i,
								qty: parseInt(qty),
							}
						return i
					})
					setCartItems(item)
					calculateUpdateSummary()
					updateView(CheckoutHeader, 'header')
				}
			})
		})
	},

	/**
	 *
	 * @returns
	 */
	render: async () => {
		await getAllProductsFromDatabase()
		const { price, subtotal, Shipping, tax, total } = await updateSummary()

		return `
        <div class="page-title">Review your order</div>
        <section class='checkout-grid'>
            <div class='cart-summary'>
                ${await CartScreen.render()}
            </div>
            <div class='payment-summary js-payment-summary'>
                ${await PaymentSummary.render({
									price,
									subtotal,
									Shipping,
									tax,
									total,
								})}
            </div>
        </section>
        `
	},
}

export default CheckoutScreen
