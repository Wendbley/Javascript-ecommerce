import expressAsyncHandler from 'express-async-handler'
import User, {
	createUser,
	getUserByEmailAndPassword,
	getUserById,
    updateUserById,
} from '../models/user.model.js'
import { generateToken } from '../utils.js'

/**
 * POST /api/users/createadmin
 */
export const CreateAdmin = expressAsyncHandler(async (req, res) => {
	try {
		const user = new User({
			name: 'johnny',
			email: 'admin@jfk.com',
			password: 'jsamazona',
			isAdmin: true,
		})
		const createdUser = await createUser(user)
		res.send(createdUser)
	} catch (err) {
		res.status(500).send({ message: err.message })
	}
})

/**
 * POST /api/users/signin
 */
export const SignIn = expressAsyncHandler(async (req, res) => {
	const { email, password } = req.body
	// 1. check that all inputs are provided
	if (!email || !password) {
		return res.status(400).json({ message: 'All fields are required' })
	}

	// 2. check that the user exists
	const signinUser = await getUserByEmailAndPassword(email, password)
	if (!signinUser) {
		return res.status(401).send({ message: 'Invalid Email or Password' })
	}

	res.send({
		_id: signinUser._id,
		name: signinUser.name,
		email: signinUser.email,
		isAdmin: signinUser.isAdmin,
		token: generateToken(signinUser),
	})
})

/**
 * POST /api/users/register
 */
export const Register = expressAsyncHandler(async (req, res) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	})
	const createdUser = await createUser(user)
	if (!createdUser) {
		res.status(401).send({
			message: 'Invalid User Data',
		})
	} else {
		res.send({
			_id: createdUser._id,
			name: createdUser.name,
			email: createdUser.email,
			isAdmin: createdUser.isAdmin,
			token: generateToken(createdUser),
		})
	}
})

/**
 * PUT /api/users/:id
 */
export const UpdateUser = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
	const user = await getUserById(id)

	if (!user) {
		return res.status(404).send({
			message: 'User Not Found',
		})
	}
	user.name = req.body.name || user.name
	user.email = req.body.email || user.email
	user.password = req.body.password || user.password
	const updatedUser = await updateUserById(id,user)
	res.send({
		_id: updatedUser._id,
		name: updatedUser.name,
		email: updatedUser.email,
		isAdmin: updatedUser.isAdmin,
		token: generateToken(updatedUser),
	})
})
