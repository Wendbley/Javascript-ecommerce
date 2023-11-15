import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: {
		type: String,
		required: true,
		index: true,
		unique: true,
	},
	password: { type: String, required: true },
	isAdmin: { type: Boolean, required: true, default: false },
})
const User = mongoose.model('User', userSchema)
export default User

export const getUsers = () => User.find({})
export const getUserByEmail = (email) => User.findOne({ email })
export const getUserByEmailAndPassword = (email, password) => User.findOne({ email, password })
export const getUserByUsername = (username) => User.findOne({ username })
export const getUserById = (id) => User.findById(id)
export const createUser = (values) => new User(values).save().then((user) => user.toObject())
export const deleteUserById = (id) => User.findOneAndDelete({ _id: id })
export const deleteAllUsers = () => User.deleteMany({})
export const updateUserById = (id, values) => User.findByIdAndUpdate(id, values)
export const updateAllUsers = (values) => User.updateMany({}, values)
