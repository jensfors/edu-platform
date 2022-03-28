import type { RequestHandler } from '@sveltejs/kit';
import PrismaClient from '$lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { likeComment, removelikeFromComment } from '$lib/db/comments';
import { getPost } from '$lib/db/posts';
import { deletePersona, findAllExercisesWithPersona, getAllOfficialPersonas, getAllPersonas, getUsablePersonas, getUsersPersonas } from '$lib/db/persona';
import { mattiMovement, userJen, userKasper, userMatti, userSimon } from '$lib/db/dummy/data';
import { getExercise, giveExerciseCategoryAndAnswers } from '$lib/db/exercises';
import { createCourse, getAllPersonasForCourse, getAuthoredCourses, getCourse, getWCAGPrinciplesForCourse } from '$lib/db/courses';
import type { Course } from '@prisma/client';
import { getAmountOfReadPosts, getAmountOfSolvedExercises, getXP } from '$lib/db/user';
import { PostType } from '$lib/utils/stringTypes';

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
	console.log("GET")
	getAmountOfReadPosts(userKasper, PostType.Blog)
	let ass = getExercise('cl0jgn8t30117l4v66axko0vj')
	let something: { question: string, answers: { text: string, isSolution: boolean }[] }[] = [{ question: 'q1', answers: [{ text: 'q1a1', isSolution: true }, { text: 'q1a2', isSolution: false }] }, { question: 'q2', answers: [{ text: 'q2a1', isSolution: false }] }]
	//giveExerciseCategoryAndAnswers(await ass, [], something)
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
};

export const post: RequestHandler = async ({ request, locals }) => {
	const form = await request.formData();
	console.log(form.get('text').toString());
	const dab: Todo = { uid: uuidv4(), created_at: new Date("Wed, 27 July 2016 13:30:00"), text: form.get('text').toString(), done: false }
	console.log('Adding')
	//addCommentToPost()
	/*await prisma.todo.create({
		data: {
			created_at: new Date(),
			done: false,
			text: form.get('text').toString(),
		}
	})  */

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
	console.log('Patch')

	const form = await request.formData();
	/*
		await api('patch', `todos/${locals.userid}/${form.get('uid')}`, {
			text: form.has('text') ? form.get('text') : undefined,
			done: form.has('done') ? !!form.get('done') : undefined
		});
	*/
	return redirect;
};

export const del: RequestHandler = async ({ request, locals }) => {
	console.log('Delete')
	const form = await request.formData();

	//await api('delete', `todos/${locals.userid}/${form.get('uid')}`);

	return redirect;
};