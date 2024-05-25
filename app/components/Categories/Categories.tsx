'use client';

import { BsPencil } from 'react-icons/bs';
import './Categories.scss';
import React, { useState } from 'react';

export default function Categories() {
	const [active, setActive] = useState<string>('');

	const filterItems = (item: string) => {
		switch (item) {
			case 'work':
				setActive('work');
				console.log('work');
				break;
			case 'personal':
				setActive('personal');
				console.log('personal');
				break;
			case 'other':
				setActive('other');
				console.log('other');
				break;
			default:
				break;
		}
	};
	return (
		<section className='categories max-width'>
			<h2>
				Categories  
				<BsPencil size={17} />
			</h2>
			<div className='boxes'>
				<div
					className={`category ${active === 'work' && 'work'}`}
					onClick={
						active !== 'work' ? () => filterItems('work') : () => setActive('')
					}
				>
					<h3>Work</h3>
					<p>2/5 done</p>
				</div>
				<div
					className={`category ${active === 'personal' && 'personal'}`}
					onClick={
						active !== 'personal'
							? () => filterItems('personal')
							: () => setActive('')
					}
				>
					<h3>Personal</h3>
					<p>2/5 done</p>
				</div>
				<div
					className={`category ${active === 'other' && 'other'}`}
					onClick={
						active !== 'other'
							? () => filterItems('other')
							: () => setActive('')
					}
				>
					<h3>Other</h3>
					<p>2/5 done</p>
				</div>
			</div>
		</section>
	);
}
