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

export type XP = {
    level: number, nextLevelXP: number, progressXP: number
}