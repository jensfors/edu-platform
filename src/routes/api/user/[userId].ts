import { getUser } from "$lib/db/user"
import { authUser } from "$lib/stores";
import { get as getStore } from 'svelte/store';

/** @type {import('./api/user/[userId]').RequestHandler} */
export async function get({ params }) {
    const userId = params.userId
    const user = await getUser(userId)
    return {
        status: 200,
        body: {
            message: 'This is the user endpoint',
            user,
        },
    }
}