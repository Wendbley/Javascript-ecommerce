import express from 'express'
import { isAuth, isAdmin } from '../utils.js'
import {
	CreateOrder,
	DeleteOrderById,
	DeliverOrder,
	GetAllOrders,
	GetOrderById,
	GetOrderByUser,
	GetOrderByUserId,
	PayOrder,
} from '../controllers/order.controller.js'

const orderRouter = express.Router()


orderRouter.get('/summary', isAuth, isAdmin, GetAllOrders)
orderRouter.get('/', isAuth, isAdmin, GetOrderByUser)

orderRouter.get('/mine', isAuth, GetOrderByUserId)
orderRouter.get('/:id', isAuth, GetOrderById)

orderRouter.post('/', isAuth, CreateOrder)
orderRouter.delete('/:id', isAuth, isAdmin, DeleteOrderById)

orderRouter.put('/:id/pay', isAuth, PayOrder)
orderRouter.put('/:id/deliver', isAuth, DeliverOrder)

export default orderRouter
