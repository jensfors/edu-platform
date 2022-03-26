//import { getXP } from "$lib/db/user";

import type { XP } from "./stringTypes";

//import type { User } from "@prisma/client";
export const maxLevel: number = 100
export const beginnerXP: number = 75
export const intermediateXP: number = 100
export const expertXP: number = 150
export const blogXPconst: number = 0.1
export const newsXPconst: number = 0.1

export function getLevels(): { level: number, xp: number }[] {
    let levels: { level: number, xp: number }[] = []
    for (let level = 0; level <= maxLevel; level++) {
        let xp: number = level === 0 ? 0 : intermediateXP + level * expertXP * Math.sqrt(level) * blogXPconst
        levels.push({ level: level, xp: Math.round(xp) })
    }
    console.log(levels)
    let xp = 0;
    levels.forEach((level) => xp += level.xp)
    console.log('Total XP:', xp)
    return levels
}

export function getUserLevel(): XP {
    const levels = getLevels()

    //const xp = getXP(user)
    let xp: XP = { level: 0, nextLevelXP: 0, progressXP: 1 }

    // New user = level 0
    if (xp.progressXP === 0) {
        xp.nextLevelXP = levels[1].xp
        return xp
    }

    // If not max lavel
    if (xp.progressXP < getMaxLevelXP()) {
        for (xp.level; xp.nextLevelXP < xp.progressXP; xp.level++) {
            xp.nextLevelXP += levels[xp.level + 1].xp
            console.log('LEVEL: ', xp.level, ' xpTillNextLevel: ', xp.nextLevelXP)
        }
        xp.level--
        console.log('xpnextlevel: ', xp.nextLevelXP, ' prograss ', xp.progressXP, 'hmm ', levels[xp.level + 1].xp)
        xp.progressXP = xp.progressXP - xp.nextLevelXP + levels[xp.level + 1].xp
        xp.nextLevelXP = levels[xp.level + 1].xp
        return xp
        // return { level: level, nextLevelXP: levels[level + 1].xp, currentXP: totalXP - currentXP }
    } else {
        xp.level = maxLevel
        xp.nextLevelXP = xp.progressXP
        return xp
    }
}

export function getMaxLevelXP(): number {
    const levels = getLevels()
    let xp = 0;
    levels.forEach((level) => xp += level.xp)
    return xp
}