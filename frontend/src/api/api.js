// import axios from 'axios'
import { apiUrl } from './config.js'
import { getUserInfo } from './localStorage.js'

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export const getProducts = async ( searchKeyword = '' ) => {
	try {
		let queryString = '?'
		if (searchKeyword) queryString += `searchKeyword=${searchKeyword}&`

		const response = await axios(`${apiUrl}/products${queryString}`)
		// if (response.statusText !== 'OK') {
		//   throw new Error(response.data.message);
		// }
		return response.data
	} catch (err) {
		console.log(err)
		return { error: err.response.data.message || err.message }
	}
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
export const getProduct = async (id) => {
	try {
		const response = await axios({
			url: `${apiUrl}/products/${id}`,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		// if (response.statusText !== 'OK') {
		//   throw new Error(response.data.message);
		// }
		return response.data
	} catch (err) {
		console.log(err)
		return { error: err.response.data.message || err.message }
	}
}

/**
 * 
 * @returns 
 */
export const createProduct = async () => {
	try {
		const { token } = getUserInfo()
		const response = await axios({
			url: `${apiUrl}/products`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
		// if (response.statusText !== "Created") {
		//   throw new Error(response.data.message);
		// }
		return response.data
	} catch (err) {
		return { error: err.response.data.message || err.message }
	}
}

/**
 * 
 * @param {*} productId 
 * @param {*} review 
 * @returns 
 */
export const createReview = async (productId, review) => {
	try {
		const { token } = getUserInfo()
		const response = await axios({
			url: `${apiUrl}/products/${productId}/reviews`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: review,
		})
		// if (response.statusText !== "Created") {
		//   throw new Error(response.data.message);
		// }
		return response.data
	} catch (err) {
		return { error: err.response.data.message || err.message }
	}
}

/**
 * 
 * @param {*} productId 
 * @returns 
 */
export const deleteProduct = async (productId) => {
	try {
		const { token } = getUserInfo()
		const response = await axios({
			url: `${apiUrl}/products/${productId}`,
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
		// if (response.statusText !== 'OK') {
		//   throw new Error(response.data.message);
		// }
		return response.data
	} catch (err) {
		return { error: err.response.data.message || err.message }
	}
}

/**
 * 
 * @param {*} product 
 * @returns 
 */
export const updateProduct = async (product) => {
	try {
		const { token } = getUserInfo()
		const response = await axios({
			url: `${apiUrl}/products/${product._id}`,
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: product,
		})
		// if (response.statusText !== 'OK') {
		//   throw new Error(response.data.message);
		// }
		return response.data
	} catch (err) {
		return { error: err.response.data.message || err.message }
	}
}

/**
 * 
 * @param {*} formData 
 * @returns 
 */
export const uploadProductImage = async (formData) => {
	try {
		const { token } = getUserInfo()
		const response = await axios({
			url: `${apiUrl}/uploads`,
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
			data: formData,
		})
		// if (response.statusText !== "Created") {
		//   throw new Error(response.data.message);
		// }
		return response.data
	} catch (err) {
		return { error: err.response.data.message || err.message }
	}
}

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export const signin = async ({ email, password }) => {
	try {
		const response = await axios({
			url: `${apiUrl}/users/signin`,
			method: 'POST',
			header: {
				'Content-Type': 'application/json',
			},
			data: {
				email,
				password,
			},
		})
		// if (response.statusText !== 'OK') {
		//   throw new Error(response.data.message);
		// }
		return response.data
	} catch (err) {
		console.log(err)
		return { error: err.response.data.message || err.message }
	}
}

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export const register = async ({ name, email, password }) => {
	try {
		const response = await axios({
			url: `${apiUrl}/users/register`,
			method: 'POST',
			header: {
				'Content-Type': 'application/json',
			},
			data: {
				name,
				email,
				password,
			},
		})
		// if (response.statusText !== 'OK') {
		//   throw new Error(response.data.message);
		// }
		return response.data
	} catch (err) {
		console.log(err)
		return { error: err.response.data.message || err.message }
	}
}

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export const update = async ({ name, email, password }) => {
	try {
		const { _id, token } = getUserInfo()
		const response = await axios({
			url: `${apiUrl}/users/${_id}`,
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: {
				name,
				email,
				password,
			},
		})
		// if (response.statusText !== 'OK') {
		//   throw new Error(response.data.message);
		// }
		return response.data
	} catch (err) {
		console.log(err)
		return { error: err.response.data.message || err.message }
	}
}

/**
 * 
 * @param {*} order 
 * @returns 
 */
export const createOrder = async (order) => {
	try {
		const { token } = getUserInfo()
		const response = await axios({
			url: `${apiUrl}/orders`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: order,
		})
		// if (response.statusText !== "Created") {
		//   throw new Error(response.data.message);
		// }
		return response.data
	} catch (err) {
		return { error: err.response ? err.response.data.message : err.message }
	}
}

/**
 * 
 * @returns 
 */
export const getOrders = async () => {
	try {
		const { token } = getUserInfo()
		const response = await axios({
			url: `${apiUrl}/orders`,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
		if (response.statusText !== 'OK') {
		  throw new Error(response.data.message);
		}
		return response.data
	} catch (err) {
		console.log(err)
		return { error: err.response.data.message || err.message }
	}
}

/**
 * 
 * @param {*} orderId 
 * @returns 
 */
export const deleteOrder = async (orderId) => {
	try {
		const { token } = getUserInfo()
		const response = await axios({
			url: `${apiUrl}/orders/${orderId}`,
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
		// if (response.statusText !== 'OK') {
		//   throw new Error(response.data.message);
		// }
		return response.data
	} catch (err) {
		return { error: err.response.data.message || err.message }
	}
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
export const getOrder = async (id) => {
	try {
		const { token } = getUserInfo()
		const response = await axios({
			url: `${apiUrl}/orders/${id}`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
		// if (response.statusText !== 'OK') {
		//   throw new Error(response.data.message);
		// }
		return response.data
	} catch (err) {
		return { error: err.message }
	}
}

/**
 * 
 * @returns 
 */
export const getMyOrders = async () => {
	try {
		const { token } = getUserInfo()
		const response = await axios({
			url: `${apiUrl}/orders/mine`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
		// if (response.statusText !== 'OK') {
		//   throw new Error(response.data.message);
		// }
		return response.data
	} catch (err) {
		return { error: err.response ? err.response.data.message : err.message }
	}
}

/**
 * 
 * @returns 
 */
export const getPaypalClientId = async () => {
	const response = await axios({
		url: `${apiUrl}/paypal/clientId`,
		headers: {
			'Content-Type': 'application/json',
		},
	})
	// if (response.statusText !== 'OK') {
	//   throw new Error(response.data.message);
	// }
	return response.data.clientId
}
/**
 * 
 * @param {*} orderId 
 * @param {*} paymentResult 
 * @returns 
 */
export const payOrder = async (orderId, paymentResult) => {
	try {
		const { token } = getUserInfo()
		const response = await axios({
			url: `${apiUrl}/orders/${orderId}/pay`,
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: paymentResult,
		})
		// if (response.statusText !== 'OK') {
		//   throw new Error(response.data.message);
		// }
		return response.data
	} catch (err) {
		return { error: err.response ? err.response.data.message : err.message }
	}
}

/**
 * 
 * @param {*} orderId 
 * @returns 
 */
export const deliverOrder = async (orderId) => {
	try {
		const { token } = getUserInfo()
		const response = await axios({
			url: `${apiUrl}/orders/${orderId}/deliver`,
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
		// if (response.statusText !== 'OK') {
		//   throw new Error(response.data.message);
		// }
		return response.data
	} catch (err) {
		return { error: err.response ? err.response.data.message : err.message }
	}
}
/**
 * 
 * @returns 
 */
export const getSummary = async () => {
	try {
		const { token } = getUserInfo()
		const response = await axios({
			url: `${apiUrl}/orders/summary`,
			headers: {
				Authorization: `Bearer ${token}`,
				'content-type': 'application/json',
			},
		})
		// if (response.statusText !== 'OK') {
		//   throw new Error(response.data.message);
		// }

		return response.data
	} catch (err) {
		return { error: err.response ? err.response.data.message : err.message }
	}
}
