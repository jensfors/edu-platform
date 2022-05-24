import { userSolvesExercise } from '$lib/db/exercises'
import { getUser, getXP } from '$lib/db/user'
import { getDifficultyXP, getNewUserLevel, getUserLevel } from '$lib/utils/levels'
import type { XP } from '$lib/utils/stringTypes'

export async function post({ params, request }) {
    let data = await request.json()
    let exerciseXP = getDifficultyXP(data.difficulty)
    let result = null
    // Fetch XP data before completion for xp modal
    const totalUserXP: number = await getXP(data.userId)
    const beforeXP: XP = getUserLevel(totalUserXP)

    // Update DB with xp and get new level/xp
    //let result = await userSolvesExercise(data.exerciseId, data.userId, exerciseXP) // TODO: outcoment when done
    const afterXP: XP = getNewUserLevel(beforeXP, exerciseXP)

    return {
        body: {
            message: result ? 'Exercise successfully solved' : 'Damn, something went kinda wrong',
            beforeXP,
            afterXP
        },
    }
}