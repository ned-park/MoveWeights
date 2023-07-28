const mongoose = require("mongoose")

const Schema = mongoose.Schema

const exerciseSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			maxLength: 50,
		},
		muscleGroup: {
			type: String,
			required: true,
		},
		sets: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "Set",
			required: true,
		},
		workoutId: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model("Exercise", exerciseSchema)
