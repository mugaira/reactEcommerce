import axios from 'axios';
import { ORDER_MY_LIST_RESET } from '../constants/orderConstants';
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_DETAILS_RESET,
	USER_UPDATE_PROFILE_RESET,
	USER_UPDATE_PROFILE_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_PROFILE_REQUEST,
	USER_PROFILE_SUCCESS,
	USER_PROFILE_FAIL,
	USER_PROFILE_RESET,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/user/login',
			{ email, password },
			config
		);

		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (err) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};

export const logout = () => async (dispatch) => {
	localStorage.removeItem('userInfo');

	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_DETAILS_RESET });
	dispatch({ type: ORDER_MY_LIST_RESET })
	dispatch({ type: USER_PROFILE_RESET });
	dispatch({ type: USER_UPDATE_PROFILE_RESET })
	dispatch({ type: USER_LIST_RESET });
};

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/user',
			{ name, email, password },
			config
		);

		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (err) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.message,
		});
	}
};


export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST });

		const {
			userLogin: { userInfo }, //multi-level destructing
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/user/${id}`, config);

		dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.response,
		});
	}
};

export const getUserProfile = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_PROFILE_REQUEST });

		const { userLogin: { userInfo } } = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		}

		const { data } = await axios.get('/api/user/profile', config);

		dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: USER_PROFILE_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.response,
		});
	}
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

		const {
			userLogin: { userInfo }, // 2-level destructing
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.put('/api/user/profile', user, config);

		dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
	} catch (err) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.response,
		});
	}
};

export const listUsers = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_LIST_REQUEST });

		const { userLogin: { userInfo } } = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		}

		const { data } = await axios.get(`/api/user`, config);

		dispatch({ type: USER_LIST_SUCCESS, payload: data });

	} catch (err) {
		dispatch({
			type: USER_LIST_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.response,
		});
	}
}

export const deleteUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DELETE_REQUEST });

		const { userLogin: { userInfo } } = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		}

		await axios.delete(`/api/user/${id}`, config);

		dispatch({ type: USER_DELETE_SUCCESS });

	} catch (err) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.response,
		});
	}
}

export const updateUser = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_REQUEST });

		const { userLogin: { userInfo } } = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-Type': 'application/json'
			}
		}

		const { data } = await axios.put(`/api/user/${user._id}`, user, config);

		dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

	} catch (err) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload:
				err.response && err.response.data.message
					? err.response.data.message
					: err.response,
		});
	}
}
