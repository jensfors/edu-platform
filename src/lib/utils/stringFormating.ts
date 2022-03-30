import type { User } from "@prisma/client";

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

export function formatDate(date: Date) {
    let month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('-');
}