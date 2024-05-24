'use client';

import Categories from '../components/Categories/Categories';
import { useDateTime } from '../components/functions';
import React, { useEffect } from 'react';
import './Todo.scss';

export default function Todo() {
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
		</section>
	);
}
