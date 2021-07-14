import { SAVE } from '../actions';

const saveReducer = (state = [], action) => {
	switch (action.type) {
		case SAVE:
			const { index } = action.payload;
			return [...state, { index }];
		default:
			return state;
	}
};

export default saveReducer;
