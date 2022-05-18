import { getCourseFromExercise, getExercise, userSolvesExercise } from '$lib/db/exercises'
import { getUser, getXP } from '$lib/db/user'
import { getDifficultyXP, getNewUserLevel, getUserLevel } from '$lib/utils/levels'
import type { XP } from '$lib/utils/stringTypes'
import type { Course, Exercise } from '@prisma/client'

export async function get({ params }) {
  const { exerciseId } = params
  let exercise: Exercise = null
  let course: Course = null
  if (exerciseId) {
    exercise = await getExercise(exerciseId)
    course = await getCourseFromExercise(exercise)
  }

  return {
    body: {
      exercise,
      course,
    },
  }
}

/*
export async function post({ request }) {
  // Insert new post data in DB
  let result = null // TODO: Remove when done
  let data = await request.json()
  //let exerciseXP = getDifficultyXP(data.difficulty)

  // Fetch XP data before completion for xp modal
  //const totalUserXP: number = await getXP(data.userId)
  //const beforeXP: XP = getUserLevel(totalUserXP)

  // Update DB with xp and get new level/xp
  //let result = await userSolvesExercise(data.exerciseId, data.userId, exerciseXP) // TODO: outcoment when done
  const afterXP: XP = getNewUserLevel(beforeXP, exerciseXP)
  console.log("Befor exercise:", beforeXP)
  console.log("After exercise:", afterXP)

  return {
    body: {
      message: result ? 'Exercise successfully solved' : 'Damn, something went kinda wrong',
      //beforeXP,
      //afterXP
    },
  }
}
*/