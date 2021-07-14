export const SAVE = 'SAVE';

export const save = (index) => {
	return {
		type: SAVE,
		payload: { index },
	};
};
