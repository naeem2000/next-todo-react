'use client';

import Categories from '../components/Categories/Categories';
import { useDateTime } from '../components/functions';
import AddTodo from '../components/Add-Todo/AddTodo';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import './Todo.scss';

export default function Todo() {
	const [add, setAdd] = useState<boolean>(false);
	const { day, getDayTime } = useDateTime();

	useEffect(() => {
		getDayTime();
	}, []);

	return (
		<section className='todo max-width'>
			<div className='date'>
				<h1>{day.date}</h1>
				<h1>{day.time}</h1>
			</div>
			<Categories />
			{add && <AddTodo setAdd={setAdd} />}
			<button className='add-button' onClick={() => setAdd(true)}>
				<FaPlus size={30} color='#041A56' />
			</button>
		</section>
	);
}
