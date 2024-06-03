import dynamic from 'next/dynamic';

export const Login = dynamic(() => import('../login/page'), {
	ssr: false,
});

export const Register = dynamic(() => import('../login/page'), {
	ssr: false,
});

export const Todo = dynamic(() => import('../todo/page'), {
	ssr: false,
});

export const Welcome = dynamic(() => import('../welcome/page'), {
	ssr: false,
});
