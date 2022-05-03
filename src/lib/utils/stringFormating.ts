import type { User, WCAGCriteria } from "@prisma/client";

export function createAuthorsString(authors: { user: User }[]) {
    let authorString: string = ``
    authors.forEach((author: { user: User }, index: number) => {
        let str: string = ``
        if (authors.length !== 1 && index === authors.length - 1) {
            str += ` and `
        } else if (index > 0) {
            str += `, `
        }
        str += `${author.user.firstName.charAt(0)}. ${author.user.lastName}`
        authorString += str
    })
    return authorString
}

export function formatDate(dateString: string) {
    let date: Date = new Date(dateString)
    let month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('-');
}

export function fixWCAGorder(input: WCAGCriteria[]) {
    let criteria: WCAGCriteria[] = []
    let temp: WCAGCriteria[] = []
    let lastPrincipleNum: number = 0
    let lastGuidelineNum: number = 0
    let lastCritieriaNum: number = 0
    input.forEach((criterion: WCAGCriteria) => {
        let numbers: string[] = criterion.number.split('.')
        let principleNum: number = parseInt(numbers[0])
        let guidelineNum: number = parseInt(numbers[1])
        let criteriaNum: number = parseInt(numbers[2])
        if (criteriaNum > 9) {
            temp.push(criterion)
        } else if (guidelineNum > lastGuidelineNum || principleNum > lastPrincipleNum) {
            criteria.push(...temp)
            criteria.push(criterion)
            temp = []
        } else {
            criteria.push(criterion)
        }
        lastPrincipleNum = principleNum
        lastGuidelineNum = guidelineNum
        lastCritieriaNum = criteriaNum
    })
    return criteria
}