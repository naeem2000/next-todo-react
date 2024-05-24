import { Todo } from '@/app/modules/modules';
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

	const submit = (e: any) => {
		e.preventDefault();
		console.log(todo);
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
				<textarea
					cols={30}
					rows={5}
					placeholder='Description'
					value={todo.description}
					onChange={(e) => setTodo({ ...todo, description: e.target.value })}
				></textarea>
				<div className='add-bottom'>
					<select
						value={todo.tag}
						onChange={(e) => setTodo({ ...todo, tag: e.target.value })}
					>
						<option value=''>Select a tag</option>
						<option value='Work'>Work</option>
						<option value='Personal'>Personal</option>
						<option value='Other'>Other</option>
					</select>
					<button onClick={submit}>Submit</button>
				</div>
			</div>
		</section>
	);
}
