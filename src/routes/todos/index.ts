import { api } from './_api';
import type { RequestHandler } from '@sveltejs/kit';
import PrismaClient from '$lib/prisma';
import {v4 as uuidv4} from 'uuid';

type Todo = {
	uid: string;
	created_at: Date;
	text: string;
	done: boolean;
};



const prisma = new PrismaClient();

export const get: RequestHandler = async ({ locals }) => {
	// locals.userid comes from src/hooks.js
	const response = await prisma.todo.findMany();

	/*if (response.status === 404) {
		// user hasn't created a todo list.
		// start with an empty array
		return {
			body: {
				todos: []
			}
		};
	} */

	//if (response.status === 200) {
		return {
			body: {
				todos: response
			}
		};
	//}

	return {
		status: response.status
	};
};

export const post: RequestHandler = async ({ request, locals }) => {
	const form = await request.formData();
	console.log(form.get('text').toString());
	const dab: Todo = {uid: uuidv4(), created_at: new Date("Wed, 27 July 2016 13:30:00"), text: form.get('text').toString(), done: false }
	await prisma.todo.create({
		data: {
			created_at: new Date(),
			done: false,
			text: form.get('text').toString(),
		}
	}) 

	/*
	await api('post', `todos/${locals.userid}`, {
		text: form.get('text')
	}); */

	return {};
};

// If the user has JavaScript disabled, the URL will change to
// include the method override unless we redirect back to /todos
const redirect = {
	status: 303,
	headers: {
		location: '/todos'
	}
};

export const patch: RequestHandler = async ({ request, locals }) => {
	const form = await request.formData();

	await api('patch', `todos/${locals.userid}/${form.get('uid')}`, {
		text: form.has('text') ? form.get('text') : undefined,
		done: form.has('done') ? !!form.get('done') : undefined
	});

	return redirect;
};

export const del: RequestHandler = async ({ request, locals }) => {
	const form = await request.formData();

	await api('delete', `todos/${locals.userid}/${form.get('uid')}`);

	return redirect;
};