'use client';

import Categories from '../components/Categories/Categories';
import { useDateTime } from '../components/functions';
import AddTodo from '../components/Add-Todo/AddTodo';
import React, { useEffect, useState } from 'react';
import { Todos } from '../modules/modules';
import { FaPlus } from 'react-icons/fa6';
import './Todo.scss';

export default function Todo() {
	const [todos, setTodos] = useState<Todos[]>([]);
	const [add, setAdd] = useState<boolean>(false);
	const { day, getDayTime } = useDateTime();

	useEffect(() => {
		const getTodos = () => {
			const items = localStorage.getItem('todos');
			if (items) {
				setTodos(JSON.parse(items));
			}
		};
		getTodos();
	}, [setTodos]);

	useEffect(() => {
		getDayTime();
		const interval = setInterval(() => {
			getDayTime();
		}, 60000);
		return () => clearInterval(interval);
	}, []);

	const addTodo = (newTodo: Todos) => {
		setTodos((prevTodos) => [...prevTodos, newTodo]);
		localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
	};

	return (
		<section className='todo max-width'>
			<div className='date'>
				<h1>{day.date}</h1>
				<h1>{day.time}</h1>
			</div>
			<Categories setTodos={setTodos} todos={todos} />
			{add && <AddTodo setAdd={setAdd} addTodo={addTodo} />}
			<div className='todo-list'>
				{todos?.map((item, index: number) => {
					return (
						<div className='todo-item' key={index}>
							<h1>{item.title}</h1>
							<p>{item.description}</p>
							<p>{item.tag}</p>
							<div>
								<p>{item.timeFrom}</p> <p>{item.timeTo}</p>
							</div>
							<div>
								<p>time logged:</p>
								<p>{item.time}</p>
							</div>
						</div>
					);
				})}
			</div>
			<button className='add-button' onClick={() => setAdd(true)}>
				<FaPlus size={30} color='#041A56' />
			</button>
		</section>
	);
}
