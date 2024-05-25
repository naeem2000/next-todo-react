export interface DateAndTime {
	date: string;
	time: string;
}

export interface Todo {
	title: string;
	description: string;
	tag: string;
}

export interface Todos {
	title: string;
	description: string;
	tag: string;
}

export interface Errors {
	titleError: boolean;
	descriptionError: boolean;
	tagError: boolean;
}
