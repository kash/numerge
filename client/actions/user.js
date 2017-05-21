import axios from 'axios';

export function fetchUserInformation(information = null) {
	return function (dispatch) {
		axios.post('/fetchUserInformation', information).then(function(response){
			console.log(response.data);
			dispatch({
				type: "FETCH_USER_INFO",
				payload: response.data
			})
		})
	}
}