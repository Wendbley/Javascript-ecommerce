import Header from './components/Header.js'
import Error404Screen from './screens/Error404Screen.js'
import HomeScreen from './screens/HomeScreen.js'
import OrdersScreen from './screens/OrdersScreen.js'
import CartScreen from './screens/CartScreen.js'
import CheckoutScreen from './screens/CheckoutScreen.js'
import ProductScreen from './screens/ProductScreen.js'
import { parseRequestUrl, updateView } from './utils/index.js'
import CheckoutHeader from './components/Checkout-header.js'
import  RegisterScreen  from './screens/RegisterScreen.js'
import  LoginScreen  from './screens/LoginScreen.js'

const routes = {
	'/': HomeScreen,
	'/orders': OrdersScreen,
	'/checkout': CheckoutScreen,
	'/cart': CartScreen,
	'/cart/:id': CartScreen,
	'/product/:id': ProductScreen,
	'/orders': OrdersScreen,
	'/sign-in': LoginScreen,
	'/sign-up': RegisterScreen,
}

/**
 * Router
 */
const router = async () => {
	const request = parseRequestUrl()

	const parseUrl =
		(request.resource ? `/${request.resource}` : '/') +
		(request.id ? '/:id' : '') +
		(request.verb ? `/${request.verb}` : '')

	parseUrl !== '/checkout' 
		? updateView(Header, 'header')
		: updateView(CheckoutHeader, 'header')
	const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen

	const main = document.getElementById('main-container')
	main.className = parseUrl == '/checkout' ? 'checkout' : 'main'
	main.innerHTML = await screen.render()
	await screen.after_render()
}

/**  Listeners loading and hashchange*/

window.addEventListener('load', router)
window.addEventListener('hashchange', router)
