import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import path from 'path'
import config from './config.js'
import userRouter from './routers/user.router.js'
import orderRouter from './routers/order.router.js'
import productRouter from './routers/product.router.js'
import uploadRouter from './routers/upload.router.js'

const app = express()
const __dirname = path.resolve()

mongoose
	.set('strictQuery', false)
	.connect(config.MONGODB_URL)
	.then(() => {
		console.log('Connected to mongodb.')
		app.listen(config.PORT, () => {
			console.log(`Server started at http://localhost:${config.PORT}`)
		})
	})
	.catch((error) => {
		console.log(error.reason)
	})
app.use(cors())
app.use(bodyParser.json())
app.use('/api/v1/uploads', uploadRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/orders', orderRouter)
app.get('/api/v1/paypal/clientId', (req, res) => {
	res.send({ clientId: config.PAYPAL_CLIENT_ID })
})

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')))
app.use(express.static(path.join(__dirname, '/../frontend')))
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/../src/frontend/index.html'))
})

app.use((err, req, res, next) => {
	const status = err.name && err.name === 'ValidationError' ? 400 : 500
	res.status(status).send({ message: err.message })
})
