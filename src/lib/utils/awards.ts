import type { WCAGCriteria } from "@prisma/client";
import { getPrincipleNum, type Principle } from "./stringTypes";

export const maxMasterLevel: number = 5

// Adds solves to criteria
export function addSolvesToCriteria(allCriteria: WCAGCriteria[], solvedCriteria: WCAGCriteria[]) {
    allCriteria.forEach((criterion: WCAGCriteria) => {
        let isSolved: boolean = false
        solvedCriteria.forEach((c: WCAGCriteria) => {
            if (c.id === criterion.id) {
                // @ts-ignore
                criterion.solves = c.solves
                isSolved = true
            }
        })
        if (!isSolved) {
            // @ts-ignore
            criterion.solves = 0
        }
    })
}

// Gets the users WCAG Master level
export function getWCAGMasterLevel(criteria: WCAGCriteria[]): number {
    return getMinimumSolves(criteria, maxMasterLevel)
}

// Gets the next wcag Master level for a user (max = maxWCAGMaster)
export function GetNextMasterLevel(masterLevel: number): number {
    return masterLevel > maxMasterLevel ? maxMasterLevel : masterLevel + 1
}

// Gets the masterlevel for a principle
export function getPrincipleMasterLevel(criteria: WCAGCriteria[], principle: Principle): number {
    const principleCriteria: WCAGCriteria[] = getPrincipleCriteria(criteria, getPrincipleNum(principle))
    return getMinimumSolves(principleCriteria, maxMasterLevel)
}

// Gets all criteria for a principle 
function getPrincipleCriteria(criteria: WCAGCriteria[], principleNumber: number): WCAGCriteria[] {
    let result: WCAGCriteria[] = []
    criteria.forEach((criterion) => {
        // @ts-ignore
        if (criterion.principle.number === principleNumber) result.push(criterion)
    })
    return result
}

// Finds the minimum solves of a list of criteria
function getMinimumSolves(criteria: WCAGCriteria[], maxLevel: number): number {
    let level = maxLevel
    criteria.forEach((criterion: WCAGCriteria) => {
        // @ts-ignore
        if (criterion.solves < level) level = criterion.solves
    })
    return level
}

// Returns the progress for Master level
export function getMasterProgress(masterLevel: number, criteria: WCAGCriteria[]): { progress: number, total: number } {
    let progress: number = getTotalSolvesForMasterLevel(masterLevel, criteria)
    const total: number = criteria.length * (masterLevel < maxMasterLevel ? masterLevel + 1 : maxMasterLevel)
    progress = progress > total ? total : progress
    return { progress, total }
}

// returns the progress of solves for a certain master level
function getTotalSolvesForMasterLevel(masterLevel: number, criteria: WCAGCriteria[]): number {
    let solves: number = 0
    let nextMasterLevel: number = masterLevel === maxMasterLevel ? maxMasterLevel : masterLevel + 1
    criteria.forEach((criterion) => {
        // @ts-ignore
        solves += criterion.solves > nextMasterLevel ? nextMasterLevel : criterion.solves
    })
    return solves
}