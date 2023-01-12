import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQueryParams';
import axios from 'axios';

import { login } from '../../redux/actions/providerDataAction';
import { providerData } from '../../redux/actions/providerDataAction';
import { HidePassword } from '../../assets/icons/HidePassword';
import { RevealPassword } from '../../assets/icons/RevealPassword';

import classes from './Login.module.css';
import { startGetCustomers } from '../../redux/actions/customerActions';

export const Login = () => {
	const queryRealm = useQueryParams();
	localStorage.setItem('queryRealm', queryRealm);

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const openEye = <RevealPassword />;

	const closeEye = <HidePassword />;

	const [passwordShown, setPasswordShown] = useState(false);

	const [userError, setUserError] = useState('');

	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const [provider, setProvider] = useState('');

	const [loginError, setLoginError] = useState(false);

	const [submitted, setSubmitted] = useState(false);

	const [providerId, setProviderId] = useState('');

	const [token, setToken] = useState();

	const passwordIconClick = () => {
		passwordShown ? setPasswordShown(false) : setPasswordShown(true);
	};

	const handleUserChange = (e) => {
		setProvider(e.currentTarget.value);
		validateErrorUser(e.currentTarget.value);
	};

	// Extract all valildations in  other folder

	const validateErrorUser = (value) => {
		const error =
			/^[a-zA-Z\u00C0-\u00FF]+(([',. -][a-zA-Z\u00C0-\u00FF ])?[a-zA-Z\u00C0-\u00FF]*)*$/.test(
				value
			)
				? ''
				: 'The first name must have only letters';
		setUserError(error);
		return error;
	};

	const handlePasswordChange = (e) => {
		setPassword(e.currentTarget.value);
		validatePassword(e.currentTarget.value);
	};

	const validatePassword = (value) => {
		const error =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(value)
				? ''
				: 'Must contain at least 8 characters, a capital letter and a special character';
		setPasswordError(error);
		return error;
	};

	// This function is used to validate the login
	const preAuth = async () => {
		try {
			const status = await getToken(provider, password);
			const resStatus = status.data.access_token;
			const statusProvider = await getProviderId(resStatus);
			const resProvider = statusProvider.data._id;
			resStatus === undefined
				? setLoginError(true)
				: setLoginError(false) && setProvider('');
			setPassword('');

			getAuth(resProvider, resStatus);
		} catch (error) {
			console.log(error);
			setLoginError(true);
			setProvider('');
			setPassword('');
		}
		return;
	};

	// This function is used to get the token
	const getToken = async (provider, password) => {
		try {
			const res = await axios.post(
				process.env.REACT_APP_KEYCLOAK_URL +
					'auth/realms/' +
					`${queryRealm}` +
					'/protocol/openid-connect/token',
				new URLSearchParams({
					username: provider,
					password: password,
					grant_type: 'password',
					client_id: process.env.REACT_APP_CLIENT_ID,
				})
			);

			const accessToken = res.data.access_token;
			const refreshToken = res.data.refresh_token;
			setToken(accessToken);

			localStorage.setItem('access_token', accessToken);
			localStorage.setItem('refresh_token', refreshToken);
			return res;
		} catch (error) {
			console.log('Error from get token: ', error);
		}
	};

	// This function is used to get the provider id
	const getProviderId = async (token) => {
		const queryParams = queryRealm;
		const providerRes = await axios.get(
			process.env.REACT_APP_API + `/providers/realm/${queryParams}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const resProviderId = providerRes.data._id;
		setProviderId(providerRes.data._id);

		dispatch(login({ providerId }));

		localStorage.setItem('resProviderId', resProviderId);

		return providerRes;
	};

	// This function is used to get the provider data
	const getAuth = async (providerId, token) => {
		const providerRes = await axios
			.get(process.env.REACT_APP_API + `/providers/${providerId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (providerId) {
					dispatch(startGetCustomers());
					dispatch(providerData(res.data));
					setSubmitted(true);
					navigate('/provider-main-page');
				}
			});
		return providerRes;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		preAuth();
	};

	return (
		<>
			<div className={classes['login-container']}>
				<div className="row">
					<div className={`col text-center ${classes['side-grid']}`}></div>
					<div className={`row col-2  ${classes['center-grid']}`}>
						<div className={classes['div-login']}>
							<h1 className={classes['h1-login']}>Login</h1>
						</div>
						<form className={classes['form-container']} onSubmit={handleSubmit}>
							<div className={classes['input-container']}>
								<div className="mb-3">
									<label
										htmlFor="inputuser4"
										className={`form-label ${classes['style-label']}`}>
										Usuario
									</label>
									<input
										placeholder="username123"
										type="text"
										id="user"
										value={provider}
										onChange={handleUserChange}
										required
										className={`form-control ${classes['input-login']}`}
									/>
									<span className={classes['error']}>{userError}</span>
								</div>
								<div className={`mb-3`}>
									<label
										htmlFor="inputPassword4"
										className={`form-label ${classes['style-label']}`}>
										Password
									</label>
									<div className={classes['input-icon-container']}>
										<input
											placeholder="*******************"
											type={passwordShown ? 'text' : 'password'}
											id="password"
											value={password}
											onChange={handlePasswordChange}
											required
											className={`form-control ${classes['input-login']}`}
										/>
										<i
											className={classes['input-icon']}
											onClick={passwordIconClick}>
											{/* Password icon */}
											{passwordShown ? closeEye : openEye}
										</i>
									</div>
									<span className={classes['error']}>{passwordError}</span>
								</div>
								<div className={`mb-3 ${classes['down-side-flex']}`}>
									<div className={classes['remember-container']}>
										<input
											type="checkbox"
											className={`form-check-input ${classes['checkbox-style']}`}
											id="exampleCheck1"
										/>
										<label
											className="form-check-label ms-2"
											htmlFor="exampleCheck1">
											Recuérdame
										</label>
									</div>
									<button type="submit" className={classes['button']}>
										Acceder
									</button>
								</div>
								<div>
									{loginError === false ? (
										''
									) : (
										<div className={`text-center ${classes['error']}`}>
											Wrong user or password
										</div>
									)}
								</div>
							</div>
						</form>
						<div className={classes['copyright-container']}>
							<div>&#169; Laksia 2022</div>
						</div>
					</div>
					<div className={`col text-center ${classes['side-grid']}`}></div>
				</div>
			</div>
		</>
	);
};
