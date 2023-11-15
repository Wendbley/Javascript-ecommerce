import express from 'express'
import { isAuth } from '../utils.js'
import {
	CreateAdmin,
	Register,
	SignIn,
	UpdateUser,
} from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter.get('/createadmin', CreateAdmin)
userRouter.post('/signin', SignIn)
userRouter.post('/register', Register)
userRouter.put('/:id', isAuth, UpdateUser)
export default userRouter
