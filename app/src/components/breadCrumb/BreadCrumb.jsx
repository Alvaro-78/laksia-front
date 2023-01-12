import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { HomeIcon } from '../../assets/icons/HomeIcon';
import { LogoutIcon } from '../../assets/icons/LogoutIcon';

import { logOut } from '../../redux/actions/providerDataAction';
import { resetCustomers } from '../../redux/actions/customerActions';
import { resetAssets } from '../../redux/actions/assetActions';

import classes from './BreadCrumb.module.css';
import { resetRooms } from '../../redux/actions/roomActions';
import { resetConcerts } from '../../redux/actions/concertActions';
import { deleteToken } from '../../service/tokenHelpers';

export const BreadCrumb = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const location = useLocation();
	const pathNames = location.pathname.split('/');
	let path = '';

	const [fill, setFill] = useState('#FF5A5A');
	const size = '26px';

	let activeColor = '';

	const closeSession = () => {
		deleteToken();
		dispatch(logOut());
		dispatch(resetCustomers());
		dispatch(resetRooms());
		dispatch(resetConcerts());
		dispatch(resetAssets());
		navigate('/');
	};

	return (
		<div className={classes['wrapper']}>
			<nav className={classes['background-breadcrumb']} aria-label="breadcrumb">
				<ol className={`breadcrumb ${classes['breadcrumb-list']}`}>
					<li className="breadcrumb-item">
						<HomeIcon />
					</li>
					{pathNames.slice(1).map((pathName, index) => {
						pathNames.length - 2 === index
							? (activeColor = '#000000')
							: (activeColor = '#5D5D5D');
						path += '/' + pathName;
						return (
							<li
								className={`breadcrumb-item ${classes['path']}`}
								key={pathName.id}>
								<Link
									to={path}
									className={classes['link-path']}
									style={{ textDecoration: 'none', color: activeColor }}>
									{pathName === 'provider-main-page'
										? 'Festivales'
										: pathName === 'assets'
										? 'Assets'
										: pathName === 'analitics'
										? 'Analíticas'
										: pathName === 'notifications'
										? 'Notificaciones'
										: pathName === 'customization'
										? 'Customización'
										: pathName === 'capacity-control'
										? 'Control de Aforos'
										: pathName === 'AnadirFestival'
										? 'Añadir Festival'
										: pathName === 'AnadirEspacio'
										? 'Añadir Espacio'
										: pathName === 'AnadirConcierto'
										? 'Añadir Concierto'
										: pathName.replace(/%C3%B1/g, 'ñ').replace(/%20/g, ' ')}
								</Link>
							</li>
						);
					})}
				</ol>
			</nav>
			<button
				className={classes['logout']}
				onMouseEnter={() => setFill('#FBFBFB')}
				onMouseLeave={() => setFill('#FF5A5A')}
				onClick={() => closeSession()}>
				CERRAR SESIÓN
				<div className={classes['logout-icon-wrapper']}>
					<LogoutIcon size={size} fill={fill} />
				</div>
			</button>
		</div>
	);
};
