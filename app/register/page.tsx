'use client';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { User, UserError } from '../modules/modules';
import { auth, db } from '../components/firebase';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { doc, setDoc } from 'firebase/firestore';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../login/Login.scss';

export default function Register() {
	const [visible, setVisible] = useState<boolean>(false);
	const [register, setRegister] = useState<User>({
		name: '',
		email: '',
		password: '',
	});

	const [registerError, setRegisterError] = useState<UserError>({
		nameError: false,
		emailError: false,
		passwordError: false,
	});

	const route = useRouter();

	const addUser = async () => {
		try {
			const authResult = await createUserWithEmailAndPassword(
				auth,
				register.email,
				register.password
			);
			localStorage.setItem('userId', JSON.stringify(auth.currentUser));
			const {
				user: { uid },
			} = authResult;
			const userDocRef = doc(db, 'users', uid);
			await setDoc(userDocRef, {
				username: register.name,
				email: register.email,
			});
			toast.success('Welcome to Mira!');
			setRegister({
				name: '',
				email: '',
				password: '',
			});
			route.push('/todo');
		} catch (error: any) {
			if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
				toast.error('Email already in use');
			}
		}
	};

	const onSubmit = async (e: any) => {
		e.preventDefault();
		let canRegister: boolean = false;
		const registerErrors: Partial<UserError> = {
			nameError: false,
			emailError: false,
			passwordError: false,
		};

		if (!register.name) {
			canRegister = false;
			registerErrors.nameError = true;
		} else {
			canRegister = true;
			registerErrors.nameError = false;
		}
		if (!register.email) {
			canRegister = false;
			registerErrors.emailError = true;
		} else {
			canRegister = true;
			registerErrors.emailError = false;
		}
		if (!register.password) {
			canRegister = false;
			registerErrors.passwordError = true;
		} else {
			canRegister = true;
			registerErrors.passwordError = false;
		}

		setRegisterError({ ...registerError, ...registerErrors });

		if (canRegister) {
			addUser();
		}
	};

	return (
		<section className='login'>
			<h1>Register</h1>
			<div className='login-body'>
				<p>Name:</p>
				<input
					type='text'
					placeholder='Name'
					value={register.name}
					onChange={(e) => setRegister({ ...register, name: e.target.value })}
				/>
				<p className='login-error'>
					{registerError.nameError ? (
						<>Please enter your name...</>
					) : (
						<>&nbsp;</>
					)}
				</p>
				<p>Email:</p>
				<input
					type='email'
					placeholder='Email'
					value={register.email}
					onChange={(e) => setRegister({ ...register, email: e.target.value })}
				/>
				<p className='login-error'>
					{registerError.emailError ? (
						<>Please enter your email...</>
					) : (
						<>&nbsp;</>
					)}
				</p>
				<p>Password:</p>
				<div>
					<input
						type={!visible ? 'password' : 'text'}
						placeholder='Password'
						value={register.password}
						onChange={(e) =>
							setRegister({ ...register, password: e.target.value })
						}
					/>
					{!visible ? (
						<IoEye
							onClick={() => setVisible(true)}
							className='eye-icon'
							size={27}
						/>
					) : (
						<IoEyeOff
							onClick={() => setVisible(false)}
							className='eye-icon'
							size={27}
						/>
					)}
				</div>
				<p className='login-error'>
					{registerError.passwordError ? (
						<>Please enter your password...</>
					) : (
						<>&nbsp;</>
					)}
				</p>
				<button onClick={onSubmit} className='animated-button register'>
					Register
				</button>
			</div>
		</section>
	);
}
