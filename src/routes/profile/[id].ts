import { getUser, getXP } from "$lib/db/user";
import { getAllCriteria, getAllCriteriaSolved } from "$lib/db/wcag";
import { addSolvesToCriteria, getMasterProgress, getWCAGMasterLevel } from "$lib/utils/awards";
import { getUserLevel } from "$lib/utils/levels";
import type { XP } from "$lib/utils/stringTypes";
import type { User, WCAGCriteria } from "@prisma/client";

export async function get({ params }) {
    const { id } = params
    const user: User = await getUser(id)
    const totalXP: number = await getXP(user)
    const userXP: XP = getUserLevel(totalXP)
    // @ts-ignore
    userXP.totalXP = totalXP
    // @ts-ignore
    user.userXP = userXP
    const solvedCriteria: WCAGCriteria[] = await getAllCriteriaSolved(id)
    let criteria: WCAGCriteria[] = await getAllCriteria()
    addSolvesToCriteria(criteria, solvedCriteria)

    return {
        body: {
            user,
            criteria,
        }
    };
}
