'use client';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { UserLogin, UserError } from '../modules/modules';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { auth } from '../components/firebase';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import './Login.scss';

export default function Login() {
	const [visible, setVisible] = useState<boolean>(false);
	const [login, setLogin] = useState<UserLogin>({
		email: '',
		password: '',
	});

	const [loginError, setLoginError] = useState<UserError>({
		nameError: false,
		emailError: false,
		passwordError: false,
	});

	const route = useRouter();

	const loginUser = async () => {
		signInWithEmailAndPassword(auth, login.email, login.password)
			.then((userCredential) => {
				const user = userCredential.user;
				localStorage.setItem('userId', JSON.stringify(user));
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const onSubmit = (e: any) => {
		e.preventDefault();
		let canLogin: boolean = false;
		const loginErrors: Partial<UserError> = {
			nameError: false,
			emailError: false,
			passwordError: false,
		};
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
			loginUser();
			route.push('/todo');
		}
	};

	return (
		<section className='login'>
			<h1>Login</h1>
			<div className='login-body'>
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
