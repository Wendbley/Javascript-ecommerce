import express from 'express'
import { isAuth, isAdmin } from '../utils.js'
import {
	CreateProduct,
	DeleteProduct,
	GetAllProducts,
	GetProduct,
	ProductReview,
	UpdateProduct,
	UploadProducts
} from '../controllers/product.controller.js'

const productRouter = express.Router()

productRouter.get('/', GetAllProducts)
productRouter.get('/upload', UploadProducts)
productRouter.get('/:id', GetProduct)
productRouter.post('/', isAuth, isAdmin, CreateProduct)
productRouter.put('/:id', isAuth, isAdmin, UpdateProduct)
productRouter.delete('/:id', isAuth, isAdmin, DeleteProduct)
productRouter.post('/:id/reviews', isAuth, ProductReview)

export default productRouter
