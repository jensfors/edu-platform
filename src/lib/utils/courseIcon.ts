import type { Course, Exercise, WCAGPrinciple } from "@prisma/client";
import { Principle } from '$lib/utils/stringTypes';

export function getCourseIcon(principles: WCAGPrinciple[]): string {
    if (0 < principles.length && principles.length < 5) {
        return `/static/principles/${combineLetters(principles)}.jpg`
    }
    return '/static/defaults/DefaultCourse.png'
}

function combineLetters(principles: WCAGPrinciple[]): string {
    let letters: string[] = []
    let name = ''
    principles.forEach((principle) => {
        letters.push(principle.name.charAt(0))
    })
    if (letters.includes(Principle.Perceivable.charAt(0))) name += Principle.Perceivable.charAt(0)
    if (letters.includes(Principle.Operable.charAt(0))) name += Principle.Operable.charAt(0)
    if (letters.includes(Principle.Understandable.charAt(0))) name += Principle.Understandable.charAt(0)
    if (letters.includes(Principle.Robust.charAt(0))) name += Principle.Robust.charAt(0)
    return name
}

export function getPrinciples(course: Course): WCAGPrinciple[] {
    let principles: WCAGPrinciple[] = []
    course.exercises.forEach((exercise: Exercise) => {
        exercise.criteria.forEach((criteria) => {
            if (!(principles.indexOf(criteria.criteria.principle) > -1)) {
                principles.push(criteria.criteria.principle)
            }
        })
    })
    return principles
}