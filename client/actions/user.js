import axios from 'axios';

export function fetchUserInformation(information = null, callback = null) {
	return function (dispatch) {
		axios.post('/fetchUserInformation', information).then(function(response){
			dispatch({
				type: "FETCH_USER_INFO",
				payload: response.data
			})
			if (callback != null) callback();
		})
	}
}