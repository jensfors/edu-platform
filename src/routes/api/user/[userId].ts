import { getUser } from "$lib/db/user"
import { authUser } from "$lib/stores"

/** @type {import('./api/user/[userId]').RequestHandler} */
export async function get({ params }) {
    const userId = params.userId
    const user = await getUser(userId)
    authUser.subscribe(value => {
        console.log('store value:', value);
    });
    //    authUser.set(user)
    return {
        status: 200,
        body: {
            message: 'This is the user endpoint',
            user,
        },
    }
}