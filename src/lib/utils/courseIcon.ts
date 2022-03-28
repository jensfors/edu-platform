import type { WCAGPrinciple } from "@prisma/client";
import { Principle } from '$lib/utils/stringTypes';

export function getCourseIcon(principles: WCAGPrinciple[]): string {
    // TODO: Remove dummy data
    //const principles: WCAGPrinciple[] = [{ name: 'Operable', id: '1', number: 1, description: '', link: '', color: '', icon: '' }, { name: 'Understandable', id: '1', number: 1, description: '', link: '', color: '', icon: '' }]
    if (0 < principles.length && principles.length < 5) {
        return `static/principles/${combineLetters(principles)}.jpg`
    }
    return 'static/principles/POUR.jpg' // TODO: default image for no principles
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