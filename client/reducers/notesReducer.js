const initialState = {
	userNotes: null
}

const notes = function (state = initialState, action) {
	switch (action.type) {
		case "FETCH_ALL_USER_NOTES":
			return Object.assign({}, state, {
				userNotes: action.payload
			});
		default:
			return state;
	}
}

export default notes;