import Link from 'next/link';
import React from 'react';
import './Welcome.scss';

export default function Welcome() {
	return (
		<section className='welcome'>
			<div className='welcome-body max-width'>
				<h1>Welcome!</h1>
				<p>
					Introducing Mira: Your Personal Productivity Powerhouse! Are you tired
					of feeling overwhelmed by your never-ending to-do list? Say hello to
					Mira - the sleek and simple solution to help you conquer your tasks
					with ease.
				</p>
				<br />
				<p>
					Whether you&apos;re a busy professional, a student with deadlines
					looming, or a parent juggling multiple responsibilities, Mira is here
					to simplify your life. With intuitive features, customizable lists,
					and seamless collaboration options, staying organized has never been
					easier. Join the Mira community today and unleash your productivity
					potential!
				</p>
				<Link href={'/todo'} rel='noreferrer'>
					Let&apos;s get started
				</Link>
			</div>
		</section>
	);
}
