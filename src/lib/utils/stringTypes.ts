export enum PostType {
    Blog = 'Blog',
    News = 'News',
}

export enum ExerciseType {
    Code = 'Code',
    Quiz = 'Quiz',
}

export enum Difficulty {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Expert = 'Expert',
}

export enum Principle {
    Perceivable = 'Perceivable',
    Operable = 'Operable',
    Understandable = 'Understandable',
    Robust = 'Robust'
}

export enum Roles {
    Normal = 'Normal',
    Creator = 'Creator',
    Admin = 'Admin'
}

export function getPrincipleNum(principle: Principle) {
    return principle === Principle.Perceivable ? 1 : principle === Principle.Operable ? 2 : principle === Principle.Understandable ? 3 : principle === Principle.Robust ? 4 : 0
}

export type XP = {
    level: number, nextLevelXP: number, progressXP: number
}