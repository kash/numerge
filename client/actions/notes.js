import axios from 'axios';

export function fetchAllUserNotes(userID) {
	return function (dispatch) {
		axios.post('/fetchAllUserNotes', {
			userID: userID
		}).then(function(response){
			dispatch({
				type: "FETCH_ALL_USER_NOTES",
				payload: response.data
			})
		})
	}
}