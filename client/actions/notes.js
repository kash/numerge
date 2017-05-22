import axios from 'axios';

export function fetchAllUserNotes(userID, callback = null) {
	return function (dispatch) {
		axios.post('/fetchAllUserNotes', {
			userID: userID
		}).then(function(response){
			dispatch({
				type: "FETCH_ALL_USER_NOTES",
				payload: response.data
			})
			if (callback != null){
				callback();
			}
		})
	}
}