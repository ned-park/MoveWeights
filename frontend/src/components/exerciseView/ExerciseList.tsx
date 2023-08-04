import { Exercise } from "@/types/Workout"
import React, { useContext } from "react"
import ExerciseCard from "./ExerciseCard"
import { WorkoutContext } from "@/context/WorkoutContext"

type ExerciseListOwnProps = {
	exercises: Exercise[]
}

const ExerciseList: React.FC<ExerciseListOwnProps> = ({ exercises }) => {
	if (!exercises || exercises.length === 0) {
		return <>No exercises have been added to todays workout</>
	}

	return (
		<div className="w-5/6 mx-auto flex flex-col gap-8 mb-20">
			{exercises.map((exercise, i) => (
				<ExerciseCard key={i} exercise={exercise} />
			))}
		</div>
	)
}

export default ExerciseList
