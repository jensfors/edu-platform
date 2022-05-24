import { deleteTestUserSolutions } from "$lib/db/user"

export async function post() {
    let result = null
    await deleteTestUserSolutions()

    return {
        body: {
            message: result ? 'Exercise successfully solved' : 'Damn, something went kinda wrong',
        },
    }
}