'use client';

import { Errors, Todo } from '@/app/modules/modules';
import React, { useState } from 'react';
import { FaX } from 'react-icons/fa6';
import './AddTodo.scss';

type Props = {
	setAdd: (a: boolean) => void;
};

export default function AddTodo({ setAdd }: Props) {
	const [todo, setTodo] = useState<Todo>({
		title: '',
		description: '',
		tag: '',
	});

	const [errors, setErrors] = useState<Errors>({
		titleError: false,
		descriptionError: false,
		tagError: false,
	});

	const submit = (e: any) => {
		e.preventDefault();
		let canSave: boolean = false;
		const newErrors: Partial<Errors> = {};
		if (!todo.title) {
			newErrors.titleError = true;
			canSave = false;
		} else {
			newErrors.titleError = false;
			canSave = true;
		}
		if (!todo.description) {
			newErrors.descriptionError = true;
			canSave = false;
		} else {
			newErrors.descriptionError = false;
			canSave = true;
		}
		if (!todo.tag) {
			newErrors.tagError = true;
			canSave = false;
		} else {
			newErrors.tagError = false;
			canSave = true;
		}
		setErrors({ ...errors, ...newErrors });
		if (canSave) {
			setAdd(false);
			const existingTodosJSON = localStorage.getItem('todos');
			const existingTodos: Todo[] = existingTodosJSON
				? JSON.parse(existingTodosJSON)
				: [];
			const updatedTodos = Array.isArray(existingTodos)
				? [...existingTodos, todo]
				: [todo];
			localStorage.setItem('todos', JSON.stringify(updatedTodos));
		}
	};

	return (
		<section className='addTodo'>
			<button onClick={() => setAdd(false)}>
				<FaX size={30} color='#FFFFFF' />
			</button>
			<div className='addTodo-body'>
				<h2>Add Todo</h2>
				<input
					type='text'
					placeholder='Title'
					value={todo.title}
					onChange={(e) => setTodo({ ...todo, title: e.target.value })}
				/>
				{errors.titleError ? <p>Please enter a title...</p> : <p>&nbsp;</p>}
				<textarea
					cols={30}
					rows={5}
					placeholder='Description'
					value={todo.description}
					onChange={(e) => setTodo({ ...todo, description: e.target.value })}
				></textarea>
				{errors.descriptionError ? (
					<p>Please enter a description...</p>
				) : (
					<p>&nbsp;</p>
				)}
				<div className='add-bottom'>
					<div>
						<select
							value={todo.tag}
							onChange={(e) => setTodo({ ...todo, tag: e.target.value })}
						>
							<option value=''>Select a tag</option>
							<option value='Work'>Work</option>
							<option value='Personal'>Personal</option>
							<option value='Other'>Other</option>
						</select>{' '}
						{errors.tagError ? <p>Please select a tag...</p> : <p>&nbsp;</p>}
					</div>
					<button onClick={submit}>Submit</button>
				</div>
			</div>
		</section>
	);
}
