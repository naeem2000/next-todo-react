export interface DateAndTime {
	date: string;
	time: string;
}

export interface Todo {
	title: string;
	description: string;
	tag: string;
	timeFrom: string;
	timeTo: string;
}

export interface Todos {
	title: string;
	description: string;
	tag: string;
	time: string;
	timeFrom: string;
	timeTo: string;
}

export interface Errors {
	titleError: boolean;
	descriptionError: boolean;
	tagError: boolean;
	timeError: boolean;
}

export interface User {
	name: string;
	email: string;
	password: string;
}

export interface UserLogin {
	email: string;
	password: string;
}

export interface UserError {
	nameError: boolean;
	emailError: boolean;
	passwordError: boolean;
}
