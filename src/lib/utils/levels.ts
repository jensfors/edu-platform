import { Difficulty, type XP } from "./stringTypes";

export const maxLevel: number = 100
export const beginnerXP: number = 75
export const intermediateXP: number = 100
export const expertXP: number = 150
export const blogXPconst: number = 0.1
export const newsXPconst: number = 0.1

export function getDifficultyXP(difficulty: Difficulty): number {
    switch (difficulty) {
        case Difficulty.Beginner: return beginnerXP
        case Difficulty.Intermediate: return intermediateXP
        case Difficulty.Expert: return expertXP
        default: return 0
    }
}

export function getLevels(): { level: number, xp: number }[] {
    let levels: { level: number, xp: number }[] = []
    // Sick algorithm for calculating xp per level
    for (let level = 0; level <= maxLevel; level++) {
        let xp: number = level === 0 ? 0 : 20 * level + intermediateXP + (level ** 2 * 0.001)
        levels.push({ level: level, xp: Math.round(xp) })
    }
    return levels
}

export function getUserLevel(progressXP: number): XP {
    const levels = getLevels()

    // TODO: get XP from db
    let xp: XP = { level: 0, nextLevelXP: 0, progressXP: progressXP }

    // New user = level 0
    if (xp.progressXP === 0) {
        xp.nextLevelXP = levels[1].xp
        return xp
    }

    // If not max lavel then calc level 
    if (xp.progressXP < getMaxLevelXP()) {
        for (xp.level; xp.nextLevelXP <= xp.progressXP; xp.level++) {
            xp.nextLevelXP += levels[xp.level + 1].xp
        }
        xp.level--
        xp.progressXP = xp.progressXP - xp.nextLevelXP + levels[xp.level + 1].xp
        xp.nextLevelXP = levels[xp.level + 1].xp
        return xp
    } else {
        xp.level = maxLevel
        xp.nextLevelXP = xp.progressXP
        return xp
    }
}

export function getLevelForAUser(xp: number): number {
    let level: number = 0
    let enoughXP: boolean = true
    let levels: { level: number, xp: number }[] = getLevels()
    if (xp > getMaxLevelXP()) return maxLevel
    else if (levels[1].xp > xp) return level
    while (enoughXP) {
        if (xp > levels[level + 1].xp) {
            xp -= levels[level + 1].xp
            level++
        } else {
            enoughXP = false
        }
    }
    return level
}

export function getMaxLevelXP(): number {
    const levels = getLevels()
    let xp = 0;
    levels.forEach((level) => xp += level.xp)
    return xp
}