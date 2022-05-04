import { getAmountOfReadPosts, getAmountOfSolvedExercises, getLeaderboard } from "$lib/db/user";
import { getAllCriteria, getAllCriteriaSolved } from "$lib/db/wcag";
import { addSolvesToCriteria, getWCAGMasterLevel } from "$lib/utils/awards";
import { getLevelForAUser, getLevels, getMaxLevelXP } from "$lib/utils/levels";
import { PostType } from "$lib/utils/stringTypes";
import type { User, WCAGCriteria } from "@prisma/client";

export async function get() {
    const leaderboardSize: number = 100
    let users: User[] = []

    users = await getLeaderboard(leaderboardSize)
    for (let user of users) {
        let criteria: WCAGCriteria[] = await getAllCriteria()
        let solvedCriteria: WCAGCriteria[] = []
        // @ts-ignore
        user.level = getLevelForAUser(user.totalxp)
        solvedCriteria = await getAllCriteriaSolved(user.id)
        addSolvesToCriteria(criteria, solvedCriteria)
        // @ts-ignore
        user.wcagMasterLevel = getWCAGMasterLevel(criteria)
        // @ts-ignore
        user.solvedExercises = await getAmountOfSolvedExercises(user)
        // @ts-ignore
        user.readBlogPosts = await getAmountOfReadPosts(user, PostType.Blog)
    }
    return {
        body: {
            users
        }
    };
}