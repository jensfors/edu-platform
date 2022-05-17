import { getXP } from "$lib/db/user"
import { getDifficultyXP, getNewUserLevel, getUserLevel } from "$lib/utils/levels"
import type { XP } from "$lib/utils/stringTypes"
// TODO: Delete file
export async function get({ params }) {
    const { difficulty, userId } = params
    let exerciseXP = getDifficultyXP(difficulty)
    const totalUserXP: number = await getXP(userId)
    const beforeXP: XP = getUserLevel(totalUserXP)
    const afterXP: XP = getNewUserLevel(beforeXP, exerciseXP)
    return {
        status: 200,
        body: {
            beforeXP,
            afterXP,
        },
    }
}