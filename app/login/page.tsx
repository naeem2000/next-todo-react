'use client';

import { User, UserError } from '../modules/modules';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import React, { useState } from 'react';
import './Login.scss';

export default function Login() {
	const [visible, setVisible] = useState<boolean>(false);
	const [login, setLogin] = useState<User>({
		name: '',
		email: '',
		password: '',
	});

	const [loginError, setLoginError] = useState<UserError>({
		nameError: false,
		emailError: false,
		passwordError: false,
	});

	const onSubmit = (e: any) => {
		e.preventDefault();
		let canLogin: boolean = false;
		const loginErrors: Partial<UserError> = {
			nameError: false,
			emailError: false,
			passwordError: false,
		};

		if (!login.name) {
			canLogin = false;
			loginErrors.nameError = true;
		} else {
			canLogin = true;
			loginErrors.nameError = false;
		}
		if (!login.email) {
			canLogin = false;
			loginErrors.emailError = true;
		} else {
			canLogin = true;
			loginErrors.emailError = false;
		}
		if (!login.password) {
			canLogin = false;
			loginErrors.passwordError = true;
		} else {
			canLogin = true;
			loginErrors.passwordError = false;
		}
		setLoginError({ ...loginError, ...loginErrors });
		if (canLogin) {
			console.log(login);
		}
	};

	return (
		<section className='login'>
			<h1>Login</h1>
			<div className='login-body'>
				<p>Name:</p>
				<input
					type='text'
					placeholder='Name'
					value={login.name}
					onChange={(e) => setLogin({ ...login, name: e.target.value })}
				/>
				<p className='login-error'>
					{loginError.nameError ? <>Please enter your name...</> : <>&nbsp;</>}
				</p>
				<p>Email:</p>
				<input
					type='email'
					placeholder='Email'
					value={login.email}
					onChange={(e) => setLogin({ ...login, email: e.target.value })}
				/>
				<p className='login-error'>
					{loginError.emailError ? (
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
						value={login.password}
						onChange={(e) => setLogin({ ...login, password: e.target.value })}
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
					{loginError.passwordError ? (
						<>Please enter your password...</>
					) : (
						<>&nbsp;</>
					)}
				</p>
				<button onClick={onSubmit} className='animated-button'>
					Log in
				</button>
			</div>
		</section>
	);
}
