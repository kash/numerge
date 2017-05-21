const initialState = {
	info: {}
}

const user = function (state = initialState, action) {
	switch (action.type) {
		case "FETCH_USER_INFO":
			return Object.assign({}, state, {
				info: action.payload
			});
		default:
			return state;
	}
}

export default user;