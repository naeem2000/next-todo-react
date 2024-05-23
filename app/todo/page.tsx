'use client';

import { useDateTime } from '../components/functions';
import React, { useEffect } from 'react';

export default function Todo() {
	const { day, getDayTime } = useDateTime();

	useEffect(() => {
		getDayTime();
	}, []);

	return (
		<section className='todo'>
			<div className='date'>
				<p>{day.date}</p>
				<p>{day.time}</p>
			</div>
		</section>
	);
}
