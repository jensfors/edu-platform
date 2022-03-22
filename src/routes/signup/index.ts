import { createUser } from '$lib/db/user';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request }) => {
    console.log('WOOOHOOO')
    console.log(request)
    const form = await request.json();
    console.log(form)
    try {
        createUser(form.id, form.email, form.firstName, form.lastName, form.avatarURL)
    }
    catch (e) {
        console.log(e.message)
    }
    return {
        status: 303,
        body: {
            message: 'You did it ladjen'
        }
    };
};