import expressAsyncHandler from 'express-async-handler'
import Product from '../models/product.model.js'
import { products } from '../data.js'

/**
 * GET /api/products
 */
export const GetAllProducts = expressAsyncHandler(async (req, res) => {
	const searchKeyword = req.query.searchKeyword
		? {
				name: {
					$regex: req.query.searchKeyword,
					$options: 'i',
				},
		  }
		: {}
	const products = await Product.find({ ...searchKeyword })
	res.send(products)
})

/**
 * GET /api/products/:id
 */
export const GetProduct = expressAsyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	res.send(product)
})

/**
 * POST /api/products
 */
export const CreateProduct = expressAsyncHandler(async (req, res) => {
	const product = new Product({
		name: 'sample product',
		description: 'sample desc',
		category: 'sample category',
		brand: 'sample brand',
		image: 'https://www.pexels.com/photo/black-fujifilm-dslr-camera-90946/',
	})
	const createdProduct = await product.save()
	if (createdProduct) {
		res
			.status(201)
			.send({ message: 'Product Created', product: createdProduct })
	} else {
		res.status(500).send({ message: 'Error in creating product' })
	}
})

/**
 * GET /api/products/upload
 */
export const UploadProducts = expressAsyncHandler(async (req, res) => {
	try {
		products.forEach(async (product) => {
			const newProduct = new Product(product)
			await newProduct.save()
		})
		res.send({ message: 'Products uploaded' })
	} catch (error) {
		res.status(500).send({ message: 'Error uploading Products' })
	}
})

/**
 * PUT /api/products/:id
 */
export const UpdateProduct = expressAsyncHandler(async (req, res) => {
	const productId = req.params.id
	const product = await Product.findById(productId)
	if (product) {
		product.name = req.body.name
		product.price = req.body.price
		product.image = req.body.image
		product.brand = req.body.brand
		product.category = req.body.category
		product.countInStock = req.body.countInStock
		product.description = req.body.description
		const updatedProduct = await product.save()
		if (updatedProduct) {
			res.send({ message: 'Product Updated', product: updatedProduct })
		} else {
			res.status(500).send({ message: 'Error in updaing product' })
		}
	} else {
		res.status(404).send({ message: 'Product Not Found' })
	}
})

/**
 * DELETE /api/products/:id
 */
export const DeleteProduct = expressAsyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	if (product) {
		const deletedProduct = await product.remove()
		res.send({ message: 'Product Deleted', product: deletedProduct })
	} else {
		res.status(404).send({ message: 'Product Not Found' })
	}
})

/**
 * POST /api/products/:id/reviews
 */
export const ProductReview = expressAsyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	if (product) {
		const review = {
			rating: req.body.rating,
			comment: req.body.comment,
			user: req.user._id,
			name: req.user.name,
		}
		product.reviews.push(review)
		product.rating =
			product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length
		product.numReviews = product.reviews.length
		const updatedProduct = await product.save()
		res
			.status(201)
			.send({
				message: 'Comment Created.',
				data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
			})
	} else {
		throw Error('Product does not exist.')
	}
})
