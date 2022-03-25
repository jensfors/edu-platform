import { supabase } from '$lib/db/supabaseClient';
import { getUser } from '$lib/db/user';
import type { User } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ request }) => {
    let user: User
    try {
        user = await getUser(supabase.auth.user().id)
        console.log('dabber', user)
    }
    catch (e) {
        console.log(e.message)
    }
    return {
        status: 303,
        message: 'You got the user',
        body: {
            user
        }
    };
};