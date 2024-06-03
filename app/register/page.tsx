'use client';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { User, UserError } from '../modules/modules';
import { auth } from '../components/firebase';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import React, { useState } from 'react';
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

	const onSubmit = async (e: any) => {
		e.preventDefault();
		let canLogin: boolean = false;
		const registerErrors: Partial<UserError> = {
			nameError: false,
			emailError: false,
			passwordError: false,
		};

		if (!register.name) {
			canLogin = false;
			registerErrors.nameError = true;
		} else {
			canLogin = true;
			registerErrors.nameError = false;
		}
		if (!register.email) {
			canLogin = false;
			registerErrors.emailError = true;
		} else {
			canLogin = true;
			registerErrors.emailError = false;
		}
		if (!register.password) {
			canLogin = false;
			registerErrors.passwordError = true;
		} else {
			canLogin = true;
			registerErrors.passwordError = false;
		}
		setRegisterError({ ...registerError, ...registerErrors });
		if (canLogin) {
			createUserWithEmailAndPassword(auth, register.email, register.password)
				.then((userCredential) => {
					const user = userCredential.user;
					localStorage.setItem('user', JSON.stringify(user));
				})
				.catch((error) => {
					if (error.code === 'auth/email-already-in-use') {
						console.log('error');
					}
				});
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
