import type { WCAGCriteria } from "@prisma/client";
import { getPrincipleNum, type Principle } from "./stringTypes";

export const maxWCAGMaster: number = 5
export const maxPrincipleLevel: number = 100

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

export function getWCAGMasterLevel(criteria: WCAGCriteria[]): number {
    return getMinimumSolves(criteria, maxWCAGMaster)
}

export function GetNextMasterLevel(masterLevel: number): number {
    return masterLevel > maxWCAGMaster ? maxWCAGMaster : masterLevel + 1
}

export function getPrincipleMasterLevel(criteria: WCAGCriteria[], principle: Principle): number {
    const principleCriteria: WCAGCriteria[] = getPrincipleCriteria(criteria, getPrincipleNum(principle))
    return getMinimumSolves(principleCriteria, maxPrincipleLevel)
}

function getPrincipleCriteria(criteria: WCAGCriteria[], principleNumber: number): WCAGCriteria[] {
    let result: WCAGCriteria[] = []
    criteria.forEach((criterion) => {
        // @ts-ignore
        if (criterion.principle.number === principleNumber) result.push(criterion)
    })
    return result
}

function getMinimumSolves(criteria: WCAGCriteria[], maxLevel: number): number {
    let level = maxLevel
    criteria.forEach((criterion: WCAGCriteria) => {
        // @ts-ignore
        if (criterion.solves < level) level = criterion.solves
    })
    return level
}


export function getMasterProgress(masterLevel: number, criteria: WCAGCriteria[]): { progress: number, total: number } {
    const progress: number = getTotalSolvesForMasterLevel(masterLevel, criteria)
    const total: number = criteria.length * (masterLevel < maxWCAGMaster ? masterLevel + 1 : maxWCAGMaster)
    return { progress, total }
}

function getTotalSolvesForMasterLevel(masterLevel: number, criteria: WCAGCriteria[]): number {
    let solves: number = 0
    let nextMasterLevel: number = masterLevel === maxWCAGMaster ? maxWCAGMaster : masterLevel + 1
    criteria.forEach((criterion) => {
        // @ts-ignore
        solves += criterion.solves > nextMasterLevel ? nextMasterLevel : criterion.solves
    })
    return solves
}