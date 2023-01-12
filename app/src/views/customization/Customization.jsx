// Import the components from React
import React from 'react';
import { useSelector } from 'react-redux';

import { BreadCrumb } from '../../components/breadCrumb/BreadCrumb';
import { SideBar } from '../../components/sideBar/SideBar';

// Import icon
import { ProfileIcon } from '../../assets/icons/ProfileIcon';

// Import the custom class
import classes from './Customization.module.css';

export const Customization = () => {
	// Get info from Redux store
	const providerName = useSelector(
		(state) => state.providerDataReducer.data.name
	);
	const providerId = useSelector((state) => state.providerDataReducer.data._id);

	return (
		<>
			<div className={classes['background-container']}>
				<SideBar />
				<div className={`${classes['scroll-container']}`}>
					<BreadCrumb />
					<div className={classes['grid-container']}>
						{/* Row 1 Column 1 */}
						<div className={classes['title-container-grid']}>
							<h1 className={classes['title']}>Customización</h1>
						</div>
						{/* Row 2 Column 1*/}
						<div className={classes['main-title-name']}>
							<h1 className={classes['title']}>Perfil de Organizador</h1>
							<div className={classes['organizador_logo_descripcion']}>
								<div className={classes['profile_logo']}>
									<ProfileIcon
										width="92px"
										height="92px"
										fill="#5D5D5D"
										style={`{className={classes['keep_img']}`}
									/>
								</div>
								<div className={classes['info-container']}>
									<div className={classes['fest-input']}>
										Name: {providerName}
									</div>
									<div className={classes['fest-input']}>ID: {providerId}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
