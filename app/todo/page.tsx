'use client';

import Categories from '../components/Categories/Categories';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useDateTime } from '../components/functions';
import AddTodo from '../components/Add-Todo/AddTodo';
import React, { useEffect, useState } from 'react';
import { db } from '../components/firebase';
import { Todos } from '../modules/modules';
import { FaPlus } from 'react-icons/fa6';
import './Todo.scss';

export default function Todo() {
	const [todos, setTodos] = useState<Todos[]>([]);
	const [add, setAdd] = useState<boolean>(false);
	const [userDetails, setUserDetails] = useState<any>();
	const [userName, setUserName] = useState<string>('');
	const { day, getDayTime } = useDateTime();

	useEffect(() => {
		const storedUser = localStorage.getItem('userId');
		if (storedUser) {
			try {
				const parsedDetails = JSON.parse(storedUser);
				setUserDetails(parsedDetails);
			} catch (error) {
				console.error('Error parsing user details:', error);
			}
		}
	}, []);

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

	useEffect(() => {
		const getData = async () => {
			if (userDetails?.uid) {
				const docRef = doc(db, 'users', userDetails.uid);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					const userData = docSnap.data();
					const username = userData?.username;
					if (username) {
						setUserName(username);
					}
				} else {
					console.log('No such document!');
				}
			}
		};
		getData();
	}, [userDetails]);

	const addTodo = (newTodo: Todos) => {
		const updatedTodos = [...todos, newTodo]; // Create a new array with the new todo
		setTodos(updatedTodos); // Update state with the new array of todos
		localStorage.setItem('todos', JSON.stringify(updatedTodos)); // Update local storage with the new array of todos

		if (userDetails?.uid) {
			const todoRef = doc(db, 'users', userDetails.uid); // Reference to the user document
			setDoc(todoRef, { todos: updatedTodos }); // Set the 'todos' field with the updated array
		}
	};

	return (
		<section className='todo max-width'>
			<div className='header-items'>
				<p>{userName}</p>
				<button>Sign out</button>
			</div>
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
