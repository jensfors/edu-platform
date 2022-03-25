//import { getXP } from "$lib/db/user";
//import type { User } from "@prisma/client";
const maxLevel: number = 100

export function getLevels(): { level: number, xp: number }[] {
    let levels: { level: number, xp: number }[] = []
    for (let i = 0; i <= maxLevel; i++) {
        levels.push({ level: i, xp: i * 1000 / 10 })
    }
    console.log(levels)
    let xp = 0;
    levels.forEach((level) => xp += level.xp)
    console.log('Total XP:', xp)
    return levels
}

export function getUserLevel() {
    //const xp = getXP(user)
    const levels = getLevels()
    const currentXP = 510000
    let totalXP = 0;
    let level = 0
    if (currentXP < getMaxLevelXP()) {
        for (level; totalXP < currentXP; level++) {
            totalXP += levels[level + 1].xp
            console.log('LEVEL: ', level, ' TOTALXP: ', totalXP)
        }
        level--
        return { level: level, nextLevelXP: levels[level + 1].xp, currentXP: totalXP - currentXP }
    } else {
        return { level: maxLevel, nextLevelXP: currentXP, currentXP: currentXP }
    }
}

export function getMaxLevelXP(): number {
    const levels = getLevels()
    let xp = 0;
    levels.forEach((level) => xp += level.xp)
    return xp
}