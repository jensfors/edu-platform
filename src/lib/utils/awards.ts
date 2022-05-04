import type { WCAGCriteria } from "@prisma/client";
import { getPrincipleNum, type Principle } from "./stringTypes";

export const maxWCAGMaster: number = 100
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