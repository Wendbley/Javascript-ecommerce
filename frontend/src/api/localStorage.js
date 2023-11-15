import { getOrders, getProducts } from './api.js'

export let Products = []
export let Orders = []


export const getCartItems = () => {
	// convert from string to json
	const cartItems = localStorage.getItem('cartItems')
		? JSON.parse(localStorage.getItem('cartItems'))
		: []
	return cartItems
}

// stores cart items to localStorage
export const setCartItems = (cart) => {
	// convert from json to string
	localStorage.setItem('cartItems', JSON.stringify(cart))
}

/**
 *
 * @returns
 */
export const getQtyFromCartItems = () => {
	const array = getCartItems()

	if (Array.isArray(array)) {
		return array.reduce((acc, item) => acc + item.qty, 0) || 0
	}
	return array.qty
}

/**
 * 
 * @param {*} param0 
 */
export const setUserInfo = ({
	_id = '',
	name = '',
	email = '',
	password = '',
	token = '',
	isAdmin = false,
}) => {
	localStorage.setItem(
		'userInfo',
		JSON.stringify({
			_id,
			name,
			email,
			password,
			token,
			isAdmin,
		})
	)
}

/**
 * 
 */
export const clearUser = () => {
	localStorage.removeItem('userInfo')
}

/**
 * 
 * @returns 
 */
export const getUserInfo = () => {
	return localStorage.getItem('userInfo')
		? JSON.parse(localStorage.getItem('userInfo'))
		: { name: '', email: '', password: '' }
}

/**
 * 
 * @returns 
 */
export const getShipping = () => {
	const shipping = localStorage.getItem('shipping')
		? JSON.parse(localStorage.getItem('shipping'))
		: {
				address: '',
				city: '',
				postalCode: '',
				country: '',
		  }
	return shipping
}

/**
 * 
 * @param {*} param0 
 */
export const setShipping = ({
	address = '',
	city = '',
	postalCode = '',
	country = '',
}) => {
	localStorage.setItem(
		'shipping',
		JSON.stringify({ address, city, postalCode, country })
	)
}

/**
 *
 * @returns
 */
export const getPayment = () => {
	const payment = localStorage.getItem('payment')
		? JSON.parse(localStorage.getItem('payment'))
		: {
				paymentMethod: 'paypal',
		  }
	return payment
}

/**
 *
 * @param {*} param0
 */
export const setPayment = ({ paymentMethod = 'paypal' }) => {
	localStorage.setItem('payment', JSON.stringify({ paymentMethod }))
}

/**
 *
 */
export const cleanCart = () => {
	localStorage.removeItem('cartItems')
}


/**
 * 
 */
export const getAllProductsFromDatabase = async () => {
	Products = await getProducts()
}

/**
 * 
 */
export const GetAllOrdersFromDatabase = async () => {
	Orders = await getOrders()
}
