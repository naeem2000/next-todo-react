'use client';

import React, { useEffect, useState } from 'react';
import { Todos } from '@/app/modules/modules';
import { BsPencil } from 'react-icons/bs';
import './Categories.scss';

//interface for props from parent component
type Props = {
	setTodos: (item: any) => void;
	todos: Todos[];
};

export default function Categories({ setTodos, todos }: Props) {
	//store the original todos from local storage
	const [originalTodos, setOriginalTodos] = useState<Todos[]>([]);
	//state to track for active class
	const [active, setActive] = useState<string>('');

	//filtering for each case
	function filter(tag: string) {
		const filteredTodos = originalTodos.filter((item) => item.tag === tag);
		setTodos(filteredTodos);
	}

	//when component mounts then add original todos from local storage
	useEffect(() => {
		const todoers = localStorage.getItem('todos');
		if (todoers) {
			setOriginalTodos(JSON.parse(todoers));
		}
	}, [todos]); //rerender when this state changes

	//reset upon clicking a category again
	const resetFilter = () => {
		setActive('');
		setTodos(originalTodos);
	};

	//function to handle each different category clicked
	const filterItems = (item: string) => {
		switch (item) {
			case 'Work':
				setActive('work');
				filter(item);
				break;
			case 'Personal':
				setActive('personal');
				filter(item);
				break;
			case 'Other':
				setActive('other');
				filter(item);
				break;
			default:
				break;
		}
	};

	//function to get length of tags per tag
	const tagsLength = (tager: string) => {
		return originalTodos.filter((tag) => tag.tag === tager).length;
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
						active !== 'work' ? () => filterItems('Work') : () => resetFilter()
					}
				>
					<h3>Work</h3>
					<p>2/{tagsLength('Work')} done</p>
				</div>
				<div
					className={`category ${active === 'personal' && 'personal'}`}
					onClick={
						active !== 'personal'
							? () => filterItems('Personal')
							: () => resetFilter()
					}
				>
					<h3>Personal</h3>
					<p>2/{tagsLength('Personal')} done</p>
				</div>
				<div
					className={`category ${active === 'other' && 'other'}`}
					onClick={
						active !== 'other'
							? () => filterItems('Other')
							: () => resetFilter()
					}
				>
					<h3>Other</h3>
					<p>2/{tagsLength('Other')} done</p>
				</div>
			</div>
		</section>
	);
}
