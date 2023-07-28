// ALL WORKOUT/EXERCISE RELATED FUNCTIONS HAPPEN IN THIS FILE - I DID NOT WANT TO CREATE 3 SEPARATE CONTROLLER FILES
const Workout = require("../models/workoutModel")
const Exercise = require("../models/exerciseModel")
const Set = require("../models/setModel")
const UserExercise = require("../models/userExerciseModel")

const createWorkout = async (req, res) => {
	try {
		const workout = await Workout.create({
			exercises: [],
			userId: req.user._id,
		})

		const exercise = await Exercise.create({
			muscleGroup: req.body.muscleGroup,
			name: req.body.exerciseName,
			sets: [],
			workoutId: workout._id,
		})
		workout.exercises.push(exercise)

		const set = await Set.create({
			weight: req.body.weight,
			reps: req.body.numOfReps,
			exerciseId: exercise._id,
		})

		exercise.sets.push(set)
		await workout.save()
		await exercise.save()
		await set.save()

		res.status(200).json(workout)
		return
	} catch (e) {
		res.status(400).json(e)
		return
	}
}

const addExerciseToWorkout = async (req, res) => {}

const addSetToExercise = async (req, res) => {
	// console.log('HIT')
	console.log(req.body)
	try {
		const exerciseId = req.body.exerciseId

		const newSet = await Set.create({
			weight: req.body.weight,
			reps: req.body.numOfReps,
			exerciseId: exerciseId,
		})

		const exercise = await Exercise.findById(exerciseId)
		exercise.sets.push(newSet)
		await newSet.save()
		await exercise.save()

		res.status(200).json({ msg: "success" })
		return
	} catch (e) {
		res.status(400).json({ msg: "there was an issue" })
	}
}

const createNewUserExercise = async (req, res) => {
	try {
		const userId = req.user._id
		const { muscleGroup, exerciseName } = req.body

		const exercise = await UserExercise.create({
			muscleGroup: muscleGroup,
			name: exerciseName,
			userId: userId,
		})
		res.status(200).json(exercise)
		return
	} catch (e) {
		console.log(e)
		res.status(400).json(e)
	}
}

const getTodaysWorkoutByUserId = async (req, res) => {
	try {
		const userId = req.user._id
		const currentDate = new Date()
		currentDate.setHours(0, 0, 0, 0)
		const endOfDay = new Date(currentDate)
		endOfDay.setHours(23, 59, 59, 999)

		const workout = await Workout.findOne({
			userId: userId,
			createdAt: {
				$gte: currentDate,
				$lt: endOfDay,
			},
		})

		res.status(200).json(workout)
		return
	} catch (e) {
		console.log(e)
		res.status(400).json({ msg: "Failed to fetch todays workout" })
		return
	}
}

const getExerciseById = async (req, res) => {
	try {
		const exerciseId = req.params.id
		const exercise = await Exercise.findById(exerciseId)

		if (!exercise) {
			res.status(401).json(undefined)
			return
		}
		res.status(200).json(exercise)
		return
	} catch (e) {
		res.status(400)
		return
	}
}

const getExercisesByUserId = async (req, res) => {
	try {
		const userId = req.user._id
		let exercises = await UserExercise.find({ userId: userId })
		res.status(200).json(exercises)
		return
	} catch (err) {
		res.status(400).json(err)
		return
	}
}

module.exports = {
	createWorkout,
	createNewUserExercise,
	getExercisesByUserId,
	getTodaysWorkoutByUserId,
	getExerciseById,
	addSetToExercise,
}
