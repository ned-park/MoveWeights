const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
	//reusable token generation for login and signup
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "7d" })
}

const loginUser = async (req, res) => {
	const { email, password, tzOffset } = req.body
	try {
		const user = await User.login(email, password) // static method from user model
		user.tzOffset = tzOffset
		await user.save()
		// create a token
		const token = createToken(user._id)

		res.status(200).json({ email, token })
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}

// Signup user
const signupUser = async (req, res) => {
	const { email, password, tzOffset } = req.body
	try {
		const user = await User.signup(email, password) // static method from user model
		user.tzOffset = tzOffset
		await user.save()
		// create a token
		const token = createToken(user._id)

		res.status(200).json({ email, token })
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
}

module.exports = { signupUser, loginUser }
