import { DateAndTime } from '../modules/modules';
import { useState } from 'react';

export const useDateTime = () => {
	const [day, setDay] = useState<DateAndTime>({
		date: '',
		time: '',
	});
	const getDayTime = () => {
		const currentDate = new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: '2-digit',
		});
		const currentTime = new Date().toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
		});
		setDay({ date: currentDate, time: currentTime });
	};

	return { day, getDayTime };
};
