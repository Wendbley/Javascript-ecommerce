import { apiUrl } from './config.js'


// Request product to server and get response
export const getProduct = async (id) => {
	try {
		const response = await axios({
			url: `${apiUrl}/api/products/${id}`,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		// server request failure
		if (!response || response.statusText !== 'OK') {
			throw new Error('Data not available')
		}
		return response.data
	} catch (error) {
		return { error: error.response.data.message || 'Product not Found' }
	}
}

/**
 *
 * @returns
 */
export const GetAllProducts = async () => {
	try {
		const response = await axios(`${apiUrl}/api/products`, {
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!response || response.statusText !== 'OK') {
			throw new Error(response.data.message)
		}
		
		return response.data
	} catch (error) {
		return { error: error.response.data.message || 'Products not available' }
	}
}
